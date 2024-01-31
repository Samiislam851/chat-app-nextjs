'use client'
import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast';
import { error } from 'console';
import { Context, valueType } from '@/components/contextApis/ContextProvider';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
type Props = {}

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
            router.push('/dashboard')
        } else {
            await logOut()
        }
        
        localStorage.setItem('chat-app',res.data.token)

        setLoading(false)
    }


    const loginWithGoogle = async () => {
        if (googleLogin) {
            setLoading(true);

            try {
                googleLogin().then((result) => {

                    // The signed-in user info.
                    const user = result.user;
                   
                    saveUserToDB(user)




                }).catch((error) => {
                    console.log(error);

                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });

            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false);
            }




        }
    };




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




                <div><button onClick={loginWithGoogle} className='border px-6 py-2 my-5 rounded-md bg-slate-800 text-white hover:shadow-xl transition-all ease-in-out duration-300'>{isLoading ? <AiOutlineLoading3Quarters className=' inline text-xl animate-spin' /> : <FcGoogle className=' inline text-xl pb-1' />}     login with google</button></div>
            </div>
        </>
    )
}