"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-theme-base"
                >
                    {/* Blueprint grid background */}
                    <div className="absolute inset-0 blueprint-bg opacity-40" />

                    {/* Radial glow - versi sederhana dengan warna solid */}
                    <div className="absolute inset-0 pointer-events-none opacity-15 bg-gradient-radial from-primary-500/30 via-transparent to-transparent" />

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Logo mark */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center gap-3"
                        >
                            {/* Logo icon */}
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-[0_0_40px_rgba(4,166,61,0.4)]">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path
                                            d="M4 24L28 24M4 16H22M4 8H16"
                                            stroke="white"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M24 4L28 8L24 12"
                                            stroke="white"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="absolute inset-0 rounded-2xl border-2 border-primary-500 animate-ping opacity-40" />
                            </div>

                            {/* Brand name */}
                            <div className="text-center">
                                <p className="font-display text-2xl font-bold tracking-tight text-theme-primary">
                                    Kelas{" "}
                                    <span className="gradient-text">Struktur</span>
                                </p>
                                <p className="text-xs text-theme-muted tracking-[0.25em] mt-1 font-mono uppercase">
                                    Engineering Platform
                                </p>
                            </div>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="w-64 flex flex-col gap-2"
                        >
                            <div className="h-[2px] w-full bg-theme-muted/30 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-primary-500 via-cyan-400 to-primary-400 rounded-full"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-theme-muted tracking-widest font-mono uppercase">Loading</span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-[10px] text-primary-400 font-mono"
                                >
                                    100%
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}