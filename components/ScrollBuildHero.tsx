'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 301;
const FINAL_HOLD_DURATION = 0.1;
const frameSrc = (i: number) =>
  `/frames/rigi/frame_${String(i + 1).padStart(3, '0')}.webp?v=approved2`;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;

  if (ir > cr) {
    dh = h;
    dw = h * ir;
    dx = (w - dw) / 2;
    dy = 0;
  } else {
    dw = w;
    dh = w / ir;
    dx = 0;
    dy = (h - dh) / 2;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, dx, dy, dw, dh);
}

export default function ScrollBuildHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ value: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = frameSrc(i);
      img.onload = () => {
        loaded += 1;
        if (!cancelled && loaded === FRAME_COUNT) setReady(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !sectionRef.current || !canvasRef.current) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const img = imagesRef.current[Math.round(frameRef.current.value)];
      if (img?.complete) drawCover(ctx, img, canvas.width, canvas.height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      render();
    };

    resize();
    addEventListener('resize', resize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=620%',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      frameRef.current,
      {
        value: FRAME_COUNT - 1,
        ease: 'none',
        duration: 1,
        onUpdate: render,
      },
      0,
    )
      // Opening brand remains visible through the cloud descent and fades near the lot.
      .to('.heroCopy--brand', { autoAlpha: 0, y: -18, duration: 0.08 }, 0.22)
      // Minimal mid-story copy only.
      .fromTo(
        '.heroCopy--vision',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.06 },
        0.36,
      )
      .to('.heroCopy--vision', { autoAlpha: 0, y: -14, duration: 0.05 }, 0.47)
      .fromTo(
        '.heroCopy--build',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.06 },
        0.57,
      )
      .to('.heroCopy--build', { autoAlpha: 0, y: -14, duration: 0.05 }, 0.70)
      // Final brand returns only when the completed home is on screen.
      .fromTo(
        '.heroCopy--final',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.09 },
        0.88,
      )
      .to('.scrollHint', { autoAlpha: 0, duration: 0.05 }, 0.91);

    // Hold the completed home for roughly one second of source-video time.
    tl.to(
      frameRef.current,
      {
        value: FRAME_COUNT - 1,
        ease: 'none',
        duration: FINAL_HOLD_DURATION,
        onUpdate: render,
      },
      1,
    );

    render();

    return () => {
      removeEventListener('resize', resize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [ready]);

  return (
    <section ref={sectionRef} className="scrollHero">
      <canvas ref={canvasRef} className="scrollHero__canvas" />
      <div className="scrollHero__shade" />

      {!ready && <div className="scrollHero__loader">Loading experience…</div>}

      <div className="heroCopy heroCopy--brand">
        <span>ORANGE COUNTY, CALIFORNIA</span>
        <h1>RIGI Home &amp; Garden Design</h1>
        <p>Building &amp; Remodeling · Licensed General Contractor · Class B</p>
      </div>

      <div className="heroCopy heroCopy--vision">
        <span>FROM EMPTY LOT TO HOME</span>
        <h2>Every great home starts with a vision.</h2>
      </div>

      <div className="heroCopy heroCopy--build">
        <span>RIGI HOME &amp; GARDEN DESIGN</span>
        <h2>Built from the ground up.</h2>
      </div>

      <div className="heroCopy heroCopy--final">
        <span>ORANGE COUNTY, CALIFORNIA</span>
        <h2>RIGI Home &amp; Garden Design</h2>
        <p>Building &amp; Remodeling · Licensed General Contractor · Class B</p>
        <div className="heroActions">
          <a href="#projects" className="button button--solid">View Our Projects</a>
          <a href="#contact" className="button button--ghost">Start Your Project</a>
        </div>
      </div>

      <div className="scrollHint"><span />Scroll to build</div>
    </section>
  );
}
