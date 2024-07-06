import { io } from 'socket.io-client'

const SOCKET_URL = 'https://bnt-app.vercel.app/'

const socket = io(SOCKET_URL, {
    withCredentials: true
})

export default socket
