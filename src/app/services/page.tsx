'use client';
import { useState } from 'react';
import Link from 'next/link';

const services = [
  { id: 'counseling', icon: '🎓', title: 'Free Study Abroad Counseling', desc: 'Our expert counselors will sit with you (or your family) to understand your academic background, career goals, financial situation, and personal preferences. We then create a completely personalized study plan — at zero cost to you.', highlights: ['1-on-1 counselor session', 'University shortlisting', 'Course recommendation', 'Budget planning', '100% free, no obligation'] },
  { id: 'admission', icon: '📋', title: 'University Admission Support', desc: 'The application process can be overwhelming — multiple forms, deadlines, and document requirements. Our team handles it all, from preparing your statement of purpose (SOP) to submitting applications to multiple universities simultaneously.', highlights: ['SOP & personal statement writing', 'Application form assistance', 'Deadline management', 'Multiple university applications', 'Follow-up with admissions offices'] },
  { id: 'visa', icon: '🛂', title: 'Visa Processing Assistance', desc: 'Visa rejection is the biggest fear for Bangladeshi students and their families. Our 98% visa approval rate comes from thorough preparation — we check every document, coach you for interviews, and submit only when everything is perfect.', highlights: ['Document checklist & verification', 'Bank statement guidance', 'Visa application filling', 'Embassy interview coaching', '98% approval rate'] },
  { id: 'scholarship', icon: '🏆', title: 'Scholarship Guidance', desc: 'Many students don\'t realize how many scholarships are available to them. We actively search for merit scholarships, government grants, and university-specific bursaries that match your profile — and help you apply for them.', highlights: ['Scholarship matching', 'Application writing', 'University merit scholarships', 'Government grant guidance', 'Financial aid counseling'] },
  { id: 'departure', icon: '🧳', title: 'Pre-Departure Briefing', desc: 'Before you fly, we run a comprehensive orientation covering everything you need to know about life in your destination country — cultural norms, campus life, safety, banking, SIM cards, and more.', highlights: ['Culture & lifestyle briefing', 'Banking & SIM setup guide', 'Campus navigation', 'Safety & emergency contacts', 'Family assurance session'] },
  { id: 'documents', icon: '📄', title: 'Document Preparation', desc: 'From certificate attestation to police clearance certificates — every document has specific requirements. Our team ensures each document is perfectly prepared, authenticated, and ready for submission.', highlights: ['Certificate attestation', 'Police clearance', 'Bank statements', 'Medical certificates', 'Academic transcripts'] },
  { id: 'flight', icon: '✈️', title: 'Flight Ticket Support', desc: 'We help students find the best flight options at student-friendly prices. We\'ll advise on luggage allowances, transit points, and what to bring — making your first international flight stress-free.', highlights: ['Best fare search', 'Luggage allowance guidance', 'Transit advice', 'Packing checklist', 'Travel insurance guidance'] },
  { id: 'accommodation', icon: '🛏️', title: 'Accommodation Support', desc: 'Finding safe, affordable housing near your campus is crucial. We have partnerships with student accommodation providers and can arrange campus dormitories, private rooms, or shared apartments.', highlights: ['Campus dormitory booking', 'Private apartment options', 'Safety verification', 'Location & transport check', 'Pre-arrival confirmation'] },
  { id: 'airport', icon: '🏠', title: 'Airport Pickup & Welcome', desc: 'Arriving in a new country alone can be nerve-wracking. Our local representatives will be at the airport to receive you, take you to your accommodation, help you settle in, and ensure you\'re comfortable on day one.', highlights: ['Airport pickup service', 'Accommodation check-in', 'Local SIM card setup', 'Campus orientation tour', 'Emergency contact numbers'] },
  { id: 'post-arrival', icon: '🌐', title: 'Post-Arrival Support', desc: 'Our relationship doesn\'t end when you land. We continue to support you throughout your studies — whether it\'s visa renewal, university issues, accommodation changes, or just needing someone to talk to.', highlights: ['Student visa renewal', 'University issue support', 'Career guidance', 'Ongoing counseling', '24/7 emergency helpline'] },
];

const faqs = [
  { q: 'How much does EduSpark charge for its services?', a: 'Our initial consultation and counseling is completely free. For full application support, visa processing, and other services, we charge a transparent one-time service fee that is clearly discussed upfront — no hidden charges ever.' },
  { q: 'How long does the entire process take from consultation to visa?', a: 'Typically 2–4 months for Malaysia applications, and 4–8 months for UK/USA/Australia. We help you plan your timeline based on intake dates and visa processing times.' },
  { q: 'What if my visa gets rejected?', a: 'With proper preparation, visa rejections are rare with EduSpark (98% approval rate). In the rare case of rejection, we analyze the reasons and re-apply at no extra charge, or help you appeal the decision.' },
  { q: 'Can EduSpark help students with low CGPA?', a: 'Absolutely. Malaysia has many pathways — foundation programs, diplomas, and conditional offers — that don\'t require top grades. We\'ll find the right entry point for your academic background.' },
  { q: 'Do you help with accommodation in Malaysia and other countries?', a: 'Yes. We have partnerships with student housing providers near most of our partner universities. We can arrange dormitories, shared apartments, or private rooms based on your budget.' },
  { q: 'Is my application information kept confidential?', a: 'Yes, completely. All your personal information, documents, and financial details are handled with strict confidentiality and never shared with third parties without your consent.' },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Complete Support</div>
          <h1>Our Services</h1>
          <p>From the moment you contact us to the day you settle into campus life — we handle everything.</p>
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">10 Services, One Trusted Partner</h2>
            <p className="section-sub">Comprehensive end-to-end support so you never feel lost on your journey abroad.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {services.map((s, i) => (
              <div key={s.id} id={s.id} style={{
                background: 'var(--off)', border: '1.5px solid var(--border)',
                borderRadius: '20px', padding: '36px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--blue-light), #c8d9f5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Service {String(i + 1).padStart(2, '0')}</div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--blue)', fontWeight: 700 }}>{s.title}</h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--gray)', lineHeight: 1.75, fontSize: '0.9rem' }}>{s.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>What's included:</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.87rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--orange)', fontSize: '1rem', flexShrink: 0 }}>✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--off)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head center">
            <div className="section-tag">Got Questions?</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Book your free consultation today — no commitment required.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Free Consultation</Link>
            <Link href="/about" className="btn-outline-w">👥 Meet Our Team</Link>
          </div>
        </div>
      </div>
    </>
  );
}
