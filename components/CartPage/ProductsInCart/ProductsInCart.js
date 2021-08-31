import styles from './ProductsInCart.module.scss'
import Image from 'next/image'

export default function ProductsInCart({image, product, selectedOptions, price, quantity, total}) {
    return (
        <div className={styles.products}>
            <div className={styles.firstField}>
                <div className={styles.image}>
                    <Image
                        src={image}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.variant}>
                    <div className={styles.title}>{product} <span className={styles.mobile}>({quantity})</span></div>
                    {selectedOptions.length > 0 && 
                        <div className={styles.details}>
                            <div className={styles.mobile}>{price}</div>
                            {selectedOptions.map(selectedOption => (
                                <div className={styles.option}>
                                    <span className={styles.underline}>{selectedOption.name}</span>: {selectedOption.value}
                                </div>
                            ))}
                            <div className={styles.mobile}>
                                <div>Total:</div>
                                <div>{total}</div>
                            </div>
                        </div>
                    }
                </div>
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
