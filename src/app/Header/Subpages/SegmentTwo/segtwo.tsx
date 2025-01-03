"use client";

import React, { useEffect, useState } from "react";
import styles from "./segtwo.module.css";
import styles1 from "../../header.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { throttle } from 'lodash';

export default function SegmentTwo() {
    const centralImage = "/icons/lightbulb.svg"; // Central image
    const rows = [
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        ],
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        ],
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        ],
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        ],
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        ],
        [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        ],
    ]; // List of images for each row

    const [iconState, setIconState] = useState(
        rows.map((row) =>
            [...row, ...row, ...row, ...row].map(() => ({ type: "icon", value: "" }))
        )
    );

    const [opacity, setOpacity] = useState(1);
    const [isSticky, setIsSticky] = useState(false);
    const [textOpacity, setTextOpacity] = useState(1);
    const [textAdded, setTextAdded] = useState(false);
    

    const [shrinkScale, setShrinkScale] = useState(1); // Scale for shrinking div
    const [borderOpacity, setBorderOpacity] = useState(0); // Border opacity
    const [position, setPosition] = useState<"fixed" | "absolute">("absolute"); // Position of container
    // const [topOffset, setTopOffset] = useState(3000); // Offset for absolute positioning

    const window = global.window;

    useEffect(() => {
        AOS.refresh();

        const handleScroll = throttle(() => {
            const scrollPosition = window.scrollY;
            const vh = window.innerHeight;

            // Stick text thresholds
            const stickStart = 2.5 * vh;
            const stickEnd = 3.2 * vh;
        
            // Opacity control thresholds
            const opacityStickStart = 1 * vh;
            const opacityStickEnd = 1.7 * vh;
            const binaryStart = 2.1 * vh;
        
            // Shrinking box thresholds
            const boxFixedStart = 2.0 * vh;
            const boxFixedEnd = 2.24 * vh;
            const boxShrinkStart = boxFixedStart;
            const boxShrinkEnd = 2.24 * vh;
        
            // Handle opacity
            if (scrollPosition >= opacityStickStart && scrollPosition <= opacityStickEnd) {
                setOpacity(1);
            } else if (scrollPosition > opacityStickEnd) {
                const newOpacity = 1 - 4 * (scrollPosition - opacityStickEnd) / vh;
                setOpacity(Math.max(newOpacity, 0));
            } else {
                setOpacity(1);
            }
        
            // Handle binary transition logic
            setIconState((prevState) =>
                prevState.map((row, rowIndex) =>
                    row.map((item, index) => {
                        const modThreshold = (rowIndex + index) % 3; // Control change bit by bit
                        if (scrollPosition > binaryStart + modThreshold * 50) {
                            // Change to binary after crossing stickEnd
                            return item.type === "icon"
                                ? { type: "text", value: Math.random() > 0.5 ? "0" : "1" }
                                : item;
                        } else if (scrollPosition < binaryStart + modThreshold * 50) {
                            // Bring back icons when scrolling up
                            return item.type === "text"
                                ? { type: "icon", value: "" }
                                : item;
                        }
                        return item; // No change if within range
                    })
                )
            );
        
            // Handle shrinking box logic
            if (scrollPosition >= boxFixedStart && scrollPosition <= boxFixedEnd) {
                setPosition("fixed");
                // setTopOffset(0); // Reset offset for fixed positioning
        
                // Calculate shrink scale
                const progress = Math.min(
                    (scrollPosition - boxShrinkStart) / (boxShrinkEnd - boxShrinkStart),
                    1
                );
                setShrinkScale(1 - progress * 0.25); // Shrinks to 75% of original size
                setBorderOpacity(progress); // Gradually increase border opacity
            } else if (scrollPosition > boxFixedEnd) {
                setPosition("absolute");
                // setTopOffset(boxFixedEnd - boxFixedStart); // Set offset for absolute positioning after fixedEnd
                setShrinkScale(0.75);
                setBorderOpacity(1);
                
            } else {
                setPosition("absolute");
                // setTopOffset(0); // Reset offset for absolute positioning before fixedStart
                setShrinkScale(1);
                setBorderOpacity(0);
            }

            if (scrollPosition >= stickStart && scrollPosition <= stickEnd) {
                setIsSticky(true);
                setTextOpacity(1);
            } else if (scrollPosition > stickEnd) {
                const opacity = 1 - 4 * (scrollPosition - stickEnd) / vh;
                setTextOpacity(Math.max(opacity, 0));
                if (opacity <= 0) {
                    setIsSticky(false);
                }
            } else {
                setIsSticky(false);
                setTextOpacity(1);
            }

        }, 60);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={styles.maintwo}>
            <div
                id="textContainer2"
                className={styles1.textContainer}
                style={{
                    position: isSticky ? 'fixed' : 'absolute',
                    top: isSticky ? '45%' : '96vh',
                    opacity: textOpacity,
                    transition: 'opacity 0.3s ease-out' // Smooth opacity transition
                }}
            >
                <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-offset={`${window.innerHeight*0.3}`} className={styles1.Text}>
                    shaping bold ideas
                </h1>
                <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-offset={`${window.innerHeight > 500 ? window.innerHeight*0.6 : 100}`} className={styles1.Text}>
                    into impactful solutions
                </h1>
                {/* <h1
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-offset="200"
                    className={styles1.Text}
                >
                    exploring the{" "}
                    <span className={styles1.imageText}>
                        unexplored
                    </span>
                </h1> */}
            </div>
            <div data-aos="fade-up" 
                data-aos-duration="1000"
                data-aos-offset={`${window.innerHeight*0.4}`}>
                <div
                    className={styles.binaryContainer}
                    style={{
                        // position,
                        // top: position === "absolute" ? `${topOffset}px` : "0px",
                        transform: `scaleX(${shrinkScale}) scaleY(${shrinkScale}) rotateY(${borderOpacity*90}deg)`, // translateY(${130*(1-shrinkScale)}%)`,
                        border: `2px solid rgba(255, 255, 255, ${borderOpacity})`,
                    }}
                >
                    {/* Infinite Scrolling Rows */}
                    <div
                        className={styles.scrollingRows}
                        // data-aos="fade-up"
                        // data-aos-duration="1000"
                        // data-aos-offset="500"
                    >
                        {iconState.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`${styles.row} ${
                                    rowIndex % 2 === 0 ? styles.reverse : ""
                                }`}
                            >
                                {row.map((item, iconIndex) =>
                                    item.type === "icon" ? (
                                        <img
                                            key={iconIndex}
                                            src={
                                                rows[rowIndex % rows.length][
                                                    iconIndex % rows[0].length
                                                ]
                                            }
                                            alt={`Icon ${iconIndex}`}
                                            className={styles.icon}
                                        />
                                    ) : (
                                        <span key={iconIndex} className={styles.binText}>
                                            {item.value}
                                        </span>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Central Image */}
            <div
                data-aos="fade-up"
                data-aos-duration="800"
                className={styles.centerImage}
            >
                <img src={centralImage} alt="Central Image" style={{opacity: opacity}} />
            </div>
        </div>
    );
}