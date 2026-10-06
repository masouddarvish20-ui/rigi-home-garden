'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

const credentials = [
  {
    className: 'whyRigiCredential--class',
    value: 'B',
    label: 'Licensed General Contractor',
    detail: 'California Class B',
  },
  {
    className: 'whyRigiCredential--license',
    value: '#1161845',
    label: 'California contractor license',
    detail: 'Licensed · Bonded · Insured',
  },
  {
    className: 'whyRigiCredential--scope',
    value: 'Residential\n+ Commercial',
    label: 'Project scope',
    detail: 'Ground-up work, remodeling, and property improvements',
  },
  {
    className: 'whyRigiCredential--location',
    value: 'Orange County',
    label: 'California',
    detail: 'Locally focused project execution',
  },
  {
    className: 'whyRigiCredential--markets',
    value: '3',
    label: 'Markets of project experience',
    detail: 'Germany · Dubai · California',
  },
];

export default function WhyRigiSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo('.whyRigiIntro__copy', { autoAlpha: 0, y: 30 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.whyRigiIntro__copy', start: 'top 86%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.whyRigiCredential', { autoAlpha: 0, y: 52, rotateX: 7 }, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 1.05,
        stagger: 0.1,
        ease: 'power3.out',
        transformOrigin: '50% 100%',
        scrollTrigger: { trigger: '.whyRigiCredentials', start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="whyRigi" id="why-rigi" aria-labelledby="why-rigi-title">
      <div className="whyRigi__layout">
        <header className="whyRigiIntro">
          <p className="eyebrow eyebrow--line" data-gold-line>WHY RIGI</p>
          <RevealHeading id="why-rigi-title" text={'Built on Craft.\nBacked by Experience.'} depth />
          <p className="whyRigiIntro__copy">
            A licensed general contractor combining construction expertise, design awareness, and hands-on project execution across residential and commercial work.
          </p>
        </header>

        <div className="whyRigiCredentials" aria-label="RIGI credentials and experience">
          {credentials.map((credential) => (
            <article className={`whyRigiCredential ${credential.className}`} key={credential.label} tabIndex={0} data-cursor="link">
              <span className="whyRigiCredential__value" aria-hidden="true">
                {credential.value.split('\n').map((line) => <span key={line}>{line}</span>)}
              </span>
              <div className="whyRigiCredential__copy">
                <h3>{credential.label}</h3>
                <p>{credential.detail}</p>
              </div>
              <span className="whyRigiCredential__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
