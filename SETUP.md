# 33 Nexus — Setup Guide

## Prerequisites
- Node.js 18+ (download from https://nodejs.org)
- PostgreSQL database (or use PlanetScale/Supabase/Neon for hosted)
- Git

## Quick Start

### 1. Install Node.js
Download and install from https://nodejs.org/en/download (LTS version)

### 2. Install Dependencies
```bash
cd "33 Nexus"
npm install
```

### 3. Configure Environment
Edit `.env.local` with your values:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Random 32+ character secret (use: `openssl rand -base64 32`)
- `SMTP_*` — Email settings for contact form
- `CONTACT_EMAIL` — Where contact form submissions go

### 4. Set Up Database
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
```

### 5. Create Admin User (via Prisma Studio)
```bash
npm run db:studio
```
Or seed manually with a hashed password (use bcrypt).

### 6. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

### 7. Build for Production
```bash
npm run build
npm run start
```

## Deployment (Vercel)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Sacred Numbers Embedded
- 33 constellation stars in hero
- 88 total particles (33 + 55)
- 888ms preloader
- 8 services, 8 process steps
- 33 footer elements
- Typography: 9.9rem / 6.6rem / 3.3rem
- Animation: 0.33s / 0.66s / 0.99s
- Button padding: 8px 88px
- Hero height: 88vh
- Mobile breakpoint: 833px
- Z-index: 33, 66, 99, 333
