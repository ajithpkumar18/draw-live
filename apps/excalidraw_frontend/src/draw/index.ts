import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { Radius } from "lucide-react";
type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number,
    endY: number
}
export default async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");
    let existingShapes: Shape[] = await getExistingShapes(roomId);
    console.log("existing shapes", existingShapes);

    if (!ctx) { return };

    socket.onmessage = (event) => {

        const message = JSON.parse(event.data);

        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message);
            const parsed = JSON.parse(parsedShape);
            existingShapes.push(parsed.shape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    }


    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX;
        startY = e.clientY;
    })
    canvas.addEventListener("mousemove", (e) => {
        console.log(clicked)
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx)
            ctx.strokeStyle = "rgba(255,255,255)";
            // @ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, startY, width, height);
            }
            // @ts-ignore
            else if (selectedTool === "circle") {
                console.log(selectedTool, "circle")
                const centerX = startX + width / 2;
                const centerY = startY + height / 2;
                const radius = Math.max(width, height) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        // @ts-ignore
        if (window.selectedTool == "rect") {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            // @ts-ignore
            const selectedTool = window.selectedTool;
            let shape: Shape | null = null;
            if (selectedTool === "rect") {
                shape = {
                    // @ts-ignore
                    type: "rect",
                    x: startX,
                    y: startY,
                    height,
                    width
                }
                existingShapes.push(shape);
            }
            else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                shape = {
                    type: "circle",
                    radius: radius,
                    centerX: startX + radius,
                    centerY: startY + radius
                }
                existingShapes.push(shape)
            }

            if (!shape) return;
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({
                    shape
                }),
                roomId: parseInt(roomId)
            }))
        }
        // @ts-ignore
        else if (window.selectedTool == "circle") {

        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        if (shape.type === "circle") {

        }
    })
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        console.log("shape", messageData.shape);
        return messageData.shape;
    })

    return shapes;
}