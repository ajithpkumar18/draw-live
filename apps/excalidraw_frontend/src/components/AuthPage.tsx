import React from 'react'
import InputUI from "@repo/ui/input"
function AuthPage({ isSignin }: { isSignin: Boolean }) {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
            <div className='px-3 py-8 rounded flex flex-col gap-8 bg-gray-600'>
                <InputUI classname=' ' type="text" placeholder='Email' />
                <InputUI classname='' type="text" placeholder='Password' />

                <button className='bg-gray-400 rounded-lg p-3 text-white' onClick={() => { }}>{isSignin ? "Signin" : "Signup"}</button>
            </div>
        </div>
    )
}

export default AuthPage