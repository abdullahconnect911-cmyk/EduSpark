import Link from 'next/link';
import { csItCourses } from '@/data/csItCourses';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return csItCourses.map(c => ({ slug: c.slug }));
}

const countryColors: Record<string, string> = {
  Malaysia: '#0052cc', Japan: '#bc002d', Singapore: '#e30000',
  'South Korea': '#003478', China: '#de2910', 'United Kingdom': '#012169',
  Germany: '#1a1a1a', Netherlands: '#ae1c28', Canada: '#d80621',
  USA: '#002868', 'New Zealand': '#00247d',
};

const levelColors: Record<string, { bg: string; color: string }> = {
  Bachelor: { bg: '#e8f0ff', color: '#1a56c4' },
  Master:   { bg: '#fef3c7', color: '#b45309' },
  PhD:      { bg: '#fce7f3', color: '#be185d' },
};

function getAdmissionSteps(country: string, level: string): string[] {
  const base: Record<string, string[]> = {
    Malaysia: [
      'Contact EduSpark for a free counselling session and course matching.',
      'Prepare your academic transcripts, SPM/A-Level/Foundation results, and passport copy.',
      'EduSpark submits your application and negotiates a free official offer letter.',
      'Accept the offer and make the first-semester payment.',
      'Apply for a student visa (if international) — EduSpark guides the full process.',
    ],
    Japan: [
      'Contact EduSpark to assess your EJU / Japanese Language Proficiency eligibility.',
      'Prepare academic documents, personal statement, and language test scores.',
      'EduSpark submits your application and coordinates the university entrance exam or interview.',
      'Receive a conditional or unconditional offer letter and pay the confirmation fee.',
      'Apply for a Certificate of Eligibility (CoE) and Student Visa at the Japanese Embassy.',
    ],
    Singapore: [
      'Contact EduSpark for a Singapore university shortlist based on your profile.',
      'Prepare academic transcripts, English proficiency test (IELTS/TOEFL), and personal statement.',
      'Submit your application through the university portal — EduSpark assists with every step.',
      'Attend an interview if required, then accept your offer.',
      "Apply for a Student Pass through ICA's SOLAR system at least 2 months before intake.",
    ],
    'South Korea': [
      'Contact EduSpark to check language requirements (TOPIK or English track).',
      'Gather transcripts, language certificates, bank statements, and a letter of intent.',
      'EduSpark applies on your behalf and secures a GKS or conditional offer.',
      'Receive the offer letter and pay the tuition deposit.',
      'Apply for a D-2 Student Visa at the Korean Embassy with the offer letter and CoE.',
    ],
    China: [
      'Contact EduSpark to explore CSC Government Scholarship eligibility.',
      'Prepare HSK language scores (if required), transcripts, health certificate, and police clearance.',
      'EduSpark submits via CUCAS or direct application and tracks your status.',
      'Accept your JW202 admission notice — required for the student visa application.',
      'Apply for an X1 or X2 Student Visa at the Chinese Embassy in your country.',
    ],
    'United Kingdom': [
      'Contact EduSpark for UK university shortlisting and UCAS strategy.',
      'Prepare your IELTS/TOEFL results, personal statement, and references.',
      'Submit through UCAS — EduSpark reviews your personal statement and application.',
      'Accept a conditional or unconditional offer and meet any academic conditions.',
      'Receive your CAS number and apply for a UK Student Visa (formerly Tier 4).',
    ],
    Germany: [
      'Contact EduSpark — Germany has no tuition fees at public universities!',
      'Check language requirements: German (B2/C1) or English proficiency for English-taught programmes.',
      'Submit application via uni-assist or directly to the university — EduSpark handles this.',
      'Receive your admission letter (Zulassungsbescheid) and secure a blocked account (€11,208+).',
      'Apply for a German Student Visa at the German Embassy with all required documents.',
    ],
    Netherlands: [
      'Contact EduSpark to find English-taught programmes at Dutch universities.',
      'Prepare IELTS/TOEFL, academic transcripts, CV, and a motivation letter.',
      'Submit your online application — EduSpark tracks deadlines (most close by 1 April).',
      'Accept your offer and provide Proof of Financial Means (€665+/month required).',
      'Apply for an MVV entry visa or Student Residence Permit through IND.',
    ],
    Canada: [
      'Contact EduSpark to identify DLI-approved universities best suited to your profile.',
      'Prepare transcripts, IELTS/TOEFL results, SOP, and financial proof.',
      'Submit your application — EduSpark helps write your Statement of Purpose.',
      'Receive your Letter of Acceptance (LoA) — essential for the study permit.',
      'Apply for a Canadian Study Permit (typically 8–12 weeks processing time).',
    ],
    USA: [
      'Contact EduSpark to build your US university application strategy.',
      'Prepare SAT/ACT (undergrad) or GRE (graduate), TOEFL/IELTS, transcripts, and essays.',
      'Submit applications through Common App or directly — EduSpark helps with essays.',
      'Receive your Form I-20 from the admitted university.',
      'Pay the SEVIS fee and attend your F-1 Student Visa interview at the US Embassy.',
    ],
    'New Zealand': [
      'Contact EduSpark to explore New Zealand visa pathways and scholarships.',
      'Prepare IELTS 6.0+, transcripts, and a personal statement.',
      'EduSpark submits your application and requests an unconditional offer letter.',
      'Accept the offer and enrol — EduSpark guides you through full-cost disclosure (FCD).',
      'Apply online for a New Zealand Student Visa via the Immigration portal.',
    ],
  };
  const steps = base[country] ?? base['Malaysia'];
  if (level === 'PhD') {
    return [
      'Contact EduSpark to match your research interests with available supervisors.',
      steps[1],
      steps[2],
      'Submit research proposal and undergo supervisor approval before formal admission.',
      steps[steps.length - 1],
    ];
  }
  return steps;
}

function getHighlights(specialization: string, level: string): string[] {
  if (level === 'PhD') return ['Independent Research Supervision', 'Publication in Peer-Reviewed Journals', 'Advanced Seminars & Colloquia', 'Research Grant Opportunities', 'Industry & Academic Collaboration', 'Thesis Defence'];
  const map: Record<string, string[]> = {
    'General CS':              ['Algorithms & Data Structures', 'Object-Oriented Programming', 'Operating Systems', 'Database Design', 'Software Engineering', 'Computer Networks'],
    'Software Engineering':    ['Agile & Scrum Methodology', 'DevOps & CI/CD Pipelines', 'Software Architecture', 'Unit & Integration Testing', 'Project Management', 'Design Patterns'],
    'Artificial Intelligence': ['Machine Learning', 'Deep Learning & Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'AI Ethics'],
    'Cybersecurity':           ['Ethical Hacking & Penetration Testing', 'Cryptography & Encryption', 'Network Security', 'Digital Forensics', 'Risk Management', 'Security Compliance'],
    'Data Science':            ['Statistical Analysis', 'Big Data Technologies', 'Data Visualisation', 'Predictive Modelling', 'Machine Learning', 'Python & R Programming'],
    'Computer Networks':       ['Network Protocols & Architecture', 'Wireless & Mobile Networks', 'Network Security', 'Cloud Networking', 'IPv6 & SDN', 'CCNA-Aligned Content'],
    'Cloud Computing':         ['AWS, Azure & GCP', 'Virtualisation & Containers', 'Distributed Systems', 'DevOps & Infrastructure as Code', 'Cloud Security', 'Microservices'],
    'Mobile Computing':        ['iOS & Android Development', 'Mobile UI/UX Design', 'IoT & Edge Computing', 'Wireless Protocols', 'Mobile Security', 'React Native / Flutter'],
    'Business Analytics':      ['Business Intelligence Tools', 'Data Warehousing & ETL', 'SQL & NoSQL Databases', 'Decision Support Systems', 'Tableau / Power BI', 'Predictive Analytics'],
    'Information Technology':  ['IT Infrastructure', 'Systems Administration', 'Network Management', 'Enterprise Resource Planning', 'IT Project Management', 'Cloud Services'],
    'Information Systems':     ['IS Design & Analysis', 'Database Management', 'Business Process Modelling', 'Enterprise Architecture', 'IT Strategy & Governance', 'ERP Systems'],
    'Multimedia':              ['3D Animation & Modelling', 'Video & Audio Production', 'Interactive Media Design', 'Game Development Basics', 'AR/VR Technologies', 'UI/UX Principles'],
    'Informatics':             ['Computational Theory', 'Intelligent Systems', 'Bioinformatics', 'Scientific Computing', 'Human-Computer Interaction', 'Knowledge Representation'],
  };
  const list = map[specialization] ?? map['General CS'];
  return level === 'Master' ? list.map((h, i) => i < 3 ? `Advanced ${h}` : h) : list;
}

function getScholarshipInfo(country: string): string {
  const map: Record<string, string> = {
    Malaysia:          'Malaysian students may be eligible for MARA, JPA, or Yayasan Tenaga scholarships. International students can apply for university merit bursaries and the Malaysia International Scholarship (MIS). EduSpark advisors identify every scholarship you qualify for.',
    Japan:             'The MEXT (Monbukagakusho) scholarship covers full tuition, living allowance, and return airfare for outstanding students. JASSO provides additional support loans. Many universities offer their own merit scholarships for international students.',
    Singapore:         'Singapore government scholarships such as the ASEAN Scholarship and university-specific bursaries are available for outstanding international students. EduSpark helps identify and apply for all eligible awards.',
    'South Korea':     'The Korean Government Scholarship Program (GKS) covers tuition, stipend, and Korean language training. Each university also offers its own merit scholarships. Applications are competitive — early preparation is key.',
    China:             'The Chinese Government Scholarship (CSC) is one of the most generous in the world, covering tuition, accommodation, and a monthly stipend. Provincial-level and university scholarships are also available for international students.',
    'United Kingdom':  'Chevening Scholarships (funded by the UK Government) cover full fees and living costs for exceptional students. Commonwealth Scholarships and university bursaries (merit/need) are also available. EduSpark guides every step of the scholarship application.',
    Germany:           'Germany has no tuition fees at public universities for both domestic and international students — you only pay a semester contribution (approx. €300). DAAD scholarships offer additional financial support for living costs.',
    Netherlands:       'The Holland Scholarship (€5,000) and Orange Tulip Scholarship are available for non-EEA students. Dutch universities also offer merit-based excellence grants. EduSpark provides dedicated scholarship search support.',
    Canada:            'Vanier Canada Graduate Scholarships, university entrance awards, and provincial bursaries are available. Post-graduation, the 3-year Open Work Permit (PGWP) offers a clear pathway to Permanent Residency.',
    USA:               'US universities offer significant merit-based aid including scholarships, assistantships (for graduate students), and fellowship programmes. STEM graduates can apply for OPT (Optional Practical Training) for up to 3 years.',
    'New Zealand':     'The New Zealand Government offers Excellence Awards for international students. Universities provide merit-based scholarships of NZD 5,000–30,000. EduSpark tracks all open scholarship cycles for you.',
  };
  return map[country] ?? 'A range of merit-based and government scholarships are available. Contact EduSpark for a personalised scholarship assessment.';
}

export default function CSCourseDetailPage({ params }: { params: { slug: string } }) {
  const course = csItCourses.find(c => c.slug === params.slug);
  if (!course) notFound();

  const related    = csItCourses.filter(c => c.university === course.university && c.slug !== course.slug).slice(0, 3);
  const logoColor  = countryColors[course.country] || '#0b3d91';
  const initials   = course.universityShort.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter(Boolean).map((w: string) => w[0]).join('').slice(0, 4).toUpperCase();
  const lvlStyle   = levelColors[course.level] || { bg: '#e8f0ff', color: '#1a56c4' };
  const steps      = getAdmissionSteps(course.country, course.level);
  const highlights = getHighlights(course.specialization, course.level);
  const scholarship = getScholarshipInfo(course.country);
  const isContact  = course.offerLetter === 'Contact EduSpark for Details';

  return (
    <>
      <style>{`
        .cd-page{background:#f8faff;min-height:100vh;padding-bottom:60px}
        .cd-hero{background:linear-gradient(135deg,#0b3d91 0%,#1a56c4 60%,#0d47a1 100%);padding:48px 0 60px;position:relative;overflow:hidden}
        .cd-hero::after{content:'';position:absolute;bottom:-60px;right:-40px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,0.03);pointer-events:none}
        .cd-breadcrumb{display:flex;align-items:center;gap:6px;font-size:0.78rem;color:rgba(255,255,255,0.6);margin-bottom:20px;flex-wrap:wrap}
        .cd-breadcrumb a{color:rgba(255,255,255,0.7);text-decoration:none;transition:color 0.2s}
        .cd-breadcrumb a:hover{color:#fff}
        .cd-hero-inner{display:flex;align-items:flex-start;gap:24px}
        .cd-hero-logo{width:72px;height:72px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;color:#fff;font-family:var(--font-head);flex-shrink:0;border:2px solid rgba(255,255,255,0.2);text-align:center;line-height:1.2;letter-spacing:0.3px}
        .cd-hero-title{font-size:clamp(1.2rem,3vw,1.9rem);font-weight:900;color:#fff;font-family:var(--font-head);margin:0 0 6px;line-height:1.25}
        .cd-hero-uni{font-size:0.88rem;color:rgba(255,255,255,0.8);margin-bottom:12px}
        .cd-hero-badges{display:flex;gap:8px;flex-wrap:wrap}
        .cd-badge{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:0.72rem;color:rgba(255,255,255,0.9);font-weight:600;white-space:nowrap}
        .cd-badge.green{background:rgba(34,197,94,0.15);border-color:rgba(34,197,94,0.3);color:#86efac}
        .cd-badge.amber{background:rgba(251,191,36,0.15);border-color:rgba(251,191,36,0.3);color:#fde68a}
        .cd-container{max-width:1000px;margin:0 auto;padding:0 24px}
        .cd-layout{display:grid;grid-template-columns:1fr 300px;gap:28px;margin-top:-28px;align-items:start}
        .cd-main{display:flex;flex-direction:column;gap:20px}
        .cd-card{background:#fff;border:1.5px solid #e4ecf8;border-radius:16px;padding:28px}
        .cd-card-title{font-size:0.95rem;font-weight:800;color:var(--blue);margin:0 0 16px;padding-bottom:12px;border-bottom:1.5px solid #eef2fb;display:flex;align-items:center;gap:8px}
        .cd-desc{font-size:0.88rem;color:#5a6a7e;line-height:1.8;margin:0}
        .cd-highlights{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .cd-highlight{display:flex;align-items:flex-start;gap:8px;font-size:0.84rem;color:var(--text)}
        .cd-highlight-dot{width:8px;height:8px;border-radius:50%;background:var(--orange);flex-shrink:0;margin-top:5px}
        .cd-steps{display:flex;flex-direction:column;gap:14px}
        .cd-step{display:flex;align-items:flex-start;gap:12px}
        .cd-step-num{width:28px;height:28px;border-radius:50%;background:var(--blue);color:#fff;font-size:0.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .cd-step-text{font-size:0.87rem;color:#5a6a7e;line-height:1.65;padding-top:4px}
        .cd-sidebar{display:flex;flex-direction:column;gap:16px}
        .cd-info-card{background:#fff;border:1.5px solid #e4ecf8;border-radius:16px;padding:22px}
        .cd-info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f0f4ff;gap:12px}
        .cd-info-row:last-child{border-bottom:none;padding-bottom:0}
        .cd-info-label{font-size:0.74rem;color:var(--gray);font-weight:600;flex-shrink:0}
        .cd-info-value{font-size:0.81rem;color:var(--text);font-weight:700;text-align:right;line-height:1.4}
        .cd-info-value.green{color:#16a34a}
        .cd-info-value.amber{color:#d97706}
        .cd-info-value.blue{color:var(--blue)}
        .cd-apply-btn{display:block;background:var(--orange);color:#fff;border:none;border-radius:12px;padding:15px;font-weight:800;font-size:0.92rem;cursor:pointer;text-decoration:none;text-align:center;font-family:var(--font-body);transition:all 0.2s;width:100%;box-sizing:border-box}
        .cd-apply-btn:hover{background:#e06a00;transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,122,0,0.3)}
        .cd-wa-btn{display:block;background:#25d366;color:#fff;border:none;border-radius:12px;padding:12px;font-weight:700;font-size:0.85rem;cursor:pointer;text-decoration:none;text-align:center;font-family:var(--font-body);transition:all 0.2s;width:100%;box-sizing:border-box;margin-top:8px}
        .cd-wa-btn:hover{background:#22bc5a}
        .cd-scholarship-card{background:linear-gradient(135deg,#fff8e1,#fff3cd);border:1.5px solid #fde68a;border-radius:16px;padding:22px}
        .cd-scholarship-title{font-size:0.88rem;font-weight:800;color:#92400e;margin-bottom:10px}
        .cd-scholarship-text{font-size:0.8rem;color:#78350f;line-height:1.65;margin:0}
        .cd-related{margin-top:32px}
        .cd-related-heading{font-size:0.95rem;font-weight:800;color:var(--blue);margin-bottom:14px}
        .cd-related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
        .cd-related-card{background:#fff;border:1.5px solid #e4ecf8;border-radius:12px;padding:18px;text-decoration:none;transition:all 0.22s;display:block}
        .cd-related-card:hover{border-color:var(--blue);transform:translateY(-3px);box-shadow:0 8px 24px rgba(11,61,145,0.08)}
        .cd-related-card-title{font-size:0.85rem;font-weight:700;color:var(--blue);margin-bottom:5px;line-height:1.35}
        .cd-related-card-meta{font-size:0.71rem;color:var(--gray)}
        @media(max-width:768px){.cd-layout{grid-template-columns:1fr}.cd-highlights{grid-template-columns:1fr}.cd-hero-inner{flex-direction:column;gap:14px}.cd-hero-logo{width:56px;height:56px}}
      `}</style>

      {/* HERO */}
      <div className="cd-hero">
        <div className="cd-container">
          <div className="cd-breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/courses">Courses</Link><span>›</span>
            <Link href="/courses/computer-science">Computer Science &amp; IT</Link><span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{course.title}</span>
          </div>
          <div className="cd-hero-inner">
            <div className="cd-hero-logo" style={{ background: logoColor }}>{initials}</div>
            <div>
              <h1 className="cd-hero-title">{course.title}</h1>
              <div className="cd-hero-uni">{course.countryFlag} {course.university} · {course.city}, {course.country}</div>
              <div className="cd-hero-badges">
                <span className="cd-badge">📅 {course.duration}</span>
                <span className="cd-badge" style={{ background: lvlStyle.bg, color: lvlStyle.color, border: 'none', fontWeight: 800 }}>🎓 {course.level}</span>
                <span className="cd-badge">💡 {course.specialization}</span>
                {isContact ? <span className="cd-badge amber">📩 Contact for Offer</span> : <span className="cd-badge green">✅ {course.offerLetter}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="cd-page">
        <div className="cd-container">
          <div className="cd-layout">

            {/* MAIN */}
            <div className="cd-main">

              <div className="cd-card">
                <div className="cd-card-title">📖 About This Programme</div>
                <p className="cd-desc">{course.description}</p>
                <div style={{ marginTop: '16px', padding: '14px 16px', background: '#f8faff', borderRadius: '10px', border: '1px solid #dde6f5' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue)', marginBottom: '5px' }}>📋 Minimum Entry Requirement</div>
                  <div style={{ fontSize: '0.84rem', color: '#5a6a7e', lineHeight: 1.65 }}>{course.minRequirement}</div>
                </div>
              </div>

              <div className="cd-card">
                <div className="cd-card-title">⭐ Programme Highlights</div>
                <div className="cd-highlights">
                  {highlights.map((h, i) => (
                    <div key={i} className="cd-highlight">
                      <div className="cd-highlight-dot" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cd-card">
                <div className="cd-card-title">📋 Admission Process</div>
                <div className="cd-steps">
                  {steps.map((step, i) => (
                    <div key={i} className="cd-step">
                      <div className="cd-step-num">{i + 1}</div>
                      <div className="cd-step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cd-card">
                <div className="cd-card-title">🏆 Scholarship Opportunities</div>
                <p className="cd-desc">{scholarship}</p>
                <div style={{ marginTop: '16px', padding: '14px 16px', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', marginBottom: '5px' }}>💡 EduSpark Scholarship Support</div>
                  <div style={{ fontSize: '0.8rem', color: '#0c4a6e', lineHeight: 1.6 }}>Our advisors identify every scholarship you qualify for and guide your application from start to finish — at no extra cost to you.</div>
                </div>
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="cd-sidebar">

              <div className="cd-info-card">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '14px' }}>📊 Quick Info</div>
                {([
                  { label: 'Duration',       value: course.duration },
                  { label: 'Level',          value: course.level,         cls: 'blue' },
                  { label: 'Specialization', value: course.specialization },
                  { label: 'Country',        value: `${course.countryFlag} ${course.country}` },
                  { label: 'City',           value: course.city },
                  { label: 'Offer Letter',   value: isContact ? '📩 Contact EduSpark' : '✅ Free Official', cls: isContact ? 'amber' : 'green' },
                  { label: 'Min. Req.',      value: course.minRequirement.length > 55 ? course.minRequirement.slice(0, 55) + '…' : course.minRequirement },
                ] as { label: string; value: string; cls?: string }[]).map((r, i) => (
                  <div key={i} className="cd-info-row">
                    <span className="cd-info-label">{r.label}</span>
                    <span className={`cd-info-value${r.cls ? ` ${r.cls}` : ''}`}>{r.value}</span>
                  </div>
                ))}
              </div>

              <div className="cd-info-card">
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '14px', lineHeight: 1.6 }}>
                  Ready to apply or need guidance? Our advisors are available now.
                </div>
                <Link href="/contact" className="cd-apply-btn">Apply Now →</Link>
                <a
                  href={`https://wa.me/601867778759?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(course.title)}%20at%20${encodeURIComponent(course.university)}.%20Can%20you%20help%20me%20apply%3F`}
                  target="_blank" rel="noopener noreferrer"
                  className="cd-wa-btn"
                >💬 WhatsApp Us</a>
              </div>

              <div className="cd-scholarship-card">
                <div className="cd-scholarship-title">🎓 Scholarship Available</div>
                <p className="cd-scholarship-text">
                  {scholarship.slice(0, 130)}…{' '}
                  <Link href="/contact" style={{ color: '#92400e', fontWeight: 700 }}>Check eligibility →</Link>
                </p>
              </div>

            </div>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <div className="cd-related">
              <div className="cd-related-heading">More from {course.university}</div>
              <div className="cd-related-grid">
                {related.map((r, i) => {
                  const lvl = levelColors[r.level] || { bg: '#e8f0ff', color: '#1a56c4' };
                  return (
                    <Link key={i} href={`/courses/computer-science/${r.slug}`} className="cd-related-card">
                      <div className="cd-related-card-title">{r.title}</div>
                      <div className="cd-related-card-meta">
                        ⏱ {r.duration}&nbsp;·&nbsp;
                        <span style={{ background: lvl.bg, color: lvl.color, borderRadius: '20px', padding: '1px 7px', fontWeight: 700, fontSize: '0.68rem' }}>{r.level}</span>
                        &nbsp;·&nbsp;{r.specialization}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* BACK LINKS */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/courses/computer-science" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--blue)', fontWeight: 600, fontSize: '0.84rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 16px', background: '#fff' }}>
              ← Back to CS &amp; IT Listing
            </Link>
            <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gray)', fontWeight: 600, fontSize: '0.84rem', textDecoration: 'none', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '8px 16px', background: '#fff' }}>
              ← All Programmes
            </Link>
          </div>

        </div>
      </div>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="container">
          <h2>Ready to Start Your CS Journey at {course.universityShort}?</h2>
          <p>Get a free consultation — our advisors will guide you from application to visa.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Get Free Counselling</Link>
            <Link href="/courses/computer-science" className="btn-outline-w">💻 Browse All CS Courses</Link>
          </div>
        </div>
      </div>
    </>
  );
}
