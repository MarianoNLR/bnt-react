import api from './api.js'

export const authenticateUser = async (credentials) => {
    try {
        const res = await api.post('/auth/login', credentials)
        return res.data.user
    } catch (error) {
        console.error('Authentication failed: ', error)
        throw error
    }
}

export const getUserFromToken = async () => {
    try {
        const res = await api.get('/auth/me')
        return res.data.user
    } catch (error) {
        console.error('An error has ocurred while obtaining your token: ', error)
        return null
    }
}

export const logoutUser = async () => {
    try {
        await api.post('auth/logout')
    } catch (error) {
        console.error('We could not close your session.')
    }
}