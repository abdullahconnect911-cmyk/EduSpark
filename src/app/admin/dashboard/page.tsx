import Link from 'next/link';

const stats = [
  { label: 'Total Students', value: '47', sub: '+8 this month', icon: '👥', accent: '' },
  { label: 'Active Applications', value: '23', sub: '6 under review', icon: '📋', accent: 'accent-orange' },
  { label: 'New Leads', value: '12', sub: '5 uncontacted', icon: '🎯', accent: '' },
  { label: 'Visa Success Rate', value: '98%', sub: 'All time record', icon: '✅', accent: 'accent-green' },
  { label: 'Enrolled This Month', value: '9', sub: '3 Malaysia · 4 UK · 2 other', icon: '🎓', accent: 'accent-green' },
  { label: 'Pending Documents', value: '14', sub: 'Across 8 students', icon: '📄', accent: 'accent-orange' },
  { label: 'Revenue (Est.)', value: '$12.4k', sub: 'Service fees collected', icon: '💰', accent: '' },
  { label: 'Offer Letters', value: '6', sub: 'Received this week', icon: '🏛️', accent: 'accent-purple' },
];

const recentActivity = [
  { dot: 'var(--blue)', msg: <><strong>Rahim Uddin</strong> submitted application to Taylor&apos;s University</>, time: '10 min ago' },
  { dot: 'var(--orange)', msg: <><strong>Nadia Islam</strong> uploaded HSC certificate</>, time: '42 min ago' },
  { dot: '#16a34a', msg: <><strong>APU Malaysia</strong> issued offer letter for Karim Hassan</>, time: '2 hours ago' },
  { dot: '#7c3aed', msg: <>New lead from contact form: <strong>Sadia Rahman</strong> (interested in UK)</>, time: '3 hours ago' },
  { dot: 'var(--blue)', msg: <><strong>Farhan Ahmed</strong> registered a new account</>, time: '5 hours ago' },
  { dot: '#16a34a', msg: <><strong>Mitu Begum</strong> visa approved — Malaysia</>, time: '1 day ago' },
  { dot: 'var(--orange)', msg: <>Application deadline reminder sent to <strong>6 students</strong></>, time: '1 day ago' },
  { dot: '#7c3aed', msg: <>New lead from WhatsApp: <strong>Tanvir Hossain</strong></>, time: '2 days ago' },
];

const applicationsByStatus = [
  { label: 'Enrolled', count: 18, color: '#16a34a', pct: 78 },
  { label: 'Offer Received', count: 6, color: '#0891b2', pct: 52 },
  { label: 'Under Review', count: 6, color: 'var(--orange)', pct: 52 },
  { label: 'Submitted', count: 11, color: 'var(--blue)', pct: 40 },
  { label: 'Draft', count: 4, color: 'var(--gray)', pct: 17 },
];

const destinationBreakdown = [
  { flag: '🇲🇾', country: 'Malaysia', count: 31, pct: 66 },
  { flag: '🇬🇧', country: 'UK', count: 8, pct: 17 },
  { flag: '🇦🇺', country: 'Australia', count: 5, pct: 11 },
  { flag: '🇺🇸', country: 'USA', count: 2, pct: 4 },
  { flag: '🇨🇦', country: 'Canada', count: 1, pct: 2 },
];

export default function AdminOverviewPage() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Admin Overview</h1>
          <p>{today}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/dashboard/leads" className="btn-orange" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
            + New Lead
          </Link>
          <Link href="/admin/dashboard/applications" className="btn-blue" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
            View Applications
          </Link>
        </div>
      </div>

      {/* STATS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        {stats.map((s, i) => (
          <div key={i} className={`dash-stat-card ${s.accent}`}>
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid-2">
        {/* APPLICATIONS BY STATUS */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">📋 Applications by Status</span>
            <Link href="/admin/dashboard/applications" className="dash-card-action">Manage →</Link>
          </div>
          <div className="chart-bar-wrap">
            {applicationsByStatus.map((item, i) => (
              <div key={i} className="chart-bar-row">
                <span className="chart-bar-label">{item.label}</span>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <span className="chart-bar-val">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DESTINATION BREAKDOWN */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">🌍 Students by Destination</span>
          </div>
          <div className="chart-bar-wrap">
            {destinationBreakdown.map((item, i) => (
              <div key={i} className="chart-bar-row">
                <span className="chart-bar-label">{item.flag} {item.country}</span>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill" style={{ width: `${item.pct}%`, background: 'var(--blue)' }} />
                </div>
                <span className="chart-bar-val">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-grid-2">
        {/* ACTIVITY FEED */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">⚡ Recent Activity</span>
          </div>
          {recentActivity.map((item, i) => (
            <div key={i} className="activity-item">
              <div className="activity-dot" style={{ background: item.dot }} />
              <div>
                <div className="activity-msg">{item.msg}</div>
                <div className="activity-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <div className="dash-card" style={{ marginBottom: '20px' }}>
            <div className="dash-card-header">
              <span className="dash-card-title">⚡ Quick Actions</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { href: '/admin/dashboard/users', icon: '👥', label: 'Manage Students', color: 'var(--blue-light)', textColor: 'var(--blue)' },
                { href: '/admin/dashboard/applications', icon: '📋', label: 'Review Applications', color: 'var(--orange-lt)', textColor: 'var(--orange2)' },
                { href: '/admin/dashboard/leads', icon: '🎯', label: 'Follow Up Leads', color: '#f0fdf4', textColor: '#166534' },
                { href: '/admin/dashboard/settings', icon: '⚙️', label: 'Settings', color: 'var(--off)', textColor: 'var(--text)' },
              ].map((a, i) => (
                <Link key={i} href={a.href} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '14px',
                  background: a.color, borderRadius: '12px', textDecoration: 'none', transition: '0.2s',
                  border: '1.5px solid transparent',
                }}
                  onMouseOver={e => (e.currentTarget.style.border = '1.5px solid var(--border)')}
                  onMouseOut={e => (e.currentTarget.style.border = '1.5px solid transparent')}
                >
                  <span style={{ fontSize: '1.4rem' }}>{a.icon}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: a.textColor }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* PENDING TASKS */}
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="dash-card-title">📌 Pending Tasks</span>
            </div>
            {[
              { text: 'Follow up with 5 new leads', urgency: 'high', icon: '🎯' },
              { text: 'Review 3 submitted applications', urgency: 'high', icon: '📋' },
              { text: 'Chase 4 students for missing documents', urgency: 'medium', icon: '📄' },
              { text: 'Send intake reminder to July applicants', urgency: 'low', icon: '📅' },
            ].map((task, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ fontSize: '1.1rem' }}>{task.icon}</span>
                <span style={{ flex: 1, fontSize: '0.85rem', color: 'var(--text)' }}>{task.text}</span>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, padding: '3px 9px', borderRadius: '100px',
                  background: task.urgency === 'high' ? '#fee2e2' : task.urgency === 'medium' ? '#fef9c3' : 'var(--off)',
                  color: task.urgency === 'high' ? '#dc2626' : task.urgency === 'medium' ? '#a16207' : 'var(--gray)',
                }}>
                  {task.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
