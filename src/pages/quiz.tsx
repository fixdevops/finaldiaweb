import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const questions = [
  // ... (pertanyaan tetap sama seperti sebelumnya)
  {
    question: "Apa tujuan utama dari teknik 'Metode 5 Menit'?",
    options: ["Bermain game selama 5 menit", "Menunda dorongan agar keinginan berkurang", "Menghapus semua game dalam 5 menit", "Mencari teman mabar dalam 5 menit"],
    answer: 1
  },
  {
    question: "Apa yang dimaksud dengan 'Cognitive Reframing'?",
    options: ["Mengganti PC dengan konsol", "Mengubah pola pikir negatif menjadi produktif", "Mengingat-ingat skor tertinggi", "Berhenti sekolah untuk fokus gaming"],
    answer: 1
  },
  {
    question: "Manakah contoh 'Pembatasan Fisik' yang benar?",
    options: ["Menaruh HP di bawah bantal", "Meletakkan konsol di ruangan berbeda saat belajar", "Main game sambil berdiri", "Memegang kontroler sepanjang hari"],
    answer: 1
  },
  {
    question: "Apa salah satu gejala awal kecanduan game online?",
    options: ["Menjadi lebih pintar", "Gelisah/iritasi saat tidak bisa bermain", "Ingin makan banyak sayur", "Rajin mengerjakan tugas"],
    answer: 1
  },
  {
    question: "Apa manfaat utama menggunakan 'App Timer'?",
    options: ["Mempercepat koneksi internet", "Melihat spesifikasi HP", "Membatasi durasi bermain secara otomatis", "Merekam gameplay"],
    answer: 2
  },
  {
    question: "Kemenangan terbesar menurut Plato adalah kemenangan atas...",
    options: ["Musuh di dalam game", "Diri sendiri", "Turnamen Esports", "Skor tertinggi"],
    answer: 1
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Fungsi untuk memicu kembang api kertas (Confetti)
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Kembang api dari kiri dan kanan
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // Jalankan confetti saat nilai ditampilkan
  useEffect(() => {
    if (showScore && score >= 4) {
      triggerConfetti();
    }
  }, [showScore, score]);

  const handleAnswerClick = (index: number) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 overflow-hidden text-white">
      <Head>
        <title>Victory Quiz - DiaWeb</title>
      </Head>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {showScore ? (
            <motion.div 
              key="score"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="bg-slate-800 p-10 text-center rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.5)] border-2 border-blue-500 relative"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-6"
              >
                {score >= 4 ? '👑' : '📖'}
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              >
                {score >= 4 ? 'VICTORY!' : 'KEEP LEARNING!'}
              </motion.h2>

              <p className="text-slate-300 mb-8 text-xl">
                Kamu berhasil menguasai <span className="font-bold text-blue-400">{score}/{questions.length}</span> materi Self-Control!
              </p>

              <div className="flex flex-col gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 py-4 rounded-2xl font-black tracking-widest uppercase"
                >
                  Main Lagi
                </motion.button>
                <Link href="/">
                  <div className="w-full bg-slate-700 py-4 rounded-2xl font-bold opacity-70 hover:opacity-100 transition-opacity">
                    Kembali ke Menu Utama
                  </div>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Bagian Pertanyaan (Tetap menggunakan Framer Motion dari sebelumnya) */
            <motion.div 
              key={currentQuestion}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700"
            >
              <div className="w-full bg-slate-700 h-3 rounded-full mb-10">
                <motion.div 
                  className="bg-blue-500 h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].question}</h2>
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "#1e293b" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(index)}
                    className="w-full text-left p-5 rounded-2xl border border-slate-600 hover:border-blue-500 transition-all flex items-center"
                  >
                    <span className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mr-4 font-bold text-blue-400">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}