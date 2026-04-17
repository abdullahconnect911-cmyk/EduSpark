'use client';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'general' | 'email' | 'security'>('general');

  const [general, setGeneral] = useState({
    siteName: 'EduSpark International Study',
    siteEmail: 'info@eduspark.com.bd',
    phone: '+60 12 XXX XXXX',
    whatsapp: '60123456789',
    address: 'Puchong, Selangor, Malaysia',
    facebook: 'https://facebook.com/eduspark',
    instagram: '',
    linkedin: '',
  });

  const [emailSettings, setEmailSettings] = useState({
    fromName: 'EduSpark International Study',
    fromEmail: 'noreply@eduspark.com.bd',
    adminEmail: 'info@eduspark.com.bd',
    welcomeEmailEnabled: true,
    leadNotificationEnabled: true,
    applicationUpdateEnabled: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your EduSpark platform configuration.</p>
        </div>
      </div>

      <div className="tab-nav">
        {(['general', 'email', 'security'] as const).map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'general' ? '⚙️ General' : t === 'email' ? '✉️ Email' : '🔒 Security'}
          </button>
        ))}
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          <span>✅</span><span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="dash-card">
          {tab === 'general' && (
            <>
              <div className="profile-section-title">Site Information</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Site Name</label>
                  <input className="form-input" value={general.siteName} onChange={e => setGeneral(p => ({ ...p, siteName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input type="email" className="form-input" value={general.siteEmail} onChange={e => setGeneral(p => ({ ...p, siteEmail: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" value={general.phone} onChange={e => setGeneral(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input className="form-input" value={general.whatsapp} onChange={e => setGeneral(p => ({ ...p, whatsapp: e.target.value }))} placeholder="e.g. 60123456789 (no +)" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Office Address</label>
                <input className="form-input" value={general.address} onChange={e => setGeneral(p => ({ ...p, address: e.target.value }))} />
              </div>
              <div className="profile-section-title" style={{ marginTop: '24px' }}>Social Media</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Facebook URL</label>
                  <input className="form-input" value={general.facebook} onChange={e => setGeneral(p => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram URL</label>
                  <input className="form-input" value={general.instagram} onChange={e => setGeneral(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input className="form-input" value={general.linkedin} onChange={e => setGeneral(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/company/..." />
              </div>
            </>
          )}

          {tab === 'email' && (
            <>
              <div className="profile-section-title">Email Configuration</div>
              <div className="alert alert-info">
                <span>ℹ️</span>
                <span>Email is powered by Resend. Configure your API key in the <code>.env.local</code> file.</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">From Name</label>
                  <input className="form-input" value={emailSettings.fromName} onChange={e => setEmailSettings(p => ({ ...p, fromName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">From Email</label>
                  <input type="email" className="form-input" value={emailSettings.fromEmail} onChange={e => setEmailSettings(p => ({ ...p, fromEmail: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Admin Notification Email</label>
                <input type="email" className="form-input" value={emailSettings.adminEmail} onChange={e => setEmailSettings(p => ({ ...p, adminEmail: e.target.value }))} />
              </div>
              <div className="profile-section-title" style={{ marginTop: '24px' }}>Email Notifications</div>
              {[
                { key: 'welcomeEmailEnabled', label: 'Welcome email to new students', desc: 'Sent when a student registers' },
                { key: 'leadNotificationEnabled', label: 'New lead notifications to admin', desc: 'Sent when contact form is submitted' },
                { key: 'applicationUpdateEnabled', label: 'Application update emails to students', desc: 'Sent when application status changes' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)' }}>{item.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginTop: '2px' }}>{item.desc}</div>
                  </div>
                  <button type="button"
                    onClick={() => setEmailSettings(p => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                    style={{
                      width: '44px', height: '24px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                      background: (emailSettings as any)[item.key] ? 'var(--blue)' : 'var(--border)',
                      position: 'relative', transition: '0.25s', flexShrink: 0,
                    }}>
                    <span style={{
                      position: 'absolute', top: '3px', width: '18px', height: '18px', borderRadius: '50%',
                      background: '#fff', transition: '0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      left: (emailSettings as any)[item.key] ? '23px' : '3px',
                    }} />
                  </button>
                </div>
              ))}
            </>
          )}

          {tab === 'security' && (
            <>
              <div className="profile-section-title">Admin Password</div>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" placeholder="Current password" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" placeholder="New password (min. 8 chars)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-input" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="profile-section-title" style={{ marginTop: '24px' }}>Database & Setup</div>
              <div className="alert alert-info">
                <span>ℹ️</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '6px' }}>Environment Variables Required</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    DATABASE_URL=postgresql://...<br />
                    NEXTAUTH_SECRET=...<br />
                    RESEND_API_KEY=re_...<br />
                    NEXT_PUBLIC_WHATSAPP=60...
                  </div>
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <button type="submit" className="btn-blue" style={{ padding: '12px 32px' }}>
              💾 Save Settings
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
