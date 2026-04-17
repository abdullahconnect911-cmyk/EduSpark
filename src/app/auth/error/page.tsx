import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h)', background: 'var(--off)' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', padding: '48px 32px', background: '#fff', borderRadius: '20px', border: '1.5px solid var(--border)', boxShadow: 'var(--sh)' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--blue)', marginBottom: '12px', fontSize: '1.5rem' }}>Authentication Error</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '28px', lineHeight: 1.7, fontSize: '0.9rem' }}>
          Something went wrong during sign in. Please try again or contact support.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth/login" className="btn-blue">Try Again</Link>
          <Link href="/contact" className="btn-outline-w" style={{ color: 'var(--blue)', borderColor: 'var(--border)' }}>Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
