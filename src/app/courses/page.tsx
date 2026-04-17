import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses & Programs – EduSpark International Study',
  description: 'Explore undergraduate and postgraduate programs available through EduSpark partner universities.',
};

const courses = [
  { icon: '💻', title: 'Computer Science & IT', desc: 'From software engineering to artificial intelligence and cybersecurity — prepare for the most in-demand tech careers.', duration: '3–4 Years', level: "Bachelor's / Master's", tags: ['Software Eng.', 'AI & ML', 'Cybersecurity', 'Data Science'] },
  { icon: '⚙️', title: 'Engineering', desc: 'Civil, mechanical, electrical, and chemical engineering programs at top-ranked universities worldwide.', duration: '4 Years', level: "Bachelor's / Master's", tags: ['Civil', 'Mechanical', 'Electrical', 'Chemical'] },
  { icon: '💼', title: 'Business & Management', desc: 'MBA, BBA and specialized business degrees to launch your career in global commerce, finance and entrepreneurship.', duration: '1–4 Years', level: "Diploma / Bachelor's / MBA", tags: ['BBA', 'MBA', 'Finance', 'Marketing'] },
  { icon: '⚕️', title: 'Medicine & Health Sciences', desc: 'MBBS, pharmacy, nursing and allied health programs at internationally recognized universities.', duration: '4–5 Years', level: "Bachelor's / Postgrad", tags: ['MBBS', 'Pharmacy', 'Nursing', 'Physiotherapy'] },
  { icon: '⚖️', title: 'Law', desc: 'LLB and LLM programs preparing you for legal careers in Malaysia, UK, and international jurisdictions.', duration: '3–4 Years', level: "Bachelor's / Master's", tags: ['LLB', 'LLM', 'International Law', 'Corporate Law'] },
  { icon: '🎨', title: 'Architecture & Design', desc: 'Creative and technical degrees in architecture, interior design, graphic design, and industrial design.', duration: '4–5 Years', level: "Bachelor's / Master's", tags: ['Architecture', 'Interior Design', 'Graphic Design'] },
  { icon: '✈️', title: 'Hospitality & Tourism', desc: 'World-class hospitality, hotel management and tourism management degrees — ideal for Malaysia\'s booming tourism industry.', duration: '3 Years', level: "Diploma / Bachelor's", tags: ['Hotel Mgmt', 'Tourism', 'Event Mgmt', 'Culinary'] },
  { icon: '📊', title: 'Accounting & Finance', desc: 'ACCA, CPA-track degrees and finance programs to build a career in accounting, banking and investment.', duration: '3–4 Years', level: "Diploma / Bachelor's", tags: ['ACCA', 'CPA', 'Banking', 'Investment'] },
  { icon: '🔬', title: 'Science & Research', desc: 'Biology, chemistry, physics, environmental science and biotechnology programs at research-intensive universities.', duration: '3–4 Years', level: "Bachelor's / PhD", tags: ['Biology', 'Chemistry', 'Biotechnology', 'Physics'] },
  { icon: '📡', title: 'Mass Communication & Media', desc: 'Journalism, broadcasting, digital media, and public relations degrees for careers in the fast-evolving media landscape.', duration: '3 Years', level: "Bachelor's", tags: ['Journalism', 'Broadcasting', 'Digital Media', 'PR'] },
  { icon: '🏫', title: 'Education & Teaching', desc: 'TESL, early childhood, and education management degrees for those passionate about shaping future generations.', duration: '4 Years', level: "Bachelor's / Master's", tags: ['TESL', 'Early Childhood', 'Education Mgmt'] },
  { icon: '🌱', title: 'Environmental & Agriculture', desc: 'Sustainable agriculture, environmental management and food science degrees addressing global climate challenges.', duration: '3–4 Years', level: "Bachelor's / Master's", tags: ['Agriculture', 'Environmental Sci.', 'Food Science'] },
];

export default function CoursesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Academic Programs</div>
          <h1>Courses & Programs</h1>
          <p>Explore our wide range of undergraduate and postgraduate programs available across partner universities.</p>
        </div>
      </div>

      <section style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head center">
            <div className="section-tag">All Programs</div>
            <h2 className="section-title">Find Your Perfect Course</h2>
            <p className="section-sub">From medicine to media, engineering to entrepreneurship — we have a pathway for every ambition.</p>
          </div>
          <div className="course-grid">
            {courses.map((c, i) => (
              <div key={i} className="course-card">
                <div className="course-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="course-meta">
                  <span>⏱ {c.duration}</span>
                  <span>🎓 {c.level}</span>
                </div>
                <div className="course-tags">
                  {c.tags.map(t => <span key={t} className="course-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Not Sure Which Course is Right for You?</h2>
          <p>Our expert counselors will assess your profile and suggest the best academic pathway.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Course Advice</Link>
            <Link href="/universities" className="btn-outline-w">🏛️ Browse Universities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
