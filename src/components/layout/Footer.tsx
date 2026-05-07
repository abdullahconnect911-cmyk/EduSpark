import Link from 'next/link';

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '8801867778759';

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/logo.png" alt="EduSpark International Study" style={{ height: '44px', width: 'auto', display: 'block' }} />
            </Link>
            <p>Your trusted partner for international education. Based in Bangladesh — helping students reach world-class universities across the globe.</p>
            <div className="footer-socials">
              <a className="social-btn" href="#" aria-label="Facebook">f</a>
              <a className="social-btn" href="#" aria-label="LinkedIn" style={{ fontStyle: 'italic', fontWeight: 700 }}>in</a>
              <a className="social-btn" href="#" aria-label="YouTube">▶</a>
              <a className="social-btn" href="#" aria-label="Instagram">📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <Link href="/">Home</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/universities">Universities</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/blog">Blog</Link>
          </div>

          {/* Services */}
          <div className="footer-col footer-svc-col">
            <h5>Our Services</h5>
            <div className="footer-svc-grid">
              <Link href="/services#counseling">Free Consultation</Link>
              <Link href="/services#admission">Admission Support</Link>
              <Link href="/services#visa">Visa Assistance</Link>
              <Link href="/services#scholarship">Scholarship</Link>
              <Link href="/services#departure">Pre-Departure</Link>
              <Link href="/services#documents">Documents</Link>
              <Link href="/services#flight">Flight Support</Link>
              <Link href="/services#accommodation">Accommodation</Link>
              <Link href="/services#airport">Airport Pickup</Link>
              <Link href="/services#post-arrival">Post-Arrival</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact</h5>
            <div className="footer-ci"><span>📍</span><span>Dhaka & Puchong, Malaysia</span></div>
            <div className="footer-ci"><span>📞</span><span>+880 1867-778759</span></div>
            <div className="footer-ci"><span>✉️</span><span>info@eduspark.com.bd</span></div>
            <div className="footer-ci">
              <span>💬</span>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                WhatsApp Available
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} EduSpark International Study. All rights reserved.</div>
          <div>Made with ❤️ for aspiring students</div>
        </div>
      </div>
    </footer>
  );
}
