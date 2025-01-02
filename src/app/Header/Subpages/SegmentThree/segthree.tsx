"use client";

import React, { use, useEffect, useState } from "react";
import styles from "./segthree.module.css";
import spaceStyles from "./segfour.module.css";
import { throttle } from "lodash";
import MiniApp from "../../../Components/MiniApp/MiniApp";
// import styles2 from "./segtwo.module.css";

export default function SegmentThree() {
    const [rotation, setRotation] = useState(270); // Initial rotation
    const [position, setPosition] = useState<"fixed" | "absolute">("fixed"); // Position state
    const [isTransformed, setIsTransformed] = useState(false);

    useEffect(() => {
        const starContainer = document.getElementById("p-star-container");

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
            star.style.top = `${Math.random() * 50}vh`; // Page height

            // Star shape path
            star.innerHTML = `
                <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"
                    fill="white" 
                    opacity="${Math.random() * 0.5 + 0.5}" 
                />
            `;

            starContainer?.appendChild(star);
        }

        const handleScroll = throttle(() => {
            const scrollPosition = window.scrollY;
            const vh = window.innerHeight;

            // Scroll thresholds
            const rotateStart = 2.24 * vh; // Start rotation at this point
            const rotateEnd = 2.4 * vh; // Complete rotation by this point
            const fixedEnd = 3.06 * vh; // End fixed position by this point

            // Trigger point for transformation
            const triggerPoint = 3 * window.innerHeight;

            if (scrollPosition >= rotateStart && scrollPosition <= rotateEnd) {
                const progress = (scrollPosition - rotateStart) / (rotateEnd - rotateStart);
                setRotation(270 + progress * 90); // Interpolate rotation from 270 to 360
            } else if (scrollPosition < rotateStart) {
                setRotation(270); // Reset rotation to 270 before rotateStart
            } else {
                setRotation(360); // Keep rotation at 360 after rotateEnd
            }

            // Handle fixed position logic
            if (scrollPosition <= fixedEnd) {
                setPosition("fixed");
            } else {
                setPosition("absolute");
            }

            setIsTransformed(scrollPosition > triggerPoint);

        }, 60);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div id="p-star-container" className={styles.mainthree}>
            <div
                className={styles.rotatingDiv}
                style={{
                    position,
                    bottom: position === "fixed" ? "12%" : "12%",
                    transform: `rotateY(${rotation}deg)`,
                }}
            >
                {/* Border effect */}
                <div
                    className={`${styles.borderEffect} ${position == 'absolute' ? styles.undraw : ''}`}
                    
                ></div>
                <MiniApp />
            </div>
            {/* <div
                className={styles.rotatingDiv}
                style={{
                    position,
                    bottom: position === "fixed" ? "12%" : "12%",
                    transform: `rotateY(${rotation}deg)`,
                }}
            >
                <MiniApp />
            </div> */}
        </div>
    );
}