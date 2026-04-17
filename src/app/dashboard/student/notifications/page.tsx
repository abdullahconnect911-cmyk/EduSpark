'use client';
import { useState } from 'react';

const initialNotifs = [
  { id: '1', type: 'application', icon: '📋', title: 'Application Update', msg: "Your application to Taylor's University has moved to the reviewing stage. Your counselor is following up with the admissions office.", time: '2 hours ago', date: 'Today', read: false },
  { id: '2', type: 'document', icon: '📄', title: 'Document Required', msg: 'Please upload your passport-size photo and bank statement to complete your application checklist.', time: '1 day ago', date: 'Yesterday', read: false },
  { id: '3', type: 'counselor', icon: '💬', title: 'Message from Counselor', msg: 'Hi! Your application is looking great. We expect an offer letter from Taylor\'s within 5–7 business days. Let me know if you have any questions.', time: '2 days ago', date: 'Jan 16, 2026', read: true },
  { id: '4', type: 'info', icon: '🏛️', title: 'New University Match', msg: "Based on your profile, UCSI University's Computer Science program may be a great fit for you. Intake: July 2026, Tuition: RM 38,000/year.", time: '3 days ago', date: 'Jan 15, 2026', read: true },
  { id: '5', type: 'success', icon: '✅', title: 'Application Submitted', msg: 'Your application to APU Malaysia has been successfully submitted by your counselor. Reference: APU-2026-0447.', time: '1 week ago', date: 'Jan 11, 2026', read: true },
  { id: '6', type: 'welcome', icon: '🎉', title: 'Welcome to EduSpark!', msg: 'Your account is active. Your dedicated counselor will contact you within 24 hours to discuss your personalized study plan.', time: '2 weeks ago', date: 'Jan 8, 2026', read: true },
];

const typeColors: Record<string, string> = {
  application: 'var(--blue)',
  document: 'var(--orange)',
  counselor: '#7c3aed',
  info: '#0891b2',
  success: '#16a34a',
  welcome: 'var(--orange)',
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ padding: '10px 20px', background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
            ✓ Mark all as read
          </button>
        )}
      </div>

      {unreadCount === 0 && (
        <div className="alert alert-success">
          <span>✅</span>
          <span>You're all caught up! No unread notifications.</span>
        </div>
      )}

      <div className="dash-card">
        {notifs.map((n, i) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            style={{
              display: 'flex', gap: '16px', padding: '18px 0',
              borderBottom: i < notifs.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: 'pointer', transition: '0.2s',
              background: !n.read ? 'transparent' : 'transparent',
            }}
          >
            {/* Icon */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
              background: !n.read ? `${typeColors[n.type]}18` : 'var(--off)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
              border: !n.read ? `1.5px solid ${typeColors[n.type]}30` : '1.5px solid var(--border)',
            }}>
              {n.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.87rem', fontWeight: !n.read ? 700 : 600, color: 'var(--text)' }}>{n.title}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', display: 'block' }} />}
                  <span style={{ fontSize: '0.72rem', color: 'var(--gray)', whiteSpace: 'nowrap' }}>{n.time}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--gray)', lineHeight: 1.65, margin: 0 }}>{n.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
