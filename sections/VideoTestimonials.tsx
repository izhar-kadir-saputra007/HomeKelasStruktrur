"use client";

import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";

// Data video testimonial
const videoTestimonials = [
    {
        id: 1,
        name: "Ahmad Fauzi",
        role: "Mahasiswa Teknik Sipil - Universitas Gadjah Mada",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop",
        duration: "04:23",
        testimonialText: "Setelah mengikuti kelas di KelasStruktur, saya jadi lebih percaya diri mengerjakan tugas analisis struktur. Materinya sangat aplikatif!",
        verified: true,
        date: "2 minggu lalu"
    },
    {
        id: 2,
        name: "Siti Rahmawati",
        role: "Junior Structural Engineer - PT Wijaya Karya",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
        duration: "05:47",
        testimonialText: "Kelas ETABS-nya luar biasa! Langsung bisa saya aplikasikan di proyek kantor. Investasi yang sangat worth it untuk karir saya.",
        verified: true,
        date: "1 bulan lalu"
    },
    {
        id: 3,
        name: "Budi Santoso",
        role: "Fresh Graduate Teknik Sipil - ITB",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
        duration: "03:56",
        testimonialText: "Dari nol belajar SAP2000 sampai bisa modeling gedung sendiri. Mentornya sangat responsif dan supportif. Recommended banget!",
        verified: true,
        date: "3 minggu lalu"
    },
    {
        id: 4,
        name: "Dewi Lestari",
        role: "Mahasiswa S2 Struktur - UI",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
        duration: "04:15",
        testimonialText: "Materi analisis gempa sangat detail dan relevan dengan penelitian saya. Sangat membantu!",
        verified: true,
        date: "1 minggu lalu"
    },
    {
        id: 5,
        name: "Rizki Pratama",
        role: "Drafter Struktur",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
        duration: "05:30",
        testimonialText: "Upgrade skill dari drafter ke bisa analisis sendiri. Karier langsung naik level!",
        verified: true,
        date: "2 minggu lalu"
    },
    {
        id: 6,
        name: "Nur Hidayah",
        role: "Konsultan Struktur",
        thumbnail: "https://img.youtube.com/vi/tOwjEOt1zYU/hqdefault.jpg",
        thumbnailHigh: "https://img.youtube.com/vi/tOwjEOt1zYU/maxresdefault.jpg",
        videoId: "tOwjEOt1zYU",
        avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=80&h=80&fit=crop",
        duration: "06:12",
        testimonialText: "Penjelasannya detail, video berkualitas tinggi. Rekomendasi banget untuk rekan-rekan engineer.",
        verified: true,
        date: "1 bulan lalu"
    },
];

// Lazy load modal component
const VideoModalLazy = lazy(() => import('@/components/sections/VideoModal'));

// Component Card Video
const VideoCard = ({ video, onClick, priority = false }: { video: typeof videoTestimonials[0], onClick: () => void, priority?: boolean }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [useHighQuality, setUseHighQuality] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUseHighQuality(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const thumbnailUrl = useHighQuality && video.thumbnailHigh ? video.thumbnailHigh : video.thumbnail;

    return (
        <motion.div 
            className="relative w-[320px] md:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden 
                       bg-theme-card border border-theme-card
                       hover:border-primary-500/50 transition-all duration-300 cursor-pointer
                       shadow-lg hover:shadow-[var(--shadow-glow)]"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
        >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {!imgLoaded && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                )}
                
                <Image 
                    src={thumbnailUrl}
                    alt={video.name}
                    fill
                    priority={priority}
                    loading={priority ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 320px, 380px"
                    className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                />
                
                {/* Overlay gradien */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge Verified */}
                {video.verified && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-10">
                        <BadgeCheck size={14} className="text-primary-400" />
                        <span className="text-white text-xs">Verified</span>
                    </div>
                )}

                {/* Tombol Play */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-75" />
                        <div className="relative w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-0.5" />
                        </div>
                    </div>
                </div>

                {/* Durasi video */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-mono z-10">
                    {video.duration}
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-500/30 flex-shrink-0">
                        <Image 
                            src={video.avatar} 
                            alt={video.name} 
                            fill 
                            className="object-cover" 
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-theme-primary font-semibold text-sm truncate">{video.name}</p>
                            {video.verified && (
                                <BadgeCheck size={14} className="text-primary-400 flex-shrink-0" />
                            )}
                        </div>
                        <p className="text-theme-muted text-xs truncate">{video.role}</p>
                    </div>
                </div>
                <p className="text-theme-secondary text-sm line-clamp-2 leading-relaxed">
                    "{video.testimonialText}"
                </p>
                <p className="text-theme-muted text-[11px] mt-2">{video.date}</p>
            </div>
        </motion.div>
    );
};

// Main Component
export default function VideoTestimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(true);
    const [isModalReady, setIsModalReady] = useState(false);

    const checkScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftShadow(scrollLeft > 0);
            setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => container.removeEventListener('scroll', checkScroll);
        }
    }, [checkScroll]);

    const handleVideoClick = (video: typeof videoTestimonials[0]) => {
        setSelectedVideo(video);
        setIsModalReady(true);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative w-full py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header - Centered */}
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="section-label mb-3">Video Testimoni</p>
                        <h2 className="font-display font-bold text-[clamp(1.75rem,5vw,3rem)] text-theme-primary tracking-tight leading-tight mb-4">
                            Lihat Langsung{' '}
                            <span className="gradient-text">Pengalaman</span>{' '}
                            Mereka
                        </h2>
                        <p className="text-theme-muted text-base max-w-2xl mx-auto">
                            Klik card untuk menonton video testimoni dari alumni kami yang sudah merasakan manfaat belajar di KelasStruktur
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Controls */}
                <div className="flex justify-end gap-2 mb-4">
                    <button 
                        onClick={() => scroll('left')}
                        className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm
                            ${showLeftShadow 
                                ? 'bg-theme-card border border-theme-card hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400' 
                                : 'opacity-40 cursor-not-allowed bg-theme-card/50'
                            }`}
                        disabled={!showLeftShadow}
                        aria-label="Scroll kiri"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm
                            ${showRightShadow 
                                ? 'bg-theme-card border border-theme-card hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400' 
                                : 'opacity-40 cursor-not-allowed bg-theme-card/50'
                            }`}
                        disabled={!showRightShadow}
                        aria-label="Scroll kanan"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Horizontal Scroll Container - No Scrollbar */}
                <div className="relative">
                    {/* Left gradient shadow */}
                    {showLeftShadow && (
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none hidden md:block" />
                    )}
                    
                    {/* Right gradient shadow */}
                    {showRightShadow && (
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none hidden md:block" />
                    )}

                    <div 
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-5 pb-4 scroll-smooth snap-x snap-mandatory
                                   [&::-webkit-scrollbar]:hidden"
                        style={{ 
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {videoTestimonials.map((video, index) => (
                            <div key={video.id} className="snap-start">
                                <VideoCard 
                                    video={video} 
                                    onClick={() => handleVideoClick(video)}
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info jumlah video */}
                <div className="text-center mt-6">
                    <p className="text-theme-muted text-sm">
                        Geser ke kanan untuk lihat video lainnya • {videoTestimonials.length}+ Video Testimoni
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isModalReady && selectedVideo && (
                <Suspense fallback={null}>
                    <VideoModalLazy video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                </Suspense>
            )}
        </div>
    );
}