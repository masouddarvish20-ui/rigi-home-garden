'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

const services = [
  {
    title: 'Custom Construction',
    description: 'Ground-up planning and coordinated construction shaped around the site, architecture, and long-term use.',
  },
  {
    title: 'Remodeling',
    description: 'Whole-home and focused transformations that resolve existing conditions with a clear, cohesive finish.',
  },
  {
    title: 'Outdoor Living',
    description: 'Purposeful exterior rooms that connect the home to gathering, dining, recreation, and everyday California living.',
  },
  {
    title: 'Landscape & Hardscape',
    description: 'Integrated planting, paving, drainage, walls, and site details designed as one architectural environment.',
  },
  {
    title: 'Interior Renovation',
    description: 'Refined kitchens, bathrooms, flooring, lighting, and finish work carried through with material precision.',
  },
  {
    title: 'Residential Improvements',
    description: 'Exterior and interior upgrades that strengthen function, comfort, durability, and property character.',
  },
  {
    title: 'Commercial Improvements',
    description: 'Commercial build-outs and property improvements coordinated around operations, presentation, and customer experience.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.serviceRow').forEach((row, index) => {
        gsap.fromTo(row, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1,
          y: 0,
          duration: .75,
          delay: index * .025,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 92%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="servicesSection" id="services" aria-labelledby="services-title">
      <header className="servicesIntro">
        <p className="eyebrow eyebrow--line" data-gold-line>OUR SERVICES</p>
        <RevealHeading id="services-title" text={'From Structure\nto Finish.'} depth />
        <p>Integrated construction, remodeling, and outdoor living solutions designed around the way you live and work.</p>
      </header>

      <div className="servicesExperience">
        <div className="servicesList">
          {services.map((service, index) => (
            <article className="serviceRow" key={service.title}>
              <span className="serviceRow__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="serviceRow__content"><strong>{service.title}</strong><span>{service.description}</span></span>
              <span className="serviceRow__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
