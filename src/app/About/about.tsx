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

        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
          });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const imageStyle = {
        transform: `translateY(${scrollPosition * 0.07*divHeight - 0.35*divHeight}px) translate3d(0, 0, 0)`, // Adjust this value to control the speed of scrolling
    };

    return (
        <div ref={divRef} id="about-main" className={styles.main}>
            <div className={styles.image} ref={ref} style={ imageStyle
                //inView ? imageStyle : undefined
                }>
                <img className={styles.img} src='/media/ronit.PNG' />
            </div>
            <div className={styles.description}>
                <div className={styles.about}>
                    <h2 data-aos="fade-up" data-aos-duration="700">Greetings!</h2>
                    {/* <br></br> */}
                    <h2 data-aos="fade-up" data-aos-duration="1000">
                        My name is <b>Ronit Anandani</b>. I am a <b>Computer Science Student</b> at the University of Illinois
                        Urbana-Champaign.
                    </h2>
                    {/* <br></br> */}
                    <h2 data-aos="fade-up" data-aos-duration="1300">
                        I&apos;m a <u>self-driven engineer</u> committed to creating <b>Robust</b>, <b>Efficient</b>, and <b>Innovative</b> products. 
                        I believe in augmenting my learning by taking on novel challenges in different domains, 
                        and I&apos;m continuously pursuing new ways to advance the projects, teams, and knowledge that I engage with.
                    </h2>
                </div>
            </div>
        </div>
    );
}
