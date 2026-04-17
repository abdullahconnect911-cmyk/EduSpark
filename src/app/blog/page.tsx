import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Resources – EduSpark International Study',
  description: 'Tips, guides, and insights for Bangladeshi students planning to study abroad.',
};

const posts = [
  { slug: 'study-in-malaysia-guide', icon: '🇲🇾', tag: 'Destination Guide', title: 'Complete Guide to Studying in Malaysia for Bangladeshi Students', excerpt: 'Everything you need to know — top universities, tuition fees, visa process, and cost of living in Malaysia.', date: 'Jan 15, 2026', readTime: '8 min read' },
  { slug: 'malaysia-visa-process', icon: '🛂', tag: 'Visa Guide', title: 'Malaysia Student Visa Process: Step-by-Step for 2026', excerpt: 'A comprehensive walkthrough of the Malaysian student visa application process, documents required, and timeline.', date: 'Jan 8, 2026', readTime: '6 min read' },
  { slug: 'scholarship-opportunities', icon: '🏆', tag: 'Scholarships', title: 'Top 10 Scholarships Available for Bangladeshi Students Abroad', excerpt: 'From Malaysian government scholarships to university merit awards — here are the best funding options available.', date: 'Dec 28, 2025', readTime: '10 min read' },
  { slug: 'sop-writing-guide', icon: '📝', tag: 'Application Tips', title: 'How to Write a Winning Statement of Purpose (SOP)', excerpt: 'A practical guide to writing an SOP that gets you admitted — with examples, tips, and common mistakes to avoid.', date: 'Dec 20, 2025', readTime: '7 min read' },
  { slug: 'cost-of-living-malaysia', icon: '💰', tag: 'Student Life', title: 'Real Cost of Living in Malaysia as an International Student', excerpt: 'Monthly budgets, accommodation costs, food, transport, and entertainment — the full honest picture.', date: 'Dec 12, 2025', readTime: '5 min read' },
  { slug: 'uk-study-guide', icon: '🇬🇧', tag: 'Destination Guide', title: 'Studying in the UK: What Bangladeshi Students Need to Know', excerpt: 'UK university requirements, tuition fees, student visa process, and post-study work rights explained.', date: 'Dec 5, 2025', readTime: '9 min read' },
  { slug: 'avoid-fake-agents', icon: '⚠️', tag: 'Safety', title: 'How to Spot and Avoid Fake Education Agents in Bangladesh', excerpt: 'Red flags to watch out for, questions to ask, and how to verify a consultancy is legitimate before you trust them.', date: 'Nov 28, 2025', readTime: '6 min read' },
  { slug: 'cgpa-low-options', icon: '📊', tag: 'Admission Tips', title: 'Low CGPA? Here Are Your Study Abroad Options', excerpt: "A lower GPA doesn't close all doors. Here are foundation programs, alternative pathways, and conditional offers that can help.", date: 'Nov 20, 2025', readTime: '7 min read' },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Knowledge Hub</div>
          <h1>Blog & Resources</h1>
          <p>Guides, tips, and honest advice to help Bangladeshi students navigate the study abroad journey confidently.</p>
        </div>
      </div>

      <section style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-tag" style={{ background: 'var(--orange-lt)', color: 'var(--orange2)' }}>Featured Article</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '20px', alignItems: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--blue), var(--blue-mid))', borderRadius: '20px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,122,0,0.25) 0%, transparent 50%)' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{featured.icon}</span>
            </div>
            <div>
              <span className="blog-tag">{featured.tag}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3 }}>{featured.title}</h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.9rem' }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '0.78rem', color: 'var(--gray)' }}>
                <span>📅 {featured.date}</span><span>⏱ {featured.readTime}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="btn-blue">Read Article →</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--off)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-tag">All Articles</div>
            <h2 className="section-title">Latest from the Blog</h2>
          </div>
          <div className="blog-grid">
            {rest.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-thumb"><span style={{ position: 'relative', zIndex: 1 }}>{post.icon}</span></div>
                <div className="blog-body">
                  <span className="blog-tag">{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta"><span>📅 {post.date}</span><span>⏱ {post.readTime}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Have a Question Not Covered Here?</h2>
          <p>Our expert counselors are happy to answer any questions about studying abroad.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Ask Our Experts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
