import { useState, useEffect } from 'react'
import styles from './Hero.module.scss'
import Link from 'next/link'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
    
    const [windowReady, setWindowReady] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true)
        }
    }, [])

    return (
        <div className={styles.heroSection}>
            {windowReady ?
                <Swiper 
                    navigation={true}
                    slidesPerView={1}
                    observer={true} 
                    autoplay={{
                        "delay": 5000,
                        "disableOnInteraction": false
                    }}
                >
                    <SwiperSlide>
                        <div className={`${styles.slide} ${styles.alignLeft}`}>
                            <video 
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2.mp4?v=1633726286" 
                                poster="/gtg-placeholder.png"
                                autoPlay 
                                loop 
                                muted
                                playsinline
                            >
                            </video>
                            <div className={styles.heroContent}>
                                <h2>Gifts To Go</h2>
                                <div>
                                    Sorpresas listas para llevar, ¡perfectas para cualquier ocasión!
                                </div>
                                <Link href="/gifts-to-go">
                                    <button>¡Escoge tu Box!</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`${styles.slide} ${styles.alignCenter}`}>
                            <video 
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_1.mp4?v=1633726286" 
                                poster="/myb-placeholder.png"
                                autoPlay 
                                loop 
                                muted
                                playsinline
                            >
                            </video>
                            <div className={styles.heroContent}>
                                <h2>Make Your Box</h2>
                                <div>
                                    Arma tu caja desde cero y personalízala como tú quieras.
                                </div>
                                <Link href="/make-your-box">
                                    <button>¡Crea tu Box!</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`${styles.slide} ${styles.aligRight}`}>
                            <video 
                                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2b_Trim.mp4?v=1633726287" 
                                poster="/gfm-placeholder.png"
                                autoPlay 
                                loop 
                                muted
                                playsinline
                            >
                            </video>
                            <div className={styles.heroContent}>
                                <h2>Market</h2>
                                <div>
                                    Cómprate ese producto que siempre te encantó.
                                </div>
                                <Link href="/market">
                                    <button>¡Consiéntete!</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            :
                ''
            }
        </div>
    )
}