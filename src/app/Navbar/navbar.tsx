'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import logo from './logo.png';
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
              <img alt="Logo" src='/logo.png'/>
            </a>
            <div className={styles.menu}>
                <div className={styles.bars}>
                    <div className={styles.twoBar} onClick={() => setExpandMenu(!expandMenu)}>
                            <span className={styles.topBar} style={{transform: `${expandMenu ? 'rotate(-45deg) translateY(4px) translateX(-5px)' : ''}`}}/>
                            <span className={styles.bottomBar} style={{transform: `${expandMenu ? 'rotate(45deg) translateY(-4px) translateX(-4px)' : ''}`}}/>
                        </div>
                    <div className={styles.expText} style={{height: expandMenu ? '150px' : '0vw', width: expandMenu ? '92vw' : '0px'}}>
                        <a className={styles.expNavText} onClick={() => scrollToComponent('about-main')}>About</a>
                        <a className={styles.expNavText} onClick={() => scrollToComponent('projects-main')}>Projects</a>
                    </div>
                </div>
                {/* <a style={{cursor: "pointer"}} onClick={() => scrollToComponent('header')}><img alt="GitHub" className={styles.icon} src='https://cdn.onlinewebfonts.com/svg/img_415633.png'/></a> */}
                {/* <button className={styles.button} onClick={() => scrollToComponent('about-main')}>About</button> */}
                <a className={styles.navText} onClick={() => scrollToComponent('about-main')}>About</a>
                <a className={styles.navText} onClick={() => scrollToComponent('projects-main')}>Projects</a>
                {/* <button className={styles.button} onClick={() => scrollToComponent('projects-main')}>Projects</button> */}
            </div>
        </div>
    );
}
           