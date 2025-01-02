import React from "react";
import styles from "./waves.module.css";

export default function WaveBackground() {
  return (
    <div className={styles.waveContainer}>
      {/* Duplicate waves for seamless effect */}
      <div className={`${styles.wave} ${styles.wave1}`}></div>
      <div className={`${styles.wave} ${styles.wave2}`}></div>
      <div className={`${styles.wave} ${styles.wave3}`}></div>
    </div>
  );
}