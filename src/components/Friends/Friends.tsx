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


    const contexts = useContext(Context)

    const { logOut } = contexts!
    const [friends, setFriends] = useState<User[]>([])


    const logOutFunc = async () => {
        if (logOut) {
    
          await logOut()
    
        }
      }


    useEffect(() => {

        axios.get('http://localhost:3000/api/getUsers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('chat-app')}`
            }
        }).then(res => {

            console.log(res);
            if (res.status == 200) {
                setFriends(res.data.users)
            }


        }).catch(err => { 
            
            console.log(err.response.data.message);
            
        
           logOutFunc()
        
        
        })

    }, [])


    console.log(friends);



    return (
        <div className='text-center'>
            <h2 className='text-2xl text-gray-600 font-semibold'>Friends</h2>

            <ul>
                {
                    friends?.map((friend, index) => <li key={friend._id}>{friend.name}</li>)
                }
            </ul>


        </div>
    )
}

export default Friends