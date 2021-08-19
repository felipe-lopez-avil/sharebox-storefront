import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import SbCorpNavbar from './SbCorpNavbar/SbCorpNavbar';

import { useRouter } from 'next/router'

export default function Layout ({children}) {

    const router = useRouter();
    return (
        <div>
            { router.pathname === '/corporate' ? <SbCorpNavbar/> : <Navbar/> }
                {children}
            <Footer/>
        </div>
    )
}