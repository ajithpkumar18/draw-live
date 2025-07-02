import initDraw from '@/draw';
import React, { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';


type Shape = "circle" | "rect" | "pencil";

export default function Canvas({ roomId, socket, selected }: { roomId: string, socket: WebSocket, selected: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("circle")

    useEffect(() => {
        // @ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef])
    return (
        <div>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} >
            </canvas>
            <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </div>
    )
}


function Topbar({ selectedTool, setSelectedTool }: { selectedTool: Shape, setSelectedTool: (s: Shape) => void }) {
    return <div className="fixed top-10 left-10">
        <div className='flex gap-3'>
            <IconButton icon={<Pencil />} onClick={() => { setSelectedTool("pencil") }} activated={selectedTool === "pencil"}></IconButton>
            <IconButton icon={<RectangleHorizontalIcon />} onClick={() => { setSelectedTool("rect") }} activated={selectedTool === "rect"}></IconButton>
            <IconButton icon={<Circle />} onClick={() => { setSelectedTool("circle") }} activated={selectedTool === "circle"}></IconButton>
        </div>
    </div>
}