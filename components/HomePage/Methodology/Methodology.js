import styles from './Methodology.module.scss'
import Image from 'next/image'

export default function Methodology () {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Selecciona_un_regalo_img.png?v=1633971299"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={styles.flexContainer}>
                        <div className={styles.content}>
                            <div className={styles.icon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Selecciona_un_regalo.png?v=1633971299"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h5>1. Selecciona un regalo</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <Image
                        src="/enviar.png"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={styles.flexContainer}>
                        <div className={styles.content}>
                            <div className={styles.icon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Enviar.png?v=1633971299"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h5>2. Personaliza tu mensaje</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <Image
                        src="/paperplane.png"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={styles.flexContainer}>
                        <div className={styles.content}>
                            <div className={styles.icon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Paper_plane.png?v=1633971299"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h5>3. Envía y comparte felicidad</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <Image
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Experiencia_sharebox_2a.png?v=1634314303"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={styles.flexContainer}>
                        <div className={styles.content}>
                            <div className={styles.icon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Experiencia_Sharebox.png?v=1633971299"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h5>4. Vive la experiencia Sharebox</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}