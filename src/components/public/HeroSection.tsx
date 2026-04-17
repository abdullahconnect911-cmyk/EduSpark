'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!ref.current) return;
      const progress = Math.min(timestamp / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      ref.current.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else ref.current.textContent = target + suffix;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref} className="stat-num">0{suffix}</span>;
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-grid-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-text">
          <div className="hero-badge animate-fade-up">🎓 Trusted Education Consultancy — Bangladesh</div>
          <h1 className="animate-fade-up delay-1">
            Your Gateway to <em>Global Education</em> Starts Here
          </h1>
          <p className="hero-sub animate-fade-up delay-2">
            Study in Malaysia &amp; Top Countries Worldwide with Expert Guidance from EduSpark International Study. We handle everything — from admission to visa to arrival.
          </p>
          <div className="hero-btns animate-fade-up delay-3">
            <Link href="/contact" className="btn-orange">Apply Now →</Link>
            <Link href="/contact#consultation" className="btn-ghost">💬 Free Consultation</Link>
          </div>
          <div className="hero-stats animate-fade-up delay-4">
            <div>
              <CountUp target={500} suffix="+" />
              <span className="stat-lbl">Students Placed</span>
            </div>
            <div>
              <CountUp target={20} suffix="+" />
              <span className="stat-lbl">Partner Universities</span>
            </div>
            <div>
              <CountUp target={12} />
              <span className="stat-lbl">Countries</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right animate-fade-up delay-2">
          <div className="hero-card">
            <div className="hero-card-title">🌍 Top Study Destinations</div>
            <div className="dest-grid-hero">
              {[
                { flag: '🇲🇾', name: 'Malaysia', ct: '20+ universities', href: '/destinations/malaysia' },
                { flag: '🇬🇧', name: 'UK', ct: 'Top ranked', href: '/destinations/uk' },
                { flag: '🇺🇸', name: 'USA', ct: 'World class', href: '/destinations/usa' },
                { flag: '🇦🇺', name: 'Australia', ct: 'PR pathway', href: '/destinations/australia' },
                { flag: '🇨🇦', name: 'Canada', ct: 'Immigration', href: '/destinations/canada' },
                { flag: '🇪🇺', name: 'Europe', ct: 'Affordable', href: '/destinations' },
              ].map(d => (
                <Link key={d.name} href={d.href} className="dest-item">
                  <span className="dest-flag">{d.flag}</span>
                  <div>
                    <div className="dest-nm">{d.name}</div>
                    <div className="dest-ct">{d.ct}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-trust-pill">
            <div className="trust-ic">✅</div>
            <div className="trust-t">
              <strong>No Hidden Fees</strong>
              <span>100% Transparent Process</span>
            </div>
          </div>

          <div className="search-bar-container">
            <form className="search-bar" action="/universities" method="GET">
              <select name="type">
                <option value="university">University</option>
                <option value="course">Course</option>
              </select>
              <input
                type="text"
                name="q"
                placeholder="Search universities or courses..."
                autoComplete="off"
              />
              <button type="submit">Search →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
