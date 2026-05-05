'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

type LocalUser = { name: string; email: string } | null;

function AuthModal({ onClose, onLogin }: { onClose: () => void; onLogin: (user: LocalUser) => void }) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) return 'Enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (tab === 'signup' && !name.trim()) return 'Name is required.';
    return '';
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    if (tab === 'signup') {
      const users = JSON.parse(localStorage.getItem('es_users') || '[]');
      if (users.find((u: any) => u.email === email)) { setError('Email already registered. Please log in.'); return; }
      const user = { name: name.trim(), email, password, country };
      localStorage.setItem('es_users', JSON.stringify([...users, user]));
      localStorage.setItem('es_session', JSON.stringify({ name: user.name, email: user.email }));
      onLogin({ name: user.name, email: user.email });
    } else {
      const users = JSON.parse(localStorage.getItem('es_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (!user) { setError('Invalid email or password.'); return; }
      localStorage.setItem('es_session', JSON.stringify({ name: user.name, email: user.email }));
      onLogin({ name: user.name, email: user.email });
    }
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue)', fontFamily: 'var(--font-head)' }}>
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--gray)' }}>×</button>
        </div>
        <div style={{ display: 'flex', background: 'var(--off)', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }} style={{ flex: 1, padding: '9px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'var(--font-body)', transition: '0.2s', background: tab === t ? '#fff' : 'transparent', color: tab === t ? 'var(--blue)' : 'var(--gray)', boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>
              {t === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>
        {error && <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem', marginBottom: '14px', fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tab === 'signup' && (
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={{ padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" type="email" style={{ padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 6 chars)" type="password" style={{ padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
          {tab === 'signup' && (
            <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country (e.g. Bangladesh)" style={{ padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
          )}
          <button onClick={handleSubmit} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'var(--font-body)', marginTop: '4px', transition: '0.2s' }}>
            {tab === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray)', marginTop: '16px', marginBottom: 0 }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            {tab === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState<LocalUser>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const stored = localStorage.getItem('es_session');
    if (stored) { try { setLocalUser(JSON.parse(stored)); } catch {} }
  }, []);

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

  const handleLocalLogout = () => {
    localStorage.removeItem('es_session');
    setLocalUser(null);
    setUserMenuOpen(false);
  };

  const navLinks = [
    { href: '/destinations', label: 'Study Destinations' },
    { href: '/universities', label: 'Universities' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Our Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
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
            ) : localUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)' }}>Welcome, {localUser.name.split(' ')[0]}</span>
                <button onClick={handleLocalLogout} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '7px 14px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Logout</button>
              </div>
            ) : (
              <button onClick={() => setModalOpen(true)} className="nav-cta-btn" style={{ background: 'var(--blue)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Sign Up / Login
              </button>
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
          ) : localUser ? (
            <>
              <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--blue)', padding: '14px 18px', fontSize: '1rem' }}>Welcome, {localUser.name.split(' ')[0]}</div>
              <button onClick={handleLocalLogout} style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '12px', fontWeight: 700, padding: '14px 18px', border: 'none', cursor: 'pointer', fontSize: '1rem', width: '100%', fontFamily: 'var(--font-body)' }}>Logout</button>
            </>
          ) : (
            <button onClick={() => { setMobileOpen(false); setModalOpen(true); document.body.style.overflow = ''; }} style={{ background: 'var(--blue)', color: '#fff', borderRadius: '12px', fontWeight: 700, marginTop: '12px', padding: '14px 18px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
              Sign Up / Login
            </button>
          )}
        </div>
      )}

      {modalOpen && <AuthModal onClose={() => setModalOpen(false)} onLogin={setLocalUser} />}

      <style>{`
        @media (max-width: 768px) {
          .nav-menu { display: none !important; }
          #hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
