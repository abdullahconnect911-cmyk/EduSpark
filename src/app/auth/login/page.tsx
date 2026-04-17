'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/student';
  const errorParam = searchParams.get('error');

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const res = await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setStatus('error');
      setErrorMsg('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <Link href="/" className="auth-logo">
        <div className="auth-logo-mark">E</div>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)' }}>EduSpark</div>
          <div style={{ fontSize: '0.62rem', color: 'var(--gray)' }}>International Study</div>
        </div>
      </Link>

      <h1>Welcome back</h1>
      <p className="auth-sub">Sign in to your EduSpark account to track your application and access all services.</p>

      {(errorParam === 'CredentialsSignin' || status === 'error') && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <span>{errorMsg || 'Invalid email or password.'}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              name="email" type="email" required
              value={form.email} onChange={handleChange}
              className="form-input" placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
            <label className="form-label" style={{ margin: 0 }}>Password</label>
            <Link href="/auth/forgot" style={{ fontSize: '0.8rem', color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              name="password" type={showPass ? 'text' : 'password'} required
              value={form.password} onChange={handleChange}
              className="form-input" placeholder="Your password"
              autoComplete="current-password"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-blue"
          style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: status === 'loading' ? 0.7 : 1 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '⏳ Signing in...' : '→ Sign In'}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '60123456789'}?text=Hi, I need help logging into my EduSpark account`}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          padding: '12px', border: '1.5px solid var(--border)', borderRadius: '10px',
          fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none',
          transition: '0.2s',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>💬</span> Get help via WhatsApp
      </a>

      <p className="auth-footer-link">
        Don't have an account? <Link href="/auth/register">Sign up free →</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="auth-wrap" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Student Portal
            </div>
            <h2>Track Your Journey to Global Education</h2>
            <p>Access your application status, upload documents, communicate with your counselor, and stay updated at every step.</p>
          </div>

          {[
            { icon: '📋', title: 'Real-time Application Tracking', desc: 'See exactly where your application stands' },
            { icon: '🔔', title: 'Instant Notifications', desc: 'Never miss an update or deadline' },
            { icon: '📄', title: 'Document Management', desc: 'Upload and manage all your documents' },
            { icon: '💬', title: 'Direct Counselor Chat', desc: 'Get answers fast via WhatsApp or portal' },
          ].map((f, i) => (
            <div key={i} className="auth-feature">
              <span className="auth-feature-icon">{f.icon}</span>
              <div className="auth-feature-text">
                <strong>{f.title}</strong>
                <span>{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
