import {Outlet} from 'react-router-dom'
import FooterBar from '../components/footer/Footer'
import NavBar from '../components/nav_bar/NavBar'

const MainLayout = () => {
    return (
        <>
        <NavBar />
        <Outlet />
        <FooterBar />
        </>
    )
}

export default MainLayout