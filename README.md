# 🏔️ Complejo de Cabañas El Alto

Website built for a 28-year-old family cabin rental business complex in Tanti, Córdoba, Argentina.

🌐 **Live:** [el-alto-website.vercel.app](https://el-alto-website.vercel.app)

## The Problem

The old WordPress site had placeholder text, spelling errors, and a broken contact flow. 80% of WhatsApp inquiries came in as just "Hola" — no dates, no guest count.

## The Solution

- **Smart contact form & chatbot** — collects dates and guest count *before* opening WhatsApp
- **Sanity CMS** — owner can update prices himself (prices change weekly with Argentine inflation)
- **Google Analytics** — track visits and conversions

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS · Sanity · Vercel · Google Analytics 4

## Screenshots

<p>
  <img src="public/screenshots/el-alto-1.png" width="32%" alt="Hero Section">
  <img src="public/screenshots/el-alto-2.png" width="32%" alt="Cabin Cards">
  <img src="public/screenshots/el-alto-3.png" width="32%" alt="Contact Form">
</p>

## Setup
```bash
git clone https://github.com/LeoCba07/el-alto-website.git
cd el-alto-website
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
```bash
npm run dev
```

## Structure
```
src/
├── app/        # Pages (App Router)
├── components/ # React components
└── sanity/     # Schemas & queries
```

## CMS Content

The owner can edit via Sanity Studio (`/studio`):

- Cabin types, descriptions, photos
- Pricing by season
- FAQs
- Testimonials
- Contact info and hours
- Nearby attractions

---

Built by [LeoCba07](https://github.com/LeoCba07)
