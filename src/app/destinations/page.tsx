import Link from 'next/link';
import type { Metadata } from 'next';
import { countries, featuredCountry, otherCountries } from '@/data/countries';

export const metadata: Metadata = {
  title: 'Study Destinations – EduSpark International Study',
  description: 'Explore 12 top study destinations — Malaysia, Australia, UK, USA, Canada, Germany, Japan, Singapore, South Korea, China, Netherlands & New Zealand.',
};

export default function DestinationsPage() {
  if (!featuredCountry) return null;

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .dest-page-hero {
          background: linear-gradient(135deg, #0b3d91 0%, #1565c0 55%, #0d47a1 100%);
          padding: 64px 0 80px;
          position: relative; overflow: hidden;
        }
        .dest-page-hero::before {
          content: ''; position: absolute;
          top: -80px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .dest-page-hero::after {
          content: ''; position: absolute;
          bottom: -100px; left: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(255,255,255,0.03); pointer-events: none;
        }
        .dest-hero-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,122,0,0.2); border: 1px solid rgba(255,122,0,0.35);
          color: #ffb366; border-radius: 100px;
          padding: 5px 16px; font-size: 0.75rem; font-weight: 700;
          margin-bottom: 18px;
        }
        .dest-hero-title {
          font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900;
          color: #fff; font-family: var(--font-head);
          margin: 0 0 14px; line-height: 1.15;
        }
        .dest-hero-sub {
          color: rgba(255,255,255,0.7); font-size: 1rem;
          max-width: 560px; line-height: 1.7; margin-bottom: 32px;
        }
        .dest-hero-stats {
          display: flex; gap: 32px; flex-wrap: wrap;
        }
        .dest-stat-num {
          font-size: 2rem; font-weight: 900; color: #fff;
          font-family: var(--font-head); line-height: 1;
        }
        .dest-stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.55); margin-top: 3px; }

        /* ── FEATURED SECTION ── */
        .dest-featured {
          background: #fff; padding: 72px 0;
        }
        .dest-featured-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }
        .dest-featured-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff3e0; color: #e65100;
          border-radius: 100px; padding: 5px 16px;
          font-size: 0.75rem; font-weight: 700; margin-bottom: 14px;
        }
        .dest-featured-title {
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900;
          color: var(--blue); font-family: var(--font-head);
          margin: 0 0 14px; line-height: 1.2;
        }
        .dest-featured-desc {
          color: var(--gray); line-height: 1.75; margin-bottom: 24px;
          font-size: 0.95rem;
        }
        .dest-highlights {
          list-style: none; margin-bottom: 28px;
          display: flex; flex-direction: column; gap: 9px;
        }
        .dest-highlights li {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.88rem; color: var(--text);
        }
        .dest-check { color: #16a34a; font-size: 1rem; flex-shrink: 0; }

        /* Attraction preview pills */
        .dest-attraction-pills {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px;
        }
        .dest-attraction-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: #f0f4ff; border: 1px solid #dde6f5;
          border-radius: 20px; padding: 4px 12px;
          font-size: 0.72rem; color: var(--blue); font-weight: 600;
        }

        /* Featured visual card */
        .dest-featured-visual {
          background: linear-gradient(135deg, var(--blue), #1a56c4);
          border-radius: 24px; padding: 48px 40px;
          min-height: 380px; display: flex; flex-direction: column;
          justify-content: flex-end; position: relative; overflow: hidden;
        }
        .dest-featured-visual::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(255,122,0,0.2) 0%, transparent 55%);
        }
        .dest-feat-flag {
          font-size: 5rem; position: absolute; top: 32px; left: 40px; z-index: 1;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
        }
        .dest-feat-stat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
          position: relative; z-index: 1;
        }
        .dest-feat-stat {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px; padding: 16px;
        }
        .dest-feat-stat-num {
          font-size: 1.6rem; font-weight: 900; color: #fff;
          font-family: var(--font-head); line-height: 1;
        }
        .dest-feat-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.65); margin-top: 3px; }

        /* ── COUNTRY GRID ── */
        .dest-all-section { background: #f4f7fd; padding: 72px 0; }
        .dest-section-head { text-align: center; margin-bottom: 48px; }
        .dest-section-tag {
          display: inline-block; background: #eef2fb;
          color: var(--blue); border-radius: 100px;
          padding: 5px 16px; font-size: 0.75rem; font-weight: 700;
          margin-bottom: 12px;
        }
        .dest-section-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 900;
          color: var(--blue); font-family: var(--font-head); margin: 0 0 10px;
        }
        .dest-section-sub { color: var(--gray); font-size: 0.9rem; max-width: 520px; margin: 0 auto; }

        .dest-country-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }

        /* ── COUNTRY CARD ── */
        .dest-card {
          background: #fff; border: 1.5px solid #e4ecf8;
          border-radius: 20px; overflow: hidden;
          transition: all 0.25s ease;
          display: flex; flex-direction: column;
          text-decoration: none;
        }
        .dest-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(11,61,145,0.12);
          border-color: var(--blue);
        }
        .dest-card-top {
          padding: 28px 24px 20px;
          display: flex; align-items: flex-start; gap: 14px;
        }
        .dest-card-flag {
          font-size: 2.8rem; line-height: 1; flex-shrink: 0;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12));
        }
        .dest-card-header { flex: 1; }
        .dest-card-tagline {
          font-size: 0.68rem; font-weight: 700;
          border-radius: 20px; padding: 2px 10px;
          margin-bottom: 5px; display: inline-block;
        }
        .dest-card-name {
          font-size: 1.15rem; font-weight: 900;
          color: var(--blue); font-family: var(--font-head);
          margin: 0 0 6px;
        }
        .dest-card-desc {
          font-size: 0.8rem; color: #5a6a7e;
          line-height: 1.6; padding: 0 24px 16px;
        }

        /* Attraction strip */
        .dest-card-attractions {
          padding: 0 24px 16px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .dest-card-attractions-title {
          font-size: 0.7rem; font-weight: 700;
          color: var(--gray); text-transform: uppercase;
          letter-spacing: 0.5px; margin-bottom: 4px;
        }
        .dest-card-attraction-row {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.75rem; color: #5a6a7e;
        }
        .dest-card-attraction-emoji { font-size: 0.85rem; flex-shrink: 0; }
        .dest-card-attraction-name { font-weight: 600; color: var(--text); }
        .dest-card-attraction-loc { color: var(--gray); }

        /* Card footer */
        .dest-card-footer {
          margin-top: auto;
          padding: 16px 24px;
          border-top: 1px solid #f0f4ff;
          display: flex; align-items: center; justify-content: space-between;
        }
        .dest-card-facts {
          display: flex; gap: 12px;
        }
        .dest-card-fact {
          font-size: 0.7rem; color: var(--gray);
          display: flex; align-items: center; gap: 3px;
        }
        .dest-card-explore {
          font-size: 0.8rem; font-weight: 700;
          color: var(--blue); display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
        }
        .dest-card:hover .dest-card-explore { color: var(--orange); }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .dest-featured-inner { grid-template-columns: 1fr; gap: 32px; }
          .dest-featured-visual { min-height: 260px; }
          .dest-feat-flag { font-size: 4rem; top: 20px; left: 24px; }
          .dest-country-grid { grid-template-columns: 1fr; }
          .dest-hero-stats { gap: 20px; }
        }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <div className="dest-page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="dest-hero-tag">🌍 Explore the World</div>
          <h1 className="dest-hero-title">Find Your Perfect<br />Study Destination</h1>
          <p className="dest-hero-sub">
            From the affordable excellence of Malaysia to the global prestige of Oxford and MIT —
            we guide students to world-class universities across 12 countries.
          </p>
          <div className="dest-hero-stats">
            {[
              { num: '12', label: 'Countries' },
              { num: '80+', label: 'Partner Universities' },
              { num: '500+', label: 'Programmes' },
              { num: '5,000+', label: 'Students Placed' },
            ].map((s, i) => (
              <div key={i}>
                <div className="dest-stat-num">{s.num}</div>
                <div className="dest-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED — MALAYSIA ─────────────────────────────────────── */}
      <section className="dest-featured">
        <div className="container">
          <div className="dest-featured-inner">
            <div>
              <div className="dest-featured-tag">⭐ Featured Destination</div>
              <h2 className="dest-featured-title">Study in {featuredCountry.name}</h2>
              <p className="dest-featured-desc">{featuredCountry.heroDesc}</p>

              <ul className="dest-highlights">
                {featuredCountry.whyStudy.slice(0, 5).map((h, i) => (
                  <li key={i}><span className="dest-check">✓</span> {h}</li>
                ))}
              </ul>

              <div className="dest-attraction-pills">
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gray)', alignSelf: 'center' }}>Must Visit:</span>
                {featuredCountry.attractions.slice(0, 4).map((a, i) => (
                  <span key={i} className="dest-attraction-pill">{a.emoji} {a.name}</span>
                ))}
              </div>

              <Link href={`/destinations/${featuredCountry.slug}`} className="btn-orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore {featuredCountry.name} →
              </Link>
            </div>

            <div className="dest-featured-visual">
              <div className="dest-feat-flag">{featuredCountry.flag}</div>
              <div className="dest-feat-stat-grid">
                {[
                  { num: '20+', label: 'Partner Universities' },
                  { num: '3 Yrs', label: 'Shortest Degree' },
                  { num: 'RM 15K', label: 'Tuition from/yr' },
                  { num: '8', label: 'Tourist Attractions' },
                ].map((s, i) => (
                  <div key={i} className="dest-feat-stat">
                    <div className="dest-feat-stat-num">{s.num}</div>
                    <div className="dest-feat-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL DESTINATIONS ────────────────────────────────────────── */}
      <section className="dest-all-section">
        <div className="container">
          <div className="dest-section-head">
            <div className="dest-section-tag">All Destinations</div>
            <h2 className="dest-section-title">11 More Countries to Explore</h2>
            <p className="dest-section-sub">Every country has been selected for its academic quality, student experience, and career prospects after graduation.</p>
          </div>

          <div className="dest-country-grid">
            {otherCountries.map((c) => {
              const tagBg = `${c.accentColor}18`;
              const keyFact = c.keyFacts.find(f => f.label === 'Cost of Living');
              const visaFact = c.keyFacts.find(f => f.label === 'Student Visa');
              return (
                <Link key={c.slug} href={`/destinations/${c.slug}`} className="dest-card">
                  {/* Top */}
                  <div className="dest-card-top">
                    <span className="dest-card-flag">{c.flag}</span>
                    <div className="dest-card-header">
                      <span className="dest-card-tagline" style={{ background: tagBg, color: c.accentColor }}>
                        {c.tagline}
                      </span>
                      <div className="dest-card-name">{c.name}</div>
                    </div>
                  </div>

                  <p className="dest-card-desc">{c.heroDesc}</p>

                  {/* Top 3 attractions */}
                  <div className="dest-card-attractions">
                    <div className="dest-card-attractions-title">📍 Top Attractions</div>
                    {c.attractions.slice(0, 3).map((a, i) => (
                      <div key={i} className="dest-card-attraction-row">
                        <span className="dest-card-attraction-emoji">{a.emoji}</span>
                        <span className="dest-card-attraction-name">{a.name}</span>
                        <span className="dest-card-attraction-loc">· {a.location}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="dest-card-footer">
                    <div className="dest-card-facts">
                      {keyFact && (
                        <span className="dest-card-fact">{keyFact.icon} {keyFact.value}</span>
                      )}
                      {visaFact && (
                        <span className="dest-card-fact">📋 {visaFact.value}</span>
                      )}
                    </div>
                    <span className="dest-card-explore">Explore {c.name.split(' ')[0]} →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <div className="cta-band">
        <div className="container">
          <h2>Not Sure Which Country is Right for You?</h2>
          <p>Our advisors will match you to the best destination based on your budget, goals, and career plans.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Free Consultation</Link>
            <Link href="/universities" className="btn-outline-w">🏛️ Browse Universities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
