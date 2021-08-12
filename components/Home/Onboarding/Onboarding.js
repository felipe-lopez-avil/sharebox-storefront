import styles from './Onboarding.module.scss'
import Image from 'next/image'

import HowItWorks from '../HowItWorks/HowItWorks'


export default function Onboarding() {
    return (
        <div className={styles.container}>
            <div className={styles.onboarding}>
                <div className={styles.contentBlock}>
                    <div className={styles.content}>
                        <h2>Sharebox</h2>
                        <p>Sharebox busca dar felicidad a través de cajas personalizadas para toda ocasión, 
                            con un sentido más allá de lo material, buscamos regalar una experiencia. 
                            <br/><br/>
                            Además, apoyamos a negocios y emprendimientos locales y mexicanos.
                        </p>
                        <button>Conoce más</button>
                    </div>
                </div>
            </div>
            <HowItWorks/>
            <div className={styles.floatingImg}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Floating_image.png?v=1628691725"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
        
    )
}