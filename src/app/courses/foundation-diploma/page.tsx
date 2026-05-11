'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { foundationDiplomaCourses } from '@/data/foundationDiplomaCourses';

const ITEMS_PER_PAGE = 10;

const countryColors: Record<string, string> = {
  Malaysia: '#0052cc', Japan: '#bc002d', Singapore: '#e30000',
  'South Korea': '#003478', China: '#de2910', UK: '#012169',
  Germany: '#000000', Netherlands: '#ae1c28', Canada: '#ff0000',
  USA: '#002868', Australia: '#00008b', 'New Zealand': '#00247d',
};

export default function FoundationDiplomaPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return foundationDiplomaCourses;
    return foundationDiplomaCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.university.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.field.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  const getPaginationPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      for (let i = 1; i <= Math.min(5, page + 2); i++) pages.push(i);
      if (page + 2 < totalPages - 1) pages.push('...');
      if (totalPages - 1 > page + 2) pages.push(totalPages - 1);
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <>
      <style>{`
        .cl-page { background: #f8faff; min-height: 100vh; padding: 0 0 60px; }
        .cl-hero { background: linear-gradient(135deg, #0b3d91 0%, #1a56c4 60%, #0d47a1 100%); padding: 48px 0 56px; }
        .cl-hero h1 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; color: #fff; font-family: var(--font-head); margin: 0 0 6px; }
        .cl-hero p { color: rgba(255,255,255,0.7); font-size: 0.88rem; margin: 0; }
        .cl-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
        .cl-breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
        .cl-breadcrumb a:hover { color: #fff; }

        .cl-body { max-width: 860px; margin: 0 auto; padding: 0 24px; }
        .cl-header { display: flex; align-items: center; justify-content: space-between; margin: 32px 0 20px; }
        .cl-title { font-size: 1.1rem; font-weight: 800; color: var(--blue); }
        .cl-count { font-size: 0.82rem; color: var(--gray); }

        /* search */
        .cl-search-wrap { margin-bottom: 20px; }
        .cl-search-input { width: 100%; padding: 11px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 0.88rem; font-family: var(--font-body); color: var(--text); outline: none; box-sizing: border-box; background: #fff; }
        .cl-search-input:focus { border-color: var(--blue); }
        .cl-search-input::placeholder { color: #aab4c4; }

        /* course row */
        .cl-row { background: #fff; border: 1.5px solid #e4ecf8; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px; transition: all 0.25s ease; }
        .cl-row:hover { border-color: var(--blue); box-shadow: 0 4px 20px rgba(11,61,145,0.08); transform: translateY(-1px); }

        .cl-logo { width: 52px; height: 52px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.58rem; font-weight: 900; color: #fff; font-family: var(--font-head); flex-shrink: 0; text-align: center; line-height: 1.2; letter-spacing: 0; }

        .cl-info { flex: 1; min-width: 0; }
        .cl-course-title { font-size: 0.92rem; font-weight: 700; color: var(--blue); margin: 0 0 4px; line-height: 1.35; }
        .cl-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .cl-uni { font-size: 0.75rem; color: var(--gray); display: flex; align-items: center; gap: 4px; }
        .cl-duration { font-size: 0.73rem; color: var(--gray); display: flex; align-items: center; gap: 3px; }
        .cl-offer { font-size: 0.68rem; font-weight: 600; padding: 2px 8px; border-radius: 20px; background: #dcfce7; color: #16a34a; white-space: nowrap; }

        .cl-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .cl-btn-apply { background: var(--blue); color: #fff; border: none; border-radius: 7px; padding: 8px 16px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: var(--font-body); white-space: nowrap; text-decoration: none; display: block; text-align: center; transition: background 0.2s; }
        .cl-btn-apply:hover { background: #0d47a1; }
        .cl-btn-details { background: #fff; color: var(--blue); border: 1.5px solid var(--blue); border-radius: 7px; padding: 7px 16px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: var(--font-body); white-space: nowrap; text-decoration: none; display: block; text-align: center; transition: all 0.2s; }
        .cl-btn-details:hover { background: var(--blue); color: #fff; }

        /* pagination */
        .cl-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 28px; flex-wrap: wrap; gap: 12px; }
        .cl-page-info { font-size: 0.78rem; color: var(--gray); }
        .cl-page-btns { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
        .cl-page-btn { width: 32px; height: 32px; border-radius: 6px; border: 1.5px solid var(--border); background: #fff; color: var(--text); font-size: 0.78rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: var(--font-body); transition: all 0.2s; }
        .cl-page-btn:hover { border-color: var(--blue); color: var(--blue); }
        .cl-page-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; }
        .cl-page-btn.arrow { width: 32px; }
        .cl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* empty */
        .cl-empty { text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; }

        @media (max-width: 600px) {
          .cl-row { flex-wrap: wrap; }
          .cl-actions { flex-direction: row; width: 100%; }
          .cl-btn-apply, .cl-btn-details { flex: 1; }
        }
      `}</style>

      {/* HERO */}
      <div className="cl-hero">
        <div className="cl-body">
          <div className="cl-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/courses">Courses</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>Diploma / Foundation / Pre-U / A-Level</span>
          </div>
          <h1>Diploma / Foundation / Pre-U / A-Level Programs</h1>
          <p>Foundation, diploma and pre-university courses from our partner institutions across 12 countries</p>
        </div>
      </div>

      <div className="cl-page">
        <div className="cl-body">
          <div className="cl-header">
            <div className="cl-title">Course List</div>
            <div className="cl-count">
              Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
            </div>
          </div>

          {/* Search */}
          <div className="cl-search-wrap">
            <input className="cl-search-input" type="text" placeholder="Search courses by name or university..." value={search} onChange={e => handleSearch(e.target.value)} />
          </div>

          {/* Course Rows */}
          {paginated.length > 0 ? paginated.map((c, i) => (
            <div key={i} className="cl-row">
              <div className="cl-logo" style={{ background: countryColors[c.country] || 'var(--blue)' }}>
                {c.universityShort.split(' ').map(w => w[0]).join('').slice(0, 4)}
              </div>
              <div className="cl-info">
                <div className="cl-course-title">{c.title}</div>
                <div className="cl-meta">
                  <span className="cl-uni">{c.countryFlag} {c.university} ({c.universityShort})</span>
                  <span className="cl-duration">⏱ {c.duration} · <span className="cl-offer">Offer Letter: Free</span></span>
                </div>
              </div>
              <div className="cl-actions">
                <Link href="/contact" className="cl-btn-apply">Apply Now</Link>
                <Link href={`/courses/foundation-diploma/${c.slug}`} className="cl-btn-details">Details</Link>
              </div>
            </div>
          )) : (
            <div className="cl-empty">
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '6px' }}>No courses found</div>
              <div style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>Try a different keyword or university name.</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="cl-pagination">
              <div className="cl-page-info">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
              </div>
              <div className="cl-page-btns">
                <button className="cl-page-btn arrow" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {getPaginationPages().map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'var(--gray)' }}>...</span>
                  ) : (
                    <button key={p} className={`cl-page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(Number(p))}>{p}</button>
                  )
                )}
                <button className="cl-page-btn arrow" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
