import type { Metadata } from "next";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppPopup from "@/components/WhatsApp/WhatsAppPopup"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelas Struktur – Belajar Teknik Sipil & Struktur Bangunan Online",
  description:
    "Platform kursus online terpercaya untuk belajar teknik sipil dan struktur bangunan dari dasar hingga profesional. Raih keahlian engineering bersama instruktur berpengalaman.",
  keywords: ["teknik sipil", "kursus online", "struktur bangunan", "engineering", "kelas online"],
  
  // 🔥 OPEN GRAPH - Untuk WhatsApp, Facebook, Telegram, dll
  openGraph: {
    title: "Kelas Struktur – Platform Kursus Engineering Terbaik di Indonesia",
    description: "Bergabung dengan 4.000+ engineer. Belajar teknik sipil & struktur bangunan dari dasar hingga profesional. Daftar gratis sekarang! ✨",
    url: "https://developkelasstruktur.web.id/",
    siteName: "Kelas Struktur",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kelas Struktur - Platform Belajar Teknik Sipil",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  
  // 🔥 TWITTER CARDS - Untuk X (Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Kelas Struktur – Platform Kursus Engineering Terbaik",
    description: "Belajar teknik sipil & struktur bangunan secara online bersama para ahli. Daftar gratis sekarang!",
    images: ["/og-image.png"],
    creator: "@kelasstruktur",
  },
  
  // 🔥 ICONS - Favicon untuk tab browser
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  
  // 🔥 METADATA LAINNYA (Opsional tapi direkomendasikan)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://developkelasstruktur.web.id",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* 🔥 MANUAL TAGS (Sebagai fallback untuk beberapa platform) */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <WhatsAppPopup 
            phoneNumber="6285343602030"
            message="Halo, saya tertarik dengan Kelas Struktur"
            companyName="Kelas Struktur"
            email="Admin@kelasstrutkru.com"
            operatingHours="Kelas Struktur siap membantu Anda 24/7, kapan pun Anda butuh."
          />
        </ThemeProvider>
      </body>
    </html>
  );
}