'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealHeading from '@/components/RevealHeading';

const services = [
  {
    title: 'Custom Construction',
    description: 'Ground-up planning and coordinated construction shaped around the site, architecture, and long-term use.',
    image: '/projects/germany/de-01/selected/DE-01_Whole_House_and_Garden_Renovation__photo-009.webp',
    alt: 'Active structural construction at a residential property',
  },
  {
    title: 'Remodeling',
    description: 'Whole-home and focused transformations that resolve existing conditions with a clear, cohesive finish.',
    image: '/projects/germany/de-01/selected/DE-01_Whole_House_and_Garden_Renovation__photo-052.webp',
    alt: 'Completed contemporary kitchen remodel',
  },
  {
    title: 'Outdoor Living',
    description: 'Purposeful exterior rooms that connect the home to gathering, dining, recreation, and everyday California living.',
    image: '/projects/germany/de-01/selected/DE-01_Whole_House_and_Garden_Renovation__photo-060.webp',
    alt: 'Completed garden and outdoor living space',
  },
  {
    title: 'Landscape & Hardscape',
    description: 'Integrated planting, paving, drainage, walls, and site details designed as one architectural environment.',
    image: '/projects/germany/de-02/selected/DE-02_Bungalow_Driveway_and_Front_Yard__photo-135.webp',
    alt: 'Completed bungalow driveway and front-yard hardscape',
  },
  {
    title: 'Interior Renovation',
    description: 'Refined kitchens, bathrooms, flooring, lighting, and finish work carried through with material precision.',
    image: '/projects/germany/de-03/selected/DE-03_Luxury_Interior_Bathroom_and_Flooring__photo-166.webp',
    alt: 'Completed luxury interior renovation with architectural lighting',
  },
  {
    title: 'Residential Improvements',
    description: 'Exterior and interior upgrades that strengthen function, comfort, durability, and property character.',
    image: '/projects/germany/de-02/selected/DE-02_Bungalow_Driveway_and_Front_Yard__photo-140.webp',
    alt: 'Completed residential exterior and driveway improvement',
  },
  {
    title: 'Commercial Improvements',
    description: 'Commercial build-outs and property improvements coordinated around operations, presentation, and customer experience.',
    image: '/projects/dubai/dxb-01/selected/DXB-01_KAM_Car_Vintage_Showroom__photo-250.webp',
    alt: 'Completed commercial showroom glazing and exterior',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const activeFromScroll = useRef(0);
  const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousVisual = useRef(0);
  const visualReady = useRef(false);
  const imageTimeline = useRef<gsap.core.Timeline | null>(null);
  const [activeService, setActiveService] = useState(0);

  const scheduleActive = (index: number, delay = 95) => {
    if (activeTimer.current) clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => setActiveService(index), delay);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return () => { if (activeTimer.current) clearTimeout(activeTimer.current); };
    const desktop = window.matchMedia('(min-width: 901px)').matches;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.serviceRow').forEach((row, index) => {
        gsap.fromTo(row, { autoAlpha: 0, y: 36 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay: index * 0.035,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
        ScrollTrigger.create({
          trigger: row,
          start: 'top 58%',
          end: 'bottom 42%',
          onToggle: (self) => {
            if (!self.isActive) return;
            activeFromScroll.current = index;
            scheduleActive(index);
          },
        });
      });

      if (desktop) {
        gsap.fromTo('.servicesVisual__imageMotion', { yPercent: -2 }, {
          yPercent: 2,
          ease: 'none',
          scrollTrigger: { trigger: '.servicesExperience', start: 'top bottom', end: 'bottom top', scrub: 0.85, invalidateOnRefresh: true },
        });
      }
    }, sectionRef);

    return () => {
      if (activeTimer.current) clearTimeout(activeTimer.current);
      imageTimeline.current?.kill();
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!visualRef.current) return;
    const images = Array.from(visualRef.current.querySelectorAll<HTMLElement>('.servicesVisual__image'));
    const incoming = images[activeService];
    if (!incoming) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !visualReady.current) {
      gsap.set(images, { autoAlpha: 0, scale: 1, yPercent: 0, clipPath: 'inset(0% 0 0% 0)' });
      gsap.set(incoming, { autoAlpha: 1 });
      previousVisual.current = activeService;
      visualReady.current = true;
      return;
    }

    const outgoing = images[previousVisual.current];
    imageTimeline.current?.kill();
    gsap.killTweensOf([outgoing, incoming]);
    imageTimeline.current = gsap.timeline()
      .to(outgoing, { autoAlpha: 0, scale: 1.025, yPercent: -1.8, clipPath: 'inset(3% 0 3% 0)', duration: 0.48, ease: 'power2.out' }, 0)
      .fromTo(incoming,
        { autoAlpha: 0, scale: 1.04, yPercent: 1.8, clipPath: 'inset(7% 0 7% 0)' },
        { autoAlpha: 1, scale: 1, yPercent: 0, clipPath: 'inset(0% 0 0% 0)', duration: 0.78, ease: 'power3.out' },
        0.1,
      );
    previousVisual.current = activeService;
  }, [activeService]);

  return (
    <section ref={sectionRef} className="servicesSection" id="services" aria-labelledby="services-title">
      <header className="servicesIntro">
        <p className="eyebrow eyebrow--line" data-gold-line>OUR SERVICES</p>
        <RevealHeading id="services-title" text={'From Structure\nto Finish.'} depth />
        <p>Integrated construction, remodeling, and outdoor living solutions designed around the way you live and work.</p>
      </header>

      <div className="servicesExperience">
        <aside className="servicesVisual" aria-hidden="true">
          <div ref={visualRef} className="servicesVisual__frame">
            {services.map((service, index) => (
              <div className={`servicesVisual__image${activeService === index ? ' servicesVisual__image--active' : ''}`} key={service.title}>
                <div className="servicesVisual__imageMotion"><Image src={service.image} alt="" fill sizes="(max-width: 900px) 100vw, 48vw" loading="lazy" /></div>
              </div>
            ))}
            <div className="servicesVisual__caption"><span>{String(activeService + 1).padStart(2, '0')}</span><p>{services[activeService].title}</p></div>
          </div>
        </aside>

        <div className="servicesList">
          {services.map((service, index) => (
            <button
              className={`serviceRow${activeService === index ? ' serviceRow--active' : ''}`}
              type="button"
              key={service.title}
              onMouseEnter={() => scheduleActive(index, 75)}
              onMouseLeave={() => scheduleActive(activeFromScroll.current, 85)}
              onFocus={() => scheduleActive(index, 0)}
              data-cursor="view"
              aria-label={`${service.title}: ${service.description}`}
            >
              <span className="serviceRow__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="serviceRow__content"><strong>{service.title}</strong><span>{service.description}</span></span>
              <span className="serviceRow__rule" aria-hidden="true" />
              <span className="serviceRow__mobileImage">
                <Image src={service.image} alt={service.alt} fill sizes="100vw" loading="lazy" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
