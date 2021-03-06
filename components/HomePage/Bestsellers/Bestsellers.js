import React, { useState, useEffect } from 'react'
import styles from './Bestsellers.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

/* const products = [
    {
        productTitle: "Test Product",
        price: "400.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/snack-jar-1_3f71cb90-c647-476c-9e35-c98d9440da0a.jpg?v=1627671915",
    },
    {
        productTitle: "Product Fake",
        price: "200.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/shiro-y-tessa.jpg?v=1626987626",
    },
    {
        productTitle: "Product Test",
        price: "350.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/wine-box-for-her.jpg?v=1627420835",
    },
    {
        productTitle: "Other Test",
        price: "235.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/bff-box_1.jpg?v=1627419297",
    },
    {
        productTitle: "Test Again",
        price: "750.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/rose-box.jpg?v=1632430978",
    },
    {
        productTitle: "Fake Product",
        price: "650.00",
        image: "https://cdn.shopify.com/s/files/1/0456/6820/4706/products/SKINCARE-box-3.jpg?v=1626978872",
    },
] */

export default function Bestsellers({products}) {

    const [windowReady, setWindowReady] = useState(false)
    const [slides, setSlides] = useState(4)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true)
        }

        if(window.innerWidth >= 890){
            setSlides(4)
        }else if(window.innerWidth >= 650){
            setSlides(3)
        }else if(window.innerWidth >= 350){
            setSlides(2)
        }else{
            setSlides(1)
        }
    }, [])

    if(windowReady){
        const changeSlidesPerView = () => {
            if(window.innerWidth >= 890){
                setSlides(4)
            }else if(window.innerWidth >= 650) {
                setSlides(3)
            }else if(window.innerWidth >= 350){
                setSlides(2)
            }else{
                setSlides(1)
            }
        }

        window.addEventListener('resize', changeSlidesPerView)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Our Best Sellers</h3>
            </div>
            <div className={styles.products}>
                {windowReady ?
                    <Swiper 
                        freeMode={true}
                        slidesPerView={slides}
                        pagination={{
                            "clickable": true
                        }}
                        autoplay={{
                            "delay": 3500,
                            "disableOnInteraction": false
                        }}
                    >
                        {products.map(product => (
                            <SwiperSlide>
                                <div className={styles.centerCard}>
                                    <Link href={`/gifts-to-go/${product.handle}`}>
                                        <div className={styles.productCard}>
                                            <div className={styles.productImage}>
                                                <Image
                                                    src={product.images[0].src}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className={styles.productTitle}>{product.title}</div>
                                            <div className={styles.productPrice}>${product.variants[0].price}</div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    :
                    ''
                }
            </div>
        </div>
    )
}