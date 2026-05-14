'use client';
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const statusOptions = ['new','contacted','qualified','converted','lost'];
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new:       { label:'New',       color:'#3b82f6', bg:'rgba(59,130,246,0.15)' },
  contacted: { label:'Contacted', color:'#f97316', bg:'rgba(249,115,22,0.15)' },
  qualified: { label:'Qualified', color:'#22c55e', bg:'rgba(34,197,94,0.15)'  },
  converted: { label:'Converted', color:'#06b6d4', bg:'rgba(6,182,212,0.15)'  },
  lost:      { label:'Lost',      color:'#ef4444', bg:'rgba(239,68,68,0.15)'   },
};

const sourceConfig: Record<string, { label: string; color: string; bg: string }> = {
  website:  { label:'Website',  color:'#60a5fa', bg:'rgba(96,165,250,0.12)' },
  whatsapp: { label:'WhatsApp', color:'#22c55e', bg:'rgba(34,197,94,0.12)'  },
  referral: { label:'Referral', color:'#fbbf24', bg:'rgba(251,191,36,0.12)' },
  facebook: { label:'Facebook', color:'#818cf8', bg:'rgba(129,140,248,0.12)'},
  manual:   { label:'Manual',   color:'#9ca3af', bg:'rgba(156,163,175,0.12)'},
};

const mockLeads = [
  { id:'1', name:'Tanvir Hossain', email:'tanvir@gmail.com',  phone:'+880 171XXXXXXX', country:'Bangladesh', interested:'Malaysia',  level:"Bachelor's", message:'Interested in Computer Science at APU. Budget $600/month.',    status:'new',       source:'website',  createdAt:'Jan 18, 2026' },
  { id:'2', name:'Riya Sultana',   email:'riya@gmail.com',    phone:'+880 181XXXXXXX', country:'Bangladesh', interested:'UK',        level:"Master's",   message:"Looking for MBA in UK. 3 years work experience.",             status:'contacted', source:'whatsapp', createdAt:'Jan 17, 2026' },
  { id:'3', name:'Bashir Ahmed',   email:'bashir@gmail.com',  phone:'+880 191XXXXXXX', country:'Bangladesh', interested:'Australia', level:"Bachelor's", message:'Want to study medicine. Father is sponsoring.',               status:'qualified', source:'website',  createdAt:'Jan 16, 2026' },
  { id:'4', name:'Dilnoza Khan',   email:'dilnoza@gmail.com', phone:'+880 171XXXXXXX', country:'Bangladesh', interested:'Malaysia',  level:'Diploma',    message:'',                                                            status:'converted', source:'referral', createdAt:'Jan 14, 2026' },
  { id:'5', name:'Imran Haque',    email:'imran@gmail.com',   phone:'+880 181XXXXXXX', country:'Bangladesh', interested:'Canada',    level:"Bachelor's", message:'Looking for affordable options with PR pathway.',              status:'new',       source:'website',  createdAt:'Jan 13, 2026' },
  { id:'6', name:'Parveen Akter',  email:'parveen@gmail.com', phone:'+880 191XXXXXXX', country:'Bangladesh', interested:'Malaysia',  level:"Bachelor's", message:'HSC result 4.5. Interested in Business.',                    status:'contacted', source:'facebook', createdAt:'Jan 12, 2026' },
  { id:'7', name:'Zakaria Islam',  email:'zakaria@gmail.com', phone:'+880 171XXXXXXX', country:'Bangladesh', interested:'USA',       level:"Master's",   message:'GRE score 315. Want scholarship guidance.',                   status:'lost',      source:'website',  createdAt:'Jan 10, 2026' },
];

const emptyLead = { name:'', email:'', phone:'', country:'Bangladesh', interested:'', level:'', message:'' };

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newLead, setNewLead] = useState(emptyLead);

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !search || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) =>
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));

  const addLead = () => {
    if (!newLead.name || !newLead.email) return;
    setLeads(prev => [{ id: Date.now().toString(), ...newLead, status:'new', source:'manual',
      createdAt: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) }, ...prev]);
    setNewLead(emptyLead);
    setShowAdd(false);
  };

  const selectedLead = leads.find(l => l.id === selected);

  const pipelineCounts = statusOptions.map(s => ({ s, count: leads.filter(l=>l.status===s).length }));

  return (
    <>
      <style>{`
        .lc-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
        .lc-title { font-size:1.4rem; font-weight:800; color:#fff; margin:0 0 4px; }
        .lc-sub { font-size:0.82rem; color:rgba(255,255,255,0.35); }
        .lc-add-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; background:#ff7a00; color:#fff; border:none; border-radius:10px; font-size:0.83rem; font-weight:700; cursor:pointer; font-family:inherit; transition:0.2s; }
        .lc-add-btn:hover { background:#e06a00; }

        .lc-pipeline { display:flex; gap:10px; margin-bottom:22px; overflow-x:auto; padding-bottom:4px; }
        .lc-stage { flex:1; min-width:100px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:14px 16px; cursor:pointer; transition:0.2s; text-align:center; }
        .lc-stage:hover { background:rgba(255,255,255,0.06); }
        .lc-stage.active { border-color:rgba(59,130,246,0.5); background:rgba(59,130,246,0.08); }
        .lc-stage-label { font-size:0.7rem; color:rgba(255,255,255,0.4); font-weight:600; letter-spacing:0.06em; margin-bottom:4px; }
        .lc-stage-count { font-size:1.4rem; font-weight:900; color:#fff; }
        .lc-stage-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:5px; vertical-align:middle; }

        .lc-toolbar { display:flex; gap:10px; align-items:center; margin-bottom:16px; flex-wrap:wrap; }
        .lc-search-wrap { position:relative; flex:1; min-width:200px; }
        .lc-search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.25); }
        .lc-search { width:100%; padding:10px 12px 10px 36px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:0.84rem; font-family:inherit; outline:none; box-sizing:border-box; }
        .lc-search::placeholder { color:rgba(255,255,255,0.25); }
        .lc-search:focus { border-color:rgba(59,130,246,0.5); }

        .lc-table-wrap { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:16px; overflow:hidden; }
        .lc-table { width:100%; border-collapse:collapse; }
        .lc-table th { padding:12px 16px; text-align:left; font-size:0.68rem; font-weight:700; color:rgba(255,255,255,0.3); letter-spacing:0.08em; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); }
        .lc-table td { padding:13px 16px; border-bottom:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
        .lc-table tr:last-child td { border-bottom:none; }
        .lc-table tr:hover td { background:rgba(255,255,255,0.02); cursor:pointer; }
        .td-name { font-size:0.85rem; font-weight:600; color:#fff; }
        .td-sub { font-size:0.72rem; color:rgba(255,255,255,0.35); margin-top:2px; }
        .lc-badge { display:inline-flex; padding:3px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; }
        .lc-status-select { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:rgba(255,255,255,0.7); font-size:0.78rem; padding:5px 10px; font-family:inherit; cursor:pointer; outline:none; }
        .lc-wa-btn { display:inline-flex; align-items:center; gap:4px; padding:5px 12px; border-radius:8px; font-size:0.72rem; font-weight:700; background:rgba(34,197,94,0.12); color:#22c55e; border:none; cursor:pointer; font-family:inherit; text-decoration:none; transition:0.2s; }
        .lc-wa-btn:hover { background:rgba(34,197,94,0.2); }

        /* Modal */
        .lc-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .lc-modal { background:#1c2333; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:28px; width:100%; max-width:480px; max-height:90vh; overflow-y:auto; }
        .lc-modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
        .lc-modal-title { font-size:1rem; font-weight:800; color:#fff; }
        .lc-modal-close { background:none; border:none; color:rgba(255,255,255,0.4); font-size:1.4rem; cursor:pointer; }
        .lc-modal-close:hover { color:#fff; }
        .lc-input { width:100%; padding:10px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:0.85rem; font-family:inherit; outline:none; box-sizing:border-box; margin-bottom:12px; }
        .lc-input:focus { border-color:rgba(59,130,246,0.5); }
        .lc-input::placeholder { color:rgba(255,255,255,0.2); }
        .lc-textarea { width:100%; padding:10px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:0.85rem; font-family:inherit; outline:none; resize:vertical; min-height:90px; box-sizing:border-box; }
        .lc-textarea:focus { border-color:rgba(59,130,246,0.5); }
        .lc-textarea::placeholder { color:rgba(255,255,255,0.2); }
        .lc-input-label { font-size:0.72rem; color:rgba(255,255,255,0.35); font-weight:600; margin-bottom:5px; display:block; }
        .lc-form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .lc-detail-row { display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.82rem; }
        .lc-detail-row:last-child { border-bottom:none; }
        .lc-submit-btn { width:100%; padding:12px; background:#0b3d91; color:#fff; border:none; border-radius:10px; font-weight:700; font-size:0.88rem; cursor:pointer; font-family:inherit; margin-top:4px; transition:0.2s; }
        .lc-submit-btn:hover { background:#0d47a1; }
      `}</style>

      <div className="lc-header">
        <div>
          <h1 className="lc-title">Leads & CRM</h1>
          <p className="lc-sub">{leads.filter(l=>l.status==='new').length} new leads waiting for follow-up</p>
        </div>
        <button className="lc-add-btn" onClick={() => setShowAdd(true)}>
          <Plus size={14} /> Add Lead
        </button>
      </div>

      {/* Pipeline */}
      <div className="lc-pipeline">
        <div className={`lc-stage${statusFilter==='all'?' active':''}`} onClick={() => setStatusFilter('all')}>
          <div className="lc-stage-label">ALL LEADS</div>
          <div className="lc-stage-count">{leads.length}</div>
        </div>
        {pipelineCounts.map(({ s, count }) => {
          const sc = statusConfig[s];
          return (
            <div key={s} className={`lc-stage${statusFilter===s?' active':''}`} onClick={() => setStatusFilter(s)}>
              <div className="lc-stage-label">
                <span className="lc-stage-dot" style={{ background: sc.color }} />
                {sc.label.toUpperCase()}
              </div>
              <div className="lc-stage-count" style={{ color: sc.color }}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="lc-toolbar">
        <div className="lc-search-wrap">
          <Search size={14} className="lc-search-icon" />
          <input className="lc-search" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.3)' }}>{filtered.length} leads</span>
      </div>

      {/* Table */}
      <div className="lc-table-wrap" style={{ overflowX:'auto' }}>
        <table className="lc-table">
          <thead>
            <tr><th>Lead</th><th>Contact</th><th>Interested In</th><th>Source</th><th>Status</th><th>Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map(lead => {
              const sc = statusConfig[lead.status];
              const src = sourceConfig[lead.source] || sourceConfig.manual;
              return (
                <tr key={lead.id} onClick={() => setSelected(lead.id)}>
                  <td>
                    <div className="td-name">{lead.name}</div>
                    <div className="td-sub">{lead.level}</div>
                  </td>
                  <td>
                    <div className="td-sub">{lead.email}</div>
                    <div className="td-sub">{lead.phone}</div>
                  </td>
                  <td><span style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.6)' }}>{lead.interested}</span></td>
                  <td>
                    <span className="lc-badge" style={{ background: src.bg, color: src.color }}>
                      {src.label}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <select className="lc-status-select" value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}>
                      {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
                    </select>
                  </td>
                  <td><span className="td-sub">{lead.createdAt}</span></td>
                  <td onClick={e => e.stopPropagation()}>
                    <a href={`https://wa.me/880${lead.phone.replace(/\D/g,'').slice(-10)}?text=Hi ${lead.name}, this is EduSpark. Can we discuss your study abroad plans?`}
                      target="_blank" rel="noopener noreferrer" className="lc-wa-btn">
                      💬 WA
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && !showAdd && (
        <div className="lc-modal-overlay" onClick={() => setSelected(null)}>
          <div className="lc-modal" onClick={e => e.stopPropagation()}>
            <div className="lc-modal-header">
              <span className="lc-modal-title">{selectedLead.name}</span>
              <button className="lc-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:'12px', padding:'4px 16px', marginBottom:'16px' }}>
              {[
                ['Email',       selectedLead.email],
                ['Phone',       selectedLead.phone],
                ['Country',     selectedLead.country],
                ['Interested',  selectedLead.interested],
                ['Level',       selectedLead.level],
                ['Source',      selectedLead.source],
                ['Date',        selectedLead.createdAt],
              ].map(([k,v]) => (
                <div key={k} className="lc-detail-row">
                  <span style={{ color:'rgba(255,255,255,0.35)', fontWeight:500 }}>{k}</span>
                  <span style={{ color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            {selectedLead.message && (
              <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:'12px', padding:'14px', marginBottom:'16px' }}>
                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginBottom:'6px', fontWeight:600 }}>Message</div>
                <div style={{ fontSize:'0.84rem', color:'rgba(255,255,255,0.65)', lineHeight:1.6 }}>{selectedLead.message}</div>
              </div>
            )}
            <div style={{ display:'flex', gap:'10px' }}>
              <select className="lc-status-select" style={{ flex:1 }} value={selectedLead.status}
                onChange={e => updateStatus(selectedLead.id, e.target.value)}>
                {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
              </select>
              <a href={`https://wa.me/8801867778759?text=Following up on lead: ${selectedLead.name}`}
                target="_blank" rel="noopener noreferrer"
                style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', padding:'10px', background:'rgba(34,197,94,0.12)', color:'#22c55e', border:'none', borderRadius:'10px', fontWeight:700, fontSize:'0.83rem', textDecoration:'none' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAdd && (
        <div className="lc-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="lc-modal" onClick={e => e.stopPropagation()}>
            <div className="lc-modal-header">
              <span className="lc-modal-title">Add New Lead</span>
              <button className="lc-modal-close" onClick={() => setShowAdd(false)}>×</button>
            </div>
            <div className="lc-form-row">
              <div><label className="lc-input-label">Full Name *</label><input className="lc-input" placeholder="Full Name" value={newLead.name} onChange={e => setNewLead(p=>({...p,name:e.target.value}))} /></div>
              <div><label className="lc-input-label">Email *</label><input className="lc-input" placeholder="Email" value={newLead.email} onChange={e => setNewLead(p=>({...p,email:e.target.value}))} /></div>
            </div>
            <div className="lc-form-row">
              <div><label className="lc-input-label">Phone</label><input className="lc-input" placeholder="+880..." value={newLead.phone} onChange={e => setNewLead(p=>({...p,phone:e.target.value}))} /></div>
              <div><label className="lc-input-label">Interested In</label><input className="lc-input" placeholder="Malaysia / UK..." value={newLead.interested} onChange={e => setNewLead(p=>({...p,interested:e.target.value}))} /></div>
            </div>
            <div className="lc-form-row">
              <div><label className="lc-input-label">Study Level</label><input className="lc-input" placeholder="Bachelor's / Master's..." value={newLead.level} onChange={e => setNewLead(p=>({...p,level:e.target.value}))} /></div>
              <div><label className="lc-input-label">Country</label><input className="lc-input" placeholder="Bangladesh" value={newLead.country} onChange={e => setNewLead(p=>({...p,country:e.target.value}))} /></div>
            </div>
            <label className="lc-input-label">Message / Notes</label>
            <textarea className="lc-textarea" placeholder="Any notes about this lead..." value={newLead.message} onChange={e => setNewLead(p=>({...p,message:e.target.value}))} />
            <button className="lc-submit-btn" onClick={addLead}>+ Add Lead</button>
          </div>
        </div>
      )}
    </>
  );
}
