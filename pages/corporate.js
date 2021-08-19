import Image from 'next/image'

import styles from '../styles/corporate.module.scss'

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { MdKeyboardArrowDown } from 'react-icons/md'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


export default function Corporate() {

    return(
        <div className={styles.corporate}>
            <div className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Main_3b.png?v=1628265752"/>
                </div>
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
            </div>
        </div>
    )
}