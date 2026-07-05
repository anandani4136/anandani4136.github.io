'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import DotField from '../DotField/DotField';
import LogoChip from '../LogoChip/LogoChip';
import Magnetic from '../Magnetic/Magnetic';
import Navbar from '../Navbar/Navbar';
import SocialButton from '../SocialButton/SocialButton';
import { ArrowDownIcon } from '../Icons/SocialIcons';
import { education, experiences, hero, narrativeBeats, socialLinks } from '../../data/site-content';
import { beatTextOpacity } from '../../lib/narrative-scroll';
import styles from './home-page.module.css';

const revealTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function Reveal({
  children,
  className,
  delay = 0,
  tilt = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, rotateX: tilt ? 16 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...revealTransition, delay }}
      style={tilt ? { transformPerspective: 900, transformOrigin: 'center bottom' } : undefined}
    >
      {children}
    </motion.div>
  );
}

function NarrativeLines({ lines, opacity }: { lines: string[]; opacity: number }) {
  return (
    <div className={styles.narrativeText} style={{ opacity, visibility: opacity > 0.01 ? 'visible' : 'hidden' }}>
      {lines.map((line) => (
        <span key={line} className={styles.narrativeLine}>
          {line}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const narrativeRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawNarrative } = useScroll({
    target: narrativeRef,
    offset: ['start start', 'end end'],
  });
  const narrative = useSpring(rawNarrative, { stiffness: 140, damping: 30, mass: 0.4 });

  const { scrollYProgress: contentEnter } = useScroll({
    target: contentRef,
    offset: ['start end', 'start start'],
  });

  const [narrativeProgress, setNarrativeProgress] = useState(0);
  const [contentFade, setContentFade] = useState(0);

  useMotionValueEvent(narrative, 'change', (v) => setNarrativeProgress(v));
  useMotionValueEvent(contentEnter, 'change', (v) => setContentFade(v));

  // Slowly shift the global accent hue as the page scrolls — a subtle color journey.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        document.documentElement.style.setProperty('--accent-h', (214 + p * 92).toFixed(1));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const beatCount = narrativeBeats.length;
  const s = Math.max(0, Math.min(1, narrativeProgress)) * beatCount;
  const beatIndex = Math.min(beatCount - 1, Math.floor(s));

  const scrollToNarrative = () => {
    narrativeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <DotField narrativeProgress={narrativeProgress} contentFade={contentFade} />
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroInner}>
            <motion.h1
              className={styles.name}
              data-text={hero.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {hero.name}
            </motion.h1>
            {/* Tagline temporarily hidden per request. */}
            {/* <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              {hero.tagline}
            </motion.p> */}
            <motion.div
              className={styles.socialRow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44 }}
            >
              {socialLinks.map((link) => (
                <Magnetic key={link.label} strength={0.18}>
                  <SocialButton href={link.href} label={link.label} icon={link.icon} />
                </Magnetic>
              ))}
            </motion.div>
          </div>
          <button type="button" className={styles.scrollCue} onClick={scrollToNarrative} aria-label="Scroll down">
            <span>Scroll</span>
            <ArrowDownIcon className={styles.scrollArrow} />
          </button>
        </section>

        <section ref={narrativeRef} className={styles.narrative} aria-label="Story">
          <div className={styles.narrativeSticky}>
            <div className={styles.narrativeStage}>
              <NarrativeLines
                lines={narrativeBeats[beatIndex].lines}
                opacity={beatTextOpacity(beatIndex, s, beatCount)}
              />
              {beatIndex < beatCount - 1 && (
                <NarrativeLines
                  lines={narrativeBeats[beatIndex + 1].lines}
                  opacity={beatTextOpacity(beatIndex + 1, s, beatCount)}
                />
              )}
            </div>
          </div>
        </section>

        <section ref={contentRef} className={styles.content}>
          <section id="about" className={styles.section}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>01</span>
                <h2>About</h2>
                <div className={styles.rule} />
              </div>
            </Reveal>
            <div className={styles.aboutGrid}>
              <Reveal className={styles.aboutPhotoWrap}>
                <div className={styles.aboutPhoto}>
                  <img src="/media/ronit_2026.png" alt="Ronit Anandani" />
                </div>
              </Reveal>
              <Reveal className={styles.aboutCopy} delay={0.1}>
                <p className={styles.lead}>
                  Building systems that learn, automate, and protect — at scale and with purpose.
                </p>
                <p>
                  I&apos;m a results-driven engineer passionate about leveraging <strong>AI</strong>,{' '}
                  <strong>cloud</strong>, and <strong>security</strong> to build scalable, intelligent systems.
                </p>
                <p>
                  Driven by <strong>clarity</strong>, <strong>ownership</strong>, and{' '}
                  <strong>systems thinking</strong>, I build for impact and lead with confidence.
                </p>
              </Reveal>
            </div>
          </section>

          <section id="experience" className={styles.section}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>02</span>
                <h2>Experience</h2>
                <div className={styles.rule} />
              </div>
            </Reveal>
            <div className={styles.experienceGrid}>
              {experiences.map((entry, index) => (
                <Reveal key={`${entry.company}-${entry.title}`} delay={index * 0.08} tilt>
                  <article className={`${styles.card} ${entry.current ? styles.cardFeatured : ''}`}>
                    <div className={styles.cardHead}>
                      <LogoChip
                        src={entry.logo}
                        company={entry.company}
                        dark={entry.logoDark}
                        invert={entry.logoInvert}
                      />
                      {entry.current ? <span className={styles.currentBadge}>Current</span> : null}
                      {entry.intern ? <span className={styles.internBadge}>Internship</span> : null}
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardCompany}>{entry.company}</p>
                      <p className={styles.cardTitle}>{entry.title}</p>
                      <p className={styles.cardTime}>{entry.time}</p>
                      {entry.summary ? <p className={styles.cardSummary}>{entry.summary}</p> : null}
                    </div>
                    {entry.tags?.length ? (
                      <div className={styles.tagRow}>
                        {entry.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {entry.infoUrl ? (
                      <a className={styles.cardLink} href={entry.infoUrl} target="_blank" rel="noopener noreferrer">
                        Visit {entry.company} →
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="education" className={styles.section}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIndex}>03</span>
                <h2>Education</h2>
                <div className={styles.rule} />
              </div>
            </Reveal>
            <Reveal>
              <article className={`${styles.card} ${styles.eduCard}`}>
                <div className={styles.eduMark}>
                  <img src={education.logo} alt="University of Illinois Urbana-Champaign" />
                </div>
                <div className={styles.eduBody}>
                  <h3>{education.school}</h3>
                  <div className={styles.degreeList}>
                    {education.degrees.map((item) => (
                      <div key={item.degree} className={styles.degreeItem}>
                        <div className={styles.degreeHead}>
                          <span className={styles.degreeTitle}>
                            {item.degree} · {item.field}
                          </span>
                          {item.time ? <span className={styles.degreeTime}>{item.time}</span> : null}
                        </div>
                        <span className={styles.degreeDetail}>{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </section>

          <footer className={styles.footer}>
            <div className={styles.footerSocial}>
              {socialLinks.map((link) => (
                <Magnetic key={link.label} strength={0.18}>
                  <SocialButton href={link.href} label={link.label} icon={link.icon} />
                </Magnetic>
              ))}
            </div>
            <p className={styles.footerNote}>© {new Date().getFullYear()} Ronit Anandani</p>
            <a className={styles.archiveLink} href="/archive/">
              View archived site
            </a>
          </footer>
        </section>
      </main>
    </div>
  );
}
