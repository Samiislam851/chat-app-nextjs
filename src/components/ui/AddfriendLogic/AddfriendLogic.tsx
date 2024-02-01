'use client'
import { Context } from '@/components/contextApis/ContextProvider';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { CiSearch } from "react-icons/ci";

type Props = {}
type inputObject = {
    input: string
}

const AddfriendLogic = (props: Props) => {

    const { register, handleSubmit } = useForm<inputObject>()


    const contextValue = useContext(Context)
    const { user } = contextValue ?? {}

const [searchedUsers, setSearchedUsers] = useState<User []>([])

    const searchPeople = async (data: inputObject) => {




        const inputValue: string = data.input

        if (data.input == '' || data.input == ' ') {
            toast.error(' Please Enter something ')
        } else {

            axios.post('http://localhost:3000/api/searchUser', // URL should start with "https://" instead of "https://"
                { inputValue, user }, // Move the user object inside the request body
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('chat-app')}`
                    }
                }
            ).then(res => setSearchedUsers(res.data.users)).catch(err => console.log(err))

        }


    }


console.log(searchedUsers);





    return (
        <div>
            <form className='max-w-sm border p-2' onSubmit={handleSubmit(searchPeople)}>
                <label className='' htmlFor='email'>Add friend by E-mail</label>
                <div className="flex py-5 space-x-2 overflow-hidden">
                    <input {...register('input')}
                        type="text"
                        placeholder="you@email.com or name"
                        className="px-4 py-0 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none flex items-center w-fit scale-95">
                        <CiSearch /> <span>Search</span>
                    </button>
                </div>


            </form>


{searchedUsers[0]?<>

    <h3 className='text-xs text-purple-600'>Search Result : </h3>

<ul className='list-none'>
    {
        searchedUsers.map((searchedUser: MongoUser) => <li>{searchedUser.name}</li>)
    }

</ul>




</>:<>




</>}

        </div>
    )
}

export default AddfriendLogic