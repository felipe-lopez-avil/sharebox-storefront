import styles from './SmallDetails.module.scss'
import Image from 'next/image'

export default function SmallDetails () {
    return (
        <>
            <div className={styles.stripe}>
                Sharing Is Caring • Síguenos en @shareboxmx
            </div>
            <div className={styles.banner}>
                <Image
                    src="/small-details.png"
                    layout="fill"
                    objectFit="cover"
                />
                <div className={styles.caption}>
                    <h3>Pequeños detalles  <br/> para demostrar tu afecto</h3>
                    <button>Out Of The Box</button>
                </div>
            </div>
        </>
    )
}