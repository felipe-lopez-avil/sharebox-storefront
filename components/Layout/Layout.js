import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import SbCorpNavbar from './SbCorpNavbar/SbCorpNavbar';

import { useRouter } from 'next/router'

export default function Layout ({children, productsInCartExist, productsInBasket}) {
    const router = useRouter();

    return (
        <div>
            { router.pathname === '/corporate' ? 
                <SbCorpNavbar/> 
                : 
                <Navbar productsInCartExist={productsInCartExist} productsInBasket={productsInBasket}/> 
            }
                {children}
            <Footer/>
        </div>
    )
}