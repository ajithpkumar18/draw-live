"use client"
import initDraw from '@/draw';
import React, { useEffect, useRef, useState } from 'react'
import { WS_URL } from '../../config';

export default function Canvas({ roomId }: { roomId: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            setSocket(ws)
        }
    }, [])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = initDraw(canvasRef.current, roomId);
        }
    }, [canvasRef])

    if (!socket) {
        return <div className='bg-black h-screen w-screen text-white'>
            Connecting to server....
        </div>
    }

    return (
        <div className=" z-10 overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} >
            </canvas>
            <div className="text-red-500">

                Drawing Logic
            </div>
        </div>
    )
}
