import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function PembelajaranDetail3() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Pembatasan Fisik - DiaWeb</title>
      </Head>

      {/* Progress Bar Fixed */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-green-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header Halaman */}
      <div className="bg-green-50 pt-24 pb-12 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-block rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image 
              src="/images/pembatasan-fisik.png" 
              alt="Metode Pembatasan Fisik" 
              width={500} 
              height={300}
              className="object-cover"
            />
          </motion.div>
          <span className="bg-green-200 text-green-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Tahap 03</span>
          <h1 className="text-4xl font-black text-gray-900 mt-4 mb-4">Metode Pembatasan Fisik</h1>
          <p className="text-lg text-gray-600">Progres Membaca: <span className="font-bold text-green-600">{Math.round(scrollProgress)}%</span></p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto py-16 px-4">
        
        {/* Penjelasan Utama */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🚧</span> Ciptakan "Hambatan" Sengaja
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Mengandalkan niat saja seringkali gagal. Teknik terbaik untuk mengontrol diri adalah dengan **menjauhkan sumber godaan secara fisik**. Semakin sulit aksesmu ke perangkat game, semakin kecil kemungkinanmu untuk bermain secara impulsif.
          </p>
        </section>

        {/* Simulasi Interaktif */}
        <div className="bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-green-200 mb-16">
          <h2 className="text-xl font-bold mb-6 text-center text-slate-800">Simulasi: Amankan Gadget-mu</h2>
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-64 h-40 bg-white rounded-2xl shadow-inner border-2 border-slate-200 flex items-center justify-center">
              {!isLocked ? (
                <motion.div 
                  layoutId="gadget"
                  className="text-6xl animate-bounce"
                >
                  📱
                </motion.div>
              ) : (
                <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">Meja Kosong (Fokus)</p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`w-16 h-1 bg-slate-200 ${isLocked ? 'bg-green-500' : ''} transition-colors`}></div>
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
                  isLocked ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border-2'
                }`}
              >
                {isLocked ? "🔓 Keluarkan HP" : "🔒 Simpan HP di Laci"}
              </button>
              <div className={`w-16 h-1 bg-slate-200 ${isLocked ? 'bg-green-500' : ''} transition-colors`}></div>
            </div>

            {isLocked && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 p-4 rounded-xl text-green-800 text-sm font-medium flex items-center gap-2"
              >
                ⭐ Bagus! Sekarang otakmu bisa lebih fokus pada tugas di depan mata.
              </motion.div>
            )}
          </div>
        </div>

        {/* Strategi 3-Ruang */}
        <div className="space-y-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800">Strategi Lokasi yang Tepat:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl">
              <span className="text-3xl block mb-2">🏠</span>
              <h4 className="font-bold mb-2">Ruang Belajar</h4>
              <p className="text-sm text-slate-600">Bebas gadget sepenuhnya. Hanya ada buku dan alat tulis.</p>
            </div>
            <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl">
              <span className="text-3xl block mb-2">🔋</span>
              <h4 className="font-bold mb-2">Stasiun Pengisian</h4>
              <p className="text-sm text-slate-600">Charge ponsel di luar kamar (misal: ruang tamu) sebelum tidur.</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <section className="bg-green-600 p-8 rounded-3xl text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Golden Rule:</h3>
          <p className="text-lg opacity-90 leading-relaxed italic">
            "Out of sight, out of mind. Jika kamu tidak melihatnya, kamu tidak akan terlalu menginginkannya."
          </p>
        </section>

        {/* Footer Action */}
        <div className="mt-20 text-center border-t pt-10">
          <p className="text-gray-500 mb-8">Selamat! Kamu telah menyelesaikan semua materi dasar.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:bg-gray-50 transition-all">
                Kembali ke Beranda
              </button>
            </Link>
            <Link href="/quiz">
              <motion.button 
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all"
              >
                🎯 Uji Skor Akhirmu!
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-12 text-center text-gray-400">
        DiaWeb Edukasi © 2026
      </footer>
    </div>
  );
}