import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PembelajaranDetail3() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <motion.div 
          className="h-full bg-indigo-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header Section - Ultra Modern Design */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [-100, 100, -100],
              y: [-50, 50, -50]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [100, -100, 100],
              y: [50, -50, 50]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Column: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-indigo-100/80 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-200 mb-6"
              >
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                <span className="text-indigo-700 text-xs font-black uppercase tracking-widest">Materi Inti Eksklusif</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                3 PILAR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 italic">
                  SELF-CONTROL
                </span>
              </h1>

              <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8 mx-auto lg:mx-0"></div>

              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10 max-w-xl">
                Temukan rahasia di balik kendali diri yang kuat menurut teori 
                <span className="text-slate-900 font-bold"> Averill</span>. Pahami aspek Perilaku, Pikiran, and Pilihan untuk masa depan yang lebih baik.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-2xl text-indigo-600 font-bold italic">A.</span>
                  <span className="text-sm font-bold text-slate-700">Behavior</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-2xl text-purple-600 font-bold italic">B.</span>
                  <span className="text-sm font-bold text-slate-700">Cognitive</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-2xl text-pink-600 font-bold italic">C.</span>
                  <span className="text-sm font-bold text-slate-700">Decisional</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Image with Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex-1 relative"
            >
              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-4xl z-20 hidden lg:flex"
              >
                🔑
              </motion.div>
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center text-3xl z-20 text-white hidden lg:flex"
              >
                🧠
              </motion.div>

              {/* Main Image Container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white p-4 rounded-[3.5rem] shadow-2xl border-[12px] border-slate-50 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="/images/pembatasan-fisik.png" 
                    alt="Metode Pembatasan Fisik" 
                    width={500} 
                    height={500}
                    className="w-full h-auto rounded-[2.5rem] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-20 px-4">
        <div className="grid gap-16">
          {aspects.map((aspect, index) => (
            <motion.section 
              key={aspect.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[2.5rem] border-2 ${aspect.borderColor} ${aspect.lightColor} p-8 md:p-12`}
            >
              <div className="absolute top-8 right-8 text-8xl opacity-10 font-black italic select-none">
                {aspect.id}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 ${aspect.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-black/5`}>
                    {aspect.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">{aspect.title}</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">{aspect.subtitle}</p>
                  </div>
                </div>

                <p className="text-xl text-slate-700 mb-8 max-w-2xl leading-relaxed">
                   👉 <span className="font-bold underline decoration-indigo-300 decoration-4 underline-offset-4">{aspect.description}</span>
                </p>

                {/* Specific Content for each Type */}
                {aspect.id === "01" && (
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white/80 p-6 rounded-3xl border border-white">
                      <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-indigo-500">📍</span> CONTOH
                      </h4>
                      <ul className="space-y-3">
                        {aspect.examples?.map((ex, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-medium">
                            <span className="text-green-500 font-bold">✓</span> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
                      <h4 className="font-black mb-4 flex items-center gap-2">
                         <span>💡</span> CARA MELATIHNYA
                      </h4>
                      <ul className="space-y-4">
                        {aspect.tips?.map((tip, i) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className="bg-white/20 px-2 rounded-lg text-xs py-1">✔</span>
                            <span className="font-bold">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {aspect.id === "02" && (
                  <div className="mt-10 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                        <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">❌ Pikiran yang Salah</p>
                        <p className="text-xl font-bold text-slate-800 italic leading-snug">
                          {aspect.comparison?.wrong}
                        </p>
                      </div>
                      <div className="bg-green-50 p-8 rounded-3xl border border-green-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">✨</div>
                        <p className="text-xs font-black text-green-500 uppercase tracking-widest mb-2">✅ Pikiran yang Benar</p>
                        <p className="text-xl font-bold text-slate-800 italic leading-snug">
                          {aspect.comparison?.right}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-600 p-6 rounded-2xl text-white text-center font-bold text-lg">
                      🧠 {aspect.note}
                    </div>
                  </div>
                )}

                {aspect.id === "03" && (
                  <div className="mt-10 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {aspect.choices?.map((c, i) => (
                        <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center gap-3 transition-all ${c.value ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-100 opacity-60'}`}>
                          <span className="text-2xl">{c.value ? "✅" : "❌"}</span>
                          <p className="text-xs font-black text-slate-800">{c.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center p-8 bg-white/60 rounded-3xl border-2 border-dashed border-orange-200">
                      <p className="text-2xl font-black text-slate-800 leading-tight">
                        ✨ {aspect.footer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <h3 className="text-3xl font-black mb-6">Sudah Paham Aspeknya?</h3>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto font-medium">
              Ayo uji seberapa kuat kontrol dirimu dengan mengerjakan kuis interaktif kami!
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/">
                <button className="px-10 py-5 rounded-2xl font-black border-2 border-slate-700 hover:bg-slate-800 transition-all text-sm uppercase tracking-widest">
                  Beranda
                </button>
              </Link>
              <Link href="/quiz">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white px-14 py-5 rounded-2xl font-black shadow-2xl shadow-indigo-900/50 hover:bg-indigo-500 transition-all text-sm uppercase tracking-widest"
                >
                  🚀 Ambil Kuis Sekarang
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="py-20 text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
        DiaWeb Edukasi • 2026
      </footer>
    </div>
  );
}
