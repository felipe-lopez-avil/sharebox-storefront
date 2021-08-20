import styles from './HowItWorks.module.scss'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export default function HowItWorks () {
    const classes = useStyles();

    return (
        <div className={styles.howItWorks}>
            <div className={styles.header}>
                <h2>¿Cómo funciona?</h2>
                <p>Te contactaremos en menos de 60 min</p>
                <span>Lun-Vie de 9:00 am a 6:00 pm</span>
            </div>
            <div className={styles.steps}>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step1}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_1.png?v=1627590003"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            Llena el formulario
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step2}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_2.png?v=1627590004"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            Un asesor especializado te contestará
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step3}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_3.png?v=1627590003"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            Recibe una propuesta acorde a tus necesidades
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step4}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_4.png?v=1627590003"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            Valida o ajusta la propuesta
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step5}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_5.png?v=1627590004"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            Tu pedido está en camino. ¡Nosotros nos encargamos!
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <div className={styles.step6}>
                        <div className={styles.stepImage}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paso_6.png?v=1627590004"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            ¡Sorpresa! Vive la experiencia Sharebox Corporate
                        </div>
                    </div>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}