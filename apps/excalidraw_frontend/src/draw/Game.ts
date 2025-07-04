import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    setTool(tool: "circle" | "pencil" | "rect") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas()
    }

    initHandlers() {
        this.socket.onmessage = (event) => {

            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message);
                const parsed = JSON.parse(parsedShape);
                this.existingShapes.push(parsed.shape);
                this.clearCanvas();
            }
        }
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)


        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true
        this.startX = e.clientX;
        this.startY = e.clientY;
        console.log(this.selectedTool);
    }
    mouseMoveHandler = (e: MouseEvent) => {
        console.log(this.clicked)
        if (this.clicked) {
            // const width = e.clientX - this.startX;
            // const height = e.clientY - this.startY;
            // this.clearCanvas()
            // this.ctx.strokeStyle = "rgba(255,255,255)";

            // if (this.selectedTool === "rect") {
            //     this.ctx.strokeRect(this.startX, this.startY, width, height);
            // }
            // else if (this.selectedTool === "circle") {
            //     const radius = Math.max(width, height) / 2;
            //     const centerX = this.startX + radius;
            //     const centerY = this.startY + radius;
            //     this.ctx.beginPath();
            //     this.ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI)
            //     this.ctx.stroke();
            //     this.ctx.closePath();
            // } else 
            if (this.selectedTool === "pencil") {
                this.drawLine(e);
                this.startX = e.offsetX;
                this.startY = e.offsetY;
            }
        }
    }
    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        let shape: Shape | null = null;
        if (this.selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
            this.existingShapes.push(shape);
        }
        else if (this.selectedTool === "circle") {
            console.log("mouse up", this.selectedTool, this.selectedTool === "circle");

            const radius = Math.max(width, height) / 2;

            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }
            console.log("Selected Tool", shape)
            this.existingShapes.push(shape)
        }

        if (!shape) {
            console.log("No shape");
            return;
        }

        // this.socket.send(JSON.stringify({
        //     type: "chat",
        //     message: JSON.stringify({
        //         shape
        //     }),
        //     roomId: parseInt(this.roomId)
        // }))
    }

    drawLine(e: MouseEvent) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.closePath();
        this.ctx.stroke();
    }



    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    }
}