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
import { MongoUser } from '@/types/mongoUser';




type Props = {}
type inputObject = {
    name: string,
    email: string,
    password: string,
    image: string
}



export default function page({ }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const contextValue = useContext<valueType | null>(Context)

    const router = useRouter();


    const { loading, setLoading, user, logOut, emailRegister } = contextValue!


    const saveUserToDB = async (user: MongoUser) => {
        // save user to DB
        console.log('from save user to db', user);

        try {
            const res = await axios.post('http://localhost:3000/api/saveUserToDB', user)

            if (res.status == 200) {
                localStorage.setItem('chat-app', res.data.token)
                router.push('/dashboard')
            } else {
                await logOut()
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)

        }




    }





    const { register, handleSubmit } = useForm<inputObject>()
    const handleRegister = (data: inputObject) => {

        const user = { ...data }
        console.log(user);

        if (/^\s*$/.test(data.email) || /^\s*$/.test(data.password) || /^\s*$/.test(data.image) || /^\s*$/.test(data.name)) {
            toast.error(' Please give all the informations ')
        } else {
            setLoading(true)
            emailRegister(user.email, user.password)
                .then((userCredential) => {
                    saveUserToDB(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false)
                    toast.error(errorMessage);
                });
        }

    }

    if (user) {
        router.push('/dashboard')
    }
    else return (
        <>

            <div className='background min-h-[100vh] text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center '>


                <div className='w-fit '>
                    <div className='rounded-lg py-10 backdrop-blur-md bg-gray-300 bg-opacity-[0.09] border border-opacity-10 border-gray-400 max-w-md  transition-all ease-in-out duration-500   '>
                        <div className='w-fit mx-auto'>
                            <Image className='' src={'/logo.png'} width={50} height={50} alt={'Logo'} />
                        </div>

                        <h3 className='text-3xl text-white font-medium md:font-bold px-5 md:px-10 my-6'>Create an account</h3>

                        <form className='max-w-md  px-5 md:px-10 mx-auto flex flex-col items-center justify-center gap-1 pb-5' onSubmit={handleSubmit(handleRegister)} >
                            <input required {...register('name')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Name' />
                            <input required {...register('image')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your image link' />

                            <input required {...register('email')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Email' />

                            <input required {...register('password')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Password' />

                            <button className='border py-2 px-4 rounded-lg bg-[#81689D] text-white hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 border-0 '>
                                {loading ?
                                    <AiOutlineLoading3Quarters className='text-3xl animate-spin' />
                                    :
                                    <span>Register</span>
                                }
                            </button>
                        </form>
                        <div className='max-w-md  px-5 md:px-10'>
                            <h3 className='text-gray-200 text-center md:text-left text-sm py-3'>    Already have an account? <span className='text-blue-300'> <Link href={'/login'}>Login and continue</Link> </span></h3>



                        </div>
                    </div>
                </div>



            </div></>



    )
}


