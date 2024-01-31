'use client'
import Friends from '@/components/Friends/Friends'
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

  const { user, logOut, loading } = contexts!
  const router = useRouter()
  const logOutFunc = async () => {
    if (logOut) {

      await logOut()
      router.push('/login')

    }
  }




  if (loading) return <div className='w-full py-10'><AiOutlineLoading3Quarters className='animate-spin text-4xl mx-auto' /></div>

  else if (!user) {
    router.push('/login')
  } else {

    return (
      <div>
        {user &&

          <div>
            <button className="bg-red-600 text-white p-3" onClick={logOutFunc}>Log Out</button>
            <div className='w-3/4 border rounded-xl h-[100vh] p-2'>
              <Friends />
            </div> </div>
        }





      </div>
    )
  }




}



export default page