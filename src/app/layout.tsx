import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { client } from "@/sanity/lib/client";
import { chatbotRespuestasQuery, configuracionSitioQuery } from "@/sanity/lib/queries";
import { SITE_CONFIG, CACHE_CONFIG } from "@/lib/constants";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Complejo El Alto",
  description:
    "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort en Tanti.",
  url: baseUrl,
  logo: `${baseUrl}/icon-512.png`,
  image: `${baseUrl}/og-image.png`,
  telephone: ["+54 3541 498970", "+54 9 3572 501030"],
  email: "info@complejoelalto.com.ar",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruta Provincial N°28 y San Martín 1130",
    addressLocality: "Tanti",
    addressRegion: "Córdoba",
    postalCode: "5155",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.3607,
    longitude: -64.5876,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "22:00",
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
    ratingValue: "4.5",
    reviewCount: "150",
    bestRating: "5",
  },
  sameAs: [
    "https://instagram.com/complejoelalto",
    "https://facebook.com/complejoelalto",
    "https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html",
  ],
};

interface ChatbotData {
  clave: string;
  respuesta: string;
  opcionesSeguimiento?: string[];
}

interface SiteConfig {
  numeroWhatsapp?: string;
}

async function getChatbotData() {
  try {
    const [respuestas, config] = await Promise.all([
      client.fetch<ChatbotData[]>(chatbotRespuestasQuery, {}, { next: { revalidate: CACHE_CONFIG.SANITY_REVALIDATE } }),
      client.fetch<SiteConfig | null>(configuracionSitioQuery, {}, { next: { revalidate: CACHE_CONFIG.SANITY_REVALIDATE } }),
    ]);
    return { respuestas, whatsappNumber: config?.numeroWhatsapp };
  } catch {
    return { respuestas: undefined, whatsappNumber: undefined };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { respuestas, whatsappNumber } = await getChatbotData();

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
        <ChatBot respuestas={respuestas} whatsappNumber={whatsappNumber} />
      </body>
    </html>
  );
}
