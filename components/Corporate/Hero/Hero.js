import React, { useState, useEffect } from 'react'

import styles from './Hero.module.scss'
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';

export default function Hero () {

    const [image, setImage] = useState(false)
    const [text, setText] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setImage(true)
            setText(true)
        }, 600);
    }, [])

    return (
        <div className={styles.heroSection} id="inicio">
            <Grow in={image}>
                <div className={styles.heroImage}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Main_3b.png?v=1628265752"/>
                </div>
            </Grow>
            <Slide direction="left" in={text} mountOnEnter unmountOnExit timeout={700}>
                <div className={styles.heroContent}>
                    <h1>Tu generador <br/> de experiencias</h1>
                    <div className={styles.separator}></div>
                    <p>
                        Somos el mejor aliado de tu Negocio o Institución.
                        Creamos experiencias únicas, a través de BOXES personalizadas
                        para tus clientes, colaboradores y cualquier ocasión.
                    </p>
                    <button>¡Contáctanos ahora!</button>
                </div>
            </Slide>
        </div>
    )
}