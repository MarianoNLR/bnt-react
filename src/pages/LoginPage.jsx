import { useState } from "react"
import { FormInput } from "../components/FormInput.jsx"
import '../components/css/FormInput.css'
import { useNavigate } from "react-router-dom"
import './css/LoginPage.css'
import { useAuth } from "../components/UserProvider.jsx"

export function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleChangeUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({username, password})
        navigate('/')
    }

    return (
        <>
            <main className="main-login-page">
                <form className="form" method="POST" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <FormInput type="text" icon="👤" name="Username" id="username" className="form-input" placeholder="👤 Username" onChange={handleChangeUsername}></FormInput>
                    <FormInput type="password" icon="🔒︎" name="Password" id="password" className="form-input" placeholder="🔒︎ Password" onChange={handleChangePassword}></FormInput>
                    <button type="submit" id="submit" className="form-submit">Login</button>
                </form>
            </main>
        </>
    )
}