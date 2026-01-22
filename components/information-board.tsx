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
    <div className="dark min-h-screen w-full p-2 md:p-3 xl:p-4" style={{ background: "radial-gradient(circle at top right, #1e293b, #0f172a)" }}>
      <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-1.5rem)] xl:min-h-[calc(100vh-2rem)]">
        
        {/* Header - Compact for HD */}
        <header className="flex items-center justify-between border-b-2 border-[#0df2f2]/20 bg-slate-900/60 rounded-lg md:rounded-xl px-3 md:px-5 xl:px-8 py-2 md:py-3 xl:py-4 mb-2 md:mb-3 xl:mb-4 shadow-2xl backdrop-blur-md shrink-0">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 md:gap-4 xl:gap-6">
            <img
              src="/tokai.png"
              alt="Tokai Logo"
              className="h-8 md:h-10 xl:h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-white text-sm md:text-lg xl:text-2xl font-black leading-none tracking-tight">PT. TOKAI RUBBER INDONESIA</h1>
              <div className="flex items-center gap-1 md:gap-2 mt-0.5">
                <div className="h-0.5 w-4 md:w-6 bg-[#0df2f2]"></div>
                <p className="text-[#0df2f2] text-[10px] md:text-xs xl:text-sm font-extrabold tracking-[0.1em] uppercase">Safety Performance Board</p>
              </div>
            </div>
          </div>
          
          {/* DateTime & Status */}
          <div className="flex items-center gap-3 md:gap-6 xl:gap-8">
            {/* DateTime */}
            <div className="flex flex-col items-end">
              <span className="text-[#0df2f2] text-xl md:text-2xl xl:text-4xl font-mono font-black neon-glow leading-none">{dateTime.time}</span>
              <span className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-semibold uppercase tracking-widest">{dateTime.date}</span>
            </div>
            <div className="hidden md:block h-10 xl:h-14 w-px bg-[#0df2f2]/20"></div>
            {/* System Status */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-green-400 font-bold text-[8px] md:text-[9px] xl:text-[10px] uppercase tracking-tighter">System Status</span>
              <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="size-1.5 md:size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                <span className="text-green-400 text-[10px] md:text-xs xl:text-sm font-black uppercase whitespace-nowrap">All Systems Normal</span>
              </div>
            </div>
            {/* Admin Link */}
            <Link href="/admin" className="p-1.5 rounded-lg hover:bg-white/10 transition-all hover:scale-110">
              <span className="material-symbols-outlined text-[#0df2f2] text-lg md:text-xl xl:text-2xl">settings</span>
            </Link>
          </div>
        </header>

        {/* Main Content - Optimized Grid for HD */}
        <main className="grid grid-cols-12 gap-2 md:gap-3 xl:gap-4 flex-1 mb-2 md:mb-3 xl:mb-4 overflow-hidden">
          
          {/* Left Side: 6 Metric Cards in 2x3 Grid */}
          <div className="col-span-8 grid grid-cols-2 grid-rows-3 gap-2 md:gap-3 xl:gap-4">
            
            {/* Card 1: Jumlah Tenaga Kerja */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-[#0df2f2] relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#0df2f2] text-lg md:text-xl xl:text-3xl">groups</span>
                <div className="bg-[#0df2f2]/10 px-1.5 md:px-2 py-0.5 rounded text-[#0df2f2] text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-widest">Live Updates</div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Jumlah Tenaga Kerja</p>
                <h2 className="text-white text-lg md:text-2xl xl:text-4xl font-black mt-0.5 neon-glow leading-none">
                  {safetyData.workers} 
                  <span className="text-[10px] md:text-xs xl:text-base font-normal text-slate-500 ml-1">Orang</span>
                </h2>
              </div>
            </div>

            {/* Card 2: Kecelakaan Kerja */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-green-500 relative">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-green-500 text-lg md:text-xl xl:text-3xl">verified</span>
                <div className="bg-green-500/20 text-green-400 text-[7px] md:text-[8px] xl:text-[9px] px-1.5 md:px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Safe Target</div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Kecelakaan Kerja</p>
                <h2 className="text-green-500 text-xl md:text-3xl xl:text-5xl font-black mt-0.5 neon-glow-green leading-none">
                  {safetyData.accidents} 
                  <span className="text-[10px] md:text-xs xl:text-base font-normal text-green-500/60 uppercase ml-1">Kali</span>
                </h2>
              </div>
            </div>

            {/* Card 3: Total Jam Kerja */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-slate-400 relative">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-slate-400 text-lg md:text-xl xl:text-3xl">history</span>
                <span className="text-slate-500 text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-widest">FY 2026</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Total Jam Kerja</p>
                <h2 className="text-white text-lg md:text-2xl xl:text-4xl font-black mt-0.5 leading-none">
                  {safetyData.workHours.toLocaleString()} 
                  <span className="text-[10px] md:text-xs xl:text-base font-normal text-slate-500 uppercase ml-1">Jam</span>
                </h2>
              </div>
            </div>

            {/* Card 4: Jam Kerja Aman */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-green-500">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-green-500 text-lg md:text-xl xl:text-3xl">security</span>
                <span className="text-green-400 text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-widest">Milestone</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Jam Kerja Aman</p>
                <h2 className="text-green-400 text-lg md:text-2xl xl:text-4xl font-black mt-0.5 neon-glow-green leading-none">
                  {safetyData.safeHours.toLocaleString()} 
                  <span className="text-[10px] md:text-xs xl:text-base font-normal text-green-400/60 uppercase ml-1">Jam</span>
                </h2>
              </div>
            </div>

            {/* Card 5: Temperatur Ruangan */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-orange-500">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-orange-500 text-lg md:text-xl xl:text-3xl">device_thermostat</span>
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-orange-400 text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-widest">Produksi</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Temperatur</p>
                <h2 className="text-orange-500 text-lg md:text-2xl xl:text-4xl font-black mt-0.5 neon-glow-orange leading-none">
                  {safetyData.temperature}<span className="text-sm md:text-lg xl:text-xl font-bold">°C</span>
                </h2>
              </div>
            </div>

            {/* Card 6: Kelembaban */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 flex flex-col justify-between border-l-4 xl:border-l-6 border-l-[#0df2f2]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#0df2f2] text-lg md:text-xl xl:text-3xl">water_drop</span>
                <span className="text-[#0df2f2] text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-widest">Optimal</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs xl:text-sm font-bold uppercase tracking-wide">Kelembaban</p>
                <h2 className="text-[#0df2f2] text-lg md:text-2xl xl:text-4xl font-black mt-0.5 neon-glow leading-none">
                  {safetyData.humidity}<span className="text-sm md:text-lg xl:text-xl font-bold">%</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side: 4 Columns - Announcements & Birthday */}
          <div className="col-span-4 flex flex-col gap-2 md:gap-3 xl:gap-4">
            
            {/* Announcements Panel */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl flex-1 flex flex-col overflow-hidden border-t-4 xl:border-t-6 border-t-[#0df2f2]/40 shadow-xl">
              <div className="px-3 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 border-b border-[#0df2f2]/20 flex items-center justify-between bg-[#0df2f2]/10 shrink-0">
                <h3 className="text-white font-black text-xs md:text-sm xl:text-base flex items-center gap-1.5 md:gap-2">
                  <span className="material-symbols-outlined text-[#0df2f2] text-base md:text-lg xl:text-xl">campaign</span>
                  PAPAN PENGUMUMAN
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 md:p-3 xl:p-4 space-y-2 md:space-y-2.5 xl:space-y-3 scroll-hide">
                {activeAnnouncements.length > 0 ? (
                  activeAnnouncements.map((ann, idx) => (
                    <div 
                      key={ann.id} 
                      className={`flex gap-2 md:gap-3 p-2 md:p-3 xl:p-4 rounded-lg md:rounded-xl border transition-colors ${
                        idx === 0 
                          ? 'bg-slate-900/60 border-[#0df2f2]/20 hover:bg-slate-900/80' 
                          : 'bg-slate-950/30 border-slate-700/30'
                      }`}
                    >
                      <div className={`flex items-center justify-center rounded-md md:rounded-lg shrink-0 size-8 md:size-10 xl:size-12 ${
                        idx === 0 ? 'text-[#0df2f2] bg-[#0df2f2]/10' : 'text-slate-400 bg-slate-800'
                      }`}>
                        <span className="material-symbols-outlined text-sm md:text-base xl:text-lg">{getAnnouncementIcon(idx)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[10px] md:text-xs xl:text-sm leading-tight mb-0.5 truncate ${idx === 0 ? 'text-white font-black' : 'text-white font-bold'}`}>{ann.title}</p>
                        <p className="text-slate-400 text-[9px] md:text-[10px] xl:text-xs line-clamp-2">{ann.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gap-2 md:gap-3 bg-slate-900/60 p-2 md:p-3 xl:p-4 rounded-lg md:rounded-xl border border-[#0df2f2]/20 hover:bg-slate-900/80 transition-colors">
                      <div className="text-[#0df2f2] flex items-center justify-center rounded-md md:rounded-lg bg-[#0df2f2]/10 shrink-0 size-8 md:size-10 xl:size-12">
                        <span className="material-symbols-outlined text-sm md:text-base xl:text-lg">record_voice_over</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[10px] md:text-xs xl:text-sm font-black mb-0.5 leading-tight">Safety Briefing Pagi</p>
                        <p className="text-slate-400 text-[9px] md:text-[10px] xl:text-xs">Wajib hadir jam 08:00 AM di Area Produksi Utama.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-3 bg-slate-950/30 p-2 md:p-3 xl:p-4 rounded-lg md:rounded-xl border border-slate-700/30">
                      <div className="text-slate-400 flex items-center justify-center rounded-md md:rounded-lg bg-slate-800 shrink-0 size-8 md:size-10 xl:size-12">
                        <span className="material-symbols-outlined text-sm md:text-base xl:text-lg">engineering</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[10px] md:text-xs xl:text-sm font-bold mb-0.5 leading-tight">Maintenance Jalur 3</p>
                        <p className="text-slate-400 text-[9px] md:text-[10px] xl:text-xs">Jalur 3 akan berhenti beroperasi pukul 16:00 untuk overhaul.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-3 bg-slate-950/30 p-2 md:p-3 xl:p-4 rounded-lg md:rounded-xl border border-slate-700/30">
                      <div className="text-slate-400 flex items-center justify-center rounded-md md:rounded-lg bg-slate-800 shrink-0 size-8 md:size-10 xl:size-12">
                        <span className="material-symbols-outlined text-sm md:text-base xl:text-lg">health_and_safety</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[10px] md:text-xs xl:text-sm font-bold mb-0.5 leading-tight">Inspeksi APD</p>
                        <p className="text-slate-400 text-[9px] md:text-[10px] xl:text-xs">Pastikan menggunakan APD lengkap setiap saat di area pabrik.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Birthday Card */}
            <div className="glass-card rounded-lg md:rounded-xl xl:rounded-2xl p-2 md:p-3 xl:p-4 relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/90 border-t-4 xl:border-t-6 border-t-pink-500/50 shrink-0">
              <div className="absolute top-0 right-0 p-1 md:p-2 opacity-10">
                <span className="material-symbols-outlined text-[40px] md:text-[60px] xl:text-[80px] text-[#0df2f2]">celebration</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 xl:gap-5 relative z-10">
                <div className="relative shrink-0">
                  <div className="size-12 md:size-14 xl:size-18 rounded-full border-2 xl:border-3 border-[#0df2f2] p-0.5 bg-slate-950 shadow-[0_0_20px_rgba(13,242,242,0.3)]">
                    <div 
                      className="w-full h-full rounded-full bg-center bg-cover" 
                      style={{ backgroundImage: `url('${todayBirthday.photo}')` }}
                    ></div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-[#0df2f2] text-slate-950 rounded-full p-0.5 md:p-1 border border-slate-900 shadow-lg">
                    <span className="material-symbols-outlined text-[10px] md:text-xs xl:text-sm font-bold leading-none">cake</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0df2f2] text-[7px] md:text-[8px] xl:text-[9px] font-black uppercase tracking-[0.1em] mb-0.5">Happy Birthday!</p>
                  <h4 className="text-white text-xs md:text-sm xl:text-base font-black tracking-tight leading-tight truncate">{todayBirthday.name}</h4>
                  <p className="text-slate-400 text-[9px] md:text-[10px] xl:text-xs font-medium truncate">{todayBirthday.department}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="h-px w-3 md:w-4 bg-[#0df2f2]/40"></div>
                    <span className="text-[#0df2f2] font-bold italic text-[8px] md:text-[9px] xl:text-[10px]">"Selamat Ulang Tahun!"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Banner - Running Text */}
        <footer className="bg-[#0df2f2] text-slate-950 rounded-lg md:rounded-xl px-3 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 shadow-[0_0_50px_rgba(13,242,242,0.3)] border-t-2 xl:border-t-3 border-white/30 shrink-0">
          <div className="marquee-container flex items-center">
            <div className="animate-marquee flex items-center gap-3 md:gap-4 xl:gap-6">
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">stars</span>
              <p className="text-sm md:text-base xl:text-xl font-black italic tracking-wide uppercase leading-none">
                ZERO ACCIDENT BUKAN TARGET - ITU BUDAYA!
              </p>
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">stars</span>
              <span className="mx-6 md:mx-10 xl:mx-12"></span>
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">health_and_safety</span>
              <p className="text-sm md:text-base xl:text-xl font-black italic tracking-wide uppercase leading-none">
                KESELAMATAN ADALAH PRIORITAS UTAMA
              </p>
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">health_and_safety</span>
              <span className="mx-6 md:mx-10 xl:mx-12"></span>
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">verified_user</span>
              <p className="text-sm md:text-base xl:text-xl font-black italic tracking-wide uppercase leading-none">
                BEKERJA AMAN, PULANG SELAMAT
              </p>
              <span className="material-symbols-outlined text-base md:text-lg xl:text-2xl font-black">verified_user</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
