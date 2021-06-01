import styles from './Onboarding.module.scss'
import Image from 'next/image'

export default function Onboarding() {
    return (
        <div className={styles.onboarding}>

            <div className={`${styles.row} ${styles.firstRow}`}>
                <div className={`${styles.column} ${styles.second}`}>
                    <div>
                        <h3 className={styles.h}>Box To Go</h3>
                        <p className={styles.p}>Cajas pre-diseñadas especialmente para cada ocasión. Desde cajas de cumpleaños hatsa cajas para futuras novias</p>
                        <button>Ver Boxes</button>
                    </div>
                </div>
                <div className={`${styles.column} ${styles.first}`}>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/DSC_0017.jpg?v=1613781474"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div> 

            <div className={`${styles.row} ${styles.secondRow}`}>
                <div className={`${styles.column} ${styles.first}`}>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/smartmockups_kos6o1pp.jpg?v=1622566824"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={`${styles.column} ${styles.second}`}>
                    <div>
                        <h3 className={styles.h}>Make your Box</h3>
                        <p className={styles.p}>¿Indeciso? Explota tu lado creativo diseñando tu propia Sharebox</p>
                        <button>Crea tu Box</button>
                    </div>
                </div>
            </div>    

        </div>
    )
}