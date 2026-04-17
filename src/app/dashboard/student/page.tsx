import { auth } from '@/auth';
import Link from 'next/link';

const mockApplications = [
  { id: '1', university: "Taylor's University", course: 'BSc Computer Science', country: 'Malaysia', status: 'reviewing', intake: 'Jul 2026', updatedAt: '2 days ago' },
  { id: '2', university: 'APU Malaysia', course: 'BSc Data Science', country: 'Malaysia', status: 'submitted', intake: 'Jul 2026', updatedAt: '1 week ago' },
];

const mockNotifs = [
  { id: '1', title: 'Application Update', msg: "Your application to Taylor's University has moved to the reviewing stage.", time: '2 hours ago', read: false },
  { id: '2', title: 'Document Required', msg: 'Please upload your HSC transcript to complete your application.', time: '1 day ago', read: false },
  { id: '3', title: 'Welcome to EduSpark!', msg: 'Your account is ready. Your counselor will contact you within 24 hours.', time: '3 days ago', read: true },
];

const journeySteps = [
  { label: 'Consultation', done: true },
  { label: 'Application', done: true },
  { label: 'Offer Letter', done: false, active: true },
  { label: 'Visa', done: false },
  { label: 'Departure', done: false },
];

export default async function StudentOverviewPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(' ')[0] || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1>{greeting}, {firstName}! 👋</h1>
          <p>Here's an overview of your study abroad journey.</p>
        </div>
        <Link href="/contact" className="btn-orange" style={{ fontSize: '0.875rem', padding: '11px 22px' }}>
          💬 Talk to Counselor
        </Link>
      </div>

      {/* STATS */}
      <div className="dash-stats">
        {[
          { label: 'Applications', value: '2', sub: '1 under review', icon: '📋' },
          { label: 'Documents', value: '4/6', sub: '2 still needed', icon: '📄' },
          { label: 'Notifications', value: '2', sub: 'Unread', icon: '🔔' },
          { label: 'Journey Stage', value: '3/5', sub: 'Offer letter stage', icon: '🎯' },
        ].map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* JOURNEY PROGRESS */}
      <div className="dash-card">
        <div className="dash-card-header">
          <span className="dash-card-title">🗺️ Your Journey Progress</span>
        </div>
        <div className="progress-steps">
          {journeySteps.map((step, i) => (
            <div key={i} className={`progress-step${step.done ? ' done' : step.active ? ' active' : ''}`}>
              <div className="ps-dot">
                {step.done ? '✓' : i + 1}
              </div>
              <div className="ps-step-label">{step.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--orange-lt)', borderRadius: '10px', padding: '14px 18px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.2rem' }}>⏳</span>
          <div>
            <div style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--orange2)' }}>Awaiting Offer Letter</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Your counselor is following up with the university. Expected within 5–7 business days.</div>
          </div>
        </div>
      </div>

      <div className="dash-grid-2">
        {/* APPLICATIONS */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">📋 My Applications</span>
            <Link href="/dashboard/student/applications" className="dash-card-action">View all →</Link>
          </div>
          {mockApplications.map(app => (
            <div key={app.id} className="app-row">
              <div>
                <div className="app-uni">{app.university}</div>
                <div className="app-course">{app.course} · {app.country}</div>
              </div>
              <div className="app-meta">Intake: {app.intake}</div>
              <span className={`status-badge status-${app.status}`}>
                {app.status === 'reviewing' ? '🔍 Reviewing' : app.status === 'submitted' ? '📨 Submitted' : app.status}
              </span>
              <div className="app-meta">{app.updatedAt}</div>
            </div>
          ))}
          <Link href="/dashboard/student/applications/new" className="btn-blue" style={{ marginTop: '16px', display: 'inline-flex', fontSize: '0.85rem', padding: '10px 20px' }}>
            + New Application
          </Link>
        </div>

        {/* NOTIFICATIONS */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">🔔 Recent Notifications</span>
            <Link href="/dashboard/student/notifications" className="dash-card-action">View all →</Link>
          </div>
          {mockNotifs.slice(0, 3).map(n => (
            <div key={n.id} className="notif-item">
              <div className={`notif-dot ${n.read ? 'read' : 'unread'}`} />
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                <div className="notif-msg">{n.msg}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="dash-card">
        <div className="dash-card-header">
          <span className="dash-card-title">⚡ Quick Actions</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { href: '/dashboard/student/applications/new', icon: '📋', label: 'New Application' },
            { href: '/dashboard/student/documents', icon: '📄', label: 'Upload Document' },
            { href: '/contact', icon: '💬', label: 'Message Counselor' },
            { href: '/universities', icon: '🏛️', label: 'Browse Universities' },
          ].map((a, i) => (
            <Link key={i} href={a.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              padding: '20px 12px', background: 'var(--off)', border: '1.5px solid var(--border)',
              borderRadius: '12px', textDecoration: 'none', transition: '0.25s', textAlign: 'center',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--blue)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--blue-light)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--off)'; }}
            >
              <span style={{ fontSize: '1.8rem' }}>{a.icon}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
