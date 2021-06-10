import '../styles/globals.scss'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>    
  )
}

export default MyApp
