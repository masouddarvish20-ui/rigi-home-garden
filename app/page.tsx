import SiteHeader from '@/components/SiteHeader';
import ScrollBuildHero from '@/components/ScrollBuildHero';
import SelectedProjects from '@/components/SelectedProjects';
import RevealHeading from '@/components/RevealHeading';
import ServicesSection from '@/components/ServicesSection';
import WhyRigiSection from '@/components/WhyRigiSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <ScrollBuildHero />
      <section className="afterHero" data-section-reveal>
        <span className="anchorTarget" id="about" />
        <span className="anchorTarget" id="contact" />
        <p className="eyebrow eyebrow--line" data-gold-line>RIGI HOME &amp; GARDEN DESIGN LLC</p>
        <RevealHeading text="We build more than homes." depth />
        <p>Custom Construction · Remodeling · Outdoor Living</p>
      </section>
      <SelectedProjects />
      <ServicesSection />
      <WhyRigiSection />
      <BeforeAfterSection />
    </main>
  );
}
