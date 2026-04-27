// app/articles/page.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Construction, Sparkles } from "lucide-react";
import Link from "next/link";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";


export default function ArticlesPage() {
    return (
        <>
        <Preloader />
        <Navbar />
        <main className="min-h-screen bg-theme-base pt-32 pb-20">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 blueprint-bg opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                        <BookOpen size={16} className="text-primary-500" />
                        <span className="text-xs font-semibold text-primary-500 tracking-wider uppercase">
                            Artikel & Tutorial
                        </span>
                    </div>
                    <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-theme-primary leading-tight tracking-tight mb-4">
                        Blog <span className="gradient-text">Kelas Struktur</span>
                    </h1>
                    <p className="text-theme-secondary max-w-2xl mx-auto text-base leading-relaxed">
                        Tutorial, tips & trik seputar teknik sipil dan struktur bangunan dari para ahli
                    </p>
                </motion.div>

                {/* Coming Soon Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    {/* Card Coming Soon */}
                    <div className="relative bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] backdrop-blur-sm border border-[var(--border-card)] rounded-3xl overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />

                        <div className="relative p-8 md:p-12 text-center">
                            {/* Animated construction icon */}
                            <motion.div
                                animate={{ 
                                    rotate: [0, -5, 5, -5, 0],
                                    y: [0, -5, 0, -5, 0]
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
                            >
                                <Construction size={48} className="text-primary-500" />
                            </motion.div>

                            {/* Title */}
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-theme-primary mb-4">
                                Coming Soon!
                            </h2>

                            {/* Description */}
                            <p className="text-theme-secondary text-base leading-relaxed mb-6">
                                Halaman artikel sedang dalam proses pengembangan. 
                                Kami akan segera menghadirkan berbagai artikel menarik 
                                tentang teknik sipil, struktur bangunan, dan tips engineering.
                            </p>

                            {/* Progress bar */}
                            <div className="max-w-md mx-auto mb-8">
                                <div className="flex justify-between text-sm text-theme-muted mb-2">
                                    <span>Progress Development</span>
                                    <span className="text-primary-500">75%</span>
                                </div>
                                <div className="h-2 bg-theme-muted/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "75%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                                    />
                                </div>
                            </div>

                            {/* Features list */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                                {[
                                    { icon: BookOpen, text: "Tutorial lengkap" },
                                    { icon: Calendar, text: "Update mingguan" },
                                    { icon: Sparkles, text: "Tips dari expert" },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="flex items-center gap-2 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10"
                                    >
                                        <item.icon size={16} className="text-primary-500" />
                                        <span className="text-sm text-theme-secondary">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Notify button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open("https://wa.me/6285343602030", "_blank")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all"
                            >
                                <span>Beritahu saya saat rilis</span>
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-theme-muted hover:text-primary-500 transition-colors text-sm"
                        >
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </motion.div>

                {/* Preview Cards (Coming Soon) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="text-center mb-8">
                        <p className="text-theme-muted text-sm uppercase tracking-wider">Akan segera hadir</p>
                        <h3 className="font-display font-bold text-2xl text-theme-primary mt-2">
                            Preview Artikel Mendatang
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Cara Menghitung Struktur Gedung 2 Lantai",
                                category: "Tutorial",
                                readTime: "10 menit",
                            },
                            {
                                title: "Tips Memilih Material Bangunan Berkualitas",
                                category: "Tips",
                                readTime: "7 menit",
                            },
                            {
                                title: "Software Terbaik untuk Analisis Struktur",
                                category: "Review",
                                readTime: "12 menit",
                            },
                        ].map((article, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 opacity-60 hover:opacity-100 transition-all"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-500">
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-theme-muted text-xs">
                                        <Clock size={12} />
                                        {article.readTime}
                                    </div>
                                </div>
                                <h4 className="font-semibold text-theme-primary mb-2 line-clamp-2">
                                    {article.title}
                                </h4>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 
                                    group-hover:h-2 transition-all" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
        </>
    );
}