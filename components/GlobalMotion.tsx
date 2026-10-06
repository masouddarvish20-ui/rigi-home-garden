'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

const depthDistance = { slow: 18, medium: 30, fast: 44 } as const;

export default function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const context = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-reveal-heading], [data-section-reveal]', { autoAlpha: 1, clearProps: 'transform' });
        gsap.set('.revealHeading__word', { autoAlpha: 1, clearProps: 'transform' });
        gsap.set('[data-gold-line]', { '--line-scale': 1 });
        return;
      }

      document.querySelectorAll<HTMLElement>('[data-reveal-heading]').forEach((heading) => {
        const words = heading.querySelectorAll('.revealHeading__word');
        gsap.fromTo(words,
          { autoAlpha: 0, y: 45, rotateX: 11, transformOrigin: 'bottom center' },
          {
            autoAlpha: 1, y: 0, rotateX: 0, duration: 1.05, stagger: 0.055, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 86%', toggleActions: 'play none none reverse' },
          },
        );
      });

      document.querySelectorAll<HTMLElement>('[data-gold-line]').forEach((element) => {
        gsap.fromTo(element, { '--line-scale': 0 }, {
          '--line-scale': 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });

      document.querySelectorAll<HTMLElement>('[data-section-reveal]').forEach((section) => {
        gsap.fromTo(section, { autoAlpha: 0.72, y: 34 }, {
          autoAlpha: 1, y: 0, duration: 1.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });

      if (desktop) {
        document.querySelectorAll<HTMLElement>('[data-depth]').forEach((element) => {
          const speed = element.dataset.depth as keyof typeof depthDistance;
          const distance = depthDistance[speed] ?? depthDistance.slow;
          gsap.fromTo(element, { y: -distance / 2 }, {
            y: distance / 2, ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true },
          });
        });
      }
    }, document.body);

    const cleanups: Array<() => void> = [];
    if (!reduced && desktop) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
        const move = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
          gsap.to(element, { x, y, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        };
        const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,.45)', overwrite: 'auto' });
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', reset);
        cleanups.push(() => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); });
      });

      document.querySelectorAll<HTMLElement>('[data-pointer-depth]').forEach((element) => {
        const move = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
          gsap.to(element, { x, y, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
        };
        const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', reset);
        cleanups.push(() => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); });
      });
    }

    return () => { cleanups.forEach((cleanup) => cleanup()); context.revert(); };
  }, [pathname]);

  return null;
}
