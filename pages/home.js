import styles from '../styles/home.module.scss'

import Slider from "react-slick";

export default function Home() {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className={styles.container}>
            {/* <video src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/pexels-rodnae-productions-6529560.mp4?v=1632248218" autoPlay loop muted poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"></video>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}></div>
            </div> */}
            <Slider {...settings}>
                <div className={styles.slide}>
                    <video src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/pexels-rodnae-productions-6529560.mp4?v=1632248218" autoPlay loop muted poster="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Fondo.png?v=1627590003"></video>
                </div>
                <div className={styles.slide}>
                    Slide 2
                </div>
                <div className={styles.slide}>
                    Slide 2
                </div>
            </Slider>
        </div>
    )
  }