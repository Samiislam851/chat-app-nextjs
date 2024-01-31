'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contextApis/ContextProvider'

type Props = {}

interface User {
    _id?: string;
    name: string;
    // Define other properties if necessary
}
const Friends = (props: Props) => {

    // const {user} = useContext(Context)
    const [friends, setFriends] = useState<User []>([])
    useEffect(() => {

        axios.get('http://localhost:3000/api/getUsers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('chat-app')}`
            }
        }).then(res => {


            setFriends(res.data.users)
        }).catch(err => console.log(err))

    }, [])


    console.log(friends);



    return (
        <div className='text-center'>
            <h2 className='text-2xl text-gray-600 font-semibold'>Friends</h2>

            <ul>
                {
                    friends?.map((friend, index) => <li key={friend._id }>{friend.name}</li>)
                }
            </ul>


        </div>
    )
}

export default Friends