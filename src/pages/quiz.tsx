import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import dynamic from 'next/dynamic';
import { ChartProps } from 'react-chartjs-2';

// Dynamically import Chart component
const Bar = dynamic<ChartProps<"bar">>(() => import('react-chartjs-2').then((mod) => mod.Bar), { 
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center text-slate-500 bg-slate-900/20 rounded-xl">Memuat Grafik...</div>
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const questions = [
  // A. Behavioral Control
  {
    category: "Behavioral Control",
    question: "1. Saat sedang bermain game dan waktu belajar tiba, saya akan …",
    options: ["A. Tetap bermain sampai bosan", "B. Bermain sebentar lalu berhenti", "C. Langsung berhenti dan mulai belajar"],
    explanation: "Kemampuan mengendalikan perilaku (Behavioral Control) sangat penting untuk menjaga keseimbangan antara hobi dan kewajiban."
  },
  {
    category: "Behavioral Control",
    question: "2. Jika orang tua menegur saat saya bermain game, saya …",
    options: ["A. Mengabaikan dan tetap bermain", "B. Mengurangi waktu bermain", "C. Langsung menghentikan permainan"],
    explanation: "Merespon teguran dengan bijak menunjukkan kedewasaan dalam mengendalikan tindakan."
  },
  {
    category: "Behavioral Control",
    question: "3. Ketika teman mengajak bermain game padahal ada tugas sekolah, saya …",
    options: ["A. Selalu ikut bermain", "B. Bermain setelah tugas selesai", "C. Menolak dan fokus mengerjakan tugas"],
    explanation: "Mampu memprioritaskan tugas di atas ajakan teman adalah tanda kontrol diri yang kuat."
  },
  {
    category: "Behavioral Control",
    question: "4. Dalam sehari, waktu yang saya gunakan untuk bermain game adalah …",
    options: ["A. Lebih dari 4 jam", "B. 1–3 jam", "C. Kurang dari 1 jam"],
    explanation: "Manajemen waktu yang baik mencegah risiko kecanduan game online."
  },
  {
    category: "Behavioral Control",
    question: "5. Saat merasa bosan, saya …",
    options: ["A. Langsung bermain game", "B. Kadang bermain, kadang melakukan hal lain", "C. Melakukan aktivitas lain selain game"],
    explanation: "Memiliki variasi aktivitas selain game membantu menjaga kesehatan mental."
  },
  // B. Cognitive Control
  {
    category: "Cognitive Control",
    question: "6. Menurut saya, bermain game berlebihan …",
    options: ["A. Tidak berdampak apa-apa", "B. Ada dampak, tapi tidak terlalu besar", "C. Bisa berdampak buruk bagi sekolah dan masa depan"],
    explanation: "Kesadaran akan dampak negatif (Cognitive Control) adalah langkah pertama untuk berubah."
  },
  {
    category: "Cognitive Control",
    question: "7. Sebelum bermain game, saya biasanya …",
    options: ["A. Langsung bermain tanpa berpikir", "B. Kadang memikirkan tugas yang ada", "C. Memikirkan kewajiban dan dampaknya terlebih dahulu"],
    explanation: "Berpikir sebelum bertindak membantu kamu mengambil keputusan yang lebih logis."
  },
  {
    category: "Cognitive Control",
    question: "8. Jika nilai sekolah menurun, saya berpikir bahwa …",
    options: ["A. Itu bukan karena game", "B. Game sedikit berpengaruh", "C. Game bisa menjadi penyebab utama"],
    explanation: "Kujujuran pada diri sendiri mengenai penyebab masalah adalah bentuk kontrol kognitif."
  },
  {
    category: "Cognitive Control",
    question: "9. Saya menganggap belajar dan masa depan saya …",
    options: ["A. Kurang penting dibanding game", "B. Sama penting dengan game", "C. Lebih penting daripada game"],
    explanation: "Menetapkan prioritas jangka panjang di atas kesenangan sesaat sangatlah krusial."
  },
  {
    category: "Cognitive Control",
    question: "10. Saat ingin bermain game berlebihan, saya …",
    options: ["A. Menuruti keinginan tersebut", "B. Ragu-ragu", "C. Mengingat dampak negatifnya"],
    explanation: "Mengingat konsekuensi saat muncul keinginan kuat membantu menekan impulsivitas."
  },
  // C. Decisional Control
  {
    category: "Decisional Control",
    question: "11. Jika saya memiliki waktu luang, saya akan …",
    options: ["A. Menghabiskannya untuk bermain game", "B. Bermain game sebentar", "C. Mengatur waktu untuk hal yang lebih bermanfaat"],
    explanation: "Kemampuan membuat keputusan (Decisional Control) menentukan kualitas penggunaan waktu luangmu."
  },
  {
    category: "Decisional Control",
    question: "12. Saya membuat aturan bermain game untuk diri sendiri …",
    options: ["A. Tidak pernah", "B. Kadang-kadang", "C. Selalu berusaha konsisten"],
    explanation: "Disiplin terhadap aturan diri sendiri adalah kunci sukses dalam mengelola hobi."
  },
  {
    category: "Decisional Control",
    question: "13. Saat harus memilih antara tugas dan game, saya …",
    options: ["A. Memilih game", "B. Kadang tugas, kadang game", "C. Memilih menyelesaikan tugas"],
    explanation: "Keputusan untuk menyelesaikan tanggung jawab terlebih dahulu mencerminkan kematangan diri."
  },
  {
    category: "Decisional Control",
    question: "14. Jika sudah melewati batas waktu bermain, saya …",
    options: ["A. Tetap melanjutkan permainan", "B. Menghentikan setelah satu ronde lagi", "C. Langsung berhenti bermain"],
    explanation: "Ketegasan dalam berhenti saat waktu habis mencegah pola perilaku kompulsif."
  },
  {
    category: "Decisional Control",
    question: "15. Saya merasa mampu mengendalikan keputusan saya dalam bermain game …",
    options: ["A. Tidak mampu", "B. Cukup mampu", "C. Sangat mampu"],
    explanation: "Kepercayaan diri dalam mengontrol keputusan memperkuat niat untuk tetap disiplin."
  }
];

export default function QuizPage() {
  const [step, setStep] = useState<'START' | 'QUIZ' | 'RESULT'>('START');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculateTotalScore = useCallback(() => {
    return answers.reduce((acc, curr) => acc + (curr + 1), 0);
  }, [answers]);

  const calculateCategoryScores = useCallback(() => {
    const behavioral = answers.slice(0, 5).reduce((acc, curr) => acc + (curr + 1), 0);
    const cognitive = answers.slice(5, 10).reduce((acc, curr) => acc + (curr + 1), 0);
    const decisional = answers.slice(10, 15).reduce((acc, curr) => acc + (curr + 1), 0);
    return { behavioral, cognitive, decisional };
  }, [answers]);

  const getInterpretation = (score: number) => {
    if (score >= 36) return {
      level: "Self Control Tinggi",
      description: "Hebat! Kamu mampu mengontrol diri and menjadikan game hanya sebagai hiburan.",
      color: "text-green-400",
      bgBorder: "border-green-500/50",
      emoji: "🏆"
    };
    if (score >= 26) return {
      level: "Self Control Sedang",
      description: "Kamu sudah mulai bisa mengatur diri, tetapi masih perlu konsistensi.",
      color: "text-yellow-400",
      bgBorder: "border-yellow-500/50",
      emoji: "🌟"
    };
    return {
      level: "Self Control Rendah (Ringan)",
      description: "Kamu masih sulit mengendalikan diri dalam bermain game and perlu bimbingan lebih lanjut.",
      color: "text-red-400",
      bgBorder: "border-red-500/50",
      emoji: "📚"
    };
  };

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  useEffect(() => {
    if (step === 'RESULT') {
      const score = calculateTotalScore();
      if (score >= 36) triggerConfetti();
    }
  }, [step, calculateTotalScore, triggerConfetti]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName && studentClass) {
      setStep('QUIZ');
    } else {
      alert('Tolong isi nama dan kelas kamu ya!');
    }
  };

  const handleAnswerClick = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setStep('RESULT');
    }
  };

  const downloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      const { jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF('p', 'mm', 'a4'); // Formal Portrait for table
      const totalScore = calculateTotalScore();
      const interpretation = getInterpretation(totalScore);
      const catScores = calculateCategoryScores();
      
      // Header
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42); // Slate 900
      pdf.text('NOGAMEADDICTION', 105, 20, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139); // Slate 500
      pdf.text('LAPORAN HASIL ANALISIS SELF-CONTROL SISWA', 105, 26, { align: 'center' });
      
      // Line separator
      pdf.setDrawColor(203, 213, 225); // Slate 200
      pdf.line(20, 32, 190, 32);
      
      // Student Bio
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Informasi Siswa:', 20, 45);
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Nama Lengkap : ${studentName.toUpperCase()}`, 20, 52);
      pdf.text(`Kelas                : ${studentClass.toUpperCase()}`, 20, 58);
      pdf.text(`Tanggal Periksa : ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, 64);
      
      // Table Header logic
      const tableTop = 80;
      pdf.setFillColor(241, 245, 249); // Slate 100
      pdf.rect(20, tableTop, 170, 10, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('ASPEK SELF-CONTROL', 25, tableTop + 7);
      pdf.text('SKOR', 160, tableTop + 7);
      
      // Table Content
      pdf.setFont('helvetica', 'normal');
      const rowHeight = 10;
      
      pdf.text('1. Behavioral Control (Kontrol Perilaku)', 25, tableTop + rowHeight + 7);
      pdf.text(`${catScores.behavioral} / 15`, 160, tableTop + rowHeight + 7);
      pdf.line(20, tableTop + rowHeight + 10, 190, tableTop + rowHeight + 10);
      
      pdf.text('2. Cognitive Control (Kontrol Pikiran)', 25, tableTop + (rowHeight * 2) + 7);
      pdf.text(`${catScores.cognitive} / 15`, 160, tableTop + (rowHeight * 2) + 7);
      pdf.line(20, tableTop + (rowHeight * 2) + 10, 190, tableTop + (rowHeight * 2) + 10);
      
      pdf.text('3. Decisional Control (Kontrol Keputusan)', 25, tableTop + (rowHeight * 3) + 7);
      pdf.text(`${catScores.decisional} / 15`, 160, tableTop + (rowHeight * 3) + 7);
      pdf.line(20, tableTop + (rowHeight * 3) + 10, 190, tableTop + (rowHeight * 3) + 10);
      
      // Total Score Row
      pdf.setFillColor(248, 250, 252);
      pdf.rect(20, tableTop + (rowHeight * 4), 170, 12, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.text('TOTAL SKOR KUMULATIF', 25, tableTop + (rowHeight * 4) + 8);
      pdf.text(`${totalScore} / 45`, 160, tableTop + (rowHeight * 4) + 8);
      
      // Interpretation
      pdf.setFontSize(14);
      pdf.text('INTERPRETASI HASIL:', 20, 140);
      pdf.setFontSize(16);
      pdf.setTextColor(
        totalScore >= 36 ? 34 : totalScore >= 26 ? 234 : 239, 
        totalScore >= 36 ? 197 : totalScore >= 26 ? 179 : 68, 
        totalScore >= 36 ? 94 : totalScore >= 26 ? 8 : 68
      ); // dynamic color RGBish for red/yellow/green
      pdf.text(interpretation.level.toUpperCase(), 20, 150);
      
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105); // Slate 600
      pdf.setFont('helvetica', 'normal');
      const splitDesc = pdf.splitTextToSize(interpretation.description, 170);
      pdf.text(splitDesc, 20, 160);
      
      // Footer / Recommendation
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('Saran:', 20, 185);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Game bisa ditunda, tapi masa depan tidak bisa diulang.', 20, 192);
      
      // Official stamp-like area
      pdf.setDrawColor(226, 232, 240);
      pdf.rect(140, 220, 40, 40);
      pdf.setFontSize(8);
      pdf.text('Dokumen Sah', 160, 255, { align: 'center' });
      pdf.text('NOGAMEADDICTION', 160, 258, { align: 'center' });
      
      pdf.save(`Laporan_SelfControl_${studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Terjadi kesalahan saat membuat laporan PDF text.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const catScores = calculateCategoryScores();
  const totalScore = calculateTotalScore();
  const interpretation = getInterpretation(totalScore);

  const chartData = {
    labels: ['Behavioral Control', 'Cognitive Control', 'Decisional Control'],
    datasets: [
      {
        label: 'Skor Kamu',
        data: [catScores.behavioral, catScores.cognitive, catScores.decisional],
        backgroundColor: [
          '#a855f7', // Static hex: Purple
          '#3b82f6', // Static hex: Blue
          '#ec4899', // Static hex: Pink
        ],
        borderColor: [
          '#9333ea',
          '#2563eb',
          '#db2777',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 15,
        ticks: { color: '#94a3b8', font: { weight: 'bold' as const } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      },
      x: {
        ticks: { color: '#94a3b8', font: { weight: 'bold' as const } },
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Distribusi Kontrol Diri',
        color: '#f8fafc',
        font: { size: 16, weight: 'bold' as const },
        padding: 20
      }
    },
    animation: false as const,
  };

  // Use Bar component directly
    const BarChart = Bar;

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 text-white font-sans">
      <Head>
        <title>Kuis Self Control - Nogameaddiction</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'START' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700 max-w-lg mx-auto"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 text-center">🎮</div>
                <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Self-Control Quiz
                </h1>
                <p className="text-slate-400">
                  Cek seberapa kuat kendali dirimu terhadap game online. Masukkan datamu dulu ya!
                </p>
              </div>

              <form onSubmit={handleStart} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Kelas</label>
                  <input
                    type="text"
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="Contoh: VII-A"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-purple-900/40 text-lg uppercase tracking-widest"
                >
                  Mulai Kuis 🚀
                </button>
              </form>
            </motion.div>
          )}

          {step === 'QUIZ' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-slate-800 p-6 md:p-12 rounded-3xl shadow-2xl border border-slate-700"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="bg-slate-700 text-slate-300 px-4 py-1 rounded-full text-sm font-bold">
                  Soal {currentQuestion + 1} / {questions.length}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-purple-400 font-bold">{questions[currentQuestion].category}</span>
                  <span className="text-slate-500 text-xs font-mono">Nogameaddiction</span>
                </div>
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

          {step === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              ref={resultRef}
              className="bg-slate-800 p-6 md:p-10 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden flex flex-col gap-6 mx-auto w-full"
              style={{ maxWidth: '1120px' }} // Max-width on desktop, 100% on mobile
            >
              <div className="pdf-capture-container flex flex-col gap-6">
                {/* PDF Formal Header */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">NOGAMEADDICTION</h1>
                    <p className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold">Laporan Analisis Kontrol Diri Siswa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] md:text-[9px] text-slate-500 font-mono italic">ID: NGA-{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-[8px] md:text-[9px] text-slate-500 font-mono">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                {/* Main Interpretation Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-slate-900/40 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5">
                  <div className="text-5xl md:text-7xl shrink-0 drop-shadow-2xl">{interpretation.emoji}</div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
                       <span className={interpretation.color}>{interpretation.level}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-xs md:text-base text-slate-400 font-semibold">
                        <p>Nama: <span className="text-white uppercase">{studentName}</span></p>
                        <p>Kelas: <span className="text-white uppercase">{studentClass}</span></p>
                    </div>
                  </div>
                </div>

                {/* 3-Column Content - Stacks on mobile for view, stays grid for PDF */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Column 1: Analysis */}
                  <div className="bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-white/10 flex flex-col justify-between shadow-inner order-2 md:order-1">
                      <h3 className="text-base md:text-lg font-bold mb-4 flex items-center gap-2 text-indigo-300">
                          <span className="p-1.5 bg-indigo-500/20 rounded-md text-xs md:text-sm">📊</span> Statistik Skor
                      </h3>
                      <div className="space-y-4">
                          <div className="flex justify-between items-end">
                              <span className="text-slate-400 text-xs md:text-sm font-medium">Skor Kumulatif</span>
                              <span className="text-2xl md:text-3xl font-black text-white">{totalScore} <span className="text-xs md:text-sm text-slate-500 font-normal">/ 45</span></span>
                          </div>
                          <div className="h-3 md:h-4 bg-slate-800 rounded-full border border-white/5 p-0.5">
                              <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(totalScore / 45) * 100}%` }}
                                  className="h-full rounded-full shadow-lg"
                                  style={{ 
                                    backgroundColor: totalScore >= 36 ? '#22c55e' : totalScore >= 26 ? '#f59e0b' : '#ef4444',
                                    boxShadow: `0 0 10px ${totalScore >= 36 ? '#22c55ebf' : totalScore >= 26 ? '#f59e0bbf' : '#ef4444bf'}`
                                  }}
                              />
                          </div>
                          <p className="text-slate-300 leading-relaxed text-xs md:text-sm font-medium italic mt-2 md:mt-4">
                            &quot;{interpretation.description}&quot;
                          </p>
                      </div>
                  </div>

                  {/* Column 2: Chart */}
                  <div className="bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[200px] md:min-h-[280px] order-1 md:order-2">
                      <div className="w-full h-full relative">
                          <BarChart type="bar" data={chartData} options={chartOptions} />
                      </div>
                  </div>

                  {/* Column 3: Recommendations */}
                  <div className="bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-white/10 flex flex-col order-3">
                      <h3 className="text-base md:text-lg font-bold mb-3 flex items-center gap-2 text-purple-300">
                          <span className="p-1.5 bg-purple-500/20 rounded-md text-xs md:text-sm">🌱</span> Rekomendasi
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-4 text-[10px] md:text-xs font-medium">
                          Berdasarkan teori <strong>Averill</strong>, kendali diri melibatkan regulasi perilaku, kognisi, and keputusan. {totalScore < 36 ? "Segera batasi durasi bermain setiap harinya." : "Pertahankan kedisiplinan ini."}
                      </p>
                      <div className="mt-auto bg-slate-800/80 p-3 md:p-4 rounded-xl border border-indigo-500/10 italic text-indigo-200 text-center font-bold text-xs md:text-sm relative overflow-hidden">
                        <span className="text-indigo-500/10 font-serif block text-center">&quot;Game bisa ditunda, tapi masa depan tidak bisa diulang.&quot;</span>
                      </div>
                  </div>
                </div>

                {/* PDF Only Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[7px] md:text-[8px] text-slate-500 font-bold tracking-widest uppercase">
                    <span>© {new Date().getFullYear()} NOGAMEADDICTION.ORG</span>
                    <span>EDUCATION & MENTAL HEALTH FOUNDATION</span>
                </div>
              </div>

              {/* Action Buttons (Hidden in PDF) */}
              <div id="action-btns" className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 no-print mt-2">
                <button 
                    id="download-btn"
                    disabled={isGeneratingPDF}
                    onClick={downloadPDF} 
                    className="bg-white text-slate-900 hover:bg-indigo-50 py-3 md:py-4 rounded-xl md:rounded-2xl font-black transition-all shadow-xl flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base disabled:opacity-50 active:scale-95"
                >
                    {isGeneratingPDF ? (
                        <>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full font-bold"></span>
                            PROSES PDF...
                        </>
                    ) : (
                        <>
                            <span className="text-lg md:text-xl">📥</span> DOWNLOAD PDF
                        </>
                    )}
                </button>
                <button 
                    id="repeat-btn"
                    onClick={() => {
                        setStep('START');
                        setAnswers([]);
                        setCurrentQuestion(0);
                    }} 
                    className="bg-slate-700/50 hover:bg-slate-700 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2 md:gap-3 border border-white/10 active:scale-95 text-sm md:text-base"
                >
                    <span className="text-base md:text-lg">🔄</span> COBA LAGI
                </button>
              </div>
              
              <div className="mt-2 text-center no-print">
                <Link href="/" className="text-slate-500 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  ← KEMBALI KE BERANDA
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
