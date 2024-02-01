'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import app from '../../firebaseCredentials/app'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { User } from '@/types/db';
//////////////// interfaces and types ////////////////////////
type Props = {
    children: ReactNode
}

export interface valueType {
    first: boolean,
    setFirst: React.Dispatch<React.SetStateAction<boolean>>,
    googleLogin: () => Promise<UserCredential>,
    user: User | null,
    logOut: () => void,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}






//////////////////// context declaration ///////////////

export const Context = createContext<valueType | null>(null)



export default function ContextProvider({ children }: Props) {

    const [first, setFirst] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)


    ////////////////////  firebase features initialization ///////////////
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const googleLogin = (): Promise<UserCredential> => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, (loggedUser: User | null) => {
                setUser(loggedUser)
                setLoading(false)
            })
        }


        // const currentUser = auth.currentUser;
        // if (currentUser) {
        //     setUser(currentUser);
        // }

        return () => {
            unsubscribe()
        }
    }, [])


    ////////////////////// Sign Out ////////////////////////////
    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null);
            setLoading(false)
        }).catch((error) => {
            console.log(error);

        });
    }










    const value: valueType = {
        first, setFirst, googleLogin, user, logOut,
        loading, setLoading
    }

    return (
        <Context.Provider value={value}>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
        </Context.Provider >
    )
}