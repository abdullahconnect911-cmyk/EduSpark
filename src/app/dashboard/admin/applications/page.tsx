'use client';
import { useState } from 'react';

const statusOptions = ['draft', 'submitted', 'reviewing', 'offer_received', 'enrolled', 'rejected', 'withdrawn'];

const statusLabel: Record<string, string> = {
  draft: '📝 Draft', submitted: '📨 Submitted', reviewing: '🔍 Reviewing',
  offer_received: '🎉 Offer Received', enrolled: '✅ Enrolled',
  rejected: '❌ Rejected', withdrawn: '↩️ Withdrawn',
};

const mockApps = [
  { id: '1', studentName: 'Rahim Uddin', studentEmail: 'rahim@gmail.com', university: "Taylor's University", course: 'BSc Computer Science', country: 'Malaysia', level: "Bachelor's", intake: 'Jul 2026', status: 'reviewing', docs: '4/6', createdAt: 'Jan 10, 2026', notes: 'Awaiting verification of HSC certificate.' },
  { id: '2', studentName: 'Rahim Uddin', studentEmail: 'rahim@gmail.com', university: 'APU Malaysia', course: 'BSc Data Science', country: 'Malaysia', level: "Bachelor's", intake: 'Jul 2026', status: 'submitted', docs: '4/6', createdAt: 'Jan 8, 2026', notes: '' },
  { id: '3', studentName: 'Nadia Islam', studentEmail: 'nadia@gmail.com', university: 'University of Birmingham', course: 'MBA', country: 'UK', level: "Master's", intake: 'Sep 2026', status: 'offer_received', docs: '6/6', createdAt: 'Dec 28, 2025', notes: 'Offer received. Awaiting acceptance and deposit.' },
  { id: '4', studentName: 'Karim Hassan', studentEmail: 'karim@gmail.com', university: 'Sunway University', course: 'BEng Mechanical', country: 'Malaysia', level: "Bachelor's", intake: 'Jul 2026', status: 'enrolled', docs: '6/6', createdAt: 'Dec 15, 2025', notes: 'Student confirmed enrollment. Visa approved.' },
  { id: '5', studentName: 'Sadia Rahman', studentEmail: 'sadia@gmail.com', university: 'University of Melbourne', course: 'MBBS', country: 'Australia', level: "Bachelor's", intake: 'Feb 2027', status: 'draft', docs: '3/6', createdAt: 'Dec 10, 2025', notes: '' },
  { id: '6', studentName: 'Farhan Ahmed', studentEmail: 'farhan@gmail.com', university: 'Multimedia University', course: 'BSc Data Science', country: 'Malaysia', level: "Bachelor's", intake: 'Jul 2026', status: 'reviewing', docs: '5/6', createdAt: 'Dec 5, 2025', notes: '' },
  { id: '7', studentName: 'Tanvir Hossain', studentEmail: 'tanvir@gmail.com', university: 'University of Toronto', course: 'BSc Computer Science', country: 'Canada', level: "Bachelor's", intake: 'Sep 2026', status: 'submitted', docs: '1/6', createdAt: 'Dec 2, 2025', notes: 'Missing documents. Follow up needed.' },
];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState(mockApps);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState('');

  const filtered = apps.filter(a => {
    const matchSearch = !search || a.studentName.toLowerCase().includes(search.toLowerCase()) || a.university.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const saveNote = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, notes: noteEdit } : a));
    setSelected(null);
  };

  const selectedApp = apps.find(a => a.id === selected);

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Applications</h1>
          <p>{apps.length} total applications across all students</p>
        </div>
      </div>

      {/* STATUS SUMMARY */}
      <div className="dash-stats" style={{ marginBottom: '24px' }}>
        {[
          { label: 'All', value: apps.length, filter: 'all', icon: '📋' },
          { label: 'Reviewing', value: apps.filter(a => a.status === 'reviewing').length, filter: 'reviewing', icon: '🔍' },
          { label: 'Offer Received', value: apps.filter(a => a.status === 'offer_received').length, filter: 'offer_received', icon: '🎉' },
          { label: 'Enrolled', value: apps.filter(a => a.status === 'enrolled').length, filter: 'enrolled', icon: '✅' },
        ].map((s, i) => (
          <div key={i} className={`dash-stat-card`} style={{ cursor: 'pointer', border: statusFilter === s.filter ? '1.5px solid var(--blue)' : undefined }}
            onClick={() => setStatusFilter(s.filter)}>
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="dash-card">
        <div className="table-toolbar">
          <input className="table-search" placeholder="Search student or university..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="table-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            {statusOptions.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
          </select>
          <span style={{ fontSize: '0.82rem', color: 'var(--gray)', marginLeft: 'auto' }}>
            {filtered.length} applications
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>University</th>
                <th>Course</th>
                <th>Intake</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="td-name">{app.studentName}</div>
                    <div className="td-sub">{app.studentEmail}</div>
                  </td>
                  <td>
                    <div className="td-name">{app.university}</div>
                    <div className="td-sub">🌍 {app.country}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{app.course}</div>
                    <div className="td-sub">{app.level}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{app.intake}</td>
                  <td>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: app.docs === '6/6' ? '#16a34a' : 'var(--orange2)' }}>
                      {app.docs === '6/6' ? '✅' : '⚠️'} {app.docs}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={app.status}
                      onChange={e => updateStatus(app.id, e.target.value)}
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{statusLabel[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="action-btn action-btn-blue"
                      onClick={() => { setSelected(app.id); setNoteEdit(app.notes); }}>
                      Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>No applications found</h3>
              <p>Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* NOTES MODAL */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Application Notes</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ background: 'var(--off)', borderRadius: '12px', padding: '16px', marginBottom: '20px', fontSize: '0.87rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--blue)', marginBottom: '4px' }}>{selectedApp.studentName}</div>
              <div style={{ color: 'var(--gray)' }}>{selectedApp.university} · {selectedApp.course}</div>
              <div style={{ marginTop: '8px' }}>
                <select className="status-select" value={selectedApp.status}
                  onChange={e => updateStatus(selectedApp.id, e.target.value)}>
                  {statusOptions.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Counselor Notes</label>
              <textarea className="form-textarea" value={noteEdit} onChange={e => setNoteEdit(e.target.value)}
                placeholder="Add notes about this application — progress, issues, next steps..." style={{ minHeight: '140px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: '11px', border: '1.5px solid var(--border)', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                Cancel
              </button>
              <button className="btn-blue" style={{ flex: 2, justifyContent: 'center' }} onClick={() => saveNote(selectedApp.id)}>
                💾 Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
