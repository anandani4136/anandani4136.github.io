"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./header.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

import TitleSection from "./title";
import SegmentOne from "./Subpages/SegmentOne/segone";
import SegmentTwo from "./Subpages/SegmentTwo/segtwo";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const segmentOneRef = useRef<HTMLDivElement>(null); // Ref for SegmentOne
    const segmentTwoRef = useRef<HTMLDivElement>(null); // Ref for SegmentTwo

    useEffect(() => {
        // AOS.init({
        //     easing: "ease-out-cubic",
        //     once: true,
        //     offset: 0,
        // });

        // Set up IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === segmentOneRef.current) {
                            setIsSticky(true); // Trigger sticky when SegmentOne is in view
                        } else if (entry.target === segmentTwoRef.current) {
                            setIsSticky(false); // Unstick when SegmentTwo is in view
                        }
                    }
                });
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );

        // Observe the segments
        const segmentOneNode = segmentOneRef.current;
        const segmentTwoNode = segmentTwoRef.current;
        if (segmentOneNode) observer.observe(segmentOneNode);
        if (segmentTwoNode) observer.observe(segmentTwoNode);

        // Cleanup observer on unmount
        return () => {
            if (segmentOneNode) observer.unobserve(segmentOneNode);
            if (segmentTwoNode) observer.unobserve(segmentTwoNode);
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* <div className={styles.snappingContainer}>
                <div className={styles.snappingSection}>
                    <TitleSection />
                </div>
                <div ref={segmentOneRef} className={styles.snappingSection}>
                    <SegmentOne isSticky={isSticky} />
                </div>
                <div ref={segmentTwoRef} className={styles.snappingSection}>
                    <SegmentTwo />
                </div>
            </div> */}
        </div>
    );
}