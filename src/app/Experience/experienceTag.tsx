import React, { useState } from 'react';
import styles from './experience.module.css'

interface ExperienceItemProps {
    logo: string;
    inverted?: boolean;
    title: string;
    company: string;
    time: string;
    tasks: string[];
    infoUrl?: string; 
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ logo, inverted, title, company, time, tasks, infoUrl }) => {
  const [openDesc, setOpenDesc] = useState(false);

  const openDescription = () => {
    setOpenDesc(!openDesc);
  };

  return (
    <div className={styles.tagItem}>
      <a
        style={{filter: `invert(${inverted ? 1 : 0})`}}
        href={infoUrl}
        className={`animate__animated animate__backInUp ${styles.tagIcon}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.iconFine} src={logo} alt={`${company} logo`} />
      </a>

      <div className={styles.textContainerTag}>
        <div>
          <h2>{title}</h2>
          <h3>{company}</h3>
          <p className={styles.typeTag}>{time}</p>
          {/* <button onClick={openDescription}>Previously: </button> */}
        </div>
      </div>

      {/* <div 
        className={openDesc ? styles.expDescription : styles.smlDescription}
        onClick={openDescription} 
        // style={{minWidth: openDesc ? '299px' : '40px'}}
      >
        <div className={openDesc ? styles.textContainer2 : styles.textContainer3}>
          {openDesc ? (
            <div>
              {tasks.map((task, index) => (
                <div key={index}>
                    <p key={index}>
                    • {task}
                  
                    </p>
                    <br/>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>+</p>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default ExperienceItem;
