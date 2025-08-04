"use client"
import InputUI from '@repo/ui/input';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import React, { ButtonHTMLAttributes, useState } from 'react'

function MainPage() {
    const [roomName, setRoomName] = useState<String | null>();
    const inituser = localStorage.getItem("user") as string;
    const parsed = JSON.parse(inituser);
    const firstname = parsed.name.split(' ')[0];
    const router = useRouter()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setRoomName(e.target.value)
    }

    const handleCreate = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            console.log("Creatr Room");

            const res = await axios.post("http://localhost:3004/room", {
                name: roomName
            }, {
                headers: {
                    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0OTA4YzY4Ni0xM2QzLTQ5NzMtYTJiZi0xMmI5ZjZiODMzMmYiLCJpYXQiOjE3NTQyMzIyNTF9.9onBnZlXSZ9LvZ12-yRwIsbjywNaKpUVUo8h4iCcidQ"
                }
            })
            console.log(res.data);

            router.push(`/canvas/${res.data.roomID}`)
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleJoin = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            console.log("handle join");

            const res = await axios.get(`http://localhost:3004/room/${roomName}`, {
                headers: {
                    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0OTA4YzY4Ni0xM2QzLTQ5NzMtYTJiZi0xMmI5ZjZiODMzMmYiLCJpYXQiOjE3NTQyMzIyNTF9.9onBnZlXSZ9LvZ12-yRwIsbjywNaKpUVUo8h4iCcidQ"
                }
            })

            const roomID = res.data.room.id;
            console.log(roomID);

            router.push(`/canvas/${roomID}`)
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-900 ring-4 ring-indigo-500 shadow-inner shadow-indigo-400'>
            <p className=' flex justify-center items-center text-indigo-400 text-3xl h-20 shadow-lg shadow-indigo-500 fixed top-28 w-1/3 rounded-lg'>Draw Rooms</p>
            {firstname && <p className='fixed top-10 right-10 text-2xl font-bold text-white shadow-sm shadow-indigo-500'>{firstname}</p>}
            <div className=' w-3/4 flex justify-evenly gap-5 pt-8 '>
                <InputUI classname='ring w-2/3 p-3 bg-indigo-300 text-white placeholder-white' type='text' placeholder='Room name' onchange={handleChange} />
                <button type='button' name="create" onClick={handleCreate} className='shadow-md shadow-indigo-600 outline-none p-3 w-64 flex-2 rounded-lg bg-indigo-600 text-white'>Create Room</button>
            </div>
            <div className='w-3/4 py-9 px-20 text-white flex items-center justify-center'>
                <p className='flex-1 border border-dashed border-indigo-400 '></p>
                <div className='flex-1 text-center'>Or</div>
                <p className='flex-1 border border-dashed border-indigo-400'></p>
            </div>
            <div className=' w-3/4 flex justify-evenly gap-5'>
                <InputUI classname='ring w-2/3 p-3 bg-indigo-300 text-white placeholder-white' type='text' placeholder='Room name' onchange={handleChange} />
                <button onClick={handleJoin} className='shadow-md shadow-indigo-600 outline-none p-3 w-64 flex-2 rounded-lg bg-indigo-600 text-white'>Join Room</button>
            </div>
        </div>
    )
}

export default MainPage;