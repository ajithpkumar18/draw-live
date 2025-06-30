import initDraw from '@/draw';
import React, { useEffect, useRef } from 'react'

export default function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef])
    return (
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} >
        </canvas>
    )
}
