'use client'
import { Context } from '@/components/contextApis/ContextProvider'
// import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type Props = {}

function page({ }: Props) {

  const contexts = useContext(Context)
  console.log(contexts);
  const { user, logOut, loading } = contexts!
  const router = useRouter()
  const logOutFunc = async () => {
    if (logOut) {
      // router.push('/login')
      await logOut()
   
    }
  }


  

  if (loading) return <div className='w-full py-10'><AiOutlineLoading3Quarters className='animate-spin text-4xl mx-auto' /></div>
  if (!user) {
    router.replace('/login')
  }
  return (
    <div>{user ?
      <button onClick={logOutFunc}>Log Out</button>
      :
      <>
     
      
      </>
    }


    </div>
  )
}

export default page