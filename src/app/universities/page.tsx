'use client';
import { useState } from 'react';
import Link from 'next/link';

const universities = [
  { name: 'Universiti Malaya', short: 'UM', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Bachelor', 'Masters', 'PhD'], tags: ['Medicine', 'Engineering', 'Business', 'Law'] },
  { name: "Taylor's University", short: 'TU', country: 'Malaysia', city: 'Subang Jaya', levels: ['Foundation', 'Bachelor', 'Masters'], tags: ['Hospitality', 'Business', 'Architecture', 'IT'] },
  { name: 'Asia Pacific University', short: 'APU', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Foundation', 'Bachelor', 'Masters'], tags: ['IT', 'Engineering', 'Business', 'Media'] },
  { name: 'Sunway University', short: 'SU', country: 'Malaysia', city: 'Subang Jaya', levels: ['Foundation', 'Bachelor', 'Masters'], tags: ['Business', 'Medicine', 'Science', 'IT'] },
  { name: 'UCSI University', short: 'UCSI', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Foundation', 'Bachelor', 'Masters', 'PhD'], tags: ['Pharmacy', 'Medicine', 'Architecture', 'Music'] },
  { name: 'INTI International', short: 'INTI', country: 'Malaysia', city: 'Nilai', levels: ['Foundation', 'Diploma', 'Bachelor'], tags: ['Business', 'IT', 'Engineering', 'Media'] },
  { name: 'Multimedia University', short: 'MMU', country: 'Malaysia', city: 'Cyberjaya', levels: ['Foundation', 'Bachelor', 'Masters', 'PhD'], tags: ['IT', 'Engineering', 'Media', 'Law'] },
  { name: 'HELP University', short: 'HELP', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Foundation', 'Bachelor', 'Masters'], tags: ['Business', 'Psychology', 'Law', 'IT'] },
  { name: 'University of Birmingham', short: 'UoB', country: 'UK', city: 'Birmingham', levels: ['Bachelor', 'Masters', 'PhD'], tags: ['Engineering', 'Medicine', 'Business', 'Law'] },
  { name: 'University of Manchester', short: 'UoM', country: 'UK', city: 'Manchester', levels: ['Bachelor', 'Masters', 'PhD'], tags: ['Business', 'Engineering', 'Science', 'Arts'] },
  { name: 'University of Toronto', short: 'UofT', country: 'Canada', city: 'Toronto', levels: ['Bachelor', 'Masters', 'PhD'], tags: ['Computer Science', 'Medicine', 'Business', 'Engineering'] },
  { name: 'University of Melbourne', short: 'UoM', country: 'Australia', city: 'Melbourne', levels: ['Bachelor', 'Masters', 'PhD'], tags: ['Medicine', 'Law', 'Business', 'Science'] },
];

const countries = ['All', 'Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Germany'];

export default function UniversitiesPage() {
  const [activeCountry, setActiveCountry] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = universities.filter(u => {
    const matchCountry = activeCountry === 'All' || u.country === activeCountry;
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Partner Institutions</div>
          <h1>Our Partner Universities</h1>
          <p>Browse our network of top-ranked universities across Malaysia and worldwide — find the right fit for you.</p>
        </div>
      </div>

      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          {/* Search + Filter */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 Search university name or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: '240px', maxWidth: '400px' }}
            />
            <div className="tab-nav" style={{ margin: 0 }}>
              {countries.map(c => (
                <button
                  key={c}
                  className={`tab-btn${activeCountry === c ? ' active' : ''}`}
                  onClick={() => setActiveCountry(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p style={{ fontSize: '0.83rem', color: 'var(--gray)', marginBottom: '24px' }}>
            Showing {filtered.length} universities{activeCountry !== 'All' ? ` in ${activeCountry}` : ''}
          </p>

          {/* Grid */}
          <div className="uni-grid">
            {filtered.map((u, i) => (
              <div key={i} className="uni-card">
                <div className="uni-card-logo">{u.short.charAt(0)}</div>
                <h3>{u.name}</h3>
                <p className="uni-location">📍 {u.city}, {u.country}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {u.levels.map(l => (
                    <span key={l} style={{
                      fontSize: '0.7rem', fontWeight: 600, background: 'var(--orange-lt)',
                      color: 'var(--orange2)', padding: '3px 10px', borderRadius: '100px',
                    }}>{l}</span>
                  ))}
                </div>
                <div className="uni-tags">
                  {u.tags.map(t => <span key={t} className="uni-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--gray)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ color: 'var(--blue)', marginBottom: '8px' }}>No universities found</h3>
              <p>Try a different search term or country filter.</p>
            </div>
          )}
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Can't Find What You're Looking For?</h2>
          <p>We have connections to 100+ universities worldwide. Contact us for personalized recommendations.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Ask Our Experts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
