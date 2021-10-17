import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.module.scss'
import { useRouter } from 'next/router'

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import { FiShoppingBag } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';


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
        zIndex: '100000',
        display: 'flex',
        justifyContent: 'flex-end',
    }
  }));

export default function Navbar () {
    const router = useRouter();
    const classes = useStyles();
    
    const [navBackgroung, setNavBackgroung] = useState(false)
    
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

    if(windowReady){
        const changeBackground = () => {
            if(window.scrollY >= 80){
                setNavBackgroung(true)
            }else{
                setNavBackgroung(false)
            }
        }
    
        window.addEventListener('scroll', changeBackground)
    }

    return (
        <>
            <div className={`${styles.desktopNavbar} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`}>
                {/* <div className={styles.background}></div> */}
                <div className={styles.logo}>
                    <Link href="/">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className={navBackgroung || router.pathname !== '/' ? styles.active : ''}
                            width="3557.000000pt" height="400.000000pt" viewBox="0 0 3557.000000 400.000000"
                            preserveAspectRatio="xMidYMid meet">
                            <metadata>
                            Created by potrace 1.16, written by Peter Selinger 2001-2019
                            </metadata>
                            <g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
                            stroke="none">
                            <path d="M1440 3989 c-563 -64 -1014 -332 -1199 -711 -68 -139 -92 -240 -98
                            -409 -6 -166 5 -271 44 -394 125 -402 483 -665 1032 -759 52 -9 284 -32 515
                            -51 239 -20 464 -44 521 -56 296 -60 460 -198 473 -397 22 -326 -319 -512
                            -936 -512 -317 0 -539 54 -775 190 -148 84 -322 237 -398 350 -19 27 -37 50
                            -40 50 -13 0 -574 -411 -577 -423 -4 -17 104 -180 173 -260 159 -185 421 -359
                            695 -460 351 -130 832 -176 1260 -121 431 56 782 208 1016 439 201 200 291
                            407 301 696 19 513 -217 861 -714 1053 -216 84 -405 116 -946 161 -232 19
                            -460 42 -505 51 -212 39 -350 124 -410 253 -23 47 -27 70 -27 146 0 77 4 99
                            27 147 73 156 256 265 528 314 133 24 401 24 535 0 359 -65 623 -242 791 -531
                            9 -17 38 1 301 186 l291 204 -24 46 c-40 80 -138 201 -252 311 -341 329 -821
                            502 -1381 497 -80 -1 -180 -5 -221 -10z"/>
                            <path d="M4590 2000 l0 -1920 345 0 345 0 0 795 0 795 1035 0 1035 0 0 -795 0
                            -795 345 0 345 0 0 1920 0 1920 -345 0 -345 0 0 -780 0 -780 -1035 0 -1035 0
                            0 780 0 780 -345 0 -345 0 0 -1920z"/>
                            <path d="M10481 3898 c-5 -13 -336 -871 -736 -1908 -400 -1037 -730 -1891
                            -732 -1898 -4 -10 71 -12 372 -10 l377 3 187 490 188 490 894 2 894 3 191
                            -493 191 -492 378 -3 c301 -2 376 0 372 10 -3 7 -336 870 -740 1918 l-735
                            1905 -546 3 -546 2 -9 -22z m880 -1363 l297 -770 -621 -3 c-341 -1 -622 0
                            -625 2 -2 3 136 368 309 811 l313 806 15 -38 c8 -21 149 -384 312 -808z"/>
                            <path d="M14030 2000 l0 -1920 345 0 345 0 0 705 0 705 586 -2 587 -3 357
                            -700 357 -700 412 -3 c226 -1 411 2 411 6 0 5 -184 350 -409 767 l-410 759 72
                            39 c570 309 797 1010 512 1582 -170 341 -466 564 -877 658 -91 21 -113 21
                            -1190 24 l-1098 4 0 -1921z m2193 1202 c256 -71 397 -250 397 -502 0 -255
                            -145 -435 -404 -500 -76 -19 -112 -20 -788 -20 l-708 0 0 526 0 525 713 -3
                            c694 -4 714 -5 790 -26z"/>
                            <path d="M18570 2000 l0 -1920 1575 0 1575 0 0 350 0 350 -1230 0 -1230 0 0
                            440 0 440 1190 0 1190 0 0 345 0 345 -1190 0 -1190 0 0 440 0 440 1215 0 1215
                            0 0 345 0 345 -1560 0 -1560 0 0 -1920z"/>
                            <path d="M22990 2000 l0 -1921 1158 4 c1260 4 1196 1 1376 61 432 145 730 543
                            753 1002 10 204 -22 380 -97 541 -49 106 -88 162 -173 250 l-70 72 84 89 c186
                            196 268 434 256 747 -11 288 -109 522 -305 727 -131 137 -276 230 -449 288
                            -181 60 -177 60 -1410 60 l-1123 0 0 -1920z m2220 1220 c189 -30 338 -178 372
                            -370 36 -207 -114 -430 -327 -485 -51 -13 -166 -15 -812 -15 l-753 0 0 440 0
                            440 728 0 c444 0 752 -4 792 -10z m59 -1579 c162 -50 282 -189 312 -359 36
                            -201 -105 -419 -312 -483 -57 -18 -103 -19 -820 -19 l-759 0 0 440 0 440 759
                            0 c717 0 763 -1 820 -19z"/>
                            <path d="M27310 2000 l0 -1920 1900 0 1900 0 0 1920 0 1920 -1900 0 -1900 0 0
                            -1920z m2225 1491 c426 -99 730 -330 918 -698 133 -261 184 -515 174 -857 -5
                            -182 -19 -284 -57 -425 -180 -665 -725 -1057 -1430 -1028 -681 29 -1172 450
                            -1316 1131 -32 148 -44 464 -25 623 52 425 245 786 540 1008 156 118 368 212
                            561 248 133 25 134 25 345 22 159 -3 219 -8 290 -24z"/>
                            <path d="M31986 3908 c5 -7 291 -428 636 -935 346 -507 631 -929 634 -936 3
                            -8 -276 -421 -657 -973 -364 -527 -664 -964 -666 -971 -4 -10 79 -13 423 -13
                            l429 0 479 735 c264 404 482 735 485 735 4 0 222 -331 485 -735 l480 -735 428
                            0 c235 0 428 2 428 6 0 3 -299 439 -665 969 -366 529 -665 968 -665 974 0 6
                            284 427 630 936 347 509 633 932 637 940 4 13 -52 15 -423 15 l-429 -1 -450
                            -709 c-247 -390 -452 -709 -455 -709 -3 -1 -208 318 -456 707 l-450 707 -433
                            3 c-346 2 -431 0 -425 -10z"/>
                            </g>
                        </svg>
                    </Link>
                </div>

                {windowReady === true && 
                <div className={styles.navigation}>
                    
                    <div className={`${styles.navItem} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`} onMouseEnter={handleGTG} onMouseLeave={handleGTG}>
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
                                    <Link href="/gifts-to-go"><div className={ styles.categoryLink}>Boxes</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Kits Armados</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Globos y Flores</div></Link>
                                    <Link href="/gifts-to-go"><div className={styles.categoryLink}>Snacks y Postres</div></Link>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={`${styles.navItem} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`} onMouseEnter={handleMYB} onMouseLeave={handleMYB}>
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
                    <div className={`${styles.navItem} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`} onMouseEnter={handleGFM} onMouseLeave={handleGFM}>
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
                    <div className={`${styles.navItem} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`}>
                        <Link href="/corporate">
                            <span>Sharebox Corporate</span>
                        </Link>
                    </div>
                </div>
                }
                <div className={styles.icons}>
                    <div className={`${styles.icon} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`}>
                        <Link href="/cart">                    
                            <FiShoppingBag style={{ fontSize: 27 }}/>
                        </Link>
                    </div>
                </div>  
            </div>
            
            <div className={`${styles.mobileNavbar} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`}>
                <div className={styles.mobileLogo}>
                    <Link href="/">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className={navBackgroung || router.pathname !== '/' ? styles.active : ''}
                            width="3557.000000pt"  viewBox="0 0 3557.000000 400.000000"
                            preserveAspectRatio="xMidYMid meet">
                            <metadata>
                            Created by potrace 1.16, written by Peter Selinger 2001-2019
                            </metadata>
                            <g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
                            stroke="none">
                            <path d="M1440 3989 c-563 -64 -1014 -332 -1199 -711 -68 -139 -92 -240 -98
                            -409 -6 -166 5 -271 44 -394 125 -402 483 -665 1032 -759 52 -9 284 -32 515
                            -51 239 -20 464 -44 521 -56 296 -60 460 -198 473 -397 22 -326 -319 -512
                            -936 -512 -317 0 -539 54 -775 190 -148 84 -322 237 -398 350 -19 27 -37 50
                            -40 50 -13 0 -574 -411 -577 -423 -4 -17 104 -180 173 -260 159 -185 421 -359
                            695 -460 351 -130 832 -176 1260 -121 431 56 782 208 1016 439 201 200 291
                            407 301 696 19 513 -217 861 -714 1053 -216 84 -405 116 -946 161 -232 19
                            -460 42 -505 51 -212 39 -350 124 -410 253 -23 47 -27 70 -27 146 0 77 4 99
                            27 147 73 156 256 265 528 314 133 24 401 24 535 0 359 -65 623 -242 791 -531
                            9 -17 38 1 301 186 l291 204 -24 46 c-40 80 -138 201 -252 311 -341 329 -821
                            502 -1381 497 -80 -1 -180 -5 -221 -10z"/>
                            <path d="M4590 2000 l0 -1920 345 0 345 0 0 795 0 795 1035 0 1035 0 0 -795 0
                            -795 345 0 345 0 0 1920 0 1920 -345 0 -345 0 0 -780 0 -780 -1035 0 -1035 0
                            0 780 0 780 -345 0 -345 0 0 -1920z"/>
                            <path d="M10481 3898 c-5 -13 -336 -871 -736 -1908 -400 -1037 -730 -1891
                            -732 -1898 -4 -10 71 -12 372 -10 l377 3 187 490 188 490 894 2 894 3 191
                            -493 191 -492 378 -3 c301 -2 376 0 372 10 -3 7 -336 870 -740 1918 l-735
                            1905 -546 3 -546 2 -9 -22z m880 -1363 l297 -770 -621 -3 c-341 -1 -622 0
                            -625 2 -2 3 136 368 309 811 l313 806 15 -38 c8 -21 149 -384 312 -808z"/>
                            <path d="M14030 2000 l0 -1920 345 0 345 0 0 705 0 705 586 -2 587 -3 357
                            -700 357 -700 412 -3 c226 -1 411 2 411 6 0 5 -184 350 -409 767 l-410 759 72
                            39 c570 309 797 1010 512 1582 -170 341 -466 564 -877 658 -91 21 -113 21
                            -1190 24 l-1098 4 0 -1921z m2193 1202 c256 -71 397 -250 397 -502 0 -255
                            -145 -435 -404 -500 -76 -19 -112 -20 -788 -20 l-708 0 0 526 0 525 713 -3
                            c694 -4 714 -5 790 -26z"/>
                            <path d="M18570 2000 l0 -1920 1575 0 1575 0 0 350 0 350 -1230 0 -1230 0 0
                            440 0 440 1190 0 1190 0 0 345 0 345 -1190 0 -1190 0 0 440 0 440 1215 0 1215
                            0 0 345 0 345 -1560 0 -1560 0 0 -1920z"/>
                            <path d="M22990 2000 l0 -1921 1158 4 c1260 4 1196 1 1376 61 432 145 730 543
                            753 1002 10 204 -22 380 -97 541 -49 106 -88 162 -173 250 l-70 72 84 89 c186
                            196 268 434 256 747 -11 288 -109 522 -305 727 -131 137 -276 230 -449 288
                            -181 60 -177 60 -1410 60 l-1123 0 0 -1920z m2220 1220 c189 -30 338 -178 372
                            -370 36 -207 -114 -430 -327 -485 -51 -13 -166 -15 -812 -15 l-753 0 0 440 0
                            440 728 0 c444 0 752 -4 792 -10z m59 -1579 c162 -50 282 -189 312 -359 36
                            -201 -105 -419 -312 -483 -57 -18 -103 -19 -820 -19 l-759 0 0 440 0 440 759
                            0 c717 0 763 -1 820 -19z"/>
                            <path d="M27310 2000 l0 -1920 1900 0 1900 0 0 1920 0 1920 -1900 0 -1900 0 0
                            -1920z m2225 1491 c426 -99 730 -330 918 -698 133 -261 184 -515 174 -857 -5
                            -182 -19 -284 -57 -425 -180 -665 -725 -1057 -1430 -1028 -681 29 -1172 450
                            -1316 1131 -32 148 -44 464 -25 623 52 425 245 786 540 1008 156 118 368 212
                            561 248 133 25 134 25 345 22 159 -3 219 -8 290 -24z"/>
                            <path d="M31986 3908 c5 -7 291 -428 636 -935 346 -507 631 -929 634 -936 3
                            -8 -276 -421 -657 -973 -364 -527 -664 -964 -666 -971 -4 -10 79 -13 423 -13
                            l429 0 479 735 c264 404 482 735 485 735 4 0 222 -331 485 -735 l480 -735 428
                            0 c235 0 428 2 428 6 0 3 -299 439 -665 969 -366 529 -665 968 -665 974 0 6
                            284 427 630 936 347 509 633 932 637 940 4 13 -52 15 -423 15 l-429 -1 -450
                            -709 c-247 -390 -452 -709 -455 -709 -3 -1 -208 318 -456 707 l-450 707 -433
                            3 c-346 2 -431 0 -425 -10z"/>
                            </g>
                        </svg>
                    </Link>
                </div>
                <div className={styles.icons}>
                    <div className={`${styles.mobileIcon} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`}>
                        <Link href="/cart">
                            <FiShoppingBag style={{ fontSize: 25 }}/>
                        </Link>
                    </div>
                    <div className={`${styles.mobileIcon} ${navBackgroung || router.pathname !== '/' ? styles.active : ''}`} onClick={openMobileMenu}>
                        <FaBars style={{ fontSize: 25 }}/>
                    </div>
                </div>
            </div>

            <Slide className={classes.slide} direction="left" in={mobileMenu} mountOnEnter unmountOnExit>
                <div>
                    <div className={styles.mobileMenuBackground}>
                        <div className={styles.closeSection}>
                            <CloseIcon style={{ fontSize: 40 }} onClick={closeMobileMenu}/>
                        </div>
                        <div className={styles.mobileNavigation}>
                            <Link href="/gifts-to-go">
                                <div className={styles.mobileNavItem} onClick={closeMobileMenu}>
                                    Gifts To Go
                                </div>
                            </Link>
                            <Link href="/make-your-box">
                                <div className={styles.mobileNavItem} onClick={closeMobileMenu}>
                                    Make Your Box
                                </div>
                            </Link>
                            <Link href="/gifts-for-me">
                                <div className={styles.mobileNavItem} onClick={closeMobileMenu}>
                                    Gifts For Me
                                </div>
                            </Link>
                            <Link href="/corporate">
                                <div className={styles.mobileNavItem} onClick={closeMobileMenu}>
                                   Sharebox Corporate
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    )
}