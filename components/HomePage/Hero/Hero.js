import { useState, useEffect, useRef } from 'react'
import styles from './Hero.module.scss'
import Link from 'next/link'

import Fade from '@mui/material/Fade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const slidesContent = [
    {
        title: "Gifts To Go",
        copy: "Sorpresas listas para llevar, ¡perfectas para cualquier ocasión!", 
        button: "¡Escoge tu Box!",
        link: "/gifts-to-go",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Valentines_2.mp4?v=1643815066",
        poster: "/gtg-valentines-placeholder.png",
        backgroundColor: "#ececec"
    },
    {
        title: "Make Your Box", 
        copy: "Arma tu caja desde cero y personalízala como tú quieras.",
        button: "¡Crea tu Box!",
        link: "/make-your-box",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Valentines_1.mp4?v=1643815066",
        poster: "/myb-valentines-placeholder.png",
        backgroundColor: "#ececec"
    },
    {
        title: "Market", 
        copy: "Cómprate ese producto que siempre te encantó.",
        button: "¡Consiéntete!",
        link: "/market",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2b_Trim.mp4?v=1633726287",
        poster: "/gfm-placeholder.png",
        backgroundColor: "#ececec"
    },
]

const delay = 5000;

export default function Home() {
    
    const [heroContent, setHeroContent] = useState(false)

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

        setTimeout(() => {
            setHeroContent(true)
        }, 600);

        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === slidesContent.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className={styles.heroSection}>
            <div className={styles.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {slidesContent.map((currentSlide, index) => (
                    <div className={styles.slide} key={index} style={{ backgroundColor: currentSlide.backgroundColor }}>
                        <div className={styles.slideContainer}>
                            <video 
                                src={currentSlide.videoUrl}
                                poster={currentSlide.poster}
                                muted
                                autoPlay 
                                loop 
                                playsinline
                                playsInline
                                preload
                            >
                            </video>
                            <Fade in={heroContent}>
                                <div className={styles.heroContent}>
                                    <>
                                    <h2>{currentSlide.title}</h2>
                                    <div>
                                        {currentSlide.copy}
                                    </div>
                                    <Link href={currentSlide.link}>
                                        <button>{currentSlide.button}</button>
                                    </Link>
                                    </>
                                </div>
                            </Fade>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.slideshowDots}>
                {slidesContent.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`${styles.slideshowDot} ${index === idx ? styles.active : ''}`}
                        onClick={() => setIndex(idx)}
                    ></div>
                ))}
            </div>

            <div className={styles.leftArrow}>
                <ArrowBackIosIcon style={{ fontSize: 50, cursor: 'pointer' }} onClick={goPrev}/>
            </div>
            <div className={styles.rightArrow} >
                <ArrowBackIosIcon style={{ fontSize: 50, transform: 'rotate(180deg)', cursor: 'pointer' }} onClick={goNext} />
            </div>
        </div>
    )
}