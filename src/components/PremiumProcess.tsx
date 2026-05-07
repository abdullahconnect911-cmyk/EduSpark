'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { num: '01', icon: '💬', title: 'Free Consultation', desc: 'Discuss your goals, budget & qualifications with our expert counselors.' },
  { num: '02', icon: '📝', title: 'Application', desc: 'We prepare & submit your complete university application package.' },
  { num: '03', icon: '🛂', title: 'Visa Processing', desc: 'Full student visa guidance with document preparation & submission.' },
  { num: '04', icon: '✈️', title: 'Travel & Settle', desc: 'Airport pickup, accommodation & full orientation support on arrival.' },
];

export default function PremiumProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ps-section {
          background: linear-gradient(135deg, #0b3d91 0%, #1a56c4 60%, #0d47a1 100%);
          padding: 80px 0 90px;
          position: relative;
          overflow: hidden;
        }
        .ps-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(255,122,0,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .ps-head {
          text-align: center;
          margin-bottom: 60px;
        }
        .ps-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 0.72rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ps-tag::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--orange);
          display: inline-block;
        }
        .ps-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          font-family: var(--font-head);
          margin: 0 0 14px;
          line-height: 1.15;
        }
        .ps-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }
        .ps-row {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          gap: 0;
        }
        .ps-row::before {
          content: '';
          position: absolute;
          top: 48px;
          left: calc(12.5% + 48px);
          right: calc(12.5% + 48px);
          height: 2px;
          background: rgba(255,255,255,0.2);
          z-index: 0;
        }
        .ps-line-fill {
          position: absolute;
          top: 48px;
          left: calc(12.5% + 48px);
          height: 2px;
          background: linear-gradient(90deg, var(--orange), rgba(255,122,0,0.6));
          z-index: 1;
          width: 0%;
          transition: width 1.4s cubic-bezier(0.4,0,0.2,1) 0.5s;
          box-shadow: 0 0 10px rgba(255,122,0,0.5);
        }
        .ps-line-fill.visible { width: calc(75% - 96px); }
        .ps-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 0 8px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }
        .ps-step.visible { opacity: 1; transform: translateY(0); }
        .ps-step.visible:nth-child(2) { transition-delay: 0.1s; }
        .ps-step.visible:nth-child(3) { transition-delay: 0.25s; }
        .ps-step.visible:nth-child(4) { transition-delay: 0.4s; }
        .ps-step.visible:nth-child(5) { transition-delay: 0.55s; }
        .ps-circle-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .ps-circle {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ps-step:first-child .ps-circle {
          background: var(--orange);
          border-color: var(--orange);
          box-shadow: 0 8px 32px rgba(255,122,0,0.55);
        }
        .ps-step:hover .ps-circle {
          background: var(--orange);
          border-color: var(--orange);
          transform: scale(1.14) translateY(-8px);
          box-shadow: 0 16px 48px rgba(255,122,0,0.6);
        }
        .ps-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--orange);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #1a56c4;
          font-family: var(--font-body);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ps-step:first-child .ps-badge {
          background: #fff;
          color: var(--orange);
          border-color: var(--orange);
        }
        .ps-step:hover .ps-badge {
          transform: scale(1.2);
        }
        .ps-step-title {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
          font-family: var(--font-head);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .ps-step:hover .ps-step-title {
          color: var(--orange);
          transform: translateY(-2px);
        }
        .ps-step-desc {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.62);
          line-height: 1.65;
          max-width: 190px;
          margin: 0 auto;
          transition: color 0.3s ease;
        }
        .ps-step:hover .ps-step-desc {
          color: rgba(255,255,255,0.88);
        }
        @media (max-width: 768px) {
          .ps-row { flex-direction: column; align-items: center; gap: 36px; }
          .ps-row::before, .ps-line-fill { display: none; }
          .ps-step { flex-direction: row; text-align: left; align-items: center; gap: 20px; width: 100%; max-width: 340px; padding: 0; }
          .ps-circle-wrap { margin-bottom: 0; flex-shrink: 0; }
          .ps-circle { width: 72px; height: 72px; font-size: 1.5rem; }
          .ps-step-desc { max-width: 100%; }
        }
      `}</style>

      <section ref={sectionRef} className="ps-section">
        <div className="ps-container">
          <div className="ps-head">
            <div className="ps-tag">How It Works</div>
            <h2 className="ps-title">Your Journey in 4 Simple Steps</h2>
            <p className="ps-sub">We make studying abroad clear, simple, and stress-free from start to finish.</p>
          </div>
          <div className="ps-row">
            <div className={`ps-line-fill${visible ? ' visible' : ''}`} />
            {steps.map((step, i) => (
              <div
                key={i}
                className={`ps-step${visible ? ' visible' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ps-circle-wrap">
                  <div className="ps-circle">
                    <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>{step.icon}</span>
                  </div>
                  <div className="ps-badge">{step.num}</div>
                </div>
                <div>
                  <h4 className="ps-step-title">{step.title}</h4>
                  <p className="ps-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
