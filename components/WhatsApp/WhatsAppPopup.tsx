"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronDown, Mail, Clock } from "lucide-react";
import GlassSurface from "@/components/reactbits/GlassSurface";

interface WhatsAppPopupProps {
  phoneNumber?: string;
  message?: string;
  companyName?: string;
  email?: string;
  operatingHours?: string;
}

const WhatsAppPopup = ({
  phoneNumber = "6285343602030",
  message = "Halo, saya tertarik dengan Kelas Struktur",
  companyName = "Kelas Struktur",
  email = "Admin@kelasstrutkru.com",
  operatingHours = "Kelas Struktur siap membantu Anda 24/7, kapan pun Anda butuh.",
}: WhatsAppPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleWhatsAppClick = () => {
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      setShowTooltip(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute bottom-16 right-0 mb-2 w-48"
            >
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={12}
                borderWidth={0.5}
                brightness={50}
                opacity={0.95}
                blur={8}
                className="p-3"
              >
                <p className="text-xs text-theme-secondary whitespace-normal">
                  Butuh bantuan? Chat via WhatsApp 👋
                </p>
                <div className="absolute -bottom-1 right-4 w-2 h-2 bg-primary-500/30 rotate-45"></div>
              </GlassSurface>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePopup}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          <GlassSurface
            width={60}
            height={60}
            borderRadius={30}
            borderWidth={0.5}
            brightness={100}
            opacity={0.95}
            blur={12}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-full flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-primary-500" />
              ) : (
                <MessageCircle className="w-7 h-7 text-primary-500" />
              )}
            </div>
          </GlassSurface>
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-base)] animate-pulse"></span>
          )}
        </motion.button>
      </div>

      {/* Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "80px" : "auto"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px]"
          >
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={16}
              borderWidth={0.5}
              brightness={50}
              opacity={0.95}
              blur={16}
              className="overflow-hidden"
            >
              {/* Header */}
              {/* <div className="flex items-center justify-between p-4 border-b border-primary-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-display font-bold text-theme-primary whitespace-nowrap">
                      {companyName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <p className="text-xs text-theme-muted">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={toggleMinimize}
                    className="p-2 hover:bg-primary-500/10 rounded-lg transition-colors"
                    aria-label={isMinimized ? "Perbesar" : "Perkecil"}
                  >
                    <ChevronDown 
                      className={`w-4 h-4 text-theme-muted transition-transform duration-300 ${
                        isMinimized ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <button
                    onClick={togglePopup}
                    className="p-2 hover:bg-primary-500/10 rounded-lg transition-colors"
                    aria-label="Tutup"
                  >
                    <X className="w-4 h-4 text-theme-muted" />
                  </button>
                </div>
              </div> */}

              {/* Content - Hidden when minimized */}
              {!isMinimized && (
                <>
                  {/* Body */}
                  <div className="p-4">
                    <p className="text-sm text-theme-secondary mb-4 leading-relaxed">
                      Halo! Ada yang bisa kami bantu? Silakan chat via WhatsApp
                    </p>

                    {/* Contact Options */}
                    <div className="space-y-3">
                      {/* WhatsApp Button */}
                      <button
                        onClick={handleWhatsAppClick}
                        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
                        style={{
                          background: "rgba(4,166,61,0.1)",
                          border: "1px solid rgba(4,166,61,0.2)",
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-semibold text-theme-primary">Chat WhatsApp</p>
                          <p className="text-xs text-theme-muted">Respon cepat 24/7</p>
                        </div>
                      </button>

                      {/* Email Option */}
                      <button
                        onClick={handleEmailClick}
                        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid var(--border-medium)",
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                          <Mail className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-semibold text-theme-primary">Email</p>
                          <p className="text-xs text-theme-muted truncate">{email}</p>
                        </div>
                      </button>

                      {/* Operating Hours */}
                      <div
                        className="w-full flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid var(--border-medium)",
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-semibold text-theme-primary">Jam Operasional</p>
                          <p className="text-xs text-theme-muted">{operatingHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                </>
              )}
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppPopup;