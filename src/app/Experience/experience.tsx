"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import styles from './experience.module.css'
import ExperienceItem from './experienceItem'
import 'animate.css'
import { useInView } from 'react-intersection-observer';
import AOS from "aos";
import "aos/dist/aos.css";
import ExperienceTag from './experienceTag';
import SocialLogo from 'social-logos';

type Experience = {
    title: string;
    company: string;
    time: string;
    tasks: string[];
    logo: string;
    infoUrl: string;
  };

export default function Experience() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef =  useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollRight, setScrollRight] = useState(true);
    const [animateLine, setAnimateLine] = useState(false);
    const [openDesc, setOpenDesc] = useState(false);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    

    const lineRef = useRef(null);

    useEffect(() => {
        // AOS.init(); // Initialize AOS

        // Set up Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateLine(true); // Trigger animation when visible
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        if (lineRef.current) {
            observer.observe(lineRef.current); // Observe the line element
        }

        return () => {
            if (lineRef.current) {
                observer.unobserve(lineRef.current); // Cleanup observer on unmount
            }
        };
    }, []);


    const handleScroll = () => {
        if (scrollContainerRef.current) {
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            setScrollRight(scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth < (scrollContainerRef.current.scrollWidth - 50));

            // console.log(scrollRight);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
            };
        }

        // AOS.init({
        //     easing: "ease-out-cubic",
        //     once: true,
        //     offset: 50,
        //   });
    }, []);

    const scrollTo = (scrollLeft: boolean) => {
        if (scrollContainerRef.current) {
            const cardWidth = window.innerWidth * 0.7 + 420
            const scrollAmount = scrollLeft ? -cardWidth/2 : cardWidth/2;
            scrollContainerRef.current.scrollLeft += scrollAmount;
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            setScrollRight(scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth < scrollContainerRef.current.scrollWidth);
            // setScrollRight(scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth);
            // console.log(scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth < scrollContainerRef.current.scrollWidth)
        }
    };

    const openDescription = () => {
        // console.log("test");
        setOpenDesc(!openDesc);
        // const element = document.getElementById("description" + index);
        // if (element) {
        //     element.style.display = "block";
        // }
    }

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // if (entry.isIntersecting) {
                //     entry.target.classList.add('animate__animated', 'animate__zoomIn');
                // } else {
                //     entry.target.classList.remove('animate__animated', 'animate__zoomIn');
                // }
            });
        });

        if (scrollContainer) {
            observer.observe(scrollContainer);

            return () => {
                observer.unobserve(scrollContainer);
            };
        }
    }, []);

    useEffect(() => {
        fetch("https://d3u5zljkkuhj4j.cloudfront.net/experiences.json")
          .then((res) => res.json())
          .then((data: Experience[]) => setExperiences(data))
          .catch(console.error);
      }, []);



    return (
        <div id="experience" className={styles.main}>
            <h1 data-aos="fade-right" data-aos-duration="1000" className={styles.title}>Experience</h1>
            <div ref={lineRef} data-aos="fade-right" className={`${styles.horizontalLine} ${
                    animateLine ? styles.animateLine : ""
                }`}></div>
            {/* <div className = {styles.positions}> */}
            <div data-aos="fade-left" data-aos-duration="1300" data-aos-delay="500" data-aos-easing="ease-in-sine" className={styles.positionTag}>
                {experiences.map((exp, i) => (
                    <ExperienceTag
                        key={i}
                        logo={exp.logo}
                        title={exp.title}
                        company={exp.company}
                        time={exp.time}
                        tasks={exp.tasks}
                        infoUrl={exp.infoUrl}
                    />
                ))}
            </div>
                {/* <div data-aos="fade-left" data-aos-duration="1300" data-aos-delay="500" data-aos-easing="ease-in-sine" ref={scrollContainerRef} className={`${styles.position}`}>
                    <ExperienceItem logo={icons[0]} title="Co-Director" company="HackIllinois" time="04/23 - Present" tasks={["S", "L", "D"]}/>
                    <ExperienceItem logo={icons[1]} title="Infra Project Lead" company="ACM @ UIUC" time="02/23 - Present" tasks={["S", "L", "D"]}/>
                    <ExperienceItem logo={icons[2]} title="Tech Committee Chair" company="NOBE Illinois" time="09/22 - Present" tasks={["S", "L", "D"]}/>
                    <ExperienceItem logo={icons[4]} title="Software Engineer Intern" company="Novaspect Inc." time="05/23 - 08/23" tasks={["S", "L", "D"]}/>
                    <ExperienceItem logo={icons[3]} title="Software Dev Engineer" company="Reflections | Projections" time="02/23 - 09/23" tasks={["S", "L", "D"]}/>
                    
                    
                </div>
                <div onClick={() => scrollTo(true)} className={styles.leftScroll} 
                    style={{opacity: scrollLeft ? 1 : 0}}><span>&lt;-</span></div>
                <div onClick={() => scrollTo(false)} className={styles.rightScroll}
                    style={{opacity: scrollRight == true ? 1 : 0}}><span>-&gt;</span></div> */}
            {/* </div> */}
            <div className={styles.endTag}>
                <a href="https://www.linkedin.com/in/ranandani/" target="_blank" rel="noopener noreferrer" className={styles.learnMore}>
                    Learn More on LinkedIn <SocialLogo className={styles.socialIcon} icon="linkedin" size={ 28 } />
                </a>
            </div>
        </div>
    )
}