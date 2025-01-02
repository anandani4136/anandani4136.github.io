"use client";

import React, { useEffect, useState } from "react";
import styles from "./segfour.module.css";

export default function SegmentFour() {
    const [scrollY, setScrollY] = useState(0); // Track scroll position

    useEffect(() => {
        const handleScroll = () => {
            const breakpoint = 3*window.innerHeight; // 50% of the window height
            setScrollY(window.scrollY - breakpoint);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const starContainer = document.getElementById("star-container");

        for (let i = 0; i < 25; i++) {
            const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            star.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            star.setAttribute("viewBox", "0 0 24 24");
            star.setAttribute("class", styles.starSvg);
            star.setAttribute("width", "10"); // Adjust size
            star.setAttribute("height", "10"); // Adjust size

            // Randomize position
            star.style.position = "absolute";
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 30}vh`; // Top 30% of the page

            // Star shape path
            star.innerHTML = `
                <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"
                    fill="white" 
                    opacity="${Math.random() * 0.3 + 0.7}" 
                />
            `;

            starContainer?.appendChild(star);
        }

        // Shooting Star Effect
        const createShootingStar = () => {
            const shootingStar = document.createElement("div");
            shootingStar.className = styles.shootingStar;

            // Randomize start position and animation duration
            const startX = Math.random() * (window.innerWidth / 2) + window.innerWidth / 2;
            const startY = Math.random() * (window.innerHeight / 2) - window.innerHeight / 4;
            const duration = Math.random() * 4 + 10; // Between 2s and 4s

            shootingStar.style.left = `${startX}px`;
            shootingStar.style.top = `${startY}px`;
            shootingStar.style.animationDuration = `${duration}s`;

            starContainer?.appendChild(shootingStar);

            // Remove the shooting star after animation
            setTimeout(() => {
                shootingStar.remove();
            }, duration * 1000);
        };

        // Create shooting stars at intervals
        const interval = setInterval(createShootingStar, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className={styles.spaceBackground}>
            {/* Star Container with Parallax */}
            <div
                id="star-container"
                className={styles.starContainer}
                style={{
                    transform: `translateY(${scrollY * 0.08}px)`, // Slow parallax effect
                }}
            ></div>

            {/* Content */}
            <div className={styles.content}>
                <h1 className={styles.title}>by exploring the unexplored</h1>
            </div>

            {/* Foreground SVG */}
            <div className={styles.foregroundSvg}>
                <img src='/media/forest.svg' alt="Unexplored Area" className={styles.forestSvg}  />
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className={styles.svgWave}
                >
                    <path
                        fill="#1a1a2e"
                        fillOpacity="1"
                        d="M0,192L60,186.7C120,181,240,171,360,165.3C480,160,600,160,720,165.3C840,171,960,181,1080,186.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg> */}
            </div>
        </div>
    );
}