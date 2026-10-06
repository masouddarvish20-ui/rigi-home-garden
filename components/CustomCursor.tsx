'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const labels: Record<string, string> = { view: 'VIEW', open: 'OPEN', drag: 'DRAG', link: '', start: 'START' };

export default function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!precisePointer.matches || reducedMotion.matches || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.18, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.18, ease: 'power3.out' });

    const move = (event: PointerEvent) => {
      dotX(event.clientX); dotY(event.clientY); ringX(event.clientX); ringY(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button');
      setState(target?.dataset.cursor || (target ? 'link' : 'default'));
    };
    const down = () => ringRef.current && gsap.to(ringRef.current, { scale: 0.88, duration: 0.16 });
    const up = () => ringRef.current && gsap.to(ringRef.current, { scale: 1, duration: 0.28, ease: 'power2.out' });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div className={`customCursor customCursor--${state}${visible ? ' customCursor--visible' : ''}`} aria-hidden="true">
      <span ref={dotRef} className="customCursor__dot" />
      <div ref={ringRef} className="customCursor__ring"><span>{labels[state] ?? ''}</span></div>
    </div>
  );
}
