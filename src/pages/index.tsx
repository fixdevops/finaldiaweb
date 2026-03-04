import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { type LessonId } from '@/lib/lessonProgress';
import { useLessonProgress } from '@/lib/useLessonProgress';

type LessonCard = {
  lessonId: LessonId;
  tahap: string;
  judul: string;
  deskripsiSingkat: string;
  imageUrl: string;
  linkTo: string;
  accent: string;
  border: string;
  surface: string;
};

export default function Home() {
  const videos = [
    {
      id: 'D-Q9NRWGh4M',
      title: 'Dampak Kecanduan Game pada Otak',
    },
    {
      id: 'c6mbU6C2src',
      title: 'Teknik Deep Work & Kontrol Diri',
    },
  ];

  const techniques = [
    {
      title: 'Metode 5 Menit',
      description: 'Saat ingin main game, tunda selama 5 menit. Gunakan waktu ini untuk bernapas atau minum air.',
      icon: '⏱️',
      tone: 'from-rose-500 to-orange-500',
    },
    {
      title: 'Jadwal Terstruktur',
      description: "Gunakan aturan 'Kerja Dulu, Main Kemudian'. Jadikan bermain game sebagai reward tugas.",
      icon: '📅',
      tone: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Lingkungan Terkendali',
      description: 'Jauhkan perangkat game dari tempat tidur agar tidak tergoda secara konstan.',
      icon: '🚫',
      tone: 'from-emerald-500 to-teal-500',
    },
  ];

  const materiLengkap: LessonCard[] = [
    {
      lessonId: 1,
      tahap: 'Tahap 01',
      judul: 'Kenali Gejala Kecanduan',
      deskripsiSingkat:
        'Kenali tanda-tanda awal seperti gelisah saat tidak bermain, tugas terbengkalai, dan pola tidur yang terganggu.',
      imageUrl: '/images/kecanduan-game.png',
      linkTo: '/PembelajaranDetail1',
      accent: 'text-rose-700',
      border: 'border-rose-200',
      surface: 'bg-rose-50/80',
    },
    {
      lessonId: 2,
      tahap: 'Tahap 02',
      judul: 'Teknik Cognitive Reframing',
      deskripsiSingkat:
        "Ubah pikiran otomatis seperti 'aku harus main sekarang' menjadi keputusan yang lebih sehat dan terukur.",
      imageUrl: '/images/reframing-otak.png',
      linkTo: '/PembelajaranDetail2',
      accent: 'text-sky-700',
      border: 'border-sky-200',
      surface: 'bg-sky-50/80',
    },
    {
      lessonId: 3,
      tahap: 'Tahap 03',
      judul: 'Metode Pembatasan Fisik',
      deskripsiSingkat:
        'Buat lingkungan yang mendukung fokus dengan mengurangi akses impulsif ke perangkat game.',
      imageUrl: '/images/pembatasan-fisik.png',
      linkTo: '/PembelajaranDetail3',
      accent: 'text-emerald-700',
      border: 'border-emerald-200',
      surface: 'bg-emerald-50/80',
    },
  ];

  const completedLessons = useLessonProgress();

  const scrollToLearning = () => {
    const element = document.getElementById('pembelajaran');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const completedCount = completedLessons.length;
  const completionPercent = Math.round((completedCount / 3) * 100);
  const canStartQuiz = completedCount === 3;

  const isLessonCompleted = useCallback(
    (lessonId: LessonId) => {
      return completedLessons.includes(lessonId);
    },
    [completedLessons]
  );

  const isLessonUnlocked = useCallback(
    (lessonId: LessonId) => {
      if (lessonId === 1) {
        return true;
      }
      if (lessonId === 2) {
        return isLessonCompleted(1) || isLessonCompleted(2);
      }
      return isLessonCompleted(2) || isLessonCompleted(3);
    },
    [isLessonCompleted]
  );

  const progressLabel = useMemo(() => {
    if (canStartQuiz) {
      return 'Semua pelajaran selesai. Kuiz sudah terbuka.';
    }
    return `Selesaikan ${3 - completedCount} tahap lagi untuk membuka kuiz.`;
  }, [canStartQuiz, completedCount]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>DiaWeb - Edukasi Self-Control</title>
        <meta name="description" content="Edukasi pengendalian diri terhadap kecanduan game" />
      </Head>

      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-cyan-950 text-white pt-24 pb-20 px-4">
        <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              Program Self-Control
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-4xl md:text-6xl font-black leading-tight"
            >
              Kuasai Dirimu,
              <br />
              Bukan Game-mu
            </motion.h1>
            <p className="mt-6 text-lg md:text-xl text-cyan-100 max-w-2xl">
              Belajar strategi praktis untuk menyeimbangkan dunia digital, fokus akademik, dan kesehatan mental.
            </p>
            <p className="mt-4 text-sm md:text-base text-cyan-200 max-w-2xl">
              Website ini bertujuan membantu siswa meningkatkan pengendalian diri dalam penggunaan game dan media digital, agar mampu
              mengatur waktu dengan lebih bijak, mengurangi kebiasaan bermain berlebihan, serta membangun kebiasaan yang lebih sehat dan
              produktif.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToLearning}
                className="bg-white text-slate-900 font-bold py-3.5 px-8 rounded-xl hover:bg-cyan-50 transition-all shadow-xl active:scale-95"
              >
                Mulai Belajar
              </button>
              {canStartQuiz ? (
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center bg-cyan-400 text-slate-950 font-bold py-3.5 px-8 rounded-xl hover:bg-cyan-300 transition-all shadow-xl"
                >
                  Kerjakan Kuiz
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white/80 font-bold py-3.5 px-8 rounded-xl cursor-not-allowed"
                >
                  Kuiz Terkunci
                </button>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 font-bold">Progress Belajar</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Tahap Selesai', value: `${completedCount}/3` },
                { label: 'Status Kuiz', value: canStartQuiz ? 'Terbuka' : 'Terkunci' },
                { label: 'Progres', value: `${completionPercent}%` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-slate-950/40 border border-white/10 p-4">
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-cyan-200">{stat.label}</p>
                  <p className="mt-2 text-lg md:text-xl font-black">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-cyan-300 to-blue-300 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-cyan-100">{progressLabel}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-10 px-4 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 overflow-hidden rounded-[2rem] shadow-2xl border border-white/50"
          >
            <div className="bg-white p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🧠</span>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Pengertian Self-Control</h2>
              </div>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium italic">
                &quot;Self-control adalah kemampuan individu untuk mengatur, mengendalikan, dan mengarahkan perilaku,
                emosi, serta keputusan agar tetap sesuai tujuan jangka panjang.&quot;
              </p>
            </div>
            <div className="bg-linear-to-br from-indigo-600 to-blue-700 p-8 md:p-10 text-white relative">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-9xl">🎯</div>
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Skill, Bukan Bakat</h2>
                <p className="mt-5 text-lg md:text-xl font-bold leading-snug">
                  Self-control bisa dilatih secara bertahap lewat kebiasaan kecil yang konsisten.
                </p>
                <p className="mt-4 text-indigo-100">
                  Mulai dari atur waktu, ubah pola pikir, lalu disiplin dalam membuat keputusan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {techniques.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 overflow-hidden"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${item.tone}`} />
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 px-4 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Mengapa Perlu Mengontrol Diri?</h2>
            <ul className="mt-6 space-y-4">
              {[
                'Meningkatkan fokus belajar dan kualitas tugas',
                'Menjaga pola tidur agar lebih stabil',
                'Membangun hubungan sosial yang lebih sehat',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 text-emerald-500 font-bold">✔</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border-2 border-dashed border-blue-200 bg-blue-50 p-8">
            <p className="text-blue-900 text-lg md:text-xl italic text-center leading-relaxed">
              &ldquo;Kemenangan terbesar adalah kemenangan atas diri sendiri.&rdquo;
            </p>
            <p className="mt-4 text-center font-black text-blue-800 uppercase tracking-wider">Plato</p>
          </div>
        </div>
      </section>

      <section id="pembelajaran" className="py-20 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Kurikulum</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Materi Pembelajaran</h2>
            <p className="text-slate-500 mt-4">Selesaikan tahap secara berurutan untuk membuka kuiz final.</p>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-slate-700 font-semibold">Progres keseluruhan: {completedCount}/3 tahap selesai</p>
              <p className={`text-sm font-bold ${canStartQuiz ? 'text-emerald-600' : 'text-amber-600'}`}>
                {canStartQuiz ? 'Kuiz sudah bisa dikerjakan' : 'Kuiz akan terbuka setelah semua tahap selesai'}
              </p>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <div className="grid gap-6">
            {materiLengkap.map((item, index) => {
              const isCompleted = isLessonCompleted(item.lessonId);
              const isUnlocked = isLessonUnlocked(item.lessonId);

              return (
                <motion.div
                  key={item.lessonId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className={`rounded-[2rem] border p-6 md:p-8 shadow-sm ${item.border} ${item.surface}`}
                >
                  <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-8 items-center">
                    <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <Image src={item.imageUrl} alt={item.judul} width={420} height={260} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-black uppercase tracking-widest ${item.accent}`}>{item.tahap}</span>
                        {isCompleted && (
                          <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold">Selesai</span>
                        )}
                        {!isCompleted && !isUnlocked && (
                          <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-bold">Terkunci</span>
                        )}
                        {!isCompleted && isUnlocked && (
                          <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold">Tersedia</span>
                        )}
                      </div>

                      <h3 className="mt-3 text-2xl md:text-3xl font-black text-slate-900">{item.judul}</h3>
                      <p className="mt-3 text-slate-600 leading-relaxed">{item.deskripsiSingkat}</p>

                      <div className="mt-5">
                        {isUnlocked ? (
                          <Link
                            href={item.linkTo}
                            className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-6 py-3 font-bold hover:bg-slate-800 transition-colors"
                          >
                            {isCompleted ? 'Pelajari Ulang' : 'Mulai Tahap Ini'}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center justify-center rounded-xl bg-slate-300 text-slate-600 px-6 py-3 font-bold cursor-not-allowed"
                          >
                            Selesaikan Tahap Sebelumnya
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white border border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300 font-bold">Final Step</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">Self-Control Quiz</h3>
                <p className="mt-2 text-slate-300">
                  Kuiz akan aktif otomatis setelah Tahap 1, 2, dan 3 selesai.
                </p>
              </div>
              {canStartQuiz ? (
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 text-slate-950 px-8 py-3.5 font-black hover:bg-cyan-300 transition-colors"
                >
                  Mulai Kuiz Sekarang
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-xl bg-slate-700 text-slate-300 px-8 py-3.5 font-black cursor-not-allowed"
                >
                  Kuiz Masih Terkunci
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900">Video Edukasi</h2>
            <p className="text-slate-500 mt-2">Pendalaman materi lewat video singkat yang mudah dipahami.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.01 }}
                className="group rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/70"
              >
                <div className="relative bg-black aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="bg-white p-4 border-t border-slate-100">
                  <p className="font-bold text-slate-800">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 border-t bg-white">
        <p>© 2026 DiaWeb Edukasi. Bangga Mengontrol Diri.</p>
      </footer>
    </div>
  );
}
