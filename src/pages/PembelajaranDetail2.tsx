import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PembelajaranDetail2() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reframedStates, setReframedStates] = useState([false, false, false]);

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

  const latihanReframing = [
    {
      id: 0,
      negatif: "Aku harus push rank sekarang atau aku akan tertinggal jauh.",
      positif: "Game ini tidak akan lari, tapi tugas sekolahku punya deadline yang nyata."
    },
    {
      id: 1,
      negatif: "Cuma main satu match lagi, tanggung banget.",
      positif: "Satu match ini akan merusak jadwal tidurku dan membuatku lemas besok pagi."
    },
    {
      id: 2,
      negatif: "Main game adalah satu-satunya cara aku bisa santai.",
      positif: "Ada banyak cara lain untuk santai yang tidak membuatku merasa bersalah nantinya."
    }
  ];

  const handleReframe = (index: number) => {
    const newState = [...reframedStates];
    newState[index] = !newState[index];
    setReframedStates(newState);
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Cognitive Reframing - DiaWeb</title>
      </Head>

      {/* Progress Bar Fixed */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header Halaman */}
      <div className="bg-blue-50 pt-24 pb-12 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-block rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image 
              src="/images/reframing-otak.png" 
              alt="Teknik Reframing" 
              width={500} 
              height={300}
              className="object-cover"
            />
          </motion.div>
          <span className="bg-blue-200 text-blue-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Tahap 02</span>
          <h1 className="text-4xl font-black text-gray-900 mt-4 mb-4">Teknik Cognitive Reframing</h1>
          <p className="text-lg text-gray-600">Progres Membaca: <span className="font-bold text-blue-600">{Math.round(scrollProgress)}%</span></p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto py-16 px-4">
        
        {/* Penjelasan Materi */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🖼️</span> Apa itu Reframing?
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Pikiran kita seringkali memberikan alasan otomatis (distorsi kognitif) untuk terus bermain game. <strong>Reframing</strong> adalah teknik untuk membingkai ulang pikiran tersebut menjadi lebih sehat dan logis.
          </p>
          <div className="bg-slate-900 p-6 rounded-2xl text-white italic border-l-8 border-blue-500">
            "Bukan situasi (game) yang membuat kita kehilangan kendali, tapi bagaimana kita mengartikan pikiran kita tentang situasi tersebut."
          </div>
        </section>

        {/* Latihan Interaktif Section */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-xl mb-16">
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Ubah Pola Pikirmu</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Klik pada kotak merah untuk melakukan Reframing</p>
          
          <div className="space-y-6">
            {latihanReframing.map((item, index) => (
              <motion.div 
                key={index}
                onClick={() => handleReframe(index)}
                className="cursor-pointer relative overflow-hidden rounded-2xl border-2 transition-all p-6"
                style={{ 
                  borderColor: reframedStates[index] ? '#dcfce7' : '#fee2e2',
                  backgroundColor: reframedStates[index] ? '#f0fdf4' : '#fef2f2'
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-xs font-bold uppercase mb-2 ${reframedStates[index] ? 'text-green-600' : 'text-red-600'}`}>
                      {reframedStates[index] ? 'Pikiran Baru (Sehat)' : 'Pikiran Otomatis (Negatif)'}
                    </p>
                    <p className={`text-lg font-medium leading-tight ${reframedStates[index] ? 'text-green-900' : 'text-red-900'}`}>
                      {reframedStates[index] ? item.positif : item.negatif}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${reframedStates[index] ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {reframedStates[index] ? '✅' : '🔄'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <section className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Langkah 3 Detik:</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-blue-400 p-1 rounded-lg">1</span>
              <p><strong>Sadar:</strong> Kenali saat kamu mulai memberikan alasan untuk main game.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-400 p-1 rounded-lg">2</span>
              <p><strong>Berhenti:</strong> Tarik napas selama 3 detik.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-400 p-1 rounded-lg">3</span>
              <p><strong>Tukar:</strong> Gunakan kalimat positif yang sudah kamu pelajari di atas.</p>
            </li>
          </ul>
        </section>

        {/* Footer Action */}
        <div className="mt-20 text-center border-t pt-10">
          <p className="text-gray-500 mb-8">Siap mengontrol pikiranmu lebih jauh?</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:bg-gray-50 transition-all">
                Kembali Beranda
              </button>
            </Link>
            <Link href="/PembelajaranDetail3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                Lanjut ke Tahap 03
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