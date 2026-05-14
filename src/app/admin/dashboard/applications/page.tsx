'use client';
import { useState } from 'react';
import { Search, Filter, FileText, Eye, CheckCircle, Clock, Send } from 'lucide-react';

const statusOptions = ['draft','submitted','reviewing','offer_received','enrolled','rejected','withdrawn'];
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  draft:          { label: 'Draft',          color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
  submitted:      { label: 'Submitted',      color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  reviewing:      { label: 'Reviewing',      color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  offer_received: { label: 'Offer Received', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  enrolled:       { label: 'Enrolled',       color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  rejected:       { label: 'Rejected',       color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  withdrawn:      { label: 'Withdrawn',      color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
};

const mockApps = [
  { id:'1', studentName:'Rahim Uddin',    studentEmail:'rahim@gmail.com',   university:"Taylor's University",       course:'BSc Computer Science', country:'Malaysia', level:"Bachelor's", intake:'Jul 2026', status:'reviewing',      docs:'4/6', createdAt:'Jan 10, 2026', notes:'Awaiting verification of HSC certificate.' },
  { id:'2', studentName:'Rahim Uddin',    studentEmail:'rahim@gmail.com',   university:'APU Malaysia',              course:'BSc Data Science',     country:'Malaysia', level:"Bachelor's", intake:'Jul 2026', status:'submitted',      docs:'4/6', createdAt:'Jan 8, 2026',  notes:'' },
  { id:'3', studentName:'Nadia Islam',    studentEmail:'nadia@gmail.com',   university:'University of Birmingham',  course:'MBA',                  country:'UK',       level:"Master's",   intake:'Sep 2026', status:'offer_received',  docs:'6/6', createdAt:'Dec 28, 2025', notes:'Offer received. Awaiting acceptance and deposit.' },
  { id:'4', studentName:'Karim Hassan',   studentEmail:'karim@gmail.com',   university:'Sunway University',         course:'BEng Mechanical',      country:'Malaysia', level:"Bachelor's", intake:'Jul 2026', status:'enrolled',       docs:'6/6', createdAt:'Dec 15, 2025', notes:'Student confirmed enrollment. Visa approved.' },
  { id:'5', studentName:'Sadia Rahman',   studentEmail:'sadia@gmail.com',   university:'University of Melbourne',   course:'MBBS',                 country:'Australia',level:"Bachelor's", intake:'Feb 2027', status:'draft',          docs:'3/6', createdAt:'Dec 10, 2025', notes:'' },
  { id:'6', studentName:'Farhan Ahmed',   studentEmail:'farhan@gmail.com',  university:'Multimedia University',     course:'BSc Data Science',     country:'Malaysia', level:"Bachelor's", intake:'Jul 2026', status:'reviewing',      docs:'5/6', createdAt:'Dec 5, 2025',  notes:'' },
  { id:'7', studentName:'Tanvir Hossain', studentEmail:'tanvir@gmail.com',  university:'University of Toronto',     course:'BSc Computer Science', country:'Canada',   level:"Bachelor's", intake:'Sep 2026', status:'submitted',      docs:'1/6', createdAt:'Dec 2, 2025',  notes:'Missing documents. Follow up needed.' },
];

const summaryStats = [
  { label:'All',           filter:'all',           icon: FileText,      color:'#3b82f6' },
  { label:'Reviewing',     filter:'reviewing',      icon: Eye,           color:'#f97316' },
  { label:'Offer Received',filter:'offer_received', icon: CheckCircle,   color:'#06b6d4' },
  { label:'Enrolled',      filter:'enrolled',       icon: CheckCircle,   color:'#22c55e' },
];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState(mockApps);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState('');

  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !search || a.studentName.toLowerCase().includes(q) || a.university.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) =>
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  const saveNote = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, notes: noteEdit } : a));
    setSelected(null);
  };

  const selectedApp = apps.find(a => a.id === selected);

  return (
    <>
      <style>{`
        .ap-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .ap-title { font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
        .ap-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); }

        .ap-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
        .ap-stat {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 18px; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center; gap: 14px;
        }
        .ap-stat:hover { background: rgba(255,255,255,0.06); }
        .ap-stat.active { border-color: rgba(59,130,246,0.5); background: rgba(59,130,246,0.08); }
        .ap-stat-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ap-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
        .ap-stat-value { font-size: 1.3rem; font-weight: 900; color: #fff; line-height: 1.1; }

        .ap-toolbar {
          display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;
        }
        .ap-search-wrap { position: relative; flex: 1; min-width: 200px; }
        .ap-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.25); }
        .ap-search {
          width: 100%; padding: 10px 12px 10px 36px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff; font-size: 0.84rem; font-family: inherit;
          outline: none; box-sizing: border-box;
        }
        .ap-search::placeholder { color: rgba(255,255,255,0.25); }
        .ap-search:focus { border-color: rgba(59,130,246,0.5); }
        .ap-select {
          padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: rgba(255,255,255,0.7); font-size: 0.84rem; font-family: inherit;
          outline: none; cursor: pointer;
        }
        .ap-count { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-left: auto; white-space: nowrap; }

        .ap-table-wrap {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden;
        }
        .ap-table { width: 100%; border-collapse: collapse; }
        .ap-table th {
          padding: 12px 16px; text-align: left; font-size: 0.68rem;
          font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.08em;
          text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02); white-space: nowrap;
        }
        .ap-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: middle; }
        .ap-table tr:last-child td { border-bottom: none; }
        .ap-table tr:hover td { background: rgba(255,255,255,0.02); }
        .td-name { font-size: 0.85rem; font-weight: 600; color: #fff; }
        .td-sub { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 2px; }
        .ap-status-badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; white-space: nowrap; }
        .ap-status-select {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: rgba(255,255,255,0.7); font-size: 0.78rem;
          padding: 6px 10px; font-family: inherit; cursor: pointer; outline: none;
        }
        .ap-doc-badge { font-size: 0.75rem; font-weight: 700; }
        .ap-notes-btn {
          padding: 6px 14px; border-radius: 8px; font-size: 0.75rem; font-weight: 700;
          cursor: pointer; border: 1px solid rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.1); color: #60a5fa;
          font-family: inherit; transition: all 0.2s;
        }
        .ap-notes-btn:hover { background: rgba(59,130,246,0.2); }

        /* Modal */
        .ap-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .ap-modal {
          background: #1c2333; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 28px; width: 100%; max-width: 480px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .ap-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .ap-modal-title { font-size: 1rem; font-weight: 800; color: #fff; }
        .ap-modal-close { background: none; border: none; color: rgba(255,255,255,0.4); font-size: 1.4rem; cursor: pointer; line-height: 1; }
        .ap-modal-close:hover { color: #fff; }
        .ap-modal-info { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 14px; margin-bottom: 16px; }
        .ap-textarea {
          width: 100%; padding: 12px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          color: #fff; font-size: 0.85rem; font-family: inherit;
          resize: vertical; min-height: 120px; outline: none; box-sizing: border-box;
        }
        .ap-textarea:focus { border-color: rgba(59,130,246,0.5); }
        .ap-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .ap-modal-actions { display: flex; gap: 10px; margin-top: 16px; }
        .ap-modal-cancel {
          flex: 1; padding: 11px; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; background: transparent; color: rgba(255,255,255,0.5);
          cursor: pointer; font-family: inherit; font-weight: 600; font-size: 0.85rem;
        }
        .ap-modal-save {
          flex: 2; padding: 11px; border: none; border-radius: 10px;
          background: #0b3d91; color: #fff; cursor: pointer;
          font-family: inherit; font-weight: 700; font-size: 0.85rem; transition: 0.2s;
        }
        .ap-modal-save:hover { background: #0d47a1; }
        .ap-empty { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.3); }
        .ap-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
      `}</style>

      <div className="ap-header">
        <div>
          <h1 className="ap-title">Applications</h1>
          <p className="ap-sub">{apps.length} total applications across all students</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="ap-stats">
        {summaryStats.map((s, i) => {
          const count = s.filter === 'all' ? apps.length : apps.filter(a => a.status === s.filter).length;
          return (
            <div key={i} className={`ap-stat${statusFilter === s.filter ? ' active' : ''}`}
              onClick={() => setStatusFilter(s.filter)}>
              <div className="ap-stat-icon" style={{ background: `${s.color}20` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <div className="ap-stat-label">{s.label}</div>
                <div className="ap-stat-value">{count}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="ap-toolbar">
        <div className="ap-search-wrap">
          <Search size={14} className="ap-search-icon" />
          <input className="ap-search" placeholder="Search student or university..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ap-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
        </select>
        <span className="ap-count">{filtered.length} applications</span>
      </div>

      {/* Table */}
      <div className="ap-table-wrap" style={{ overflowX: 'auto' }}>
        <table className="ap-table">
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
            {filtered.map(app => {
              const sc = statusConfig[app.status];
              const docsComplete = app.docs === '6/6';
              return (
                <tr key={app.id}>
                  <td>
                    <div className="td-name">{app.studentName}</div>
                    <div className="td-sub">{app.studentEmail}</div>
                  </td>
                  <td>
                    <div className="td-name">{app.university}</div>
                    <div className="td-sub">{app.country}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.7)' }}>{app.course}</div>
                    <div className="td-sub">{app.level}</div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>{app.intake}</td>
                  <td>
                    <span className="ap-doc-badge" style={{ color: docsComplete ? '#22c55e' : '#f97316' }}>
                      {docsComplete ? '✅' : '⚠️'} {app.docs}
                    </span>
                  </td>
                  <td>
                    <select className="ap-status-select" value={app.status}
                      onChange={e => updateStatus(app.id, e.target.value)}>
                      {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="ap-notes-btn"
                      onClick={() => { setSelected(app.id); setNoteEdit(app.notes); }}>
                      Notes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="ap-empty">
            <div className="ap-empty-icon">📋</div>
            <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>No applications found</div>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {selectedApp && (
        <div className="ap-modal-overlay" onClick={() => setSelected(null)}>
          <div className="ap-modal" onClick={e => e.stopPropagation()}>
            <div className="ap-modal-header">
              <span className="ap-modal-title">Application Notes</span>
              <button className="ap-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="ap-modal-info">
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '4px' }}>{selectedApp.studentName}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{selectedApp.university} · {selectedApp.course}</div>
              <div style={{ marginTop: '10px' }}>
                <select className="ap-status-select" value={selectedApp.status}
                  onChange={e => updateStatus(selectedApp.id, e.target.value)}>
                  {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontWeight: 600 }}>Counselor Notes</div>
              <textarea className="ap-textarea" value={noteEdit} onChange={e => setNoteEdit(e.target.value)}
                placeholder="Add notes about this application — progress, issues, next steps..." />
            </div>
            <div className="ap-modal-actions">
              <button className="ap-modal-cancel" onClick={() => setSelected(null)}>Cancel</button>
              <button className="ap-modal-save" onClick={() => saveNote(selectedApp.id)}>💾 Save Notes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
