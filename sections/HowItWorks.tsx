"use client";

import { motion } from "framer-motion";
import { UserPlus, LayoutGrid, Rocket, CalendarCheck } from "lucide-react";

const steps = [
    {
        num: "01",
        icon: UserPlus,
        title: "Daftar Akun",
        desc: "Buat akun gratis dalam hitungan detik. Tidak perlu kartu kredit untuk mulai menjelajahi platform.",
        accent: "#04A63D",
        accentBg: "rgba(4,166,61,0.10)",
        accentBorder: "rgba(4,166,61,0.22)",
        connectorFrom: "#04A63D",
        connectorTo: "#06B6D4",
    },
    {
        num: "02",
        icon: LayoutGrid,
        title: "Pilih Kelas",
        desc: "Temukan kelas yang sesuai dengan level dan tujuanmu. Dari analisis dasar hingga desain profesional.",
        accent: "#06B6D4",
        accentBg: "rgba(6,182,212,0.10)",
        accentBorder: "rgba(6,182,212,0.22)",
        connectorFrom: "#06B6D4",
        connectorTo: "#F59E0B",
    },
    {
        num: "03",
        icon: Rocket,
        title: "Mulai Belajar",
        desc: "Akses materi kapan saja, kerjakan latihan, dan dapatkan sertifikat setelah menyelesaikan kelas.",
        accent: "#F59E0B",
        accentBg: "rgba(245,158,11,0.10)",
        accentBorder: "rgba(245,158,11,0.22)",
        connectorFrom: "#F59E0B",
        connectorTo: "#8B5CF6",
    },
    {
        num: "04",
        icon: CalendarCheck,
        title: "Mentoring Setiap Hari",
        desc: "Dapatkan bimbingan langsung dari mentor berpengalaman setiap hari. Tanya jawab, diskusi kasus, dan solusi cepat untuk setiap kendala belajarmu.",
        accent: "#8B5CF6",
        accentBg: "rgba(139,92,246,0.10)",
        accentBorder: "rgba(139,92,246,0.22)",
        connectorFrom: "transparent",
        connectorTo: "transparent",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="cara-kerja"
            className="snap-section blueprint-bg relative overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse at 20% 50%, rgba(4,166,61,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="section-label mb-4">Cara Kerja</p>
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary tracking-tight leading-tight mb-4">
                        Mulai dalam{" "}
                        <span className="gradient-text">4 Langkah</span>
                    </h2>
                    <p className="text-theme-secondary max-w-md mx-auto text-base leading-relaxed">
                        Proses yang simpel dan terarah agar kamu langsung bisa fokus pada yang terpenting — belajar.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-0">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div key={i} className="flex-1 flex flex-col lg:flex-row items-start">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.65, delay: i * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                                    whileHover={{ y: -4 }}
                                    className="flex-1 relative group p-7 rounded-2xl cursor-default transition-all duration-300"
                                    style={{
                                        background: step.accentBg,
                                        border: `1px solid ${step.accentBorder}`,
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    {/* Step number + icon */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span
                                            className="font-mono font-bold text-4xl"
                                            style={{ color: step.accent, opacity: 0.35 }}
                                        >
                                            {step.num}
                                        </span>
                                        <div
                                            className="w-11 h-11 rounded-2xl flex items-center justify-center"
                                            style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}` }}
                                        >
                                            <Icon size={20} style={{ color: step.accent }} />
                                        </div>
                                    </div>

                                    <h3 className="font-display font-bold text-xl text-theme-primary mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-theme-secondary text-sm leading-relaxed">{step.desc}</p>

                                    {/* Progress dots */}
                                    <div className="flex items-center gap-2 mt-6">
                                        {steps.map((_, j) => (
                                            <div
                                                key={j}
                                                className="h-1.5 rounded-full transition-all"
                                                style={{
                                                    width: j <= i ? (j === i ? "24px" : "12px") : "12px",
                                                    background: j <= i ? step.accent : "var(--border-medium)",
                                                    opacity: j <= i ? 0.7 : 0.3,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Connector */}
                                {i < steps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        whileInView={{ opacity: 1, scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.18 + 0.4 }}
                                        className="hidden lg:flex items-center justify-center w-16 pt-12"
                                    >
                                        <div
                                            className="w-full h-px"
                                            style={{
                                                background: `linear-gradient(90deg, ${step.connectorFrom}, ${step.connectorTo})`,
                                            }}
                                        />
                                        <svg
                                            width="8"
                                            height="12"
                                            viewBox="0 0 8 12"
                                            fill="none"
                                            className="shrink-0 -ml-1"
                                        >
                                            <path
                                                d="M1 1L7 6L1 11"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-theme-muted"
                                            />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}