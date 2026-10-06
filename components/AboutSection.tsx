'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

const principles = [
  { title: 'Craft', description: 'Built with care from structure to finish.' },
  { title: 'Clarity', description: 'Clear communication throughout the project.' },
  { title: 'Detail', description: 'Attention to materials, proportions, and final execution.' },
  { title: 'Delivery', description: 'Hands-on coordination from planning through completion.' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo('.aboutRigi__copy', { autoAlpha: 0, y: 30 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.aboutRigi__copy', start: 'top 86%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.aboutRigi__image', { autoAlpha: 0, clipPath: 'inset(8% 0 8% 0)', scale: 1.035 }, {
        autoAlpha: 1,
        clipPath: 'inset(0% 0 0% 0)',
        scale: 1,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.aboutRigi__image', start: 'top 84%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.aboutPrinciple', { autoAlpha: 0, y: 34 }, {
        autoAlpha: 1,
        y: 0,
        duration: .9,
        stagger: .1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.aboutPrinciples', start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="aboutRigi" id="about" aria-labelledby="about-rigi-title">
      <div className="aboutRigi__layout">
        <header className="aboutRigi__intro">
          <p className="eyebrow eyebrow--line" data-gold-line>ABOUT RIGI</p>
          <RevealHeading id="about-rigi-title" text={'Building With\nPurpose.'} depth />
          <p className="aboutRigi__copy">
            RIGI Home &amp; Garden Design brings together construction expertise, design awareness, and hands-on project execution to create spaces that are built carefully, managed clearly, and finished with attention to detail.
          </p>
          <p className="aboutRigi__scope">Residential &amp; commercial · California standards · Germany, Dubai &amp; California</p>
        </header>

        <figure className="aboutRigi__image">
          <Image
            src="/projects/germany/de-03/selected/DE-03_Luxury_Interior_Bathroom_and_Flooring__photo-166.webp"
            alt="Completed RIGI interior renovation with polished flooring and architectural lighting"
            fill
            sizes="(max-width: 820px) 100vw, 48vw"
            loading="lazy"
          />
          <figcaption>Completed interior renovation · Germany</figcaption>
        </figure>
      </div>

      <div className="aboutPrinciples" aria-label="RIGI working principles">
        {principles.map((principle, index) => (
          <article className="aboutPrinciple" key={principle.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
