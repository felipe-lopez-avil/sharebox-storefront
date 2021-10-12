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
                pagination={{
                    "clickable": true
                }}
                slidesPerView={1}
                autoplay={{
                    "delay": 50000,
                    "disableOnInteraction": false
                }}
            >
                <SwiperSlide>
                    <div className={`${styles.slide} ${styles.gtg}`}>
                        <div className={styles.flexContainer}>
                            <div className={styles.content}>
                                <h3>Gifts To Go!</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum enim et scelerisque bibendum. 
                                    Phasellus nec metus fringilla.
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum enim et scelerisque bibendum. 
                                    Phasellus nec metus fringilla.
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum enim et scelerisque bibendum. 
                                    Phasellus nec metus fringilla.
                                </p>
                                <button className={styles.gfmBtn}>Gifts For Me</button>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Gifts_for_me_1.png?v=1633965789"
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