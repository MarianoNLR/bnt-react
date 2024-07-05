import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FormInput } from '../components/FormInput.jsx'
import './css/GameBet.css'
import { useUser } from "../components/UserProvider.jsx"
import socket from '../utils/socket.js'

export const GameBet = () => {
    const {room} = useParams()
    const [betDescription, setBetDescription] = useState('')
    const [betCoins, setBetCoins] = useState(0)
    const [roomData, setRoomData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
       const fetchRoomData = async() =>  {
        const res = await fetch(`http://localhost:3000/games/get/${room}`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()
        console.log(data)
        setRoomData(data.result)
        setLoading(false)
       }

       fetchRoomData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.coins < betCoins) {
            return console.error(`Solamente tienes ${user.coins}`)
        }
        try {
            const res = await fetch(`http://localhost:3000/bets/${room}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({betDescription, betCoins}),
                credentials: 'include'
            })
    
            if (!res.ok) {
                console.error(res)
            } else {
                socket.emit('updateCoins', 'update coins')
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    const onChangeDescription = (e) => {
        e.preventDefault()
        setBetDescription(e.target.value)
    }

    const onChangeCoins = (e) => {
        e.preventDefault()
        setBetCoins(e.target.value)
    }

    return (
        <>
            <main className="main-game_bet-page">
                {!loading && <h1>{roomData.name}</h1>}
                {user && 
                    <form className="make-bet-form" method="post" onSubmit={handleSubmit}>
                        <FormInput className='new-bet-input description' type="text" name='bet_description' id="bet_description" placeholder='Escribe tu predicción' onChange={(e) => onChangeDescription(e)}></FormInput>
                        <FormInput className='new-bet-input coins' type="number" name='bet_coins' id="bet_coins" placeholder='Coins' onChange={(e) => onChangeCoins(e)}></FormInput>
                        <button type="submit">Enviar</button>
                    </form>
                }

            </main>
        </>
    )
}