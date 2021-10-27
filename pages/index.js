import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'
import { client } from '../utils/shopify'
import Head from 'next/head'

import Hero from '../components/HomePage/Hero/Hero'
import Onboarding from '../components/HomePage/Onboarding/Onboarding'
import Bestsellers from '../components/HomePage/Bestsellers/Bestsellers'
import SmallDetails from '../components/HomePage/SmallDetails/SmallDetails'
import WeAreSharebox from '../components/HomePage/WeAreSharebox/WeAreSharebox'
import Methodology from '../components/HomePage/Methodology/Methodology'
import InstaFeed from '../components/HomePage/InstaFeed/InstaFeed'

export default function Home() {
    
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3ODkwODMzODMzOA=="
    const [products, setProducts] = useState([])
    const [windowReady, setWindowReady] = useState(false)

    useEffect(() => {

        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }

        client.collection.fetchWithProducts(collectionId, {productsFirst: 6}).then((collection) => {
            // Do something with the collection
            setProducts(JSON.parse(JSON.stringify(collection.products)))
        });

    }, [])


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
            <Head>
                <title>Sharebox</title>
            </Head>
            <Hero/>
            <Onboarding/>
            <Bestsellers products={products}/>
            <SmallDetails/>
            <WeAreSharebox/>
            <Methodology/>
            <InstaFeed/>
        </div>
    )
  }