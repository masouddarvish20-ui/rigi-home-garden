import SiteHeader from '@/components/SiteHeader';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';

export const metadata = { title: 'Contact RIGI | Home & Garden Design', description: 'Start a construction or remodeling inquiry with RIGI Home & Garden Design in Orange County, California.' };

export default function ContactPage() {
  return <main className="contactPage"><SiteHeader /><ContactSection /><SiteFooter /></main>;
}
