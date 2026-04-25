"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, Users } from "lucide-react";

const advantages = [
    {
        icon: Users,
        title: "Instruktur Berpengalaman",
        desc: "Belajar langsung dari praktisi aktif industri teknik sipil dengan pengalaman 10+ tahun proyek nyata.",
        iconBg: "rgba(4,166,61,0.12)",
        iconColor: "#04A63D",
        borderHover: "rgba(4,166,61,0.3)",
        glowColor: "rgba(4,166,61,0.15)",
    },
    {
        icon: Clock,
        title: "Belajar Kapan Saja",
        desc: "Akses materi 24/7, pelajari di kecepatan sendiri. Video HD, modul interaktif, dan latihan soal tersedia selamanya.",
        iconBg: "rgba(6,182,212,0.12)",
        iconColor: "#06B6D4",
        borderHover: "rgba(6,182,212,0.3)",
        glowColor: "rgba(6,182,212,0.12)",
    },
    {
        icon: Zap,
        title: "Kurikulum Terstruktur",
        desc: "Dari nol hingga mahir secara sistematis. Setiap modul dirancang untuk membangun pemahaman secara bertahap.",
        iconBg: "rgba(245,158,11,0.12)",
        iconColor: "#F59E0B",
        borderHover: "rgba(245,158,11,0.3)",
        glowColor: "rgba(245,158,11,0.12)",
    },
    {
        icon: Shield,
        title: "Metode Perhitungan Struktur",
        desc: "Kuasai perhitungan manual dan komputasi untuk analisis struktur yang akurat.",
        iconBg: "rgba(168,85,247,0.12)",
        iconColor: "#A855F7",
        borderHover: "rgba(168,85,247,0.3)",
        glowColor: "rgba(168,85,247,0.12)",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function Advantages() {
    return (
        <section
            id="keunggulan"
            className="snap-section relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-base) 100%)" }}
        >
            {/* Accent glow */}
            <div
                className="absolute top-1/2 left-0 -translate-y-1/2 w-1/2 h-1/2 pointer-events-none opacity-10"
                style={{ background: "radial-gradient(ellipse at left, #04A63D 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-4">Mengapa Kami</p>
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary tracking-tight leading-tight mb-4">
                        Keunggulan{" "}
                        <span className="gradient-text">Kelas Struktur</span>
                    </h2>
                    <p className="text-theme-secondary max-w-lg mx-auto text-base leading-relaxed">
                        Kami hadir untuk memastikan perjalanan belajarmu efektif, menyenangkan, dan relevan dengan kebutuhan industri.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
                >
                    {advantages.map((adv, i) => {
                        const Icon = adv.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.025,
                                    y: -4,
                                    boxShadow: `0 0 40px ${adv.glowColor}`,
                                }}
                                className="relative group rounded-2xl p-7 cursor-default transition-all duration-300"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-card)",
                                    boxShadow: "var(--shadow-card)",
                                    backdropFilter: "blur(16px)",
                                }}
                            >
                                {/* Corner decorative */}
                                <div
                                    className="absolute top-4 right-4 w-10 h-10 border-t border-r pointer-events-none rounded-tr-xl"
                                    style={{ borderColor: "var(--border-subtle)" }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                                    style={{ background: adv.iconBg }}
                                >
                                    <Icon size={22} style={{ color: adv.iconColor }} />
                                </div>

                                <h3 className="font-display font-bold text-lg text-theme-primary mb-2 leading-snug">
                                    {adv.title}
                                </h3>
                                <p className="text-theme-secondary text-sm leading-relaxed">{adv.desc}</p>

                                {/* Bottom line */}
                                <div
                                    className="absolute bottom-0 left-6 right-6 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${adv.iconBg}, transparent)` }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
