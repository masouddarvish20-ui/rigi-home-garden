'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { promotedProjects } from '@/data/projects';
import RevealHeading from '@/components/RevealHeading';

function getVerifiedProject(id: string) {
  const project = promotedProjects.find((candidate) => candidate.id === id);
  if (!project) throw new Error(`Required verified homepage project ${id} is missing.`);
  return project;
}

const de01 = getVerifiedProject('DE-01');
const dxb01 = getVerifiedProject('DXB-01');

const homepageFeatures = [
  { project: de01, image: '/images/homepage/rigi-home-03.jpg', alt: 'Completed exterior renovation from the verified DE-01 project archive' },
  { project: de01, image: '/images/homepage/rigi-home-01.jpg', alt: 'Completed interior stair and finish work from the verified DE-01 project archive' },
  { project: dxb01, image: '/images/homepage/rigi-home-04.jpg', alt: 'Completed KAM Car Vintage showroom exterior from the verified DXB-01 project archive' },
];

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      if (reducedMotion) return;

      gsap.fromTo(
        '.portfolioIntro > *:not([data-reveal-heading])',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolioIntro', start: 'top 84%', toggleActions: 'play none none reverse' },
        },
      );

      gsap.utils.toArray<HTMLElement>('.portfolioStory').forEach((story) => {
        const media = story.querySelectorAll<HTMLElement>('.portfolioStory__media');
        const images = story.querySelectorAll<HTMLElement>('.portfolioStory__image');
        const copy = story.querySelectorAll<HTMLElement>('.portfolioStory__copy > *:not([data-reveal-heading])');

        gsap.fromTo(
          media,
          { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0.15 },
          {
            clipPath: 'inset(0 0 0% 0)', autoAlpha: 1, duration: 1.35, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: story, start: 'top 86%', toggleActions: 'play none none reverse' },
          },
        );
        gsap.fromTo(
          copy,
          { autoAlpha: 0, y: mobile ? 20 : 32 },
          {
            autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: story, start: 'top 72%', toggleActions: 'play none none reverse' },
          },
        );

        if (!mobile) {
          gsap.fromTo(
            images,
            { yPercent: -4 },
            {
              yPercent: 4, ease: 'none',
              scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true },
            },
          );
        }
      });

      gsap.fromTo(
        '.portfolioSupporting__item',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolioSupporting', start: 'top 88%', toggleActions: 'play none none reverse' },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="portfolio" id="projects" aria-labelledby="portfolio-title">
      <div className="portfolioIntro">
        <p className="eyebrow eyebrow--line" data-gold-line>SELECTED PROJECTS</p>
        <RevealHeading id="portfolio-title" text={'Featured Work.'} depth />
        <p className="portfolioIntro__lede">A concise preview of completed residential and commercial work. Explore each project for the full documented process.</p>
        <div className="portfolioIntro__index" aria-label="Portfolio summary">
          <span><strong>03</strong> Primary images</span>
          <span><strong>02</strong> Supporting images</span>
          <span><strong>02</strong> Verified projects</span>
        </div>
      </div>

      <div className="portfolioStories">
        {homepageFeatures.map(({ project, image, alt }, index) => (
          <article className={`portfolioStory portfolioStory--${index + 1}`} key={`${project.id}-${image}`}>
            <Link className="portfolioStory__media portfolioStory__media--primary" href={project.detailPath} aria-label={`Explore ${project.name}`} data-cursor="view" data-pointer-depth>
              <span className="portfolioStory__image"><Image src={image} alt={alt} fill priority={index === 0} sizes={index === 0 ? '100vw' : '(max-width: 760px) 100vw, 68vw'} /></span>
              <span className="portfolioStory__number">{String(index + 1).padStart(2, '0')}</span>
            </Link>
            <div className="portfolioStory__copy">
              <p className="portfolioStory__overline eyebrow--line" data-gold-line>{project.id} · {project.location} · {project.category}</p>
              <RevealHeading as="h3" text={project.name} />
              <p className="portfolioStory__description">{project.description}</p>
              <div className="portfolioStory__facts">
                <span>{project.photoCount} photographs</span>
                <span>Before · During · After</span>
              </div>
              <Link className="portfolioStory__explore" href={project.detailPath} data-cursor="link" data-magnetic>Explore Project <span className="linkArrow" aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>

      <div className="portfolioSupporting" aria-label="Additional approved RIGI imagery">
        <Link className="portfolioSupporting__item portfolioSupporting__item--verified" href={de01.detailPath} aria-label={`Explore ${de01.name}`} data-cursor="view">
          <Image src="/images/homepage/rigi-home-02.jpg" alt="Completed kitchen from the verified DE-01 project archive" fill sizes="(max-width: 760px) 100vw, 34vw" />
          <span>DE-01 · VERIFIED PROJECT DETAIL</span>
        </Link>
        <figure className="portfolioSupporting__item portfolioSupporting__item--atmosphere">
          <Image src="/images/homepage/rigi-home-05.jpg" alt="Approved RIGI construction atmosphere at golden hour" fill sizes="(max-width: 760px) 100vw, 48vw" />
        </figure>
      </div>
    </section>
  );
}
