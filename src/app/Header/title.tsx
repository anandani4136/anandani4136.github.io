"use client";

import React, {useEffect} from "react";
import styles from "./header.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Waves from '../Components/Waves/Waves';

export default function Header() {
    useEffect(() => {
        AOS.refresh();
    }, []);

    const scrollToComponent = (componentId: string) => {
        const element = document.getElementById(componentId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id='header' className={styles.main}>
            <div className={styles.content}>
            <h1 className={styles.name}>Ronit Anandani</h1>
            <div className={styles.buttonsContainer}>
                {/* <button className={styles.button}>Go to Profile</button> */}
                {/* <button className={styles.button}>G</button>
                <button className={styles.button}>L</button>
                <button className={styles.button}>Y</button>
                <button className={styles.button}>G</button> */}
                {/* <button className={styles.button}>Scroll to learn more</button> */}
            </div>
            </div>
            <Waves />
            <video 
                className={styles.video} 
                autoPlay 
                loop 
                muted 
                playsInline
                >
                <source src='https://d3u5zljkkuhj4j.cloudfront.net/dynamicbg.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.gradientOverlay}></div>
            <div className={styles.scrollIndicator} onClick={() => scrollToComponent('puzzle')}>
                <span className={styles.scrollText}>Learn More</span>
                <div className={styles.arrow}></div>
            </div>
        </div>
    );
}