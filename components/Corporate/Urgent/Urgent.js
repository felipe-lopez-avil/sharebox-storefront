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
                <a href="https://api.whatsapp.com/send?phone=528134053769&text=%C2%A1Hola!%20Me%20comunico%20de%20la%20p%C3%A1gina%20de%20Sharebox%20Corporate%20y%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20imformaci%C3%B3n." target="blank">
                    <button>Contáctanos</button>
                </a>
            </div>
        </div>
    )
}