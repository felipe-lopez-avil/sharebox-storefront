import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar/Navbar'

import Banner from '../components/Home/Banner/Banner'
import HowItWorks from '../components/Home/HowItWorks/HowItWorks'

export default function Home() {
  return (
    <div>

      <Banner/>

      <HowItWorks/>

      <div>
      <h2>SECCIÓN MÁS VENDIDOS</h2>
      </div>

      <div>
      <h2>SECCIÓN ONBOARDING</h2>
      </div>

    </div>
  )
}
