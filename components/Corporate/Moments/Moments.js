import styles from './Moments.module.scss'
import Slider from "react-slick";
import Image from 'next/image'

export default function Moments () {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 2800,
    };

    return (
        <div className={styles.container}>
            <div className={styles.moments}>
                <div className={styles.content}>
                    <h3>En los mejores momentos</h3>
                    <p>
                        En SHAREBOX CORPORATE nos enfocamos en brindarte una solución integral en la experiencia de regalos, 
                        reconocimientos y cualquier otra ocasión especial.
                    </p>
                    <p className={styles.bold}>
                        ¡Diseñamos propuestas acorde a tus necesidades!
                    </p>

                    <Slider {...settings}>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Mother's Day
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Navidad y Posadas
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Kit de Bienvenida
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Cumpleaños
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Father's Day
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Año Nuevo
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Reconomiento
                            </span>
                        </div>
                        <div className={styles.ocassionSlide}>
                            <span className={styles.ocassion}>
                                Y mucho más
                            </span>
                        </div>
                    </Slider>
                </div>
                <div className={styles.imageCarousel}>
                    <div className={styles.imagesContainer}>
                        <Image
                            src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Img_1.png?v=1627574000"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}