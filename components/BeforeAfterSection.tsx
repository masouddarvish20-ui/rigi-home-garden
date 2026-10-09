'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';
import { featuredTransformation } from '@/data/transformations';

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(50);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo('.transformationFeature__visual', { autoAlpha: 0, clipPath: 'inset(7% 0 7% 0)', scale: 1.025 }, {
        autoAlpha: 1,
        clipPath: 'inset(0% 0 0% 0)',
        scale: 1,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.transformationFeature', start: 'top 82%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.transformationFeature__meta > *', { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1,
        y: 0,
        duration: .85,
        stagger: .08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.transformationFeature__meta', start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="beforeAfter" id="before-after" aria-labelledby="before-after-title">
      <header className="beforeAfterIntro">
        <p className="eyebrow eyebrow--line" data-gold-line>BEFORE &amp; AFTER</p>
        <RevealHeading id="before-after-title" text="See the Transformation." depth />
        <p>Real projects. Real progress. From existing conditions to finished spaces.</p>
      </header>

      <article className="transformationFeature">
        <div className="transformationFeature__visual" data-cursor="drag" style={{ '--comparison-position': `${position}%` } as React.CSSProperties}>
          <div className="comparisonImage comparisonImage--before">
            <Image src={featuredTransformation.before} alt={featuredTransformation.beforeAlt} fill sizes="(max-width: 760px) 100vw, 88vw" priority />
          </div>
          <div className="comparisonImage comparisonImage--after" aria-hidden="true">
            <div className={featuredTransformation.rotateAfter ? 'comparisonImage__rotated' : undefined}>
              <Image src={featuredTransformation.after} alt="" fill sizes="(max-width: 760px) 100vw, 88vw" priority />
            </div>
          </div>
          <span className="comparisonLabel comparisonLabel--before">BEFORE</span>
          <span className="comparisonLabel comparisonLabel--after">AFTER</span>
          <span className="comparisonDivider" aria-hidden="true"><span><i /><i /></span></span>
          <input
            className="comparisonRange"
            type="range"
            min="0"
            max="100"
            step="1"
            value={position}
            onChange={(event) => setPosition(Number(event.currentTarget.value))}
            aria-label={`Compare before and after for ${featuredTransformation.title}`}
            aria-valuetext={`${position}% of the completed view revealed`}
          />
        </div>
        <div className="transformationFeature__meta">
          <p>{featuredTransformation.projectId} · {featuredTransformation.location} · {featuredTransformation.category}</p>
          <h3>{featuredTransformation.title}</h3>
          <p>{featuredTransformation.context}</p>
          <Link href={featuredTransformation.detailPath} data-cursor="view">Explore Transformations <span className="linkArrow" aria-hidden="true">→</span></Link>
        </div>
      </article>
    </section>
  );
}
