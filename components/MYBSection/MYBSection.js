import styles from './MYBSection.module.scss'

export default function MYBSection({title}){
    return (
        <div className={styles.productsDisplay}>
            <div className={styles.header}>
                <h2>{title}</h2>
            </div>
            <div className={styles.products}>
                <h2>LISTA DE PRODUCTOS</h2>
            </div>
        </div>
    )
}
