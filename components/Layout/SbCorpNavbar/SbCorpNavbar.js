import React, { useState } from 'react'
import styles from './SbCorpNavbar.module.scss'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'

import { Link as ScrollTo, animateScroll as scroll } from "react-scroll";

import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    slide: {
        position: 'fixed',
        width: '100%',
        backgroundColor: '#0033608c',
    },
    menu: {
        paddingTop: '85px',
        color: '#fff'
    },
}));


export default function SbCorpNavbar() {
    const classes = useStyles();

    const [deployed, setDeployed] = useState(false)

    const handleDeployed = () => {
        setDeployed(!deployed);
    };

    return(
        <>
            <div className={styles.corpNavbar}>
                <div className={styles.logo}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Logo_sharebox_corporate_61c87cde-e472-4cf6-8edc-3ad30f5f0f3e.png?v=1629318611"/>
                </div>
                <div className={styles.nav}>
                    <div className={styles.navItem}>
                        <ScrollTo
                            activeClass="active"
                            to="inicio"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            Inicio
                        </ScrollTo>
                    </div>
                    <div className={styles.navItem}>
                        <ScrollTo
                            activeClass="active"
                            to="nosotros"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Nosotros
                        </ScrollTo>
                    </div>
                    <div className={styles.navItem}>
                        <ScrollTo
                            activeClass="active"
                            to="contacto"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Contáctanos
                        </ScrollTo>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/">Volver a Sharebox</Link>
                    </div>
                </div>
                <div className={styles.bars} onClick={handleDeployed}>
                    <FaBars style={{ fontSize: 25, color: "rgba(255,255,255,.55)" }}/>
                </div>
            </div>
            <Slide className={classes.slide} direction="down" in={deployed} mountOnEnter unmountOnExit>
                <div>
                    <div className={styles.mobileMenu}>
                        <div className={styles.mobileItem}>
                            <a href="">Inicio</a>
                        </div>
                        <div className={styles.mobileItem}>
                            <a href="">Nosotros</a>
                        </div>
                        <div className={styles.mobileItem}>
                            <a href="">Contáctanos</a>
                        </div>
                        <div className={styles.mobileItem}>
                            <Link href="/">Volver a Sharebox</Link>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    )
}