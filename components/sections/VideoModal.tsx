"use client";

import { motion } from "framer-motion";
import { X, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VideoModal({ video, onClose }: { video: any, onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300
                        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={handleClose}
            />
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative z-10 w-[90vw] max-w-5xl bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-2xl"
            >
                <div className="flex justify-between items-center p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={video.avatar} alt={video.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-semibold text-theme-primary">{video.name}</h3>
                                {video.verified && <BadgeCheck size={16} className="text-primary-400" />}
                            </div>
                            <p className="text-theme-muted text-sm">{video.role}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="relative aspect-video bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                        title={`Testimonial ${video.name}`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <div className="p-6 bg-[var(--bg-card)]">
                    <p className="text-theme-primary text-lg italic leading-relaxed">
                        "{video.testimonialText}"
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-theme-muted">
                        <span>📅 {video.date}</span>
                        <span>⏱️ Durasi: {video.duration}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}