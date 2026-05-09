'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const courses = [
  {
    icon: '🎓', title: 'Diploma / Foundation / Pre-U / A-Level Programs',
    desc: 'Kickstart your higher education journey with a strong academic foundation. Prepare for degree programs in your chosen field while building essential skills and knowledge.',
    duration: '1–2 Years', level: 'Foundation',
    field: 'General',
    tags: ['Business Foundations', 'Science & Technology', 'Arts & Design', 'Engineering'],
  },
  {
    icon: '💻', title: 'Computer Science & IT',
    desc: 'From software engineering to artificial intelligence and cybersecurity — prepare for the most in-demand tech careers at top universities worldwide.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Technology',
    tags: ['Software Engineering', 'AI & Machine Learning', 'Cybersecurity', 'Data Science'],
  },
  {
    icon: '⚙️', title: 'Engineering',
    desc: 'Civil, mechanical, electrical, and chemical engineering programs at top-ranked universities. Build the infrastructure of tomorrow.',
    duration: '4 Years', level: 'Bachelor',
    field: 'Engineering',
    tags: ['Civil Engineering', 'Mechanical', 'Electrical', 'Chemical Engineering'],
  },
  {
    icon: '💼', title: 'Business & Management',
    desc: 'MBA, BBA and specialized business degrees to launch your career in global commerce, finance and entrepreneurship.',
    duration: '1–4 Years', level: 'Bachelor',
    field: 'Business',
    tags: ['BBA', 'MBA', 'Finance', 'Marketing'],
  },
  {
    icon: '⚕️', title: 'Medicine & Health Sciences',
    desc: 'MBBS, pharmacy, nursing and allied health programs at internationally recognized universities with strong clinical placements.',
    duration: '4–5 Years', level: 'Bachelor',
    field: 'Medicine',
    tags: ['MBBS', 'Pharmacy', 'Nursing', 'Physiotherapy'],
  },
  {
    icon: '⚖️', title: 'Law',
    desc: 'LLB and LLM programs preparing you for legal careers in Malaysia, UK, and international jurisdictions with top faculty.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Law',
    tags: ['LLB', 'LLM', 'International Law', 'Corporate Law'],
  },
  {
    icon: '🎨', title: 'Architecture & Design',
    desc: 'Creative and technical degrees in architecture, interior design, graphic design, and industrial design at leading institutions.',
    duration: '4–5 Years', level: 'Bachelor',
    field: 'Arts & Design',
    tags: ['Architecture', 'Interior Design', 'Graphic Design', 'Industrial Design'],
  },
  {
    icon: '✈️', title: 'Hospitality & Tourism',
    desc: "World-class hospitality, hotel management and tourism degrees — ideal for Malaysia's booming tourism and service industry.",
    duration: '3 Years', level: 'Diploma',
    field: 'Hospitality',
    tags: ['Hotel Management', 'Tourism', 'Event Management', 'Culinary Arts'],
  },
  {
    icon: '📊', title: 'Accounting & Finance',
    desc: 'ACCA, CPA-track degrees and finance programs to build a career in accounting, banking and investment management.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Business',
    tags: ['ACCA', 'CPA', 'Banking', 'Investment'],
  },
  {
    icon: '🔬', title: 'Science & Research',
    desc: 'Biology, chemistry, physics, environmental science and biotechnology programs at research-intensive universities.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Science',
    tags: ['Biology', 'Chemistry', 'Biotechnology', 'Physics'],
  },
  {
    icon: '📡', title: 'Mass Communication & Media',
    desc: 'Journalism, broadcasting, digital media, and public relations degrees for careers in the fast-evolving media landscape.',
    duration: '3 Years', level: 'Bachelor',
    field: 'Media',
    tags: ['Journalism', 'Broadcasting', 'Digital Media', 'Public Relations'],
  },
  {
    icon: '🏫', title: 'Education & Teaching',
    desc: 'TESL, early childhood, and education management degrees for those passionate about shaping future generations.',
    duration: '4 Years', level: 'Bachelor',
    field: 'Education',
    tags: ['TESL', 'Early Childhood', 'Education Management'],
  },
  {
    icon: '🌱', title: 'Environmental & Agriculture',
    desc: 'Sustainable agriculture, environmental management and food science degrees addressing global climate challenges.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Science',
    tags: ['Agriculture', 'Environmental Science', 'Food Science'],
  },
  {
    icon: '🧠', title: 'Psychology & Social Sciences',
    desc: 'Understand human behaviour and society through psychology, sociology, and social work programs at renowned universities.',
    duration: '3–4 Years', level: 'Bachelor',
    field: 'Social Sciences',
    tags: ['Psychology', 'Sociology', 'Social Work', 'Counselling'],
  },
  {
    icon: '🎓', title: 'Postgraduate & Masters Programs',
    desc: 'Advance your career with specialized Masters and MBA programs across all disciplines at globally ranked institutions.',
    duration: '1–2 Years', level: 'Masters',
    field: 'General',
    tags: ['MBA', 'MSc', 'MA', 'MPhil'],
  },
  {
    icon: '🔭', title: 'PhD & Doctoral Research',
    desc: 'Pursue cutting-edge research under world-class supervisors. Fully funded scholarships available at many partner universities.',
    duration: '3–5 Years', level: 'PhD',
    field: 'General',
    tags: ['Research', 'Scholarship', 'Academia', 'Innovation'],
  },
];

const LEVELS = ['All Levels', 'Diploma', 'Foundation', 'Bachelor', 'Masters', 'PhD'];
const FIELDS = ['All Fields', 'Technology', 'Engineering', 'Business', 'Medicine', 'Law', 'Arts & Design', 'Hospitality', 'Science', 'Media', 'Education', 'Social Sciences', 'General'];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All Levels');
  const [field, setField] = useState('All Fields');

  const filtered = useMemo(() => courses.filter(c => {
    const q = search.toLowerCase();
    if (q && !c.title.toLowerCase().includes(q) && !c.desc.toLowerCase().includes(q) && !c.tags.some(t => t.toLowerCase().includes(q))) return false;
    if (level !== 'All Levels' && c.level !== level) return false;
    if (field !== 'All Fields' && c.field !== field) return false;
    return true;
  }), [search, level, field]);

  const clearAll = () => { setSearch(''); setLevel('All Levels'); setField('All Fields'); };
  const hasFilters = search || level !== 'All Levels' || field !== 'All Fields';

  return (
    <>
      <style>{`
        .courses-hero {
          background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 60%, var(--blue-mid) 100%);
          padding: 72px 0 100px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .courses-hero h1 {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          color: #fff;
          font-family: var(--font-head);
          margin: 0 0 14px;
        }
        .courses-hero p {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* floating search bar */
        .courses-search-wrap {
          max-width: 900px;
          margin: -36px auto 0;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }
        .courses-search-bar {
          background: #fff;
          border-radius: 60px;
          box-shadow: 0 8px 48px rgba(11,61,145,0.15);
          display: flex;
          align-items: center;
          padding: 8px 8px 8px 24px;
          gap: 0;
        }
        .courses-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.95rem;
          font-family: var(--font-body);
          color: var(--text);
          background: transparent;
          padding: 10px 0;
          min-width: 0;
        }
        .courses-search-input::placeholder { color: #aab4c4; }
        .courses-divider {
          width: 1px;
          height: 32px;
          background: var(--border);
          margin: 0 2px;
          flex-shrink: 0;
        }
        .courses-select {
          border: none;
          outline: none;
          font-size: 0.88rem;
          font-family: var(--font-body);
          color: var(--text);
          background: transparent;
          padding: 10px 32px 10px 16px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          min-width: 130px;
          font-weight: 500;
        }
        .courses-search-btn {
          background: var(--orange);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 13px 28px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          font-family: var(--font-body);
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .courses-search-btn:hover { background: #e06a00; transform: scale(1.02); }

        /* programs section */
        .courses-section {
          background: #f8faff;
          padding: 64px 0 72px;
        }

        /* course cards grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* card — matches screenshot 2 */
        .course-card-new {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .course-card-new:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(11,61,145,0.1);
          border-color: var(--blue);
        }
        .course-card-icon {
          font-size: 2.2rem;
          line-height: 1;
          margin-bottom: 4px;
        }
        .course-card-title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--blue);
          line-height: 1.35;
          margin: 0;
        }
        .course-card-desc {
          font-size: 0.86rem;
          color: #5a6a7e;
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }
        .course-card-duration {
          display: inline-flex;
          align-items: center;
          background: #f0f4ff;
          border-radius: 20px;
          padding: 5px 13px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--blue);
          width: fit-content;
        }
        .course-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .course-card-tag {
          background: #f0f4ff;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3a5a9a;
          border: 1px solid #dce6f5;
        }
        .course-card-link {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--blue);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
          transition: gap 0.2s;
        }
        .course-card-link:hover { gap: 8px; }

        /* empty state */
        .courses-empty {
          text-align: center;
          padding: 80px 20px;
          grid-column: 1 / -1;
        }

        @media (max-width: 680px) {
          .courses-search-bar { flex-direction: column; border-radius: 20px; padding: 16px; align-items: stretch; gap: 10px; }
          .courses-divider { display: none; }
          .courses-select { background-color: #f8faff; border-radius: 10px; border: 1.5px solid var(--border); }
          .courses-search-btn { border-radius: 12px; }
          .courses-search-wrap { margin-top: -20px; }
        }
      `}</style>

      {/* HERO */}
      <div className="courses-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Find Your Perfect Course</h1>
          <p>Hundreds of programs across 20+ disciplines at top-ranked universities in Malaysia and worldwide.</p>
        </div>
      </div>

      {/* FLOATING SEARCH BAR */}
      <div className="courses-search-wrap">
        <div className="courses-search-bar">
          <input
            className="courses-search-input"
            type="text"
            placeholder="Search by course, university, or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="courses-divider" />
          <select className="courses-select" value={level} onChange={e => setLevel(e.target.value)}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <div className="courses-divider" />
          <select className="courses-select" value={field} onChange={e => setField(e.target.value)}>
            {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <button className="courses-search-btn" onClick={() => {}}>Search Programs</button>
        </div>
      </div>

      {/* PROGRAMS SECTION */}
      <section className="courses-section">
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '40px' }}>
            <div className="section-tag">All Disciplines</div>
            <h2 className="section-title">Available Programs</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We help you apply to programs in every major field of study. Click any card to learn more or contact us.
            </p>
            {hasFilters && (
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
                  Showing <strong style={{ color: 'var(--blue)' }}>{filtered.length}</strong> of {courses.length} programs
                </span>
                <button onClick={clearAll} style={{ fontSize: '0.8rem', color: 'var(--orange)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'underline' }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="courses-grid">
            {filtered.length > 0 ? filtered.map((c, i) => (
              <div key={i} className="course-card-new">
                <div className="course-card-icon">{c.icon}</div>
                <h3 className="course-card-title">{c.title}</h3>
                <p className="course-card-desc">{c.desc}</p>
                <div className="course-card-duration">{c.duration}</div>
                <div className="course-card-tags">
                  {c.tags.map(t => <span key={t} className="course-card-tag">{t}</span>)}
                </div>
                <Link href="/contact" className="course-card-link">
                  Explore Programs →
                </Link>
              </div>
            )) : (
              <div className="courses-empty">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ color: 'var(--blue)', marginBottom: '8px' }}>No programs found</h3>
                <p style={{ color: 'var(--gray)', marginBottom: '20px' }}>Try a different keyword, level, or field.</p>
                <button onClick={clearAll} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP OPPORTUNITIES */}
      <section style={{ background: '#eef2fb', padding: '80px 0' }}>
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '48px' }}>
            <div className="section-tag" style={{ background: 'rgba(255,122,0,0.12)', color: 'var(--orange)' }}>Financial Support</div>
            <h2 className="section-title">Scholarship Opportunities</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Many of our partner universities offer merit-based and need-based scholarships. We help you find and apply.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {[
              {
                icon: '🏆',
                title: 'Merit Scholarships',
                desc: 'Awarded based on academic excellence. Students with strong SPM, A-Level, or equivalent results often qualify for up to 50% tuition reduction.',
                link: '/contact',
              },
              {
                icon: '🌍',
                title: 'International Student Grants',
                desc: 'Dedicated funding for international students from developing countries. Available at 12+ of our Malaysian partner universities.',
                link: '/contact',
              },
              {
                icon: '🎖️',
                title: 'Government Scholarships',
                desc: 'Bangladesh and Malaysian government-funded programs for deserving students. We guide you through every application step.',
                link: '/contact',
              },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1.5px solid #dde6f5',
                borderRadius: '18px',
                padding: '36px 28px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.3s ease',
              }}
                onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(11,61,145,0.1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.borderColor = '#dde6f5'; }}
              >
                <div style={{
                  width: '68px', height: '68px',
                  background: 'linear-gradient(135deg, #e8efff, #d4e2ff)',
                  borderRadius: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--blue)', margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: '0.87rem', color: '#5a6a7e', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/contact" style={{
              display: 'inline-block',
              background: 'var(--orange)',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e06a00'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--orange)'; (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
            >
              Check My Scholarship Eligibility →
            </Link>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Not Sure Which Course is Right for You?</h2>
          <p>Our expert counselors will assess your profile and suggest the best academic pathway.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Course Advice</Link>
            <Link href="/universities" className="btn-outline-w">🏛️ Browse Universities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
