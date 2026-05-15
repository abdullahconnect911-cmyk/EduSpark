import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countries } from '@/data/countries';
import { getUniversitiesByCountrySlug } from '@/data/universities';

export async function generateStaticParams() {
  return countries.map(c => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: { country: string } }) {
  const country = countries.find(c => c.slug === params.country);
  if (!country) return {};
  return {
    title: `Study in ${country.name} – EduSpark`,
    description: country.heroDesc,
  };
}

const attractionTypeColors: Record<string, { bg: string; color: string }> = {
  Nature:       { bg: '#dcfce7', color: '#16a34a' },
  Heritage:     { bg: '#fef3c7', color: '#b45309' },
  City:         { bg: '#e0f2fe', color: '#0369a1' },
  Culture:      { bg: '#fce7f3', color: '#be185d' },
  Adventure:    { bg: '#fff7ed', color: '#c2410c' },
  Beach:        { bg: '#cffafe', color: '#0e7490' },
  Museum:       { bg: '#f3e8ff', color: '#7c3aed' },
  Architecture: { bg: '#e8f0ff', color: '#1a56c4' },
};

const levelColors: Record<string, { bg: string; color: string }> = {
  Bachelor:        { bg: '#e8f0ff', color: '#1a56c4' },
  Masters:         { bg: '#fef3c7', color: '#b45309' },
  PhD:             { bg: '#fce7f3', color: '#be185d' },
  Diploma:         { bg: '#dcfce7', color: '#16a34a' },
  Foundation:      { bg: '#fff7ed', color: '#c2410c' },
  Certificate:     { bg: '#f3e8ff', color: '#7c3aed' },
  'Advance Diploma': { bg: '#e0f2fe', color: '#0369a1' },
};

export default function CountryDetailPage({ params }: { params: { country: string } }) {
  const country = countries.find(c => c.slug === params.country);
  if (!country) notFound();

  const universities = getUniversitiesByCountrySlug(country.slug);

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .cy-hero {
          background: linear-gradient(135deg, #0b3d91 0%, #1565c0 55%, #0d47a1 100%);
          padding: 52px 0 68px; position: relative; overflow: hidden;
        }
        .cy-hero::after {
          content: ''; position: absolute; bottom: -80px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .cy-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; color: rgba(255,255,255,0.55);
          margin-bottom: 20px; flex-wrap: wrap;
        }
        .cy-breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s; }
        .cy-breadcrumb a:hover { color: #fff; }
        .cy-hero-inner { display: flex; align-items: flex-start; gap: 24px; }
        .cy-flag { font-size: 4rem; flex-shrink: 0; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
        .cy-hero-title {
          font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 900;
          color: #fff; font-family: var(--font-head); margin: 0 0 8px; line-height: 1.2;
        }
        .cy-hero-tagline {
          font-size: 0.8rem; font-weight: 700; padding: 3px 12px;
          border-radius: 20px; background: rgba(255,122,0,0.2);
          border: 1px solid rgba(255,122,0,0.35); color: #ffb366;
          display: inline-block; margin-bottom: 10px;
        }
        .cy-hero-desc { color: rgba(255,255,255,0.75); font-size: 0.9rem; line-height: 1.7; max-width: 600px; }
        .cy-hero-facts {
          display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;
        }
        .cy-hero-fact {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 8px 14px;
          font-size: 0.75rem; color: rgba(255,255,255,0.85);
          display: flex; align-items: center; gap: 5px; font-weight: 600;
        }

        /* ── LAYOUT ── */
        .cy-page { background: #f4f7fd; min-height: 100vh; padding-bottom: 60px; }
        .cy-layout { display: grid; grid-template-columns: 1fr 300px; gap: 28px; margin-top: -28px; align-items: start; }
        .cy-main { display: flex; flex-direction: column; gap: 24px; }
        .cy-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 16px; padding: 28px; }
        .cy-card-title { font-size: 1rem; font-weight: 800; color: var(--blue); margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1.5px solid #eef2fb; display: flex; align-items: center; gap: 8px; }
        .cy-desc { font-size: 0.88rem; color: #5a6a7e; line-height: 1.8; margin: 0; }

        /* Why Study */
        .cy-why-list { list-style: none; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .cy-why-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: var(--text); }
        .cy-why-check { color: #16a34a; font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        /* Attractions */
        .cy-attractions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cy-attraction {
          border: 1.5px solid #e4ecf8; border-radius: 14px;
          padding: 18px; transition: all 0.22s;
        }
        .cy-attraction:hover { border-color: var(--blue); box-shadow: 0 4px 16px rgba(11,61,145,0.08); }
        .cy-attraction-top { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .cy-attraction-emoji { font-size: 1.8rem; line-height: 1; flex-shrink: 0; }
        .cy-attraction-name { font-size: 0.88rem; font-weight: 800; color: var(--blue); margin: 0 0 3px; line-height: 1.3; }
        .cy-attraction-location { font-size: 0.72rem; color: var(--gray); }
        .cy-attraction-type {
          font-size: 0.65rem; font-weight: 700; padding: 2px 8px;
          border-radius: 20px; display: inline-block; margin-bottom: 7px;
        }
        .cy-attraction-desc { font-size: 0.78rem; color: #5a6a7e; line-height: 1.6; margin: 0; }

        /* Universities */
        .cy-unis-grid { display: flex; flex-direction: column; gap: 12px; }
        .cy-uni-row {
          display: flex; align-items: center; gap: 16px;
          border: 1.5px solid #e4ecf8; border-radius: 14px;
          padding: 16px 18px; text-decoration: none;
          transition: all 0.22s; background: #fff;
        }
        .cy-uni-row:hover { border-color: var(--blue); transform: translateX(4px); box-shadow: 0 4px 16px rgba(11,61,145,0.08); }
        .cy-uni-logo {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 900; color: #fff;
          font-family: var(--font-head); flex-shrink: 0;
          text-align: center; line-height: 1.2; letter-spacing: 0.3px;
        }
        .cy-uni-info { flex: 1; min-width: 0; }
        .cy-uni-name { font-size: 0.9rem; font-weight: 700; color: var(--blue); margin-bottom: 5px; line-height: 1.3; }
        .cy-uni-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .cy-uni-city { font-size: 0.72rem; color: var(--gray); display: flex; align-items: center; gap: 3px; }
        .cy-uni-ranking { font-size: 0.7rem; font-weight: 700; background: #fff8e1; color: #b45309; border-radius: 20px; padding: 2px 8px; }
        .cy-uni-offer { font-size: 0.7rem; font-weight: 700; border-radius: 20px; padding: 2px 8px; }
        .cy-uni-offer.free { background: #dcfce7; color: #16a34a; }
        .cy-uni-offer.conditional { background: #fff7ed; color: #c2410c; }
        .cy-uni-levels { display: flex; gap: 4px; flex-wrap: wrap; }
        .cy-uni-level { font-size: 0.65rem; font-weight: 700; border-radius: 12px; padding: 2px 7px; }
        .cy-uni-arrow { color: var(--blue); font-size: 1rem; flex-shrink: 0; transition: transform 0.2s; }
        .cy-uni-row:hover .cy-uni-arrow { transform: translateX(4px); }

        /* Sidebar */
        .cy-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .cy-info-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 16px; padding: 22px; }
        .cy-info-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #f0f4ff; gap: 12px; }
        .cy-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .cy-info-label { font-size: 0.74rem; color: var(--gray); font-weight: 600; }
        .cy-info-value { font-size: 0.8rem; color: var(--text); font-weight: 700; text-align: right; line-height: 1.4; }
        .cy-visa-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 16px; padding: 22px; }
        .cy-cost-card { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 1.5px solid #bae6fd; border-radius: 16px; padding: 22px; }
        .cy-apply-btn { display: block; background: var(--orange); color: #fff; border-radius: 12px; padding: 14px; font-weight: 800; font-size: 0.9rem; text-decoration: none; text-align: center; font-family: var(--font-body); transition: all 0.2s; }
        .cy-apply-btn:hover { background: #e06a00; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,122,0,0.3); }
        .cy-unis-btn { display: block; background: var(--blue); color: #fff; border-radius: 12px; padding: 12px; font-weight: 700; font-size: 0.85rem; text-decoration: none; text-align: center; font-family: var(--font-body); transition: all 0.2s; margin-top: 8px; }
        .cy-unis-btn:hover { background: #0d47a1; }

        @media (max-width: 768px) {
          .cy-layout { grid-template-columns: 1fr; }
          .cy-attractions-grid { grid-template-columns: 1fr; }
          .cy-hero-inner { flex-direction: column; gap: 12px; }
          .cy-flag { font-size: 3rem; }
        }
      `}</style>

      {/* HERO */}
      <div className="cy-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cy-breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/destinations">Study Destinations</Link><span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Study in {country.name}</span>
          </div>
          <div className="cy-hero-inner">
            <span className="cy-flag">{country.flag}</span>
            <div>
              <div className="cy-hero-tagline">{country.tagline}</div>
              <h1 className="cy-hero-title">Study in {country.name}</h1>
              <p className="cy-hero-desc">{country.heroDesc}</p>
              <div className="cy-hero-facts">
                {country.keyFacts.slice(0, 5).map((f, i) => (
                  <div key={i} className="cy-hero-fact">{f.icon} {f.value}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="cy-page">
        <div className="container">
          <div className="cy-layout">

            {/* MAIN */}
            <div className="cy-main">

              {/* About */}
              <div className="cy-card">
                <div className="cy-card-title">🌍 About {country.name}</div>
                <p className="cy-desc">{country.fullDesc}</p>
              </div>

              {/* Why Study */}
              <div className="cy-card">
                <div className="cy-card-title">🎓 Why Study in {country.name}?</div>
                <ul className="cy-why-list">
                  {country.whyStudy.map((item, i) => (
                    <li key={i} className="cy-why-item">
                      <span className="cy-why-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tourist Attractions */}
              <div className="cy-card">
                <div className="cy-card-title">📍 Must-Visit Places in {country.name}</div>
                <div className="cy-attractions-grid">
                  {country.attractions.map((a, i) => {
                    const tc = attractionTypeColors[a.type] || { bg: '#f0f4ff', color: '#1a56c4' };
                    return (
                      <div key={i} className="cy-attraction">
                        <div className="cy-attraction-top">
                          <span className="cy-attraction-emoji">{a.emoji}</span>
                          <div>
                            <div className="cy-attraction-name">{a.name}</div>
                            <div className="cy-attraction-location">📍 {a.location}</div>
                          </div>
                        </div>
                        <span className="cy-attraction-type" style={{ background: tc.bg, color: tc.color }}>
                          {a.type}
                        </span>
                        <p className="cy-attraction-desc">{a.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Universities */}
              <div className="cy-card" id="universities">
                <div className="cy-card-title">🏛️ Universities in {country.name} ({universities.length})</div>
                <div className="cy-unis-grid">
                  {universities.map((u, i) => {
                    const initials = u.short.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 4).toUpperCase();
                    const logoColors = ['#0052cc','#bc002d','#003478','#1a56c4','#0d47a1','#1565c0','#0b3d91','#1a73e8'];
                    const logoColor = logoColors[i % logoColors.length];
                    return (
                      <Link key={u.slug} href={`/universities/${u.slug}`} className="cy-uni-row">
                        <div className="cy-uni-logo" style={{ background: logoColor }}>{initials}</div>
                        <div className="cy-uni-info">
                          <div className="cy-uni-name">{u.name}</div>
                          <div className="cy-uni-meta">
                            <span className="cy-uni-city">📍 {u.city}</span>
                            {u.ranking && <span className="cy-uni-ranking">⭐ {u.ranking}</span>}
                            <span className={`cy-uni-offer ${u.offerLetter === 'Free Offer Letter' ? 'free' : 'conditional'}`}>
                              {u.offerLetter === 'Free Offer Letter' ? '✅ Free Offer' : '📩 Conditional'}
                            </span>
                          </div>
                          <div className="cy-uni-levels" style={{ marginTop: '5px' }}>
                            {u.levels.map(lvl => {
                              const ls = levelColors[lvl] || { bg: '#e8f0ff', color: '#1a56c4' };
                              return (
                                <span key={lvl} className="cy-uni-level" style={{ background: ls.bg, color: ls.color }}>{lvl}</span>
                              );
                            })}
                          </div>
                        </div>
                        <span className="cy-uni-arrow">›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="cy-sidebar">

              {/* Key Facts */}
              <div className="cy-info-card">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '14px' }}>
                  📊 Key Facts
                </div>
                {country.keyFacts.map((f, i) => (
                  <div key={i} className="cy-info-row">
                    <span className="cy-info-label">{f.icon} {f.label}</span>
                    <span className="cy-info-value">{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Visa Info */}
              <div className="cy-visa-card">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '10px' }}>📋 Visa Information</div>
                <p style={{ fontSize: '0.8rem', color: '#5a6a7e', lineHeight: 1.65, margin: 0 }}>{country.visaInfo}</p>
              </div>

              {/* Cost of Living */}
              <div className="cy-cost-card">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0369a1', marginBottom: '10px' }}>💰 Cost of Living</div>
                <p style={{ fontSize: '0.8rem', color: '#0c4a6e', lineHeight: 1.65, margin: 0 }}>{country.costOfLiving}</p>
              </div>

              {/* CTA */}
              <div className="cy-info-card">
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '14px', lineHeight: 1.6 }}>
                  Interested in studying in {country.name}? Get free guidance from our advisors.
                </div>
                <Link href="/contact" className="cy-apply-btn">📞 Free Consultation</Link>
                <a href="#universities" className="cy-unis-btn">🏛️ Explore {universities.length} Universities</a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="container">
          <h2>Ready to Study in {country.name}?</h2>
          <p>Our advisors will guide you from university selection to visa — completely free of charge.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Counselling</Link>
            <Link href="/destinations" className="btn-outline-w">🌍 Other Destinations</Link>
          </div>
        </div>
      </div>
    </>
  );
}
