import React, { useState } from 'react';
import styles from './projects.module.css'
import SocialLogo from 'social-logos';

interface ProjectItemProps {
    imageSrc: string;
    title: string;
    desc: string;
    technologies?: string[];
    tasks: string[];
    githubLink?: string;
    videoLink?: string;
    siteLink?: string;

}

const ProjectItem: React.FC<ProjectItemProps> = ({ imageSrc, title, desc, technologies, tasks, githubLink, videoLink, siteLink }) => {
  const [openDesc, setOpenDesc] = useState(false);

  const openDescription = () => {
    setOpenDesc(!openDesc);
  };

//   console.log(githubLink==undefined);
//   console.log(videoLink==undefined);
//   console.log(siteLink==undefined);

    const imageUrls: Record<string, string> = {
        Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        Swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
        R: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
        Javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        Typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        NodeJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        NextJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        Xcode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
        Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        DigitalOcean: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
        AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    };


  

  return (
    <div className={styles.projItem}>
        <div className={styles.projContent}>
            <div className={openDesc ? styles.imageExp : styles.image}>
                <img className={styles.img} src={imageSrc} alt={title} />
            </div>
            <div className={styles.subPic}>
                <div className={openDesc ? styles.textExp : styles.text}>
                    <div className={styles.leftText}>
                        <h2 className={styles.title}>{title}</h2>
                        <p>{desc}</p>
                    </div>
                    <div className={styles.rightText}>
                        {technologies?.map((tech, index) => (
                            <div className={styles.techTip} key={tech}>
                                <img key={index} title={tech} alt={tech} className={styles.icon} src={imageUrls[tech]}/>
                                <span className={styles.techText}>{tech}</span>
                            </div>
                        ))}
                        {/* <img title="Java" alt="Java" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"/>
                        <img title="C++" alt="C++" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"/>
                        <img title="Python" alt="Python" className={styles.icon} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"/> */}
                        <div className={styles.openProj} onClick={openDescription} style={{rotate: openDesc ? '90deg' : '-90deg'}}> <span className={styles.openArrow}>-&gt;</span> </div>
                    </div>
                </div>
                <div className={openDesc ? styles.expDescription : styles.hidDesc}>
                    <div className={styles.textContainer2}>
                        {tasks.map((task, index) => (
                            <p key={index}>• {task}</p>
                        ))}
                    </div>
                    <div className={styles.interactIcons}>
                        <a style={{display: githubLink==undefined ? 'none' : 'flex'}} href={githubLink} className={styles.interact1}>
                            <div className={styles.interactText}>Code</div>
                            <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                <SocialLogo icon="github" size={ 30 } />
                            </div>
                            {/* <img title="GitHub" alt="GitHub" className={styles.icon} style={{filter: 'invert(1)'}} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/> */}
                        </a>

                        <a style={{display: videoLink==undefined ? 'none' : 'flex'}} href={videoLink} className={styles.interact2}>
                            <div className={styles.interactText}>Video</div>
                            <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                <SocialLogo icon="youtube" size={ 30 } />
                            </div>
                        </a>

                        <a style={{display: siteLink==undefined ? 'none' : 'flex'}} href={siteLink} className={styles.interact3}>
                            <div className={styles.interactText}>View</div>
                            <div style={{filter: 'invert(1)'}} className={styles.interactIcon}> 
                                <div className={styles.webLogo}/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProjectItem;