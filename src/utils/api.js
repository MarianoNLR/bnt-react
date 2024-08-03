import axios from "axios";

const api = axios.create({
    baseURL: 'https://bnt-app.onrender.com',
    withCredentials: true
})
export default api