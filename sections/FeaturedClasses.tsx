"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Clock,
  BookOpen,
  Sparkles,
  Calendar,
  Lock,
  Target,
} from "lucide-react";
import Image from "next/image";
import { getAllCourses } from "@/lib/tutor-api";
import PromoModal from "@/components/sections/PromoModal"; // 🔥 IMPORT MODAL

// Interface untuk data course dari API
interface CourseFromAPI {
  ID: number;
  post_title: string;
  post_excerpt: string;
  thumbnail_url: string;
  additional_info: {
    course_duration: Array<{ hours: number; minutes: number; seconds: number }>;
    course_level: string[];
    course_requirements: string[];
    course_target_audience: string[];
    course_benefits: string[];
  };
  ratings?: {
    rating_count: number | string;
    rating_sum: number | string;
    rating_avg: number | string;
    count_by_value: Record<string, number | string>;
  };
  post_author: {
    display_name: string;
  };
}

// Interface untuk data course yang sudah ditransformasi untuk UI
interface TransformedCourse {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  modules: number;
  duration: string;
  status: "active" | "coming-soon";
  featured: boolean;
  color: string;
  releaseDate?: string;
  targetAudience: string[];
  benefits: string[];
}

// 🔥 KONFIGURASI CACHE
const CACHE_KEY = "tutor_courses_cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

interface CacheData {
  data: TransformedCourse[];
  timestamp: number;
}

function saveToCache(courses: TransformedCourse[]) {
  try {
    const cacheData: CacheData = {
      data: courses,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("⚠️ Failed to save cache:", error);
  }
}

function loadFromCache(): TransformedCourse[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData: CacheData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.warn("⚠️ Failed to load cache:", error);
    return null;
  }
}

// Helper functions
function getDurationFromAPI(course: CourseFromAPI): string {
  const duration = course.additional_info?.course_duration?.[0];
  if (!duration) return "Coming Soon";
  const hours = duration.hours || 0;
  const minutes = duration.minutes || 0;
  if (hours > 0 && minutes > 0) return `${hours} Jam ${minutes} Menit`;
  if (hours > 0) return `${hours} Jam`;
  if (minutes > 0) return `${minutes} Menit`;
  return "Flexible";
}

function formatTextList(text: string): string[] {
  if (!text) return [];
  const items = text.split(/\r\n|\n/);
  return items.filter((item) => item.trim().length > 0).map((item) => item.trim());
}

function getModulesEstimate(course: CourseFromAPI): number {
  const duration = course.additional_info?.course_duration?.[0];
  if (!duration) return 10;
  const hours = duration.hours || 0;
  const minutes = duration.minutes || 0;
  const totalMinutes = hours * 60 + minutes;
  return Math.max(8, Math.floor(totalMinutes / 40));
}

function getCourseColor(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("gedung") || titleLower.includes("bangunan"))
    return "from-emerald-500 to-primary-500";
  if (titleLower.includes("gempa") || titleLower.includes("seismic"))
    return "from-blue-500 to-cyan-500";
  if (titleLower.includes("baja") || titleLower.includes("steel"))
    return "from-purple-500 to-pink-500";
  if (titleLower.includes("pondasi") || titleLower.includes("foundation"))
    return "from-orange-500 to-red-500";
  if (titleLower.includes("jembatan") || titleLower.includes("bridge"))
    return "from-teal-500 to-green-500";
  if (titleLower.includes("dinamika") || titleLower.includes("dynamic"))
    return "from-indigo-500 to-purple-500";
  return "from-primary-500 to-secondary-500";
}

function transformCourse(course: CourseFromAPI, index: number): TransformedCourse {
  const isComingSoon = course.ID === 9999;
  let targetAudience: string[] = [];
  let benefits: string[] = [];

  if (course.additional_info?.course_target_audience?.[0]) {
    targetAudience = formatTextList(course.additional_info.course_target_audience[0]);
  }
  if (course.additional_info?.course_benefits?.[0]) {
    benefits = formatTextList(course.additional_info.course_benefits[0]);
  }

  return {
    id: course.ID,
    title: course.post_title,
    subtitle: course.post_excerpt?.substring(0, 100) || "Pelajari langsung dari praktisi berpengalaman",
    image: course.thumbnail_url || "/images/courses/placeholder.jpg",
    modules: getModulesEstimate(course),
    duration: getDurationFromAPI(course),
    status: isComingSoon ? "coming-soon" : "active",
    featured: false,
    color: getCourseColor(course.post_title),
    releaseDate: isComingSoon ? "Segera" : undefined,
    targetAudience: targetAudience,
    benefits: benefits.slice(0, 4),
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FeaturedClasses() {
  const [courses, setCourses] = useState<TransformedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  
  // 🔥 NEW: State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  // 🔥 NEW: Effect untuk menampilkan modal saat section visible
  useEffect(() => {
    const section = document.getElementById('kelas');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Saat section terlihat dan modal belum pernah ditampilkan
          if (entry.isIntersecting && !hasShownModal && !loading) {
            // Delay 1 detik setelah section terlihat
            const timer = setTimeout(() => {
              setIsModalOpen(true);
              setHasShownModal(true);
            }, 1000);
            
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.3 } // Muncul saat 30% section terlihat
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasShownModal]);

  // 🔥 Modal register handler
  const handleModalRegister = (courseId: number, courseTitle: string) => {
    console.log(`🎉 [PROMO] Register from modal: ${courseId} - ${courseTitle}`);
    window.open("https://kelasstruktur.com/rabbaja/", "_blank");
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);

        // Cek cache
        const cachedData = loadFromCache();
        if (cachedData && cachedData.length > 0) {
          setCourses(cachedData);
          setIsFromCache(true);
          setLoading(false);

          // Background fetch untuk update cache
          try {
            const apiCourses = await getAllCourses(1, 20);
            
            // 🔥 LOG DATA MENTAH JSON
            console.log("\n");
            console.log("╔════════════════════════════════════════════════════════════════════════════════════════════════╗");
            console.log("║                              📦 RAW JSON RESPONSE DARI API TUTOR LMS                          ║");
            console.log("╚════════════════════════════════════════════════════════════════════════════════════════════════╝");
            console.log(JSON.stringify(apiCourses, null, 2));
            console.log(`\n📊 Total Courses: ${apiCourses.length}\n`);
            
            const transformed = apiCourses.map((course: CourseFromAPI, idx: number) => transformCourse(course, idx));
            setCourses(transformed);
            saveToCache(transformed);
            setIsFromCache(false);
          } catch (bgError) {
            console.warn("Background fetch failed:", bgError);
          }
          return;
        }

        // No cache - fetch langsung
        const apiCourses = await getAllCourses(1, 20);
        
        // 🔥 LOG DATA MENTAH JSON
        console.log("\n");
        console.log("╔════════════════════════════════════════════════════════════════════════════════════════════════╗");
        console.log("║                              📦 RAW JSON RESPONSE DARI API TUTOR LMS                          ║");
        console.log("╚════════════════════════════════════════════════════════════════════════════════════════════════╝");
        console.log(JSON.stringify(apiCourses, null, 2));
        console.log(`\n📊 Total Courses: ${apiCourses.length}\n`);

        const transformed = apiCourses.map((course: CourseFromAPI, idx: number) => transformCourse(course, idx));
        setCourses(transformed);
        saveToCache(transformed);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Gagal memuat daftar kursus. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // 🔥 TOMBOL DAFTAR - BUKA DI TAB BARU
  const handleRegister = (courseId: number, courseTitle: string) => {
    console.log(`🔘 [LOG] Register clicked: ${courseId} - ${courseTitle}`);
    console.log(`🔘 [LOG] Opening link in new tab: https://kelasstruktur.com/rabbaja/`);
    window.open("https://kelasstruktur.com/rabbaja/", "_blank");
  };

  if (loading && !isFromCache) {
    return (
      <section className="snap-section relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
          <p className="mt-4 text-theme-secondary">Memuat daftar kursus...</p>
        </div>
      </section>
    );
  }

  if (error && courses.length === 0) {
    return (
      <section className="snap-section relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-theme-secondary">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  if (courses.length === 0 && !loading) {
    return (
      <section className="snap-section relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme-secondary">Belum ada kursus yang tersedia.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* 🔥 Promo Modal */}
      <PromoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleModalRegister}
      />

      <section
        id="kelas"
        className="snap-section relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-secondary) 100%)",
        }}
      >
        {isFromCache && (
          <div className="fixed bottom-4 left-4 z-50 text-xs bg-gray-800/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            📦 Data dari cache
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 blueprint-bg opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
            >
              <Sparkles size={16} className="text-primary-500" />
              <span className="text-xs font-semibold text-primary-500 tracking-wider">
                KURIKULUM PREMIUM
              </span>
            </motion.div>

            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary leading-tight tracking-tight mb-4">
              Course <span className="gradient-text">Premium</span> Terbaru
            </h2>
            <p className="text-theme-secondary max-w-2xl mx-auto text-base leading-relaxed">
              Di bimbing dari NOL, di temani dari BASIC dan bisa mentoring SETIAP HARI
            </p>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {courses.map((cls, idx) => {
              const isComingSoon = cls.status === "coming-soon";

              return (
                <motion.div
                  key={cls.id}
                  variants={cardVariants}
                  whileHover={!isComingSoon ? { y: -8, scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                    isComingSoon ? "opacity-90" : ""
                  }`}
                >
                  <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${cls.color} rounded-3xl blur-2xl opacity-60`}
                    />
                  </div>

                  <div className="relative bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] backdrop-blur-sm border border-[var(--border-card)] rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-primary-500/50">
                    {/* Image Container */}
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <Image
                        src={cls.image}
                        alt={cls.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/courses/placeholder.jpg";
                        }}
                      />
                      {isComingSoon && (
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-yellow-500/50 z-10">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-yellow-400" />
                            <span className="text-xs font-semibold text-yellow-400">Coming Soon</span>
                          </div>
                        </div>
                      )}
                      {isComingSoon && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                          <div className="bg-black/60 backdrop-blur-md rounded-full p-4 border border-white/20">
                            <Lock size={32} className="text-white/60" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="relative p-6">
                      <div className="mb-3">
                        <h3 className="font-display font-bold text-xl text-theme-primary line-clamp-2">
                          {cls.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 mb-4 pt-3 border-t border-[var(--border-subtle)]">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={14} className="text-primary-500" />
                          <span className="text-xs text-theme-secondary">{cls.modules} Modul</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary-500" />
                          <span className="text-xs text-theme-secondary">{cls.duration}</span>
                        </div>
                      </div>

                      {/* Target Audience */}
                      {cls.targetAudience && cls.targetAudience.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target size={14} className="text-primary-500" />
                            <span className="text-xs font-semibold text-theme-primary uppercase tracking-wider">
                              Untuk Kamu Yang:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cls.targetAudience.slice(0, 3).map((item, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-500">
                                {item.replace(/^\d+\.\s*/, "")}
                              </span>
                            ))}
                            {cls.targetAudience.length > 3 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-500/10 text-theme-muted">
                                +{cls.targetAudience.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CTA Button - Daftar Sekarang (Buka di Tab Baru) */}
                      {isComingSoon ? (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gray-700/50 text-gray-400 cursor-not-allowed"
                        >
                          <Calendar size={16} />
                          Segera Hadir
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegister(cls.id, cls.title)}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all bg-primary-500 hover:bg-primary-600 text-white"
                        >
                          <span>Daftar Sekarang</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Bottom */}
          <div className="text-center mt-16">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-flex flex-col items-center gap-4">
              <p className="text-theme-muted text-sm">Masih bingung mau mulai dari mana?</p>
              <button
                className="group text-3xl flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-400 transition-colors"
                onClick={() => window.open("https://wa.me/6285343602030", "_blank")}
              >
                Konsultasi dengan mentor kami
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}