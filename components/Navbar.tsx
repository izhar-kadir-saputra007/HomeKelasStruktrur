"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Kelas", href: "#kelas" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Testimoni", href: "#testimoni" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection observer for active section
    useEffect(() => {
        const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.4 }
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.9 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-theme-base/80 backdrop-blur-xl border-theme-subtle shadow-lg"
                    : "bg-transparent"
                    }`}
                style={{
                    borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <motion.button
                            onClick={() => handleNavClick("#hero")}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-[0_0_20px_rgba(4,166,61,0.3)] group-hover:shadow-[0_0_30px_rgba(4,166,61,0.5)] transition-shadow">
                                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 24L28 24M4 16H22M4 8H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M24 4L28 8L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-lg tracking-tight text-theme-primary">
                                Kelas <span className="text-primary-500">Struktur</span>
                            </span>
                        </motion.button>

                        {/* Desktop nav links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive
                                            ? "text-primary-500"
                                            : "text-theme-secondary hover:text-theme-primary"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 bg-primary-500/10 rounded-lg"
                                            />
                                        )}
                                        <span className="relative z-10">{link.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right: Theme toggle + CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <ThemeToggle />
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleNavClick("#kelas")}
                                className="btn-primary text-sm py-2.5 px-5 relative z-10"
                            >
                                Mulai Belajar
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-primary-500/40 transition-colors"
                            >
                                {menuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-theme-base/95 backdrop-blur-xl border-b border-theme-subtle lg:hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left px-4 py-3 text-sm font-medium text-theme-secondary hover:text-primary-500 hover:bg-primary-500/5 rounded-xl transition-all"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                onClick={() => handleNavClick("#kelas")}
                                className="mt-2 btn-primary text-sm relative z-10"
                            >
                                Mulai Belajar
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}