import Link from 'next/link';
import HeroSection from '@/components/public/HeroSection';
import UniversityTicker from '@/components/public/UniversityTicker';

const services = [
  { icon: '🎓', title: 'Free Study Abroad Counseling', desc: 'Expert guidance tailored to your academic profile, career ambitions, and financial plan — completely free.', href: '/services#counseling' },
  { icon: '📋', title: 'University Admission Support', desc: 'End-to-end admission assistance to secure your place at top universities with confidence.', href: '/services#admission' },
  { icon: '🛂', title: 'Visa Processing Assistance', desc: 'Professional visa support to ensure a smooth and successful approval process.', href: '/services#visa' },
  { icon: '🏆', title: 'Scholarship Guidance', desc: 'Maximize your chances of studying abroad with financial support and funding opportunities.', href: '/services#scholarship' },
  { icon: '🛏️', title: 'Accommodation Support', desc: 'Safe, reliable, and convenient housing options tailored to your needs and budget.', href: '/services#accommodation' },
  { icon: '✈️', title: 'Flight Ticket Support', desc: 'Smart travel solutions designed specifically for international students departing Bangladesh.', href: '/services#flight' },
  { icon: '🏠', title: 'Airport Pickup & Welcome', desc: 'A smooth and stress-free arrival experience in your new destination country.', href: '/services#airport' },
  { icon: '📄', title: 'Document Preparation', desc: 'We ensure every required document is perfectly prepared, verified, and submitted on time.', href: '/services#documents' },
  { icon: '🌐', title: 'Post-Arrival Support', desc: 'Ongoing support even after you land — orientation, SIM cards, bank accounts, and more.', href: '/services#post-arrival' },
];

const testimonials = [
  { name: 'Rahim Uddin', course: 'BSc Computer Science, APU Malaysia', text: 'EduSpark made the entire process effortless. From university selection to visa approval — they were with me at every step. I\'m now studying at APU and couldn\'t be happier!', init: 'R' },
  { name: 'Nadia Islam', course: 'MBA, Taylor\'s University Malaysia', text: 'I was worried about the visa process but EduSpark handled everything professionally. My visa was approved in 3 weeks. The team is incredibly responsive and caring.', init: 'N' },
  { name: 'Karim Hassan', course: 'Engineering, Sunway University', text: 'They found me a partial scholarship I didn\'t even know existed! EduSpark saved me thousands of dollars and guided me through everything with patience and expertise.', init: 'K' },
  { name: 'Sadia Rahman', course: 'Medicine, AIMST University', text: 'The team at EduSpark truly understands the challenges Bangladeshi students face. They were available 24/7 and never left me confused. Highly recommend!', init: 'S' },
  { name: 'Farhan Ahmed', course: 'Data Science, Multimedia University', text: 'Professional, honest, and genuinely caring. EduSpark helped me find a university that matched my grades AND my budget. Dream come true!', init: 'F' },
  { name: 'Mitu Begum', course: 'Pharmacy, UCSI University', text: 'My parents were skeptical but EduSpark built trust step by step. Transparent fees, clear timelines, and zero hidden charges. My family is so proud now!', init: 'M' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UniversityTicker />

      {/* SERVICES */}
      <section style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">How We Help You</h2>
            <p className="section-sub">Comprehensive end-to-end support from first consultation to arriving at your campus abroad.</p>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <Link key={i} href={s.href} className="svc-card">
                <div className="svc-icon"><span>{s.icon}</span></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-row">
          {[
            { num: '500+', lbl: 'Students Placed' },
            { num: '20+', lbl: 'Partner Universities' },
            { num: '12', lbl: 'Countries Covered' },
            { num: '98%', lbl: 'Visa Success Rate' },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHY EDUSPARK */}
      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="section-head">
                <div className="section-tag">Why Choose Us</div>
                <h2 className="section-title">We Go Beyond Consultancy</h2>
                <p className="section-sub">EduSpark isn't just an agency — we're your personal education partner from Bangladesh to the world.</p>
              </div>
              <div className="why-points">
                {[
                  { icon: '🎯', title: 'Personalized Guidance', desc: 'Every student is unique. We create a custom roadmap matching your grades, goals, and budget.' },
                  { icon: '💰', title: 'Zero Hidden Fees', desc: 'Complete transparency in pricing. No surprises — you know exactly what you\'re paying for.' },
                  { icon: '📊', title: 'Proven Track Record', desc: '500+ students successfully placed with a 98% visa approval rate across 12 countries.' },
                  { icon: '🌐', title: 'Strong Global Network', desc: 'Official partner with 20+ top universities across Malaysia plus growing international partnerships.' },
                  { icon: '🤝', title: 'Family Trust Builder', desc: 'We include parents in every step. Transparent process, regular updates, zero guesswork.' },
                ].map((pt, i) => (
                  <div key={i} className="why-pt">
                    <div className="why-ic">{pt.icon}</div>
                    <div className="why-txt">
                      <h4>{pt.title}</h4>
                      <p>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-visual">
              <div className="why-badge-card">
                <h4>🏛️ Official University Partner</h4>
                <p>Recognized by 20+ top Malaysian universities — your application gets priority attention and faster processing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="container">
          <div className="section-head center">
            <div className="section-tag" style={{ background: 'rgba(255,122,0,.18)', color: '#ffb366' }}>How It Works</div>
            <h2 className="section-title">Your Journey in 4 Simple Steps</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>We make studying abroad clear, simple, and stress-free from start to finish.</p>
          </div>
          <div className="process-steps">
            {[
              { num: '01', icon: '💬', title: 'Free Consultation', desc: 'Discuss your goals, budget & qualifications with our expert counselors.' },
              { num: '02', icon: '📝', title: 'Application', desc: 'We prepare & submit your complete university application package.' },
              { num: '03', icon: '🛂', title: 'Visa Processing', desc: 'Full student visa guidance with document preparation & submission.' },
              { num: '04', icon: '✈️', title: 'Travel & Settle', desc: 'Airport pickup, accommodation & full orientation support on arrival.' },
            ].map((step, i) => (
              <div key={i} className="ps">
                <div className="ps-circle">
                  <span className="ps-num">{step.num}</span>
                  <span>{step.icon}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">Success Stories</div>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-sub">Real experiences from students who trusted EduSpark with their future.</p>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-av">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-course">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <h2>Start Your Study Abroad Journey Today</h2>
          <p>Get a free, no-obligation consultation with our expert team.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Consultation</Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '8801867778759'}`} target="_blank" rel="noopener noreferrer" className="btn-outline-w">💬 WhatsApp Us Now</a>
          </div>
        </div>
      </div>
    </>
  );
}
