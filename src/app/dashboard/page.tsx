import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

async function page({ }: Props) {
  const session = await getServerSession(authOptions)
  // console.log();

  return (
    <div>{ JSON.stringify(session) }</div>
  )
}

export default page