'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const GOLD = '#C9A96E';

const steps = [
  {
    num: '01', icon: '✦', title: 'DREAM BOLDLY.',
    desc: 'Discuss your ambitions, budget & ideal qualifications with your personal strategist. We craft a tailored roadmap within 24 hours.',
    special: 'dream',
  },
  {
    num: '02', icon: '📄', title: 'APPLY FLAWLESSLY.',
    desc: 'Your dedicated expert compiles, polishes, and submits a standout application package that opens doors at top-tier universities.',
    special: null,
  },
  {
    num: '03', icon: '🛂', title: 'VISA WITH EASE.',
    desc: 'Decades of visa expertise guide you past the red tape. From document prep to submission – we manage it all.',
    special: 'visa',
  },
  {
    num: '04', icon: '📍', title: 'ARRIVE HOME.',
    desc: 'Airport pickup, vetted accommodation, and a full cultural orientation. We\'re your first friend abroad before you land.',
    special: 'pin',
  },
];

export default function PremiumProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const lineRefMobile = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = section.offsetHeight;
      const scrolled = Math.max(0, windowH - rect.top);
      const progress = Math.min(1, scrolled / (total + windowH));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  // SVG line animation
  useEffect(() => {
    if (!visible) return;
    const line = lineRef.current;
    const lineMobile = lineRefMobile.current;
    if (line) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
      line.getBoundingClientRect();
      line.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) 0.3s';
      line.style.strokeDashoffset = '0';
    }
    if (lineMobile) {
      const len = lineMobile.getTotalLength();
      lineMobile.style.strokeDasharray = `${len}`;
      lineMobile.style.strokeDashoffset = `${len}`;
      lineMobile.getBoundingClientRect();
      lineMobile.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) 0.3s';
      lineMobile.style.strokeDashoffset = '0';
    }
  }, [visible]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');

        .pp-section {
          background: #111111;
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* sticky progress bar */
        .pp-progress {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(201,169,110,0.15);
          z-index: 50;
          margin-bottom: 0;
        }
        .pp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A96E, #f0d090, #C9A96E);
          transition: width 0.1s linear;
          box-shadow: 0 0 12px rgba(201,169,110,0.6);
        }

        .pp-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

        /* header */
        .pp-tag {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: ${GOLD};
          border: 1px solid rgba(201,169,110,0.35);
          border-radius: 20px;
          padding: 5px 14px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .pp-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin: 0 0 18px;
          line-height: 1.15;
        }
        .pp-headline span { color: ${GOLD}; }
        .pp-subhead {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #BBBBBB;
          line-height: 1.75;
          max-width: 600px;
          margin: 0 auto 70px;
        }

        /* desktop timeline */
        .pp-desktop { display: block; }
        .pp-mobile { display: none; }

        .pp-timeline-wrap {
          position: relative;
          margin-bottom: 24px;
        }

        /* cards row */
        .pp-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }

        .pp-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 16px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pp-card:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: ${GOLD};
          box-shadow: 0 8px 40px rgba(201,169,110,0.18), 0 0 0 1px rgba(201,169,110,0.3);
        }

        .pp-card-watermark {
          position: absolute;
          top: 12px;
          right: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 60px;
          font-weight: 900;
          color: ${GOLD};
          opacity: 0.15;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .pp-card-icon {
          font-size: 1.5rem;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.06em;
          margin: 0;
        }

        .pp-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          color: #BBBBBB;
          line-height: 1.7;
          margin: 0;
        }

        /* nodes */
        .pp-nodes {
          display: flex;
          justify-content: space-around;
          position: relative;
          z-index: 3;
          padding: 0 calc(12.5% - 8px);
        }

        .pp-node {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid #111;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.3), 0 0 16px rgba(201,169,110,0.5);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          transform: scale(0);
        }
        .pp-node.visible {
          animation: nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .pp-node.visible:nth-child(1) { animation-delay: 0.5s; }
        .pp-node.visible:nth-child(2) { animation-delay: 0.7s; }
        .pp-node.visible:nth-child(3) { animation-delay: 0.9s; }
        .pp-node.visible:nth-child(4) { animation-delay: 1.1s; }

        @keyframes nodePop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        /* staggered card fade */
        .pp-card {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        .pp-card.visible {
          animation: cardFadeIn 0.5s ease forwards;
        }
        .pp-card.visible:nth-child(1) { animation-delay: 0.2s; }
        .pp-card.visible:nth-child(2) { animation-delay: 0.3s; }
        .pp-card.visible:nth-child(3) { animation-delay: 0.4s; }
        .pp-card.visible:nth-child(4) { animation-delay: 0.5s; }

        @keyframes cardFadeIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pp-card.visible:hover {
          transform: scale(1.03) translateY(-4px) !important;
        }

        /* passport stamp */
        .pp-stamp {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 48px;
          height: 48px;
          border: 2px solid ${GOLD};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          font-weight: 700;
          color: ${GOLD};
          letter-spacing: 0.08em;
          opacity: 0;
          transform: scale(0) rotate(-20deg);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          text-align: center;
          line-height: 1.3;
        }
        .pp-card:hover .pp-stamp {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* map pin drop */
        .pp-pin {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 1.4rem;
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pp-card:hover .pp-pin {
          opacity: 1;
          transform: translateY(0);
        }

        /* CTA */
        .pp-cta-wrap {
          text-align: center;
          margin-top: 70px;
          padding-top: 50px;
          border-top: 1px solid rgba(201,169,110,0.15);
        }
        .pp-cta-label {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .pp-cta-btn {
          display: inline-block;
          padding: 16px 36px;
          border: 1.5px solid ${GOLD};
          border-radius: 6px;
          color: #fff;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .pp-cta-btn:hover {
          background: ${GOLD};
          color: #111;
          box-shadow: 0 4px 24px rgba(201,169,110,0.35);
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .pp-desktop { display: none; }
          .pp-mobile { display: block; }
          .pp-section { padding: 70px 0 60px; }
          .pp-inner { padding: 0 20px; }
          .pp-subhead { margin-bottom: 48px; }

          .pp-mobile-steps {
            position: relative;
            padding-left: 44px;
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .pp-mobile-line-wrap {
            position: absolute;
            left: 7px;
            top: 8px;
            bottom: 8px;
            width: 4px;
          }

          .pp-mobile-step {
            position: relative;
            padding-bottom: 32px;
          }
          .pp-mobile-step:last-child { padding-bottom: 0; }

          .pp-mobile-node {
            position: absolute;
            left: -40px;
            top: 16px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: ${GOLD};
            border: 2px solid #111;
            box-shadow: 0 0 0 3px rgba(201,169,110,0.3), 0 0 16px rgba(201,169,110,0.5);
            transform: scale(0);
            transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
          }
          .pp-mobile-node.visible { transform: scale(1); }

          .pp-card {
            width: 100%;
            box-sizing: border-box;
          }
        }

        /* gold glow bg decoration */
        .pp-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <section ref={sectionRef} className="pp-section">
        {/* sticky progress */}
        <div className="pp-progress">
          <div className="pp-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>

        {/* bg decoration */}
        <div className="pp-bg-glow" style={{ top: '-200px', left: '-200px' }} />
        <div className="pp-bg-glow" style={{ bottom: '-200px', right: '-200px' }} />

        <div className="pp-inner">
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <div className="pp-tag">How It Works</div>
            <h2 className="pp-headline">
              YOUR WORLD-CLASS FUTURE,{' '}
              <span>MAPPED.</span>
            </h2>
            <p className="pp-subhead">
              A personal advisor in your pocket. We turn complex paperwork into a seamless luxury experience – so you can focus on packing your bags.
            </p>
          </div>

          {/* DESKTOP */}
          <div className="pp-desktop">
            {/* Cards */}
            <div className="pp-cards">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`pp-card${visible ? ' visible' : ''}`}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <span className="pp-card-watermark">{step.num}</span>
                  <div className="pp-card-icon">{step.icon}</div>
                  <p className="pp-card-title">{step.title}</p>
                  <p className="pp-card-desc">{step.desc}</p>

                  {step.special === 'visa' && (
                    <div className="pp-stamp">APPROVED<br />✓<br />VISA</div>
                  )}
                  {step.special === 'pin' && (
                    <div className="pp-pin">📍</div>
                  )}
                </div>
              ))}
            </div>

            {/* Nodes + SVG line */}
            <div className="pp-timeline-wrap">
              <div className="pp-nodes">
                {steps.map((_, i) => (
                  <div key={i} className={`pp-node${visible ? ' visible' : ''}`} />
                ))}
              </div>
              <svg
                viewBox="0 0 1000 4"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '4px', display: 'block', marginTop: '-10px', overflow: 'visible' }}
              >
                <path
                  ref={lineRef}
                  d="M 0 2 L 1000 2"
                  stroke={GOLD}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 6px ${GOLD})` }}
                />
              </svg>
            </div>
          </div>

          {/* MOBILE */}
          <div className="pp-mobile">
            <div className="pp-mobile-steps">
              {/* vertical SVG line */}
              <div className="pp-mobile-line-wrap">
                <svg width="4" height="100%" viewBox="0 0 4 400" preserveAspectRatio="none" style={{ width: '4px', height: '100%', display: 'block' }}>
                  <path
                    ref={lineRefMobile}
                    d="M 2 0 L 2 400"
                    stroke={GOLD}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 4px ${GOLD})` }}
                  />
                </svg>
              </div>

              {steps.map((step, i) => (
                <div key={i} className="pp-mobile-step">
                  <div className={`pp-mobile-node${visible ? ' visible' : ''}`} style={{ transitionDelay: `${0.5 + i * 0.2}s` }} />
                  <div className={`pp-card${visible ? ' visible' : ''}`}>
                    <span className="pp-card-watermark">{step.num}</span>
                    <div className="pp-card-icon">{step.icon}</div>
                    <p className="pp-card-title">{step.title}</p>
                    <p className="pp-card-desc">{step.desc}</p>
                    {step.special === 'visa' && <div className="pp-stamp">APPROVED<br />✓<br />VISA</div>}
                    {step.special === 'pin' && <div className="pp-pin">📍</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pp-cta-wrap">
            <p className="pp-cta-label">Ready for Your First-Class Journey?</p>
            <Link href="/contact" className="pp-cta-btn">
              Start Your Free Strategy Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
