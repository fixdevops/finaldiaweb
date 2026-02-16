import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const videos = [
    {
      id: "D-Q9NRWGh4M", 
      title: "Dampak Kecanduan Game pada Otak",
    },
    {
      id: "c6mbU6C2src", 
      title: "Teknik Deep Work & Kontrol Diri",
    }
  ];

  const techniques = [
    {
      title: "Metode 5 Menit",
      description: "Saat ingin main game, tunda selama 5 menit. Gunakan waktu ini untuk bernapas atau minum air.",
      icon: "⏱️"
    },
    {
      title: "Jadwal Terstruktur",
      description: "Gunakan aturan 'Kerja Dulu, Main Kemudian'. Jadikan bermain game sebagai reward tugas.",
      icon: "📅"
    },
    {
      title: "Lingkungan Terkendali",
      description: "Jauhkan perangkat game dari tempat tidur agar tidak tergoda secara konstan.",
      icon: "🚫"
    }
  ];

  const materiLengkap = [
    {
      type: "cardWithImage",
      tahap: "01",
      judul: "Kenali Gejala Kecanduan",
      deskripsiSingkat: "Seringkali kita tidak sadar. Gejalanya meliputi merasa gelisah saat tidak main game, mengabaikan tugas sekolah, hingga pola tidur yang berantakan.",
      imageUrl: "/images/kecanduan-game.png",
      linkTo: "/PembelajaranDetail1",
      warna: "border-red-200 bg-red-50 text-red-700"
    },
    {
      type: "cardWithImage",
      tahap: "02",
      judul: "Teknik Cognitive Reframing",
      deskripsiSingkat: "Belajar mengubah pola pikir otomatis. Ubah kalimat 'Aku harus main sekarang' menjadi kesadaran akan tanggung jawab masa depan.",
      imageUrl: "/images/reframing-otak.png",
      linkTo: "/PembelajaranDetail2",
      warna: "border-blue-200 bg-blue-50 text-blue-700"
    },
    {
      type: "cardWithImage",
      tahap: "03",
      judul: "Metode Pembatasan Fisik",
      deskripsiSingkat: "Ciptakan jarak antara dirimu dan perangkat game. Menaruh ponsel di ruangan berbeda adalah cara efektif membangun 'hambatan' psikologis.",
      imageUrl: "/images/pembatasan-fisik.png",
      linkTo: "/PembelajaranDetail3",
      warna: "border-green-200 bg-green-50 text-green-700"
    }
  ];

  const scrollToLearning = () => {
    const element = document.getElementById('pembelajaran');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>DiaWeb - Edukasi Self-Control</title>
        <meta name="description" content="Edukasi pengendalian diri terhadap kecanduan game" />
      </Head>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Kuasai Dirimu, <br /> Bukan Game-mu
          </motion.h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            Belajar teknik <strong>Self-Control</strong> untuk menyeimbangkan dunia digital dan masa depan yang cerah.
          </p>
          <button 
            onClick={scrollToLearning}
            className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-blue-50 transition-all shadow-xl active:scale-95"
          >
            Mulai Belajar Sekarang
          </button>
        </div>
      </section>

      {/* Definition & Motivation Section */}
      <section className="relative -mt-12 px-4 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20"
          >
            {/* Left: Definition */}
            <div className="bg-white p-10 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🧠</span>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Pengertian Self-Control</h2>
              </div>
              {/* FIXED: Menggunakan &quot; untuk tanda kutip */}
              <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                &quot;Self-control adalah kemampuan individu untuk <span className="text-indigo-600 font-bold">mengatur, mengendalikan, dan mengarahkan</span> perilaku, emosi, serta keputusan agar sesuai dengan tujuan jangka panjang.&quot;
              </p>
            </div>

            {/* Right: Motivation */}
            <div className="bg-indigo-600 p-10 md:p-12 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🎯</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🎯</span>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Skill, Bukan Bakat</h2>
                </div>
                {/* FIXED: Menggunakan &quot; untuk tanda kutip */}
                <p className="text-xl font-bold leading-snug mb-6">
                  Self-control itu bukan bakat, tapi <span className="text-yellow-300">&quot;skill yang bisa dilatih&quot;</span>.
                </p>
                <div className="h-px bg-white/20 w-full mb-6"></div>
                <p className="text-indigo-100 font-medium">
                  Sedikit demi sedikit, kamu bisa tetap main game <span className="inline-block animate-bounce ml-1">🎮</span> tanpa kehilangan masa depanmu <span className="inline-block animate-pulse ml-1">🚀</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teknik Cards */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {techniques.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistik Section */}
      <section className="bg-white py-20 px-4 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Mengapa Harus Mengontrol Diri?</h2>
            <ul className="space-y-4">
              {["Meningkatkan fokus akademik", "Memperbaiki pola tidur", "Hubungan sosial yang sehat"].map((text, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✔</span>
                  <p className="text-gray-700">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-blue-50 p-8 rounded-3xl border-2 border-dashed border-blue-200">
            <p className="italic text-blue-800 text-lg text-center">
              &ldquo;Kemenangan terbesar adalah kemenangan atas diri sendiri.&rdquo; 
              <span className="font-bold mt-2 block">— Plato</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section Pembelajaran */}
      <section id="pembelajaran" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Materi Pembelajaran</h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base">Pahami langkah-langkah ini untuk kendali diri yang lebih baik.</p>
            <div className="w-20 md:w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-6 md:space-y-10">
            {materiLengkap.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 md:p-10 rounded-4xl md:rounded-3xl border-2 shadow-sm ${item.warna}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 rounded-2xl overflow-hidden border-4 border-white shadow-lg w-full max-w-sm mx-auto">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.judul} 
                      width={400} 
                      height={250} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{item.judul}</h3>
                  <p className="text-sm md:text-lg leading-relaxed text-gray-700 mb-6">{item.deskripsiSingkat}</p>
                  <Link href={item.linkTo}>
                    <span className="cursor-pointer bg-linear-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all inline-block text-sm md:text-base">
                      Pelajari Lebih Lanjut
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Video Edukasi */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900">Tonton Video Edukasi</h2>
            <p className="text-gray-500 mt-2">Belajar lebih mudah dengan penjelasan visual yang menarik.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl bg-black aspect-video"
              >
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t bg-white">
        <p>© 2026 DiaWeb Edukasi. Bangga Mengontrol Diri.</p>
      </footer>
    </div>
  );
}