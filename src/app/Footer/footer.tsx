"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './footer.module.css'
import SocialLogo from 'social-logos';
import 'animate.css'


export default function Footer() {

    return (
        <div id="main" className={styles.main}>
            <br></br>
            <div className={styles.icons}>
                <a
                  href="
                    https://www.linkedin.com/in/ranandani/"
                    className={`animate__animated animate__backInUp ${styles.img}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SocialLogo icon="linkedin" size={ 30 } />
                    {/* <img alt="Logo" className={styles.icon} src='https://d1fdloi71mui9q.cloudfront.net/DGWGLppRSycEpp6feM0L_BIkIV5TE19J2aKD5'/> */}
                </a>

                <a
                  href="
                    https://www.github.com/anandani4136"
                    className={`animate__animated animate__backInUp ${styles.img}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SocialLogo icon="github" size={ 30 } />
                </a>

                <a
                  href="
                    https://www.youtube.com/@ronitanandani"
                    className={`animate__animated animate__backInUp ${styles.img}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SocialLogo icon="youtube" size={ 30 } />
                </a>

                <a
                  href="
                    mailto:ra7353@hotmail.com"
                    className={`animate__animated animate__backInUp ${styles.img}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SocialLogo icon="mail" size={ 30 } />
                </a>
                
            </div>
            <br></br>
            <p className={styles.tag}>© 2024 RONIT ANANDANI</p>
            <br></br>
        </div>
    );
}