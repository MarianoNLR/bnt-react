import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './css/MyGames.css'
import { useAuth } from "../components/UserProvider.jsx"

export const MyGames = () => {
    const [myGames, setMyGames] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, loadingUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyGames = async () => {
            const res = await fetch(`https://bnt-app.onrender.com/myGames`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()

            if(!res.ok) {
                console.error(res)
            } else {
                setMyGames(data.result)
                setLoading(false)
            }
        }

        fetchMyGames()
    }, [])

    const handleJoinClick = (room, e) => {
        e.preventDefault()
        navigate(`/room/${room.id}`)
    }

    const handleCloseClick = async (roomId, e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://bnt-app.onrender.com/games`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId }),
                credentials: 'include'
            })
    
            if(!res.ok) {
                console.error(res)
            } else {
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    if (loadingUser) {
        return <></>
    }

    return (
        <>
            <main className="main-my_games-page">
                <h1>Mis salas</h1>
                {!loading ? 
                     <div className="room-list-wrapper">
                     {myGames.map((room, index) => (
                         <div className="room-list-item" key={index}><span className="list-item-name">{room.name}</span>{room.status === 'Abierto' 
                             ? <>
                             <div className="list-item-buttons">
                             <button className="join-button" onClick={(e) => handleJoinClick(room, e)}>Entrar</button>
                             {user.id == room.createdBy ? <button className="close-button" onClick={(e) => handleCloseClick(room.id, e)}>Cerrar</button> : <div>{typeof user.coins}</div> }
                             </div>
                             </>
                             :
                             <>
                             <div className="list-item-buttons">
                             <button className="view-button" onClick={(e) => {e.preventDefault(); navigate(`/game_view/${room.id}`)}}>Ver</button>
                             </div>
                             </>}</div>
                     ))}
                     </div>
                : 
                     <div>Loading</div>
                }
               
            </main>
        </>
    )
}