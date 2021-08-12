import styles from './InstaFeed.module.scss'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    lineHeight: '0',
  }
}));

export default function InstaFeed() {
    const classes = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.follow}>
                <div className={styles.instaIcon}></div>
                <div>Síguenos en @shareboxmx</div>
            </div>
            <div className={styles.instaGrid}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.grid}>
                    <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/square-img.jpg?v=1628783279" className={styles.img}/>
                  </Grid>
                </Grid>
            </div>
        </div>
    )
}