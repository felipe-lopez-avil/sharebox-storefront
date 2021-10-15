import styles from './WeAreSharebox.module.scss'
import Image from 'next/image'

export default function WeAreSharebox () {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Somos_Sharebox_img.png?v=1633969672"
                    layout="fill"
                    objectFit="cover"
                />
                <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Somos_Sharebox.png?v=1633969578" className={styles.curves}/>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.content}>
                    <h3>Somos Sharebox</h3>
                    <p>
                        Sharebox busca dar felicidad a través de cajas personalizadas para toda ocasión,  
                        más allá de lo material, buscamos regalar una experiencia.
                    </p>
                    <p>
                        Además, apoyamos a negocios y emprendimientos locales y mexicanos.
                    </p>
                </div>
            </div>
        </div>
    )
}