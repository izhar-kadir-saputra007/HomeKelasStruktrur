"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Clock, Users, BookOpen, ChevronRight, Sparkles, Calendar, Lock } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

const classes = [
    {
        id: 1,
        title: "Desain Struktur Gedung",
        subtitle: "Perencanaan struktur gedung beton bertulang tahan gempa",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 24,
        duration: "12 Minggu",
        students: "3.2K", // string
        status: "active",
        featured: true,
        color: "from-emerald-500 to-primary-500",
    },
    {
        id: 2,
        title: "Analisis Beban Gempa",
        subtitle: "Pemodelan dan analisis beban gempa dengan SNI terbaru",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 18,
        duration: "8 Minggu",
        students: "2.1K", // string
        status: "active",
        featured: false,
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 3,
        title: "Struktur Baja Modern",
        subtitle: "Desain struktur baja untuk high-rise building",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 20,
        duration: "10 Minggu",
        students: "1.8K", // string
        status: "active",
        featured: false,
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 4,
        title: "Foundation Engineering",
        subtitle: "Perencanaan pondasi dalam dan dangkal",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 16,
        duration: "8 Minggu",
        students: 0, // number
        status: "coming-soon",
        featured: false,
        releaseDate: "Maret 2025",
        color: "from-orange-500 to-red-500",
    },
    {
        id: 5,
        title: "Bridge Structure Design",
        subtitle: "Perencanaan struktur jembatan modern",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 22,
        duration: "10 Minggu",
        students: 0, // number
        status: "coming-soon",
        featured: false,
        releaseDate: "April 2025",
        color: "from-teal-500 to-green-500",
    },
    {
        id: 6,
        title: "Structural Dynamics",
        subtitle: "Dinamika struktur untuk bangunan tingkat tinggi",
        image: "/images/courses/DesainStrukturGedung.webp",
        modules: 20,
        duration: "12 Minggu",
        students: 0, // number
        status: "coming-soon",
        featured: false,
        releaseDate: "Mei 2025",
        color: "from-indigo-500 to-purple-500",
    },
];

// Perbaiki containerVariants dengan tipe Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Perbaiki cardVariants dengan tipe Variants
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function FeaturedClasses() {
    return (
        <section
            id="kelas"
            className="snap-section relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-secondary) 100%)" }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 blueprint-bg opacity-30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
                {/* Header dengan animasi lebih menarik */}
                <AnimatedSection className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
                    >
                        <Sparkles size={16} className="text-primary-500" />
                        <span className="text-xs font-semibold text-primary-500 tracking-wider">KURIKULUM PREMIUM</span>
                    </motion.div>
                    
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary leading-tight tracking-tight mb-4">
                        Pilih{" "}
                        <span className="gradient-text">Jalur Belajar</span>
                        {" "}Kamu
                    </h2>
                    <p className="text-theme-secondary max-w-2xl mx-auto text-base leading-relaxed">
                        Pelajari langsung dari praktisi berpengalaman dengan kurikulum yang terstruktur
                    </p>
                </AnimatedSection>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {classes.map((cls, index) => {
                        const isComingSoon = cls.status === "coming-soon";
                        // Fungsi untuk mengecek apakah students adalah number dan > 0
                        const hasStudents = typeof cls.students === 'number' && cls.students > 0;
                        // Atau jika students adalah string, tampilkan saja
                        const showStudents = !isComingSoon && cls.students;
                        
                        return (
                            <motion.div
                                key={cls.id}
                                variants={cardVariants}
                                whileHover={!isComingSoon ? { y: -8, scale: 1.02 } : {}}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                                    isComingSoon ? "opacity-90" : ""
                                }`}
                            >
                                {/* Card Background with Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Image Container */}
                                <div className="relative h-48 lg:h-56 overflow-hidden">
                                    <Image
                                        src={cls.image}
                                        alt={cls.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    
                                    {/* Status Badge */}
                                    {isComingSoon ? (
                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-yellow-500/50">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-yellow-400" />
                                                <span className="text-xs font-semibold text-yellow-400">Coming {cls.releaseDate}</span>
                                            </div>
                                        </div>
                                    ) : cls.featured && (
                                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary-500">
                                            <div className="flex items-center gap-1.5">
                                                <Sparkles size={12} className="text-white" />
                                                <span className="text-xs font-bold text-white tracking-wide">PREMIUM</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Lock Icon for Coming Soon */}
                                    {isComingSoon && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="bg-black/60 backdrop-blur-md rounded-full p-4 border border-white/20">
                                                <Lock size={32} className="text-white/60" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Card Content */}
                                <div className="relative p-6 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] backdrop-blur-sm border border-[var(--border-card)]">
                                    {/* Title & Description */}
                                    <div className="mb-4">
                                        <h3 className="font-display font-bold text-xl text-theme-primary mb-2 line-clamp-1">
                                            {cls.title}
                                        </h3>
                                        <p className="text-theme-secondary text-sm leading-relaxed line-clamp-2">
                                            {cls.subtitle}
                                        </p>
                                    </div>
                                    
                                    {/* Stats */}
                                    <div className="flex items-center justify-between mb-4 pt-3 border-t border-[var(--border-subtle)]">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={14} className="text-primary-500" />
                                                <span className="text-xs text-theme-secondary">
                                                    {cls.modules} Modul
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-primary-500" />
                                                <span className="text-xs text-theme-secondary">
                                                    {cls.duration}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Perbaikan: tampilkan students jika ada dan bukan coming soon */}
                                        {!isComingSoon && cls.students && (
                                            <div className="flex items-center gap-1.5">
                                                <Users size={14} className="text-primary-500" />
                                                <span className="text-xs font-medium text-theme-primary">
                                                    {cls.students} siswa
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* CTA Button */}
                                    {isComingSoon ? (
                                        <button
                                            disabled
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gray-700/50 text-gray-400 cursor-not-allowed"
                                        >
                                            <Calendar size={16} />
                                            Segera Hadir
                                        </button>
                                    ) : (
                                        <button
                                            className="group/btn relative w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all overflow-hidden bg-primary-500/10 hover:bg-primary-500 border border-primary-500/30 hover:border-primary-500"
                                        >
                                            <span className="text-primary-500 group-hover/btn:text-white transition-colors">
                                                Lihat Detail Kelas
                                            </span>
                                            <ChevronRight 
                                                size={16} 
                                                className="text-primary-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" 
                                            />
                                        </button>
                                    )}
                                    
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${cls.color} rounded-2xl blur-2xl opacity-20`} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
                
                {/* CTA Bottom dengan animasi */}
                <AnimatedSection className="text-center mt-16" delay={0.3}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex flex-col items-center gap-4"
                    >
                        <p className="text-theme-muted text-sm">
                            Masih bingung mau mulai dari mana?
                        </p>
                        <button className="group flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-400 transition-colors">
                            Konsultasi dengan mentor kami
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}