import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Destinations – EduSpark International Study',
  description: 'Explore top study destinations for Bangladeshi students — Malaysia, UK, USA, Australia, Canada, and Europe.',
};

const destinations = [
  {
    flag: '🇲🇾', name: 'Malaysia', href: '/destinations/malaysia',
    tagline: 'Most Affordable — Top Choice',
    desc: 'Malaysia is the #1 destination for Bangladeshi students — world-class universities, affordable fees, no language barrier, and a welcoming Muslim-majority environment.',
    highlights: ['Affordable tuition (RM 15,000–50,000/yr)', 'Part-time work allowed', 'Easy visa process', 'Halal food everywhere', 'Strong Bangladeshi community'],
    featured: true,
  },
  {
    flag: '🇬🇧', name: 'United Kingdom', href: '/destinations/uk',
    tagline: 'World Ranked Universities',
    desc: 'Home to some of the world\'s most prestigious universities. A UK degree opens doors globally with excellent post-study work visa options.',
    highlights: ['Top 10 world universities', '2-year PSW visa', 'Strong research culture', 'English-speaking', 'Global recognition'],
    featured: false,
  },
  {
    flag: '🇺🇸', name: 'United States', href: '/destinations/usa',
    tagline: 'World Class Education',
    desc: 'The USA offers unmatched academic excellence, research opportunities, and a diverse campus experience with numerous scholarship options.',
    highlights: ['Top global universities', 'OPT work authorization', 'Research funding', 'Diverse campus life', 'Silicon Valley access'],
    featured: false,
  },
  {
    flag: '🇦🇺', name: 'Australia', href: '/destinations/australia',
    tagline: 'PR Pathway Available',
    desc: 'Australia offers world-class education with clear pathways to permanent residency. Excellent quality of life and work opportunities for students.',
    highlights: ['Permanent residency pathway', '20 hrs/week work rights', 'Post-study visa 2–4 yrs', 'Safe & multicultural', 'Top QS universities'],
    featured: false,
  },
  {
    flag: '🇨🇦', name: 'Canada', href: '/destinations/canada',
    tagline: 'Immigration Friendly',
    desc: 'Canada\'s welcoming immigration policies and world-class universities make it ideal for students aiming for long-term residency.',
    highlights: ['Express Entry pathway', 'PGWP up to 3 years', 'Bilingual advantage', 'Safe & inclusive', 'High quality of life'],
    featured: false,
  },
  {
    flag: '🇩🇪', name: 'Germany', href: '/destinations/germany',
    tagline: 'Tuition-Free Options',
    desc: 'Germany offers tuition-free public university education and is a hub for engineering and technology students worldwide.',
    highlights: ['Tuition-free public unis', 'Strong engineering programs', 'EU job market access', 'Low cost of living', 'English programs available'],
    featured: false,
  },
  {
    flag: '🇯🇵', name: 'Japan', href: '/destinations/japan',
    tagline: 'Technology & Culture',
    desc: 'Japan combines cutting-edge technology education with a rich cultural experience and strong scholarship opportunities for international students.',
    highlights: ['MEXT scholarships', 'Advanced tech programs', 'Low crime rate', 'Unique experience', 'High employment'],
    featured: false,
  },
  {
    flag: '🇸🇬', name: 'Singapore', href: '/destinations/singapore',
    tagline: 'Gateway to Asia',
    desc: 'Singapore\'s world-ranked universities and strategic location make it a top choice for students wanting a global business education.',
    highlights: ['NUS & NTU top 20 globally', 'English medium', 'Business hub', 'Close to Bangladesh', 'Strong scholarships'],
    featured: false,
  },
  {
    flag: '🇳🇿', name: 'New Zealand', href: '/destinations/new-zealand',
    tagline: 'Safe & Scenic',
    desc: 'New Zealand offers high quality education in one of the world\'s safest countries with excellent post-study work rights.',
    highlights: ['Post-study work 1–3 yrs', 'Beautiful environment', 'English speaking', 'Safe & welcoming', 'PR pathway possible'],
    featured: false,
  },
];

export default function DestinationsPage() {
  const featured = destinations.find(d => d.featured);
  const rest = destinations.filter(d => !d.featured);

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Explore the World</div>
          <h1>Study Destinations</h1>
          <p>From the affordable excellence of Malaysia to the global prestige of UK and USA — find your perfect study destination.</p>
        </div>
      </div>

      {/* FEATURED — MALAYSIA */}
      {featured && (
        <section style={{ background: '#fff' }}>
          <div className="container">
            <div className="section-tag" style={{ background: 'var(--orange-lt)', color: 'var(--orange2)' }}>⭐ Featured Destination</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center',
              marginTop: '20px',
            }}>
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{featured.flag}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--orange-lt)', color: 'var(--orange2)', borderRadius: '100px',
                  padding: '4px 14px', fontSize: '0.73rem', fontWeight: 700, marginBottom: '12px',
                }}>
                  🏆 {featured.tagline}
                </div>
                <h2 className="section-title">Study in {featured.name}</h2>
                <p style={{ color: 'var(--gray)', lineHeight: 1.75, marginBottom: '24px' }}>{featured.desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {featured.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--orange)', fontSize: '1rem' }}>✓</span> {h}
                    </li>
                  ))}
                </ul>
                <Link href={featured.href} className="btn-orange">Explore Malaysia →</Link>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--blue), var(--blue-mid))',
                borderRadius: '24px', padding: '48px', minHeight: '380px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,122,0,0.2) 0%, transparent 50%)' }} />
                <div style={{ fontSize: '5rem', marginBottom: '16px', position: 'relative', zIndex: 1 }}>🇲🇾</div>
                <div style={{
                  background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px', padding: '20px 28px', textAlign: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>20+</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>Partner Universities in Malaysia</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL DESTINATIONS */}
      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">All Destinations</div>
            <h2 className="section-title">Global Education Awaits</h2>
            <p className="section-sub">We have expert consultants and university partnerships across these countries.</p>
          </div>
          <div className="dest-grid-big">
            {rest.map((d, i) => (
              <Link key={i} href={d.href} className="dest-card-big">
                <div className="dest-card-content">
                  <span className="dest-card-flag">{d.flag}</span>
                  <h3>{d.name}</h3>
                  <p>{d.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <h2>Not Sure Which Country to Choose?</h2>
          <p>Book a free consultation — we'll match you with the best destination for your goals and budget.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Free Consultation</Link>
            <Link href="/universities" className="btn-outline-w">🏛️ Browse Universities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
