'use client';
import { useState } from 'react';
import Link from 'next/link';

const mockUsers = [
  { id: '1', name: 'Rahim Uddin', email: 'rahim@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', preferredDest: 'Malaysia', status: 'active', createdAt: 'Jan 10, 2026', apps: 2, docs: '4/6' },
  { id: '2', name: 'Nadia Islam', email: 'nadia@gmail.com', phone: '+880 181XXXXXXX', country: 'Bangladesh', preferredDest: 'UK', status: 'active', createdAt: 'Jan 8, 2026', apps: 1, docs: '6/6' },
  { id: '3', name: 'Karim Hassan', email: 'karim@gmail.com', phone: '+880 191XXXXXXX', country: 'Bangladesh', preferredDest: 'Malaysia', status: 'active', createdAt: 'Dec 28, 2025', apps: 3, docs: '5/6' },
  { id: '4', name: 'Sadia Rahman', email: 'sadia@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', preferredDest: 'Australia', status: 'active', createdAt: 'Dec 20, 2025', apps: 1, docs: '3/6' },
  { id: '5', name: 'Farhan Ahmed', email: 'farhan@gmail.com', phone: '+880 181XXXXXXX', country: 'Bangladesh', preferredDest: 'Canada', status: 'active', createdAt: 'Dec 15, 2025', apps: 2, docs: '5/6' },
  { id: '6', name: 'Mitu Begum', email: 'mitu@gmail.com', phone: '+880 191XXXXXXX', country: 'Bangladesh', preferredDest: 'Malaysia', status: 'inactive', createdAt: 'Dec 10, 2025', apps: 1, docs: '2/6' },
  { id: '7', name: 'Tanvir Hossain', email: 'tanvir@gmail.com', phone: '+880 171XXXXXXX', country: 'Bangladesh', preferredDest: 'USA', status: 'active', createdAt: 'Dec 5, 2025', apps: 0, docs: '1/6' },
  { id: '8', name: 'Riya Khatun', email: 'riya@gmail.com', phone: '+880 181XXXXXXX', country: 'Malaysia', preferredDest: 'Malaysia', status: 'active', createdAt: 'Nov 28, 2025', apps: 2, docs: '6/6' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'active' && u.status === 'active') || (filter === 'inactive' && u.status === 'inactive');
    return matchSearch && matchFilter;
  });

  const selectedUser = users.find(u => u.id === selected);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Students</h1>
          <p>{users.length} registered students</p>
        </div>
        <Link href="/contact" className="btn-orange" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
          + Invite Student
        </Link>
      </div>

      {/* STATS */}
      <div className="dash-stats" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Students', value: users.length.toString(), icon: '👥' },
          { label: 'Active', value: users.filter(u => u.status === 'active').length.toString(), icon: '✅' },
          { label: 'With Applications', value: users.filter(u => u.apps > 0).length.toString(), icon: '📋' },
          { label: 'Docs Complete', value: users.filter(u => u.docs === '6/6').length.toString(), icon: '📄' },
        ].map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="dash-card">
        <div className="table-toolbar">
          <input
            className="table-search"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="table-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span style={{ fontSize: '0.82rem', color: 'var(--gray)', marginLeft: 'auto' }}>
            {filtered.length} of {users.length} students
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Destination</th>
                <th>Apps</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0, fontFamily: 'var(--font-display)' }}>
                        {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="td-name">{u.name}</div>
                        <div className="td-sub">{u.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="td-name" style={{ fontSize: '0.82rem' }}>{u.email}</div>
                    <div className="td-sub">{u.phone}</div>
                  </td>
                  <td><span style={{ fontSize: '0.85rem', color: 'var(--blue)', fontWeight: 600 }}>🌍 {u.preferredDest}</span></td>
                  <td>
                    <span style={{ background: u.apps > 0 ? 'var(--blue-light)' : 'var(--off)', color: u.apps > 0 ? 'var(--blue)' : 'var(--gray)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700 }}>
                      {u.apps} apps
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: u.docs === '6/6' ? '#16a34a' : 'var(--orange2)' }}>
                      {u.docs === '6/6' ? '✅' : '⚠️'} {u.docs}
                    </div>
                  </td>
                  <td>
                    <span style={{ background: u.status === 'active' ? '#dcfce7' : '#fee2e2', color: u.status === 'active' ? '#166534' : '#dc2626', padding: '3px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {u.status === 'active' ? '● Active' : '○ Inactive'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{u.createdAt}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="action-btn action-btn-blue" onClick={() => setSelected(u.id)}>View</button>
                      <button className={`action-btn ${u.status === 'active' ? 'action-btn-red' : 'action-btn-green'}`} onClick={() => toggleStatus(u.id)}>
                        {u.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No students found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* STUDENT DETAIL MODAL */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Student Profile</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', padding: '16px', background: 'var(--off)', borderRadius: '12px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0, fontFamily: 'var(--font-display)' }}>
                {selectedUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--blue)' }}>{selectedUser.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{selectedUser.email}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '3px' }}>{selectedUser.phone}</div>
              </div>
            </div>
            {[
              ['Country', selectedUser.country],
              ['Preferred Destination', selectedUser.preferredDest],
              ['Applications', `${selectedUser.apps} application(s)`],
              ['Documents', selectedUser.docs],
              ['Status', selectedUser.status],
              ['Joined', selectedUser.createdAt],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--border)', fontSize: '0.87rem' }}>
                <span style={{ color: 'var(--gray)', fontWeight: 600 }}>{k}</span>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <a href={`mailto:${selectedUser.email}`} className="btn-blue" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem', padding: '11px' }}>
                ✉️ Email Student
              </a>
              <button className={`action-btn ${selectedUser.status === 'active' ? 'action-btn-red' : 'action-btn-green'}`}
                style={{ flex: 1, justifyContent: 'center', padding: '11px', fontSize: '0.875rem' }}
                onClick={() => { toggleStatus(selectedUser.id); setSelected(null); }}>
                {selectedUser.status === 'active' ? '🚫 Disable Account' : '✅ Enable Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
