"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './projects.module.css'
import ProjectItem from './projectItem'
import 'animate.css'
import AOS from "aos";
import "aos/dist/aos.css";
import SocialLogo from 'social-logos';


export default function Footer() {
    const [animateLine, setAnimateLine] = useState(false);
    const lineRef = useRef(null);

    useEffect(() => {
        AOS.init({
          easing: "ease-out-cubic",
          once: false, // whether animation should happen only once - while scrolling down
          mirror: true, // whether elements should animate out while scrolling past them
          offset: 50,
        });
      }, []);


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
    

    const projects = [
        // {
        //     imageSrc: 'https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.webp?b=1&s=612x612&w=0&k=20&c=C318sxgBBIO66E7vi_0Eu3lXHm9uRDauKvRgeyxY2O4=',
        //     title: 'Project 1',
        //     desc: 'Project Description',
        //     technologies: ['Java', 'Python'],
        //     tasks: ['Task 1', 'Task 2', 'Task 3'],
        //     githubLink: 'https://www.github.com/project1',
        //     videoLink: 'https://www.youtube.com/project1',
        //     siteLink: 'http://www.project1.com'
        // },
        {
            imageSrc: 'media/rp2023.png',
            title: 'R|P Google Event Pass API',
            desc: 'NestJS API Event Pass Generation',
            technologies: ['TypeScript', 'NestJS', 'Google Cloud Platform'],
            tasks: ['Adapted the Google Wallet Event Pass generation functions for NestJS and extending our internal API by developing custom endpoints to enable a seamless integration of the feature across our registration and authentication platforms'],
            githubLink: 'https://github.com/ReflectionsProjections/rp-api-2023/tree/main/src/wallet'
        },
        {
            imageSrc: 'media/hack23.png',
            title: 'HackIllinois 2023 Site',
            desc: `UIUC's Hackathon Website`,
            technologies: ['TypeScript', 'NextJS'],
            tasks: ['Created the Registration and RSVP pages for 2023, working closely with Design and API teams to develop a reliable and intuitive system used by hundreds of registrants', 'Developed the mentors, map, and elements of the landing page, ensuring responsive design and effective UI across all pages'],
            githubLink: 'https://github.com/HackIllinois/site',
            // videoLink: 'https://www.youtube.com/project1',
            siteLink: 'https://2023.hackillinois.org/'
        },
        {
            imageSrc: 'media/tripvisor.png',
            title: 'TripVisor',
            desc: 'Interactive map and route builder app',
            technologies: ['React', 'TypeScript'],
            tasks: ['Users can add and remove waypoints, and the app will automatically calculate the optimal route', 'Uses Google Maps API to display map and calculate routes, Google Places API to search for locations, and Bing Local Suggestions API to autocomplete locations'],
            githubLink: 'https://github.com/CS-222-Group-Project/TripVisor',
            videoLink: 'https://youtu.be/dJn0BEAKQeY',
            // siteLink: 'https://parents.compscikids.net/'
        },
        {
            imageSrc: 'media/cskportal.png',
            title: 'CompSci Kids Portal',
            desc: 'Tutoring Program Registration Portal',
            technologies: ['React', 'NodeJS', 'MongoDB'],
            tasks: ['Robust online portal that allows parents to register kids for after-school CS tutoring sessions','Replaced an online form that parents had to fill out numerous times, simplifying the registration flow and allowing for more efficient data management'],
            githubLink: 'https://github.com/Comp-Sci-Kids/CSKPortal',
            // videoLink: 'https://www.youtube.com/project1',
            siteLink: 'https://parents.compscikids.net/'
        },
        {
            imageSrc: 'media/mbp.jpeg',
            title: 'MacBook Pro Review',
            desc: 'Award-Winning Media Production',
            // technologies: ['React', 'NodeJS', 'MongoDB'],
            tasks: ['My submission for the Business Professionals of America (BPA) 2022 Illinois State Leadership Conference', 'Event 420: Digital Media Production', 'Placed First in State'],
            // githubLink: 'https://github.com/Comp-Sci-Kids/CSKPortal',
            videoLink: 'https://youtu.be/iHeZMgYKGfI',
            // siteLink: 'https://parents.compscikids.net/'
        },
        {
            imageSrc: 'media/shopVision.png',
            title: 'ShopVision',
            desc: 'iOS Shopping Assistant + AR Scanner',
            technologies: ['Swift', 'Python', 'Firebase'],
            tasks: ['An iOS app that uses object classification, text identification, and barcode scanning to determine whether an offered market price for an item is ideal considering competing prices','Uses LiDAR scanning technology to scan and reconstruct larger objects (furniture, appliances) using augmented reality to better understand size and aesthetics of potential purchases'],
            // githubLink: 'https://github.com/CS-222-Group-Project/TripVisor',
            videoLink: 'https://youtu.be/gGwphVuTld4',
            // siteLink: 'https://parents.compscikids.net/'
        },
        {
            imageSrc: 'media/qwttr.png',
            title: 'Qwttr',
            desc: 'Substance Abuse Help Social Media',
            technologies: ['React', 'Firebase'],
            tasks: ['Qwttr is a feature-rich social media app designed to help people suffering from substance abuse', 'Built under 48 hours as a hackathon project', 'Won Best Health Hack at CitroHacks 2021'],
            githubLink: 'https://github.com/Socksham/Qwttr',
            videoLink: 'https://youtu.be/YFWUjrvnQYU?si=0AoG4UbsJOCvuu-R',
            siteLink: 'https://devpost.com/software/qwttr'
        },
        {
            imageSrc: 'media/smp.png',
            title: 'COVID-19 Stock Market Analysis',
            desc: 'Stock Market Effects Data Visualization',
            technologies: ['R', 'HTML'],
            tasks: ['A visualization of the effects of COVID-19 upon various stock market sectors like healthcare, technology, and energy to give perspective on the impact of a pandemic on different GICS sectors'],
            githubLink: 'https://github.com/anandani4136/Stock-Market-Analysis',
            // videoLink: 'https://youtu.be/gGwphVuTld4',
            siteLink: 'https://www.ronitanandani.com/Stock-Market-Analysis/'
        },
        {
            imageSrc: 'media/mod.png',
            title: 'Multilingual Object Detection',
            desc: 'Tensorflow Object Detection and Translation Concept',
            technologies: ['TensorFlow', 'HTML'],
            tasks: ['An object detection model is used to identify prominent objects using the webcam and the name of the object is spoken out based on the chosen language, either repeating a direct translation or utilizing an accent','Uses Coco SSD, TensorFlow, and Text-to-Speech'],
            githubLink: 'https://github.com/anandani4136/Multilingual-Object-Detection',
            // videoLink: 'https://youtu.be/gGwphVuTld4',
            siteLink: 'https://www.ronitanandani.com/Multilingual-Object-Detection/'
        },
        {
            imageSrc: 'media/rgm.png',
            title: 'Rube Goldberg Machine',
            desc: 'Physics Simulation using Matter.js',
            technologies: ['JavaScript', 'HTML'],
            tasks: ['Utilizing the Matter.js physics engine, this project simulates a Rube Goldberg Machine using various physics based elements'],
            githubLink: 'https://github.com/Timothy-Gonzalez/rube-goldberg-machine',
            videoLink: 'https://youtu.be/VC8XEjUEASA',
            siteLink: 'https://timothy-gonzalez.com/rube-goldberg-machine/'
        },
        {
            imageSrc: 'media/dijkstra.png',
            title: `Dijkstra's Path Game`,
            desc: 'Interactive game to find shortest path',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            tasks: ['Based off Dijkstra’s Network Routing Algorithm, this game creates random path weightage between points with the player’s objective to gain the least weightage while going from the starting point to the ending point', 'The game automatically calculates the optimal route and assesses the player’s performance based on their accuracy'],
            githubLink: 'https://github.com/anandani4136/Dijkstras-Algorithm-Game',
            videoLink: 'https://youtu.be/NDWOd2Mnjiw',
            siteLink: 'https://www.ronitanandani.com/Dijkstras-Algorithm-Game/'
        },
        // ... other projects
    ];

    // const [openDesc, setOpenDesc] = useState(false);

    // const openDescription = () => {
    //     setOpenDesc(!openDesc);
    // };

    const boxes = [1, 2, 3, 4, 5];

    return (
        <div id="projects" className={styles.main}>
            <h1 data-aos="fade-right" data-aos-duration="1000" className={styles.mainTitle}>Projects</h1>
            <div ref={lineRef} data-aos="fade-right" className={`${styles.horizontalLine} ${
                    animateLine ? styles.animateLine : ""
                }`}></div>
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500" className={styles.projContainer}>
                {/* <div className={styles.projItem}>
                    <div className={styles.projContent}>
                        <div className={openDesc ? styles.imageExp : styles.image}>
                            <img className={styles.img} src="https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.webp?b=1&s=612x612&w=0&k=20&c=C318sxgBBIO66E7vi_0Eu3lXHm9uRDauKvRgeyxY2O4=" />
                        </div>
                        <div className={styles.subPic}>

                        
                            <div className={openDesc ? styles.textExp : styles.text}>
                                <div className={styles.leftText}>
                                    <h2>Project 1</h2>
                                    <p>Project Description</p>
                                </div>
                                <div className={styles.rightText}>
                                    <img title="Java" alt="Java" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"/>
                                    <img title="C++" alt="C++" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"/>
                                    <img title="Python" alt="Python" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"/>
                                    <div className={styles.openProj} onClick={openDescription} style={{rotate: openDesc ? '90deg' : '-90deg'}}> <span className={styles.openArrow}>-&gt;</span> </div>
                                </div>
                            </div>
                            <div className={openDesc ? styles.expDescription : styles.hidDesc}>
                                <div className={styles.textContainer2}>
                                    <p>
                                        • Task 1
                                    </p>
                                    <p>
                                        • Task 2
                                    </p>
                                    <p>
                                        • Task 3
                                    </p>
                                </div>
                                <div className={styles.interactIcons}>
                                    <a href="https://www.github.com/anandani4136" className={styles.interact1}>
                                        <div className={styles.interactText}>Code</div>
                                        <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                            <SocialLogo icon="github" size={ 30 } />
                                        </div>
                                    </a>

                                    <a href="https://www.youtube.com/@ronitanandani" className={styles.interact2}>
                                        <div className={styles.interactText}>Video</div>
                                        <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                            <SocialLogo icon="youtube" size={ 30 } />
                                        </div>
                                    </a>

                                    <a href="https://www.linkedin.com/in/ranandani" className={styles.interact3}>
                                        <div className={styles.interactText}>View</div>
                                        <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                            <div className={styles.webLogo}/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {projects.map((project, index) => (
                    <ProjectItem key={index} {...project} />
                ))}
                {/* {boxes.map(box => (
                <div className={styles.flexItem} key={box}>
                    <div className={styles.flexContent}>
                        <div className={styles.image}>
                            <img className={styles.img} src="https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.webp?b=1&s=612x612&w=0&k=20&c=C318sxgBBIO66E7vi_0Eu3lXHm9uRDauKvRgeyxY2O4=" />
                        </div>
                        <div className={styles.text}>
                            <div className={styles.leftText}>
                                <h2>Project 1</h2>
                                <p>Project Description</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))} */}
            </div>
            <div className={styles.endTag}>
                <a href="https://www.github.com/anandani4136" target="_blank" rel="noopener noreferrer" className={styles.learnMore}>
                    Explore More on GitHub <SocialLogo className={styles.socialIcon} icon="github" size={ 28 } />
                </a>
            </div>
        </div>
    );
}