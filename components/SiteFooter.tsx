import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteFooter__identity">
        <Link className="siteFooter__brand" href="/">RIGI</Link>
        <p>RIGI Home &amp; Garden Design LLC<br />Building &amp; Remodeling<br />Orange County, CA</p>
        <p>CA Lic. #1161845<br />Licensed · Bonded · Insured</p>
      </div>
      <div className="siteFooter__contact">
        <a href="tel:+14242888889">424-288-8889</a>
        <a href="mailto:info@rigihomeandgardendesign.com">info@rigihomeandgardendesign.com</a>
        <a href="https://wa.me/14242888889?text=Hello%2C%20I%E2%80%99m%20interested%20in%20discussing%20a%20construction%20or%20remodeling%20project%20with%20RIGI%20Home%20%26%20Garden%20Design." target="_blank" rel="noreferrer">WhatsApp ↗</a>
      </div>
      <nav className="siteFooter__nav" aria-label="Footer navigation">
        <Link href="/projects">Projects</Link><Link href="/#services">Services</Link><Link href="/#about">About</Link><Link href="/contact">Contact</Link>
      </nav>
      <small className="siteFooter__copyright">© {new Date().getFullYear()} RIGI Home &amp; Garden Design LLC</small>
    </footer>
  );
}
