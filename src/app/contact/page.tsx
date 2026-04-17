'use client';
import { useState } from 'react';

const countries = ['Bangladesh', 'Malaysia', 'Other'];
const interestedIn = ['Malaysia', 'UK', 'USA', 'Australia', 'Canada', 'Germany', 'Other'];
const levels = ["Foundation / A-Level", "Bachelor's Degree", "Master's Degree", 'PhD', 'Diploma', 'Not Sure Yet'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', interested: '', level: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', country: '', interested: '', level: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Get in Touch</div>
          <h1>Contact Us</h1>
          <p>Ready to start your study abroad journey? Book a free consultation — we respond within 24 hours.</p>
        </div>
      </div>

      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>{"Let's Talk About Your Future"}</h3>
              <p>Our expert counselors are ready to help you find the right university, course, and country. First consultation is always free.</p>
              {[
                { icon: '📍', label: 'Office', value: 'Puchong, Selangor, Malaysia' },
                { icon: '📞', label: 'Phone', value: '+60 12 XXX XXXX' },
                { icon: '✉️', label: 'Email', value: 'info@eduspark.com.bd' },
                { icon: '⏰', label: 'Hours', value: 'Mon–Sat: 9am – 7pm (MYT)' },
              ].map((d, i) => (
                <div key={i} className="contact-detail">
                  <div className="contact-detail-icon">{d.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '2px' }}>{d.label}</div>
                    <div>{d.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '28px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>💬 Prefer WhatsApp?</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Chat with us directly for faster responses.</p>
                <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '12px', background: '#25d366', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
                  Open WhatsApp →
                </a>
              </div>
            </div>

            <div className="form-card" id="consultation">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '8px' }}>Book Free Consultation</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '28px' }}>Fill in the form and we will get back to you within 24 hours.</p>
              {status === 'success' ? (
                <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                  <h4 style={{ color: '#166534', marginBottom: '8px', fontSize: '1.1rem' }}>Message Received!</h4>
                  <p style={{ color: '#15803d', fontSize: '0.9rem' }}>Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} className="form-input" placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input name="phone" required value={form.phone} onChange={handleChange} className="form-input" placeholder="+880 or +60..." />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Where Are You From?</label>
                      <select name="country" value={form.country} onChange={handleChange} className="form-select">
                        <option value="">Select country</option>
                        {countries.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Interested in Studying In</label>
                      <select name="interested" value={form.interested} onChange={handleChange} className="form-select">
                        <option value="">Select destination</option>
                        {interestedIn.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Desired Study Level</label>
                    <select name="level" value={form.level} onChange={handleChange} className="form-select">
                      <option value="">Select level</option>
                      {levels.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="form-textarea" placeholder="Tell us about your background, goals, and any specific questions..." />
                  </div>
                  <button type="submit" className="btn-orange" style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }} disabled={status === 'loading'}>
                    {status === 'loading' ? '⏳ Sending...' : '📩 Send Message & Book Consultation'}
                  </button>
                  {status === 'error' && <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>Something went wrong. Please try WhatsApp instead.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
