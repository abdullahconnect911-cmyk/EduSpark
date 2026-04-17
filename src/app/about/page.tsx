import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – EduSpark International Study',
  description: 'Learn about EduSpark International Study — our mission, team, and commitment to Bangladeshi students.',
};

const team = [
  { name: 'Abdullah Al Mamun', role: 'Founder & CEO', init: 'A', desc: 'Education consultant with 10+ years placing students in Malaysian universities.' },
  { name: 'Fatima Khatun', role: 'Head of Counseling', init: 'F', desc: 'Expert guidance for undergraduate and postgraduate admissions.' },
  { name: 'Arif Hossain', role: 'Visa Specialist', init: 'A', desc: '98% visa success rate over 8 years of student visa processing.' },
  { name: 'Nusrat Jahan', role: 'Student Relations', init: 'N', desc: 'Dedicated support from application to arrival and beyond.' },
];

const values = [
  { icon: '🎯', title: 'Student-First Approach', desc: 'Every decision we make is guided by what is best for the student — not what is most profitable for us.' },
  { icon: '🔒', title: 'Trust & Transparency', desc: 'No hidden fees. No fake promises. We tell you exactly what to expect at every stage of your journey.' },
  { icon: '🌍', title: 'Global Perspective', desc: 'We think beyond Bangladesh borders to open doors to genuine world-class education opportunities.' },
  { icon: '❤️', title: 'Family Partnership', desc: 'We understand Bangladeshi family values and involve parents as partners throughout the entire process.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Our Story</div>
          <h1>About EduSpark</h1>
          <p>We started with one mission: make global education accessible, affordable, and stress-free for every Bangladeshi student.</p>
        </div>
      </div>

      {/* MISSION */}
      <section style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="section-title">Empowering Every Student's Global Dream</h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '20px', fontSize: '0.96rem' }}>
                EduSpark International Study was founded with a clear purpose: to bridge the gap between ambitious Bangladeshi students and world-class educational institutions — starting from Malaysia and expanding worldwide.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '20px', fontSize: '0.96rem' }}>
                We saw too many talented students fall victim to fake agents, wrong university choices, visa rejections, and financial traps. EduSpark was built to be the antidote — honest, transparent, and genuinely student-centered.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: '0.96rem' }}>
                Today, with 500+ students successfully placed across 12 countries, we continue our mission with the same passion that started it all.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, var(--blue), var(--blue-mid))',
              borderRadius: '24px', padding: '48px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,122,0,0.2) 0%, transparent 50%)' }} />
              <blockquote style={{
                fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff',
                fontStyle: 'italic', lineHeight: 1.4, marginBottom: '24px', position: 'relative', zIndex: 1,
              }}>
                "Empowering students from Bangladesh to access global education opportunities through a seamless, guided, and trustworthy journey."
              </blockquote>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', position: 'relative', zIndex: 1 }}>
                — EduSpark Mission Statement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* VALUES */}
      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-sub">These principles guide every interaction, every recommendation, and every decision we make.</p>
          </div>
          <div className="svc-grid">
            {values.map((v, i) => (
              <div key={i} className="svc-card">
                <div className="svc-icon"><span>{v.icon}</span></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">Our People</div>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-sub">Experienced professionals who genuinely care about your success.</p>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-av">{m.init}</div>
                <h4>{m.name}</h4>
                <div className="team-role">{m.role}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '10px', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join 500+ students who trusted EduSpark to guide their global education journey.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Consultation</Link>
            <Link href="/services" className="btn-outline-w">🔍 See Our Services</Link>
          </div>
        </div>
      </div>
    </>
  );
}
