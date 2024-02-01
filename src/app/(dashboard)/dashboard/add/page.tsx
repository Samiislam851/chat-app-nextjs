import AddfriendLogic from '@/components/ui/AddfriendLogic/AddfriendLogic'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <section className='mx-auto px-2 py-10 md:px-12 max-w-[1600px]'>
            <h2 className='text-gray-700 text-center text-5xl font-light md:font-light'>Add a friend</h2>
            <AddfriendLogic />

        </section>
    )
}

export default page