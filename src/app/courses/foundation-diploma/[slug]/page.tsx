import Link from 'next/link';
import { foundationDiplomaCourses } from '@/data/foundationDiplomaCourses';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return foundationDiplomaCourses.map(c => ({ slug: c.slug }));
}

const countryColors: Record<string, string> = {
  Malaysia: '#0052cc', Japan: '#bc002d', Singapore: '#e30000',
  'South Korea': '#003478', China: '#de2910', UK: '#012169',
  Germany: '#000000', Netherlands: '#ae1c28', Canada: '#ff0000',
  USA: '#002868', Australia: '#00008b', 'New Zealand': '#00247d',
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = foundationDiplomaCourses.find(c => c.slug === params.slug);
  if (!course) notFound();

  const related = foundationDiplomaCourses
    .filter(c => c.university === course.university && c.slug !== course.slug)
    .slice(0, 3);

  const logoColor = countryColors[course.country] || '#0b3d91';
  const initials = course.universityShort.split(' ').map((w: string) => w[0]).join('').slice(0, 4);

  return (
    <>
      <style>{`
        .cd-page { background: #f8faff; min-height: 100vh; padding-bottom: 60px; }
        .cd-hero { background: linear-gradient(135deg, #0b3d91 0%, #1a56c4 60%, #0d47a1 100%); padding: 48px 0 60px; }
        .cd-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.6); margin-bottom: 20px; flex-wrap: wrap; }
        .cd-breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
        .cd-breadcrumb a:hover { color: #fff; }
        .cd-hero-inner { display: flex; align-items: flex-start; gap: 24px; }
        .cd-hero-logo { width: 72px; height: 72px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 900; color: #fff; font-family: var(--font-head); flex-shrink: 0; border: 2px solid rgba(255,255,255,0.2); text-align: center; line-height: 1.2; }
        .cd-hero-title { font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 900; color: #fff; font-family: var(--font-head); margin: 0 0 8px; line-height: 1.2; }
        .cd-hero-uni { font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-bottom: 12px; }
        .cd-hero-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        .cd-badge { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 4px 12px; font-size: 0.72rem; color: rgba(255,255,255,0.9); font-weight: 600; }
        .cd-badge.green { background: rgba(34,197,94,0.15); border-color: rgba(34,197,94,0.3); color: #86efac; }

        .cd-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        .cd-layout { display: grid; grid-template-columns: 1fr 300px; gap: 28px; margin-top: -28px; align-items: start; }

        /* main card */
        .cd-main { display: flex; flex-direction: column; gap: 20px; }
        .cd-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 16px; padding: 28px; }
        .cd-card-title { font-size: 1rem; font-weight: 800; color: var(--blue); margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1.5px solid #eef2fb; display: flex; align-items: center; gap: 8px; }
        .cd-desc { font-size: 0.9rem; color: #5a6a7e; line-height: 1.8; margin: 0; }

        /* admission steps */
        .cd-steps { display: flex; flex-direction: column; gap: 12px; }
        .cd-step { display: flex; align-items: flex-start; gap: 12px; }
        .cd-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 0.72rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .cd-step-text { font-size: 0.87rem; color: #5a6a7e; line-height: 1.6; padding-top: 4px; }

        /* highlights */
        .cd-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .cd-highlight { display: flex; align-items: center; gap: 8px; font-size: 0.84rem; color: var(--text); }
        .cd-highlight-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

        /* sidebar */
        .cd-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .cd-info-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 16px; padding: 22px; }
        .cd-info-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f0f4ff; gap: 12px; }
        .cd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .cd-info-label { font-size: 0.75rem; color: var(--gray); font-weight: 600; flex-shrink: 0; }
        .cd-info-value { font-size: 0.82rem; color: var(--text); font-weight: 600; text-align: right; }
        .cd-info-value.green { color: #16a34a; }
        .cd-info-value.orange { color: var(--orange); }

        .cd-apply-btn { display: block; background: var(--orange); color: #fff; border: none; border-radius: 12px; padding: 15px; font-weight: 800; font-size: 0.95rem; cursor: pointer; text-decoration: none; text-align: center; font-family: var(--font-body); transition: all 0.2s; width: 100%; box-sizing: border-box; }
        .cd-apply-btn:hover { background: #e06a00; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,122,0,0.3); }
        .cd-wa-btn { display: block; background: #25d366; color: #fff; border: none; border-radius: 12px; padding: 12px; font-weight: 700; font-size: 0.88rem; cursor: pointer; text-decoration: none; text-align: center; font-family: var(--font-body); transition: all 0.2s; width: 100%; box-sizing: border-box; margin-top: 8px; }
        .cd-wa-btn:hover { background: #22bc5a; }

        .cd-scholarship-card { background: linear-gradient(135deg, #fff8e1, #fff3cd); border: 1.5px solid #fde68a; border-radius: 16px; padding: 22px; }
        .cd-scholarship-title { font-size: 0.88rem; font-weight: 800; color: #92400e; margin-bottom: 10px; }
        .cd-scholarship-text { font-size: 0.8rem; color: #78350f; line-height: 1.65; margin: 0; }

        /* related */
        .cd-related { margin-top: 32px; }
        .cd-related-title { font-size: 1rem; font-weight: 800; color: var(--blue); margin-bottom: 16px; }
        .cd-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .cd-related-card { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 12px; padding: 18px; text-decoration: none; transition: all 0.25s; display: block; }
        .cd-related-card:hover { border-color: var(--blue); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(11,61,145,0.08); }
        .cd-related-card-title { font-size: 0.87rem; font-weight: 700; color: var(--blue); margin-bottom: 6px; line-height: 1.3; }
        .cd-related-card-meta { font-size: 0.72rem; color: var(--gray); }

        @media (max-width: 768px) {
          .cd-layout { grid-template-columns: 1fr; }
          .cd-highlights { grid-template-columns: 1fr; }
          .cd-hero-inner { flex-direction: column; gap: 16px; }
        }
      `}</style>

      {/* HERO */}
      <div className="cd-hero">
        <div className="cd-container">
          <div className="cd-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/courses">Courses</Link>
            <span>›</span>
            <Link href="/courses/foundation-diploma">Foundation / Diploma</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{course.title}</span>
          </div>
          <div className="cd-hero-inner">
            <div className="cd-hero-logo" style={{ background: logoColor }}>{initials}</div>
            <div>
              <h1 className="cd-hero-title">{course.title}</h1>
              <div className="cd-hero-uni">{course.countryFlag} {course.university} · {course.country}</div>
              <div className="cd-hero-badges">
                <span className="cd-badge">📅 {course.duration}</span>
                <span className="cd-badge">🎓 {course.level}</span>
                <span className="cd-badge green">✓ {course.offerLetter}</span>
                <span className="cd-badge">📋 Min: {course.minRequirement}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cd-page">
        <div className="cd-container">
          <div className="cd-layout">

            {/* MAIN */}
            <div className="cd-main">

              {/* About */}
              <div className="cd-card">
                <div className="cd-card-title">📖 About This Program</div>
                <p className="cd-desc">{course.description}</p>
              </div>

              {/* Highlights */}
              {course.highlights && course.highlights.length > 0 && (
                <div className="cd-card">
                  <div className="cd-card-title">⭐ Program Highlights</div>
                  <div className="cd-highlights">
                    {course.highlights.map((h: string, i: number) => (
                      <div key={i} className="cd-highlight">
                        <div className="cd-highlight-dot" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admission Process */}
              <div className="cd-card">
                <div className="cd-card-title">📋 Admission Process</div>
                <div className="cd-steps">
                  {course.admissionProcess.map((step: string, i: number) => (
                    <div key={i} className="cd-step">
                      <div className="cd-step-num">{i + 1}</div>
                      <div className="cd-step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarship */}
              <div className="cd-card">
                <div className="cd-card-title">🏆 Scholarship Information</div>
                <p className="cd-desc">{course.scholarshipInfo}</p>
                <div style={{ marginTop: '16px', padding: '14px 16px', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', marginBottom: '6px' }}>💡 EduSpark Scholarship Support</div>
                  <div style={{ fontSize: '0.8rem', color: '#0c4a6e', lineHeight: 1.6 }}>Our advisors identify every scholarship you qualify for and guide your application from start to finish — at no extra cost.</div>
                </div>
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="cd-sidebar">

              {/* Quick Info */}
              <div className="cd-info-card">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '14px' }}>📊 Quick Info</div>
                {[
                  { label: 'Duration', value: course.duration },
                  { label: 'Level', value: course.level },
                  { label: 'Country', value: `${course.countryFlag} ${course.country}` },
                  { label: 'Tuition Range', value: course.tuitionRange, cls: 'orange' },
                  { label: 'Offer Letter', value: '✓ Free Official', cls: 'green' },
                  { label: 'Min. Requirement', value: course.minRequirement },
                ].map((r, i) => (
                  <div key={i} className="cd-info-row">
                    <span className="cd-info-label">{r.label}</span>
                    <span className={`cd-info-value${r.cls ? ` ${r.cls}` : ''}`}>{r.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="cd-info-card">
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '14px', lineHeight: 1.6 }}>
                  Ready to apply or have questions? Our advisors are available now.
                </div>
                <Link href="/contact" className="cd-apply-btn">Apply Now →</Link>
                <a href={`https://wa.me/8801867778759?text=Hi, I'm interested in ${course.title} at ${course.university}. Can you help me apply?`} target="_blank" rel="noopener noreferrer" className="cd-wa-btn">
                  💬 WhatsApp Us
                </a>
              </div>

              {/* Scholarship card */}
              <div className="cd-scholarship-card">
                <div className="cd-scholarship-title">🎓 Scholarship Available</div>
                <p className="cd-scholarship-text">{course.scholarshipInfo.slice(0, 120)}... <Link href="/contact" style={{ color: '#92400e', fontWeight: 700 }}>Check eligibility →</Link></p>
              </div>

            </div>
          </div>

          {/* Related Courses */}
          {related.length > 0 && (
            <div className="cd-related">
              <div className="cd-related-title">More from {course.university}</div>
              <div className="cd-related-grid">
                {related.map((r, i) => (
                  <Link key={i} href={`/courses/foundation-diploma/${r.slug}`} className="cd-related-card">
                    <div className="cd-related-card-title">{r.title}</div>
                    <div className="cd-related-card-meta">⏱ {r.duration} · {r.level}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back links */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/courses/foundation-diploma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--blue)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 16px', background: '#fff' }}>
              ← Back to Course List
            </Link>
            <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gray)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 16px', background: '#fff' }}>
              ← All Programs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
