import { io } from 'socket.io-client'

const SOCKET_URL = 'https://bnt-app.onrender.com/'

const socket = io(SOCKET_URL, {
    withCredentials: true
})

export default socket