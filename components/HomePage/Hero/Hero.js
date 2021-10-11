import styles from './Hero.module.scss'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
    return (
        <>
        {/* <Swiper 
            navigation={true}
            cssMode={true}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
                "delay": 5000,
                "disableOnInteraction": false
            }}
        >
            <SwiperSlide>
                <div className={`${styles.slide} ${styles.alignCenter}`}>
                    <video 
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2.mp4?v=1633726286" 
                        poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"
                        autoPlay 
                        loop 
                        muted
                    >
                    </video>
                    <div className={styles.heroContent}>
                        <h2>Box To Go</h2>
                        <div>Para cualquier ocasión</div>
                        <button>¡Escoge tu Box!</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`${styles.slide} ${styles.alignLeft}`}>
                    <video 
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_1.mp4?v=1633726286" 
                        poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"
                        autoPlay 
                        loop 
                        muted
                    >
                    </video>
                    <div className={styles.heroContent}>
                        <h2>Make Your Box</h2>
                        <div>Lorem Ipsum dolor sit amet Make Your Box</div>
                        <button>¡Crea tu Box!</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`${styles.slide} ${styles.aligRight}`}>
                    <video 
                        src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2b_Trim.mp4?v=1633726287" 
                        poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"
                        autoPlay 
                        loop 
                        muted
                    >
                    </video>
                    <div className={styles.heroContent}>
                        <h2>Gifts For Me</h2>
                        <div>Descripción Gifts For Me Lorem ipsum dolor sit amet</div>
                        <button>¡Give Yourself a Treat!</button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper> */}
        <div className={`${styles.slide} ${styles.alignCenter}`}>
            <video 
                src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2.mp4?v=1633726286" 
                poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"
                autoPlay 
                loop 
                muted
            >
            </video>
            <div className={styles.heroContent}>
                <h2>Box To Go</h2>
                <div>Para cualquier ocasión</div>
                <button>¡Escoge tu Box!</button>
            </div>
        </div>
        </>
    )
}