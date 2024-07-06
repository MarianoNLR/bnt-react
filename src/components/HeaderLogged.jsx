import { useNavigate } from "react-router-dom"
import './css/Header.css'
import { useEffect, useState } from "react"
import socket from "../utils/socket.js"
import { useUser } from "./UserProvider.jsx"

export const HeaderLogged = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //TODO
        // socket.on('updateHeader', () => {
        if (user) {
            setLoading(false)
        }
        // })

        // return () => {
        //     socket.off('updateHeader')
        // }

    }, [user])

    if (loading || !user) {
        return <div></div>;
    }
    
    return(
        <>
            <div className="header-wrapper">
                <div className="logo-wrapper" onClick={() => {navigate('/')}}>BNT</div>
                {user && <nav className="nav-wrapper">
                    <ul className="nav-list">
                        <li className="nav-list-item" onClick={() => {navigate('/my_games')}}>Mis Juegos</li>
                        <li className="nav-list-item total-coins"><span>Nava Coins: </span>{user.user.coins}</li>
                    </ul>
                </nav>}
                
            </div>
        </>
    )
}