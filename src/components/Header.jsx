import { useNavigate } from "react-router-dom"
import './css/Header.css'
import { useEffect, useState } from "react"
import { useAuth } from './UserProvider.jsx'



export const Header = () => {
    const { user, loadingUser, fetchUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    if (loadingUser) {
        <>
            <div className="header-wrapper">
                <div className="logo-wrapper" onClick={() => {navigate('/')}}>BNT</div>
            </div>
        </>
    }
    
    return(
        <>
        {user ? (
                <div className="header-wrapper">
                <div className="logo-wrapper" onClick={() => {navigate('/')}}>BNT</div>
                {user && <nav className="nav-wrapper">
                    <ul className="nav-list">
                        <li className="nav-list-item" onClick={() => {navigate('/my_games')}}>Mis Juegos</li>
                        <li className="nav-list-item total-coins"><span>Nava Coins: </span>{user.coins}</li>
                    </ul>
                </nav>}
                
                </div>
        ) : (
            <div className="header-wrapper">
                <div className="logo-wrapper" onClick={() => {navigate('/')}}>BNT</div>
                <nav className="nav-wrapper">
                    <ul className="nav-list">
                        <li className="nav-list-item" onClick={() => {navigate('/register')}}>Registro</li>
                        <li className="nav-list-item" onClick={() => {navigate('/login')}}>Login</li>
                    </ul>
                </nav>      
            </div>
        )}
        </>
    )
}