'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
}

const navItems = [
  { href: '/dashboard/admin', icon: '📊', label: 'Overview', exact: true },
  { href: '/dashboard/admin/users', icon: '👥', label: 'Students' },
  { href: '/dashboard/admin/applications', icon: '📋', label: 'Applications' },
  { href: '/dashboard/admin/leads', icon: '🎯', label: 'Leads / CRM' },
  { href: '/dashboard/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'A';

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="sidebar admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user-av">{initials}</div>
        <div className="sidebar-user-name">{user?.name || 'Admin'}</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{user?.email}</div>
        <div className="sidebar-user-role">🔑 Administrator</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Dashboard</div>
        {navItems.map(item => (
          <Link key={item.href} href={item.href}
            className={`sidebar-link${isActive(item.href, item.exact) ? ' active' : ''}`}>
            <div className="sidebar-icon">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: '16px' }}>Public Site</div>
        {[
          { href: '/', icon: '🌐', label: 'View Website' },
          { href: '/contact', icon: '📞', label: 'Contact Page' },
        ].map(item => (
          <Link key={item.href} href={item.href} className="sidebar-link" target={item.href === '/' ? '_blank' : undefined}>
            <div className="sidebar-icon">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            width: '100%', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', transition: '0.2s',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.15)';
            (e.currentTarget as HTMLButtonElement).style.color = '#f87171';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
