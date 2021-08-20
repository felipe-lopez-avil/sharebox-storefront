import Image from 'next/image'

import styles from '../styles/corporate.module.scss'
import Hero from '../components/Corporate/Hero/Hero'
import Moments from '../components/Corporate/Moments/Moments';
import HowItWorks from '../components/Corporate/HowItWorks/HowItWorks';

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
            <Hero/>
            <Moments/>
            <HowItWorks/>
        </div>
    )
}