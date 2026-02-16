import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Option = {
  key: string;
  text: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
  correctKey: string;
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Saat memiliki tugas sekolah dan ingin bermain game, saya biasanya …",
    options: [
      { key: 'A', text: "Menyelesaikan tugas terlebih dahulu" },
      { key: 'B', text: "Menunda tugas sebentar lalu mengerjakannya" },
      { key: 'C', text: "Bermain game dulu baru mengerjakan tugas" },
      { key: 'D', text: "Mengabaikan tugas demi bermain game" }
    ],
    correctKey: 'A',
    explanation: "Mengutamakan kewajiban menunjukkan self-control yang baik."
  },
  {
    id: 2,
    question: "Jika orang tua menegur saat saya bermain game, saya …",
    options: [
      { key: 'A', text: "Langsung menghentikan permainan" },
      { key: 'B', text: "Mengurangi waktu bermain" },
      { key: 'C', text: "Menjawab dengan kesal tapi berhenti" },
      { key: 'D', text: "Mengabaikan dan tetap bermain" }
    ],
    correctKey: 'A',
    explanation: "Merespon teguran dengan bijak menunjukkan kedewasaan dalam mengendalikan tindakan."
  },
  {
    id: 3,
    question: "Ketika teman mengajak bermain game padahal ada tugas sekolah, saya …",
    options: [
      { key: 'A', text: "Menolak dan fokus mengerjakan tugas" },
      { key: 'B', text: "Bermain setelah tugas selesai" },
      { key: 'C', text: "Bermain sebentar saja" },
      { key: 'D', text: "Selalu ikut bermain" }
    ],
    correctKey: 'A',
    explanation: "Mampu memprioritaskan tugas di atas ajakan teman adalah tanda kontrol diri yang kuat."
  },
  {
    id: 4,
    question: "Dalam sehari, waktu yang saya gunakan untuk bermain game adalah …",
    options: [
      { key: 'A', text: "Kurang dari 1 jam" },
      { key: 'B', text: "1–2 jam" },
      { key: 'C', text: "3-4 jam" },
      { key: 'D', text: "Lebih dari 4 jam" }
    ],
    correctKey: 'A',
    explanation: "Manajemen waktu yang baik mencegah risiko kecanduan game online."
  },
  {
    id: 5,
    question: "Saat merasa bosan, saya …",
    options: [
      { key: 'A', text: "Melakukan aktivitas lain selain game" },
      { key: 'B', text: "Kadang bermain, kadang melakukan hal lain" },
      { key: 'C', text: "Mencari teman untuk bermain game" },
      { key: 'D', text: "Langsung bermain game" }
    ],
    correctKey: 'A',
    explanation: "Memiliki variasi aktivitas selain game membantu menjaga kesehatan mental."
  },
  {
    id: 6,
    question: "Menurut saya, bermain game berlebihan …",
    options: [
      { key: 'A', text: "Bisa berdampak buruk bagi sekolah dan masa depan" },
      { key: 'B', text: "Ada dampak, tapi tidak terlalu besar" },
      { key: 'C', text: "Hanya hiburan biasa" },
      { key: 'D', text: "Tidak berdampak apa-apa" }
    ],
    correctKey: 'A',
    explanation: "Kesadaran akan dampak negatif adalah langkah pertama untuk berubah."
  },
  {
    id: 7,
    question: "Sebelum bermain game, saya biasanya …",
    options: [
      { key: 'A', text: "Memikirkan kewajiban dan dampaknya terlebih dahulu" },
      { key: 'B', text: "Kadang memikirkan tugas yang ada" },
      { key: 'C', text: "Hanya memikirkan strategi game" },
      { key: 'D', text: "Langsung bermain tanpa berpikir" }
    ],
    correctKey: 'A',
    explanation: "Berpikir sebelum bertindak membantu kamu mengambil keputusan yang lebih logis."
  },
  {
    id: 8,
    question: "Jika nilai sekolah menurun, saya berpikir bahwa …",
    options: [
      { key: 'A', text: "Game bisa menjadi penyebab utama" },
      { key: 'B', text: "Game sedikit berpengaruh" },
      { key: 'C', text: "Mungkin karena kurang belajar saja" },
      { key: 'D', text: "Itu bukan karena game" }
    ],
    correctKey: 'A',
    explanation: "Kejujuran pada diri sendiri mengenai penyebab masalah adalah bentuk kontrol kognitif."
  },
  {
    id: 9,
    question: "Saya menganggap belajar dan masa depan saya …",
    options: [
      { key: 'A', text: "Lebih penting daripada game" },
      { key: 'B', text: "Sama penting dengan game" },
      { key: 'C', text: "Prioritas kedua setelah game" },
      { key: 'D', text: "Kurang penting dibanding game" }
    ],
    correctKey: 'A',
    explanation: "Menetapkan prioritas jangka panjang di atas kesenangan sesaat sangatlah krusial."
  },
  {
    id: 10,
    question: "Saat ingin bermain game berlebihan, saya …",
    options: [
      { key: 'A', text: "Mengingat dampak negatifnya" },
      { key: 'B', text: "Ragu-ragu" },
      { key: 'C', text: "Menunda sebentar saja" },
      { key: 'D', text: "Menuruti keinginan tersebut" }
    ],
    correctKey: 'A',
    explanation: "Mengingat konsekuensi saat muncul keinginan kuat membantu menekan impulsivitas."
  },
  {
    id: 11,
    question: "Jika saya memiliki waktu luang, saya akan …",
    options: [
      { key: 'A', text: "Mengatur waktu untuk hal yang lebih bermanfaat" },
      { key: 'B', text: "Bermain game sebentar" },
      { key: 'C', text: "Melihat konten game di media sosial" },
      { key: 'D', text: "Menghabiskannya untuk bermain game" }
    ],
    correctKey: 'A',
    explanation: "Kemampuan membuat keputusan menentukan kualitas penggunaan waktu luangmu."
  },
  {
    id: 12,
    question: "Saya membuat aturan bermain game untuk diri sendiri …",
    options: [
      { key: 'A', text: "Selalu berusaha konsisten" },
      { key: 'B', text: "Kadang-kadang" },
      { key: 'C', text: "Hanya saat dilarang orang tua" },
      { key: 'D', text: "Tidak pernah" }
    ],
    correctKey: 'A',
    explanation: "Disiplin terhadap aturan diri sendiri adalah kunci sukses dalam mengelola hobi."
  },
  {
    id: 13,
    question: "Saat harus memilih antara tugas dan game, saya …",
    options: [
      { key: 'A', text: "Memilih menyelesaikan tugas" },
      { key: 'B', text: "Tergantung tingkat kesulitan tugas" },
      { key: 'C', text: "Mengerjakan tugas sambil main game" },
      { key: 'D', text: "Memilih game" }
    ],
    correctKey: 'A',
    explanation: "Keputusan untuk menyelesaikan tanggung jawab terlebih dahulu mencerminkan kematangan diri."
  },
  {
    id: 14,
    question: "Jika sudah melewati batas waktu bermain, saya …",
    options: [
      { key: 'A', text: "Langsung berhenti bermain" },
      { key: 'B', text: "Menghentikan setelah satu ronde lagi" },
      { key: 'C', text: "Menambah waktu 15 menit saja" },
      { key: 'D', text: "Tetap melanjutkan permainan" }
    ],
    correctKey: 'A',
    explanation: "Ketegasan dalam berhenti saat waktu habis mencegah pola perilaku kompulsif."
  },
  {
    id: 15,
    question: "Saya merasa mampu mengendalikan keputusan saya dalam bermain game …",
    options: [
      { key: 'A', text: "Sangat mampu" },
      { key: 'B', text: "Cukup mampu" },
      { key: 'C', text: "Kurang mampu" },
      { key: 'D', text: "Tidak mampu" }
    ],
    correctKey: 'A',
    explanation: "Kepercayaan diri dalam mengontrol keputusan memperkuat niat untuk tetap disiplin."
  }
];

const SelfControlQuiz = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (questionId: number, optionKey: string) => {
    if (showResult) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const calculateScore = () => {
    return questions.reduce((score, q) => {
      return answers[q.id] === q.correctKey ? score + 1 : score;
    }, 0);
  };

  const getEncouragement = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Luar Biasa! Kamu adalah master self-control! 👑";
    if (percentage >= 80) return "Hebat! Kamu punya kendali diri yang sangat baik. 🌟";
    if (percentage >= 60) return "Bagus, tapi masih ada ruang untuk ditingkatkan. ✨";
    return "Yuk, mulai latih kontrol dirimu agar lebih seimbang! 📚";
  };

  const allAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
         </div>
        <h2 className="text-3xl font-black mb-2 relative z-10">Kuis BK: Game Online & Self-Control</h2>
        <p className="opacity-90 relative z-10 text-lg mb-4">Seberapa kuat kendali dirimu saat bermain? Cek di sini!</p>
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 inline-block">
          <p className="font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="bg-white text-indigo-600 px-2 py-0.5 rounded text-xs font-black uppercase tracking-wider shrink-0">Petunjuk</span>
            Pilih satu jawaban yang paling menggambarkan sikap kamu.
          </p>
        </div>
      </div>

      <div className="p-4 md:p-8 bg-slate-50">
        {!showResult ? (
          <div className="space-y-8">
            {questions.map((q, index) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all duration-300 ${answers[q.id] ? 'border-indigo-100' : 'border-transparent'}`}
              >
                <div className="mb-4">
                  <span className="inline-block bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-lg text-sm mb-2">Soal {index + 1}</span>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">{q.question}</h3>
                </div>
                
                <div className="grid gap-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionSelect(q.id, opt.key)}
                      className={`text-left px-5 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-4
                        ${answers[q.id] === opt.key 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md translate-x-1' 
                          : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                        ${answers[q.id] === opt.key ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                        {answers[q.id] === opt.key && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="pt-8 flex flex-col items-center gap-3">
              <button 
                onClick={() => {
                    setShowResult(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!allAnswered}
                className={`py-4 px-12 rounded-2xl font-black text-xl shadow-xl transition-all duration-300
                  ${allAnswered 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-200 hover:scale-105 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                {allAnswered ? 'Lihat Hasil Kuis 🚀' : 'Jawab Semua Dulu Ya!'}
              </button>
              {!allAnswered && (
                <p className="text-slate-400 text-sm italic">
                   Progress: {Object.keys(answers).length} dari {questions.length} soal
                </p>
              )}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            {/* Score Card */}
            <div className="bg-indigo-900 text-white rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10 text-indigo-200 uppercase tracking-widest">Skor Kamu</h3>
              <div className="text-8xl font-black text-white mb-6 relative z-10 drop-shadow-2xl">
                {calculateScore()}<span className="text-3xl text-indigo-400">/{questions.length}</span>
              </div>
              <p className="text-xl font-medium text-purple-100 italic relative z-10 max-w-md mx-auto leading-relaxed">
                &quot;{getEncouragement(calculateScore())}&quot;
              </p>
              <button 
                onClick={() => {
                  setAnswers({});
                  setShowResult(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-8 bg-white text-indigo-900 px-10 py-3 rounded-xl font-black hover:bg-indigo-50 transition-all shadow-lg hover:shadow-white/20 active:scale-95 relative z-10"
              >
                ULANGI KUIS
              </button>
            </div>

            {/* Answer Review */}
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-slate-800 border-b-4 border-indigo-100 pb-2 inline-block">Review Jawaban</h4>
              {questions.map((q, index) => {
                const isCorrect = answers[q.id] === q.correctKey;
                return (
                  <div 
                    key={q.id}
                    className={`p-6 rounded-2xl border-l-8 shadow-sm transition-all
                      ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1 shadow-md
                        ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                         <h5 className="font-bold text-slate-800 text-lg mb-3">{q.question}</h5>
                         
                         <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-green-100/50 border-green-200' : 'bg-red-100/50 border-red-200'}`}>
                                <p className="text-xs font-bold uppercase text-slate-500 mb-1">Jawaban Kamu:</p>
                                <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                    {q.options.find(o => o.key === answers[q.id])?.text}
                                </p>
                            </div>
                            {!isCorrect && (
                                <div className="p-3 rounded-xl border bg-white/60 border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">Jawaban Seharusnya:</p>
                                    <p className="font-bold text-slate-700">
                                        {q.options.find(o => o.key === q.correctKey)?.text}
                                    </p>
                                </div>
                            )}
                         </div>

                         <div className="bg-white/80 p-4 rounded-xl border border-slate-200 shadow-inner">
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                                Penjelasan Psikologis
                            </span>
                            <p className="text-slate-700 mt-2 leading-relaxed italic">&quot;{q.explanation}&quot;</p>
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SelfControlQuiz;