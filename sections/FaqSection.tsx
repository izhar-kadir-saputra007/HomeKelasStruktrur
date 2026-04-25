"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { 
  HelpCircle, 
  Building2, 
  GraduationCap, 
  Clock, 
  CreditCard, 
  BookOpen, 
  Infinity,
  ChevronDown
} from "lucide-react";

// Animasi variants untuk FadeUp - dengan tipe yang benar
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Variants untuk stagger children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const faqs = [
  {
    question: "Apa itu KelasStruktur?",
    answer:
      "KelasStruktur adalah platform pembelajaran online yang fokus pada pengembangan skill di bidang teknik sipil dan struktur bangunan. Kami menyediakan berbagai kursus berkualitas yang dirancang khusus untuk membantu insinyur, mahasiswa teknik sipil, dan profesional di bidang konstruksi untuk meningkatkan kompetensi mereka.",
    icon: <Building2 className="h-5 w-5 text-primary-500" />,
  },
  {
    question: "Bagaimana metode pembelajaran di KelasStruktur?",
    answer:
      "KelasStruktur menyediakan pembelajaran dengan beberapa metode, terdapat kelas online dengan metode pembelajaran video yang diakses di member area masing-masing peserta (bisa diakses kapan saja), terdapat juga kelas dengan metode pertemuan daring/live, semua relatif tergantung dari jenis kelasnya. Metode pembelajaran bisa dilihat pada informasi kelas yang akan diikuti.",
    icon: <GraduationCap className="h-5 w-5 text-primary-500" />,
  },
  {
    question: "Apakah Akses Kelas di KelasStruktur punya Batasan Waktu?",
    answer:
      "Tidak, akses kelas di KelasStruktur berlaku selamanya! Setelah Anda mendaftar dan membeli kelas, Anda bisa mengakses materi pembelajaran kapan saja dan di mana saja tanpa batasan waktu. Anda juga akan mendapatkan gratis update materi selamanya.",
    icon: <Clock className="h-5 w-5 text-primary-500" />,
  },
  {
    question: "Apa Saja Metode Pembayaran di KelasStruktur?",
    answer:
      "Kami menyediakan berbagai metode pembayaran untuk memudahkan Anda, termasuk transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (GoPay, OVO, Dana, LinkAja), dan kartu kredit. Anda juga bisa mencicil pembayaran melalui layanan PayLater yang tersedia.",
    icon: <CreditCard className="h-5 w-5 text-primary-500" />,
  },
];

// Accordion Component
const AccordionItem = ({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: typeof faqs[0]; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div 
      className={`border border-[var(--border-card)] rounded-xl bg-[var(--bg-card)] transition-all duration-300 ${
        isOpen ? 'shadow-card' : 'hover:border-primary-500/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-5 px-6 text-left hover:no-underline focus:outline-none"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-theme-primary flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-300">
              {faq.icon}
            </span>
            {faq.question}
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-primary-500 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pb-5 px-6 text-theme-secondary leading-relaxed pl-14">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

// Lottie Animation Component dengan perbaikan
const OptimizedLottieAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [LottieComponent, setLottieComponent] = useState<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load animation data
  useEffect(() => {
    if (isVisible && !animationData) {
      fetch("/animations/construction.json")
        .then((res) => res.json())
        .then((data) => {
          setAnimationData(data);
        })
        .catch((err) => console.error("Failed to load animation:", err));
    }
  }, [isVisible, animationData]);

  // Dynamic import Lottie hanya ketika komponen terlihat
  useEffect(() => {
    if (isVisible && !LottieComponent && animationData) {
      import("lottie-react").then((module) => {
        setLottieComponent(() => module.default);
      });
    }
  }, [isVisible, LottieComponent, animationData]);

  return (
    <div ref={animationRef} className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-primary-500/5 rounded-full blur-3xl -z-10" />

      {/* Lottie Animation */}
      <div className="relative">
        <div className="relative">
          {LottieComponent && animationData ? (
            <LottieComponent
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{
                width: "500px",
                maxWidth: "100%",
                height: "auto",
                filter: "drop-shadow(0 20px 15px rgba(0, 0, 0, 0.25))",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
                progressiveLoad: true,
              }}
            />
          ) : (
            <div className="w-[500px] max-w-full h-[500px] bg-primary-500/5 rounded-2xl animate-pulse flex items-center justify-center">
              <div className="text-center">
                <Building2 className="h-12 w-12 mx-auto mb-2 text-primary-500/40" />
                <p className="text-sm text-theme-muted">Loading animation...</p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="rounded-xl p-4 text-center transition-all duration-300 group hover:bg-[var(--bg-card)] border border-[var(--border-card)] bg-[var(--bg-card)]/30 backdrop-blur-sm">
    <Icon className="h-8 w-8 mx-auto mb-2 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
    <h3 className="font-semibold text-sm text-theme-primary">{title}</h3>
    <p className="text-xs text-theme-muted mt-1">{description}</p>
  </div>
);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const infoCards = [
    {
      icon: BookOpen,
      title: "Video Pembelajaran",
      description: "Akses 24/7 di member area"
    },
    {
      icon: Infinity,
      title: "Akses Seumur Hidup",
      description: "Sekali daftar, akses selamanya"
    },
    {
      icon: CreditCard,
      title: "Banyak Metode",
      description: "Transfer, e-wallet, kartu kredit"
    }
  ];

  return (
    <section 
      id="faq" 
      className="snap-section relative overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-base) 100%)"
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 blueprint-bg opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center min-h-screen py-20">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary-500/10">
              <HelpCircle className="h-10 w-10 text-primary-500" />
            </div>
          </div>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-theme-primary tracking-tight mb-4">
            Pertanyaan{" "}
            <span className="gradient-text">Frequently Asked</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto text-base leading-relaxed">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang KelasStruktur.
          </p>
        </motion.div>

        {/* Layout 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Kolom Kiri - Animasi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ delay: 0.1 }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="sticky top-24 w-full max-w-lg mx-auto">
              <OptimizedLottieAnimation />
            </div>
          </motion.div>

          {/* Kolom Kanan - FAQ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            {/* FAQ Accordion */}
            <div className="rounded-2xl p-6 md:p-8 bg-[var(--bg-card)]/50 backdrop-blur-sm border border-[var(--border-card)]">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {infoCards.map((card, index) => (
                <InfoCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-center mt-8 pt-4 border-t border-[var(--border-subtle)]"
            >
              <p className="text-theme-muted text-sm mb-3">
                Masih memiliki pertanyaan lain?
              </p>
              <button className="text-primary-500 text-sm font-medium hover:text-primary-400 transition-colors underline underline-offset-4">
                Hubungi Tim Support →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}