"use client"
import initDraw from '@/draw';
import React, { useEffect, useRef, useState } from 'react'
import { WS_URL } from '../../config';
import Canvas from './Canvas';

export default function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [selected, setSelected] = useState("rect")

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0OTA4YzY4Ni0xM2QzLTQ5NzMtYTJiZi0xMmI5ZjZiODMzMmYiLCJpYXQiOjE3NTEyODcxODB9.nmutMCySDROvilTLyEss-fjx9OB_OBMtxtA-mUsYUcE`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    }, [])



    if (!socket) {
        console.log(socket)
        return <div className='bg-black h-screen w-screen text-white'>
            Connecting to server....
        </div>
    }

    return (
        <div className=" z-10 overflow-hidden">
            <Canvas roomId={roomId} socket={socket} selected={selected} />
            {/* <div className='fixed bottom-10 right-20 bg-gray-900 rounded-lg'>
                <button className='px-4 py-3' onClick={() => setSelected("rect")}>
                    {selected == "rect" ? <div className='border-2 border-green-600 w-7 h-7'></div> : <div className='border-2 border-red-600 w-7 h-7'></div>}
                </button>
                <button className='px-4 py-3' onClick={() => setSelected("circle")}>
                    {selected == "circle" ? <div className='border-2 border-green-600 w-7 h-7 rounded-2xl'></div> : <div className='border-2 border-red-600 w-7 h-7 rounded-2xl'></div>}
                </button>
            </div> */}
        </div>
    )
}
