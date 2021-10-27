import { useState, useEffect, useRef } from 'react'
import styles from './Onboarding.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

const slidesContent = [
    {
        title: "Gifts To Go",
        copy: "¡Sorpresas listas para llevar! Regala a tus personas queridas una caja acorde a la ocasión que se esté celebrando.", 
        button: "Gifts To Go",
        link: "/gifts-to-go",
        imageSrc: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Gifts_to_go.png?v=1633965076",
        backgroundColor: "#f2d4cf",
        buttonColor: "#efaaa1",
    },
    {
        title: "Make Your Own Box", 
        copy: "¡Tú sabes lo que le gusta! Arma una caja desde cero con los productos que más le gusten a la persona especial que quieras sorprender. Tú lo conoces mejor que nadie.",
        button: "Make Your Box",
        link: "/make-your-box",
        imageSrc: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Mano_Cel_3.png?v=1633987558",
        backgroundColor: "#b3dbe5",
        buttonColor: "#72c2d6",
    },
    {
        title: "Market", 
        copy: "¿Viste algún producto que te haya gustado personalmente? No te quedes con las ganas y cómpralo para ti.",
        button: "Market",
        link: "/market",
        imageSrc: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Gifts_for_me_junto.png?v=1634247537",
        backgroundColor: "#e7d9f2",
        buttonColor: "#dda7f0",
    },
]

const delay = 5000;

export default function Onboarding() {

    const [index, setIndex] = useState(0)
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    }

    const goPrev = () => {
        const lastIndex = slidesContent.length - 1;

        if(index <= 0){
            setIndex(lastIndex)
        }else{
            setIndex(index - 1)
        }
    }

    const goNext = () => {
        const lastIndex = slidesContent.length - 1;

        if(index >= lastIndex){
            setIndex(0)
        }else{
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => {
                setIndex((prevIndex) =>
                prevIndex === slidesContent.length - 1 ? 0 : prevIndex + 1
            )},
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [index]);

    return(
        <div className={styles.container}>
            <div className={styles.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {slidesContent.map((currentSlide, index) => (
                    <div className={styles.slide} key={index} style={{ backgroundColor: currentSlide.backgroundColor }}>
                        <div className={styles.slideContainer}>
                            <div className={styles.flexContainer}>
                                <div className={styles.content}>
                                    <h3>{currentSlide.title}</h3>
                                    <p>
                                        {currentSlide.copy}
                                    </p>
                                    <Link href={currentSlide.link}>
                                        <button style={{ backgroundColor: currentSlide.buttonColor, borderColor: currentSlide.buttonColor }}>{currentSlide.button}</button>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.image}>
                                <Image
                                    src={currentSlide.imageSrc}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.leftArrow}>
                <ArrowBackIosIcon style={{ fontSize: 50, cursor: 'pointer', color: slidesContent[index].buttonColor }} onClick={goPrev}/>
            </div>
            <div className={styles.rightArrow} >
                <ArrowBackIosIcon style={{ fontSize: 50, transform: 'rotate(180deg)', cursor: 'pointer', color: slidesContent[index].buttonColor }} onClick={goNext} />
            </div>
            <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Our_best_sellers.png?v=1633962681" className={styles.curves}/>
        </div>
    )
}