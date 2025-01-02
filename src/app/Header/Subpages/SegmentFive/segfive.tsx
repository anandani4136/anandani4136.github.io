"use client";

import React, { useEffect, useState } from "react";
import styles from "./segfive.module.css";
import RotatingBox from "../../../Components/Box/Box";

export default function SegmentFive() {
    const icons = [
        "/icons/database.svg",
        "/icons/security.svg",
        "/icons/ml.svg",
        "/icons/networking.svg",
        "/icons/fullstack.svg",
    ];

    const iconPositions = ["icon1", "icon2", "icon3", "icon4", "icon5"];

    const [isPathDrawn, setIsPathDrawn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const vh = window.innerHeight;
        
            const threshold = 4.5 * vh; // Define the threshold scroll point
        
            if (scrollPosition >= threshold) {
                setIsPathDrawn(true); // Draw the SVG path
                console.log("drawn");
            } else {
                setIsPathDrawn(false); // Undraw the SVG path
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* Icons */}
            <div className={styles.iconsContainer}>
                {icons.map((src, index) => (
                    <img
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay={index * 200}
                        key={index}
                        src={src}
                        alt={`Icon ${index + 1}`}
                        className={`${styles.icon} ${styles[iconPositions[index]]}`}
                    />
                ))}
            </div>

            <div className={styles.svgContainer}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="22 65 50 50"
                    className={styles.svg}
                >
                    <defs>
                        <path
                            id="my-path"
                            // d="M10,90 C40,10 60,10 90,90" /* Replace with your SVG path */
                            // d="M 45 92 C 38 80 57 80 50 92 M 50 92 L 50 96 L 45 96 L 45 92 L 49 92 L 49 88 C 49 87 50 87 50 88 L 46 88 C 46 88 46 88 46 88 C 46 88 46 88 46 88"
                            d="M 45 92 C 38 80 57 80 50 92 M 50 92 L 50 96 L 45 96 L 45 92 L 49 92 L 49 88 C 49 87 50 87 50 88 L 46 88 C 46 88 46 88 46 88 C 46 88 46 88 46 88 C 46 88 46 88 46 88 C 46 87 45 87 45 88 L 45 88 L 46 88 L 46 92 L 50 92"
                        />
                    </defs>
                    <use href="#my-path" className={`${styles.path} ${isPathDrawn ? styles.draw : styles.undraw}`} />
                </svg>
            </div>
            <h1 className={styles.title}>thinking outside the box</h1>

            <RotatingBox />
        </div>
    );
}