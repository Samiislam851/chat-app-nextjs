'use client'
import React from 'react'

type Props = {}

const AddfriendLogic = (props: Props) => {


    const addFriend = async (email: string) => {
        try {

        } catch (error) {

        }
    }

    return (
        <div>
            <form className='max-w-sm border p-2' action="">
                <label className='' htmlFor='email'>Add friend by E-mail</label>
                <div className="flex py-5 space-x-4">
                    <input
                        type="email"
                        placeholder="example: you@email.com"
                        className="px-4 py-0 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none">
                        Submit
                    </button>
                </div>


            </form>




        </div>
    )
}

export default AddfriendLogic