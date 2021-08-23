import React, { useEffect, useState } from 'react'
import styles from '../styles/gifts-to-go.module.scss'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
        padding: '0 5px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export default function GiftsToGo () {
    const classes = useStyles();

    const [windowReady, setWindowReady] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>GIFTS TO GO</h1>
            </div>
            {windowReady === true &&             
                <div className={styles.content}>
                    <div className={styles.filters}></div>
                    <div className={styles.products}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                <div className={styles.productContainer}>
                                    <div className={styles.productImage}></div>
                                    <div className={styles.productDescription}>
                                        <div className={styles.productTitle}>Product Title</div>
                                        <div className={styles.price}>$100.00</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                <div className={styles.productContainer}>
                                    <div className={styles.productImage}></div>
                                    <div className={styles.productDescription}>
                                        <div className={styles.productTitle}>Product Title</div>
                                        <div className={styles.price}>$100.00</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                <div className={styles.productContainer}>
                                    <div className={styles.productImage}></div>
                                    <div className={styles.productDescription}>
                                        <div className={styles.productTitle}>Product Title</div>
                                        <div className={styles.price}>$100.00</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                <div className={styles.productContainer}>
                                    <div className={styles.productImage}></div>
                                    <div className={styles.productDescription}>
                                        <div className={styles.productTitle}>Product Title</div>
                                        <div className={styles.price}>$100.00</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            }     
        </div>
    )
}