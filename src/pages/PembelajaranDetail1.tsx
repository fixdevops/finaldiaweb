import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { markLessonCompleted } from '@/lib/lessonProgress';

export default function PelajaranPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
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
      markLessonCompleted(1);
      hasSavedCompletion.current = true;
    }
  }, [scrollProgress]);

  const checklistGejala = [
    'Merasa gelisah atau iritasi saat tidak bisa bermain game.',
    'Mengabaikan tugas sekolah atau tanggung jawab lainnya.',
    'Pola tidur menjadi berantakan karena begadang main game.',
    'Kehilangan minat pada hobi lain yang dulu disukai.',
    'Gagal mencoba membatasi waktu bermain berkali-kali.',
    'Tetap bermain meskipun tahu hal itu merugikan kesehatan/nilai.',
  ];

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCount((prev) => (e.target.checked ? prev + 1 : prev - 1));
  };

  const isStageCompleted = scrollProgress >= 95;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>Tahap 1 - Kenali Gejala Kecanduan</title>
      </Head>

      <div className="fixed top-16 left-0 w-full h-1.5 bg-slate-200 z-50">
        <div
          className="h-full bg-linear-to-r from-rose-500 to-orange-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-rose-950 to-slate-900 text-white pt-24 pb-16 px-4">
        <div className="absolute -top-12 -left-20 w-72 h-72 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              Tahap 01
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">Kenali Gejala Kecanduan</h1>
            <p className="mt-4 text-rose-100 leading-relaxed">
              Pahami sinyal awal kecanduan game agar kamu bisa mengambil tindakan lebih cepat dan tetap menjaga
              fokus belajar.
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
              src="/images/kecanduan-game.png"
              alt="Gejala Kecanduan"
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
              ? 'Tahap 1 selesai dan progres sudah tersimpan.'
              : 'Baca hingga bawah halaman (95%) untuk menandai tahap ini selesai.'}
          </p>
          <span className="text-sm font-black uppercase tracking-wider">
            {isStageCompleted ? 'Selesai' : 'Belum selesai'}
          </span>
        </div>

        <section className="rounded-[2rem] border border-rose-100 bg-white p-6 md:p-8 shadow-xl shadow-rose-100/50">
          <h2 className="text-2xl font-black text-slate-900 text-center">Self-Checklist Gejala</h2>
          <p className="text-center text-slate-500 mt-2">Centang gejala yang pernah kamu alami.</p>

          <div className="mt-8 space-y-3">
            {checklistGejala.map((gejala, index) => (
              <label
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  className="mt-1 w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                />
                <span className="text-slate-700 font-medium">{gejala}</span>
              </label>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 text-white p-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-300 font-bold">Skor Kesadaran Diri</p>
            <p className="mt-2 text-5xl font-black text-rose-400">{checkedCount}/6</p>
            <p className="mt-2 text-slate-300">
              {checkedCount >= 4 ? 'Risiko tinggi. Mulai batasi durasi bermain dari sekarang.' : 'Tetap waspada dan jaga kontrol diri.'}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <span>🧠</span> Apa yang Terjadi pada Otak?
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Saat bermain game secara berlebihan, otak melepaskan dopamin yang memicu rasa senang instan. Paparan
            terus-menerus membuat reseptor otak tumpul, sehingga kamu butuh waktu bermain lebih lama hanya untuk
            merasa normal.
          </p>
        </section>

        <section className="rounded-[2rem] bg-linear-to-br from-sky-600 to-blue-700 text-white p-6 md:p-8 shadow-xl shadow-blue-200/70">
          <h3 className="text-2xl font-black">Tips Cepat Memutus Siklus</h3>
          <ul className="mt-5 space-y-3">
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">✅ Gunakan alarm fisik saat mulai bermain.</li>
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">✅ Jangan bermain di dalam kamar tidur.</li>
            <li className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">✅ Cari aktivitas fisik minimal 15 menit/hari.</li>
          </ul>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 text-center">
          <p className="text-slate-500 mb-6">Jika sudah paham, lanjutkan ke Tahap 2.</p>
          <Link href="/PembelajaranDetail2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-black transition-colors"
            >
              Lanjut ke Pembelajaran Tahap 2
            </motion.button>
          </Link>
        </section>
      </div>

      <footer className="py-12 text-center text-slate-500 border-t border-slate-200">
        DiaWeb Edukasi © 2026
      </footer>
    </div>
  );
}
