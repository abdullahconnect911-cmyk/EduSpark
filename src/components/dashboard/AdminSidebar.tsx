'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, Users, FileText, Target, Settings,
  Globe, Phone, Bot, ChevronLeft, ChevronRight, LogOut, Sparkles
} from 'lucide-react';

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
  basePath?: string;
}

const navItems = (basePath: string) => [
  { href: basePath,                    icon: LayoutDashboard, label: 'Overview',       exact: true },
  { href: `${basePath}/users`,         icon: Users,           label: 'Students' },
  { href: `${basePath}/applications`,  icon: FileText,        label: 'Applications' },
  { href: `${basePath}/leads`,         icon: Target,          label: 'Leads / CRM' },
  { href: `${basePath}/ai`,            icon: Bot,             label: 'AI Assistant',  badge: 'NEW' },
  { href: `${basePath}/settings`,      icon: Settings,        label: 'Settings' },
];

export default function AdminSidebar({ user, basePath = '/admin/dashboard' }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'A';
  const signOutUrl = basePath.startsWith('/admin') ? '/admin/login' : '/auth/login';
  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <style>{`
        .admin-sidebar-new {
          width: ${collapsed ? '72px' : '240px'};
          min-height: 100vh;
          background: #0d1117;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          flex-shrink: 0;
          z-index: 50;
        }
        .asn-logo {
          padding: ${collapsed ? '20px 0' : '20px 16px'};
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          min-height: 68px;
        }
        .asn-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0b3d91, #ff7a00);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; font-weight: 900; color: #fff;
          flex-shrink: 0;
        }
        .asn-logo-text {
          overflow: hidden;
          transition: opacity 0.2s, width 0.3s;
          opacity: ${collapsed ? '0' : '1'};
          width: ${collapsed ? '0' : 'auto'};
          white-space: nowrap;
        }
        .asn-logo-title { font-size: 0.9rem; font-weight: 800; color: #fff; line-height: 1; }
        .asn-logo-sub { font-size: 0.62rem; color: rgba(255,255,255,0.35); margin-top: 2px; letter-spacing: 0.06em; }

        .asn-collapse-btn {
          position: absolute;
          top: 20px; right: -12px;
          width: 24px; height: 24px;
          background: #1c2333;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          transition: all 0.2s; z-index: 10;
        }
        .asn-collapse-btn:hover { background: #0b3d91; color: #fff; border-color: #0b3d91; }

        .asn-user {
          padding: ${collapsed ? '14px 0' : '14px 16px'};
          display: flex; align-items: center; gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          justify-content: ${collapsed ? 'center' : 'flex-start'};
        }
        .asn-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #0b3d91 0%, #ff7a00 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800; color: #fff;
          flex-shrink: 0;
        }
        .asn-user-info {
          overflow: hidden;
          opacity: ${collapsed ? '0' : '1'};
          width: ${collapsed ? '0' : 'auto'};
          transition: opacity 0.2s, width 0.3s;
          white-space: nowrap;
        }
        .asn-user-name { font-size: 0.82rem; font-weight: 700; color: #fff; }
        .asn-user-role { font-size: 0.65rem; color: #ff7a00; font-weight: 600; letter-spacing: 0.06em; }

        .asn-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
        .asn-section-label {
          font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 8px 10px 4px;
          display: ${collapsed ? 'none' : 'block'};
        }

        .asn-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255,255,255,0.45);
          font-size: 0.845rem; font-weight: 500;
          transition: all 0.2s;
          margin-bottom: 2px;
          position: relative;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          white-space: nowrap;
        }
        .asn-link:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.9);
        }
        .asn-link.active {
          background: rgba(11,61,145,0.35);
          color: #fff;
          border: 1px solid rgba(11,61,145,0.5);
        }
        .asn-link.active .asn-icon { color: #60a5fa; }
        .asn-link-label {
          overflow: hidden;
          opacity: ${collapsed ? '0' : '1'};
          width: ${collapsed ? '0' : 'auto'};
          transition: opacity 0.2s, width 0.3s;
        }
        .asn-icon { flex-shrink: 0; width: 16px; height: 16px; }
        .asn-badge {
          margin-left: auto;
          font-size: 0.55rem; font-weight: 800;
          background: linear-gradient(135deg, #ff7a00, #ff9d40);
          color: #fff; border-radius: 4px; padding: 2px 5px;
          letter-spacing: 0.05em;
          display: ${collapsed ? 'none' : 'block'};
        }

        .asn-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 8px 10px;
        }

        .asn-footer { padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.06); }
        .asn-signout {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 10px 10px;
          border-radius: 10px; border: none;
          background: transparent; cursor: pointer;
          color: rgba(255,255,255,0.35);
          font-size: 0.845rem; font-weight: 500;
          font-family: inherit;
          transition: all 0.2s;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
        }
        .asn-signout:hover { background: rgba(239,68,68,0.12); color: #f87171; }
        .asn-signout-label {
          overflow: hidden;
          opacity: ${collapsed ? '0' : '1'};
          width: ${collapsed ? '0' : 'auto'};
          transition: opacity 0.2s, width 0.3s;
          white-space: nowrap;
        }

        /* tooltip for collapsed */
        .asn-link-wrap { position: relative; }
        .asn-tooltip {
          display: none;
          position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%);
          background: #1c2333; border: 1px solid rgba(255,255,255,0.1);
          color: #fff; font-size: 0.78rem; font-weight: 600;
          padding: 5px 10px; border-radius: 6px; white-space: nowrap;
          margin-left: 8px; z-index: 100;
          pointer-events: none;
        }
        ${collapsed ? '.asn-link-wrap:hover .asn-tooltip { display: block; }' : ''}
      `}</style>

      <aside className="admin-sidebar-new">
        {/* Collapse toggle */}
        <button className="asn-collapse-btn" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Logo */}
        <div className="asn-logo">
          <div className="asn-logo-icon">E</div>
          <div className="asn-logo-text">
            <div className="asn-logo-title">EduSpark</div>
            <div className="asn-logo-sub">Admin Panel</div>
          </div>
        </div>

        {/* User */}
        <div className="asn-user">
          <div className="asn-avatar">{initials}</div>
          <div className="asn-user-info">
            <div className="asn-user-name">{user?.name?.split(' ')[0] || 'Admin'}</div>
            <div className="asn-user-role">🔑 Administrator</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="asn-nav">
          <div className="asn-section-label">Dashboard</div>
          {navItems(basePath).map(item => (
            <div key={item.href} className="asn-link-wrap">
              <Link
                href={item.href}
                className={`asn-link${isActive(item.href, item.exact) ? ' active' : ''}`}
              >
                <item.icon className="asn-icon" />
                <span className="asn-link-label">{item.label}</span>
                {item.badge && <span className="asn-badge">{item.badge}</span>}
              </Link>
              {collapsed && <div className="asn-tooltip">{item.label}</div>}
            </div>
          ))}

          <div className="asn-divider" />
          <div className="asn-section-label">Public Site</div>
          <div className="asn-link-wrap">
            <Link href="/" className="asn-link" target="_blank">
              <Globe className="asn-icon" />
              <span className="asn-link-label">View Website</span>
            </Link>
            {collapsed && <div className="asn-tooltip">View Website</div>}
          </div>
          <div className="asn-link-wrap">
            <Link href="/contact" className="asn-link">
              <Phone className="asn-icon" />
              <span className="asn-link-label">Contact Page</span>
            </Link>
            {collapsed && <div className="asn-tooltip">Contact Page</div>}
          </div>
        </nav>

        {/* Footer */}
        <div className="asn-footer">
          <button className="asn-signout" onClick={() => signOut({ callbackUrl: signOutUrl })}>
            <LogOut size={16} style={{ flexShrink: 0 }} />
            <span className="asn-signout-label">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
