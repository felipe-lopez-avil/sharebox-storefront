import styles from './InstaFeed.module.scss'
import Image from 'next/image'

import Grid from '@material-ui/core/Grid';

const photos = [
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/bday.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/baby.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/catalogo.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/wine.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/bride.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/parma.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/flores.jpg?v=1633974660",
    "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/te.jpg?v=1633974663",
]

export default function InstaFeed() {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Síguenos en @shareboxmx
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    <Grid container spacing={0}>
                        {photos.map(photo => (
                            <Grid item xs={6} sm={3}>
                                <div className={styles.spacing}>
                                    <div className={styles.image}>
                                        <Image
                                            src={photo}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    )
}