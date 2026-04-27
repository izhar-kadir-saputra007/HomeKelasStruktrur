"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    { id: 1, label: "Beranda", href: "/", section: "hero", isHash: false },
    { id: 2, label: "Kelas", href: "/#kelas", section: "kelas", isHash: true },
    { id: 3, label: "Keunggulan", href: "/#keunggulan", section: "keunggulan", isHash: true },
    { id: 4, label: "Cara Kerja", href: "/#cara-kerja", section: "cara-kerja", isHash: true },
    { id: 5, label: "Testimoni", href: "/#testimoni", section: "testimoni", isHash: true },
    { id: 6, label: "Kontak", href: "/contact", section: null, isHash: false },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const pathname = usePathname();
    const router = useRouter();
    
    const isHomePage = pathname === "/";
    const isContactPage = pathname === "/contact";

    // Handle scroll effect untuk navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection observer untuk mendeteksi section aktif di homepage
    useEffect(() => {
        if (!isHomePage) return;
        
        const sectionIds = ["hero", "kelas", "keunggulan", "cara-kerja", "testimoni"];
            
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
        );
        
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        
        return () => observer.disconnect();
    }, [isHomePage]);

    // Handle navigasi klik
    const handleNavClick = (href: string, section?: string | null, isHash?: boolean) => {
        setMenuOpen(false);
        
        // Untuk halaman biasa (seperti /contact)
        if (!isHash) {
            router.push(href);
            return;
        }
        
        // Untuk hash link (/#kelas, dll)
        if (isHomePage && section) {
            // Sudah di homepage, langsung scroll
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState({}, "", href);
                setActiveSection(section);
            }
        } else if (section) {
            // Di halaman lain, arahkan ke homepage dengan hash
            router.push(href);
        }
    };

    // Cek apakah link aktif
    const isLinkActive = (href: string, section?: string | null, isHash?: boolean) => {
        // Untuk halaman Kontak
        if (href === "/contact") {
            return isContactPage;
        }
        
        // Untuk homepage (tanpa hash)
        if (href === "/" && !isHash) {
            return isHomePage && activeSection === "hero";
        }
        
        // Untuk hash link (/#kelas, dll) di homepage
        if (isHash && isHomePage && section) {
            return activeSection === section;
        }
        
        return false;
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.9 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
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
                        <button
                            onClick={() => handleNavClick("/#hero", "hero", true)}
                            className="flex items-center gap-3 group cursor-pointer"
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
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = isLinkActive(link.href, link.section, link.isHash);
                                
                                // Untuk hash link (Kelas, Keunggulan, dll) - gunakan button
                                if (link.isHash) {
                                    return (
                                        <button
                                            key={link.id}
                                            onClick={() => handleNavClick(link.href, link.section, link.isHash)}
                                            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                                                isActive
                                                    ? "text-primary-500"
                                                    : "text-theme-secondary hover:text-theme-primary"
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="nav-indicator"
                                                    className="absolute inset-0 bg-primary-500/10 rounded-lg"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{link.label}</span>
                                        </button>
                                    );
                                }
                                
                                // Untuk halaman biasa (Beranda, Kontak) - gunakan Link dari Next.js
                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                                            isActive
                                                ? "text-primary-500"
                                                : "text-theme-secondary hover:text-theme-primary"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 bg-primary-500/10 rounded-lg"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right: Theme toggle + CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <ThemeToggle />
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleNavClick("/#kelas", "kelas", true)}
                                className="btn-primary text-sm py-2.5 px-5 relative z-10 cursor-pointer"
                            >
                                Mulai Belajar
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-primary-500/40 transition-colors cursor-pointer"
                            >
                                {menuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
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
                            {navLinks.map((link, i) => {
                                const isActive = isLinkActive(link.href, link.section, link.isHash);
                                
                                return (
                                    <motion.button
                                        key={link.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => handleNavClick(link.href, link.section, link.isHash)}
                                        className={`text-left px-4 py-3 text-sm font-medium transition-all rounded-xl cursor-pointer ${
                                            isActive
                                                ? "text-primary-500 bg-primary-500/10"
                                                : "text-theme-secondary hover:text-primary-500 hover:bg-primary-500/5"
                                        }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <span className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-primary-500" />
                                        )}
                                    </motion.button>
                                );
                            })}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                onClick={() => handleNavClick("/#kelas", "kelas", true)}
                                className="mt-2 btn-primary text-sm relative z-10 text-center cursor-pointer"
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