"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from "../../header.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Frame Service for optimized animation handling
class FrameService {
  private frame: number | null = null;

  debounce = (callback: () => void) => {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      callback();
    });
  }
}

export default function SegmentOne() {
    const [isSticky, setIsSticky] = useState(false);
    const [textOpacity, setTextOpacity] = useState(1);
    const [textAdded, setTextAdded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const frameService = useRef(new FrameService());
    const lastScrollPosition = useRef(0);
    const SCROLL_THRESHOLD = 8; // pixels


    // if (!textAdded) {
    //     const text1 = document.createElement('h1');
    //     text1.setAttribute('data-aos', 'fade-up');
    //     text1.setAttribute('data-aos-duration', '1000');
    //     text1.setAttribute('data-aos-offset', (window.innerHeight > 500 ? 2*window.innerHeight : 60).toString());
    //     text1.textContent = 'who thrives on innovation';
    //     text1.className = styles.Text;

    //     const container = document.getElementById('textContainer1');
    //     if (container) {
    //         container.appendChild(text1);
    //         setTextAdded(true);
    //         AOS.refresh();
    //     }
    // }

    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;
        const vh = window.innerHeight;

        // setTextOffset(vh > 500 ? vh : 40);

        // Skip unnecessary calculations
        if (Math.abs(scrollPosition - lastScrollPosition.current) < SCROLL_THRESHOLD) return;
        lastScrollPosition.current = scrollPosition;

        frameService.current.debounce(() => {
            // Define dynamic ranges based on viewport height
            const videoStart = 0.15 * vh;
            const videoEnd = 1.25 * vh;
            const stickStart = 1 * vh;
            const stickEnd = 2 * vh;

            // Optimized Video Frame Control
            const video = videoRef.current;
            if (video && scrollPosition >= videoStart && scrollPosition <= videoEnd) {
                const videoDuration = video.duration || 10;
                const progress = Math.min(
                    Math.max((scrollPosition - videoStart) / (videoEnd - videoStart), 0), 
                    1
                );
                const value = progress * videoDuration;
                if (Math.abs(video.currentTime - parseFloat(value.toPrecision(3))) > 0.1) {
                    video.currentTime = parseFloat(value.toPrecision(3));
                    // console.log(value);
                }
            } else if (video && scrollPosition < videoStart) {
                video.currentTime = 0;
            } else if (video && scrollPosition > videoEnd) {
                
                video.currentTime = video.duration || 10;
            }


            // Enhanced Sticky Text Logic
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
        });
    }, []);

    useEffect(() => {
        AOS.refresh();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div id="puzzle" className={styles.mainOne}>
            {/* Sticky Content */}
            <div
                id="textContainer1"
                className={styles.textContainer}
                style={{
                    position: isSticky ? 'fixed' : 'absolute',
                    opacity: textOpacity,
                    transition: 'opacity 0.3s ease-out' // Smooth opacity transition
                }}
            >
                <h1 data-aos="fade-up" data-aos-duration="1000" className={styles.Text}>
                    I am a problem solver
                </h1>
                <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-offset={`${window.innerHeight > 500 ? window.innerHeight : 80}`} className={styles.Text}>
                    who thrives on innovation
                </h1>
            </div>

            {/* Video Background */}
            <video 
                className={styles.video2} 
                ref={videoRef} 
                muted 
                playsInline
                preload="metadata" // Added preload attribute
            >
                <source src='https://d3u5zljkkuhj4j.cloudfront.net/puzzle4.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
