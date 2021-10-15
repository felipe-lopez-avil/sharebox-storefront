import styles from './Onboarding.module.scss'
import Image from 'next/image'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Onboarding() {
    return(
        <div className={styles.container}>
            <Swiper 
                navigation={true}
                slidesPerView={1}
                autoplay={{
                    "delay": 5000,
                    "disableOnInteraction": false
                }}
            >
                <SwiperSlide>
                    <div className={`${styles.slide} ${styles.gtg}`}>
                        <div className={styles.flexContainer}>
                            <div className={styles.content}>
                                <h3>Gifts To Go!</h3>
                                <p>
                                    ¡Sorpresas listas para llevar! Regala a tus personas queridas una caja acorde a la ocasión que se esté 
                                    celebrando. 
                                </p>
                                <button className={styles.gtgBtn}>Gifts To Go</button>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Gifts_to_go.png?v=1633965076"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles.slide} ${styles.myb}`}>
                        <div className={styles.flexContainer}>
                            <div className={styles.content}>
                                <h3>Make Your Own Box!</h3>
                                <p>
                                    ¡Tú sabes lo que le gusta! Arma una caja desde cero con los productos que más le gusten a la persona 
                                    especial que quieras sorprender. Tú lo conoces mejor que nadie.
                                </p>
                                <button className={styles.mybBtn}>Make Your Box</button>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Mano_Cel_3.png?v=1633987558"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles.slide} ${styles.gfm}`}>
                        <div className={styles.flexContainer}>
                            <div className={styles.content}>
                                <h3>Gifts For Me!</h3>
                                <p>
                                    ¿Viste algún producto que te haya gustado personalmente? No te quedes con las ganas y cómpralo para ti.
                                </p>
                                <button className={styles.gfmBtn}>Gifts For Me</button>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Gifts_for_me_junto.png?v=1634247537"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Our_best_sellers.png?v=1633962681" className={styles.curves}/>
        </div>
    )
}