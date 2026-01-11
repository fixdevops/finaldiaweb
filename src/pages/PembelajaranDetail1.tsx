import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PelajaranPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  // Fungsi Scroll Progress
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

  const checklistGejala = [
    "Merasa gelisah atau iritasi saat tidak bisa bermain game.",
    "Mengabaikan tugas sekolah atau tanggung jawab lainnya.",
    "Pola tidur menjadi berantakan karena begadang main game.",
    "Kehilangan minat pada hobi lain yang dulu disukai.",
    "Gagal mencoba membatasi waktu bermain berkali-kali.",
    "Tetap bermain meskipun tahu hal itu merugikan kesehatan/nilai."
  ];

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCount(prev => e.target.checked ? prev + 1 : prev - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Analisis Gejala & Materi - DiaWeb</title>
      </Head>

      {/* Progress Bar Fixed */}
      <div className="fixed top-16 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header Halaman */}
      <div className="bg-red-50 pt-24 pb-12 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-block rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image 
              src="/images/kecanduan-game.png" 
              alt="Gejala Kecanduan" 
              width={500} 
              height={300}
              className="object-cover"
            />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Kenali Gejala Kecanduan</h1>
          <p className="text-lg text-gray-600">Progres Membaca: <span className="font-bold text-red-600">{Math.round(scrollProgress)}%</span></p>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Self-Checklist Gejala</h2>
          <div className="space-y-4">
            {checklistGejala.map((gejala, index) => (
              <label key={index} className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200 group">
                <input 
                  type="checkbox" 
                  onChange={handleCheck}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="ml-4 text-gray-700 font-medium">{gejala}</span>
              </label>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white text-center">
            <p className="text-sm opacity-70 uppercase tracking-widest mb-1">Skor Kesadaran Diri</p>
            <div className="text-5xl font-black text-red-500 mb-2">{checkedCount}/6</div>
            <p className="font-medium text-slate-300">
              {checkedCount >= 4 ? "Sangat Berisiko! Segera terapkan teknik pembatasan." : "Waspada dan tetap kontrol diri kamu."}
            </p>
          </div>
        </div>

        {/* Konten Tambahan */}
        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">🧠</span> Apa yang Terjadi pada Otak?
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Saat bermain game secara berlebihan, otak melepaskan dopamin yang memicu rasa senang instan. Namun, paparan terus-menerus membuat reseptor otak tumpul, sehingga kamu butuh waktu bermain lebih lama hanya untuk merasa "normal".
            </p>
          </section>

          <section className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Tips Cepat Memutus Siklus:</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-center gap-3">✅ Gunakan alarm fisik saat mulai bermain.</li>
              <li className="flex items-center gap-3">✅ Jangan bermain di dalam kamar tidur.</li>
              <li className="flex items-center gap-3">✅ Cari aktivitas fisik minimal 15 menit/hari.</li>
            </ul>
          </section>
        </div>

        {/* Footer Action */}
        <div className="mt-20 text-center border-t pt-10">
          <p className="text-gray-500 mb-8">Sudah paham gejalanya? Uji pemahamanmu sekarang!</p>
          <Link href="/PembelajaranDetail2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-red-200 hover:bg-red-700 transition-all"
            >
              Lanjut ke Pembelajaran Tahap 2
            </motion.button>
          </Link>
        </div>
      </div>

      <footer className="py-12 text-center text-gray-400">
        DiaWeb Edukasi © 2026
      </footer>
    </div>
  );
}