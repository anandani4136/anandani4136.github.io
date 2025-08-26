import React from 'react';
import styles from './experience.module.css';

interface ExperienceCardProps {
    title: string;
    company: string;
    time: string;
    tagline: string;
    coverImage: string;
    logo: string;
    infoUrl?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
    title, 
    company, 
    time, 
    tagline, 
    coverImage, 
    logo,
    infoUrl
}) => {
    return (
        <a href={infoUrl} className={styles.experienceCard}>
            <div className={styles.cardImage}>
                <img src={coverImage} alt={`${company} cover`} />
            </div>
            <div className={styles.cardOverlay}>
                <div className={styles.cardLogo}>
                    <img src={logo} alt={`${company} logo`} />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTagline}>{tagline}</h3>
                    <div className={styles.cardDetails}>
                        <h4 className={styles.cardTitle}>{title}</h4>
                        <h5 className={styles.cardCompany}>{company}</h5>
                        <p className={styles.cardTime}>{time}</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ExperienceCard;
