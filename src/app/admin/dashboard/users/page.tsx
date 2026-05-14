'use client';
import { useState } from 'react';
import { Search, Users, CheckCircle, FileText, File } from 'lucide-react';
import Link from 'next/link';

const mockUsers = [
  { id:'1', name:'Rahim Uddin',    email:'rahim@gmail.com',   phone:'+880 171XXXXXXX', country:'Bangladesh', preferredDest:'Malaysia',  status:'active',   createdAt:'Jan 10, 2026', apps:2, docs:'4/6' },
  { id:'2', name:'Nadia Islam',    email:'nadia@gmail.com',   phone:'+880 181XXXXXXX', country:'Bangladesh', preferredDest:'UK',        status:'active',   createdAt:'Jan 8, 2026',  apps:1, docs:'6/6' },
  { id:'3', name:'Karim Hassan',   email:'karim@gmail.com',   phone:'+880 191XXXXXXX', country:'Bangladesh', preferredDest:'Malaysia',  status:'active',   createdAt:'Dec 28, 2025', apps:3, docs:'5/6' },
  { id:'4', name:'Sadia Rahman',   email:'sadia@gmail.com',   phone:'+880 171XXXXXXX', country:'Bangladesh', preferredDest:'Australia', status:'active',   createdAt:'Dec 20, 2025', apps:1, docs:'3/6' },
  { id:'5', name:'Farhan Ahmed',   email:'farhan@gmail.com',  phone:'+880 181XXXXXXX', country:'Bangladesh', preferredDest:'Canada',    status:'active',   createdAt:'Dec 15, 2025', apps:2, docs:'5/6' },
  { id:'6', name:'Mitu Begum',     email:'mitu@gmail.com',    phone:'+880 191XXXXXXX', country:'Bangladesh', preferredDest:'Malaysia',  status:'inactive', createdAt:'Dec 10, 2025', apps:1, docs:'2/6' },
  { id:'7', name:'Tanvir Hossain', email:'tanvir@gmail.com',  phone:'+880 171XXXXXXX', country:'Bangladesh', preferredDest:'USA',       status:'active',   createdAt:'Dec 5, 2025',  apps:0, docs:'1/6' },
  { id:'8', name:'Riya Khatun',    email:'riya@gmail.com',    phone:'+880 181XXXXXXX', country:'Malaysia',   preferredDest:'Malaysia',  status:'active',   createdAt:'Nov 28, 2025', apps:2, docs:'6/6' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || u.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id: string) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));

  const selectedUser = users.find(u => u.id === selected);

  const summaryStats = [
    { label:'Total Students',    value: users.length,                                  icon: Users,        color:'#3b82f6' },
    { label:'Active',            value: users.filter(u=>u.status==='active').length,   icon: CheckCircle,  color:'#22c55e' },
    { label:'With Applications', value: users.filter(u=>u.apps>0).length,              icon: FileText,     color:'#f97316' },
    { label:'Docs Complete',     value: users.filter(u=>u.docs==='6/6').length,         icon: File,         color:'#a855f7' },
  ];

  return (
    <>
      <style>{`
        .us-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .us-title { font-size: 1.4rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
        .us-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); }
        .us-invite-btn { padding: 10px 20px; background: #ff7a00; color: #fff; border: none; border-radius: 10px; font-size: 0.83rem; font-weight: 700; cursor: pointer; font-family: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: 0.2s; }
        .us-invite-btn:hover { background: #e06a00; }
        .us-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
        .us-stat { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px; display: flex; align-items: center; gap: 14px; transition: 0.2s; }
        .us-stat:hover { background: rgba(255,255,255,0.06); }
        .us-stat-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .us-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
        .us-stat-value { font-size: 1.3rem; font-weight: 900; color: #fff; }
        .us-toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
        .us-search-wrap { position: relative; flex: 1; min-width: 200px; }
        .us-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.25); }
        .us-search { width: 100%; padding: 10px 12px 10px 36px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 0.84rem; font-family: inherit; outline: none; box-sizing: border-box; }
        .us-search::placeholder { color: rgba(255,255,255,0.25); }
        .us-search:focus { border-color: rgba(59,130,246,0.5); }
        .us-filter-btn { padding: 10px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.5); font-size: 0.82rem; font-family: inherit; cursor: pointer; transition: 0.2s; }
        .us-filter-btn.active { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.4); color: #60a5fa; }
        .us-table-wrap { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; }
        .us-table { width: 100%; border-collapse: collapse; }
        .us-table th { padding: 12px 16px; text-align: left; font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); }
        .us-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: middle; }
        .us-table tr:last-child td { border-bottom: none; }
        .us-table tr:hover td { background: rgba(255,255,255,0.02); cursor: pointer; }
        .td-name { font-size: 0.85rem; font-weight: 600; color: #fff; }
        .td-sub { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 2px; }
        .us-status-badge { display: inline-flex; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
        .us-action-btn { padding: 6px 12px; border-radius: 8px; font-size: 0.73rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: 0.2s; border: none; }
        /* Modal */
        .us-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .us-modal { background: #1c2333; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 28px; width: 100%; max-width: 440px; }
        .us-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .us-modal-title { font-size: 1rem; font-weight: 800; color: #fff; }
        .us-modal-close { background: none; border: none; color: rgba(255,255,255,0.4); font-size: 1.4rem; cursor: pointer; }
        .us-modal-close:hover { color: #fff; }
        .us-modal-av { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg,#0b3d91,#ff7a00); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 900; color: #fff; margin: 0 auto 16px; }
        .us-detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.82rem; }
        .us-detail-row:last-child { border-bottom: none; }
        .us-detail-label { color: rgba(255,255,255,0.35); font-weight: 500; }
        .us-detail-value { color: rgba(255,255,255,0.8); font-weight: 600; text-align: right; }
      `}</style>

      <div className="us-header">
        <div>
          <h1 className="us-title">Students</h1>
          <p className="us-sub">{users.length} registered students</p>
        </div>
        <Link href="/contact" className="us-invite-btn">+ Invite Student</Link>
      </div>

      <div className="us-stats">
        {summaryStats.map((s, i) => (
          <div key={i} className="us-stat">
            <div className="us-stat-icon" style={{ background: `${s.color}20` }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div>
              <div className="us-stat-label">{s.label}</div>
              <div className="us-stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="us-toolbar">
        <div className="us-search-wrap">
          <Search size={14} className="us-search-icon" />
          <input className="us-search" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all','active','inactive'].map(f => (
          <button key={f} className={`us-filter-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      <div className="us-table-wrap" style={{ overflowX: 'auto' }}>
        <table className="us-table">
          <thead>
            <tr><th>Student</th><th>Contact</th><th>Destination</th><th>Apps</th><th>Docs</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const initials = u.name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
              return (
                <tr key={u.id} onClick={() => setSelected(u.id)}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#0b3d91,#1a56c4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem',fontWeight:900,color:'#fff',flexShrink:0 }}>{initials}</div>
                      <div>
                        <div className="td-name">{u.name}</div>
                        <div className="td-sub">{u.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="td-sub">{u.email}</div>
                    <div className="td-sub">{u.phone}</div>
                  </td>
                  <td><span style={{ fontSize:'0.82rem',color:'rgba(255,255,255,0.6)' }}>{u.preferredDest}</span></td>
                  <td><span style={{ fontSize:'0.85rem',fontWeight:700,color: u.apps>0?'#60a5fa':'rgba(255,255,255,0.3)' }}>{u.apps}</span></td>
                  <td><span style={{ fontSize:'0.78rem',fontWeight:700,color:u.docs==='6/6'?'#22c55e':'#f97316' }}>{u.docs==='6/6'?'✅':'⚠️'} {u.docs}</span></td>
                  <td>
                    <span className="us-status-badge" style={{ background:u.status==='active'?'rgba(34,197,94,0.15)':'rgba(107,114,128,0.15)', color:u.status==='active'?'#22c55e':'#6b7280' }}>
                      {u.status==='active'?'● Active':'● Inactive'}
                    </span>
                  </td>
                  <td><span className="td-sub">{u.createdAt}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="us-action-btn"
                      style={{ background:u.status==='active'?'rgba(239,68,68,0.12)':'rgba(34,197,94,0.12)', color:u.status==='active'?'#f87171':'#22c55e' }}
                      onClick={()=>toggleStatus(u.id)}>
                      {u.status==='active'?'Deactivate':'Activate'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="us-modal-overlay" onClick={() => setSelected(null)}>
          <div className="us-modal" onClick={e=>e.stopPropagation()}>
            <div className="us-modal-header">
              <span className="us-modal-title">Student Profile</span>
              <button className="us-modal-close" onClick={()=>setSelected(null)}>×</button>
            </div>
            <div className="us-modal-av">{selectedUser.name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</div>
            <div style={{ textAlign:'center', marginBottom:'20px' }}>
              <div style={{ fontSize:'1rem',fontWeight:800,color:'#fff' }}>{selectedUser.name}</div>
              <div style={{ fontSize:'0.78rem',color:'rgba(255,255,255,0.4)',marginTop:'3px' }}>{selectedUser.email}</div>
            </div>
            <div style={{ background:'rgba(255,255,255,0.03)',borderRadius:'12px',padding:'4px 16px' }}>
              {[
                ['Phone',        selectedUser.phone],
                ['Country',      selectedUser.country],
                ['Destination',  selectedUser.preferredDest],
                ['Applications', selectedUser.apps.toString()],
                ['Documents',    selectedUser.docs],
                ['Status',       selectedUser.status],
                ['Joined',       selectedUser.createdAt],
              ].map(([k,v]) => (
                <div key={k} className="us-detail-row">
                  <span className="us-detail-label">{k}</span>
                  <span className="us-detail-value">{v}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%',marginTop:'16px',padding:'11px',background:'#0b3d91',color:'#fff',border:'none',borderRadius:'10px',fontWeight:700,cursor:'pointer',fontFamily:'inherit',fontSize:'0.85rem' }}
              onClick={()=>toggleStatus(selectedUser.id)}>
              {selectedUser.status==='active'?'Deactivate Student':'Activate Student'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
