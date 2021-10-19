import styles from './SmallDetails.module.scss'
import Image from 'next/image'
import Link from 'next/link'

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
                    <Link href="/gifts-to-go">
                        <button>Gifts To Go</button>
                    </Link>
                </div>
            </div>
        </>
    )
}