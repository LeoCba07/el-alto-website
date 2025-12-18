import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "Complejo El Alto | Cabañas en Tanti, Córdoba",
    description:
      "Cabañas y departamentos en las sierras de Córdoba. Más de 28 años brindando tranquilidad y confort.",
    url: "https://complejoelalto.com.ar",
    siteName: "Complejo El Alto",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
