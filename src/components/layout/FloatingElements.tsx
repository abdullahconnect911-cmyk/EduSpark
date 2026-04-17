'use client';
import { useState, useEffect } from 'react';

export default function FloatingElements() {
  const [showTop, setShowTop] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '60123456789';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
      <button
        id="scrollTopBtn"
        className={showTop ? 'visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
}
