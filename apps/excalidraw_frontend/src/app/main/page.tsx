import InputUI from '@repo/ui/input';
import React from 'react'

function MainPage() {
    return (
        <div className='flex justify-center w-screen h-screen bg-gray-900 ring-4 ring-indigo-500 shadow-inner shadow-indigo-400'>
            <div className=' w-3/4 flex justify-evenly gap-5 fixed top-1/4'>
                <InputUI classname='ring w-2/3 p-3 bg-indigo-300 text-white' type='text' placeholder='Room name' />
                <button className='shadow-lg shadow-indigo-600 outline-none p-3 w-64 flex-2 rounded-lg bg-indigo-600 text-white'>Join</button>
            </div>
        </div>
    )
}

export default MainPage;