import styles from './styles.module.scss'
import Image from 'next/image'


export default function FourthStep ({step1Items, step2Items, step3Items}) {

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>¡Estás a punto de compartir felicidad!</h2>
                <h3>Estos son los artículos en tu box</h3>
            </div>
            <div className={styles.resumeContainer}>
                <div className={styles.productsInCart}>

                    {step1Items.productID !== '' &&
                        <div className={styles.productResume}>
                            <div className={styles.imageAndInfo}>
                                <div className={styles.productCover}>
                                    <Image
                                        src={step1Items.image}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className={styles.infoResume}>
                                    <div className={styles.productName}>{step1Items.title}</div>
                                    <div className={styles.productPrice}>{step1Items.price}</div>
                                </div>
                            </div>
                            <div className={styles.quantityInfo}>
                                x{step1Items.quantity}
                            </div>
                        </div>
                    }

                    {step2Items.map(item => (
                        <div className={styles.productResume}>
                            <div className={styles.imageAndInfo}>
                                <div className={styles.productCover}>
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className={styles.infoResume}>
                                    <div className={styles.productName}>{item.title}</div>
                                    <div className={styles.productPrice}>{item.price}</div>
                                </div>
                            </div>
                            <div className={styles.quantityInfo}>
                                x{item.quantity}
                            </div>
                        </div>
                    ))}

                    {step3Items.map(item => (
                        <div className={styles.productResume}>
                            <div className={styles.imageAndInfo}>
                                <div className={styles.productCover}>
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className={styles.infoResume}>
                                    <div className={styles.productName}>{item.title}</div>
                                    <div className={styles.productPrice}>{item.price}</div>
                                </div>
                            </div>
                            <div className={styles.quantityInfo}>
                                x{item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
    )
}