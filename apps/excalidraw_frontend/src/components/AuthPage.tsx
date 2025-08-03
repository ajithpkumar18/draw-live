import React from 'react'
import InputUI from "@repo/ui/input"
import Link from 'next/link'
function AuthPage({ isSignin }: { isSignin: Boolean }) {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-50'>
            <div className='px-16 pt-10 pb-10 rounded-lg flex flex-col gap-6  ring-1 ring-indigo-200 shadow-2xl shadow-indigo-100'>
                <p className='text-indigo-500 w-full text-center text-2xl'>{isSignin ? "Signin" : "Signup"}</p>
                <div className='flex flex-col gap-8'>

                    <InputUI classname='ring-1 ring-indigo-300 p-2' type="text" placeholder='Email' onchange={(e) => console.log("c")} />
                    <InputUI classname='ring-1 ring-indigo-300 p-2' type="text" placeholder='Password' onchange={(e) => console.log("c")} />

                </div>
                <button className='bg-indigo-400 rounded-lg p-3 text-white my-2 hover:bg-indigo-500' onClick={() => { }}>{isSignin ? "Signin" : "Signup"}</button>
            </div>
            <Link href={"http://localhost:3004/auth/google"}>Google</Link>
        </div>
    )
}

export default AuthPage