import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.module.scss'

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import { FiShoppingBag } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    collapse: {
        position: 'absolute',
        top: '85px',
        left: '-20px',
        backgroundColor: '#fff',
        padding: '20px',
        zIndex: '1',
        border: '2px solid #ececec',
        borderTop: '0px',
        borderRadius: '0px 0px 10px 10px',
        display: 'flex',
    },
    slide: {
        position: 'fixed',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
    }
  }));

export default function Navbar () {
    const classes = useStyles();
    
    const [windowReady, setWindowReady] = useState(false)
    const [gtg, setGtg] = useState(false);
    const [myb, setMyb] = useState(false);
    const [gfm, setGfm] = useState(false);

    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }
    }, [])

    const handleGTG = () => {
        setGtg(!gtg);
    };
    const handleMYB = () => {
        setMyb(!myb);
    };
    const handleGFM = () => {
        setGfm(!gfm);
    }; 

    const openMobileMenu = () => {
        setMobileMenu(true)
    }

    const closeMobileMenu = () => {
        setMobileMenu(false)
    }

    return (
        <>
            <div className={styles.desktopNavbar}>
                <div className={styles.logo}>
                    <Link href="/"><img src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399'/></Link>
                </div>

                {windowReady === true && 
                <div className={styles.navigation}>
                    
                    <div className={styles.navItem} onMouseEnter={handleGTG} onMouseLeave={handleGTG}>
                        <span>Gifts To Go! <ExpandMoreIcon/></span>

                        <Grow in={gtg} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.gtgDescription}>
                                    <div className={styles.gtgImage}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                    <h3>GIFTS TO GO</h3>
                                    <p>Descripción de Gifts To Go! Lorem Ipsum dolor sit amet</p>
                                </div>
                                <div className={styles.gtgCategories}>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Boxes</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Kits Armados</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Globos y Flores</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Snacks y Postres</div></Link>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem} onMouseEnter={handleMYB} onMouseLeave={handleMYB}>
                        <span>Make Your Box</span>

                        <Grow in={myb} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.itemImage}>
                                    <div className={styles.image}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                                <div className={styles.itemDescription}>
                                    <h3>Make Your Box</h3>
                                    <p>Descripción de Make Your Box Lorem Ipsum dolor sit amet</p>
                                    <Link href="/box-builder"><div className="button">¡Empieza a Crear!</div></Link>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem} onMouseEnter={handleGFM} onMouseLeave={handleGFM}>
                        <span>Gifts For Me</span>

                        <Grow in={gfm} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.itemImage}>
                                    <div className={styles.image}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                                <div className={styles.itemDescription}>
                                    <h3>GIFTS FOR ME</h3>
                                    <p>Descripción de Gifts For Me Lorem Ipsum dolor sit amet</p>
                                    <Link href="/gifts-for-me"><div className="button">¡Ver productos!</div></Link>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/corporate">
                            <span>Sharebox Corporate</span>
                        </Link>
                    </div>
                </div>
                }
                <div className={styles.icons}>
                    <div className={styles.icon}>
                        <Link href="/cart">                    
                            <FiShoppingBag style={{ fontSize: 27 }}/>
                        </Link>
                    </div>
                </div>  
            </div>
            
            <div className={styles.mobileNavbar}>
                <div className={styles.mobileLogo}>
                    <Link href="/"><img src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399'/></Link>
                </div>
                <div className={styles.icons}>
                    <div className={styles.mobileIcon}>
                        <Link href="/cart">
                            <FiShoppingBag style={{ fontSize: 25 }}/>
                        </Link>
                    </div>
                    <div className={styles.mobileIcon} onClick={openMobileMenu}>
                        <FaBars style={{ fontSize: 25 }}/>
                    </div>
                </div>
            </div>

            <Slide className={classes.slide} direction="left" in={mobileMenu} mountOnEnter unmountOnExit>
                <div className={styles.mobileMenuBackground}>Test</div>
            </Slide>
        </>
    )
}