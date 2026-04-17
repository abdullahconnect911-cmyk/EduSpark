'use client';
import { useState } from 'react';

const requiredDocs = [
  { id: 'passport', icon: '🛂', name: 'Passport Copy', desc: 'Valid for at least 18 months', required: true, uploaded: true, fileName: 'passport_scan.pdf', size: '1.2 MB', date: 'Jan 10, 2026' },
  { id: 'ssc', icon: '📜', name: 'SSC / O-Level Certificate', desc: 'Original and transcript', required: true, uploaded: true, fileName: 'ssc_certificate.pdf', size: '2.4 MB', date: 'Jan 10, 2026' },
  { id: 'hsc', icon: '📜', name: 'HSC / A-Level Certificate', desc: 'Original and transcript', required: true, uploaded: true, fileName: 'hsc_certificate.pdf', size: '2.1 MB', date: 'Jan 10, 2026' },
  { id: 'english', icon: '🌐', name: 'English Proficiency (IELTS/MOI)', desc: 'IELTS score report or MOI letter', required: true, uploaded: true, fileName: 'moi_letter.pdf', size: '0.8 MB', date: 'Jan 12, 2026' },
  { id: 'photo', icon: '📷', name: 'Passport-Size Photo', desc: 'White background, recent', required: true, uploaded: false },
  { id: 'bank', icon: '🏦', name: 'Bank Statement (3 months)', desc: 'Sponsor or parent\'s account', required: true, uploaded: false },
  { id: 'cv', icon: '📋', name: 'CV / Resume', desc: 'Academic + extra-curricular', required: false, uploaded: false },
  { id: 'recommendation', icon: '⭐', name: 'Recommendation Letter', desc: 'From teacher or principal', required: false, uploaded: false },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(requiredDocs);
  const [uploading, setUploading] = useState<string | null>(null);

  const uploaded = docs.filter(d => d.uploaded).length;
  const required = docs.filter(d => d.required);
  const requiredUploaded = required.filter(d => d.uploaded).length;

  const handleUpload = (id: string) => {
    setUploading(id);
    setTimeout(() => {
      setDocs(prev => prev.map(d => d.id === id ? { ...d, uploaded: true, fileName: 'document_uploaded.pdf', size: '1.5 MB', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) } : d));
      setUploading(null);
    }, 1500);
  };

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Documents</h1>
          <p>Upload and manage all your application documents.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="dash-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>Document Checklist Progress</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{requiredUploaded} of {required.length} required documents uploaded</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue)' }}>
            {Math.round((requiredUploaded / required.length) * 100)}%
          </div>
        </div>
        <div style={{ height: '8px', background: 'var(--border)', borderRadius: '100px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(requiredUploaded / required.length) * 100}%`, background: 'linear-gradient(90deg, var(--blue), var(--orange))', borderRadius: '100px', transition: '0.5s' }} />
        </div>
        {requiredUploaded < required.length && (
          <div className="alert alert-info" style={{ marginTop: '16px', marginBottom: 0 }}>
            <span>ℹ️</span>
            <span>Please upload the remaining {required.length - requiredUploaded} required documents to complete your application checklist.</span>
          </div>
        )}
        {requiredUploaded === required.length && (
          <div className="alert alert-success" style={{ marginTop: '16px', marginBottom: 0 }}>
            <span>✅</span>
            <span>All required documents uploaded! Your application is complete.</span>
          </div>
        )}
      </div>

      {/* Required Documents */}
      <div className="dash-card" style={{ marginBottom: '24px' }}>
        <div className="dash-card-header">
          <span className="dash-card-title">📋 Required Documents</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{requiredUploaded}/{required.length} uploaded</span>
        </div>
        {docs.filter(d => d.required).map(doc => (
          <div key={doc.id} className="doc-item">
            <div className="doc-icon">{doc.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="doc-name">{doc.name}</div>
              <div className="doc-meta">{doc.uploaded ? `${doc.fileName} · ${doc.size} · Uploaded ${doc.date}` : doc.desc}</div>
            </div>
            <div className="doc-status">
              {doc.uploaded ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '4px 12px', borderRadius: '100px', border: '1px solid #bbf7d0' }}>✓ Uploaded</span>
                  <button onClick={() => handleUpload(doc.id)} className="doc-upload-btn">Replace</button>
                </div>
              ) : (
                <button
                  onClick={() => handleUpload(doc.id)}
                  className="doc-upload-btn"
                  disabled={uploading === doc.id}
                  style={{ opacity: uploading === doc.id ? 0.7 : 1 }}
                >
                  {uploading === doc.id ? '⏳ Uploading...' : '📤 Upload'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional Documents */}
      <div className="dash-card">
        <div className="dash-card-header">
          <span className="dash-card-title">📎 Optional Documents</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Strengthens your application</span>
        </div>
        {docs.filter(d => !d.required).map(doc => (
          <div key={doc.id} className="doc-item">
            <div className="doc-icon">{doc.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="doc-name">{doc.name} <span style={{ fontSize: '0.68rem', background: 'var(--off)', color: 'var(--gray)', padding: '2px 8px', borderRadius: '100px', marginLeft: '6px', fontWeight: 600 }}>Optional</span></div>
              <div className="doc-meta">{doc.uploaded ? `${doc.fileName} · ${doc.size} · Uploaded ${doc.date}` : doc.desc}</div>
            </div>
            <div className="doc-status">
              {doc.uploaded ? (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '4px 12px', borderRadius: '100px', border: '1px solid #bbf7d0' }}>✓ Uploaded</span>
              ) : (
                <button onClick={() => handleUpload(doc.id)} className="doc-upload-btn" disabled={uploading === doc.id}>
                  {uploading === doc.id ? '⏳ Uploading...' : '📤 Upload'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '16px', padding: '14px 18px', background: 'var(--off)', borderRadius: '10px', border: '1.5px solid var(--border)' }}>
        🔒 All documents are encrypted and stored securely. They are only shared with your target universities with your consent.
      </div>
    </>
  );
}
