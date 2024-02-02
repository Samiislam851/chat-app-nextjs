import { MongoUser } from '@/types/mongoUser'
import Image from 'next/image'
import React from 'react'

type Props = {
    searchUser: MongoUser
}

const SearchPeopleCard = ({ searchUser }: Props) => {
    console.log('.,...dADVASDVA.S D.......', searchUser);

    // Update the destructure to use searchUser
    const { image, name, _id, email } = searchUser;

    return (
        <div className='flex items-center justify-between border-t py-2'>
            <div className="basis-1/2 flex gap-2">
                <div className='w-[50px] overflow-hidden rounded-full h-[50px] hover:scale-[5] md:hover:scale-[5] md:hover:ms-[-110px] md:hover:me-[200px]  hover:translate-x-24 transition-all ease-in-out duration-300 border  border-gray-300'>
                    <img src={image ? image : ''} className='w-full' alt={name ? name : ''} />

                </div>
                <div className="">
                    <h3 className='text-gray-500 text-lg'>{name}</h3>
                    <h3 className='text-gray-500 text-xs'>{email}</h3>
                </div>
            </div>

            <div className="basis-1/2">

                <button className='bg-[#365486] text-white px-3 py-1 rounded float-end hover:scale-105 transition-all ease-in-out duration-300 hover:shadow-lg'>Add friend</button>

            </div>

        </div>
    )
}

export default SearchPeopleCard
