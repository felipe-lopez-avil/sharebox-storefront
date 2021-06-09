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

const Accordion = withStyles({
    root: {
        width: "100%",
        boxShadow: 'none',
        backgroundColor: '#003369',
        '&:not(:last-child)': {
            borderBottom: 0,
            padding: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        marginBottom: -1,
        minHeight: 56,
        fontSize: '1.8rem',
        fontWeight: 600,
        color: '#fff',
        textAlign: 'center',
        border: '2px solid #fff',
        borderRadius: '5px',
        padding: '10px',
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {
        borderRadius: '5px 5px 0px 0px',
    },
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: '20px',
        color: '#fff',
    },
  }))(MuiAccordionDetails);

export default function Corporate() {

    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return(
        <div className={styles.corporate}>
            <div className={styles.logoContainer}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-25.png?v=1619791981"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.forms}>
                <div className={styles.form}>
                    <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <div className={styles.summary}>
                                <span>Asesoría personalizada de regalos</span><MdKeyboardArrowDown/>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Details
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className={styles.form}>
                    <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <div className={styles.summary}>
                                <span>Regalos corporativos</span><MdKeyboardArrowDown/>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Details
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}