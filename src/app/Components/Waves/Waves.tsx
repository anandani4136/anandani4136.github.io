"use client";
import React, { useRef, useEffect } from "react";
import styles from "./waves.module.css";

export default function Waves() {
  const width = 16500;
  const height = 8400;
  const points = 24;
  const waveYMax = 1580;
  const waveYMin = 1280;
  const waveYRange = waveYMax - waveYMin;

  const layers = [
    { color: "rgba(0, 0, 0, 0.11)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 1, freq1: 0.12, freq2: 0.08, speed: 0.004 },
    { color: "rgba(0, 0, 0, 0.15)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 2, freq1: 0.18, freq2: 0.1, speed: 0.0024 },
    { color: "rgba(0, 0, 0, 0.08)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 3, freq1: 0.16, freq2: 0.09, speed: 0.0025 },
    { color: "rgba(0, 0, 0, 0.2)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 4, freq1: 0.14, freq2: 0.1, speed: 0.0036 },
    { color: "rgba(0, 0, 0, 0.25)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 5, freq1: 0.1, freq2: 0.08, speed: 0.0008 },
    { color: "rgba(0, 0, 0, 0.3)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 6, freq1: 0.13, freq2: 0.07, speed: 0.0015 },
    { color: "rgba(0, 0, 0, 0.2)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 7, freq1: 0.11, freq2: 0.06, speed: 0.002 },
    { color: "rgba(0, 0, 0, 0.18)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 8, freq1: 0.15, freq2: 0.05, speed: 0.002 },
    { color: "rgba(0, 0, 0, 0.12)", amplitude: Math.random() * (waveYRange) + waveYMin, offset: 9, freq1: 0.09, freq2: 0.04, speed: 0.001 },
  ];

  const pathRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const baseHeight = 3000;
    let t = 0;

    const animate = () => {
      t += 1;

      pathRefs.current.forEach((path, i) => {
        const { amplitude, offset, freq1, freq2, speed } = layers[i];
        let d = `M0 ${baseHeight}`;
        for (let j = 0; j <= points; j++) {
          const x = (j / points) * width;
          const localPhase = j * 0.2;
          const y =
            baseHeight +
            Math.sin(j * freq1 + t * speed + offset + localPhase) * amplitude +
            Math.cos(j * freq2 + t * speed * 1.5 + offset - localPhase) * (amplitude / 2);
          d += ` L${x} ${y}`;
        }
        d += ` L${width} ${height} L0 ${height} Z`;
        path.setAttribute("d", d);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={styles.svgContainer}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {layers.map((layer, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathRefs.current[i] = el;
            }}
            fill={layer.color}
          />
        ))}
      </svg>
    </div>
  );
}