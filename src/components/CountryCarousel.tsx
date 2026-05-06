'use client';
import { useState } from 'react';
import Link from 'next/link';

const countries = [
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    tag: 'WHY MALAYSIA',
    desc: 'Malaysia has become Southeast Asia\'s top education hub — world-class quality at an affordable price.',
    benefits: [
      { icon: '💰', title: 'Affordable Tuition Fees', desc: 'Study at top universities from just $3,000–$10,000 per year — a fraction of Western country costs.' },
      { icon: '🌐', title: 'English-Medium Education', desc: 'All major Malaysian universities teach in English, making the transition seamless for Bangladeshi students.' },
      { icon: '🎓', title: 'Globally Recognized Degrees', desc: 'Degrees from Malaysian universities are recognized worldwide and open doors to international careers.' },
      { icon: '🛂', title: 'Easy Student Visa Process', desc: 'Straightforward student visa with faster processing — we handle every step of your application.' },
    ],
    costs: [
      { icon: '🏫', label: 'TUITION FEE', amount: '$3K–$10K', per: 'per year' },
      { icon: '🍜', label: 'LIVING COST', amount: '$300–$600', per: 'per month' },
      { icon: '🏠', label: 'ACCOMMODATION', amount: '$100–$300', per: 'per month' },
    ],
    scholarshipText: 'Many Malaysian universities offer merit-based scholarships for international students. Our team will identify and help you apply for all available scholarships matching your profile.',
    scholarshipLink: '/destinations/malaysia',
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tag: 'WHY UK',
    desc: 'The UK is home to some of the world\'s oldest and most prestigious universities — a degree here opens global doors.',
    benefits: [
      { icon: '🏆', title: 'World-Class Universities', desc: 'Oxford, Cambridge, Imperial and hundreds more — the UK hosts globally top-ranked institutions.' },
      { icon: '⏱️', title: 'Shorter Degree Duration', desc: 'UK bachelor\'s degrees take just 3 years, saving you both time and money compared to other countries.' },
      { icon: '💼', title: 'Post-Study Work Visa', desc: 'The Graduate Route visa allows you to work in the UK for 2 years after completing your degree.' },
      { icon: '🌍', title: 'Cultural Diversity', desc: 'The UK is one of the most multicultural nations — you\'ll feel at home while gaining a global perspective.' },
    ],
    costs: [
      { icon: '🏫', label: 'TUITION FEE', amount: '$15K–$35K', per: 'per year' },
      { icon: '🍽️', label: 'LIVING COST', amount: '$1,200–$1,800', per: 'per month' },
      { icon: '🏠', label: 'ACCOMMODATION', amount: '$600–$1,200', per: 'per month' },
    ],
    scholarshipText: 'The UK offers prestigious scholarships like Chevening, Commonwealth, and university-specific awards. We help you identify and apply for every scholarship you qualify for.',
    scholarshipLink: '/destinations/uk',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    tag: 'WHY AUSTRALIA',
    desc: 'Australia combines world-class education with an incredible lifestyle — a top choice for international students.',
    benefits: [
      { icon: '🎓', title: 'Top-Ranked Universities', desc: 'Australia has 8 universities in the world\'s top 100, offering degrees recognized in every corner of the globe.' },
      { icon: '🌞', title: 'High Quality of Life', desc: 'Safe cities, clean environment, and a welcoming multicultural society make Australia a great place to study and live.' },
      { icon: '💼', title: 'Work While You Study', desc: 'International students can work up to 48 hours per fortnight — helping cover living expenses while gaining experience.' },
      { icon: '🛡️', title: 'Student Protections', desc: 'Australia\'s ESOS framework legally protects international students\' rights, fees, and course quality.' },
    ],
    costs: [
      { icon: '🏫', label: 'TUITION FEE', amount: '$15K–$33K', per: 'per year' },
      { icon: '🍖', label: 'LIVING COST', amount: '$1,400–$2,500', per: 'per month' },
      { icon: '🏠', label: 'ACCOMMODATION', amount: '$700–$1,500', per: 'per month' },
    ],
    scholarshipText: 'Australia Awards, Destination Australia, and university-specific scholarships are available for Bangladeshi students. Our advisors help you apply before every deadline.',
    scholarshipLink: '/destinations/australia',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    tag: 'WHY CANADA',
    desc: 'Canada is one of the most immigrant-friendly countries — study here and build a future with real pathways to permanent residency.',
    benefits: [
      { icon: '🍁', title: 'PR Pathway After Graduation', desc: 'Canada\'s Express Entry and PNP programs offer clear routes to permanent residency for international graduates.' },
      { icon: '🏫', title: 'World-Class Institutions', desc: 'Universities like UofT, McGill, and UBC are globally ranked and offer cutting-edge programs in every field.' },
      { icon: '💼', title: 'Work Opportunities', desc: 'International students can work 20 hours/week during studies and full-time during scheduled breaks.' },
      { icon: '🤝', title: 'Safe & Inclusive Society', desc: 'Canada ranks among the safest, most inclusive nations — a welcoming home for Bangladeshi students.' },
    ],
    costs: [
      { icon: '🏫', label: 'TUITION FEE', amount: '$12K–$30K', per: 'per year' },
      { icon: '🍁', label: 'LIVING COST', amount: '$1,000–$2,000', per: 'per month' },
      { icon: '🏠', label: 'ACCOMMODATION', amount: '$500–$1,200', per: 'per month' },
    ],
    scholarshipText: 'Vanier CGS, Trudeau Foundation, and dozens of university scholarships are open to international students. We match your profile to every available opportunity.',
    scholarshipLink: '/destinations/canada',
  },
];

export default function CountryCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? countries.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === countries.length - 1 ? 0 : i + 1));

  const c = countries[current];

  return (
    <section style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 60%, var(--blue-mid) 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* background decoration */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,122,0,0.07)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Header */}
        <div className="section-head center" style={{ marginBottom: '48px' }}>
          <div className="section-tag" style={{ background: 'rgba(255,122,0,.18)', color: '#ffb366' }}>Study Destinations</div>
          <h2 className="section-title" style={{ color: '#fff' }}>Explore Countries We Place Students In</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto' }}>
            We guide Bangladeshi students to the best universities across the globe. Explore each destination below.
          </p>
        </div>

        {/* Slide */}
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '48px', backdropFilter: 'blur(10px)', transition: 'all 0.35s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>

            {/* LEFT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,122,0,0.18)', color: '#ffb366', borderRadius: '20px', padding: '6px 14px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff7a00', display: 'inline-block' }} />
                {c.tag}
              </div>

              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-head)', marginBottom: '12px', lineHeight: 1.2 }}>
                Study in {c.name} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', verticalAlign: 'middle' }}>{c.flag}</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '32px' }}>{c.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {c.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                      {b.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '4px' }}>{b.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.6 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,122,0,0.18)', color: '#ffb366', borderRadius: '20px', padding: '6px 14px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff7a00', display: 'inline-block' }} />
                COST BREAKDOWN
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
                {c.costs.map((cost, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '20px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{cost.icon}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', marginBottom: '8px' }}>{cost.label}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ff7a00', lineHeight: 1.2, marginBottom: '6px' }}>{cost.amount}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{cost.per}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px' }}>🏆 Scholarship Opportunities</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{c.scholarshipText}</p>
              </div>

              <Link href={c.scholarshipLink} style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: '0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e06a00'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--orange)'; (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}>
                Check Scholarship Eligibility →
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '36px' }}>
          <button onClick={prev} aria-label="Previous" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', fontFamily: 'var(--font-body)' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
            ←
          </button>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {countries.map((cn, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to ${cn.name}`}
                style={{ width: i === current ? '32px' : '10px', height: '10px', borderRadius: '5px', background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>

          <button onClick={next} aria-label="Next" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', fontFamily: 'var(--font-body)' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
            →
          </button>
        </div>

        {/* Country tab pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          {countries.map((cn, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ padding: '8px 18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.07)', color: i === current ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: i === current ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>
              {cn.flag} {cn.name}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .country-carousel-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
