# El Alto Website - Project Context

## About the Business
- **Name:** Complejo El Alto
- **Type:** Cabin complex (complejo de cabañas)
- **Location:** Tanti, Córdoba, Argentina (10 min from Villa Carlos Paz)
- **Operating since:** 1996 (28+ years)
- **Total units:** 12 cabins with capacity for ~40 guests
- **Key differentiator:** Family-owned and operated

## Cabin Types
1. **Dúplex** (2 units) - Up to 6 people, two floors
2. **Standard** (4 units) - 2-4 people
3. **Compactas** (4 units) - 2-3 people
4. **Parejas** (2 units) - 2 people, romantic getaways

## Amenities (DO NOT include breakfast - it's NOT included)
- Pool (heated in spring/fall)
- Quincho with BBQ grills
- Free Wi-Fi
- Covered parking
- Equipped kitchens in each cabin
- Mountain views

## Design System

### Color Palette (defined in tailwind.config.ts)
- **forest-dark:** #1a3a2f - Primary dark green, used for dark sections
- **forest:** #2d5a47 - Secondary green
- **cream:** #faf6f1 - Light sections background
- **cream-dark:** #f0e9df - Slightly darker cream variant
- **amber:** #d4a853 - Accent color, CTAs, highlights
- **amber-dark:** #b8903f - Hover state for amber
- **sand:** #e8dfd4 - Borders, subtle backgrounds

### Typography
- **Headings:** font-serif (Playfair Display)
- **Body:** Default sans-serif

### Section Background Pattern
Homepage sections alternate between dark and light backgrounds:
1. Hero (full-screen with rotating images every 5s)
2. TrustSignals → `bg-forest-dark` (compact horizontal stats bar, flows with hero)
3. ServicesHighlights → `bg-cream` (image cards with overlays)
4. LocationTeaser → `bg-forest-dark` (distance cards, image attraction grid)
5. FeaturedCabanas → `bg-cream` (2-column layout: image + text info)
6. Testimonials → `bg-forest-dark` (3-section cards: stars | quote | author)
7. FinalCTA → `bg-forest/85` overlay on pool image
8. Footer → `bg-forest-dark` (compact 4-column layout)

**Notes:**
- TrustSignals uses dark background to flow naturally from the hero
- FeaturedCabanas now has 2-column layout: smaller image (4:3) + text description with features
- Testimonial cards have 3 sections divided by borders for consistent heights
- Footer navigation split into 2 columns side by side
- FinalCTA uses forest overlay (not amber) to blend better with footer

### Design Patterns
- **Section headers:** Small uppercase label (text-amber or text-forest) + large serif heading + subtitle
- **Cards:** rounded-2xl, often with image backgrounds and gradient overlays
- **Buttons:** rounded-full, primary uses bg-amber
- **Spacing:** Sections use py-16 md:py-20

### Images Available in /public/images/
- panorama-pileta.jpg - Pool panorama (main hero image)
- vista-desde-cabana.JPG - View from cabin
- cabana-con-vista.JPG - Cabin with mountain view
- sierras.jpg - Mountain landscape
- senderismo.jpg - Hiking trails
- villa-carlos-paz.jpg - Villa Carlos Paz
- cabana1/2/3-*.JPG - Interior shots of different cabin types
- asador.jpg - BBQ area
- area-comun.JPG - Common area

## Contact Information
- Phone: (03541) 498970
- Email: info@complejoelalto.com.ar
- Address: Ruta Provincial N°28 y San Martín 1130, Tanti (5155), Córdoba
- Check-in: 13:30 / Check-out: 10:00
- Legal: Legajo N°272/07 — Agencia Córdoba Turismo

## External Links
- TripAdvisor: https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html
- Rating: 4.6/5 (49+ reviews, Travelers' Choice Top 10%)
