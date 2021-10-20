import '../styles/globals.scss'
import Head from 'next/head';
import Layout from '../components/Layout/Layout'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sharebox</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>    
    </>
  )
}

export default MyApp
