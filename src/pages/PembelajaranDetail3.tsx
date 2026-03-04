import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { markLessonCompleted } from '@/lib/lessonProgress';

export default function PembelajaranDetail3() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasSavedCompletion = useRef(false);
  const isStageCompleted = scrollProgress >= 95;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = (totalScroll / windowHeight) * 100;
      setScrollProgress(scrollValue);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollProgress >= 95 && !hasSavedCompletion.current) {
      markLessonCompleted(3);
      hasSavedCompletion.current = true;
    }
  }, [scrollProgress]);

  const aspects = [
    {
      id: "01",
      title: "Behavior Control",
      subtitle: "Kontrol Perilaku",
      description: "Kemampuan untuk mengontrol tindakan nyata atau respon perilaku secara langsung.",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: "🏃‍♂️",
      examples: [
        "Berhenti main game saat waktu habis",
        "Tidak main game saat jam belajar"
      ],
      tips: [
        "Pasang alarm waktu bermain",
        "Simpan HP di tempat tersembunyi saat belajar",
        "Main game hanya setelah tugas selesai"
      ]
    },
    {
      id: "02",
      title: "Cognitive Control",
      subtitle: "Kontrol Pikiran",
      description: "Kemampuan mengelola cara berpikir dan memproses informasi untuk menekan impuls.",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "🧠",
      comparison: {
        wrong: "“Aku harus main sekarang! Gak tahan!”",
        right: "“Aku bisa main nanti, sekarang waktunya fokus belajar.”"
      },
      note: "Pikiran kita menentukan tindakan kita. Kendalikan pikiranmu, kendalikan hidupmu."
    },
    {
      id: "03",
      title: "Decisional Control",
      subtitle: "Kontrol Keputusan",
      description: "Kemampuan memilih di antara berbagai alternatif tindakan berdasarkan konsekuensi jangka panjang.",
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: "⚖️",
      choices: [
        { label: "Main Game berlebihan", value: false },
        { label: "Belajar & Produktif", value: true },
        { label: "Begadang demi rank", value: false },
        { label: "Istirahat cukup", value: true }
      ],
      footer: "Pilih yang baik untuk masa depan, bukan cuma yang 'enak' sekarang."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>3 Aspek Self-Control - DiaWeb</title>
      </Head>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1.5 bg-gray-100 z-50">
        <motion.div 
          className="h-full bg-linear-to-r from-indigo-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-rose-950 to-slate-900 text-white pt-24 pb-16 px-4">
        <div className="absolute -top-12 -left-20 w-72 h-72 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              Tahap 03
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">3 Pilar Self-Control</h1>
            <p className="mt-4 text-rose-100 leading-relaxed">
              Pelajari tiga aspek penting yang membantumu mengatur perilaku, pikiran, dan keputusan agar tidak
              kecanduan game.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2">
              <span className="text-sm font-semibold">Progres Baca</span>
              <span className="text-lg font-black text-rose-200">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur p-3 shadow-2xl"
          >
            <Image
              src="/images/pembatasan-fisik.png"
              alt="3 Pilar Self-Control"
              width={700}
              height={450}
              className="rounded-[1.4rem] w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* stage completion indicator (same concept as Detail1) */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div
          className={`rounded-2xl border p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
            isStageCompleted
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <p className="font-semibold">
            {isStageCompleted
              ? 'Tahap 3 selesai dan progres sudah tersimpan.'
              : 'Baca hingga bawah halaman (95%) untuk menandai tahap ini selesai.'}
          </p>
          <span className="text-sm font-black uppercase tracking-wider">
            {isStageCompleted ? 'Selesai' : 'Belum selesai'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-10">
        {aspects.map((aspect) => (
          <section
            key={aspect.id}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-100/50"
          >
            <h2 className="text-2xl font-black text-slate-900">
              {aspect.title} - {aspect.subtitle}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {aspect.description}
            </p>

            {aspect.examples && (
              <div className="mt-6">
                <h3 className="font-bold text-slate-800">Contoh:</h3>
                <ul className="list-disc list-inside mt-2 text-slate-600">
                  {aspect.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
            {aspect.tips && (
              <div className="mt-6">
                <h3 className="font-bold text-slate-800">Tips:</h3>
                <ul className="list-disc list-inside mt-2 text-slate-600">
                  {aspect.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {aspect.comparison && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                  <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-1">
                    Pikiran Salah
                  </p>
                  <p className="italic">{aspect.comparison.wrong}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                  <p className="text-xs font-black text-green-500 uppercase tracking-widest mb-1">
                    Pikiran Benar
                  </p>
                  <p className="italic">{aspect.comparison.right}</p>
                </div>
              </div>
            )}
            {aspect.note && (
              <p className="mt-4 bg-blue-600 text-white p-4 rounded-2xl">
                {aspect.note}
              </p>
            )}
            {aspect.choices && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {aspect.choices.map((c, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border ${
                      c.value ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-100 opacity-60'
                    }`}
                  >
                    <span className="block text-center">
                      {c.value ? '✅' : '❌'}
                    </span>
                    <p className="text-xs text-center">{c.label}</p>
                  </div>
                ))}
              </div>
            )}
            {aspect.footer && (
              <p className="mt-4 text-center font-bold">{aspect.footer}</p>
            )}
          </section>
        ))}

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 text-center">
          <p className="text-slate-500 mb-6">Sudah paham? lanjutkan kuis atau kembali beranda.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 hover:bg-slate-50"
            >
              Kembali Beranda
            </Link>
            <Link
              href="/quiz"
              className="inline-flex justify-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-black transition-colors"
            >
              Ambil Kuis
            </Link>
          </div>
        </section>
      </div>

      <footer className="py-20 text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
        DiaWeb Edukasi • 2026
      </footer>
    </div>
  );
}
