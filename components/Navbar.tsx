"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
    { id: 1, label: "Beranda", href: "/", section: "hero", isHash: false, isExternal: false },
    { id: 2, label: "Kelas", href: "https://kelasstruktur.com/kelas/", section: null, isHash: false, isExternal: true },
    { id: 3, label: "Keunggulan", href: "/#keunggulan", section: "keunggulan", isHash: true, isExternal: false },
    { id: 4, label: "Cara Kerja", href: "/#cara-kerja", section: "cara-kerja", isHash: true, isExternal: false },
    { id: 5, label: "Testimoni", href: "/#testimoni", section: "testimoni", isHash: true, isExternal: false },
    { id: 6, label: "Artikel", href: "/articles", section: null, isHash: false, isExternal: false },
    { id: 7, label: "Kontak", href: "/contact", section: null, isHash: false, isExternal: false },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const pathname = usePathname();
    const router = useRouter();

    // Hilangkan trailing slash untuk perbandingan
    const normalizedPathname = pathname.replace(/\/$/, "");
    const isHomePage = normalizedPathname === "";
    const isContactPage = normalizedPathname === "/contact";
    const isArticlesPage = normalizedPathname === "/articles";
    const isKelasPage = normalizedPathname === "/kelas";

    // Debug log
    console.log("=== NAVBAR RENDER ===");
    console.log("original pathname   :", pathname);
    console.log("normalizedPathname  :", normalizedPathname);
    console.log("isHomePage          :", isHomePage);
    console.log("isContactPage       :", isContactPage);
    console.log("isArticlesPage      :", isArticlesPage);
    console.log("isKelasPage         :", isKelasPage);
    console.log("activeSection       :", activeSection);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection observer untuk homepage
    useEffect(() => {
        if (!isHomePage) return;
        
        const sectionIds = ["hero", "keunggulan", "cara-kerja", "testimoni"];
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

    // Reset activeSection ketika tidak di homepage
    useEffect(() => {
        if (!isHomePage) {
            setActiveSection("");
        }
    }, [isHomePage]);

    // Handle navigasi internal
    const handleNavClick = (href: string, section?: string | null, isHash?: boolean) => {
        setMenuOpen(false);
        
        if (!isHash) {
            router.push(href);
            return;
        }
        
        if (isHomePage && section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState({}, "", href);
                setActiveSection(section);
            }
        } else if (section) {
            router.push(href);
        }
    };

    // 🔥 Fungsi untuk handle link eksternal (Kelas)
    const handleExternalLink = (url: string) => {
        setMenuOpen(false);
        window.open(url, "_blank"); // Buka di tab baru
        // atau window.location.href = url; // Buka di tab yang sama
    };

    // Fungsi untuk handle button "Mulai Belajar"
    const handleStartLearning = () => {
        window.open("https://kelasstruktur.com/masuk-daftar/", "_blank");
    };

    const isLinkActive = (href: string, section?: string | null, isHash?: boolean, isExternal?: boolean): boolean => {
        // Link eksternal tidak pernah aktif
        if (isExternal) return false;
        
        if (href === "/contact") {
            return isContactPage;
        }
        
        if (href === "/articles") {
            return isArticlesPage;
        }
        
        if (href === "/kelas") {
            return isKelasPage;
        }
        
        if (href === "/" && !isHash) {
            return isHomePage && activeSection === "hero";
        }
        
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
                            onClick={() => handleNavClick("/", "hero", false)}
                            className="flex items-center gap-3 group cursor-pointer"
                        >
                            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-[0_0_20px_rgba(4,166,61,0.3)] group-hover:shadow-[0_0_30px_rgba(4,166,61,0.5)] transition-shadow">
                                <Image
                                    src="/logo.png"
                                    alt="Kelas Struktur Logo"
                                    width={36}
                                    height={36}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            <span className="font-display font-bold text-lg tracking-tight text-theme-primary">
                                Kelas <span className="text-primary-500">Struktur</span>
                            </span>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = isLinkActive(link.href, link.section, link.isHash, link.isExternal);

                                // 🔥 Handle link eksternal (Kelas)
                                if (link.isExternal) {
                                    return (
                                        <button
                                            key={link.id}
                                            onClick={() => handleExternalLink(link.href)}
                                            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer text-theme-secondary hover:text-theme-primary`}
                                        >
                                            <span className="relative z-10">{link.label}</span>
                                        </button>
                                    );
                                }

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
                                                    layoutId="nav-indicator-section"
                                                    className="absolute inset-0 bg-primary-500/10 rounded-lg"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{link.label}</span>
                                        </button>
                                    );
                                }

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
                                                layoutId="nav-indicator-page"
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
                                onClick={handleStartLearning}
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
                                const isActive = isLinkActive(link.href, link.section, link.isHash, link.isExternal);

                                // 🔥 Handle link eksternal (Kelas) di mobile
                                if (link.isExternal) {
                                    return (
                                        <motion.button
                                            key={link.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleExternalLink(link.href)}
                                            className="text-left px-4 py-3 text-sm font-medium transition-all rounded-xl cursor-pointer text-theme-secondary hover:text-primary-500 hover:bg-primary-500/5"
                                        >
                                            {link.label}
                                        </motion.button>
                                    );
                                }

                                if (!link.isHash) {
                                    return (
                                        <motion.div
                                            key={link.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`block text-left px-4 py-3 text-sm font-medium transition-all rounded-xl cursor-pointer ${
                                                    isActive
                                                        ? "text-primary-500 bg-primary-500/10"
                                                        : "text-theme-secondary hover:text-primary-500 hover:bg-primary-500/5"
                                                }`}
                                            >
                                                {link.label}
                                                {isActive && (
                                                    <span className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-primary-500" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                }

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
                                onClick={handleStartLearning}
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