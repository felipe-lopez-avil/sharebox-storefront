import Link from 'next/link'
import Image from 'next/image'

import styles from './Recommendations.module.scss'

export default function Products({collection, link}){

    const products = collection.products;

    /* console.log(products)
    console.log("<----- SEPARADOR ----->")
    products.map(producto => (
        console.log(producto.images[0].src)
    )) */
    

    return (
        <div className={styles.supercontainer}>
            <div className={styles.productsContainer}>
                {products.map(product => (
                    
                    <Link href={`/${link}/${product.handle}`}>
                        <div className={styles.productContainer}>
                            <div className={styles.productImg}>
                                <Image
                                    src={product.images[0].src}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                
                                <div className={styles.overlay}>
                                    <a href="#" className={styles.buyNow}>Comprar Ahora</a>
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <div className={styles.type}>
                                    <a href="#"><h4>{product.title}</h4></a>
                                    <span>${product.variants[0].price}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            


           {/*  <div className={styles.productsContainer}>
                {products.map(product => (
                    <Link href={`/products/${product.slug}`}> ♠
                        <div className={styles.productContainer}>
                            <div className={styles.productImg}>
                                <img src={fromImageToUrl(product.image)}/>
                                <div className={styles.overlay}>
                                    <a href="#" className={styles.buyNow}>Comprar Ahora</a>
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <div className={styles.type}>
                                    <a href="#"><h4>{product.title}</h4></a>
                                    <span>Just Because</span>
                                </div>
                                <a href="#" className={styles.price}>${product.price}.00</a>
                            </div>
                        </div>
                    </Link>
                ))}
            </div> */}

        </div>
    )
}
