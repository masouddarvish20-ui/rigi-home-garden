'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroBrandOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    const indicator = indicatorRef.current;
    const hero = document.querySelector<HTMLElement>('.scrollHero');
    const badge = document.querySelector<HTMLElement>('.licenseBadge');
    if (!overlay || !mark || !indicator || !hero) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const progressState = { value: 0 };
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=620%',
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            overlay.style.setProperty('--hero-progress', String(self.progress));
            document.body.classList.toggle('heroBrandHasFaded', self.progress >= 0.36);
          },
        },
      });

      timeline
        .to(progressState, { value: 1, duration: 1, ease: 'none' }, 0)
        .to(mark, { opacity: 0.978, duration: 0.1, ease: 'none' }, 0)
        .to(mark, { opacity: 0.848, duration: 0.1, ease: 'none' }, 0.1)
        .to(mark, { opacity: 0.652, duration: 0.1, ease: 'none' }, 0.2)
        .to(mark, { opacity: 0.413, duration: 0.1, ease: 'none' }, 0.3)
        .to(mark, { opacity: 0.196, duration: 0.1, ease: 'none' }, 0.4)
        .to(mark, { autoAlpha: 0, duration: 0.1, ease: 'none' }, 0.5)
        .to(
          mark,
          {
            scale: reducedMotion ? 1 : 0.98,
            y: reducedMotion ? 0 : -6,
            duration: 0.6,
            ease: 'none',
          },
          0,
        )
        .to(indicator, { autoAlpha: 0, duration: 0.32, ease: 'none' }, 0.2);

      if (badge) {
        timeline.fromTo(
          badge,
          { autoAlpha: 0.2 },
          { autoAlpha: 1, duration: 0.5, ease: 'none' },
          0.1,
        );
      }
    }, mark);

    return () => {
      document.body.classList.remove('heroBrandHasFaded');
      context.revert();
    };
  }, []);

  return (
    <div ref={overlayRef} className="heroBrandOverlay">
      <div ref={markRef} className="heroBrandMark" aria-label="RIGI Home and Garden Design, Licensed General Contractor, Class B, California license number 1161845, Residential and Commercial, Orange County, California">
        <Image
          src="/brand/rigi-logo-gold-transparent.png"
          alt="RIGI Home and Garden Design LLC"
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 700px) 82vw, 56vw"
        />
        <div className="heroBrandMark__credentials">
          <span>Licensed General Contractor · Class B</span>
          <strong>CA Lic. #1161845</strong>
          <span>Residential + Commercial</span>
          <span>Orange County, California</span>
        </div>
      </div>

      <div ref={indicatorRef} className="heroScrollRail" aria-hidden="true">
        <span className="heroScrollRail__label">Scroll</span>
        <span className="heroScrollRail__track">
          <i className="heroScrollRail__progress" />
          <i className="heroScrollRail__traveler" />
        </span>
      </div>
    </div>
  );
}
