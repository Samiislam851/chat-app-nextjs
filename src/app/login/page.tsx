'use client'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from 'next-auth/react'
type Props = {}

export default function page({ }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginWitGoogle = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (err) {
            console.log(err);

        } finally {
            setIsLoading(false)
        }
    }

    console.log(isLoading);


    return (
        <>

            <div className='py-10 md:py-32 mx-5 md:mx-7 lg:mx-10 text-center '>
                <h3 className='text-xl text-gray-600 font-medium'>Logo</h3>
                <h3 className='text-3xl font-medium md:font-bold my-6'>Sign in to you account</h3>

                <form className='w-fit mx-auto flex flex-col items-center justify-center gap-1 pb-5' >
                    <input className='p-2 m-2 rounded-lg border border-gray-300' type="text" placeholder='Enter your Email' />

                    <input className='p-2 m-2 rounded-lg border border-gray-300' type="text" placeholder='Enter your Password' />

                    <button onClick={() => console.log('login clicked')} className='border p-1 px-3 rounded-lg bg-cyan-500 text-whitehover:shadow-xl transition-all ease-in-out duration-300 '>Login</button>
                </form>




                <div><button onClick={loginWitGoogle} className='border px-6 py-2 my-5 rounded-md bg-slate-800 text-white hover:shadow-xl transition-all ease-in-out duration-300'>{isLoading ? <AiOutlineLoading3Quarters className=' inline text-xl animate-spin' /> : <FcGoogle className=' inline text-xl pb-1' />}     login with google</button></div>
            </div>
        </>
    )
}