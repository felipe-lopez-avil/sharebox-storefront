import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag'
import '../styles/globals.scss'
import Head from 'next/head';
import Layout from '../components/Layout/Layout'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import {client} from '../utils/shopify'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const getDataFromStorage = (key) => {
  const storage = window.localStorage;
  return JSON.parse(storage.getItem(key))
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [productsInCartExist, setProductsInCartExist] = useState(false)
  const [productsInBasket, setProductsInBasket] = useState([])

  let checkoutId;

  useEffect(() => {

    let itemIdsToDelete = []

    if(window !== undefined){
      checkoutId = getDataFromStorage('checkoutId')
      if(checkoutId !== null){
        // console.log("'checkoutId' exist" )
        client.checkout.fetch(checkoutId).then((checkout) => {
          // console.log(checkout.lineItems.length)
          // console.log(checkout.lineItems)

          checkout.lineItems.map((item) => {
            if (item.variant === null){
              itemIdsToDelete.push(item.id)
            }
          })

          // console.log(itemIdsToDelete)

          if (checkout.completedAt === null & checkout.lineItems.length > 0){

            client.checkout.removeLineItems(checkoutId, itemIdsToDelete).then((checkout) => {
              setProductsInCartExist(true)
              setProductsInBasket(checkout.lineItems)
            });
          }
        })
      }
    }

    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }

  }, [router.events])

  return (
    <>
      <Head>
        <title>Sharebox</title>
        <link rel="shortcut icon" href="/images/Favicon.png" />
      </Head>
      {/* <Script
        strategy="lazyOnload"
        src={'https://www.googletagmanager.com/gtag/js?id=UA-177859708-1'}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-177859708-1');
        `}
      </Script> */}
      <Layout productsInCartExist={productsInCartExist} productsInBasket={productsInBasket}>
        <Component 
          {...pageProps}
          setProductsInCartExist={setProductsInCartExist}
          setProductsInBasket={setProductsInBasket} 
        />
      </Layout>    
    </>
  )
}

export default MyApp
