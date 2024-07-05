import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import socket from '../utils/socket.js'
import './css/GameView.css'
import { useUser } from "../components/UserProvider.jsx"

export const GameView = () => {
    const { room } = useParams()
    const [roomData, setRoomData] = useState(null)
    const [bets, setBets] = useState([])
    const { user } = useUser()
    const navigate = useNavigate()
    const [results, setResults] = useState([{}])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBets = async () => {
            const res = await fetch(`http://localhost:3000/bets/${room}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            setBets(data.result)

            setResults(data.result.map(bet => ({
                ...bet, result: 'win'
            })))

            const resRoom = await fetch(`http://localhost:3000/games/get/${room}`, {
                method: 'GET',
                credentials: 'include'
            })
    
            const dataRoom = await resRoom.json()
            console.log(data)
            setRoomData(dataRoom.result)
            setLoading(false)
        }

        fetchBets()

    }, [])

    const handleChange = (id, value) => {
        setResults(results.map(item => 
            item.id === id ? {...item, result: value} : item
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/bets/${room}/results`, 
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({results})
                }
            )

            if (!res.ok) {
                console.error(res)
            } else {
                socket.emit('updateCoins', 'update coins')
                navigate('/')
            }
            
        } catch (error) { }
    }

    return (
        <>
            <main className="main-game_view-page">
                {!loading && <h1>{roomData.name}</h1>}
                <div className="bets-list-wrapper">
                    {results.map((bet, index) => (
                        <>  
                            <div key={index} className="bets-list-item">
                                <div className="bets-list-item-description">
                                    <span>{bet.description}</span>
                                </div>
                                <div className="bets-list-item-coins">
                                    <span>{bet.coins} $NC</span>
                                </div>
                                <div className="bets-list-item-result">
                                    <select 
                                id={`item-${bet.id}`} 
                                value={bet.result}
                                onChange={(e) => handleChange(bet.id, e.target.value)}>
                                    <option value="win">Victoria</option>
                                    <option value="lose">Derrota</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <button onClick={handleSubmit}>Enviar</button>
            </main>
        </>
    )
}