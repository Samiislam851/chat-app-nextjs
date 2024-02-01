'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}
type inputObject = {

}
const AddfriendLogic = (props: Props) => {

    const { register, handleSubmit } = useForm()
    const addFriend = async (data: object) => {

        console.log(data.input);

        try {

        } catch (error) {

        }
    }

    return (
        <div>
            <form className='max-w-sm border p-2' onClick={handleSubmit(addFriend)}>
                <label className='' htmlFor='email'>Add friend by E-mail</label>
                <div className="flex py-5 space-x-4">
                    <input {...register('input')}
                        type="text"
                        placeholder="you@email.com or name"
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