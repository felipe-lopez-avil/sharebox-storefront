import Head from 'next/head'

import Banner from '../components/Home/Banner/Banner'
import HowItWorks from '../components/Home/HowItWorks/HowItWorks'
import Bestsellers from '../components/Home/Bestsellers/Bestsellers'
import Onboarding from '../components/Home/Onboarding/Onboarding'
import InstaFeed from '../components/Home/InstaFeed/InstaFeed'

export default function Home() {
  return (
    <div>

      <Banner/>

      <HowItWorks/>

      <Bestsellers/>

      <Onboarding/>

      <InstaFeed/>

    </div>
  )
}
