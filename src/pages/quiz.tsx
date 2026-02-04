import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const questions = [
  {
    question: "Saat memiliki tugas sekolah dan ingin bermain game, saya biasanya …",
    options: ["Menyelesaikan tugas terlebih dahulu", "Menunda tugas sebentar lalu mengerjakannya", "Bermain game dulu baru mengerjakan tugas", "Mengabaikan tugas demi bermain game"],
    answer: 0,
    explanation: "Mengutamakan kewajiban menunjukkan self-control yang baik."
  },
  {
    question: "Ketika waktu bermain game sudah habis, saya akan …",
    options: ["Berhenti bermain sesuai rencana", "Menambah waktu sedikit", "Terus bermain hingga merasa puas", "Mengabaikan batas waktu yang dibuat"],
    answer: 0,
    explanation: "Mampu berhenti sesuai batas waktu adalah bentuk pengendalian diri."
  },
  {
    question: "Jika tidak bisa bermain game, perasaan saya adalah …",
    options: ["Tetap tenang dan melakukan aktivitas lain", "Sedikit kecewa tetapi bisa menerima", "Merasa kesal dan sulit fokus", "Menjadi marah dan tidak nyaman"],
    answer: 0,
    explanation: "Ketidakbergantungan emosi menunjukkan penggunaan game yang sehat."
  },
  {
    question: "Dampak bermain game terhadap waktu belajar saya adalah …",
    options: ["Tidak mengganggu waktu belajar", "Sedikit mengurangi waktu belajar", "Sering membuat belajar tertunda", "Mengganggu hampir seluruh waktu belajar"],
    answer: 0,
    explanation: "Game yang tidak mengganggu belajar berarti masih terkendali."
  },
  {
    question: "Saat kalah dalam permainan, sikap saya adalah …",
    options: ["Tetap tenang dan berhenti jika perlu", "Merasa kesal namun bisa mengontrol diri", "Emosi dan ingin terus bermain", "Sangat marah dan sulit berhenti"],
    answer: 0,
    explanation: "Mengontrol emosi merupakan bagian dari self-control."
  },
  {
    question: "Ketika sedang belajar, pikiran saya tentang game adalah …",
    options: ["Tetap fokus pada pelajaran", "Terlintas sebentar namun bisa diabaikan", "Sulit berkonsentrasi karena ingin bermain", "Lebih memikirkan game daripada pelajaran"],
    answer: 0,
    explanation: "Fokus belajar menunjukkan prioritas yang tepat."
  },
  {
    question: "Jika orang tua atau guru menegur saya karena bermain game, saya akan …",
    options: ["Menerima dan memperbaiki kebiasaan", "Mendengarkan tetapi masih bermain", "Membantah dan merasa terganggu", "Tetap bermain tanpa menghiraukan teguran"],
    answer: 0,
    explanation: "Sikap terbuka terhadap arahan menunjukkan kedewasaan."
  },
  {
    question: "Cara saya mengatur waktu sehari-hari adalah …",
    options: ["Belajar, bermain, dan istirahat secara seimbang", "Belajar di sela-sela waktu bermain", "Lebih banyak bermain daripada belajar", "Bermain tanpa jadwal yang jelas"],
    answer: 0,
    explanation: "Keseimbangan waktu mencerminkan self-control yang baik."
  },
  {
    question: "Jika waktu bermain game dibatasi, tindakan saya adalah …",
    options: ["Mematuhi aturan yang diberikan", "Mengeluh tetapi tetap mengikuti", "Mencari cara agar tetap bisa bermain", "Bermain secara diam-diam"],
    answer: 0,
    explanation: "Mematuhi aturan menunjukkan pengendalian diri."
  },
  {
    question: "Saat bermain game, kesadaran saya terhadap waktu adalah …",
    options: ["Tetap sadar dan berhenti tepat waktu", "Kadang lupa waktu", "Sering lupa waktu", "Sama sekali tidak memperhatikan waktu"],
    answer: 0,
    explanation: "Kesadaran waktu adalah tanda kontrol diri yang baik."
  },
  {
    question: "Ketika ada tugas mendadak, saya akan …",
    options: ["Menghentikan game dan mengerjakan tugas", "Menyelesaikan satu permainan lalu mengerjakan", "Menunda tugas sampai selesai bermain", "Mengabaikan tugas tersebut"],
    answer: 0,
    explanation: "Tanggung jawab didahulukan menunjukkan sikap positif."
  },
  {
    question: "Pengaruh game terhadap pola tidur saya adalah …",
    options: ["Tidak mengganggu waktu tidur", "Sedikit mengurangi waktu tidur", "Sering membuat tidur larut", "Membuat jadwal tidur tidak teratur"],
    answer: 0,
    explanation: "Pola tidur yang terjaga penting bagi kesehatan dan belajar."
  },
  {
    question: "Saat bermain game, kemampuan saya mengendalikan diri adalah …",
    options: ["Sangat baik dan terkendali", "Cukup baik namun kadang tergoda", "Sulit dikendalikan", "Hampir tidak bisa dikendalikan"],
    answer: 0,
    explanation: "Pengendalian diri yang baik mencegah kecanduan."
  },
  {
    question: "Pilihan saya antara bermain game dan berinteraksi langsung adalah …",
    options: ["Lebih mengutamakan interaksi langsung", "Menyeimbangkan keduanya", "Lebih memilih bermain game", "Menghindari interaksi sosial"],
    answer: 0,
    explanation: "Interaksi sosial penting untuk perkembangan diri."
  },
  {
    question: "Menurut saya, peran self-control dalam bermain game online adalah …",
    options: ["Sangat penting agar tidak kecanduan", "Cukup penting tetapi tidak utama", "Kurang penting", "Tidak penting sama sekali"],
    answer: 0,
    explanation: "Self-control membantu siswa menggunakan game secara sehat."
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    if (showScore && score >= 12) {
      triggerConfetti();
    }
  }, [showScore, score]);

  const handleAnswerClick = (index: number) => {
    const isCorrect = index === questions[currentQuestion].answer;
    if (isCorrect) setScore(score + 1);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

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
        <title>Kuis BK: Self-Control - DiaWeb</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        {/* Header dan Petunjuk hanya tampil saat kuis berlangsung */}
        {!showScore && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black mb-4">
              Kuis BK: Game Online & Self-Control (Kelas XI)
            </h1>
            <div className="bg-slate-800/50 border border-purple-500/30 p-4 rounded-2xl inline-block">
              <p className="text-purple-300 font-medium">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-bold mr-2">
                  PETUNJUK
                </span>
                Pilih satu jawaban yang paling menggambarkan sikap atau tindakan kamu.
              </p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showScore ? (
            <motion.div 
              key="score"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-slate-700 relative"
            >
              <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-4">
                  {score >= 12 ? '👑' : score >= 8 ? '🌟' : '📚'}
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {score >= 12 ? 'SELF-CONTROL MASTER!' : score >= 8 ? 'GOOD JOB!' : 'BELAJAR LAGI YUK!'}
                </h2>
                <p className="text-slate-400 text-lg">
                  Nilai Kamu: <span className="font-bold text-white text-2xl">{score}</span> / {questions.length}
                </p>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-xl font-bold border-b border-slate-700 pb-2">Kunci Jawaban & Penjelasan</h3>
                {questions.map((q, i) => {
                  const userAnswer = answers[i];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div key={i} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'}`}>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-300">Soal {i+1}</span>
                        <span className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {isCorrect ? 'Benar ✅' : 'Salah ❌'}
                        </span>
                      </div>
                      <p className="mb-3 font-medium text-lg">{q.question}</p>
                      {!isCorrect && <p className="text-red-300 text-sm mb-1">Jawaban Kamu: {q.options[userAnswer]}</p>}
                      <p className="text-green-400 text-sm mb-2">Jawaban Benar: {q.options[q.answer]}</p>
                      <div className="bg-slate-900/50 p-3 rounded-lg text-slate-400 text-sm italic">💡 {q.explanation}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
                <button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50">Ulangi Kuis</button>
                <Link href="/video-game" className="bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold text-center transition-all">Kembali ke Materi</Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-slate-800 p-6 md:p-12 rounded-3xl shadow-2xl border border-slate-700"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="bg-slate-700 text-slate-300 px-4 py-1 rounded-full text-sm font-bold">
                  Soal {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-slate-500 text-sm font-mono">DiaWeb Quiz</span>
              </div>

              <div className="w-full bg-slate-700 h-2 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">{questions[currentQuestion].question}</h2>
              
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01, backgroundColor: "#334155" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(index)}
                    className="w-full text-left p-5 rounded-xl border border-slate-600 bg-slate-800/50 hover:border-purple-500 transition-all flex items-center group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-purple-600 text-slate-300 group-hover:text-white flex items-center justify-center mr-4 font-bold transition-colors shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg text-slate-200 group-hover:text-white">{option}</span>
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