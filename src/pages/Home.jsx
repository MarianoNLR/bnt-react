import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Home.css'
import { useUser } from '../components/UserProvider'
//import socket from '../utils/socket.js'

export const Home = () => {
    const [roomName, setRoomName] = useState('')
    const [roomList, setRoomList] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { user } = useUser()

    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch('https://bnt-app.onrender.com/games', {
                credentials: 'include'
            })
            const data = await res.json()
            setRoomList(data.result)
            setLoading(false)
        }

        fetchRooms()
        // socket.emit('getRoomList')

        // const fetchRoomList = () => {
        //     socket.emit('getRoomList')
        //     socket.on('roomList', (rooms) => {
        //         setRoomList(rooms)
        //     })
        // }

        // fetchRoomList()

        // return () => {
        //     socket.off('roomList');
        // };
    }, [])


    const handleOnChangeRoomName = (e) => {
        e.preventDefault()
        setRoomName(e.target.value)
    }

    const createRoom = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://bnt-app.onrender.com/games/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name:roomName }),
                credentials: 'include'
            })
    
            if (!res.ok) {
                console.error(res)
            } else {
                setRoomName('')
                navigate(0)
            }
        } catch (error) {
            console.error({error})
        }
        
    }

    // const joinRoom = (roomName) => {
    //     navigate(`/room/${roomName}`)
    // }

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

    return(
        <>
            <main className='main-home'>
            {!loading &&
            <>
                <h1>Salas Abiertas</h1>
                <form className='create-room-form'>
                <input
                className='create-room-input'
                type="text"
                value={roomName}
                onChange={handleOnChangeRoomName}
                placeholder='Nombre de la sala' />
                <button className='new-room-button' onClick={createRoom}>Crear Sala</button>
                </form>
                <div className='room-list-wrapper'>
                    {roomList.map((room, index) => (
                        <div className='room-list-item' key={index}><span className='list-item-name'>{room.name}</span>{room.status === 'Abierto' 
                            ? <>
                            <div className='list-item-buttons'>
                            <button className='join-button' onClick={(e) => handleJoinClick(room, e)}>Entrar</button>
                            { user.id == room.createdBy ? <button className='close-button' onClick={(e) => handleCloseClick(room.id, e)}>Cerrar</button> : <div>{user.id}</div> }
                            </div>
                            </>
                            : 
                            <button disabled={true}>Cerrado</button>}</div>
                    ))}
                </div>
            </>
            }
            </main>
        
        </>
        
    )
}