'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  user: { name?: string | null; email?: string | null; role?: string };
  notifCount?: number;
}

const navItems = [
  { href: '/dashboard/student', icon: '🏠', label: 'Overview' },
  { href: '/dashboard/student/applications', icon: '📋', label: 'My Applications' },
  { href: '/dashboard/student/documents', icon: '📄', label: 'Documents' },
  { href: '/dashboard/student/notifications', icon: '🔔', label: 'Notifications', badge: true },
  { href: '/dashboard/student/profile', icon: '👤', label: 'My Profile' },
];

export default function StudentSidebar({ user, notifCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

  const isActive = (href: string) => {
    if (href === '/dashboard/student') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* User Header */}
      <div className="sidebar-header">
        <div className="sidebar-user-av">{initials}</div>
        <div className="sidebar-user-name">{user?.name || 'Student'}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>{user?.email}</div>
        <div className="sidebar-user-role">🎓 Student</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>

        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link${isActive(item.href) ? ' active' : ''}`}
          >
            <div className="sidebar-icon">{item.icon}</div>
            <span>{item.label}</span>
            {item.badge && notifCount > 0 && (
              <span className="sidebar-badge">{notifCount > 9 ? '9+' : notifCount}</span>
            )}
          </Link>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: '16px' }}>Quick Links</div>

        <Link href="/contact" className="sidebar-link">
          <div className="sidebar-icon">💬</div>
          <span>Talk to Counselor</span>
        </Link>
        <Link href="/universities" className="sidebar-link">
          <div className="sidebar-icon">🏛️</div>
          <span>Browse Universities</span>
        </Link>
        <Link href="/blog" className="sidebar-link">
          <div className="sidebar-icon">📰</div>
          <span>Blog & Guides</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: '1.5px solid var(--border)', borderRadius: '10px',
            cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray)',
            fontFamily: 'var(--font-body)', transition: '0.2s',
          }}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray)'; }}
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
