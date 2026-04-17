'use client';
import { useState } from 'react';
import Link from 'next/link';

const applications = [
  { id: '1', university: "Taylor's University", course: 'BSc Computer Science', country: 'Malaysia', flag: '🇲🇾', status: 'reviewing', intake: 'July 2026', level: "Bachelor's", deadline: 'Mar 31, 2026', updatedAt: '2 days ago', notes: 'Documents received. Under review by admissions committee.' },
  { id: '2', university: 'APU Malaysia', course: 'BSc Data Science', country: 'Malaysia', flag: '🇲🇾', status: 'submitted', intake: 'July 2026', level: "Bachelor's", deadline: 'Apr 15, 2026', updatedAt: '1 week ago', notes: 'Application submitted. Awaiting acknowledgement.' },
];

const statusMeta: Record<string, { label: string; color: string; bg: string; next: string }> = {
  draft:          { label: '📝 Draft',          color: '#64748b', bg: '#f1f5f9', next: 'Submit application' },
  submitted:      { label: '📨 Submitted',       color: '#1d4ed8', bg: '#dbeafe', next: 'Awaiting review' },
  reviewing:      { label: '🔍 Under Review',    color: '#a16207', bg: '#fef9c3', next: 'Offer letter expected soon' },
  offer_received: { label: '🎉 Offer Received',  color: '#065f46', bg: '#d1fae5', next: 'Accept offer & pay deposit' },
  enrolled:       { label: '✅ Enrolled',         color: '#166534', bg: '#dcfce7', next: 'Prepare for departure' },
  rejected:       { label: '❌ Rejected',         color: '#dc2626', bg: '#fee2e2', next: 'Discuss alternatives with counselor' },
};

export default function ApplicationsPage() {
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ university: '', course: '', country: '', level: '', intake: '' });

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>My Applications</h1>
          <p>Track all your university applications in one place.</p>
        </div>
        <button className="btn-orange" style={{ fontSize: '0.875rem', padding: '11px 22px' }} onClick={() => setShowNew(true)}>
          + New Application
        </button>
      </div>

      {/* STATS ROW */}
      <div className="dash-stats" style={{ marginBottom: '28px' }}>
        {[
          { label: 'Total Applications', value: '2', icon: '📋' },
          { label: 'Under Review', value: '1', icon: '🔍' },
          { label: 'Submitted', value: '1', icon: '📨' },
          { label: 'Offers Received', value: '0', icon: '🎉' },
        ].map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* APPLICATIONS LIST */}
      {applications.map(app => {
        const meta = statusMeta[app.status] || statusMeta.draft;
        return (
          <div key={app.id} className="dash-card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>
                  {app.flag}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--blue)', fontWeight: 700, marginBottom: '4px' }}>{app.university}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '6px' }}>{app.course} · {app.level} · {app.country}</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', background: 'var(--blue-light)', color: 'var(--blue-mid)', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
                      📅 Intake: {app.intake}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--orange-lt)', color: 'var(--orange2)', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
                      ⏰ Deadline: {app.deadline}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`status-badge status-${app.status}`} style={{ fontSize: '0.82rem', padding: '6px 16px' }}>
                {meta.label}
              </span>
            </div>

            {/* Status timeline */}
            <div style={{ background: 'var(--off)', borderRadius: '10px', padding: '14px 18px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Step</div>
              <div style={{ fontSize: '0.87rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--orange)' }}>→</span> {meta.next}
              </div>
              {app.notes && (
                <div style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--gray)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                  💬 Counselor note: {app.notes}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Updated {app.updatedAt}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href="/contact" style={{ fontSize: '0.82rem', color: 'var(--blue)', fontWeight: 600, textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', transition: '0.2s' }}>
                  💬 Message Counselor
                </Link>
                <Link href={`/dashboard/student/documents`} style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600, textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', transition: '0.2s' }}>
                  📄 View Documents
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* NEW APPLICATION MODAL */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--blue)', fontSize: '1.3rem', fontWeight: 800 }}>New Application</h3>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--gray)' }}>×</button>
            </div>
            <div className="alert alert-info">
              <span>ℹ️</span>
              <span>Your counselor will review and process your application request. You'll receive an update within 24–48 hours.</span>
            </div>
            {[
              { name: 'university', label: 'University Name *', placeholder: 'e.g. Taylor\'s University' },
              { name: 'course', label: 'Course / Program *', placeholder: 'e.g. BSc Computer Science' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <label className="form-label">{f.label}</label>
                <input name={f.name} className="form-input" placeholder={f.placeholder}
                  value={(newForm as any)[f.name]}
                  onChange={e => setNewForm(p => ({ ...p, [e.target.name]: e.target.value }))} />
              </div>
            ))}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select name="country" className="form-select" value={newForm.country} onChange={e => setNewForm(p => ({ ...p, country: e.target.value }))}>
                  <option value="">Select country</option>
                  {['Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Germany'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Study Level</label>
                <select name="level" className="form-select" value={newForm.level} onChange={e => setNewForm(p => ({ ...p, level: e.target.value }))}>
                  <option value="">Select level</option>
                  {['Foundation', 'Diploma', "Bachelor's", "Master's", 'PhD'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Target Intake</label>
              <select name="intake" className="form-select" value={newForm.intake} onChange={e => setNewForm(p => ({ ...p, intake: e.target.value }))}>
                <option value="">Select intake</option>
                {['January 2026', 'March 2026', 'July 2026', 'September 2026', 'January 2027'].map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, padding: '12px', border: '1.5px solid var(--border)', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                Cancel
              </button>
              <button className="btn-orange" style={{ flex: 2, justifyContent: 'center' }} onClick={() => { alert('Application request submitted! Your counselor will contact you within 24 hours.'); setShowNew(false); }}>
                Submit Request →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
