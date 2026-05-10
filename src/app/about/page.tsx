'use client';
import Link from 'next/link';

const stats = [
  { num: '500+', lbl: 'Students Placed' },
  { num: '20', lbl: 'Partner Universities' },
  { num: '12', lbl: 'Countries Covered' },
  { num: '100+', lbl: '% Visa Success Rate' },
];

const whyPoints = [
  { icon: '✅', title: 'Trusted by 500+ Families', desc: 'Hundreds of successfully placed students. Families trust us with one of life\'s most important decisions.' },
  { icon: '🎯', title: '100% Personalised Guidance', desc: 'Every student is unique. We tailor our advice for your specific goals, qualifications, and budget.' },
  { icon: '🔄', title: 'End-to-End Support', desc: 'From the first consultation to arrival — we handle every detail and stay by your side.' },
  { icon: '🏛️', title: '20+ University Partners', desc: 'Official partner with 20+ top universities across Malaysia giving you access to growing networks and benefits.' },
  { icon: '💰', title: 'Zero Hidden Fees', desc: 'Completely transparent — you\'ll always know exactly what you\'re paying for and why.' },
];

const missionVision = [
  { icon: '🎯', title: 'Our Mission', desc: 'To provide every aspiring Bangladeshi student with transparency, personalised, and effective guidance to access top-tier international education — removing every barrier from application to arrival.' },
  { icon: '🔭', title: 'Our Vision', desc: 'To become the most trusted education consultancy in Bangladesh — a name synonymous with life-changing opportunities, student success, and genuine care for every individual we serve.' },
  { icon: '💎', title: 'Our Values', desc: 'Integrity, transparency, and student-first thinking guide every decision. We never recommend a path unless we genuinely believe it\'s the best option for that student\'s future.' },
  { icon: '🤝', title: 'Our Commitment', desc: 'We stay with you after enrolment. Our alumni network, peer-to-peer support, and ongoing guidance ensure your transition to university life is smooth and successful.' },
];

const leaders = [
  {
    name: 'Engr. Imtiaz Ahmed',
    role: 'Chairman & Strategic Advisor',
    roleColor: '#e65100',
    init: 'IA',
    bg: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    desc: 'Engr. Imtiaz Ahmed provides strategic leadership and long-term vision for EduSpark International Study. Currently completing his final year in electrical & electronic engineering (BEE) at Asia Pacific University (APU), Malaysia, he brings strong analytical insight and technical expertise to the organisation.',
  },
  {
    name: 'Abdullah',
    role: 'Founder & Managing Director',
    roleColor: '#e65100',
    init: 'AB',
    bg: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
    desc: 'Abdullah, Founder & Managing Director of EduSpark, leads the company\'s overall operations, partnerships, and strategic planning. With years of experience in student counselling and international admissions, Abdullah ensures that every student receives personalised, transparent and reliable guidance.',
  },
];

const team = [
  { name: 'Mohammad Rahman', role: 'Founder & Head Counselor', init: 'M', color: '#5c6bc0', desc: 'Over a decade in education consultancy. Former international student at Universiti Malaya. Passionate about breaking barriers for Bangladeshi students.' },
  { name: 'Sadia Khatun', role: 'Senior Visa Counselor', init: 'S', color: '#e91e63', desc: 'Expert in student visa processing with an outstanding success rate. Over 500+ visa approvals under her guidance. Over 300+ visa approved under success 300+ applications.' },
  { name: 'Arif Hossain', role: 'University Admissions Specialist', init: 'A', color: '#43a047', desc: 'Dedicated to crafting winning application packages. Deep relationships with admissions offices at 20+ partner universities.' },
  { name: 'Tanvir Ahmed', role: 'Scholarship Coordinator', init: 'T', color: '#ff8f00', desc: 'Has helped students secure over $2M in scholarship funding. Every student has contribution to us. I never recommend a university unless I genuinely believe it\'s the best option.' },
  { name: 'Roksana Begum', role: 'Student Experience Manager', init: 'R', color: '#3f51b5', desc: 'Ensures every student feels supported and informed throughout. Has contributed to 800+ student welfare queries, available 24/7 for student welfare queries.' },
  { name: 'Nazmul Islam', role: 'Pre-Departure & Arrival Support', init: 'N', color: '#00897b', desc: 'Coordinates airport pickups, orientation programs, and first-week support for international students settling into new university life.' },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* HERO */
        .about-hero {
          background: linear-gradient(135deg, #0b3d91 0%, #1a56c4 60%, #0d47a1 100%);
          padding: 72px 0 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .about-hero h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #fff; font-family: var(--font-head); margin: 0 0 14px; }
        .about-hero p { font-size: 0.96rem; color: rgba(255,255,255,0.72); max-width: 460px; margin: 0 auto; line-height: 1.7; }

        /* WHO WE ARE */
        .about-who { background: #fff; padding: 80px 0; }
        .about-who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .about-badge-card { background: #f0f4ff; border: 1.5px solid #dce6f5; border-radius: 16px; padding: 20px 22px; display: flex; align-items: flex-start; gap: 14px; }
        .about-badge-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 2px; }
        .about-badge-title { font-size: 0.88rem; font-weight: 700; color: var(--blue); margin-bottom: 4px; }
        .about-badge-desc { font-size: 0.82rem; color: var(--gray); line-height: 1.6; }
        .about-visual {
          background: linear-gradient(135deg, #f0f4ff, #e8efff);
          border-radius: 24px; padding: 40px;
          display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 320px;
          border: 1.5px solid #dce6f5;
        }
        .about-grad-icon { font-size: 5rem; margin-bottom: 24px; filter: drop-shadow(0 8px 24px rgba(11,61,145,0.2)); }

        /* STATS */
        .about-stats { background: #fff; border-top: 1px solid #eef2fb; border-bottom: 1px solid #eef2fb; padding: 0; }
        .about-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); }
        .about-stat { text-align: center; padding: 32px 16px; border-right: 1px solid #eef2fb; transition: background 0.2s; }
        .about-stat:last-child { border-right: none; }
        .about-stat:hover { background: #f8faff; }
        .about-stat-num { display: block; font-size: 2.4rem; font-weight: 900; color: var(--blue); font-family: var(--font-head); line-height: 1; margin-bottom: 8px; }
        .about-stat-lbl { display: block; font-size: 0.78rem; color: var(--gray); font-weight: 500; }

        /* MISSION VISION */
        .about-mv { background: #f8faff; padding: 80px 0; }
        .about-mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .about-mv-card { background: #fff; border: 1.5px solid #dce6f5; border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; gap: 12px; transition: all 0.3s ease; }
        .about-mv-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(11,61,145,0.08); border-color: var(--blue); }
        .about-mv-icon { width: 48px; height: 48px; border-radius: 13px; background: linear-gradient(135deg, #e8efff, #d4e2ff); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
        .about-mv-title { font-size: 1rem; font-weight: 800; color: var(--blue); margin: 0; }
        .about-mv-desc { font-size: 0.86rem; color: #5a6a7e; line-height: 1.7; margin: 0; }

        /* WHY US */
        .about-why { background: #fff; padding: 80px 0; }
        .about-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .about-why-list { display: flex; flex-direction: column; gap: 22px; }
        .about-why-item { display: flex; align-items: flex-start; gap: 14px; }
        .about-why-icon { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #e8efff, #d4e2ff); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; margin-top: 2px; }
        .about-why-title { font-size: 0.93rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .about-why-desc { font-size: 0.83rem; color: var(--gray); line-height: 1.65; }

        /* LEADERS */
        .about-leaders { background: #f8faff; padding: 80px 0; }
        .about-leaders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .about-leader-card { background: #fff; border: 1.5px solid #dce6f5; border-radius: 20px; overflow: hidden; transition: all 0.3s ease; box-shadow: 0 2px 16px rgba(11,61,145,0.04); }
        .about-leader-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(11,61,145,0.12); border-color: var(--blue); }
        .about-leader-img {
          height: 240px;
          display: flex; align-items: center; justify-content: center;
          font-size: 4.5rem; font-weight: 900; color: rgba(255,255,255,0.9);
          font-family: var(--font-head);
          letter-spacing: -0.02em;
          position: relative;
          overflow: hidden;
        }
        .about-leader-img::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(0,0,0,0.15), transparent);
        }
        .about-leader-body { padding: 24px 26px 26px; }
        .about-leader-name { font-size: 1.15rem; font-weight: 800; color: var(--blue); margin: 0 0 5px; }
        .about-leader-role { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; display: inline-block; }
        .about-leader-desc { font-size: 0.85rem; color: #5a6a7e; line-height: 1.75; margin-bottom: 18px; }
        .about-leader-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--blue); color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-size: 0.83rem; font-weight: 700; cursor: pointer; text-decoration: none; font-family: var(--font-body); transition: all 0.2s; }
        .about-leader-btn:hover { background: #0d47a1; transform: translateX(2px); }

        /* TEAM */
        .about-team { background: #fff; padding: 80px 0; }
        .about-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .about-team-card { background: #f8faff; border: 1.5px solid #e4ecf8; border-radius: 18px; padding: 28px 20px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; transition: all 0.3s ease; }
        .about-team-card:hover { transform: translateY(-5px); box-shadow: 0 14px 40px rgba(11,61,145,0.1); border-color: var(--blue); background: #fff; }
        .about-team-av { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 900; color: #fff; font-family: var(--font-head); flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .about-team-name { font-size: 0.95rem; font-weight: 800; color: var(--blue); margin: 0; }
        .about-team-role { font-size: 0.7rem; font-weight: 700; color: var(--orange); text-transform: uppercase; letter-spacing: 0.07em; }
        .about-team-desc { font-size: 0.8rem; color: var(--gray); line-height: 1.7; margin: 0; }

        @media (max-width: 768px) {
          .about-who-grid, .about-mv-grid, .about-why-grid, .about-leaders-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-stats-row { grid-template-columns: repeat(2, 1fr); }
          .about-stat { border-right: none; border-bottom: 1px solid #eef2fb; }
          .about-stat:nth-child(2) { border-right: 1px solid #eef2fb; }
          .about-team-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .about-team-grid { grid-template-columns: 1fr; }
          .about-stat:nth-child(2) { border-right: none; }
        }
      `}</style>

      {/* HERO */}
      <div className="about-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Our Story</div>
          <h1>About EduSpark</h1>
          <p>A passionate team committed to helping Bangladeshi students unlock world-class education opportunities abroad.</p>
        </div>
      </div>

      {/* WHO WE ARE */}
      <section className="about-who">
        <div className="container">
          <div className="about-who-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: '16px' }}>Who We Are</div>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>Your Trusted Education Partners</h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '14px', fontSize: '0.93rem' }}>
                EduSpark International Study was founded with a single mission: to make world-class education accessible to every deserving Bangladeshi student, regardless of their background.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '14px', fontSize: '0.93rem' }}>
                We understand the anxieties and challenges of studying abroad — language barriers, complex visa processes, unfamiliar systems, and the fear of making the wrong choice. That's why we built a team that handles everything, from the very first consultation to the day you set foot on campus.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '28px', fontSize: '0.93rem' }}>
                Over the years, we've placed 500+ students in top universities across Malaysia, UK, USA, Australia, Canada, and Europe. We're not just a consultancy — we're a community.
              </p>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--orange)', color: '#fff', padding: '13px 26px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: '0.2s' }}>
                Start Your Journey →
              </Link>
            </div>
            <div>
              <div className="about-visual">
                <div className="about-grad-icon">🎓</div>
                <div className="about-badge-card">
                  <div className="about-badge-icon">🏆</div>
                  <div>
                    <div className="about-badge-title">Award-Winning Consultancy</div>
                    <div className="about-badge-desc">Recognised by 20+ top Malaysian universities for exceptional student placement excellence.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="about-stats">
        <div className="container">
          <div className="about-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <section className="about-mv">
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '48px' }}>
            <div className="section-tag">Our Purpose</div>
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>The values and goals that drive everything we do at EduSpark.</p>
          </div>
          <div className="about-mv-grid">
            {missionVision.map((m, i) => (
              <div key={i} className="about-mv-card">
                <div className="about-mv-icon">{m.icon}</div>
                <h3 className="about-mv-title">{m.title}</h3>
                <p className="about-mv-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-why">
        <div className="container">
          <div className="about-why-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: '16px' }}>Why EduSpark</div>
              <h2 className="section-title" style={{ marginBottom: '12px' }}>Why Students Choose Us</h2>
              <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '32px' }}>
                We're not just a consultancy — we're your partner throughout your entire educational journey.
              </p>
              <div className="about-why-list">
                {whyPoints.map((w, i) => (
                  <div key={i} className="about-why-item">
                    <div className="about-why-icon">{w.icon}</div>
                    <div>
                      <div className="about-why-title">{w.title}</div>
                      <div className="about-why-desc">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="about-visual" style={{ minHeight: '420px' }}>
                <div className="about-grad-icon">🎓</div>
                <div className="about-badge-card">
                  <div className="about-badge-icon">🏛️</div>
                  <div>
                    <div className="about-badge-title">Official University Partner</div>
                    <div className="about-badge-desc">Recognised by 20+ top Malaysian universities — your application gets priority attention and faster processing.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDING VISIONARIES */}
      <section className="about-leaders">
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '48px' }}>
            <div className="section-tag">Contact With Leaders</div>
            <h2 className="section-title">Meet Our Guiding Visionaries</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Direct access to the core leadership driving EduSpark's mission of global excellence.</p>
          </div>
          <div className="about-leaders-grid">
            {leaders.map((l, i) => (
              <div key={i} className="about-leader-card">
                <div className="about-leader-img" style={{ background: l.bg }}>
                  {l.init}
                </div>
                <div className="about-leader-body">
                  <h3 className="about-leader-name">{l.name}</h3>
                  <div className="about-leader-role" style={{ color: l.roleColor }}>{l.role}</div>
                  <p className="about-leader-desc">{l.desc}</p>
                  <Link href="/contact" className="about-leader-btn">
                    Connect Personally →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '48px' }}>
            <div className="section-tag">The People</div>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A dedicated group of education experts, former international students, and visa specialists — all passionate about student success.</p>
          </div>
          <div className="about-team-grid">
            {team.map((m, i) => (
              <div key={i} className="about-team-card">
                <div className="about-team-av" style={{ background: m.color }}>{m.init}</div>
                <h4 className="about-team-name">{m.name}</h4>
                <div className="about-team-role">{m.role}</div>
                <p className="about-team-desc">{m.desc}</p>
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
