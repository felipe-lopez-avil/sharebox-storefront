import styles from './ProductDetailModal.module.scss'
import CloseIcon from '@material-ui/icons/Close';

import Image from 'next/image'

export default function ProductDetailModal ({setProductDetailActive, currentProductDeatil, addItem}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.imageColumn}>
                    <div className={styles.image}>
                        <Image
                            src={currentProductDeatil.images[0] !== undefined ? currentProductDeatil.images[0].src : 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className={styles.descriptionColumn}>
                    <div className={styles.productTitle}>{currentProductDeatil.title}</div>
                    <div className={styles.price}>${currentProductDeatil.price}</div>

                    <div className={styles.description}>
                        {currentProductDeatil.description}
                    </div>

                    <div 
                        className={styles.add} 
                        onClick={
                            (e) => addItem(
                                currentProductDeatil.id,
                                currentProductDeatil.title,
                                currentProductDeatil.price,
                                currentProductDeatil.images,
                                e
                            )
                        } >
                        AGREGAR
                    </div>
                </div>
                <div className={styles.close} onClick={() => setProductDetailActive(false)}>
                    <CloseIcon style={{ fontSize: '30px' }}/>
                </div>
            </div>
        </div>
    )
}