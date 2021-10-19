import styles from './ProductsMakeYourBox.module.scss'
import Image from 'next/image'

export default function ProductsInCart({items, sendableCheckoutId, setCheckout, checkout}) {

    const deleteElements = (sendableCheckoutId, id) => {

        const checkoutId = sendableCheckoutId; // ID of an existing checkout

        const lineItemIdsToRemove = items.map(function(item){
            return btoa(item.id)
        })
    
        // Remove an item from the checkout
        checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
            setCheckout(checkout)
        }); 
    } 
    let totalPrice = 0;
    let prices = items.map(item => (parseFloat(item.variant.price) * item.quantity))

    prices.forEach(price => {
        totalPrice += price
    });

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
                    <div className={styles.title}>Make Your Box</div>
                        <div className={styles.details}>
                            {items.map(item => (
                                <div className={styles.option}>
                                    <span className={styles.underline}>• {item.title}</span><span className={styles.mobile}> - ${item.variant.price} ({item.quantity})</span>
                                </div>
                            ))}
                            <div className={styles.mobile}>
                                <div>Total:</div>
                                <div>${totalPrice}</div>
                            </div>
                            
                        </div>
                    <div className={styles.delete} onClick={() => deleteElements(sendableCheckoutId)} >Eliminar</div>
                </div>
            </div>
            <div className={styles.field}>
                {items.map(item => (
                    <div className={styles.eachPrice}>${item.variant.price}</div>
                ))}
            </div>
            <div className={styles.field}>
                {items.map(item => (
                    <div className={styles.eachPrice}>{item.quantity}</div>
                ))}
            </div>
            <div className={styles.field}>
                ${totalPrice}
            </div>
        </div>
    )
}