// components/PromoModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Star, Gift, TrendingUp, Clock, Zap, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PromoItem {
  id: number;
  title: string;
  type: 'new' | 'pro' | 'discount';
  discount?: string;
  originalPrice?: string;
  price?: string;
  image?: string;
}

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (courseId: number, courseTitle: string) => void;
}

const PromoModal = ({ isOpen, onClose, onRegister }: PromoModalProps) => {
  const [promoCourses, setPromoCourses] = useState<PromoItem[]>([
    // Kelas Terbaru
    {
      id: 101,
      title: 'Struktur Bangunan Tahan Gempa Terbaru 2024',
      type: 'new',
    },
    {
      id: 102,
      title: 'Desain Pondasi Dalam Modern dengan AI',
      type: 'new',
    },
    // Kelas Pro
    {
      id: 103,
      title: 'Masterclass: Analisis Struktur dengan SAP2000',
      type: 'pro',
    },
    {
      id: 104,
      title: 'Sertifikasi Engineer Profesional (Certified)',
      type: 'pro',
    },
    // Kelas Diskon
    {
      id: 105,
      title: 'AutoCAD untuk Teknik Sipil',
      type: 'discount',
      discount: '40%',
      originalPrice: 'Rp 500.000',
      price: 'Rp 300.000',
    },
    {
      id: 106,
      title: 'ETABS: Desain Gedung Bertingkat',
      type: 'discount',
      discount: '25%',
      originalPrice: 'Rp 800.000',
      price: 'Rp 600.000',
    }
  ]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'new':
        return {
          icon: <Sparkles size={16} />,
          label: 'Kelas Terbaru',
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-500/10',
          textColor: 'text-blue-500',
          badgeColor: 'bg-blue-500'
        };
      case 'pro':
        return {
          icon: <Star size={16} />,
          label: 'Kelas Pro',
          color: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-500/10',
          textColor: 'text-purple-500',
          badgeColor: 'bg-purple-500'
        };
      case 'discount':
        return {
          icon: <Gift size={16} />,
          label: 'Sedang Diskon',
          color: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-500/10',
          textColor: 'text-orange-500',
          badgeColor: 'bg-orange-500'
        };
      default:
        return {
          icon: <TrendingUp size={16} />,
          label: 'Kelas Populer',
          color: 'from-emerald-500 to-primary-500',
          bgColor: 'bg-emerald-500/10',
          textColor: 'text-emerald-500',
          badgeColor: 'bg-emerald-500'
        };
    }
  };

  const handleRegister = (course: PromoItem) => {
    onRegister(course.id, course.title);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-card)] shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-theme-primary">
                      ✨ Promo Spesial untukmu!
                    </h2>
                    <p className="text-sm text-theme-muted">
                      Kelas terbaru, kelas pro, dan diskon menarik
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-500/10 transition-colors text-theme-secondary"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Group by type */}
                {['new', 'pro', 'discount'].map((type) => {
                  const courses = promoCourses.filter(c => c.type === type);
                  const config = getTypeConfig(type);
                  
                  if (courses.length === 0) return null;

                  return (
                    <div key={type} className="space-y-4">
                      {/* Section Header */}
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                          <div className={config.textColor}>
                            {config.icon}
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                          {config.label}
                        </h3>
                        <div className={`h-px flex-1 bg-gradient-to-r ${config.color} opacity-30`} />
                      </div>

                      {/* Courses Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courses.map((course) => (
                          <motion.div
                            key={course.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="group relative rounded-xl overflow-hidden cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-primary-500/50 transition-all"
                            onClick={() => handleRegister(course)}
                          >
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-theme-primary line-clamp-2 mb-2">
                                    {course.title}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                                      {config.icon}
                                      <span>{config.label}</span>
                                    </div>
                                    {course.discount && (
                                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
                                        <Flame size={12} />
                                        {course.discount} OFF
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${config.color} opacity-10 group-hover:opacity-20 transition`}>
                                  <TrendingUp size={20} className={config.textColor} />
                                </div>
                              </div>

                              {course.discount && (
                                <div className="mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-theme-muted line-through">
                                      {course.originalPrice}
                                    </span>
                                    <span className="text-lg font-bold text-primary-500">
                                      {course.price}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <button className="w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg">
                                Daftar Sekarang →
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 border border-primary-500/10">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-500" />
                    <span className="text-sm text-theme-secondary">
                      Promo terbatas! Jangan sampai ketinggalan
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-sm text-primary-500 hover:text-primary-400 font-semibold"
                  >
                    Lihat Semua Kelas →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;