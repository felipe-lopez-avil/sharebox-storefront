import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import SideMenu from './Navbar/SideMenu'

export default function Layout ({children}) {
    return (
        <div>
            <Navbar/>
                {children}
            <Footer/>
        </div>
    )
}