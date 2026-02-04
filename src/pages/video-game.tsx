import Head from 'next/head';
import { motion } from 'framer-motion';
import SelfControlQuiz from '../components/SelfControlQuiz';
import GamingSchedulePlanner from '../components/GamingSchedulePlanner';

const VideoGamePage = () => {
  const recommendedGames = [
    {
      id: 1,
      title: "Minecraft",
      genre: "Sandbox, Kreativitas",
      description: "Melatih perencanaan, manajemen sumber daya, dan kreativitas tanpa batas. Membangun dunia sendiri membutuhkan kesabaran dan fokus.",
      // Gambar resmi Minecraft
      imageUrl: "https://www.minecraft.net/content/dam/games/minecraft/key-art/Minecraft-Vanilla-KeyArt-600x337.jpg", 
      link: "https://www.minecraft.net/"
    },
    {
      id: 2,
      title: "Factorio",
      genre: "Strategi, Otomasi",
      description: "Game membangun pabrik yang sangat kompleks. Memerlukan perencanaan jangka panjang, pemecahan masalah, dan kontrol terhadap efisiensi.",
      // Gambar resmi Factorio
      imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/427520/capsule_616x353.jpg", 
      link: "https://factorio.com/"
    },
    {
      id: 3,
      title: "Stardew Valley",
      genre: "Simulasi Kehidupan, RPG",
      description: "Mengatur pertanian, berinteraksi sosial, dan mengelola waktu. Memerlukan kesabaran dan manajemen prioritas harian.",
      // Gambar resmi Stardew Valley
      imageUrl: "https://stardewvalley.net/wp-content/uploads/2016/02/Header-1.png", 
      link: "https://www.stardewvalley.net/"
    },
    {
      id: 4,
      title: "Kerbal Space Program",
      genre: "Simulasi, Sains",
      description: "Merancang, meluncurkan, dan mengoperasikan pesawat ruang angkasa. Membutuhkan pemahaman fisika, kesabaran ekstrem, dan penyelesaian masalah.",
      // Gambar resmi KSP
      imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/220200/capsule_616x353.jpg", 
      link: "https://www.kerbalspaceprogram.com/"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Game Edukatif - DiaWeb</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900 text-white py-24 px-4 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Game Online yang Membangun
          </motion.h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Temukan game yang tidak hanya seru, tapi juga melatih fokus, kreativitas, dan <span className="text-white font-bold underline decoration-purple-400">Self-Control</span> Anda!
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 font-black py-4 px-10 rounded-2xl shadow-2xl hover:bg-purple-50 transition-all"
          >
            Jelajahi Rekomendasi
          </motion.button>
        </div>
      </section>

      {/* --- GAME LIST SECTION --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Pilihan Game Edukatif</h2>
            <p className="text-slate-500 text-lg">Gunakan waktu bermain Anda untuk mengasah logika dan pengendalian diri.</p>
          </div>
          <div className="hidden md:block w-24 h-2 bg-purple-500 rounded-full mb-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {recommendedGames.map((game) => (
            <motion.div 
              key={game.id} 
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-purple-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {game.genre.split(',')[0]}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <h3 className="text-3xl font-black text-slate-900 mb-4">{game.title}</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed flex-1">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Verified Educational Content</span>
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Kunjungi Situs Game
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- QUIZ SECTION --- */}
      <section className="bg-gradient-to-b from-slate-50 to-indigo-50 py-24 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-indigo-600 font-black tracking-widest uppercase text-sm mb-4 block">Self-Assessment</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Seberapa Baik Self-Control Kamu?</h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Main game itu seru, tapi jangan sampai lupa waktu. Yuk, ikuti kuis singkat ini untuk mengetahui tipe gamer seperti apa kamu!
          </p>
        </div>
        <SelfControlQuiz />
      </section>



      {/* --- SCHEDULE SECTION --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <GamingSchedulePlanner />
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-slate-900 text-white py-20 px-4 mx-4 mb-20 rounded-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black mb-6 italic">"Bermain dengan Bijak, Tumbuh dengan Hebat"</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Game adalah alat belajar yang luar biasa jika Anda mampu menetapkan batas waktu. <br className="hidden md:block"/> Disiplin adalah kunci utama kemenangan sejati.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 text-white font-black py-4 px-12 rounded-2xl shadow-xl shadow-purple-900/40 hover:bg-purple-400 transition-all"
          >
            Kembali ke Beranda
          </motion.button>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 border-t border-slate-100">
        <p className="font-medium">© 2026 DiaWeb Edukasi. Sumber Game Pilihan untuk Kontrol Diri.</p>
      </footer>
    </div>
  );
};

export default VideoGamePage;