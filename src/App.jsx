import {Routes, Route, Router, Navigate} from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { GameBet } from './pages/GameBet.jsx'
import { MyGames } from './pages/MyGames.jsx'
import { LoggedLayout } from './components/LoggedLayout.jsx'
import { AuthLayout } from './components/AuthLayout.jsx'
import { GameView } from './pages/GameView.jsx'
import './App.css'
import { useUser } from './components/UserProvider.jsx'

function App() {
  const user = useUser()
  return (
    <>
          <Routes>
            <Route element={<LoggedLayout />}>
              <Route path='/' element={ user ? <Home /> : <Navigate to="/login" />}></Route>
              <Route path='/room/:room' element={ user ? <GameBet /> : <Navigate to="/login" />}></Route>
              <Route path='/my_games' element={<MyGames />}></Route>
              <Route path='/game_view/:room' element={<GameView />}></Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route index path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
            </Route>
          </Routes>
    </>
  )
}

export default App
