'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`siteHeader${scrolled || menuOpen ? ' siteHeader--solid' : ''}`}>
      <div className="siteHeader__inner">
        <a className="siteHeader__brand" href="#top" aria-label="RIGI Home & Garden Design home">
          <Image
            className="siteHeader__logo"
            src="/brand/rigi-logo-gold-transparent.png"
            alt="RIGI Home & Garden Design LLC"
            width={1254}
            height={1254}
            priority
          />
        </a>

        <nav className="siteHeader__desktopNav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} data-cursor="link">{item.label}</a>
          ))}
        </nav>

        <a className="siteHeader__cta" href="#contact" data-cursor="start" data-magnetic>Start Your Project</a>

        <button
          className="siteHeader__menuButton"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`siteHeader__mobilePanel${menuOpen ? ' siteHeader__mobilePanel--open' : ''}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="siteHeader__mobileCta" href="#contact" onClick={closeMenu}>
            Start Your Project
          </a>
        </nav>
      </div>
    </header>
  );
}
