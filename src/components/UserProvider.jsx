import React, { createContext, useState, useEffect, useContext } from 'react';
import socket from '../utils/socket.js'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        const fetchUser = async () => {
            try {
                const res = await fetch(`https://bnt-app.vercel.app/auth`, { 
                    method: 'GET',
                    credentials: 'include'
                })

                const data = await res.json()
                setUser(data.user)
            } catch (error) {
                console.error('Error')
            }
        }
        fetchUser()
        
        socket.on('updateCoins', (data) => {
            fetchUser()
        })

        return (() => {
            socket.off('updateCoins')
        })
    }, [])

    const login = async (username, password) => {
        try {
            const res = await fetch('https://bnt-app.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            })

            if (!res.ok) {
                console.error(res)
            } else {
                const userData = await res.json()
                setUser(userData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const updateCoinsUser = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/auth`, { 
    //             method: 'GET',
    //             credentials: 'include'
    //         })

    //         const data = await res.json()
    //         setUser(data.user)
    //     } catch (error) {
    //         console.error('Error')
    //     }
    // }

    return (
        <UserContext.Provider value={{user, login}}>
            {children}
        </UserContext.Provider>
    )

}