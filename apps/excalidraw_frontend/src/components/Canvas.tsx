import React, { useEffect, useRef, useState } from 'react'
import IconButton from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';
import { Game } from '@/draw/Game';

export type Tool = "circle" | "rect" | "pencil";

export default function Canvas({ roomId, socket, selected }: { roomId: string, socket: WebSocket, selected: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game])

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);


            return () => {
                g.destroy();
            }
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


function Topbar({ selectedTool, setSelectedTool }: { selectedTool: Tool, setSelectedTool: (s: Tool) => void }) {
    return (

        <div className="fixed top-10 left-10">
            <div className='flex gap-3'>
                <IconButton icon={<Pencil />} onClick={() => { setSelectedTool("pencil") }} activated={selectedTool === "pencil"}></IconButton>
                <IconButton icon={<RectangleHorizontalIcon />} onClick={() => { setSelectedTool("rect") }} activated={selectedTool === "rect"}></IconButton>
                <IconButton icon={<Circle />} onClick={() => { setSelectedTool("circle") }} activated={selectedTool === "circle"}></IconButton>
            </div>
        </div>

    )
}