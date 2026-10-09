'use client';

import { FormEvent, useState } from 'react';

const projectTypes = [
  'Custom Construction',
  'Remodeling',
  'Outdoor Living',
  'Landscape & Hardscape',
  'Interior Renovation',
  'Residential Improvements',
  'Commercial Improvements',
  'Other',
];

const startTimes = ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'More than 6 months', 'Still exploring'];
const contactMethods = ['Email', 'Phone', 'WhatsApp'];
const whatsAppHref = 'https://wa.me/14242888889?text=Hello%2C%20I%E2%80%99m%20interested%20in%20discussing%20a%20construction%20or%20remodeling%20project%20with%20RIGI%20Home%20%26%20Garden%20Design.';

export default function ContactSection() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = [
      ['Full Name', 'fullName'], ['Email', 'email'], ['Phone', 'phone'], ['Project Location', 'location'],
      ['Project Type', 'projectType'], ['Budget Range', 'budget'], ['Preferred Start Time', 'startTime'],
      ['Preferred Contact Method', 'contactMethod'], ['Project Description', 'description'],
    ] as const;
    const body = fields.map(([label, key]) => `${label}: ${String(formData.get(key) ?? '').trim()}`).join('\n');
    const subject = `Project inquiry from ${String(formData.get('fullName') ?? '').trim()}`;
    const mailto = `mailto:info@rigihomeandgardendesign.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus('Your default email app should open with the inquiry prepared. This website does not send or store the form. If no email app opens, email info@rigihomeandgardendesign.com directly.');
  };

  return (
    <section className="contactSection" id="contact" aria-labelledby="contact-title">
      <div className="contactSection__intro">
        <p className="eyebrow eyebrow--line" data-gold-line>CONTACT RIGI</p>
        <h2 id="contact-title">Let’s discuss your project.</h2>
        <p>Tell us a little about what you’re planning. We’ll use your preferred contact method to follow up.</p>
        <div className="contactSection__details" aria-label="Verified RIGI contact information">
          <a href="tel:+14242888889"><span>Phone</span>424-288-8889</a>
          <a href="mailto:info@rigihomeandgardendesign.com"><span>Email</span>info@rigihomeandgardendesign.com</a>
          <p><span>Service region</span>Orange County, California</p>
          <p><span>CA Lic. #1161845</span>Licensed · Bonded · Insured</p>
        </div>
        <div className="contactSection__connect">
          <p className="eyebrow">CONNECT WITH RIGI</p>
          <a href={whatsAppHref} target="_blank" rel="noreferrer" aria-label="Start a WhatsApp conversation with RIGI">WhatsApp <span aria-hidden="true">↗</span></a>
          <a href="tel:+14242888889">Call <span aria-hidden="true">↗</span></a>
          <a href="mailto:info@rigihomeandgardendesign.com">Email <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="contactForm__grid">
          <label>Full Name<input name="fullName" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>Project Location<input name="location" autoComplete="address-level2" placeholder="City or area" required /></label>
          <label>Project Type<select name="projectType" defaultValue="" required><option value="" disabled>Select a project type</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label>Budget Range<select name="budget" defaultValue="" required><option value="" disabled>Select a range</option><option>Under $25,000</option><option>$25,000–$75,000</option><option>$75,000–$150,000</option><option>$150,000–$300,000</option><option>$300,000+</option><option>Not sure yet</option></select></label>
          <label>Preferred Start Time<select name="startTime" defaultValue="" required><option value="" disabled>Select timing</option>{startTimes.map((time) => <option key={time}>{time}</option>)}</select></label>
          <label>Preferred Contact Method<select name="contactMethod" defaultValue="Email" required>{contactMethods.map((method) => <option key={method}>{method}</option>)}</select></label>
          <label className="contactForm__message">Project Description<textarea name="description" rows={5} required placeholder="What would you like to build, improve, or transform?" /></label>
        </div>
        <button className="contactForm__submit" type="submit">Submit Project Inquiry <span aria-hidden="true">→</span></button>
        <p className="contactForm__note">Submitting opens a pre-filled email in your email app. Your information is not transmitted to or stored by this website.</p>
        {status && <p className="contactForm__status" role="status">{status}</p>}
      </form>
    </section>
  );
}
