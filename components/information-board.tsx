"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getData,
  getAnnouncements,
  getTodayBirthdays,
  getCondolences,
  type SafetyData,
  type Announcement,
  type BirthdayEmployee,
  type CondolenceNews,
} from "@/lib/storage"

export function InformationBoard() {
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [birthdays, setBirthdays] = useState<BirthdayEmployee[]>([])
  const [condolences, setCondolences] = useState<CondolenceNews[]>([])
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  })

  useEffect(() => {
    // Load data
    const loadData = () => {
      setSafetyData(getData())
      setAnnouncements(getAnnouncements())
      setBirthdays(getTodayBirthdays())
      setCondolences(getCondolences())
    }

    // Update date/time
    const updateDateTime = () => {
      const now = new Date()
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ]

      setDateTime({
        date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
        time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
      })
    }

    loadData()
    updateDateTime()

    // Refresh intervals
    const timeInterval = setInterval(updateDateTime, 1000)
    const dataInterval = setInterval(loadData, 30000) // Refresh data every 30s

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  if (!safetyData) return null

  // Get active announcements
  const activeAnnouncements = announcements.filter(a => a.active).slice(0, 3)

  // Get active condolence (take the first one)
  const activeCondolence = condolences.find(c => c.active)

  const todayBirthday = birthdays[0] || {
    id: "default",
    name: "Tentukan Data",
    department: "Silakan set di Admin",
    birthDate: "",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0IObsDPmihdFispbKAubpxQ1JtsLELn_-ItAgq0V7UoI5O2S36lfnmBW5DbsEw7x05NZYd3HFqwa_HTShVeXMult8i7hhM7sVhKbpPJfNxQ3XHzHIz4KeASmK0jMgALH3X8uYsMVSFm1gX0rRg3Nj5UoCTUmSUPhnnf2p7PB0DsgtU7Uri1GeVJGjfzS-1FRl-txnLfhcf-7RooqyePtMQo1bGA2o1fGm94vA9HNaaEvEzcDUygmrxnPCr1zu1Pie7kFYaxbe0-AZ"
  }

  // Icon map untuk announcements
  const getAnnouncementIcon = (index: number) => {
    const icons = ["record_voice_over", "engineering", "health_and_safety"]
    return icons[index] || "info"
  }

  return (
    <div className="dark min-h-screen w-full p-3 sm:p-4 md:p-6 lg:p-8" style={{ background: "radial-gradient(circle at top right, #1e293b, #0f172a)" }}>
      <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
        
        {/* Header - Responsive */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 border-b-2 border-[#0df2f2]/20 bg-slate-900/60 rounded-xl lg:rounded-2xl px-4 sm:px-6 lg:px-10 py-4 lg:py-6 mb-4 lg:mb-8 shadow-2xl backdrop-blur-md shrink-0">
          {/* Logo & Title */}
          <div className="flex items-center gap-4 lg:gap-8">
            <img
              src="/tokai.png"
              alt="Tokai Logo"
              className="h-12 sm:h-14 lg:h-20 w-auto object-contain"
            />
            <div className="text-center lg:text-left">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-black leading-none tracking-tight">PT. TOKAI RUBBER INDONESIA</h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-4 mt-1 lg:mt-2">
                <div className="h-0.5 lg:h-1 w-6 lg:w-10 bg-[#0df2f2]"></div>
                <p className="text-[#0df2f2] text-xs sm:text-sm lg:text-lg font-extrabold tracking-[0.1em] lg:tracking-[0.2em] uppercase">Safety Performance Board</p>
              </div>
            </div>
          </div>
          
          {/* DateTime & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-10">
            {/* DateTime */}
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-[#0df2f2] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-mono font-black neon-glow leading-none">{dateTime.time}</span>
              <span className="text-slate-400 text-xs sm:text-sm lg:text-xl font-semibold uppercase tracking-widest mt-1">{dateTime.date}</span>
            </div>
            <div className="hidden lg:block h-20 w-px bg-[#0df2f2]/20"></div>
            {/* System Status */}
            <div className="flex flex-col items-center gap-1 lg:gap-2">
              <span className="text-green-400 font-bold text-[8px] sm:text-[10px] lg:text-xs uppercase tracking-tighter">System Status</span>
              <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-lg lg:rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="size-2 lg:size-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                <span className="text-green-400 text-xs sm:text-sm lg:text-lg font-black uppercase whitespace-nowrap">All Systems Normal</span>
              </div>
            </div>
            {/* Admin Link */}
            <Link href="/admin" className="p-2 rounded-xl hover:bg-white/10 transition-all hover:scale-110">
              <span className="material-symbols-outlined text-[#0df2f2] text-xl lg:text-3xl">settings</span>
            </Link>
          </div>
        </header>

        {/* Main Content - Responsive Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 flex-1 mb-4 lg:mb-8 overflow-auto lg:overflow-hidden">
          
          {/* Left Side: Metric Cards Grid - Full width on mobile, 8 cols on desktop */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            
            {/* Card 1: Jumlah Tenaga Kerja */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-[#0df2f2] relative overflow-hidden min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#0df2f2] text-2xl sm:text-3xl lg:text-5xl">groups</span>
                <div className="bg-[#0df2f2]/10 px-2 lg:px-3 py-0.5 lg:py-1 rounded text-[#0df2f2] text-[8px] lg:text-[10px] font-black uppercase tracking-widest hidden sm:block">Live Updates</div>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Jumlah Tenaga Kerja</p>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-6xl font-black mt-1 lg:mt-2 neon-glow leading-none">
                  {safetyData.workers} 
                  <span className="text-sm sm:text-lg lg:text-2xl font-normal text-slate-500 ml-1 lg:ml-2">Orang</span>
                </h2>
              </div>
            </div>

            {/* Card 2: Kecelakaan Kerja */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-green-500 relative min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-green-500 text-2xl sm:text-3xl lg:text-5xl">verified</span>
                <div className="bg-green-500/20 text-green-400 text-[8px] lg:text-[10px] px-2 lg:px-3 py-0.5 lg:py-1 rounded-lg font-black uppercase tracking-widest hidden sm:block">Safe Target</div>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Kecelakaan Kerja</p>
                <h2 className="text-green-500 text-3xl sm:text-4xl lg:text-7xl font-black mt-1 lg:mt-2 neon-glow-green leading-none">
                  {safetyData.accidents} 
                  <span className="text-sm sm:text-lg lg:text-2xl font-normal text-green-500/60 uppercase ml-1 lg:ml-2">Kali</span>
                </h2>
              </div>
            </div>

            {/* Card 3: Total Jam Kerja */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-slate-400 relative min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-slate-400 text-2xl sm:text-3xl lg:text-5xl">history</span>
                <span className="text-slate-500 text-[8px] lg:text-[10px] font-black uppercase tracking-widest hidden sm:block">FY 2026</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Total Jam Kerja</p>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-6xl font-black mt-1 lg:mt-2 leading-none">
                  {safetyData.workHours.toLocaleString()} 
                  <span className="text-sm sm:text-lg lg:text-2xl font-normal text-slate-500 uppercase ml-1 lg:ml-2">Jam</span>
                </h2>
              </div>
            </div>

            {/* Card 4: Jam Kerja Aman */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-green-500 min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-green-500 text-2xl sm:text-3xl lg:text-5xl">security</span>
                <span className="text-green-400 text-[8px] lg:text-[10px] font-black uppercase tracking-widest hidden sm:block">Milestone</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Jam Kerja Aman</p>
                <h2 className="text-green-400 text-2xl sm:text-3xl lg:text-6xl font-black mt-1 lg:mt-2 neon-glow-green leading-none">
                  {safetyData.safeHours.toLocaleString()} 
                  <span className="text-sm sm:text-lg lg:text-2xl font-normal text-green-400/60 uppercase ml-1 lg:ml-2">Jam</span>
                </h2>
              </div>
            </div>

            {/* Card 5: Temperatur Ruangan */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-orange-500 min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-orange-500 text-2xl sm:text-3xl lg:text-5xl">device_thermostat</span>
                <div className="flex items-center gap-1 lg:gap-2">
                  <div className="size-1.5 lg:size-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-orange-400 text-[8px] lg:text-[10px] font-black uppercase tracking-widest hidden sm:block">Produksi</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Temperatur</p>
                <h2 className="text-orange-500 text-2xl sm:text-3xl lg:text-6xl font-black mt-1 lg:mt-2 neon-glow-orange leading-none">
                  {safetyData.temperature}<span className="text-lg sm:text-xl lg:text-3xl font-bold">°C</span>
                </h2>
              </div>
            </div>

            {/* Card 6: Kelembaban */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col justify-between border-l-4 lg:border-l-8 border-l-[#0df2f2] min-h-[140px] lg:min-h-0">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#0df2f2] text-2xl sm:text-3xl lg:text-5xl">water_drop</span>
                <span className="text-[#0df2f2] text-[8px] lg:text-[10px] font-black uppercase tracking-widest hidden sm:block">Optimal</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm sm:text-base lg:text-2xl font-bold uppercase tracking-wide">Kelembaban</p>
                <h2 className="text-[#0df2f2] text-2xl sm:text-3xl lg:text-6xl font-black mt-1 lg:mt-2 neon-glow leading-none">
                  {safetyData.humidity}<span className="text-lg sm:text-xl lg:text-3xl font-bold">%</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side: 4 Columns - Announcements & Birthday */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            
            {/* Announcements Panel */}
            <div className="glass-card rounded-xl lg:rounded-3xl flex-1 flex flex-col overflow-hidden border-t-4 lg:border-t-8 border-t-[#0df2f2]/40 shadow-xl min-h-[200px] lg:min-h-0">
              <div className="px-4 lg:px-8 py-3 lg:py-5 border-b border-[#0df2f2]/20 flex items-center justify-between bg-[#0df2f2]/10 shrink-0">
                <h3 className="text-white font-black text-base lg:text-xl flex items-center gap-2 lg:gap-3">
                  <span className="material-symbols-outlined text-[#0df2f2] text-xl lg:text-3xl">campaign</span>
                  PAPAN PENGUMUMAN
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 lg:p-5 space-y-3 lg:space-y-4 scroll-hide">
                {activeAnnouncements.length > 0 ? (
                  activeAnnouncements.map((ann, idx) => (
                    <div 
                      key={ann.id} 
                      className={`flex gap-3 lg:gap-4 p-3 lg:p-5 rounded-xl lg:rounded-2xl border transition-colors ${
                        idx === 0 
                          ? 'bg-slate-900/60 border-[#0df2f2]/20 hover:bg-slate-900/80' 
                          : 'bg-slate-950/30 border-slate-700/30'
                      }`}
                    >
                      <div className={`flex items-center justify-center rounded-lg lg:rounded-xl shrink-0 size-10 lg:size-14 ${
                        idx === 0 ? 'text-[#0df2f2] bg-[#0df2f2]/10' : 'text-slate-400 bg-slate-800'
                      }`}>
                        <span className="material-symbols-outlined text-lg lg:text-2xl">{getAnnouncementIcon(idx)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm lg:text-lg leading-tight mb-0.5 lg:mb-1 truncate ${idx === 0 ? 'text-white font-black' : 'text-white font-bold'}`}>{ann.title}</p>
                        <p className="text-slate-400 text-xs lg:text-base line-clamp-2">{ann.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gap-3 lg:gap-4 bg-slate-900/60 p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-[#0df2f2]/20 hover:bg-slate-900/80 transition-colors">
                      <div className="text-[#0df2f2] flex items-center justify-center rounded-lg lg:rounded-xl bg-[#0df2f2]/10 shrink-0 size-10 lg:size-14">
                        <span className="material-symbols-outlined text-lg lg:text-2xl">record_voice_over</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm lg:text-lg font-black mb-0.5 lg:mb-1 leading-tight">Safety Briefing Pagi</p>
                        <p className="text-slate-400 text-xs lg:text-base">Wajib hadir jam 08:00 AM di Area Produksi Utama.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4 bg-slate-950/30 p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-slate-700/30">
                      <div className="text-slate-400 flex items-center justify-center rounded-lg lg:rounded-xl bg-slate-800 shrink-0 size-10 lg:size-14">
                        <span className="material-symbols-outlined text-lg lg:text-2xl">engineering</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm lg:text-lg font-bold mb-0.5 lg:mb-1 leading-tight">Maintenance Jalur 3</p>
                        <p className="text-slate-400 text-xs lg:text-base">Jalur 3 akan berhenti beroperasi pukul 16:00 untuk overhaul.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4 bg-slate-950/30 p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-slate-700/30">
                      <div className="text-slate-400 flex items-center justify-center rounded-lg lg:rounded-xl bg-slate-800 shrink-0 size-10 lg:size-14">
                        <span className="material-symbols-outlined text-lg lg:text-2xl">health_and_safety</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm lg:text-lg font-bold mb-0.5 lg:mb-1 leading-tight">Inspeksi APD</p>
                        <p className="text-slate-400 text-xs lg:text-base">Pastikan menggunakan APD lengkap setiap saat di area pabrik.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Birthday Card */}
            <div className="glass-card rounded-xl lg:rounded-3xl p-4 lg:p-6 relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/90 border-t-4 lg:border-t-8 border-t-pink-500/50 shrink-0">
              <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10">
                <span className="material-symbols-outlined text-[60px] lg:text-[120px] text-[#0df2f2]">celebration</span>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 relative z-10">
                <div className="relative shrink-0">
                  <div className="size-16 sm:size-20 lg:size-24 rounded-full border-2 lg:border-4 border-[#0df2f2] p-0.5 lg:p-1 bg-slate-950 shadow-[0_0_20px_rgba(13,242,242,0.3)]">
                    <div 
                      className="w-full h-full rounded-full bg-center bg-cover" 
                      style={{ backgroundImage: `url('${todayBirthday.photo}')` }}
                    ></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#0df2f2] text-slate-950 rounded-full p-1 lg:p-1.5 border lg:border-2 border-slate-900 shadow-lg">
                    <span className="material-symbols-outlined text-sm lg:text-xl font-bold leading-none">cake</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0df2f2] text-[8px] lg:text-[10px] font-black uppercase tracking-[0.1em] lg:tracking-[0.2em] mb-0.5 lg:mb-1">Happy Birthday!</p>
                  <h4 className="text-white text-base sm:text-lg lg:text-2xl font-black tracking-tight leading-tight truncate">{todayBirthday.name}</h4>
                  <p className="text-slate-400 text-xs lg:text-base font-medium truncate">{todayBirthday.department}</p>
                  <div className="mt-1 lg:mt-2 flex items-center gap-1 lg:gap-2">
                    <div className="h-px w-4 lg:w-6 bg-[#0df2f2]/40"></div>
                    <span className="text-[#0df2f2] font-bold italic text-xs lg:text-sm">"Selamat Ulang Tahun!"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Banner - Responsive */}
        <footer className="bg-[#0df2f2] text-slate-950 rounded-xl lg:rounded-2xl px-4 sm:px-6 lg:px-10 py-3 lg:py-5 shadow-[0_0_50px_rgba(13,242,242,0.3)] border-t-2 lg:border-t-4 border-white/30 shrink-0">
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-8 overflow-hidden">
            <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-4xl font-black">stars</span>
            <p className="text-base sm:text-xl md:text-2xl lg:text-4xl font-black italic tracking-wide lg:tracking-[0.1em] uppercase leading-none text-center">
              Zero Accident Bukan Target - Itu Budaya!
            </p>
            <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-4xl font-black">stars</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
