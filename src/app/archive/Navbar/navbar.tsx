'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import logo from './logo.svg';
import styles from './navbar.module.css'
import 'animate.css'

export default function Navbar() {
    const [expandMenu, setExpandMenu] = useState(false);
    const scrollToComponent = (componentId: string) => {
        const element = document.getElementById(componentId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div id="navbar" className={styles.navbar}>
            <a
            //   href="https://github.com/anandani4136"
              className={`animate__animated animate__backInUp ${styles.img}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => scrollToComponent('header')}
            >
              <img alt="Logo" src='/logo.svg'/>
            </a>
            <div className={styles.menu}>
                <div className={styles.bars}>
                    <div className={styles.twoBar} onClick={() => setExpandMenu(!expandMenu)}>
                            <span className={styles.topBar} style={{transform: `${expandMenu ? 'rotate(-45deg) translateY(7px) translateX(-6px)' : ''}`}}/>
                            <span className={styles.middleBar} style={{opacity: `${expandMenu ? '0' : '1'}`}}/>
                            <span className={styles.bottomBar} style={{transform: `${expandMenu ? 'rotate(45deg) translateY(-7px) translateX(-6px)' : ''}`}}/>
                        </div>
                    <div className={styles.expText} style={{height: expandMenu ? '175px' : '0vw', width: expandMenu ? 'calc(100vw - 17px)' : '0px', borderWidth: expandMenu ? '2px' : '0px'}}>
                        <a data-aos="fade-up" data-aos-duration="1000" className={styles.expNavText} onClick={() => scrollToComponent('about')}>About</a>
                        <a data-aos="fade-up" data-aos-duration="1000" className={styles.expNavText} onClick={() => scrollToComponent('experience')}>Experience</a>
                        <a data-aos="fade-up" data-aos-duration="1000" className={styles.expNavText} onClick={() => scrollToComponent('projects')}>Projects</a>
                    </div>
                </div>
                {/* <a style={{cursor: "pointer"}} onClick={() => scrollToComponent('header')}><img alt="GitHub" className={styles.icon} src='https://cdn.onlinewebfonts.com/svg/img_415633.png'/></a> */}
                {/* <button className={styles.button} onClick={() => scrollToComponent('about-main')}>About</button> */}
                <a className={styles.navText} onClick={() => scrollToComponent('about')}>About</a>
                <a className={styles.navText} onClick={() => scrollToComponent('experience')}>Experience</a>
                <a className={styles.navText} onClick={() => scrollToComponent('projects')}>Projects</a>
                {/* <button className={styles.button} onClick={() => scrollToComponent('projects-main')}>Projects</button> */}
            </div>
        </div>
    );
}
           