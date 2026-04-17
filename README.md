# EduSpark International Study — SaaS Web App

> A full-stack Next.js consultancy web app helping Bangladeshi students access global education opportunities.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Neon (PostgreSQL serverless) |
| ORM | Drizzle ORM |
| Auth | NextAuth v5 |
| Email | Resend |
| Styling | Custom CSS + Tailwind |
| Deployment | Vercel (recommended) |

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/abdullahconnect911-cmyk/EduSpark.git
cd EduSpark
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
# Fill in your values
```

Required variables:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` — Run `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for dev
- `RESEND_API_KEY` — From resend.com

### 3. Database Setup
```bash
npm run db:push   # Push schema to Neon
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # About Us
│   ├── destinations/       # Study Destinations
│   ├── universities/       # Partner Universities
│   ├── courses/            # Courses & Programs
│   ├── services/           # Our Services + FAQ
│   ├── blog/               # Blog & Resources
│   ├── contact/            # Contact + Booking Form
│   ├── auth/               # Login / Register (Part 2)
│   ├── dashboard/          # Admin + Student dashboards (Part 2-3)
│   └── api/                # API routes
├── components/
│   ├── layout/             # Navbar, Footer, FloatingElements
│   └── public/             # HeroSection, UniversityTicker
├── db/
│   ├── schema.ts           # Drizzle schema
│   └── index.ts            # DB connection
├── auth.ts                 # NextAuth config
└── types/                  # TypeScript declarations
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--blue` | `#0b3d91` | Primary (60%) |
| `--orange` | `#ff7a00` | Accent / CTA (10%) |
| `--off` | `#f5f8fe` | Backgrounds (30%) |
| Fonts | Poppins + Playfair Display | Body + Display |

## Roadmap

- [x] Part 1 — Public pages (Home, About, Destinations, Universities, Courses, Services, Blog, Contact)
- [ ] Part 2 — Auth system + Student dashboard
- [ ] Part 3 — Admin dashboard + full API layer

## License

© 2026 EduSpark International Study. All rights reserved.
