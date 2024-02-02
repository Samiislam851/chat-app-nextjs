'use client'
import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import toast from 'react-hot-toast';

import { Context, valueType } from '@/components/contextApis/ContextProvider';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { User } from '@/types/db';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';




type Props = {}
type inputObject = {
    email: string,
    password: string
}



export default function page({ }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const contextValue = useContext<valueType | null>(Context)

    const router = useRouter();

    const googleLogin = contextValue?.googleLogin
    const { loading, setLoading, user, logOut } = contextValue!


    const saveUserToDB = async (user: User) => {
        // save user to DB
        const res = await axios.post('http://localhost:3000/api/saveUser', user)

        if (res.status == 200) {
            localStorage.setItem('chat-app', res.data.token)
            router.push('/dashboard')
        } else {
            await logOut()
        }

  

        setLoading(false)
    }


    const loginWithGoogle = async () => {
        if (googleLogin) {
            setLoading(true);
            try {
                googleLogin().then((result) => {
                    saveUserToDB(result.user)

                }).catch((error) => {
                    console.log(error);

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    const email = error.customData.email;

                    const credential = GoogleAuthProvider.credentialFromError(error);

                });

            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false);
            }




        }
    };


    const { register, handleSubmit } = useForm<inputObject>()
    const handleRegister = (data: inputObject) => {
        console.log(data);
    }

    return (

        <>

            <div className='background min-h-[100vh] text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center '>
         

                <div className='w-fit '>
                    <div className='rounded-lg py-5 backdrop-blur-md bg-gray-200 bg-opacity-[0.09] border border-opacity-10 border-gray-400 max-w-md  transition-all ease-in-out duration-500 hover:shadow-2xl '>
                        <div className='w-fit mx-auto'>
                       <Image className='' src={'/logo.png'} width={50}  height={50} alt={'Logo'} />
                       </div>
                       
                        <h3 className='text-3xl text-white font-medium md:font-bold px-5 md:px-10 my-6'>Sign in to you account</h3>

                        <form className='max-w-md  px-5 md:px-10 mx-auto flex flex-col items-center justify-center gap-1 pb-5' onSubmit={handleSubmit(handleRegister)} >
                            <input {...register('email')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Email' />

                            <input  {...register('password')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Password' />

                            <button className='border py-2 px-4 rounded-lg bg-purple-600 text-white hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 border-0 '>Login</button>
                        </form>
                        <div className='max-w-md  px-5 md:px-10'>
                            <h3 className='text-gray-200 text-center  text-sm py-3'>    New to NextChat? <span className='text-blue-300'> <Link href={'/register'}>Create an account!</Link> </span></h3>


                            <div><button onClick={loginWithGoogle} className='border px-6 py-2 my-5 rounded-md bg-slate-800 text-white hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300 border-gray-600'>{isLoading ? <AiOutlineLoading3Quarters className=' inline text-xl animate-spin' /> : <FcGoogle className=' inline text-xl pb-1' />}     login with google</button></div>
                        </div>
                    </div>
                </div>



            </div></>


    )
}


