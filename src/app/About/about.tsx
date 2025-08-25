"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './about.module.css'
import 'animate.css'
import { useInView } from 'react-intersection-observer';
import AOS from "aos";

import "aos/dist/aos.css";


export default function About() {

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.0, // Adjust this value to control when the image starts slowing down
    });
    const divRef = useRef(null); // Ref to the target div
    const [scrollPosition, setScrollPosition] = useState(0);
    const [divHeight, setDivHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // setScrollPosition(window.scrollY);
        

            if (divRef.current) {
                const divRect = (divRef.current as HTMLElement).getBoundingClientRect();
                // console.log(divRect.height);
                setDivHeight(divRect.height);
                const divTop = divRect.top;
                setScrollPosition((window.scrollY - divTop)/divRect.height)
            }
        }

        // AOS.init({
        //     easing: "ease-out-cubic",
        //     once: true,
        //     offset: 50,
        //   });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const imageStyle = {
        transform: `translateY(${scrollPosition * 0.06*divHeight - 0.5*divHeight}px) translate3d(0, 0, 0)`, // Adjust this value to control the speed of scrolling
    };

    return (
        <div ref={divRef} id="about" className={styles.main}>
            <div className={styles.image} ref={ref} style={ imageStyle
                //inView ? imageStyle : undefined
                }>
                <img className={styles.img} src='/media/ronit.PNG' alt="My Photo" />
            </div>
            <div className={styles.description}>
                <div className={styles.about}>
                    <h1 data-aos="fade-up" data-aos-duration="700">Greetings! 👋</h1>
                    <br></br>
                    <h2 data-aos="fade-up" data-aos-duration="1000">
                        My name is <b>Ronit</b>, and I&apos;m a <b>Computer Science</b> Master&apos;s student at the University of Illinois Urbana-Champaign.
                    </h2>
                    
                    <h2 data-aos="fade-up" data-aos-duration="1000">
                        I love building things — infrastructure that <b>scales</b>, automation that <b>removes friction</b>, and tools that turn <b>complexity</b> into <i>clarity</i>.
                    </h2>
                    
                    <h2 data-aos="fade-up" data-aos-duration="1200">
                        I&apos;m drawn to hard problems and high-leverage ideas. Guided by <b>curiosity</b> and a <b>builder&apos;s mindset</b>, I thrive where <u>technical depth</u> meets <u>thoughtful design</u> — and where impact comes from empowering others through what you create.
                    </h2>
                </div>
            </div>
        </div>
    );
}
