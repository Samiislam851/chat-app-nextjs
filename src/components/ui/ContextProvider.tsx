'use client'
import React, { ReactNode, createContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'


type Props = {
    children: ReactNode
}

export interface valueType {
    first: boolean,
    setFirst: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<valueType | null>(null)

export default function ContextProvider({ children }: Props) {
    const [first, setFirst] = useState<boolean>(true)
    const value: valueType = { first, setFirst }

    return (
        <Context.Provider value={value}> 
        <Toaster position='top-center' reverseOrder={false}/>
        {children}
        </Context.Provider >
    )
}