# Complejo El Alto — Website Rebuild

Website rebuild for my uncle's cabin rental complex in Tanti, Córdoba, Argentina. Replacing an outdated WordPress site with something fast, professional, and easy to edit.

🌐 **Current site:** [complejoelalto.com.ar](https://complejoelalto.com.ar)
⭐ **TripAdvisor:** #1 Campground in Tanti
📍 **Location:** Ruta 28 y San Martín, Tanti, Córdoba

## The Problem

The WordPress site has placeholder text, spelling errors, and a broken contact flow. 80% of WhatsApp inquiries come in as just "Hola" — no dates, no guest count — leading to endless back-and-forth.

## The Solution

A smart contact form that collects check-in/check-out dates and guest count *before* opening WhatsApp. The owner receives complete inquiries instantly, no follow-up needed.

Also: Sanity CMS so he can update prices and content himself (important with Argentine inflation).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Hosting:** Vercel (free tier)

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
```

Run it:

```bash
npm run dev
```

## Project Structure

```
src/
├── app/        # Pages (App Router)
├── components/ # React components
└── sanity/     # Schemas & queries
```

## About the Property

12-unit complex with pool, quincho (BBQ), gym, spa, and restaurant. Family-owned for 28+ years. Check-in 13:00, check-out 10:00. No pets.

---

Built by [Leo](https://github.com/LeoCba07)
