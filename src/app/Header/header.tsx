"use client";

import videoSrc from '../../../public/videos/screenani.mp4';

import React from "react";
import styles from "./header.module.css";


export default function Header() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h1 className={styles.name}>Ronit Anandani</h1>
            </div>
            <video 
                className={styles.video} 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}