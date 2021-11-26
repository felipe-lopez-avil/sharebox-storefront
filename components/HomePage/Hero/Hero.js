import { useState, useEffect, useRef } from 'react'
import styles from './Hero.module.scss'
import Link from 'next/link'

import Fade from '@mui/material/Fade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const slidesContent = [
    {
        title: '¡Llegó el Black Friday!',
        copy: "Descuentos increíbles pensados para tí", 
        button: "¡Ver Ofertas!",
        link: "/bblack-friday",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Black_Friday.mp4?v=1637941690",
        poster: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Black_Friday_a.png?v=1637941708",
        backgroundColor: "#ececec"
    },
    {
        title: "Gifts To Go",
        copy: "Sorpresas listas para llevar, ¡perfectas para cualquier ocasión!", 
        button: "¡Escoge tu Box!",
        link: "/gifts-to-go",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/IMG_5895.mp4?v=1637709980",
        poster: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/vid-3.jpg?v=1637770737",
        backgroundColor: "#ececec"
    },
    {
        title: "Make Your Box", 
        copy: "Arma tu caja desde cero y personalízala como tú quieras.",
        button: "¡Crea tu Box!",
        link: "/make-your-box",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_1_grain.mp4?v=1637688095",
        poster: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/vid-1.jpg?v=1637770737",
        backgroundColor: "#ececec"
    },
    {
        title: "Market", 
        copy: "Cómprate ese producto que siempre te encantó.",
        button: "¡Consiéntete!",
        link: "/market",
        videoUrl: "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Video_2_grain.mp4?v=1637688296",
        poster: "/https://cdn.shopify.com/s/files/1/0456/6820/4706/files/vid-2.jpg?v=1637770737",
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