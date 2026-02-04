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
  // ... (Data pertanyaan tetap sama seperti milikmu)
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
  // Tambahkan pertanyaan lainnya di sini...
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
                "{getEncouragement(calculateScore())}"
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
                            <p className="text-slate-700 mt-2 leading-relaxed italic">"{q.explanation}"</p>
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