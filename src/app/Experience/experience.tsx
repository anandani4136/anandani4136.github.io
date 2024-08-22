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

export default function Experience() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef =  useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollRight, setScrollRight] = useState(true);
    const [openDesc, setOpenDesc] = useState(false);
    const [icons, setIcons] = useState(["/media/logos/hackillinois.svg","https://acm-brand-images.s3.amazonaws.com/banner-blue.png", "/media/logos/nobe_tech.png","/media/logos/rp_logo.png", "/media/logos/nova.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png"  ])
    const [iconColors, setIconColors] = useState(["https://d1fdloi71mui9q.cloudfront.net/DGWGLppRSycEpp6feM0L_BIkIV5TE19J2aKD5", "data:image/png;base64,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", "data:image/jpeg;base64,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"]);
    const [iconIndex, setIconIndex] = useState(0);
    const style = {transform: `rotateY(${scrollPosition / 3 }deg) scaleX(${(((scrollPosition + 270) / 540) | 0) % 2 ? -1 : 1})`, margin: "5%", minWidth: "20%", minHeight: "30%", backgroundImage: `url(${iconColors[((scrollPosition + 270) / 540) | 0]})`, position: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "contain"} as React.CSSProperties;
    // const rotateStyle = {
    //     transform: "rotateX(102) rotateY(102)",
    // }
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    //     console.log(position);
    //     console.log(document.getElementById("main")?.clientTop)
    //     setIconIndex(Number((position - 90) / 180));
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll, { passive: true });
    
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


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

        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
          });
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

    



    return (
        <div id="experience-main" className={styles.main}>
            <h1 data-aos="fade-left" data-aos-duration="1000" className={styles.title}>Experience</h1>
            {/* <div className = {styles.positions}> */}
            <div data-aos="fade-left" data-aos-duration="1300" data-aos-delay="500" data-aos-easing="ease-in-sine" className={styles.positionTag}>
                <ExperienceTag logo={icons[1]} title="Vice Chair" company="ACM@UIUC" time="04/24 - Present" tasks={["S", "L", "D"]} infoUrl='https://www.acm.illinois.edu/'/>
                <ExperienceTag logo={icons[5]} title="Cybersecurity and Software Engineer Intern" company="Discover Financial Services" time="06/24 - 08/24" tasks={["S", "L", "D"]}/>
                <ExperienceTag logo={icons[0]} title="Co-Director" company="HackIllinois" time="04/23 - 04/24" tasks={["S", "L", "D"]} infoUrl='https://info.hackillinois.org/'/>
                <ExperienceTag logo={icons[3]} title="Software Engineer" company="Reflections | Projections" time="02/23 - Present" tasks={["S", "L", "D"]}/>
                <ExperienceTag logo={icons[2]} title="Technology Chair" company="NOBE Illinois" time="01/23 - 05/24" tasks={["S", "L", "D"]}/>
                <ExperienceTag logo={icons[4]} title="Software Engineer Intern" company="Novaspect Inc." time="05/23 - 08/23" tasks={["S", "L", "D"]}/>
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