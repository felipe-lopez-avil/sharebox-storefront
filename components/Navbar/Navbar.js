import { useState } from 'react';
import BtgDropdown from './BtgDropdown'


import Link from 'next/link'
import styles from './Navbar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons"; // import the icons you need


import { FaBars, FaRegUser } from 'react-icons/fa'
import { FiShoppingBag } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GrSearch } from 'react-icons/gr'

export default function Navbar() {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return(
        <>
            <nav className={styles.Nav}>
                <div className={styles.LogoContainer}>
                    <div className={styles.NavLink}>
                        <Link href='/' >
                            <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399" className={styles.Logo}/>
                        </Link> 
                    </div>
                </div>


                <div className={styles.NavBurger} onClick={handleClick}>
                    <FontAwesomeIcon icon={ click ? faTimes : faBars}/>
                </div>

                {/* <ul className={click ? `${styles.MobileMenu} ${styles.Active}` : `${styles.MobileMenu}`}>
                    <li className={styles.NavItem} >
                        <Link href="/box-to-go" className={styles.MobileNavLink} onClick={closeMobileMenu}>
                            Box To Go
                        </Link>
                        
                    </li>
                    <li className={styles.NavItem}>
                        <Link href="/make-your-box" className={styles.MobileNavLink} onClick={closeMobileMenu}>
                            Make Your Box
                        </Link>
                    </li>
                    <li className={styles.NavItem}>
                        <Link href="/out-of-the-box" className={styles.MobileNavLink} onClick={closeMobileMenu}>
                            Out of the Box
                        </Link>
                    </li>
                </ul> */}


                <nav className={styles.NavMenu}>
                    <ul className={styles.SiteNav} >
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <div className={styles.AlignedContainer} >
                                To Go <MdKeyboardArrowDown className={styles.Arrow}/>   
                            </div>   
                        </li>
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <Link href='/make-your-box'>
                                Make your Box
                            </Link>
                        </li>
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <div className={styles.AlignedContainer} >
                                Out of the Box <MdKeyboardArrowDown className={styles.Arrow}/>
                            </div>
                        </li>
                        <li className={`${styles.NavLink} ${styles.Item}`}>
                            <Link href='/corporate'>
                                Sharebox Corporate
                            </Link>
                        </li> 
                    </ul>       
                </nav>
                <nav className={styles.NavIcon}>
                    <GrSearch className={styles.SearchIcon} />
                    <FaRegUser className={styles.UserIcon}/>
                    <FiShoppingBag className={styles.CartIcon}/>
                </nav>
            </nav>
        </> 
    )
}