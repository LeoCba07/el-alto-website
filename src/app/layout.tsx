import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { client } from "@/sanity/lib/client";
import { chatbotRespuestasQuery, configuracionSitioQuery, tarifasTemporadaQuery } from "@/sanity/lib/queries";
import { SITE_CONFIG, CACHE_CONFIG, TRUST_STATS, BUSINESS_HOURS, RESERVATION_POLICIES } from "@/lib/constants";
import { SiteConfig } from "@/lib/types";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const baseUrl = SITE_CONFIG.BASE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Complejo El Alto | Cabañas en Tanti, Córdoba",
    template: "%s | Complejo El Alto",
  },
  description:
    "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort en Tanti. Pileta, quincho, desayuno incluido.",
  keywords: [
    "cabañas en Tanti",
    "alojamiento Tanti Córdoba",
    "complejo El Alto Tanti",
    "departamentos Tanti",
    "cabañas cerca de Carlos Paz",
    "alquiler temporario Tanti",
  ],
  authors: [{ name: "Complejo El Alto" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Complejo El Alto | Cabañas en Tanti, Córdoba",
    description:
      "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort.",
    url: baseUrl,
    siteName: "Complejo El Alto",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Complejo El Alto - Cabañas en Tanti, Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complejo El Alto | Cabañas en Tanti, Córdoba",
    description:
      "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// Generate JSON-LD with config from Sanity (with fallbacks)
function generateJsonLd(config: SiteConfig | null) {
  const stats = config?.estadisticas;
  const direccion = config?.direccion;
  const redes = config?.redesSociales;

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Complejo El Alto",
    description:
      "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort en Tanti.",
    url: baseUrl,
    logo: `${baseUrl}/icon-512.png`,
    image: `${baseUrl}/og-image.png`,
    telephone: [
      config?.telefonoFijo || "+54 3541 498970",
      config?.telefonoMovil || "+54 9 3572 501030"
    ],
    email: config?.email || "info@complejoelalto.com.ar",
    address: {
      "@type": "PostalAddress",
      streetAddress: direccion?.calle || "Ruta Provincial N°28 y San Martín 1130",
      addressLocality: direccion?.ciudad || "Tanti",
      addressRegion: direccion?.provincia || "Córdoba",
      postalCode: direccion?.codigoPostal || "5155",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: direccion?.ubicacion?.lat || -31.3607,
      longitude: direccion?.ubicacion?.lng || -64.5876,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: config?.horarios?.recepcion?.apertura || "09:00",
      closes: config?.horarios?.recepcion?.cierre || "19:00",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pileta", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamiento", value: true },
      { "@type": "LocationFeatureSpecification", name: "Quincho", value: true },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(stats?.tripAdvisorRating ?? TRUST_STATS.tripAdvisorRating),
      reviewCount: String(stats?.cantidadResenas ?? TRUST_STATS.reviewCount),
      bestRating: String(stats?.tripAdvisorMaxRating ?? TRUST_STATS.tripAdvisorMaxRating),
    },
    sameAs: [
      redes?.instagram || "https://instagram.com/complejoelalto",
      redes?.facebook || "https://facebook.com/complejoelalto",
      redes?.tripadvisor || "https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html",
    ].filter(Boolean),
  };
}

interface ChatbotData {
  clave: string;
  respuesta: string;
  opcionesSeguimiento?: string[];
}

interface SanityTarifaTemporada {
  _id: string;
  temporada: 'alta' | 'media' | 'baja';
  nombre: string;
  periodo: string;
  precios: Array<{
    capacidad: string;
    precio: number;
  }>;
  orden: number;
}

export interface TarifasData {
  alta: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] };
  media: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] };
  baja: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] };
}

async function getSiteData() {
  try {
    const [respuestas, config, tarifasRaw] = await Promise.all([
      client.fetch<ChatbotData[]>(chatbotRespuestasQuery, {}, { next: { revalidate: CACHE_CONFIG.SANITY_REVALIDATE } }),
      client.fetch<SiteConfig | null>(configuracionSitioQuery, {}, { next: { revalidate: CACHE_CONFIG.SANITY_REVALIDATE } }),
      client.fetch<SanityTarifaTemporada[]>(tarifasTemporadaQuery, {}, { next: { revalidate: CACHE_CONFIG.SANITY_REVALIDATE } }),
    ]);

    // Transform tarifas array into the expected structure
    let tarifas: TarifasData | undefined = undefined;
    if (tarifasRaw && tarifasRaw.length > 0) {
      const tarifasMap: Partial<TarifasData> = {};
      for (const t of tarifasRaw) {
        tarifasMap[t.temporada] = {
          nombre: t.nombre,
          periodo: t.periodo,
          precios: t.precios,
        };
      }
      if (tarifasMap.alta && tarifasMap.media && tarifasMap.baja) {
        tarifas = tarifasMap as TarifasData;
      }
    }

    return { respuestas, config, tarifas };
  } catch {
    return { respuestas: undefined, config: null, tarifas: undefined };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { respuestas, config, tarifas } = await getSiteData();
  const jsonLd = generateJsonLd(config);

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-forest-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-amber"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatBot respuestas={respuestas} siteConfig={config} tarifas={tarifas} />
      </body>
    </html>
  );
}
