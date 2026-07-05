"use client";

import React from "react";
import styles from "./box.module.css";

export default function RotatingBox() {
    return (
        <div className={styles.scene}>
            <div className={styles.box}>
                <div className={`${styles.face} ${styles.front}`}></div>
                <div className={`${styles.face} ${styles.back}`}></div>
                <div className={`${styles.face} ${styles.left}`}></div>
                <div className={`${styles.face} ${styles.right}`}></div>
                <div className={`${styles.face} ${styles.top}`}></div>
                <div className={`${styles.face} ${styles.bottom}`}></div>
            </div>
        </div>
    );
}