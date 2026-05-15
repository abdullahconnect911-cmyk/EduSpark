import Link from 'next/link';
import { notFound } from 'next/navigation';
import { universitiesData } from '@/data/universities';
import { csItCourses } from '@/data/csItCourses';
import { foundationDiplomaCourses } from '@/data/foundationDiplomaCourses';

export async function generateStaticParams() {
  return universitiesData.map(u => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const uni = universitiesData.find(u => u.slug === params.slug);
  if (!uni) return {};
  return {
    title: `${uni.name} – Courses & Details | EduSpark`,
    description: uni.about,
  };
}

const levelColors: Record<string, { bg: string; color: string }> = {
  Bachelor:          { bg: '#e8f0ff', color: '#1a56c4' },
  Masters:           { bg: '#fef3c7', color: '#b45309' },
  Master:            { bg: '#fef3c7', color: '#b45309' },
  PhD:               { bg: '#fce7f3', color: '#be185d' },
  Diploma:           { bg: '#dcfce7', color: '#16a34a' },
  Foundation:        { bg: '#fff7ed', color: '#c2410c' },
  Certificate:       { bg: '#f3e8ff', color: '#7c3aed' },
  'Advance Diploma': { bg: '#e0f2fe', color: '#0369a1' },
  'A-Level':         { bg: '#fef9c3', color: '#854d0e' },
  Pathway:           { bg: '#f0fdf4', color: '#15803d' },
};

const logoColorPalette = ['#0052cc','#bc002d','#003478','#1a56c4','#0d47a1','#1565c0','#0b3d91','#1a73e8','#00843d','#7c3aed'];

const tagColors = ['#e8f0ff','#fff7ed','#f3e8ff','#dcfce7','#fce7f3','#e0f2fe','#fef3c7','#f0fdf4'];
const tagTextColors = ['#1a56c4','#c2410c','#7c3aed','#16a34a','#be185d','#0369a1','#b45309','#15803d'];

export default function UniversityDetailPage({ params }: { params: { slug: string } }) {
  const uni = universitiesData.find(u => u.slug === params.slug);
  if (!uni) notFound();

  // Get all CS courses for this university
  const csCourses = csItCourses.filter(c => c.universityShort === uni.short);

  // Get all foundation/diploma courses for this university
  const fdCourses = foundationDiplomaCourses.filter(c => c.universityShort === uni.short);

  const totalCourses = csCourses.length + fdCourses.length;

  const initials = uni.short.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(Boolean).map((w: string) => w[0]).join('').slice(0, 4).toUpperCase();
  const logoColor = logoColorPalette[universitiesData.indexOf(uni) % logoColorPalette.length];
  const isFreeLetter = uni.offerLetter === 'Free Offer Letter';

  // Group CS courses by level
  const csByLevel = csCourses.reduce((acc, c) => {
    if (!acc[c.level]) acc[c.level] = [];
    acc[c.level].push(c);
    return acc;
  }, {} as Record<string, typeof csCourses>);

  // Group FD courses by level
  const fdByLevel = fdCourses.reduce((acc, c) => {
    if (!acc[c.level]) acc[c.level] = [];
    acc[c.level].push(c);
    return acc;
  }, {} as Record<string, typeof fdCourses>);

  const allLevels = [...new Set([...Object.keys(csByLevel), ...Object.keys(fdByLevel)])];

  return (
    <>
      <style>{`
        .up-page { background: #f4f7fd; min-height: 100vh; padding-bottom: 64px; }

        /* ── HERO ── */
        .up-hero {
          background: linear-gradient(135deg, #0b3d91 0%, #1a56c4 60%, #0d47a1 100%);
          padding: 48px 0 64px; position: relative; overflow: hidden;
        }
        .up-hero::after { content:''; position:absolute; bottom:-60px; right:-40px; width:260px; height:260px; border-radius:50%; background:rgba(255,255,255,0.03); pointer-events:none; }
        .up-breadcrumb { display:flex; align-items:center; gap:6px; font-size:0.78rem; color:rgba(255,255,255,0.55); margin-bottom:20px; flex-wrap:wrap; }
        .up-breadcrumb a { color:rgba(255,255,255,0.7); text-decoration:none; transition:color 0.2s; }
        .up-breadcrumb a:hover { color:#fff; }
        .up-hero-inner { display:flex; align-items:flex-start; gap:22px; }
        .up-hero-logo { width:76px; height:76px; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:0.72rem; font-weight:900; color:#fff; font-family:var(--font-head); flex-shrink:0; border:2px solid rgba(255,255,255,0.22); text-align:center; line-height:1.2; letter-spacing:0.3px; }
        .up-hero-title { font-size:clamp(1.2rem,3vw,2rem); font-weight:900; color:#fff; font-family:var(--font-head); margin:0 0 5px; line-height:1.25; }
        .up-hero-sub { font-size:0.85rem; color:rgba(255,255,255,0.75); margin-bottom:12px; }
        .up-hero-badges { display:flex; gap:8px; flex-wrap:wrap; }
        .up-badge { background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); border-radius:20px; padding:4px 12px; font-size:0.72rem; color:rgba(255,255,255,0.9); font-weight:600; white-space:nowrap; }
        .up-badge.green { background:rgba(34,197,94,0.15); border-color:rgba(34,197,94,0.3); color:#86efac; }
        .up-badge.amber { background:rgba(251,191,36,0.15); border-color:rgba(251,191,36,0.3); color:#fde68a; }
        .up-badge.gold  { background:rgba(234,179,8,0.2);  border-color:rgba(234,179,8,0.3);  color:#fef08a; }

        /* ── LAYOUT ── */
        .up-container { max-width:1000px; margin:0 auto; padding:0 24px; }
        .up-layout { display:grid; grid-template-columns:1fr 290px; gap:26px; margin-top:-28px; align-items:start; }
        .up-main { display:flex; flex-direction:column; gap:20px; }
        .up-card { background:#fff; border:1.5px solid #e4ecf8; border-radius:16px; padding:26px; }
        .up-card-title { font-size:0.95rem; font-weight:800; color:var(--blue); margin:0 0 16px; padding-bottom:12px; border-bottom:1.5px solid #eef2fb; display:flex; align-items:center; gap:8px; }
        .up-desc { font-size:0.88rem; color:#5a6a7e; line-height:1.8; margin:0; }

        /* Tags */
        .up-tags { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:16px; }
        .up-tag { font-size:0.75rem; font-weight:700; padding:4px 12px; border-radius:20px; }

        /* Stats row */
        .up-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .up-stat { background:#f8faff; border:1.5px solid #e4ecf8; border-radius:12px; padding:14px; text-align:center; }
        .up-stat-num { font-size:1.4rem; font-weight:900; color:var(--blue); font-family:var(--font-head); line-height:1; }
        .up-stat-label { font-size:0.7rem; color:var(--gray); margin-top:4px; }

        /* ── COURSE SECTION ── */
        .up-level-section { margin-bottom:20px; }
        .up-level-header { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .up-level-badge { font-size:0.75rem; font-weight:800; padding:4px 14px; border-radius:20px; }
        .up-level-count { font-size:0.72rem; color:var(--gray); }

        .up-course-row {
          display:flex; align-items:center; gap:14px;
          border:1.5px solid #e4ecf8; border-radius:12px;
          padding:14px 16px; text-decoration:none;
          transition:all 0.22s; background:#fff;
          margin-bottom:8px;
        }
        .up-course-row:hover { border-color:var(--blue); transform:translateX(4px); box-shadow:0 4px 16px rgba(11,61,145,0.08); }
        .up-course-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
        .up-course-info { flex:1; min-width:0; }
        .up-course-title { font-size:0.87rem; font-weight:700; color:var(--blue); margin:0 0 4px; line-height:1.35; }
        .up-course-meta { display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
        .up-course-duration { font-size:0.71rem; color:var(--gray); }
        .up-course-spec { font-size:0.68rem; font-weight:600; background:#f1f5f9; color:#64748b; border-radius:20px; padding:2px 8px; }
        .up-course-offer-free { font-size:0.68rem; font-weight:700; background:#dcfce7; color:#16a34a; border-radius:20px; padding:2px 8px; }
        .up-course-offer-cond { font-size:0.68rem; font-weight:700; background:#fff7ed; color:#c2410c; border-radius:20px; padding:2px 8px; }
        .up-course-arrow { color:var(--blue); font-size:1rem; flex-shrink:0; transition:transform 0.2s; }
        .up-course-row:hover .up-course-arrow { transform:translateX(4px); }

        /* Empty state */
        .up-no-courses { text-align:center; padding:40px 20px; color:var(--gray); font-size:0.88rem; }

        /* Sidebar */
        .up-sidebar { display:flex; flex-direction:column; gap:14px; }
        .up-info-card { background:#fff; border:1.5px solid #e4ecf8; border-radius:16px; padding:20px; }
        .up-info-row { display:flex; justify-content:space-between; align-items:flex-start; padding:8px 0; border-bottom:1px solid #f0f4ff; gap:10px; }
        .up-info-row:last-child { border-bottom:none; padding-bottom:0; }
        .up-info-label { font-size:0.73rem; color:var(--gray); font-weight:600; flex-shrink:0; }
        .up-info-value { font-size:0.79rem; color:var(--text); font-weight:700; text-align:right; line-height:1.4; }
        .up-info-value.green { color:#16a34a; }
        .up-info-value.amber { color:#d97706; }
        .up-apply-btn { display:block; background:var(--orange); color:#fff; border-radius:12px; padding:14px; font-weight:800; font-size:0.9rem; text-decoration:none; text-align:center; font-family:var(--font-body); transition:all 0.2s; }
        .up-apply-btn:hover { background:#e06a00; transform:translateY(-2px); box-shadow:0 6px 20px rgba(255,122,0,0.3); }
        .up-wa-btn { display:block; background:#25d366; color:#fff; border-radius:12px; padding:11px; font-weight:700; font-size:0.84rem; text-decoration:none; text-align:center; font-family:var(--font-body); transition:all 0.2s; margin-top:8px; }
        .up-wa-btn:hover { background:#22bc5a; }
        .up-dest-btn { display:block; background:#f0f4ff; color:var(--blue); border:1.5px solid #dde6f5; border-radius:12px; padding:11px; font-weight:700; font-size:0.83rem; text-decoration:none; text-align:center; font-family:var(--font-body); transition:all 0.2s; margin-top:8px; }
        .up-dest-btn:hover { background:#e8f0ff; }

        @media(max-width:768px){
          .up-layout{grid-template-columns:1fr}
          .up-hero-inner{flex-direction:column;gap:14px}
          .up-hero-logo{width:60px;height:60px}
          .up-stats{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>

      {/* HERO */}
      <div className="up-hero">
        <div className="up-container">
          <div className="up-breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/destinations">Destinations</Link><span>›</span>
            <Link href={`/destinations/${uni.countrySlug}`}>{uni.countryFlag} {uni.country}</Link><span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{uni.name}</span>
          </div>
          <div className="up-hero-inner">
            <div className="up-hero-logo" style={{ background: logoColor }}>{initials}</div>
            <div>
              <h1 className="up-hero-title">{uni.name}</h1>
              <div className="up-hero-sub">{uni.countryFlag} {uni.city}, {uni.country}</div>
              <div className="up-hero-badges">
                {uni.ranking && <span className="up-badge gold">⭐ {uni.ranking}</span>}
                <span className="up-badge">{uni.tuition}</span>
                <span className={`up-badge ${isFreeLetter ? 'green' : 'amber'}`}>
                  {isFreeLetter ? '✅ Free Offer Letter' : '📩 Conditional Offer'}
                </span>
                {totalCourses > 0 && <span className="up-badge">📚 {totalCourses} Courses</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="up-page">
        <div className="up-container">
          <div className="up-layout">

            {/* MAIN */}
            <div className="up-main">

              {/* About */}
              <div className="up-card">
                <div className="up-card-title">🏛️ About {uni.name}</div>

                {/* Tags */}
                <div className="up-tags">
                  {uni.tags.map((tag, i) => (
                    <span key={tag} className="up-tag" style={{ background: tagColors[i % tagColors.length], color: tagTextColors[i % tagTextColors.length] }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="up-desc">{uni.about}</p>

                {/* Stats */}
                <div className="up-stats" style={{ marginTop: '18px' }}>
                  <div className="up-stat">
                    <div className="up-stat-num">{totalCourses}</div>
                    <div className="up-stat-label">Courses Listed</div>
                  </div>
                  <div className="up-stat">
                    <div className="up-stat-num">{uni.levels.length}</div>
                    <div className="up-stat-label">Degree Levels</div>
                  </div>
                  <div className="up-stat">
                    <div className="up-stat-num">{uni.tags.length}</div>
                    <div className="up-stat-label">Fields of Study</div>
                  </div>
                </div>
              </div>

              {/* Courses */}
              <div className="up-card" id="courses">
                <div className="up-card-title">📚 Courses Offered at {uni.short}</div>

                {totalCourses === 0 ? (
                  <div className="up-no-courses">
                    <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📋</div>
                    <div style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '6px' }}>Course details coming soon</div>
                    <p style={{ margin: 0 }}>Contact EduSpark for the full list of available programmes at {uni.name}.</p>
                  </div>
                ) : (
                  <div>
                    {/* CS Courses by level */}
                    {Object.entries(csByLevel).map(([level, courses]) => {
                      const ls = levelColors[level] || { bg: '#e8f0ff', color: '#1a56c4' };
                      return (
                        <div key={`cs-${level}`} className="up-level-section">
                          <div className="up-level-header">
                            <span className="up-level-badge" style={{ background: ls.bg, color: ls.color }}>
                              🎓 {level}
                            </span>
                            <span className="up-level-count">Computer Science & IT — {courses.length} programme{courses.length !== 1 ? 's' : ''}</span>
                          </div>
                          {courses.map(c => {
                            const isContact = c.offerLetter === 'Contact EduSpark for Details';
                            return (
                              <Link key={c.slug} href={`/courses/computer-science/${c.slug}`} className="up-course-row">
                                <div className="up-course-icon" style={{ background: ls.bg }}>💻</div>
                                <div className="up-course-info">
                                  <div className="up-course-title">{c.title}</div>
                                  <div className="up-course-meta">
                                    <span className="up-course-duration">⏱ {c.duration}</span>
                                    <span className="up-course-spec">{c.specialization}</span>
                                    <span className={isContact ? 'up-course-offer-cond' : 'up-course-offer-free'}>
                                      {isContact ? '📩 Contact' : '✅ Free Offer'}
                                    </span>
                                  </div>
                                </div>
                                <span className="up-course-arrow">›</span>
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Foundation/Diploma Courses by level */}
                    {Object.entries(fdByLevel).map(([level, courses]) => {
                      const ls = levelColors[level] || { bg: '#fff7ed', color: '#c2410c' };
                      return (
                        <div key={`fd-${level}`} className="up-level-section">
                          <div className="up-level-header">
                            <span className="up-level-badge" style={{ background: ls.bg, color: ls.color }}>
                              📘 {level}
                            </span>
                            <span className="up-level-count">Foundation & Pathway — {courses.length} programme{courses.length !== 1 ? 's' : ''}</span>
                          </div>
                          {courses.map(c => {
                            const isFree = c.offerLetter.includes('Free');
                            return (
                              <Link key={c.slug} href={`/courses/foundation-diploma/${c.slug}`} className="up-course-row">
                                <div className="up-course-icon" style={{ background: ls.bg }}>📘</div>
                                <div className="up-course-info">
                                  <div className="up-course-title">{c.title}</div>
                                  <div className="up-course-meta">
                                    <span className="up-course-duration">⏱ {c.duration}</span>
                                    <span className="up-course-spec">{c.field}</span>
                                    <span className={isFree ? 'up-course-offer-free' : 'up-course-offer-cond'}>
                                      {isFree ? '✅ Free Offer' : '📩 Conditional'}
                                    </span>
                                  </div>
                                </div>
                                <span className="up-course-arrow">›</span>
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="up-sidebar">

              {/* Quick Info */}
              <div className="up-info-card">
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '12px' }}>📊 Quick Info</div>
                {([
                  { label: 'Country',      value: `${uni.countryFlag} ${uni.country}` },
                  { label: 'City',         value: uni.city },
                  { label: 'Ranking',      value: uni.ranking || 'Not ranked' },
                  { label: 'Tuition',      value: uni.tuition },
                  { label: 'Offer Letter', value: uni.offerLetter, cls: isFreeLetter ? 'green' : 'amber' },
                  { label: 'Levels',       value: uni.levels.join(' · ') },
                  { label: 'Fields',       value: uni.tags.slice(0, 3).join(', ') + (uni.tags.length > 3 ? '…' : '') },
                ] as { label: string; value: string; cls?: string }[]).map((r, i) => (
                  <div key={i} className="up-info-row">
                    <span className="up-info-label">{r.label}</span>
                    <span className={`up-info-value${r.cls ? ` ${r.cls}` : ''}`}>{r.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="up-info-card">
                <div style={{ fontSize: '0.83rem', color: 'var(--gray)', marginBottom: '12px', lineHeight: 1.6 }}>
                  Get free guidance for applying to {uni.short}.
                </div>
                <Link href="/contact" className="up-apply-btn">Apply Now →</Link>
                <a
                  href={`https://wa.me/601867778759?text=Hi%2C%20I%27m%20interested%20in%20studying%20at%20${encodeURIComponent(uni.name)}.%20Can%20you%20help%20me%20with%20the%20application%3F`}
                  target="_blank" rel="noopener noreferrer"
                  className="up-wa-btn"
                >💬 WhatsApp Us</a>
                <Link href={`/destinations/${uni.countrySlug}`} className="up-dest-btn">
                  🌍 Explore {uni.country}
                </Link>
              </div>

              {/* Levels */}
              <div className="up-info-card">
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '12px' }}>🎓 Degree Levels</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {uni.levels.map(lvl => {
                    const ls = levelColors[lvl] || { bg: '#e8f0ff', color: '#1a56c4' };
                    return (
                      <span key={lvl} style={{ background: ls.bg, color: ls.color, borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {lvl}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* BACK LINKS */}
          <div style={{ marginTop: '28px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href={`/destinations/${uni.countrySlug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--blue)', fontWeight: 600, fontSize: '0.83rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 14px', background: '#fff' }}>
              ← Back to {uni.country}
            </Link>
            <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gray)', fontWeight: 600, fontSize: '0.83rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 14px', background: '#fff' }}>
              ← All Universities
            </Link>
            <Link href="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gray)', fontWeight: 600, fontSize: '0.83rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 14px', background: '#fff' }}>
              🌍 All Destinations
            </Link>
          </div>

        </div>
      </div>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="container">
          <h2>Ready to Apply to {uni.name}?</h2>
          <p>Our advisors handle everything — application, offer letter, and visa — free of charge.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Guidance</Link>
            <Link href={`/destinations/${uni.countrySlug}`} className="btn-outline-w">
              {uni.countryFlag} More in {uni.country}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
