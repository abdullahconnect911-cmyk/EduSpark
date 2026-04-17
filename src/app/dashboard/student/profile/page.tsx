'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'personal' | 'academic' | 'security'>('personal');

  const [personal, setPersonal] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+880 17XXXXXXXX',
    nationality: 'Bangladeshi',
    dateOfBirth: '2001-05-15',
    country: 'Bangladesh',
    address: 'Dhaka, Bangladesh',
  });

  const [academic, setAcademic] = useState({
    highestEducation: 'HSC / A-Level',
    institution: 'Dhaka College',
    gpa: '5.00',
    passingYear: '2022',
    englishProficiency: 'MOI Letter',
    preferredCountry: 'Malaysia',
    preferredCourse: 'Computer Science',
    budget: '$500–$800',
    intake: 'July 2026',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production: await fetch('/api/profile', { method: 'PUT', body: JSON.stringify({ ...personal, ...academic }) })
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = session?.user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>My Profile</h1>
          <p>Keep your information up to date so your counselor can best assist you.</p>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="dash-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--blue)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>{session?.user?.name}</h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.87rem', marginBottom: '8px' }}>{session?.user?.email}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: '100px' }}>🎓 Student</span>
              <span style={{ background: 'var(--orange-lt)', color: 'var(--orange2)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: '100px' }}>🇲🇾 Malaysia Bound</span>
              <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: '100px' }}>✅ Profile Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tab-nav">
        {(['personal', 'academic', 'security'] as const).map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'personal' ? '👤 Personal Info' : t === 'academic' ? '🎓 Academic Info' : '🔒 Security'}
          </button>
        ))}
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          <span>✅</span><span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="dash-card">
          {tab === 'personal' && (
            <>
              <div className="profile-section-title">Personal Information</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" value={personal.name} onChange={e => setPersonal(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" value={personal.email} disabled style={{ opacity: 0.7 }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '5px' }}>Email cannot be changed. Contact support if needed.</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-input" value={personal.dateOfBirth} onChange={e => setPersonal(p => ({ ...p, dateOfBirth: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Nationality</label>
                  <select className="form-select" value={personal.nationality} onChange={e => setPersonal(p => ({ ...p, nationality: e.target.value }))}>
                    <option>Bangladeshi</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Current Address</label>
                <input className="form-input" value={personal.address} onChange={e => setPersonal(p => ({ ...p, address: e.target.value }))} placeholder="City, Country" />
              </div>
            </>
          )}

          {tab === 'academic' && (
            <>
              <div className="profile-section-title">Academic Background</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Highest Education</label>
                  <select className="form-select" value={academic.highestEducation} onChange={e => setAcademic(p => ({ ...p, highestEducation: e.target.value }))}>
                    {['SSC / O-Level', 'HSC / A-Level', 'Diploma', "Bachelor's Degree", "Master's Degree"].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Institution Name</label>
                  <input className="form-input" value={academic.institution} onChange={e => setAcademic(p => ({ ...p, institution: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">GPA / Result</label>
                  <input className="form-input" value={academic.gpa} onChange={e => setAcademic(p => ({ ...p, gpa: e.target.value }))} placeholder="e.g. 5.00 or A" />
                </div>
                <div className="form-group">
                  <label className="form-label">Passing Year</label>
                  <input className="form-input" value={academic.passingYear} onChange={e => setAcademic(p => ({ ...p, passingYear: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">English Proficiency</label>
                <select className="form-select" value={academic.englishProficiency} onChange={e => setAcademic(p => ({ ...p, englishProficiency: e.target.value }))}>
                  {['IELTS 6.0+', 'IELTS 6.5+', 'IELTS 7.0+', 'TOEFL 80+', 'MOI Letter', 'No formal test yet'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="profile-section-title" style={{ marginTop: '24px' }}>Study Preferences</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Country</label>
                  <select className="form-select" value={academic.preferredCountry} onChange={e => setAcademic(p => ({ ...p, preferredCountry: e.target.value }))}>
                    {['Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Germany', 'Not sure yet'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Course</label>
                  <input className="form-input" value={academic.preferredCourse} onChange={e => setAcademic(p => ({ ...p, preferredCourse: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Monthly Budget (USD)</label>
                  <select className="form-select" value={academic.budget} onChange={e => setAcademic(p => ({ ...p, budget: e.target.value }))}>
                    {['Under $500', '$500–$800', '$800–$1,200', '$1,200–$2,000', 'Over $2,000', 'Need guidance'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target Intake</label>
                  <select className="form-select" value={academic.intake} onChange={e => setAcademic(p => ({ ...p, intake: e.target.value }))}>
                    {['January 2026', 'March 2026', 'July 2026', 'September 2026', 'January 2027', 'Flexible'].map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {tab === 'security' && (
            <>
              <div className="profile-section-title">Change Password</div>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" placeholder="Your current password" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" placeholder="Min. 8 characters" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-input" placeholder="Repeat new password" />
                </div>
              </div>
              <div className="alert alert-info">
                <span>ℹ️</span>
                <span>Use a strong password with letters, numbers, and special characters. Minimum 8 characters.</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <button type="submit" className="btn-blue" style={{ padding: '12px 32px' }}>
              💾 Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
