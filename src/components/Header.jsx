import { useNavigate } from "react-router-dom"
import './css/Header.css'
import { useEffect, useState } from "react"
import socket from "../utils/socket.js"


export const Header = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // const fetchData = async () => {
        //     const res = await fetch('http://localhost:3000/auth', {
        //         method: 'GET',
        //         credentials: 'include'
        //     })

        //     const data = await res.json()
        //     setUser(data.user)
        //     setCoins(data.user.coins)
        // }

        // fetchData()

        // socket.on('updateHeader', () => {
        //     fetchData()
        // })

        // return () => {
        //     socket.off('updateHeader')
        // }

    }, [])
    
    return(
        <>
            <div className="header-wrapper">
                <div className="logo-wrapper" onClick={() => {navigate('/')}}>BNT</div>
                <nav className="nav-wrapper">
                    <ul className="nav-list">
                        <li className="nav-list-item" onClick={() => {navigate('/register')}}>Registro</li>
                        <li className="nav-list-item" onClick={() => {navigate('/login')}}>Login</li>
                    </ul>
                </nav>
                
            </div>
        </>
    )
}