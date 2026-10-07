'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroBrandOverlay() {
  const markRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mark = markRef.current;
    const hero = document.querySelector<HTMLElement>('.scrollHero');
    if (!mark || !hero) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.to(mark, {
        autoAlpha: 0,
        scale: 0.975,
        filter: 'blur(1px)',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 0.85, 500)}`,
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });
    }, mark);

    return () => context.revert();
  }, []);

  return (
    <div ref={markRef} className="heroBrandMark" aria-hidden="true">
      <Image
        src="/brand/rigi-logo-gold.png"
        alt=""
        width={1254}
        height={1254}
        priority
        sizes="(max-width: 700px) 78vw, 52vw"
      />
    </div>
  );
}
