'use client';

import { useState } from 'react';
import styles from './logo-chip.module.css';

function initials(company: string) {
  return company
    .replace(/[|]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export default function LogoChip({
  src,
  company,
  dark = false,
  invert = false,
}: {
  src?: string;
  company: string;
  dark?: boolean;
  invert?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <div className={`${styles.shell} ${dark ? styles.dark : ''}`}>
      {showImg ? (
        <img
          src={src}
          alt={`${company} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          style={invert ? { filter: 'invert(1)' } : undefined}
        />
      ) : (
        <span className={styles.mono}>{initials(company)}</span>
      )}
    </div>
  );
}
