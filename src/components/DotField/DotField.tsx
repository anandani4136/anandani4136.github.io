'use client';

import { useEffect, useRef } from 'react';
import {
  blend,
  blendArr,
  edgeStrengthFor,
  edgeThresholdFor,
  formationFor,
  perspectiveWave,
  smoothstep,
  type Vec2,
} from '../../lib/formations';
import { narrativeBeats } from '../../data/site-content';
import styles from './dot-field.module.css';

type DotFieldProps = {
  narrativeProgress: number;
  contentFade: number;
};

type Dot = Vec2 & { seed: number };

function getDotCount(width: number) {
  if (width < 640) return 150;
  if (width < 1024) return 260;
  return 360;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function DotField({ narrativeProgress, contentFade }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const stateRef = useRef({ narrativeProgress, contentFade });
  const mouseRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const frameRef = useRef<number>();

  stateRef.current = { narrativeProgress, contentFade };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getDotCount(window.innerWidth);
      if (dotsRef.current.length !== count) {
        const wave = perspectiveWave(count, window.innerWidth, window.innerHeight, 0);
        dotsRef.current = wave.pts.map((p, i) => ({ ...p, seed: i * 12.9898 }));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--dot').trim() || '#0a0d12';
    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2563eb';
    let dotColor = readColor();
    let accent = readAccent();
    let colorTick = 0;

    const animate = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dots = dotsRef.current;
      const count = dots.length;
      const { narrativeProgress: progress, contentFade: fade } = stateRef.current;
      const t = now * 0.001;

      if (colorTick++ % 30 === 0) {
        dotColor = readColor();
        accent = readAccent();
      }

      // ----- Hero perspective wave (animated) -----
      const wave = perspectiveWave(count, w, h, reducedMotion ? 0 : t);
      const heroWeight = 1 - smoothstep(0, 0.16, progress); // 1 in hero, 0 once narrative starts

      // Smoothed cursor + slow auto-drift so the terrain is never static.
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const driftX = Math.sin(t * 0.2) * 0.6 + Math.sin(t * 0.37) * 0.18;
      const driftY = Math.cos(t * 0.15) * 0.3;
      const parX = (mouse.x + driftX) * heroWeight;
      const parY = (mouse.y + driftY) * heroWeight;
      if (heroWeight > 0.001) {
        for (let i = 0; i < count; i++) {
          const d = wave.depth[i];
          wave.pts[i].x += parX * 60 * d;
          wave.pts[i].y += parY * 26 * d;
        }
      }
      // A band of light travelling across the terrain.
      const sweepX = ((t * 0.11) % 1.5) - 0.25;

      // ----- Narrative formation targets -----
      const beatCount = narrativeBeats.length;
      const scaled = Math.max(0, Math.min(1, progress)) * beatCount;
      const idx = Math.min(beatCount - 1, Math.floor(scaled));
      const local = scaled - idx;
      const current = narrativeBeats[idx];
      const next = narrativeBeats[Math.min(idx + 1, beatCount - 1)];

      // Hold each formation through the middle of its beat, morph near the end.
      // The next formation is always previewed at its initial state (local 0) so
      // there is no discontinuity when the beat index advances.
      const morphT = idx >= beatCount - 1 ? 0 : smoothstep(0.5, 1, local);
      const cur = formationFor(current.formation, count, w, h, local);
      const nextF = morphT > 0 ? formationFor(next.formation, count, w, h, 0) : cur;
      const beatPts = morphT > 0 ? blend(cur.pts, nextF.pts, morphT) : cur.pts;
      const beatDepth = morphT > 0 ? blendArr(cur.depth, nextF.depth, morphT) : cur.depth;

      const targets = heroWeight > 0.001 ? blend(beatPts, wave.pts, heroWeight) : beatPts;

      const edgeAlpha = lerp(
        edgeStrengthFor(current.formation),
        edgeStrengthFor(next.formation),
        morphT,
      );
      const waveEdge = heroWeight; // wireframe strength in hero
      const globalFade = Math.max(0, 1 - fade * 0.95);

      // ----- Advance dots -----
      const ease = reducedMotion ? 1 : 0.14;
      for (let i = 0; i < count; i++) {
        const target = targets[i];
        dots[i].x += (target.x - dots[i].x) * ease;
        dots[i].y += (target.y - dots[i].y) * ease;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      // ----- Wave mesh edges (structured grid neighbours) -----
      if (waveEdge > 0.02) {
        const { cols } = wave;
        const rowDenom = Math.max(1, wave.rows - 1);
        ctx.strokeStyle = dotColor;
        for (let i = 0; i < count; i++) {
          const col = i % cols;
          // row 0 is nearest; fade sharply toward the horizon for an infinite feel.
          const nearness = 1 - Math.floor(i / cols) / rowDenom;
          const a = waveEdge * globalFade * 0.34 * Math.pow(nearness, 1.7);
          if (a <= 0.01) continue;
          ctx.globalAlpha = a;
          if (col < cols - 1 && i + 1 < count) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
            ctx.stroke();
          }
          if (i + cols < count) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[i + cols].x, dots[i + cols].y);
            ctx.stroke();
          }
        }
      }

      // ----- Network edges (distance based, spatial grid) -----
      if (edgeAlpha > 0.02 && !reducedMotion) {
        const threshold = lerp(
          edgeThresholdFor(current.formation, w),
          edgeThresholdFor(next.formation, w),
          morphT,
        );
        const cell = threshold;
        const gridCols = Math.ceil(w / cell) + 1;
        const buckets = new Map<number, number[]>();
        for (let i = 0; i < count; i++) {
          const gx = Math.floor(dots[i].x / cell);
          const gy = Math.floor(dots[i].y / cell);
          const key = gx + gy * gridCols;
          const arr = buckets.get(key);
          if (arr) arr.push(i);
          else buckets.set(key, [i]);
        }
        ctx.strokeStyle = dotColor;
        const threshSq = threshold * threshold;
        for (let i = 0; i < count; i++) {
          const gx = Math.floor(dots[i].x / cell);
          const gy = Math.floor(dots[i].y / cell);
          for (let ox = -1; ox <= 1; ox++) {
            for (let oy = -1; oy <= 1; oy++) {
              const arr = buckets.get(gx + ox + (gy + oy) * gridCols);
              if (!arr) continue;
              for (const j of arr) {
                if (j <= i) continue;
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const dsq = dx * dx + dy * dy;
                if (dsq < threshSq) {
                  const a = (1 - Math.sqrt(dsq) / threshold) * edgeAlpha * globalFade * 0.5;
                  if (a > 0.01) {
                    ctx.globalAlpha = a;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.stroke();
                  }
                }
              }
            }
          }
        }
      }

      // ----- Nodes -----
      const baseR = w < 640 ? 1.4 : 1.75;
      for (let i = 0; i < count; i++) {
        const depthFactor = lerp(beatDepth[i], wave.depth[i], heroWeight);
        const twinkle = 0.55 + Math.sin(t * 0.8 + dots[i].seed) * 0.18;
        // Depth fog: back dots fade toward nothing so the field feels endless.
        const fog = Math.pow(Math.max(0, Math.min(1.1, depthFactor)), 1.7);
        // Travelling light band (hero only) lights and enlarges nearby nodes.
        let sweep = 0;
        if (heroWeight > 0.05) {
          const dx = (dots[i].x / w - sweepX) / 0.11;
          sweep = Math.exp(-dx * dx) * heroWeight * fog;
        }
        const r = baseR * (0.55 + depthFactor * 0.95) + (i % 9 === 0 ? 0.7 : 0) + sweep * 1.4;
        ctx.fillStyle = i % 11 === 0 || sweep > 0.5 ? accent : dotColor;
        ctx.globalAlpha = globalFade * (twinkle * (0.06 + 0.94 * fog) + sweep * 0.7);
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
