import React, { useState } from 'react'
import styles from './Filters.module.scss'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Slider from '@material-ui/core/Slider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { width } from 'dom-helpers';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      boxShadow: 'none'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    sliderRoot: {
        width: 300,
      },
}));

function valuetext(value) {
    return `${value}°C`;
}

export default function Filters () {
    const classes = useStyles();

    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.priceRange}>
            <Accordion className={classes.root}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <h5 className={classes.heading}>Rango de Precio:</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{width: '100%'}}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            /* min={300}
                            max={800}
                            step={100} */
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
            </div>
            <div className={styles.category}>
                <Accordion className={classes.root}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <h5 className={classes.heading}>Por ocasión:</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}