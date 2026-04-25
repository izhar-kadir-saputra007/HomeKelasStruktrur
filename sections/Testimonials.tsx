"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Ahmad Fauzi",
        role: "Mahasiswa Teknik Sipil",
        text: "Materinya sangat terstruktur dan mudah dipahami. Sekarang saya lebih percaya diri mengerjakan tugas analisis struktur.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Siti Rahmawati",
        role: "Junior Structural Engineer",
        text: "Kelas ETABS-nya luar biasa! Langsung bisa diaplikasikan di proyek kantor. Worth it banget investasinya.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Budi Santoso",
        role: "Fresh Graduate Teknik Sipil",
        text: "Dari nol belajar SAP2000 sampai bisa modeling gedung sendiri. Mentornya responsif dan supportif.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Dewi Lestari",
        role: "Mahasiswa S2 Struktur",
        text: "Materi gempa dan struktur tahan gempa-nya sangat relevan dengan penelitian saya. Penjelasannya detail dan praktis.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Rizki Pratama",
        role: "Drafter Struktur",
        text: "Upgrade skill dari drafter ke bisa analisis sendiri. Karier langsung naik level berkat KelasStruktur!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Nur Hidayah",
        role: "Konsultan Struktur",
        text: "Bagus bgt, penjelasannya detail, video berkualitas tinggi. Rekomendasi banget untuk rekan-rekan engineer.",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Muhammad Ikhsan",
        role: "Site Engineer",
        text: "Praktis dan langsung aplikatif. Sekarang lebih paham perhitungan struktur di lapangan.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Anisa Putri",
        role: "Mahasiswa Arsitektur",
        text: "Membantu banget buat tugas akhir. Penjelasan struktur jadi lebih mudah dipahami.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
    {
        name: "Hendra Wijaya",
        role: "Project Manager",
        text: "Tim saya jadi lebih kompeten setelah mengikuti pelatihan di sini. Highly recommended!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        rating: 5,
    },
];

// Fungsi untuk membagi array menjadi beberapa bagian
const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, color }: { testimonial: typeof testimonials[0], color: string }) => (
    <div className="w-[380px] mx-3 rounded-2xl p-6 transition-all duration-300 hover:y-[-6px] group"
        style={{
            background: "var(--bg-card)",
            backdropFilter: "blur(16px)",
            border: "1px solid var(--border-card)",
            boxShadow: "var(--shadow-card)",
        }}
    >
        {/* Quote icon */}
        <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
            <Quote size={32} className="text-primary-400" />
        </div>

        {/* Stars Rating */}
        <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, j) => (
                <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
            ))}
        </div>

        {/* Text */}
        <p className="text-theme-secondary text-sm leading-relaxed mb-6 italic line-clamp-4">
            &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1">
                <p className="text-theme-primary font-semibold text-sm">{testimonial.name}</p>
                <p className="text-theme-muted text-xs mt-0.5">{testimonial.role}</p>
            </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

export default function Testimonials() {
    // Duplikasi testimonials untuk efek infinite yang lebih smooth
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    
    // Bagi menjadi 3 baris
    const rows = chunkArray(duplicatedTestimonials, Math.ceil(duplicatedTestimonials.length / 3));

    const gradientColors = [
        "from-primary-500 to-emerald-600",
        "from-cyan-500 to-blue-600",
        "from-purple-500 to-indigo-600",
    ];

    return (
        <section
            id="testimoni"
            className="snap-section relative overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            {/* Background dengan gaya dari komponen pertama */}
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, #0E1319 0%, #0B0F14 100%)" }}
            />
            
            {/* Blueprint grid overlay */}
            <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />
            
            {/* Glow effects */}
            <div
                className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-10"
                style={{ background: "radial-gradient(ellipse at right top, #04A63D 0%, transparent 70%)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none opacity-5"
                style={{ background: "radial-gradient(ellipse at left bottom, #04A63D 0%, transparent 70%)" }}
            />

            <div className="relative z-10 container mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
                {/* Header dengan animasi */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-4">Testimoni</p>
                    <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary tracking-tight leading-tight mb-4">
                        Kata Mereka yang{" "}
                        <span className="gradient-text">Sudah Belajar</span>
                    </h2>
                    <p className="text-theme-muted max-w-2xl mx-auto text-base leading-relaxed">
                        Tidak perlu ragu, lihat apa yang mereka rasakan ketika bergabung dengan KelasStruktur.
                    </p>
                </motion.div>

                {/* Container untuk infinite moving cards */}
                <div className="relative flex flex-col gap-6 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    
                    {/* Baris 1 - Bergerak ke Kiri */}
                    <div className="relative flex overflow-hidden group">
                        <div className="flex animate-infinite-scroll-left">
                            {rows[0]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row1-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                        <div className="flex animate-infinite-scroll-left" aria-hidden="true">
                            {rows[0]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row1-duplicate-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Baris 2 - Bergerak ke Kanan (lebih lambat) */}
                    <div className="relative flex overflow-hidden group">
                        <div className="flex animate-infinite-scroll-right">
                            {rows[1]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row2-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                        <div className="flex animate-infinite-scroll-right" aria-hidden="true">
                            {rows[1]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row2-duplicate-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Baris 3 - Bergerak ke Kiri (lebih cepat) */}
                    <div className="relative flex overflow-hidden group">
                        <div className="flex animate-infinite-scroll-left-fast">
                            {rows[2]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row3-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                        <div className="flex animate-infinite-scroll-left-fast" aria-hidden="true">
                            {rows[2]?.map((testimonial, index) => (
                                <TestimonialCard 
                                    key={`row3-duplicate-${index}`} 
                                    testimonial={testimonial} 
                                    color={gradientColors[index % 3]}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-theme-muted text-xs tracking-widest uppercase">
                        {testimonials.length}+ Alumni Telah Merasakan Manfaatnya
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                
                @keyframes scroll-left-fast {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-infinite-scroll-left {
                    animation: scroll-left 35s linear infinite;
                }
                
                .animate-infinite-scroll-right {
                    animation: scroll-right 45s linear infinite;
                }
                
                .animate-infinite-scroll-left-fast {
                    animation: scroll-left 25s linear infinite;
                }
                
                .group:hover .animate-infinite-scroll-left,
                .group:hover .animate-infinite-scroll-right,
                .group:hover .animate-infinite-scroll-left-fast {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}