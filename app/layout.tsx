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
  openGraph: {
    title: "Kelas Struktur – Platform Kursus Engineering Terbaik",
    description: "Belajar teknik sipil & struktur bangunan secara online bersama para ahli.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <WhatsAppPopup 
            phoneNumber="6281234567890"
            message="Halo, saya tertarik dengan Kelas Struktur"
            companyName="Kelas Struktur"
            email="support@kelasstruktur.com"
            operatingHours="Senin - Jumat, 09:00 - 18:00 WIB"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}