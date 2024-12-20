import Image from 'next/image'
import styles from './page.module.css'
import 'animate.css'
import Navbar from './Navbar/navbar'
import Title from './title'
import Header from './Header/header'
import Transition from './Transition/transition'
import About from './About/about'
import Experience from './Experience/experience'
import Projects from './Projects/projects'
import Footer from './Footer/footer'

export default function Home() {
  
  return (
    <div>
      <Navbar/>
      <Header/>
      {/* <Title/> */}
      <Transition/>
      <About/>
      <Experience/>
      <Projects/>
      <Footer/>
    </div>
    
  )
}
