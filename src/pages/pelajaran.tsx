import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Jika ini adalah bagian dari file index.tsx, Anda bisa memasukkannya ke dalam export default function Home()
export default function PelajaranPage() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>DiaWeb - Kurikulum Self-Control</title>
      </Head>

      {/* Hero atau Konten Lain di Atasnya... */}

      {/* --- SECTION PEMBELAJARAN --- */}
      <section id="pembelajaran" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Kurikulum Self-Control</h2>
            <p className="text-slate-500 mt-4 text-lg">Selesaikan setiap tahapan untuk membangun ketahanan mental yang kuat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Kartu Tahap 01 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="relative w-40 h-40 flex-shrink-0">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-50"></div>
                <Image 
                  src="/images/kecanduan-game.png" 
                  alt="Tahap 01" 
                  width={160} 
                  height={160} 
                  className="relative z-10 object-contain p-2"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-500 font-bold text-sm uppercase tracking-widest">Tahap 01</span>
                  <span className="text-slate-400 text-xs font-medium">100% Complete</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Kenali Gejala Kecanduan</h3>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-6">
                  <div className="bg-red-500 h-full w-full rounded-full"></div>
                </div>
                <Link href="/PembelajaranDetail1">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    Pelajari Lanjut
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Kartu Tahap 02 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-50 rounded-full"></div>
                <span className="text-6xl relative z-10 text-blue-500">🧠</span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">Tahap 02</span>
                  <span className="text-slate-400 text-xs font-medium">75% Progres</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Cognitive Reframing</h3>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-6">
                  <div className="bg-blue-500 h-full w-[75%] rounded-full"></div>
                </div>
                <Link href="/PembelajaranDetail2">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    Lanjutkan Belajar
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Kartu Tahap 03 - Tampilan Lebar */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-gradient-to-br from-green-50 to-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-green-100 flex flex-col md:flex-row gap-10 items-center"
            >
              <div className="w-full md:w-1/3 aspect-video relative rounded-2xl overflow-hidden border-4 border-white shadow-md">
                 <Image 
                  src="/images/pembatasan-fisik.png" 
                  alt="Tahap 03" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-green-600 font-bold text-sm uppercase tracking-widest mb-2 block">Tahap 03</span>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Metode Pembatasan Fisik</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Membangun lingkungan yang mendukung fokus dengan cara menjauhkan gangguan secara nyata dari jangkauan mata.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/PembelajaranDetail3" className="flex-1">
                    <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
                      Mulai Tahap Terakhir
                    </button>
                  </Link>
                  <div className="hidden sm:block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
                    Final Stage
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Footer atau Section Lain... */}
    </div>
  );
}