import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { markLessonCompleted } from '@/lib/lessonProgress';

export default function PembelajaranDetail2() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reframedStates, setReframedStates] = useState([false, false, false]);
  const hasSavedCompletion = useRef(false);

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
      markLessonCompleted(2);
      hasSavedCompletion.current = true;
    }
  }, [scrollProgress]);

  const latihanReframing = [
    {
      id: 0,
      negatif: 'Aku harus push rank sekarang atau aku akan tertinggal jauh.',
      positif: 'Game ini tidak akan lari, tapi tugas sekolahku punya deadline yang nyata.',
    },
    {
      id: 1,
      negatif: 'Cuma main satu match lagi, tanggung banget.',
      positif: 'Satu match ini akan merusak jadwal tidurku dan membuatku lemas besok pagi.',
    },
    {
      id: 2,
      negatif: 'Main game adalah satu-satunya cara aku bisa santai.',
      positif: 'Ada banyak cara lain untuk santai yang tidak membuatku merasa bersalah nantinya.',
    },
  ];

  const handleReframe = (index: number) => {
    const newState = [...reframedStates];
    newState[index] = !newState[index];
    setReframedStates(newState);
  };

  const isStageCompleted = scrollProgress >= 95;
  const reframedCount = reframedStates.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>Tahap 2 - Cognitive Reframing</title>
      </Head>

      <div className="fixed top-16 left-0 w-full h-1.5 bg-slate-200 z-50">
        <div
          className="h-full bg-linear-to-r from-sky-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-indigo-950 text-white pt-24 pb-16 px-4">
        <div className="absolute -top-16 left-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              Tahap 02
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">Teknik Cognitive Reframing</h1>
            <p className="mt-4 text-blue-100 leading-relaxed">
              Latih cara berpikir yang lebih sehat supaya keputusanmu tidak dikuasai impuls untuk bermain game.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2">
              <span className="text-sm font-semibold">Progres Baca</span>
              <span className="text-lg font-black text-sky-200">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur p-3 shadow-2xl"
          >
            <Image
              src="/images/reframing-otak.png"
              alt="Teknik Reframing"
              width={700}
              height={450}
              className="rounded-[1.4rem] w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-12 px-4 space-y-10">
        <div
          className={`rounded-2xl border p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
            isStageCompleted
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <p className="font-semibold">
            {isStageCompleted
              ? 'Tahap 2 selesai dan progres sudah tersimpan.'
              : 'Baca hingga bawah halaman (95%) untuk menandai tahap ini selesai.'}
          </p>
          <span className="text-sm font-black uppercase tracking-wider">
            {isStageCompleted ? 'Selesai' : 'Belum selesai'}
          </span>
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <span>🖼️</span> Apa itu Reframing?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Pikiran sering memberi alasan otomatis (distorsi kognitif) untuk terus bermain game. Reframing adalah
            teknik membingkai ulang pikiran itu menjadi lebih logis dan sehat.
          </p>
          <div className="mt-5 rounded-2xl bg-slate-950 text-slate-100 p-5 border-l-4 border-blue-500 italic">
            &quot;Bukan game yang membuat kita kehilangan kendali, tapi cara kita menafsirkan dorongan untuk bermain.&quot;
          </div>
        </section>

        <section className="rounded-[2rem] border border-sky-100 bg-white p-6 md:p-8 shadow-lg shadow-sky-100/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Latihan Ubah Pola Pikir</h2>
              <p className="text-slate-500 mt-1">Klik setiap kartu untuk mengubah pikiran negatif menjadi pikiran sehat.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-sm font-black">
              {reframedCount}/3 latihan selesai
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {latihanReframing.map((item, index) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={() => handleReframe(index)}
                className={`w-full text-left rounded-2xl border-2 transition-all p-5 ${
                  reframedStates[index]
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-rose-200 bg-rose-50 hover:border-rose-300'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p
                      className={`text-xs font-black uppercase tracking-wider mb-2 ${
                        reframedStates[index] ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {reframedStates[index] ? 'Pikiran Baru (Sehat)' : 'Pikiran Otomatis (Negatif)'}
                    </p>
                    <p className={`text-base md:text-lg font-semibold ${reframedStates[index] ? 'text-emerald-900' : 'text-rose-900'}`}>
                      {reframedStates[index] ? item.positif : item.negatif}
                    </p>
                  </div>
                  <span className="text-2xl shrink-0">{reframedStates[index] ? '✅' : '🔄'}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-linear-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow-xl shadow-blue-200/60">
          <h3 className="text-2xl font-black">Langkah 3 Detik</h3>
          <ul className="mt-5 space-y-3">
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
              <strong>1. Sadar:</strong> Kenali saat kamu mulai mencari alasan untuk main game.
            </li>
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
              <strong>2. Berhenti:</strong> Tarik napas selama 3 detik sebelum mengambil keputusan.
            </li>
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
              <strong>3. Tukar:</strong> Ganti pikiran otomatis dengan kalimat reframing yang lebih sehat.
            </li>
          </ul>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 text-center">
          <p className="text-slate-500 mb-6">Lanjutkan ke Tahap 3 untuk menyatukan semua strategi.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 hover:bg-slate-50">
              Kembali Beranda
            </Link>
            <Link href="/PembelajaranDetail3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-black transition-colors"
              >
                Lanjut ke Tahap 03
              </motion.button>
            </Link>
          </div>
        </section>
      </div>

      <footer className="py-12 text-center text-slate-500 border-t border-slate-200">
        DiaWeb Edukasi © 2026
      </footer>
    </div>
  );
}
