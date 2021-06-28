import React, { useRef, useCallback } from "react";
import styles from './MultiStepForm.module.scss'

import { useFormik } from 'formik';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation]);

export default function MultiStepForm({currentStep, setCurrentStep, totalPrice, setTotalPrice}) {

    const swiperRef = useRef(null);
    const swiperRef2 = useRef(null);

    const goNext = () => {
        swiperRef.current.swiper.slideNext(500);
        setCurrentStep(currentStep+1)
    }
    const goPrev = () => {
        swiperRef.current.swiper.slidePrev(500);
        setCurrentStep(currentStep-1)
    }

    const goTo = (index) => {
        swiperRef.current.swiper.slideTo(index);
        setCurrentStep(index)
    }

    const goTwo = (index) => {
        swiperRef2.current.swiper.slideTo(index);
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
        <div className={styles.container}>
        
        <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <Swiper cssMode={true} ref={swiperRef} className={styles.swiper} mousewheel={false} keyboard={false}>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideContainer}>
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Elige la Box que te guiñe el ojo</h2>
                            {/* <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            /> */}
                            <div className={styles.productsContainer}>
                                <span>PRODUCTS LIST</span>
                            </div>
                        </div> 
                    </div>
                    <div className={styles.buttonsAndTotal}>
                        <div className={styles.totalSection}>
                            <p><span className={styles.totalColor}>Total: </span>{totalPrice}.00</p>
                        </div>
                        <div className={styles.buttonSection}>
                            <div onClick={() => goNext()} className={`${styles.nextPrev} ${styles.continue}`}>
                                CONTINUAR
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideContainer}>
                        <Swiper cssMode={true} ref={swiperRef2} className={styles.swiper} direction={'vertical'} mousewheel={false} keyboard={false}> 
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slide}>
                                    <div className={styles.stepContent}>
                                        <h2>Selecciona los productos dentro de tu Box</h2>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.lastName}
                                        />
                                        <div onClick={() => goTwo(1)}>
                                            GO TO SNACKS
                                        </div>
                                        <div onClick={() => goTwo(2)}>
                                            GO TO SKIN CARE
                                        </div>
                                        <div onClick={() => goTwo(3)}>
                                            GO TO JEWERLY
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slide}>
                                    <div className={styles.stepContent}>
                                        <h2>SNACKS</h2>
                                        <div onClick={() => goTwo(0)}>
                                            Go Back
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slide}>
                                    <div className={styles.stepContent}>
                                        <h2>SKIN CARE</h2>
                                        <div onClick={() => goTwo(0)}>
                                            Go Back
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slide}>
                                    <div className={styles.stepContent}>
                                        <h2>JEWERLY</h2>
                                        <div onClick={() => goTwo(0)}>
                                            Go Back
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.buttonsAndTotal}>
                        <div className={styles.totalSection}>
                            <p><span className={styles.totalColor}>Total: </span>{totalPrice}.00</p>
                        </div>
                        <div className={styles.buttonSection}>
                            <div onClick={() => goPrev()} className={styles.nextPrev}>
                                REGRESAR
                            </div>
                            <div onClick={() => goNext()} className={`${styles.nextPrev} ${styles.continue}`}>
                                CONTINUAR
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideContainer}>
                        <div className={styles.stepContent}>
                            <h2>Acompaña tu Box con un detalle especial</h2>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                
                                value={formik.values.email}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonsAndTotal}>
                        <div className={styles.totalSection}>
                            <p><span className={styles.totalColor}>Total: </span>{totalPrice}.00</p>
                        </div>
                        <div className={styles.buttonSection}>
                            <div onClick={() => goPrev()} className={styles.nextPrev}>
                                REGRESAR
                            </div>
                            <div onClick={() => goNext()} className={`${styles.nextPrev} ${styles.continue}`}>
                                CONTINUAR
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide className={styles.slide}>
                    <div className={styles.slide}>
                        <div className={styles.stepContent}>
                            <h2>STEP 4</h2>
                            <label htmlFor="message">Message</label>
                            <input
                                id="message"
                                name="message"
                                type="text"
                                
                                value={formik.values.message}
                            />
                        </div>
                        <p onClick={() => goPrev()}>
                            PREVIOUS SLIDE
                        </p>
                        <button type="submit">Submit</button>
                    </div>
                </SwiperSlide> */}
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideContainer}>
                        <div className={styles.stepContent}>
                            <h2>¡Estás a punto de compartir felicidad!</h2>
                            <label htmlFor="message">Message</label>
                            <input
                                id="message"
                                name="message"
                                type="text"
                                
                                value={formik.values.message}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonsAndTotal}>
                        <div className={styles.totalSection}>
                            <p><span className={styles.totalColor}>Total: </span>{totalPrice}.00</p>
                        </div>
                        <div className={styles.buttonSection}>
                            <div onClick={() => goTo(2)} className={styles.nextPrev}>
                                REGRESAR
                            </div>
                            <div className={`${styles.nextPrev} ${styles.continue}`}>
                                CONTINUAR
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper> 
        </form> 

        </div>

        </>
    )
}