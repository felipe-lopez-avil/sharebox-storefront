import Image from 'next/image'
import styles from './Banner.module.scss'

export default function Banner() {
    return(
        <div>
            <div className={styles.banner}>
                <Image
                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/banner3_box_to_go.png?v=1620842699"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.tagLine}>
                <span>#SharingIsCaring</span>
            </div>
        </div>
    )
}