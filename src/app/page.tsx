import Image from 'next/image'
import styles from './page.module.css'
import 'animate.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.textContainer}>
          <h2 className={styles.typeTag}>Greetings, my name is</h2>
        </div>
        
        {/* <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      <div className={styles.center}>
        <h1 className='animate__animated animate__backInDown animate__delay-2s'>Ronit Anandani</h1>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
      </div>

      <div className={styles.grid}>
        <a
          href="https://github.com/anandani4136"
          className={`animate__animated animate__backInUp animate__delay-3s ${styles.card}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2> 
            <img alt="GitHub" className={styles.icon} src='https://cdn.onlinewebfonts.com/svg/img_415633.png'/>
            <span>-&gt;
            </span>
          </h2>
          <p>Explore the repositories and code I have worked with</p>
        </a>

        <a
          href="https://linkedin.com/in/ranandani"
          className={`animate__animated animate__backInUp animate__delay-3s ${styles.card}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2> 
            <img alt="LinkedIn" className={styles.icon} src='https://www.vhv.rs/file/max/8/80784_linkedin-logo-white-png.png'/>
            <span>-&gt;
            </span>
          </h2>
          <p>Learn more about my professional profile</p>
        </a>

        <a
          href="mailto: ra7353@hotmail.com"
          className={`animate__animated animate__backInUp animate__delay-3s ${styles.card}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2> 
            <img alt="Email" className={styles.icon} src='https://clipartcraft.com/images/email-logo-png-icon-8.png'/>
            <span>-&gt;
            </span>
          </h2>
          <p>Contact me directly through my email</p>
        </a>

        <a
          href="https://github.com/anandani4136/anandani4136.github.io/"
          className={`animate__animated animate__backInUp animate__delay-3s ${styles.card}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2> 
            <img alt="Code" className={styles.icon} src='https://th.bing.com/th/id/R.011ae1fdea8f1a6363c1f61c8b2e1464?rik=LP2VqoG63PNwgQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_133326.png&ehk=jeqNN5ZQoA4UuNpOHFSGQ2SB7v0aNVskxPUqrOlp8UA%3d&risl=&pid=ImgRaw&r=0'/>
            <span>-&gt;
            </span>
          </h2>
          <p>
            View the code of this website, soon to be updated!
          </p>
        </a>
      </div>
    </main>
  )
}
