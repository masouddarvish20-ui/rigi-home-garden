'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { GalleryPhase } from '@/lib/projectAssets';
import RevealHeading from '@/components/RevealHeading';

type LightboxImage = { src: string; label: string; index: number };

export default function ProjectGallery({ phases, projectName }: { phases: GalleryPhase[]; projectName: string }) {
  const images = useMemo(() => phases.flatMap((phase) => phase.images.map((src) => ({ src, label: phase.label }))), [phases]);
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') {
        const next = (activeImage.index + 1) % images.length;
        setActiveImage({ ...images[next], index: next });
      }
      if (event.key === 'ArrowLeft') {
        const previous = (activeImage.index - 1 + images.length) % images.length;
        setActiveImage({ ...images[previous], index: previous });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeImage, images]);

  const openImage = (src: string, label: string) => {
    const index = images.findIndex((image) => image.src === src);
    setActiveImage({ src, label, index });
  };

  const move = (direction: -1 | 1) => {
    if (!activeImage) return;
    const index = (activeImage.index + direction + images.length) % images.length;
    setActiveImage({ ...images[index], index });
  };

  return (
    <>
      <nav className="projectPhaseNav" aria-label="Project gallery phases">
        {phases.map((phase) => <a href={`#phase-${phase.key}`} key={phase.key}>{phase.label}<span>{String(phase.images.length).padStart(2, '0')}</span></a>)}
      </nav>
      <div className="projectArchive">
        {phases.map((phase) => (
          <section className="projectPhase" id={`phase-${phase.key}`} key={phase.key}>
            <header className="projectPhase__header">
              <p className="eyebrow--line" data-gold-line>{phase.label}</p><RevealHeading text={phase.description} /><span>{phase.images.length} photographs</span>
            </header>
            <div className="projectMasonry">
              {phase.images.map((src, index) => (
                <button className={`projectMasonry__item projectMasonry__item--${index % 7}`} type="button" onClick={() => openImage(src, phase.label)} key={src} aria-label={`Open ${phase.label.toLowerCase()} photograph ${index + 1}`} data-cursor="open">
                  <Image src={src} alt={`${projectName} — ${phase.label.toLowerCase()} ${index + 1}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      {activeImage && (
        <div className="projectLightbox" role="dialog" aria-modal="true" aria-label={`${projectName} image viewer`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
          <button className="projectLightbox__close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image viewer" data-cursor="link">Close</button>
          <button className="projectLightbox__arrow projectLightbox__arrow--previous" type="button" onClick={() => move(-1)} aria-label="Previous image" data-cursor="drag">←</button>
          <div className="projectLightbox__image"><Image src={activeImage.src} alt={`${projectName} — ${activeImage.label}`} fill sizes="100vw" priority /></div>
          <p>{activeImage.label} · {activeImage.index + 1} / {images.length}</p>
          <button className="projectLightbox__arrow projectLightbox__arrow--next" type="button" onClick={() => move(1)} aria-label="Next image" data-cursor="drag">→</button>
        </div>
      )}
    </>
  );
}
