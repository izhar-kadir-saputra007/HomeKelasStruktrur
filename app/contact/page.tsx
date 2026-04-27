"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    try {
      // Here you can integrate with your email service API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Halo, saya ingin bertanya tentang Kelas Struktur",
    );
    window.open(`https://wa.me/6285343602030?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:Admin@kelasstrutkru.com";
  };

  return (
    <>
    <Preloader />
    <Navbar />
    <div className="min-h-screen blueprint-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <span className="section-label mb-4 inline-block">
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Mari <span className="gradient-text">Terhubung</span>
            </h1>
            <p className="text-theme-secondary text-lg md:text-xl">
              Ada pertanyaan tentang struktur Baja,atau ingin
              bekerja sama dengan kami? Tim kami siap membantu Anda 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* WhatsApp Card */}
          <div className="card-glass rounded-2xl p-8 backdrop-blur-sm border border-theme-card hover:shadow-glow transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">
                Hubungi via WhatsApp
              </h2>
              <p className="text-theme-secondary mb-6">
                Chat langsung dengan tim kami. Fast response, biasanya dalam 15
                menit.
              </p>
              <div className="space-y-3 w-full max-w-sm">
                <div className="bg-theme-secondary/50 rounded-xl p-3">
                  <span className="text-sm text-theme-muted">
                    Nomor WhatsApp
                  </span>
                  <p className="font-mono text-lg font-semibold">
                    +62 8534-3602-030
                  </p>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="btn-primary w-full gap-2"
                >
                  <Send className="w-5 h-5" />
                  Chat Sekarang
                </button>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="card-glass rounded-2xl p-8 backdrop-blur-sm border border-theme-card hover:shadow-glow transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">
                Kirim Email
              </h2>
              <p className="text-theme-secondary mb-6">
                Butuh dokumen lengkap atau pertanyaan detail? Email kami saja.
              </p>
              <div className="space-y-3 w-full max-w-sm">
                <div className="bg-theme-secondary/50 rounded-xl p-3">
                  <span className="text-sm text-theme-muted">Alamat Email</span>
                  <p className="font-mono text-lg font-semibold break-all">
                    Admin@kelasstrutkru.com
                  </p>
                </div>
                <button
                  onClick={handleEmail}
                  className="btn-primary w-full gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Kirim Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold mb-2">
                Atau kirim pesan langsung
              </h3>
              <p className="text-theme-secondary">
                Isi form di bawah, kami akan membalas email Anda dalam 1x24 jam
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-theme-secondary/50 border border-theme-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-theme-secondary/50 border border-theme-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-theme-secondary/50 border border-theme-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Terkirim!
                  </>
                ) : submitStatus === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Gagal mengirim
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Maaf, pesan gagal dikirim. Silakan coba lagi atau hubungi via
                  WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold mb-2">
              Pertanyaan Umum
            </h3>
            <p className="text-theme-secondary">
              Belum punya pertanyaan? Cek dulu yang sering ditanyakan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-glass rounded-xl p-6">
              <h4 className="font-display font-semibold text-lg mb-2">
                Berapa lama respon dari tim?
              </h4>
              <p className="text-theme-secondary">
                Via WhatsApp biasanya 15 menit, via email maksimal 1x24 jam.
              </p>
            </div>
            <div className="card-glass rounded-xl p-6">
              <h4 className="font-display font-semibold text-lg mb-2">
                Apakah ada biaya konsultasi?
              </h4>
              <p className="text-theme-secondary">
                Konsultasi awal gratis! Tim kami dengan senang hati membantu
                Anda.
              </p>
            </div>
            <div className="card-glass rounded-xl p-6">
              <h4 className="font-display font-semibold text-lg mb-2">
                Jam operasional layanan?
              </h4>
              <p className="text-theme-secondary">
                Kelas Struktur siap membantu Anda 24/7, kapan pun Anda butuh.
              </p>
            </div>
            <div className="card-glass rounded-xl p-6">
              <h4 className="font-display font-semibold text-lg mb-2">
                Bisa request materi khusus?
              </h4>
              <p className="text-theme-secondary">
                Tentu! Kirim request materi melalui email, tim kami akan
                evaluasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact Info */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mb-8" />
          <p className="text-theme-muted text-sm">
            Butuh bantuan teknis?{" "}
            <a
              href="mailto:support@kelasstruktur.com"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
             Admin@kelasstrutkru.com
            </a>
          </p>
          <p className="text-theme-muted text-xs mt-4">
            © 2026 Kelas Struktur. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
