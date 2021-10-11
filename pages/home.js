import styles from '../styles/home.module.scss'

import Hero from '../components/HomePage/Hero/Hero'
import Onboarding from '../components/HomePage/Onboarding/Onboarding'
import Bestsellers from '../components/HomePage/Bestsellers/Bestsellers'
import SmallDetails from '../components/HomePage/SmallDetails/SmallDetails'

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
            <Hero/>
            <Onboarding/>
            <Bestsellers/>
            <SmallDetails/>
        </div>
    )
  }