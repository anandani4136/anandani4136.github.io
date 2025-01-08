import Image from 'next/image'
import styles from './page.module.css'
import 'animate.css'
import Navbar from './Navbar/navbar'
import Title from './title'
import Header from './Header/header'
import TitlePage from './Header/title'
// import SegmentOne from './Header/Subpages/SegmentOne/segone'
// import SegmentTwo from './Header/Subpages/SegmentTwo/segtwo'
import Transition from './Transition/transition'
import About from './About/about'
import Experience from './Experience/experience'
import Projects from './Projects/projects'
import Footer from './Footer/footer'
import SegmentThree from './Header/Subpages/SegmentThree/segthree'
import SegmentFour from './Header/Subpages/SegmentFour/segfour'
import SegmentFive from './Header/Subpages/SegmentFive/segfive'
import SegmentSix from './Header/Subpages/SegmentSix/segsix'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const SegmentOne = dynamic(() => import('./Header/Subpages/SegmentOne/segone'), { ssr: false });
const SegmentTwo = dynamic(() => import('./Header/Subpages/SegmentTwo/segtwo'), { ssr: false });

export default function Home() {
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div>
        <Navbar/>
        {/* <Header/> */}
        {/* <Title/> */}
        <TitlePage/>
        <SegmentOne/>
        <SegmentTwo/>
        <SegmentThree/>
        <SegmentFour/>
        <SegmentFive/>
        {/* <SegmentSix/> */}
        <Transition/>
        <About/>
        <Experience/>
        <Projects/>
        <Footer/>
      </div>
    </>
  )
}
