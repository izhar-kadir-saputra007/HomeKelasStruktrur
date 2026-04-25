"use client";

import { Globe, MessageCircle, Mail, Link2, ArrowRight } from "lucide-react";

const footerLinks = {
    Platform: ["Semua Kelas", "Instruktur", "Sertifikat", "Blog"],
    Perusahaan: ["Tentang Kami", "Karir", "Media Kit", "Hubungi Kami"],
    Legal: ["Syarat Penggunaan", "Kebijakan Privasi", "Cookie Policy"],
};

const socials = [
    { Icon: Globe, href: "#", label: "Website" },
    { Icon: MessageCircle, href: "#", label: "Community" },
    { Icon: Mail, href: "#", label: "Email" },
    { Icon: Link2, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="relative bg-[#080B10] border-t border-white/5 overflow-hidden">
            {/* Top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(4,166,61,0.5), transparent)" }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 24L28 24M4 16H22M4 8H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M24 4L28 8L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-lg text-white">
                                Kelas <span className="text-primary-400">Struktur</span>
                            </span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                            Platform kursus online terpercaya untuk teknik sipil dan struktur bangunan di Indonesia.
                        </p>

                        {/* Newsletter */}
                        <p className="text-white/60 text-xs font-medium mb-3 tracking-wider uppercase">Newsletter</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email kamu"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
                            />
                            <button className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/20 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-3 mt-6">
                            {socials.map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-9 h-9 rounded-xl border border-white/8 bg-white/3 flex items-center justify-center text-white/40 hover:text-primary-400 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-5">
                                {category}
                            </p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-white/35 text-sm hover:text-white/70 transition-colors hover:translate-x-0.5 inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-white/5">
                    <p className="text-white/25 text-xs">
                        © 2026 Kelas Struktur. Hak cipta dilindungi.
                    </p>
                    <div className="flex items-center gap-2 text-white/25 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        Semua sistem berjalan normal
                    </div>
                </div>
            </div>
        </footer>
    );
}
