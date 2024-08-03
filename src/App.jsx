import {Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { GameBet } from './pages/GameBet.jsx'
import { MyGames } from './pages/MyGames.jsx'
import { LoggedLayout } from './components/LoggedLayout.jsx'
import { AuthLayout } from './components/AuthLayout.jsx'
import { GameView } from './pages/GameView.jsx'
import { Header } from './components/Header.jsx'
import './App.css'
import { AuthProvider } from './components/UserProvider.jsx'

function App() {
  return (
    <>
        <AuthProvider>
            <Header />
            <Routes>
              <Route index path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/' element={<Home />}></Route>
              <Route path='/room/:room' element={<GameBet />}></Route>
              <Route path='/my_games' element={<MyGames />}></Route>
              <Route path='/game_view/:room' element={<GameView />}></Route>
            </Routes>
        </AuthProvider>

    </>
  )
}

export default App
