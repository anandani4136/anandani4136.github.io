import Image from 'next/image'
import styles from './page.module.css'
import 'animate.css'
import Title from './title'
import Experience from './Experience/experience'

export default function Home() {
  return (
    <div>
      {/* <Title/> */}
      <Experience/>
    </div>
    
  )
}
