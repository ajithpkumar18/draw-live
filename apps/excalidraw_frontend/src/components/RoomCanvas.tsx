"use client"
import React, { useEffect, useRef, useState } from 'react'
import { WS_URL } from '../../config';
import Canvas from './Canvas';

export default function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [selected, setSelected] = useState("rect")

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0OTA4YzY4Ni0xM2QzLTQ5NzMtYTJiZi0xMmI5ZjZiODMzMmYiLCJpYXQiOjE3NTI0Nzk1MDF9.CTzzRSYgg-tIH7-AhwirUetezrKSvDZbIQ4_xON4Qsk`);
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
        </div>
    )
}
