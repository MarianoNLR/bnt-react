import {HeaderLogged} from './HeaderLogged.jsx'
import {Footer} from './Footer.jsx'
import { Outlet } from 'react-router-dom'

export const LoggedLayout = () => {
    return (
        <>
            <HeaderLogged></HeaderLogged>
            <Outlet />
            <Footer></Footer>
        </>
    )
}