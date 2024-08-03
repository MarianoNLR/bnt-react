import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormInput } from "../components/FormInput.jsx"
import './css/RegisterPage.css'

export const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleChangeUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
      }
  
      const handleChangePassword = (e) => {
          e.preventDefault()
          setPassword(e.target.value)
      }

      const handleChangeConfirmPassword = (e) => {
        e.preventDefault()
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('https://bnt-app.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, confirmPassword })
            })

            if (!res.ok) {
                console.error(res)
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <main className="main-register-page">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <FormInput type="text" icon="👤" name="Username" id="username" className="form-input" placeholder="👤 Username" onChange={handleChangeUsername}></FormInput>
                    <FormInput type="password" icon="🔒︎" name="Password" id="password" className="form-input" placeholder="🔒︎ Password" onChange={handleChangePassword}></FormInput>
                    <FormInput type="password" icon="🔒︎" name="confirm-Password" id="confirm-password" className="form-input" placeholder="🔒︎ Confirm Password" onChange={handleChangeConfirmPassword}></FormInput>
                    <button type="submit" id="submit" className="form-submit">Register</button>
                </form>
            </main>
        </>
    )
}