import styles from './ProductsMakeYourBox.module.scss'
import Image from 'next/image'

export default function ProductsInCart({items}) {

    /* const deleteElement = (sendableCheckoutId, id) => {

        const checkoutId = sendableCheckoutId; // ID of an existing checkout
        const lineItemIdsToRemove = [
            btoa(id)
        ];
    
        // Remove an item from the checkout
        checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
            setCheckout(checkout)
        });
    } */

    return (
        <div className={styles.products}>
            <div className={styles.firstField}>
                <div className={styles.image}>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.variant}>
                    <div className={styles.title}>Make Your Box<span className={styles.mobile}> (1)</span></div>
                        <div className={styles.details}>
                            <div className={styles.mobile}>$price</div>
                            {items.map(item => (
                                <div className={styles.option}>
                                    <span className={styles.underline}>{item.title}</span>
                                </div>
                            ))}
                            <div className={styles.mobile}>
                                <div>Total:</div>
                                <div>$Total.price</div>
                            </div>
                            
                        </div>
                    <div className={styles.delete} /* onClick={() => deleteElement(sendableCheckoutId, id)} */>Eliminar</div>
                </div>
            </div>
            <div className={styles.field}>
                {items.map(item => (
                    <div>${item.variant.price}</div>
                ))}
            </div>
            <div className={styles.field}>
                1
            </div>
            <div className={styles.field}>
                $Total.price
            </div>
        </div>
    )
}