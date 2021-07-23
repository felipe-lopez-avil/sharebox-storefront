import { useState } from 'react';
import styles from './styles.module.scss'
import { client } from '../../../utils/shopify'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { BorderRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        border: '2px solid #e9e9e9',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
    fullheight: {
        height: '100%',
        marginTop: '0',
        marginBottom: '0',
        padding: '0px 50px',
    },
    icon: {
        fontSize: '8rem',
        color: '#003360'
    },
    grow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: '25px 30px',
    },
    logoBlue: {
        color: '#028ab5',
        cursor: 'pointer',
    }
}));
    
export default function ThirdStep () {
    const classes = useStyles();

    const [checked, setChecked] = useState(false)

    const handlePopup = (e) => {
        e.preventDefault();
        setChecked(!checked);
    };

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Acompaña tu Box con un detalle especial</h2>
            </div>
            <div className={styles.cardContainer}>
                <Grid container spacing={3} className={classes.fullheight}>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper} onClick={(e) => {handlePopup(e)}}>
                            <div className={styles.categoryContainer}>
                                <RadioButtonUncheckedIcon className={classes.icon}/>
                                <h4>Globos</h4>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper}>
                            <div className={styles.categoryContainer}>
                                <LocalFloristOutlinedIcon className={classes.icon}/>
                                <h4>Flores</h4>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper}>
                            <div className={styles.categoryContainer}>
                                <CakeOutlinedIcon className={classes.icon}/>
                                <h4>Pasteles y Velas</h4>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Grow in={checked} className={classes.grow}>
                <div className={styles.productsContainer}>
                    <div className={styles.categoryTitle}>
                        <ArrowBackIosIcon className={classes.logoBlue} onClick={(e) => {handlePopup(e)}}/>
                        <div className={styles.title}>
                            Category Title
                        </div>
                    </div>
                </div>
            </Grow>
        </div>   
    )
    
}