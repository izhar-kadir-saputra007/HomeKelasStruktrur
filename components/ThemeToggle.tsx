// components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [isLight, setIsLight] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem("theme");
        const isLightMode = savedTheme === "light";

        if (isLightMode) {
            document.body.classList.add("light");
            setIsLight(true);
        } else if (savedTheme === "dark") {
            document.body.classList.remove("light");
            setIsLight(false);
        } else {
            // Check system preference
            const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
            if (prefersLight) {
                document.body.classList.add("light");
                setIsLight(true);
            }
        }
    }, []);

    const toggleTheme = () => {
        if (isLight) {
            document.body.classList.remove("light");
            localStorage.setItem("theme", "dark");
            setIsLight(false);
        } else {
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
            setIsLight(true);
        }
    };

    if (!mounted) return null;

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-xl border border-theme-subtle bg-theme-card/50 backdrop-blur-sm flex items-center justify-center text-theme-secondary hover:text-primary-500 hover:border-primary-500/40 transition-all duration-200"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isLight ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {isLight ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
        </motion.button>
    );
}