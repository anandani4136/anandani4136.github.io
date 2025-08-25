"use client";

import React, {useEffect} from "react";
import styles from "./header.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Waves from '../Components/Waves/Waves';
import SocialLogo from 'social-logos';

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
            <Waves />
            <div className={styles.gradientOverlay}></div>
            <div className={styles.content}>
                <h1 className={styles.name}>Ronit Anandani</h1>
                <div className={styles.buttonsContainer}>
                    <div className={styles.socialButtons}>
                        <button 
                            className={`${styles.socialButton} ${styles.profileButton}`}
                            onClick={() => scrollToComponent('about')}
                            title="Go to Profile"
                        >
                            <svg className={styles.mobileProfileIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <span className={styles.socialLabel}>Go to Profile</span>
                        </button>
                        
                        <a
                            href="https://www.linkedin.com/in/ranandani/"
                            className={styles.socialButton}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                        >
                            <SocialLogo icon="linkedin" size={24} />
                            <span className={styles.socialLabel}>LinkedIn</span>
                        </a>

                        <a
                            href="https://www.github.com/anandani4136"
                            className={styles.socialButton}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                        >
                            <SocialLogo icon="github" size={24} />
                            <span className={styles.socialLabel}>GitHub</span>
                        </a>

                        <a
                            href="https://www.youtube.com/@ronitanandani"
                            className={styles.socialButton}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="YouTube"
                        >
                            <SocialLogo icon="youtube" size={24} />
                            <span className={styles.socialLabel}>YouTube</span>
                        </a>

                        <a
                            href="mailto:contact@ronitanandani.com"
                            className={styles.socialButton}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Email"
                        >
                            <SocialLogo icon="mail" size={24} />
                            <span className={styles.socialLabel}>Email</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.scrollIndicator} onClick={() => scrollToComponent('puzzle')}>
                <span className={styles.scrollText}>Learn More</span>
                <div className={styles.arrow}></div>
            </div>
        </div>
    );
}