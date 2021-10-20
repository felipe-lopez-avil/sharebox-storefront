import Head from 'next/head'

import styles from '../styles/corporate.module.scss'
import Hero from '../components/Corporate/Hero/Hero'
import Moments from '../components/Corporate/Moments/Moments';
import HowItWorks from '../components/Corporate/HowItWorks/HowItWorks';
import Form from '../components/Corporate/Form/Form';
import Urgent from '../components/Corporate/Urgent/Urgent';

import React from 'react';


export default function Corporate() {

    return(
        <div className={styles.corporate}>
            <Head>
                <title>Sharebox Corporate</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Hero/>
            <Moments/>
            <HowItWorks/>
            <Form/>
            <Urgent/>
        </div>
    )
}