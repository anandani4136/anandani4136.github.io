'use client';

import { useEffect, useState } from 'react';
import Magnetic from '../Magnetic/Magnetic';
import styles from './navbar.module.css';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className={`${styles.nav} ${visible ? styles.visible : ''}`} aria-label="Primary">
      <button type="button" className={styles.brand} onClick={toTop}>
        RA
      </button>
      <div className={styles.links}>
        {sections.map((s) => (
          <Magnetic key={s.id} strength={0.15}>
            <button type="button" className={styles.link} onClick={() => go(s.id)}>
              {s.label}
            </button>
          </Magnetic>
        ))}
      </div>
    </nav>
  );
}
