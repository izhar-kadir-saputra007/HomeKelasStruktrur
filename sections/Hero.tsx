"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import CircularText from "@/components/reactbits/CircularText";
import { useCountUp } from "@/hooks/useCountUp";

const floatingElements = [
  { x: "5%", y: "20%", size: 60, delay: 0 },
  { x: "90%", y: "15%", size: 90, delay: 0.5 },
  { x: "85%", y: "70%", size: 50, delay: 1 },
  { x: "10%", y: "75%", size: 70, delay: 0.8 },
  { x: "45%", y: "85%", size: 40, delay: 0.3 },
];

// Component untuk stat dengan count up yang selesai bersamaan
const StatItem = ({
  value,
  label,
  suffix = "",
  duration = 3000, // Semua pakai duration yang sama
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) => {
  const { count } = useCountUp({
    end: value,
    duration: duration,
    suffix: suffix,
    delay: delay,
  });

  return (
    <div className="flex flex-col items-center lg:items-start">
      <span className="font-display font-bold text-2xl text-theme-primary tracking-tight">
        {count}
      </span>
      <span className="text-xs text-theme-muted mt-1 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="snap-section blueprint-bg relative overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #04A63D 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
          className="absolute pointer-events-none"
          style={{ left: el.x, top: el.y, opacity: 0.06 }}
        >
          <div
            className="border-2 border-primary-500 rounded"
            style={{ width: el.size, height: el.size }}
          />
        </motion.div>
      ))}

      {/* Corners */}
      <div className="absolute top-24 left-8 w-20 h-20 border-l-2 border-t-2 border-primary-500/20 pointer-events-none" />
      <div className="absolute top-24 right-8 w-20 h-20 border-r-2 border-t-2 border-primary-500/20 pointer-events-none" />
      <div className="absolute bottom-12 left-8 w-20 h-20 border-l-2 border-b-2 border-primary-500/20 pointer-events-none" />
      <div className="absolute bottom-12 right-8 w-20 h-20 border-r-2 border-b-2 border-primary-500/20 pointer-events-none" />

      {/* Main Content Container - 2 Columns */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 max-w-7xl mx-auto gap-12 lg:gap-20">
        {/* LEFT COLUMN - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full backdrop-blur-sm lg:inline-flex"
            style={{
              border: "1px solid rgba(4,166,61,0.25)",
              background: "rgba(4,166,61,0.08)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-medium text-primary-500 tracking-widest uppercase">
              Platform Engineering
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mb-6"
          >
            <h1 className="font-display font-bold leading-[2.08] tracking-tight text-theme-primary">
              <span className="block text-3xl md:text-5xl lg:text-7xl">
                Siap Menjadi{" "}
               
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl">
               Seorang Engineer di <br />{" "}
                <span className="gradient-text">KELAS STRUKTUR</span>
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.25 }}
            className="max-w-2xl lg:max-w-full text-[clamp(0.9rem,2.5vw,1.125rem)] text-theme-secondary leading-relaxed mb-10 font-light tracking-wide"
          >
            Jembatan buat{" "}
            <span className="text-theme-primary font-medium">anak sipil</span>{" "}
            yang mau{" "}
            <span className="text-theme-primary font-medium italic">
              Level Up{" "}
            </span>
            di bidang{" "}
            <span className="text-theme-primary font-medium">
              Struktur & Manajemen Kontruksi
            </span>
            . Langsung sikat ilmu dari proyek lapangan bareng para praktisi berpengalaman
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4 }}
            className="flex flex-col sm:flex-row items-center lg:justify-start gap-4"
          >
            <motion.button
              onClick={() => handleScroll("#kelas")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base tracking-wide overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #04A63D, #038530)",
                boxShadow: "0 0 30px rgba(4,166,61,0.35)",
              }}
            >
              <span className="relative z-10">Mulai Belajar</span>
              <ArrowRight
                size={18}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>

            <motion.button
              onClick={() => handleScroll("#cara-kerja")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-medium text-base tracking-wide transition-all backdrop-blur-sm text-theme-secondary hover:text-theme-primary"
              style={{ border: "1px solid var(--border-medium)" }}
            >
              <PlayCircle size={20} className="text-primary-500" />
              Lihat Cara Kerja
            </motion.button>
          </motion.div>

          {/* Stats dengan Count Up - SEMUA SELESAI BERSAMAAN di 3 detik */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.55 }}
            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-16 pt-8"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {/* 
                          Semua stat menggunakan duration yang sama (3000ms)
                          dan mulai di waktu yang berbeda agar selesai bersamaan
                          
                          Rumus delay = (target waktu selesai) - duration
                          Target selesai: 3000ms setelah animasi parent mulai
                        */}
            <StatItem
              value={4000}
              label="Pelajar Aktif"
              suffix="+"
              duration={3000} // Animasi 3 detik
              delay={0} // Mulai sekarang, selesai di 3000ms
            />
            <StatItem 
                            value={500} 
                            label="Modul Kelas" 
                            suffix="+" 
                            duration={3000}   // Animasi 3 detik
                            delay={0}         // Mulai sekarang, selesai di 3000ms
                        />
            <StatItem
              value={100}
              label="Pertanyaan di Jawab"
              suffix="%"
              duration={3000} // Animasi 3 detik
              delay={0} // Mulai sekarang, selesai di 3000ms
            />
            <StatItem
              value={7}
              label="Kelas AKtif"
              suffix=""
              duration={3000} // Animasi 3 detik
              delay={0} // Mulai sekarang, selesai di 3000ms
            />
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - Hero Image dengan Circular Text di Belakang */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Circular Text di Belakang Gambar */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <CircularText
                text="KELAS STRUKTUR • "
                spinDuration={15}
                onHover="speedUp"
                className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] [&_span]:text-primary-400"
              />
            </div>

            {/* Multiple shadow layers for PNG image */}

            {/* Outer glow shadow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-transparent rounded-full blur-2xl" />

            {/* Decorative ring behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl -z-20" />

            {/* Main Image Container - No border for transparent PNG */}
            <div className="relative drop-shadow-2xl">
              {/* Custom shadow that follows the image shape using drop-shadow */}
              <div className="relative filter drop-shadow-[0_20px_35px_rgba(4,166,61,0.25)]">
                <Image
                  src="/images/hero.png"
                  alt="Hero - Belajar Struktur Bangunan"
                  width={600}
                  height={700}
                  className="w-full h-auto object-contain relative z-10"
                  priority
                  style={{
                    filter: "drop-shadow(0px 10px 30px rgba(0,0,0,0.15))",
                  }}
                />
              </div>

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-3xl" />
            </div>

            {/* Floating glow effect behind PNG */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -z-20" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -z-20" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-theme-muted tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid var(--border-medium)" }}
        >
          <div className="w-1 h-2 rounded-full bg-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
