import styles from './SmallDetails.module.scss'
import Image from 'next/image'

export default function SmallDetails () {
    return (
        <>
            <div className={styles.stripe}>
                Sharing Is Caring • Envíos Gratis / Free Share • Síguenos en @shareboxmx
            </div>
            <div className={styles.banner}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Pequenos_Detalles_Se_va_a_cambiar_la_foto.png?v=1633968444"
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