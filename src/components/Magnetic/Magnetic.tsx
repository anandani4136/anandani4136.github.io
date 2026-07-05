'use client';

import { useRef, type ReactNode } from 'react';

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Gently pulls its child toward the cursor while hovered. */
export default function Magnetic({ children, strength = 0.15, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        display: 'inline-flex',
        willChange: 'transform',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)',
      }}
    >
      {children}
    </span>
  );
}
