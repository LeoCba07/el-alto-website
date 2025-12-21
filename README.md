# Complejo El Alto - Website

Modern website for Complejo El Alto, a cabin rental business in Tanti, Córdoba, Argentina.

**Live site:** [el-alto-website.vercel.app](https://el-alto-website.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity Studio
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

## Features

- Responsive design for all devices
- Sanity CMS for content management
- Photo carousels for cabin galleries
- WhatsApp contact form integration
- Interactive chatbot for common questions
- SEO optimized with sitemap and schema markup
- Section navigation indicator on homepage

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SANITY_API_TOKEN=your_write_token
```

## Project Structure

```
src/
├── app/                 # Next.js pages
│   ├── cabanas/         # Cabins & pricing
│   ├── servicios/       # Services & amenities
│   ├── normas/          # Rules & policies
│   ├── consultas-frecuentes/  # FAQ
│   ├── contacto/        # Contact form
│   └── studio/          # Sanity Studio
├── components/          # React components
├── sanity/              # Sanity schemas & config
└── lib/                 # Utilities & constants
```

## Content Management

Access Sanity Studio at `/studio` to manage:
- Hero section content
- Cabin types and photos
- Services and amenities
- FAQs
- Site configuration

## License

Private - All rights reserved.
