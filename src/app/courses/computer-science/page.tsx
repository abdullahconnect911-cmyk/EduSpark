'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { csItCourses, CS_COUNTRIES, CS_LEVELS, CS_SPECIALIZATIONS } from '@/data/csItCourses';

const ITEMS_PER_PAGE = 10;

const countryColors: Record<string, string> = {
  Malaysia: '#0052cc',
  Japan: '#bc002d',
  Singapore: '#e30000',
  'South Korea': '#003478',
  China: '#de2910',
  'United Kingdom': '#012169',
  Germany: '#1a1a1a',
  Netherlands: '#ae1c28',
  Canada: '#d80621',
  USA: '#002868',
  'New Zealand': '#00247d',
};

const levelColors: Record<string, { bg: string; color: string }> = {
  Bachelor: { bg: '#e8f0ff', color: '#1a56c4' },
  Master:   { bg: '#fef3c7', color: '#b45309' },
  PhD:      { bg: '#fce7f3', color: '#be185d' },
};

export default function ComputerSciencePage() {
  const [search, setSearch]           = useState('');
  const [country, setCountry]         = useState('All Countries');
  const [level, setLevel]             = useState('All Levels');
  const [specialization, setSpec]     = useState('All Specializations');
  const [page, setPage]               = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return csItCourses.filter(c => {
      if (country !== 'All Countries' && c.country !== country) return false;
      if (level !== 'All Levels' && c.level !== level) return false;
      if (specialization !== 'All Specializations' && c.specialization !== specialization) return false;
      if (q && !c.title.toLowerCase().includes(q) &&
               !c.university.toLowerCase().includes(q) &&
               !c.city.toLowerCase().includes(q) &&
               !c.description.toLowerCase().includes(q) &&
               !c.specialization.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, country, level, specialization]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const hasFilters = search || country !== 'All Countries' || level !== 'All Levels' || specialization !== 'All Specializations';

  const handleFilter = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setPage(1);
  };

  const clearAll = () => {
    setSearch(''); setCountry('All Countries');
    setLevel('All Levels'); setSpec('All Specializations');
    setPage(1);
  };

  const getPaginationPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      <style>{`
        /* ── PAGE SHELL ─────────────────────────────────────────────── */
        .cs-page { background: #f4f7fd; min-height: 100vh; padding-bottom: 72px; }

        /* ── HERO ───────────────────────────────────────────────────── */
        .cs-hero {
          background: linear-gradient(135deg, #0b3d91 0%, #1565c0 55%, #0d47a1 100%);
          padding: 52px 0 64px;
          position: relative;
          overflow: hidden;
        }
        .cs-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .cs-hero::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -40px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          pointer-events: none;
        }

        .cs-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; color: rgba(255,255,255,0.55);
          margin-bottom: 20px; flex-wrap: wrap;
        }
        .cs-breadcrumb a { color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.2s; }
        .cs-breadcrumb a:hover { color: #fff; }
        .cs-breadcrumb span { color: rgba(255,255,255,0.4); }

        .cs-hero-top { display: flex; align-items: flex-start; gap: 20px; }
        .cs-hero-icon {
          width: 60px; height: 60px; flex-shrink: 0;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.7rem;
        }
        .cs-hero-text h1 {
          font-size: clamp(1.4rem, 3vw, 2.1rem);
          font-weight: 900; color: #fff;
          font-family: var(--font-head);
          margin: 0 0 6px; line-height: 1.2;
        }
        .cs-hero-text p { color: rgba(255,255,255,0.68); font-size: 0.88rem; margin: 0; line-height: 1.6; }

        .cs-hero-stats {
          display: flex; gap: 24px; margin-top: 24px; flex-wrap: wrap;
        }
        .cs-hero-stat { text-align: left; }
        .cs-hero-stat-num {
          font-size: 1.5rem; font-weight: 900;
          color: #fff; font-family: var(--font-head); line-height: 1;
        }
        .cs-hero-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.55); margin-top: 2px; }

        /* ── BODY ───────────────────────────────────────────────────── */
        .cs-body { max-width: 900px; margin: 0 auto; padding: 0 24px; }

        /* ── FILTER BAR ─────────────────────────────────────────────── */
        .cs-filters-wrap {
          background: #fff;
          border: 1.5px solid #dde6f5;
          border-radius: 16px;
          padding: 20px 22px;
          margin-top: -28px;
          position: relative;
          z-index: 10;
          box-shadow: 0 4px 24px rgba(11,61,145,0.08);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .cs-search-row {
          display: flex; align-items: center;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          background: #fafbff;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .cs-search-row:focus-within { border-color: var(--blue); }
        .cs-search-icon { padding: 0 10px 0 14px; color: #aab4c4; font-size: 1rem; flex-shrink: 0; }
        .cs-search-input {
          flex: 1; border: none; outline: none;
          padding: 11px 6px; font-size: 0.88rem;
          font-family: var(--font-body); color: var(--text);
          background: transparent;
        }
        .cs-search-input::placeholder { color: #aab4c4; }
        .cs-search-clear {
          padding: 0 12px; color: #aab4c4; cursor: pointer;
          font-size: 1rem; background: none; border: none;
          font-family: var(--font-body); transition: color 0.2s;
        }
        .cs-search-clear:hover { color: var(--blue); }

        .cs-filter-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .cs-select-wrap { flex: 1; min-width: 160px; position: relative; }
        .cs-select-wrap::after {
          content: '▾'; position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%); color: #aab4c4;
          font-size: 0.75rem; pointer-events: none;
        }
        .cs-select {
          width: 100%; padding: 9px 32px 9px 12px;
          border: 1.5px solid var(--border); border-radius: 9px;
          font-size: 0.84rem; font-family: var(--font-body);
          color: var(--text); background: #fafbff;
          outline: none; cursor: pointer; appearance: none;
          transition: border-color 0.2s;
        }
        .cs-select:focus { border-color: var(--blue); }

        .cs-filter-meta {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .cs-result-count { font-size: 0.8rem; color: var(--gray); }
        .cs-result-count strong { color: var(--blue); font-weight: 800; }
        .cs-clear-btn {
          font-size: 0.78rem; color: var(--orange); font-weight: 700;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); text-decoration: underline;
          padding: 0;
        }

        /* ── ACTIVE FILTER PILLS ─────────────────────────────────────── */
        .cs-active-filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .cs-filter-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: #eef2fb; border: 1.5px solid #d0dcf5;
          border-radius: 20px; padding: 3px 10px;
          font-size: 0.72rem; color: var(--blue); font-weight: 700;
        }
        .cs-pill-remove {
          background: none; border: none; cursor: pointer;
          color: var(--blue); font-size: 0.85rem; padding: 0;
          line-height: 1; font-family: var(--font-body);
        }

        /* ── SECTION HEADER ─────────────────────────────────────────── */
        .cs-list-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin: 28px 0 14px;
        }
        .cs-list-title { font-size: 1rem; font-weight: 800; color: var(--blue); }
        .cs-list-sub { font-size: 0.78rem; color: var(--gray); }

        /* ── COURSE ROW ─────────────────────────────────────────────── */
        .cs-row {
          background: #fff;
          border: 1.5px solid #e4ecf8;
          border-radius: 14px;
          padding: 18px 20px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.22s ease;
          text-decoration: none;
        }
        .cs-row:hover {
          border-color: var(--blue);
          box-shadow: 0 6px 24px rgba(11,61,145,0.09);
          transform: translateY(-2px);
        }

        .cs-logo {
          width: 52px; height: 52px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 900; color: #fff;
          font-family: var(--font-head); flex-shrink: 0;
          text-align: center; line-height: 1.2; letter-spacing: 0.3px;
        }

        .cs-info { flex: 1; min-width: 0; }
        .cs-course-title {
          font-size: 0.92rem; font-weight: 700;
          color: var(--blue); margin: 0 0 6px; line-height: 1.35;
        }
        .cs-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .cs-uni { font-size: 0.74rem; color: #5a6a7e; display: flex; align-items: center; gap: 4px; }
        .cs-sep { color: #d0d8e8; }
        .cs-duration { font-size: 0.72rem; color: #7a8a9e; display: flex; align-items: center; gap: 3px; }
        .cs-level-badge {
          font-size: 0.68rem; font-weight: 700;
          padding: 2px 8px; border-radius: 20px;
          white-space: nowrap;
        }
        .cs-spec-badge {
          font-size: 0.67rem; font-weight: 600;
          padding: 2px 8px; border-radius: 20px;
          background: #f1f5f9; color: #64748b;
          white-space: nowrap;
        }
        .cs-offer-badge {
          font-size: 0.67rem; font-weight: 600;
          padding: 2px 8px; border-radius: 20px;
          background: #dcfce7; color: #16a34a;
          white-space: nowrap;
        }
        .cs-offer-badge.contact {
          background: #fff7ed; color: #c2410c;
        }

        .cs-actions {
          display: flex; flex-direction: column;
          gap: 6px; flex-shrink: 0;
        }
        .cs-btn-apply {
          background: var(--blue); color: #fff; border: none;
          border-radius: 8px; padding: 8px 16px;
          font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-body);
          white-space: nowrap; text-decoration: none;
          display: block; text-align: center;
          transition: background 0.2s;
        }
        .cs-btn-apply:hover { background: #0d47a1; }
        .cs-btn-details {
          background: #fff; color: var(--blue);
          border: 1.5px solid var(--blue); border-radius: 8px;
          padding: 7px 16px; font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-body);
          white-space: nowrap; text-decoration: none;
          display: block; text-align: center;
          transition: all 0.2s;
        }
        .cs-btn-details:hover { background: var(--blue); color: #fff; }

        /* ── EMPTY STATE ─────────────────────────────────────────────── */
        .cs-empty {
          text-align: center; padding: 64px 20px;
          background: #fff; border-radius: 14px;
          border: 1.5px solid #e4ecf8;
        }

        /* ── PAGINATION ──────────────────────────────────────────────── */
        .cs-pagination {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: 28px; flex-wrap: wrap; gap: 12px;
        }
        .cs-page-info { font-size: 0.78rem; color: var(--gray); }
        .cs-page-btns { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
        .cs-page-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid var(--border); background: #fff;
          color: var(--text); font-size: 0.78rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-family: var(--font-body);
          transition: all 0.18s;
        }
        .cs-page-btn:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); }
        .cs-page-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; }
        .cs-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ── RESPONSIVE ──────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .cs-row { flex-wrap: wrap; gap: 12px; }
          .cs-actions { flex-direction: row; width: 100%; }
          .cs-btn-apply, .cs-btn-details { flex: 1; }
          .cs-filter-row { flex-direction: column; }
          .cs-select-wrap { min-width: 100%; }
          .cs-hero-stats { gap: 16px; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="cs-hero">
        <div className="cs-body">
          <div className="cs-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/courses">Courses</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>Computer Science &amp; IT</span>
          </div>

          <div className="cs-hero-top">
            <div className="cs-hero-icon">💻</div>
            <div className="cs-hero-text">
              <h1>Computer Science &amp; IT Programs</h1>
              <p>
                Software engineering, AI, cybersecurity, data science &amp; more —<br />
                at top universities across 11 countries worldwide.
              </p>
            </div>
          </div>

          <div className="cs-hero-stats">
            <div className="cs-hero-stat">
              <div className="cs-hero-stat-num">{csItCourses.length}+</div>
              <div className="cs-hero-stat-label">Programs Listed</div>
            </div>
            <div className="cs-hero-stat">
              <div className="cs-hero-stat-num">11</div>
              <div className="cs-hero-stat-label">Countries</div>
            </div>
            <div className="cs-hero-stat">
              <div className="cs-hero-stat-num">80+</div>
              <div className="cs-hero-stat-label">Universities</div>
            </div>
            <div className="cs-hero-stat">
              <div className="cs-hero-stat-num">3</div>
              <div className="cs-hero-stat-label">Degree Levels</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <div className="cs-page">
        <div className="cs-body">

          {/* ── FILTER CARD ───────────────────────────────────────────── */}
          <div className="cs-filters-wrap">

            {/* Search */}
            <div className="cs-search-row">
              <span className="cs-search-icon">🔍</span>
              <input
                className="cs-search-input"
                type="text"
                placeholder="Search by course name, university, city or keyword…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              {search && (
                <button className="cs-search-clear" onClick={() => { setSearch(''); setPage(1); }}>✕</button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="cs-filter-row">
              <div className="cs-select-wrap">
                <select className="cs-select" value={country} onChange={e => handleFilter(setCountry)(e.target.value)}>
                  <option value="All Countries">🌏 All Countries</option>
                  {CS_COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="cs-select-wrap">
                <select className="cs-select" value={level} onChange={e => handleFilter(setLevel)(e.target.value)}>
                  <option value="All Levels">🎓 All Levels</option>
                  {CS_LEVELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="cs-select-wrap">
                <select className="cs-select" value={specialization} onChange={e => handleFilter(setSpec)(e.target.value)}>
                  <option value="All Specializations">💡 All Specializations</option>
                  {CS_SPECIALIZATIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter pills + result count */}
            <div className="cs-filter-meta">
              <div className="cs-result-count">
                Showing <strong>{filtered.length}</strong> of {csItCourses.length} programs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {/* Pills */}
                <div className="cs-active-filters">
                  {country !== 'All Countries' && (
                    <span className="cs-filter-pill">
                      {country}
                      <button className="cs-pill-remove" onClick={() => handleFilter(setCountry)('All Countries')}>✕</button>
                    </span>
                  )}
                  {level !== 'All Levels' && (
                    <span className="cs-filter-pill">
                      {level}
                      <button className="cs-pill-remove" onClick={() => handleFilter(setLevel)('All Levels')}>✕</button>
                    </span>
                  )}
                  {specialization !== 'All Specializations' && (
                    <span className="cs-filter-pill">
                      {specialization}
                      <button className="cs-pill-remove" onClick={() => handleFilter(setSpec)('All Specializations')}>✕</button>
                    </span>
                  )}
                </div>
                {hasFilters && (
                  <button className="cs-clear-btn" onClick={clearAll}>Clear all</button>
                )}
              </div>
            </div>
          </div>

          {/* ── LIST HEADER ───────────────────────────────────────────── */}
          <div className="cs-list-header">
            <div className="cs-list-title">Course List</div>
            <div className="cs-list-sub">
              {filtered.length > 0
                ? `Showing ${(page - 1) * ITEMS_PER_PAGE + 1}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length}`
                : '0 results'}
            </div>
          </div>

          {/* ── ROWS ──────────────────────────────────────────────────── */}
          {paginated.length > 0 ? paginated.map((c) => {
            const logoColor  = countryColors[c.country] || '#0b3d91';
            const initials   = c.universityShort.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 4).toUpperCase();
            const lvlStyle   = levelColors[c.level] || { bg: '#e8f0ff', color: '#1a56c4' };
            const isContact  = c.offerLetter === 'Contact EduSpark for Details';

            return (
              <div key={c.slug} className="cs-row">
                {/* Logo */}
                <div className="cs-logo" style={{ background: logoColor }}>
                  {initials}
                </div>

                {/* Info */}
                <div className="cs-info">
                  <div className="cs-course-title">{c.title}</div>
                  <div className="cs-meta">
                    <span className="cs-uni">{c.countryFlag} {c.university}</span>
                    <span className="cs-sep">·</span>
                    <span className="cs-duration">⏱ {c.duration}</span>
                    <span className="cs-sep">·</span>
                    <span className="cs-level-badge" style={{ background: lvlStyle.bg, color: lvlStyle.color }}>
                      {c.level}
                    </span>
                    <span className="cs-spec-badge">{c.specialization}</span>
                    <span className={`cs-offer-badge${isContact ? ' contact' : ''}`}>
                      {isContact ? '📩 Contact for Offer' : '✅ Free Offer Letter'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="cs-actions">
                  <Link href="/contact" className="cs-btn-apply">Apply Now</Link>
                  <Link href={`/courses/computer-science/${c.slug}`} className="cs-btn-details">Details</Link>
                </div>
              </div>
            );
          }) : (
            <div className="cs-empty">
              <div style={{ fontSize: '2.8rem', marginBottom: '14px' }}>🔍</div>
              <div style={{ fontWeight: 800, color: 'var(--blue)', marginBottom: '8px', fontSize: '1rem' }}>
                No programs found
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '0.86rem', marginBottom: '20px' }}>
                Try a different keyword, country, level, or specialization.
              </div>
              <button
                onClick={clearAll}
                style={{
                  background: 'var(--blue)', color: '#fff', border: 'none',
                  borderRadius: '10px', padding: '10px 24px',
                  fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* ── PAGINATION ────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="cs-pagination">
              <div className="cs-page-info">
                Page {page} of {totalPages}
              </div>
              <div className="cs-page-btns">
                <button
                  className="cs-page-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >‹</button>

                {getPaginationPages().map((p, i) =>
                  p === '...' ? (
                    <span key={`e-${i}`} style={{ padding: '0 4px', color: 'var(--gray)', fontSize: '0.82rem' }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`cs-page-btn${page === Number(p) ? ' active' : ''}`}
                      onClick={() => setPage(Number(p))}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  className="cs-page-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >›</button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <div className="cta-band">
        <div className="container">
          <h2>Not Sure Which CS Program is Right for You?</h2>
          <p>Our advisors will match you with the best university and specialization based on your profile.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Counselling</Link>
            <Link href="/universities" className="btn-outline-w">🏛️ Browse Universities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
