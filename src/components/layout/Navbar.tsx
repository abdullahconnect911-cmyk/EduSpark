'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-wrap">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">E</div>
            <div className="nav-logo-text">
              <span className="nav-logo-title">EduSpark</span>
              <span className="nav-logo-sub">International Study</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-menu" style={{ display: 'flex' }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive(link.href) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="nav-auth" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/auth/login" className="nav-auth-link" style={{ display: 'none' }}>
              Sign In
            </Link>
            <Link href="/contact" className="nav-cta-btn">
              Contact Us
            </Link>
            {/* Hamburger */}
            <button
              onClick={toggleMobile}
              style={{
                display: 'none',
                flexDirection: 'column', gap: '5px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
              }}
              id="hamburger"
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', opacity: mobileOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--blue)', borderRadius: '2px', transition: '0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: '#fff', zIndex: 998, display: 'flex', flexDirection: 'column',
          gap: '4px', padding: '20px 24px 40px', overflowY: 'auto',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '1rem', fontWeight: 500, padding: '14px 18px', borderRadius: '12px',
                transition: '0.2s', textDecoration: 'none', color: 'var(--text)', display: 'block',
                background: isActive(link.href) ? 'var(--blue-light)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              background: 'var(--orange)', color: '#fff', textAlign: 'center',
              borderRadius: '12px', fontWeight: 700, marginTop: '12px',
              padding: '14px 18px', textDecoration: 'none', display: 'block', fontSize: '1rem',
            }}
          >
            📞 Contact Us
          </Link>
          <Link
            href="/auth/login"
            style={{
              color: 'var(--blue)', textAlign: 'center', borderRadius: '12px', fontWeight: 600,
              marginTop: '8px', padding: '14px 18px', textDecoration: 'none', display: 'block',
              fontSize: '1rem', border: '1.5px solid var(--border)',
            }}
          >
            Sign In
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-menu { display: none !important; }
          #hamburger { display: flex !important; }
          .nav-auth-link { display: none !important; }
        }
      `}</style>
    </>
  );
}
