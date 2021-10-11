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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum enim et scelerisque bibendum. 
                        Phasellus nec metus fringilla.
                    </p>
                </div>
            </div>
        </div>
    )
}