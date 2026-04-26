'use client';
import { useState } from 'react';

const leadStatusOptions = ['new', 'contacted', 'qualified', 'converted', 'lost'];
const leadStatusLabel: Record<string, string> = {
  new: '🆕 New', contacted: '📞 Contacted', qualified: '✅ Qualified', converted: '🎉 Converted', lost: '❌ Lost',
};

const mockLeads = [
  { id: '1', name: 'Tanvir Hossain', email: 'tanvir@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', interested: 'Malaysia', level: "Bachelor's", message: 'Interested in Computer Science at APU. Budget around $600/month.', status: 'new', source: 'website', createdAt: 'Jan 18, 2026' },
  { id: '2', name: 'Riya Sultana', email: 'riya@gmail.com', phone: '+880 181XXXXXXX', country: 'Bangladesh', interested: 'UK', level: "Master's", message: 'Looking for MBA programs in UK. Have 3 years work experience.', status: 'contacted', source: 'whatsapp', createdAt: 'Jan 17, 2026' },
  { id: '3', name: 'Bashir Ahmed', email: 'bashir@gmail.com', phone: '+880 191XXXXXXX', country: 'Bangladesh', interested: 'Australia', level: "Bachelor's", message: 'Want to study medicine. Father is sponsoring.', status: 'qualified', source: 'website', createdAt: 'Jan 16, 2026' },
  { id: '4', name: 'Dilnoza Khan', email: 'dilnoza@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', interested: 'Malaysia', level: 'Diploma', message: '', status: 'converted', source: 'referral', createdAt: 'Jan 14, 2026' },
  { id: '5', name: 'Imran Haque', email: 'imran@gmail.com', phone: '+880 181XXXXXXX', country: 'Bangladesh', interested: 'Canada', level: "Bachelor's", message: 'Looking for affordable options with PR pathway.', status: 'new', source: 'website', createdAt: 'Jan 13, 2026' },
  { id: '6', name: 'Parveen Akter', email: 'parveen@gmail.com', phone: '+880 191XXXXXXX', country: 'Bangladesh', interested: 'Malaysia', level: "Bachelor's", message: 'HSC result 4.5. Interested in Business.', status: 'contacted', source: 'facebook', createdAt: 'Jan 12, 2026' },
  { id: '7', name: 'Zakaria Islam', email: 'zakaria@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', interested: 'USA', level: "Master's", message: 'GRE score 315. Want scholarship guidance.', status: 'lost', source: 'website', createdAt: 'Jan 10, 2026' },
];

const sourceColors: Record<string, string> = {
  website: 'var(--blue-light)', whatsapp: '#dcfce7', referral: '#fef9c3', facebook: '#dbeafe',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', country: 'Bangladesh', interested: '', level: '', message: '' });

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const addLead = () => {
    if (!newLead.name || !newLead.email) return;
    setLeads(prev => [{ id: Date.now().toString(), ...newLead, status: 'new', source: 'manual', createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...prev]);
    setNewLead({ name: '', email: '', phone: '', country: 'Bangladesh', interested: '', level: '', message: '' });
    setShowAdd(false);
  };

  const selectedLead = leads.find(l => l.id === selected);

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Leads & CRM</h1>
          <p>{leads.filter(l => l.status === 'new').length} new leads waiting for follow-up</p>
        </div>
        <button className="btn-orange" style={{ fontSize: '0.875rem', padding: '10px 20px' }} onClick={() => setShowAdd(true)}>
          + Add Lead
        </button>
      </div>

      {/* STATUS PIPELINE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {leadStatusOptions.map(s => {
          const count = leads.filter(l => l.status === s).length;
          return (
            <div key={s} onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              style={{ padding: '16px', background: '#fff', border: `1.5px solid ${statusFilter === s ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: '0.2s', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '4px' }}>{count}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray)' }}>{leadStatusLabel[s].replace(/^.\s/, '')}</div>
            </div>
          );
        })}
      </div>

      <div className="dash-card">
        <div className="table-toolbar">
          <input className="table-search" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="table-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            {leadStatusOptions.map(s => <option key={s} value={s}>{leadStatusLabel[s]}</option>)}
          </select>
          <span style={{ fontSize: '0.82rem', color: 'var(--gray)', marginLeft: 'auto' }}>{filtered.length} leads</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Interested In</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div className="td-name">{lead.name}</div>
                    <div className="td-sub">{lead.country}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>{lead.email}</div>
                    <div className="td-sub">{lead.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)' }}>🌍 {lead.interested}</div>
                    <div className="td-sub">{lead.level}</div>
                  </td>
                  <td>
                    <span style={{ background: sourceColors[lead.source] || 'var(--off)', color: 'var(--text)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize' }}>
                      {lead.source}
                    </span>
                  </td>
                  <td>
                    <select className={`status-select lead-${lead.status}`} value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}>
                      {leadStatusOptions.map(s => <option key={s} value={s}>{leadStatusLabel[s]}</option>)}
                    </select>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{lead.createdAt}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="action-btn action-btn-blue" onClick={() => setSelected(lead.id)}>View</button>
                      <a href={`mailto:${lead.email}`} className="action-btn action-btn-orange" style={{ textDecoration: 'none' }}>Email</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <h3>No leads found</h3>
              <p>Try adjusting your filters or add a new lead manually.</p>
            </div>
          )}
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Lead Details</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ background: 'var(--off)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--blue)', marginBottom: '4px' }}>{selectedLead.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{selectedLead.email} · {selectedLead.phone}</div>
            </div>
            {[
              ['Country', selectedLead.country],
              ['Interested In', selectedLead.interested],
              ['Study Level', selectedLead.level],
              ['Source', selectedLead.source],
              ['Received', selectedLead.createdAt],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.87rem' }}>
                <span style={{ color: 'var(--gray)', fontWeight: 600 }}>{k}</span>
                <span style={{ color: 'var(--text)', fontWeight: 600, textTransform: 'capitalize' }}>{v}</span>
              </div>
            ))}
            {selectedLead.message && (
              <div style={{ marginTop: '16px', padding: '14px', background: 'var(--off)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.65, fontStyle: 'italic' }}>
                "{selectedLead.message}"
              </div>
            )}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Update Status</label>
              <select className="form-select" value={selectedLead.status}
                onChange={e => updateStatus(selectedLead.id, e.target.value)}>
                {leadStatusOptions.map(s => <option key={s} value={s}>{leadStatusLabel[s]}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a href={`mailto:${selectedLead.email}`} className="btn-blue" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem', padding: '11px', textDecoration: 'none' }}>
                ✉️ Send Email
              </a>
              <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', background: '#25d366', color: '#fff', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 700, padding: '11px', textDecoration: 'none' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Add New Lead</span>
              <button className="modal-close" onClick={() => setShowAdd(false)}>×</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" value={newLead.name} onChange={e => setNewLead(p => ({ ...p, name: e.target.value }))} placeholder="Lead's name" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={newLead.phone} onChange={e => setNewLead(p => ({ ...p, phone: e.target.value }))} placeholder="+880..." />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" className="form-input" value={newLead.email} onChange={e => setNewLead(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Interested In</label>
                <select className="form-select" value={newLead.interested} onChange={e => setNewLead(p => ({ ...p, interested: e.target.value }))}>
                  <option value="">Select</option>
                  {['Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Study Level</label>
                <select className="form-select" value={newLead.level} onChange={e => setNewLead(p => ({ ...p, level: e.target.value }))}>
                  <option value="">Select</option>
                  {['Foundation', 'Diploma', "Bachelor's", "Master's", 'PhD'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-textarea" value={newLead.message} onChange={e => setNewLead(p => ({ ...p, message: e.target.value }))} placeholder="Any notes about this lead..." style={{ minHeight: '80px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', border: '1.5px solid var(--border)', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Cancel</button>
              <button className="btn-orange" style={{ flex: 2, justifyContent: 'center' }} onClick={addLead}>+ Add Lead</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
