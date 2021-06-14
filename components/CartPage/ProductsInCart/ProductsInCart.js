import styles from './ProductsInCart.module.scss'

export default function ProductsInCart({product, price, quantity, total}) {
    return (
        <div className={styles.products}>
            <div className={styles.firstField}>
                {product}
            </div>
            <div className={styles.field}>
                {price}
            </div>
            <div className={styles.field}>
                {quantity}
            </div>
            <div className={styles.field}>
                {total}
            </div>
        </div>
    )
}
