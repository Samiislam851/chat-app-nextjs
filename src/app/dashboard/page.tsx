'use client'
import { Context } from '@/components/contextApis/ContextProvider'
// import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

type Props = {}

function page({ }: Props) {

  const contexts = useContext(Context)
  console.log(contexts);
  const { user, logOut, loading } = contexts!
  const router = useRouter()
  const logOutFunc = async () => {
    if (logOut) {
      await logOut()
      router.push('/login')
    }
  }


  

  if (loading) return <div>...Loading</div>
  if (!user) {
    router.push('/login')
  }
  return (
    <div>{user ?
      <button onClick={logOutFunc}>Log Out</button>
      :
      <>user unavailable</>
    }


    </div>
  )
}

export default page