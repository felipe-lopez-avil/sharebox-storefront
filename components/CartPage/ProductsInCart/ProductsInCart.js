import styles from './ProductsInCart.module.scss'
import Image from 'next/image'
import client from '../../../utils/shopify'

export default function ProductsInCart({image, product, selectedOptions, price, quantity, total, id, sendableCheckoutId, setCheckout, checkout}) {

    const deleteElement = (id) => {

        const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC80N2Y0ZDc4NzdmM2JhNmJhMTYzY2NlOTUxNDUxMDkwMT9rZXk9NTYwNmYxMDFkMTJkODI5OWRmMDkyMmJhYzAwODNmODY='; // ID of an existing checkout
        const lineItemIdsToRemove = [
            btoa(id)
        ];
    
        // Remove an item from the checkout
        checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
            setCheckout(checkout)
        });
    }

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
                            <div className={styles.delete} onClick={() => deleteElement(id)}>Eliminar</div>
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