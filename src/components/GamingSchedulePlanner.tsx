import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ScheduleItem = {
  time: string;
  activity: string;
  category: 'game' | 'study' | 'rest' | 'school' | 'family';
  icon: React.ReactNode;
  tip?: string;
};

const Icons = {
  Game: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m10-2h.01"/></svg>,
  Study: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Rest: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12.35 2.15a.5.5 0 0 0-.7 0l-2 2a.5.5 0 0 0-.15.35V5a.5.5 0 1 1-1 0 0 0 0 .5.5 1.7 1.7 0 1 1 2.399-2.274l.026.024zM12 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V7zM4.93 12.07a.5.5 0 0 1 .7 0l4 4a.5.5 0 0 1-.7.7l-4-4a.5.5 0 0 1 0-.7z"/></svg>,
  School: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"/></svg>,
  Family: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Sun: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Moon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
};

const schoolDaySchedule: ScheduleItem[] = [
  { time: "05:00 - 06:30", activity: "Bangun, Ibadah & Persiapan", category: "rest", icon: Icons.Sun },
  { time: "07:00 - 15:00", activity: "Sekolah & Ekskul", category: "school", icon: Icons.School },
  { time: "15:00 - 16:30", activity: "Istirahat & Makan Siang", category: "rest", icon: Icons.Rest },
  { time: "16:30 - 17:30", activity: "Gaming Sesi 1 (Refresh Otak)", category: "game", icon: Icons.Game, tip: "Pasang alarm 60 menit!" },
  { time: "17:30 - 18:30", activity: "Mandi & Ibadah", category: "rest", icon: Icons.Rest },
  { time: "18:30 - 20:00", activity: "Belajar & Mengerjakan PR", category: "study", icon: Icons.Study },
  { time: "20:00 - 21:00", activity: "Waktu Keluarga / Santai", category: "family", icon: Icons.Family },
  { time: "21:00 - 05:00", activity: "Tidur (Wajib 8 Jam)", category: "rest", icon: Icons.Moon, tip: "Matikan gadget 30 menit sebelum tidur." }
];

const holidaySchedule: ScheduleItem[] = [
  { time: "06:00 - 07:30", activity: "Bangun & Olahraga Pagi", category: "rest", icon: Icons.Sun },
  { time: "08:00 - 10:00", activity: "Hobi / Bantu Orang Tua", category: "family", icon: Icons.Family },
  { time: "10:00 - 12:00", activity: "Gaming Sesi 1 (Push Rank!)", category: "game", icon: Icons.Game, tip: "Jangan lupa stretching tiap 30 menit." },
  { time: "12:00 - 13:00", activity: "Istirahat & Makan Siang", category: "rest", icon: Icons.Rest },
  { time: "13:00 - 15:00", activity: "Tidur Siang / Membaca", category: "study", icon: Icons.Rest },
  { time: "15:00 - 16:00", activity: "Gaming Sesi 2 (Santai)", category: "game", icon: Icons.Game },
  { time: "16:00 - 18:00", activity: "Aktivitas Luar / Teman", category: "family", icon: Icons.Family },
  { time: "19:00 - 20:00", activity: "Review Pelajaran Ringan", category: "study", icon: Icons.Study },
  { time: "20:00 - 22:00", activity: "Film / Series / Keluarga", category: "rest", icon: Icons.Moon },
];

const GamingSchedulePlanner = () => {
  const [activeTab, setActiveTab] = useState<'school' | 'holiday'>('school');
  const [alarmTime, setAlarmTime] = useState<string>('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const currentSchedule = activeTab === 'school' ? schoolDaySchedule : holidaySchedule;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'study': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'school': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'family': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const handleSetAlarm = () => {
    if (!alarmTime) return;
    
    const now = new Date();
    const [hours, minutes] = alarmTime.split(':').map(Number);
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);

    // Jika waktu sudah lewat untuk hari ini, set untuk besok (opsional, tapi untuk kepraktisan kita anggap user ingin set untuk 'nanti' di hari yang sama)
    // Jika alarmDate < now, berarti waktu sudah lewat.
    // Namun untuk alarm "berhenti main", biasanya diset untuk beberapa jam ke depan.
    
    let delay = alarmDate.getTime() - now.getTime();
    
    if (delay < 0) {
       alert("Waktu yang dipilih sudah lewat! Silakan pilih waktu di masa depan.");
       return;
    }

    setIsAlarmSet(true);

    // Request izin notifikasi dulu
    if ('Notification' in window) {
       Notification.requestPermission();
    }

    // Feedback visual bahwa alarm aktif
    alert(`Alarm diset untuk ${alarmTime}. Jangan tutup tab ini agar alarm berbunyi!`);

    // Set timeout
    setTimeout(() => {
       playSound();
       showNotification();
       setIsAlarmSet(false);
    }, delay);
  };

  const playSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Sound beep sederhana
    audio.play().catch(e => console.log("Audio play failed (browser policy):", e));
  };

  const showNotification = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('WAKTU HABIS! 🚨', {
              body: 'Sudah saatnya berhenti main game dan istirahat! Patuhi jadwalmu.',
              icon: '/favicon.ico'
          });
      } else {
          alert("WAKTU HABIS! SUDAH SAATNYA BERHENTI MAIN GAME! 🚨");
      }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
           <h3 className="text-3xl font-black text-slate-900 mb-2">Jadwal Gamer Produktif</h3>
           <p className="text-slate-500">Seimbangkan dunia maya dan nyata dengan template jadwal ini.</p>
        </div>
        
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex">
          <button
            onClick={() => setActiveTab('school')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'school' 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Hari Sekolah
          </button>
          <button
            onClick={() => setActiveTab('holiday')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'holiday' 
              ? 'bg-indigo-500 text-white shadow-lg' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Hari Libur
          </button>
        </div>
      </div>

       {/* Alarm / Reminder Section */}
       <div className="mb-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-red-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>
            </div>
            <div>
                <h4 className="text-xl font-bold">Pasang Alarm Gaming!</h4>
                <p className="text-red-100 text-sm">Jangan sampai kebablasan, setel pengingat waktu berhenti main.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-sm w-full md:w-auto">
              <input 
                type="time" 
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="bg-transparent text-white font-bold text-lg p-2 outline-none border-b-2 border-white/30 focus:border-white w-full"
              />
              <button 
                onClick={handleSetAlarm}
                disabled={isAlarmSet || !alarmTime}
                className={`px-6 py-2 rounded-xl font-bold transition-all whitespace-nowrap
                    ${isAlarmSet 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-white text-red-600 hover:bg-red-50 shadow-md'}`}
              >
                {isAlarmSet ? 'Alarm Aktif ✓' : 'Setel Pengingat'}
              </button>
          </div>
       </div>

      {/* Timeline */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {currentSchedule.map((item, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 rounded-3xl border-2 flex flex-col gap-4 relative overflow-hidden ${getCategoryColor(item.category)}`}
            >
              <div className="flex justify-between items-start">
                <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-sm">
                  {item.icon}
                </div>
                {item.category === 'game' && (
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    Game Time
                  </span>
                )}
              </div>
              
              <div>
                <span className="font-bold opacity-70 block mb-1 text-sm tracking-wide">{item.time}</span>
                <h4 className="font-bold text-xl leading-tight">{item.activity}</h4>
              </div>

              {item.tip && (
                <div className="mt-auto pt-4 border-t border-black/5">
                  <p className="text-sm font-medium italic opacity-90">
                    💡 "{item.tip}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      <div className="mt-10 bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-3xl">
            ⚖️
          </div>
          <div>
            <h4 className="text-xl font-bold">Prinsip 20-20-20</h4>
            <p className="text-slate-400 max-w-lg">
              Setiap 20 menit bermain, lihat objek sejauh 20 kaki (6 meter) selama 20 detik untuk menjaga kesehatan mata.
            </p>
          </div>
        </div>
        <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors w-full md:w-auto">
          Download Jadwal PDF
        </button>
      </div>
    </div>
  );
};

export default GamingSchedulePlanner;
