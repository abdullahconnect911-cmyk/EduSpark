'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    if (res?.ok) router.push(callbackUrl);
    else setStatus('error');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)', top: '-100px', right: '-100px', filter: 'blur(60px)' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="EduSpark International Study" style={{ height: '72px', width: 'auto', display: 'block', objectFit: 'contain', background: '#fff', borderRadius: '12px', padding: '8px 14px' }} />
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Admin Control Panel</div>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '20px', padding: '36px 32px', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '6px' }}>Admin Sign In</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '28px' }}>Restricted access — authorised personnel only.</p>

          {status === 'error' && (
            <div className="alert alert-error"><span>⚠️</span><span>Invalid credentials. Please try again.</span></div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input type="email" required autoComplete="email" className="form-input" placeholder="admin@eduspark.com"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input type={showPass ? 'text' : 'password'} required autoComplete="current-password" className="form-input" placeholder="Your admin password"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>
            <button type="submit" className="btn-blue" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: status === 'loading' ? 0.75 : 1 }} disabled={status === 'loading'}>
              {status === 'loading' ? '⏳ Signing in...' : '🔑 Sign In to Admin Panel'}
            </button>
          </form>

          {/* Credential hint */}
          <div style={{ marginTop: '24px', padding: '14px 16px', background: 'var(--off)', borderRadius: '10px', border: '1.5px solid var(--border)', fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>🔐 Your credentials</div>
            <div>Email: <code style={{ background: 'var(--blue-light)', color: 'var(--blue)', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>admin@eduspark.com</code></div>
            <div style={{ marginTop: '5px' }}>Password: <code style={{ background: 'var(--blue-light)', color: 'var(--blue)', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>admin123456</code></div>
            <div style={{ marginTop: '10px', padding: '8px 10px', background: '#fef9c3', borderRadius: '8px', color: '#a16207', fontSize: '0.72rem' }}>
              ⚠️ Set <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> in <code>.env.local</code> to use your own credentials.
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
          Not an admin? <Link href="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>← Back to website</Link>
          {' · '}
          <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Student login</Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#fff' }}>Loading...</div></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
