"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./MiniApp.module.css";

export default function InnovationHub() {
    const [isTransformed, setIsTransformed] = useState(false); // State to trigger transformation
    const [isStarted, setIsStarted] = useState(false); // State to trigger animation start
    const [opacity, setOpacity] = useState(1); // State to control opacity

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const startPoint = 2.4 * window.innerHeight;
            const triggerPoint = 2.65 * window.innerHeight;
            const endPoint = 2.9 * window.innerHeight;
            const vh = window.innerHeight;
            
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                setIsStarted(scrollPosition >= startPoint);
                setIsTransformed(scrollPosition > triggerPoint);

                if (scrollPosition > endPoint) {
                    const opacity = 1 - 4 * (scrollPosition - endPoint) / vh;
                    setOpacity(Math.max(opacity, 0));
                } else {
                    setOpacity(1);
                }
            });
        };
    
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);    

    // const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas?.getContext("2d");
    //     const nodePadding = 10;

    //     if (!canvas || !ctx) return;

    //     const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    //     const lines = [];
    //     const width = (window.innerWidth)/2;
    //     const height = (window.innerHeight)/2;
    //     canvas.width = width;
    //     canvas.height = height;

    //     // Create random nodes
    //     for (let i = 0; i < 25; i++) {
    //         nodes.push({
    //             x: Math.random() * width,
    //             y: Math.random() * height,
    //             vx: (Math.random() - 0.5) * 1,
    //             vy: (Math.random() - 0.5) * 1,
    //         });
    //     }

    //     const animate = () => {
    //         ctx.clearRect(0, 0, width, height);

    //         // Draw nodes
    //         for (const node of nodes) {
    //             ctx.beginPath();
    //             ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
    //             ctx.fillStyle = "#00ff00";
    //             ctx.fill();
    //             ctx.closePath();

    //             // Move nodes
    //             node.x += node.vx;
    //             node.y += node.vy;

    //             // Bounce off edges
    //             if (node.x <= 0 + nodePadding || node.x >= width - nodePadding) node.vx *= -1;
    //             if (node.y <= 0 + nodePadding || node.y >= height - nodePadding) node.vy *= -1;
    //         }

    //         // Draw lines between close nodes
    //         for (let i = 0; i < nodes.length; i++) {
    //             for (let j = i + 1; j < nodes.length; j++) {
    //                 const dx = nodes[i].x - nodes[j].x;
    //                 const dy = nodes[i].y - nodes[j].y;
    //                 const distance = Math.sqrt(dx * dx + dy * dy);

    //                 if (distance < 100) {
    //                     ctx.beginPath();
    //                     ctx.moveTo(nodes[i].x, nodes[i].y);
    //                     ctx.lineTo(nodes[j].x, nodes[j].y);
    //                     ctx.strokeStyle = `rgba(0, 255, 0, ${1 - distance / 100})`;
    //                     ctx.lineWidth = 3.5;
    //                     ctx.stroke();
    //                     ctx.closePath();
    //                 }
    //             }
    //         }

    //         requestAnimationFrame(animate);
    //     };

    //     animate();

    //     // Cleanup on component unmount
    //     return () => {
    //         cancelAnimationFrame(animate);
    //     };
    // }, []);

    return (
        <div className={styles.miniApp} style={{opacity: opacity, boxShadow: isStarted ? '0 0 60px rgba(255, 255, 255, 0.5)' : ''}}>
            {/* {!isTransformed && ( */}
            <div className={styles.appTop} style={{opacity: isTransformed ? '0' : '1'}}>
                <div className={styles.nodeContainer}>
                    {/* <canvas ref={canvasRef} className={styles.nodeCanvas}></canvas> */}
                    <video
                        className={styles.backgroundVideo}
                        src='https://d3u5zljkkuhj4j.cloudfront.net/3drgb.mp4'
                        autoPlay
                        loop
                        muted
                    ></video>
                </div>
            </div>
            {/* )} */}
            {/* {!isTransformed && (
                <div className={styles.appTop} style={{maxHeight: !isTransformed ? '30vh' : '0px'}}>
                </div>
            )} */}
            
            <div className={styles.appBottom}>
                <div
                    className={`${styles.appButton} ${
                        isTransformed ? styles.leftTransformed : ""
                    }`}
                ></div>
                <div
                    className={`${styles.appButton} ${
                        isTransformed ? styles.middleTransformed : ""
                    }`}
                ></div>
                <div
                    className={`${styles.appButton} ${
                        isTransformed ? styles.rightTransformed : ""
                    }`}
                ></div>
            </div>
        </div>
    );
}