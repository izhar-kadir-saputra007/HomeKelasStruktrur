// app/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CurvedLoop from "@/components/reactbits/CurvedLoop";

export default function CallToAction() {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* CurvedLoop di luar section - terpisah */}
      
<div className="w-full bg-theme-base pt-48">
    <CurvedLoop 
        marqueeText="Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦"
        speed={2}
        curveAmount={-10}
        direction="left"
        interactive={true}
        className="text-emerald-500 text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider"
    />
</div>

            <section
                id="cta"
                className="snap-section relative overflow-hidden bg-theme-base"
                style={{ minHeight: "100vh" }}
            >
                {/* Center radial glow - menggunakan CSS variable untuk warna yang sesuai tema */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at 50% 50%, rgba(4,166,61,var(--glow-opacity, 0.12)) 0%, transparent 65%)",
                    }}
                />

                {/* Blueprint grid - sudah support theme dari global.css */}
                <div className="absolute inset-0 blueprint-bg opacity-30 pointer-events-none" />

                {/* Animated rings - menggunakan border dengan CSS variable */}
                {[280, 420, 560, 700].map((size, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.04, 0.02, 0.04], scale: [1, 1.03, 1] }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-500/20 pointer-events-none"
                        style={{ width: size, height: size }}
                    />
                ))}

                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center py-20">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary-500/20 bg-primary-500/5"
                    >
                        <Sparkles size={14} className="text-primary-400" />
                        <span className="text-xs font-medium text-primary-400 tracking-widest uppercase">
                            Bergabung Sekarang
                        </span>
                    </motion.div>

                    {/* Main headline - text menggunakan text-theme-primary */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="font-display font-bold text-[clamp(2.2rem,6vw,4.5rem)] text-theme-primary leading-[1.1] tracking-tight mb-6"
                    >
                        Siap Jadi Engineer
                        <br />
                        <span className="gradient-text">Profesional?</span>
                    </motion.h2>

                    {/* Subtext - menggunakan text-theme-secondary */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-theme-secondary text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed max-w-2xl mb-12 font-light"
                    >
                        Bergabunglah dengan lebih dari{" "}
                        <span className="text-primary-400 font-semibold">4.000+ engineer</span> yang sudah
                        meningkatkan keahlian mereka bersama Kelas Struktur. Daftar gratis, mulai belajar hari
                        ini.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <motion.button
                            onClick={() => handleScroll("#kelas")}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg tracking-wide shadow-[0_0_40px_rgba(4,166,61,0.4)] hover:shadow-[0_0_70px_rgba(4,166,61,0.6)] transition-all overflow-hidden"
                        >
                            <span className="relative z-10">Mulai Belajar Gratis</span>
                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>

                        <motion.button
                            onClick={() => handleScroll("#kelas")}
                            whileHover={{ scale: 1.02 }}
                            className="px-8 py-5 rounded-2xl border border-theme-border text-theme-secondary hover:text-theme-primary hover:border-primary-500/30 font-medium text-base tracking-wide transition-all"
                        >
                            Lihat Semua Kelas
                        </motion.button>
                    </motion.div>

                    {/* Trust badges - menggunakan text-theme-muted dan border-theme-subtle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-theme-subtle"
                    >
                        {["Daftar Gratis", "Tanpa Kartu Kredit", "Akses Seumur Hidup", "Sertifikat Resmi"].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-theme-muted text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                {badge}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}