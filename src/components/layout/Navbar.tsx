'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const navLinks = [
    { href: '/destinations', label: 'Study Destinations' },
    { href: '/universities', label: 'Universities' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Our Services' },
    { href: '/blog', label: 'Blog' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const initials = session?.user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '?';
  const dashHref = session?.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-wrap">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">E</div>
            <div className="nav-logo-text">
              <span className="nav-logo-title">EduSpark</span>
              <span className="nav-logo-sub">International Study</span>
            </div>
          </Link>

          <div className="nav-menu" style={{ display: 'flex' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={`nav-link${isActive(link.href) ? ' active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {session ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--off)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: '0.2s' }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.7rem' }}>
                    {initials}
                  </div>
                  <span style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--text)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {session.user.name?.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--gray)' }}>▼</span>
                </button>
                {userMenuOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '8px', minWidth: '200px', boxShadow: 'var(--sh2)', zIndex: 100 }}>
                    <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--border)', marginBottom: '6px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>{session.user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{session.user.email}</div>
                    </div>
                    {[
                      { href: dashHref, icon: '🏠', label: 'Dashboard' },
                      { href: `${dashHref}/profile`, icon: '👤', label: 'My Profile' },
                      { href: `${dashHref}/applications`, icon: '📋', label: 'Applications' },
                      { href: `${dashHref}/notifications`, icon: '🔔', label: 'Notifications' },
                    ].map(item => (
                      <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '9px', textDecoration: 'none', fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500, transition: '0.15s' }}
                        onMouseOver={e => (e.currentTarget.style.background = 'var(--off)')}
                        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                        <span>{item.icon}</span>{item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border)', marginTop: '6px', paddingTop: '6px' }}>
                      <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '9px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#dc2626', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="nav-auth-link" style={{ display: 'none' }}>Sign In</Link>
                <Link href="/contact" className="nav-cta-btn">Contact Us</Link>
              </>
            )}

            <button onClick={toggleMobile} style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }} id="hamburger" aria-label="Toggle menu">
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', opacity: mobileOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 998, display: 'flex', flexDirection: 'column', gap: '4px', padding: '20px 24px 40px', overflowY: 'auto' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: '1rem', fontWeight: 500, padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', color: 'var(--text)', display: 'block', background: isActive(link.href) ? 'var(--blue-light)' : 'transparent' }}>
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href={dashHref} style={{ background: 'var(--blue-light)', color: 'var(--blue)', textAlign: 'center', borderRadius: '12px', fontWeight: 700, marginTop: '12px', padding: '14px 18px', textDecoration: 'none', display: 'block', fontSize: '1rem' }}>
                🏠 My Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '12px', fontWeight: 700, marginTop: '8px', padding: '14px 18px', border: 'none', cursor: 'pointer', fontSize: '1rem', width: '100%', fontFamily: 'var(--font-body)' }}>
                🚪 Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/contact" style={{ background: 'var(--orange)', color: '#fff', textAlign: 'center', borderRadius: '12px', fontWeight: 700, marginTop: '12px', padding: '14px 18px', textDecoration: 'none', display: 'block', fontSize: '1rem' }}>
                📞 Contact Us
              </Link>
              <Link href="/auth/login" style={{ color: 'var(--blue)', textAlign: 'center', borderRadius: '12px', fontWeight: 600, marginTop: '8px', padding: '14px 18px', textDecoration: 'none', display: 'block', fontSize: '1rem', border: '1.5px solid var(--border)' }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-menu { display: none !important; }
          #hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
