'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Account', 'Personal', 'Academic'];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '',
    nationality: 'Bangladeshi', dateOfBirth: '', country: 'Bangladesh',
    highestEducation: '', gpa: '', englishProficiency: '',
    preferredCountry: '', preferredCourse: '', budget: '', intake: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleNext = () => {
    if (step === 0) {
      if (!form.name || !form.email || !form.password) return setErrorMsg('Please fill all required fields.');
      if (form.password !== form.confirmPassword) return setErrorMsg('Passwords do not match.');
      if (form.password.length < 8) return setErrorMsg('Password must be at least 8 characters.');
    }
    setErrorMsg('');
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/auth/login?registered=1'), 2000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="auth-wrap" style={{ paddingTop: 'var(--nav-h)' }}>
        <div className="auth-left">
          <div className="auth-left-content">
            <h2>Welcome to EduSpark! 🎉</h2>
            <p>Your account has been created. Your dedicated counselor will reach out within 24 hours.</p>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-box" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--blue)', marginBottom: '12px' }}>Account Created!</h2>
            <p style={{ color: 'var(--gray)', marginBottom: '24px', lineHeight: 1.7 }}>
              Welcome to EduSpark, {form.name.split(' ')[0]}! Redirecting you to sign in...
            </p>
            <div style={{ width: '40px', height: '4px', background: 'var(--blue)', borderRadius: '2px', margin: '0 auto', animation: 'fadeIn 0.3s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrap" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Join EduSpark
            </div>
            <h2>Start Your Global Education Journey Today</h2>
            <p>Create a free account and get access to personalized guidance, university recommendations, and step-by-step support.</p>
          </div>
          {[
            { icon: '🆓', title: 'Free Consultation Included', desc: 'Your counselor contacts you within 24 hours' },
            { icon: '🎯', title: 'Personalized Roadmap', desc: 'Custom plan based on your goals & budget' },
            { icon: '🔒', title: 'Secure & Confidential', desc: 'Your data is never shared with third parties' },
            { icon: '🌍', title: '12 Countries, 20+ Universities', desc: 'Access to our full partner network' },
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

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-box">
          <Link href="/" className="auth-logo">
            <div className="auth-logo-mark">E</div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)' }}>EduSpark</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--gray)' }}>International Study</div>
            </div>
          </Link>

          <h1>Create Account</h1>
          <p className="auth-sub">Step {step + 1} of {steps.length} — {steps[step]}</p>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                  height: '4px', borderRadius: '2px',
                  background: i <= step ? 'var(--blue)' : 'var(--border)',
                  transition: '0.3s',
                }} />
                <span style={{ fontSize: '0.68rem', fontWeight: i === step ? 700 : 500, color: i <= step ? 'var(--blue)' : 'var(--gray)' }}>{s}</span>
              </div>
            ))}
          </div>

          {errorMsg && (
            <div className="alert alert-error"><span>⚠️</span><span>{errorMsg}</span></div>
          )}

          <form onSubmit={step === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

            {/* STEP 0 — Account */}
            {step === 0 && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input name="name" required value={form.name} onChange={handleChange} className="form-input" placeholder="Your full name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <div className="input-wrap">
                    <span className="input-icon">✉️</span>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <div className="input-wrap">
                    <span className="input-icon">📞</span>
                    <input name="phone" required value={form.phone} onChange={handleChange} className="form-input" placeholder="+880 or +60..." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange} className="form-input" placeholder="Min. 8 characters" />
                    <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>{showPass ? '🙈' : '👁️'}</button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} className="form-input" placeholder="Repeat password" />
                  </div>
                </div>
              </>
            )}

            {/* STEP 1 — Personal */}
            {step === 1 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nationality</label>
                    <select name="nationality" value={form.nationality} onChange={handleChange} className="form-select">
                      <option>Bangladeshi</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Currently Living In</label>
                  <select name="country" value={form.country} onChange={handleChange} className="form-select">
                    {['Bangladesh', 'Malaysia', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">English Proficiency</label>
                  <select name="englishProficiency" value={form.englishProficiency} onChange={handleChange} className="form-select">
                    <option value="">Select level</option>
                    {['IELTS 6.0+', 'IELTS 6.5+', 'IELTS 7.0+', 'TOEFL 80+', 'Medium of Instruction (MOI)', 'No formal test yet'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </>
            )}

            {/* STEP 2 — Academic */}
            {step === 2 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Highest Education</label>
                    <select name="highestEducation" value={form.highestEducation} onChange={handleChange} className="form-select">
                      <option value="">Select level</option>
                      {['SSC / O-Level', 'HSC / A-Level', 'Diploma', "Bachelor's Degree", "Master's Degree"].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">GPA / Result</label>
                    <input name="gpa" value={form.gpa} onChange={handleChange} className="form-input" placeholder="e.g. 3.5 / 5.0 or A" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Country</label>
                    <select name="preferredCountry" value={form.preferredCountry} onChange={handleChange} className="form-select">
                      <option value="">Select country</option>
                      {['Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Germany', 'Not sure yet'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Intake</label>
                    <select name="intake" value={form.intake} onChange={handleChange} className="form-select">
                      <option value="">Select intake</option>
                      {['January 2026', 'March 2026', 'July 2026', 'September 2026', 'January 2027', 'Flexible'].map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Budget (USD)</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="form-select">
                    <option value="">Select range</option>
                    {['Under $500', '$500–$800', '$800–$1,200', '$1,200–$2,000', 'Over $2,000', 'Need guidance'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Course / Field</label>
                  <input name="preferredCourse" value={form.preferredCourse} onChange={handleChange} className="form-input" placeholder="e.g. Computer Science, Business, Medicine..." />
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  style={{ flex: 1, padding: '13px', borderRadius: '10px', border: '1.5px solid var(--border)', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                  ← Back
                </button>
              )}
              <button
                type="submit"
                className="btn-blue"
                style={{ flex: 2, justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '⏳ Creating account...' : step === steps.length - 1 ? '✅ Create Account' : 'Next →'}
              </button>
            </div>
          </form>

          <p className="auth-footer-link">
            Already have an account? <Link href="/auth/login">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
