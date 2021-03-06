import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'
import { client } from '../utils/shopify'
import Head from 'next/head'

import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@mui/material/Grow';

import Hero from '../components/HomePage/Hero/Hero'
import Onboarding from '../components/HomePage/Onboarding/Onboarding'
import Bestsellers from '../components/HomePage/Bestsellers/Bestsellers'
import SmallDetails from '../components/HomePage/SmallDetails/SmallDetails'
import WeAreSharebox from '../components/HomePage/WeAreSharebox/WeAreSharebox'
import Methodology from '../components/HomePage/Methodology/Methodology'
import InstaFeed from '../components/HomePage/InstaFeed/InstaFeed'

import MailchimpSubscribe from "react-mailchimp-subscribe"

import Pixel from '../components/Pixel'

const url = "https://sharebox.us2.list-manage.com/subscribe/post?u=4d7b381e967db5d4820bb8e94&amp;id=a75229ef2c";

const CustomForm = ({ status, message, onValidated }) => {

    const CopyToClipboard = () => {
        navigator.clipboard.writeText("ShareLove")
    }

    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });
  
        return (
            <div>
                {status !== "success" && (
                    <>
                    <input
                    ref={node => (email = node)}
                    type="email"
                    placeholder="Your email"
                    />
                    <br />
                    <button onClick={submit}>
                        {status === "sending" ?
                            
                            <CircularProgress color="inherit" size={25}/>
                            :
                            'Suscribirse'
                            
                        }
                    </button>
                    </>
                )}

                {status === "error" && (
                    <div className={styles.errorMessage}>
                        Ups, algo sali?? mal. Parece que el correo que ingresaste ya est?? inscrito en nuestro bolet??n. 
                    </div>
                )}
                {status === "success" && (
                    <div className={styles.confirmationMessage}>
                        <div className={styles.thanks}>
                            ??Gracias por suscribirte! Aqu?? tienes tu c??digo para recibir tu descuento. 
                        </div>
                        <div className={styles.codeSection}>
                            <div className={styles.codeWrapper}>
                                <div className={styles.textCode}>
                                    Sharebox2022
                                </div>
                                <div className={styles.copyIcon} onClick={CopyToClipboard}>
                                    <FileCopyOutlinedIcon/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.terms}>Cup??n valido solo para la primera compra</div>
                    </div>
                )}
            </div>
        );
};

export default function Home() {
    
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3ODkwODMzODMzOA=="
    const [products, setProducts] = useState([])
    const [windowReady, setWindowReady] = useState(false)

    const [subModal, setSubModal] = useState(false)

    const CloseSubModal = () => {
        setSubModal(false)
    }

    useEffect(() => {

        if(typeof window !== 'undefined'){
            setWindowReady(true);

            const subModalSeen = window.localStorage.getItem('subscribe_modal_viewed')
            if(!subModalSeen){
                setTimeout(() => {
                    setSubModal(true)
                    window.localStorage.setItem('subscribe_modal_viewed', 'true')
                }, 3000)
            }
        }

        client.collection.fetchWithProducts(collectionId, {productsFirst: 6}).then((collection) => {
            // Do something with the collection
            setProducts(JSON.parse(JSON.stringify(collection.products)))
        });

    }, [])


    return (
        <div className={styles.container}>
            <Head>
                <title>Sharebox</title>
            </Head>
            <Pixel name='FACEBOOK_PIXEL_1'/>
            <Hero/>
            <Onboarding/>
            <Bestsellers products={products}/>
            <SmallDetails/>
            <WeAreSharebox/>
            <Methodology/>
            <InstaFeed/>

            <Grow in={subModal}>
                <div className={styles.subModal}>
                    <div className={styles.dialogBox}>
                        <h2>?? 10% de descuento en tu primera Sharebox !</h2>
                        <div className={styles.header}>
                            Suscr??bete a nuestro Newsletter y recibe 10% de descuento en tu primera compra. Nunca recibir??s Spam ????
                        </div>
                        <div className={styles.form}>
                            <MailchimpSubscribe
                                url={url}
                                render={({ subscribe, status, message }) => (
                                    <CustomForm
                                    status={status}
                                    message={message}
                                    onValidated={formData => subscribe(formData)}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.closeModal} onClick={CloseSubModal}>
                            <CloseIcon style={{ fontSize: '30px' }}/>
                        </div>
                    </div>
                </div>
            </Grow>
        </div>
    )
  }