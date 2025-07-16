import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Point = { x: number, y: number }
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
    type: "pencil";
    points: Point[];
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
    private pencilPoints: Point[] = []

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
            if (shape.type == "pencil") {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = "round";
                this.ctx.strokeStyle = "white";
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y)
                for (let i = 1; i <= shape.points.length - 1; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y)
                }
                this.ctx.stroke();
                this.ctx.closePath();
            }
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        })
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true
        this.startX = e.clientX;
        this.startY = e.clientY;
        console.log(this.selectedTool);
        if (this.selectedTool == "pencil") {
            this.pencilPoints.push({ x: this.startX, y: this.startY })
        }
    }
    mouseMoveHandler = (e: MouseEvent) => {
        console.log(this.clicked)
        if (this.clicked) {
            const ctx = this.ctx;
            if (this.selectedTool === "pencil") {

                const newPoint = { x: e.clientX, y: e.clientY };
                const prevPoint = this.pencilPoints[this.pencilPoints.length - 1];
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.strokeStyle = "white";
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(newPoint.x, newPoint.y);
                ctx.stroke();
                ctx.closePath();
                this.pencilPoints.push(newPoint);
            }
            else {

                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;
                this.clearCanvas()
                this.ctx.strokeStyle = "rgba(255,255,255)";

                if (this.selectedTool === "rect") {
                    this.ctx.strokeRect(this.startX, this.startY, width, height);
                }
                else if (this.selectedTool === "circle") {
                    const radius = Math.max(width, height) / 2;
                    const centerX = this.startX + radius;
                    const centerY = this.startY + radius;
                    this.ctx.beginPath();
                    this.ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI)
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
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
        else if (this.selectedTool == "pencil") {
            shape = {
                type: "pencil",
                points: this.pencilPoints
            }

            this.existingShapes.push(shape);
        }

        if (!shape) {
            console.log("No shape");
            return;
        }

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: parseInt(this.roomId)
        }))
    }


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    }
}