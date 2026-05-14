'use client';
import { useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showWA, setShowWA] = useState(false);
  const [form, setForm] = useState({
    siteName:    'EduSpark International Study',
    siteEmail:   'info@eduspark.com',
    whatsapp:    '8801867778759',
    adminName:   'Abdullah Al Mamun',
    adminEmail:  'admin@eduspark.com',
    timezone:    'Asia/Dhaka',
    currency:    'USD',
    emailNotif:  true,
    waNotif:     true,
    leadNotif:   true,
    appNotif:    true,
    autoReply:   false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, name, type = 'text', sub }: { label: string; name: keyof typeof form; type?: string; sub?: string }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '6px', letterSpacing: '0.04em' }}>
        {label}
      </label>
      {name === 'whatsapp' ? (
        <div style={{ position: 'relative' }}>
          <input
            type={showWA ? 'text' : 'password'}
            value={form.whatsapp}
            onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))}
            style={{ width: '100%', padding: '10px 40px 10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.87rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
          />
          <button onClick={() => setShowWA(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex' }}>
            {showWA ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      ) : (
        <input
          type={type}
          value={String(form[name])}
          onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
          style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.87rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
        />
      )}
      {sub && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>{sub}</div>}
    </div>
  );

  const Toggle = ({ label, name, sub }: { label: string; name: keyof typeof form; sub?: string }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{label}</div>
        {sub && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>{sub}</div>}
      </div>
      <button
        onClick={() => setForm(p => ({ ...p, [name]: !p[name] }))}
        style={{ width: '44px', height: '24px', borderRadius: '100px', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: '0.2s', background: form[name] ? '#0b3d91' : 'rgba(255,255,255,0.1)' }}
      >
        <div style={{ position: 'absolute', top: '3px', left: form[name] ? '22px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: '0.2s' }} />
      </button>
    </div>
  );

  const Section = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span>{icon}</span>{title}
      </div>
      {children}
    </div>
  );

  return (
    <>
      <style>{`
        input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, select:focus {
          border-color: rgba(59,130,246,0.5) !important;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #1a2235 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Settings</h1>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Manage your EduSpark admin configuration</p>
        </div>
        <button onClick={handleSave}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 22px', background: saved ? '#22c55e' : '#ff7a00', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s' }}>
          <Save size={14} /> {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ maxWidth: '680px' }}>
        <Section title="Site Information" icon="🌐">
          <Field label="Site Name" name="siteName" />
          <Field label="Contact Email" name="siteEmail" type="email" sub="Used for system notifications and contact forms" />
          <Field label="WhatsApp Business Number" name="whatsapp" sub="Format: country code + number (e.g. 8801867778759)" />
        </Section>

        <Section title="Admin Account" icon="👤">
          <Field label="Admin Display Name" name="adminName" />
          <Field label="Admin Email" name="adminEmail" type="email" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Timezone</label>
              <select value={form.timezone} onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.87rem', fontFamily: 'inherit', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="Asia/Kuala_Lumpur">Asia/Kuala Lumpur (GMT+8)</option>
                <option value="Europe/London">Europe/London (GMT+0/+1)</option>
                <option value="America/Toronto">America/Toronto (GMT-5)</option>
                <option value="Australia/Sydney">Australia/Sydney (GMT+10/11)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Currency</label>
              <select value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.87rem', fontFamily: 'inherit', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                <option value="USD">USD ($)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="MYR">MYR (RM)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </Section>

        <Section title="Notifications" icon="🔔">
          <Toggle label="Email Notifications" name="emailNotif" sub="Receive email alerts for new leads and applications" />
          <Toggle label="WhatsApp Notifications" name="waNotif" sub="Get WhatsApp alerts on your business number" />
          <Toggle label="New Lead Alerts" name="leadNotif" sub="Notify when a new contact form submission arrives" />
          <Toggle label="Application Status Alerts" name="appNotif" sub="Notify when application status changes" />
          <div style={{ paddingTop: '4px' }}>
            <Toggle label="Auto-Reply to New Leads" name="autoReply" sub="Send automatic acknowledgment message to new website leads" />
          </div>
        </Section>

        <Section title="Danger Zone" icon="⚠️">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Clear All Mock Data</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>Resets all applications, leads, and students to empty state</div>
            </div>
            <button style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '9px', color: '#f87171', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s' }}
              onClick={() => alert('This would clear all data. Not implemented in demo mode.')}>
              Clear Data
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Export All Data</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>Download all students, applications and leads as CSV</div>
            </div>
            <button style={{ padding: '8px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '9px', color: '#22c55e', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s' }}
              onClick={() => alert('CSV export coming soon.')}>
              Export CSV
            </button>
          </div>
        </Section>
      </div>
    </>
  );
}
