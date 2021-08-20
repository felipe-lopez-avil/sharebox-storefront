import styles from './Urgent.module.scss'
import Image from 'next/image'

export default function Urgent () {
    return (
        <div className={styles.urgentOrders}>
            <div className={styles.image}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/person.png?v=1628096430"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.content}>
                <h3>¿Pedidos urgentes?</h3>
                <button>Contáctanos</button>
            </div>
        </div>
    )
}