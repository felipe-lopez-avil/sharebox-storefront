import styles from '../styles/cart.module.scss'

import ProductsInCart from '../components/CartPage/ProductsInCart/ProductsInCart'

export default function Cart() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cartHeader}>
                    <h1>Carrito de Compras</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.productsSummary}>
                        <div className={styles.fields}>
                            <div className={styles.firstField}>
                                Producto
                            </div>
                            <div className={styles.field}>
                                Precio
                            </div>
                            <div className={styles.field}>
                                Cantidad
                            </div>
                            <div className={styles.field}>
                                Total
                            </div>
                        </div>
                        <ProductsInCart product='Box Personalizada' price='$500' quantity='2' total='$1000' />
                        <div className={styles.subtotal}>
                            <div className={styles.title}>
                                SUBTOTAL
                            </div>
                            <div className={styles.price}>
                                $1000
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardAndDate}>
                        <div className={styles.choose}>
                            <button className={styles.chooseButton}>SELECCIONA UNA TARJETA TARJETA</button>
                            <button className={styles.chooseButton}>SELECCIONA LA HORA Y FECHA DE ENTREGA</button>
                        </div>
                        <div className={styles.options}>
                            <button className={styles.continue}>CONTINUAR CON EL PAGO</button>
                            <button className={styles.goBack}>SEGUIR COMPRANDO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}