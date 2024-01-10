"use client";

import Image from 'next/image'
import styles from './page.module.css'
import 'animate.css'
import { useEffect, useState, useRef } from 'react';

export default function Title() {
  const [textOpacity, setTextOpacity] = useState(0);
  const [textOpacity2, setTextOpacity2] = useState(0);
  const [textOpacity3, setTextOpacity3] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(20);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0.5);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  // window.onload = () => {
  //   const element = document.getElementById('navbar');
  //   if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const middleScreen = windowHeight / 2;
      setScrollPosition(position);
      setOpacity(1 - position / 500);

      const scrollY = window.scrollY; // Get the current scroll position
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      // get scroll percentage
      setScrollPercent(scrollY / window.innerHeight);
      // console.log(scrollPercent);
      const newWidth = Math.min(100, (scrollY / totalScrollHeight) * 970); // Calculate new width as a percentage
      setWidth(Math.min(window.innerWidth, newWidth));

      if (textRef.current) {
        const divRect = (textRef.current as HTMLElement).getBoundingClientRect();
        const divTop = divRect.top;
        const divBottom = divRect.bottom;
        if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
          // console.log(divTop + " " + divBottom);
          // Calculate opacity based on distance to the middle of the screen
          const distanceToMiddle = Math.abs(middleScreen - (divTop + divRect.height / 2));
          const newOpacity = 1 - (6 * distanceToMiddle / windowHeight);
          setTextOpacity(Math.max(0, newOpacity));
        } else {
          setTextOpacity(0);
        }
      }

      if (textRef2.current) {
        const divRect = (textRef2.current as HTMLElement).getBoundingClientRect();
        const divTop = divRect.top;
        const divBottom = divRect.bottom;
        if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
          // console.log(divTop + " " + divBottom);
          // Calculate opacity based on distance to the middle of the screen
          const distanceToMiddle = Math.abs(middleScreen - (divTop + divRect.height / 2));
          const newOpacity = 1 - (6 * distanceToMiddle / windowHeight);
          setTextOpacity2(Math.max(0, newOpacity));
        } else {
          setTextOpacity3(0);
        }
      }

      if (textRef3.current) {
        const divRect = (textRef3.current as HTMLElement).getBoundingClientRect();
        const divTop = divRect.top;
        const divBottom = divRect.bottom;
        if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
          // console.log(divTop + " " + divBottom);
          // Calculate opacity based on distance to the middle of the screen
          const distanceToMiddle = Math.abs(middleScreen - (divTop + divRect.height / 2));
          const newOpacity = 1 - (6 * distanceToMiddle / windowHeight);
          setTextOpacity3(Math.max(0, newOpacity));
        } else {
          setTextOpacity3(0);
        }
      }

      if (width === 100) {
        // setMaxWidth(Math.min(maxWidth, ));
        // console.log((scrollY / totalScrollHeight))
        // Calculate scroll offset from the point where width reached 100%
        const widthReachedFullAt = totalScrollHeight * 0.038;
        const excessScroll = scrollY - widthReachedFullAt;

        if (excessScroll > 0) {
          // Start increasing height only after width has reached 100%
          // const newHeight = Math.min(window.innerHeight, (excessScroll / (totalScrollHeight - widthReachedFullAt)) * window.innerHeight);
          // setHeight(Math.min(window.innerHeight, newHeight));
          const newHeight = Math.min((excessScroll - 0.046*totalScrollHeight) / (totalScrollHeight) * 970);
          setHeight(Math.min(newHeight, 100));
          // console.log((newHeight - 100)/100);
          setOpacity2(1 - 1.2*(newHeight - 100)/100);
        } else {
          setHeight(20);
        }
      } else {
        setHeight(20); // Reset height if width is less than window's width
      }
    };

    const handleResize = () => {
      const element = document.getElementById('navbar');
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
      console.log(window.innerWidth);
    }
    
    
    window.addEventListener("scroll", handleScroll, { passive: true });


    // The "load" event listener
    const handleLoad = () => {
      handleResize(); // or other code to run on window load
    };

    window.addEventListener("load", handleResize);
    // window.addEventListener("DOMContentLoaded", handleResize, { passive: true })
    // requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleResize);
      // window.removeEventListener("DOMContentLoaded", handleScroll);
    };
  }
  , [scrollPercent, width]);

  


    return (
        <main id='header' className={styles.main} style={{backgroundColor: `${scrollPercent < 0.15 ? 'black' : ''}`, }}>
          <div className={styles.description}>
            {/* <div className={styles.textContainer}>
              <h2 className={styles.typeTag}>Greetings, my name is</h2>
            </div> */}
            
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
          
          <div className={styles.center} style={{ opacity: opacity }}>
            <div className={styles.name}> 
              <h1 className={`animate__animated animate__slideInUp ${styles.fname}`}>Ronit </h1>
              <h1 className={`animate__animated animate__slideInDown ${styles.lname}`}> Anandani</h1>
            </div>
            {/* <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            /> */}
          </div>
          <div className={styles.fadeBox} style={{opacity: opacity2}}>
            {/* {scrollPercent < 0.445 ? ( */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: `${width}%`, height: `${height}%`, backgroundColor: '#04217C', position: 'fixed', zIndex: -1, transform: `translate3d(0, 0, 0)`,
            filter: `blur(${(height - 100) > 0 ? 45 : 45}px)` 
            }}> 
              <div style={{ width: `90%`, height: `${height-10}%`, backgroundColor: '#000000', position: 'fixed', zIndex: -1, 
            filter: `blur(45px)` 
            }}/> 

            </div>
          {/* ) : ( */}
            {/* <div style={{ width: `${width}%`, height: '200px', backgroundColor: '#04217C', position: 'absolute', bottom: '0%' }}/> */}
          {/* )} */}
          </div>

          
    
          <div className={styles.grid}>
            {/* <a
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
            </a> */}
            
          </div>
          <div ref={textRef3} className={styles.text3} style={{opacity: textOpacity3}}>
              <h2>I&apos;m a problem-solver</h2>
          </div>
          {/* <div ref={textRef2} className={styles.text2} style={{opacity: textOpacity2}}>
              <h2>I'm a problem-solver</h2>
          </div> */}
          <div ref={textRef} className={styles.text1} style={{opacity: textOpacity}}>
              <h2>who loves to continuously ideate</h2>
          </div>
        </main>
      )
}