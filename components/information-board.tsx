"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getData,
  getAnnouncements,
  getTodayBirthdays,
  type SafetyData,
  type Announcement,
  type BirthdayEmployee,
} from "@/lib/storage"

export function InformationBoard() {
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [birthdays, setBirthdays] = useState<BirthdayEmployee[]>([])
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

  const todayBirthday = birthdays[0] || {
    id: "default",
    name: "Tentukan Data",
    department: "Silakan set di Admin",
    birthDate: "",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0IObsDPmihdFispbKAubpxQ1JtsLELn_-ItAgq0V7UoI5O2S36lfnmBW5DbsEw7x05NZYd3HFqwa_HTShVeXMult8i7hhM7sVhKbpPJfNxQ3XHzHIz4KeASmK0jMgALH3X8uYsMVSFm1gX0rRg3Nj5UoCTUmSUPhnnf2p7PB0DsgtU7Uri1GeVJGjfzS-1FRl-txnLfhcf-7RooqyePtMQo1bGA2o1fGm94vA9HNaaEvEzcDUygmrxnPCr1zu1Pie7kFYaxbe0-AZ"
  }

  return (
    <div className="bg-background-dark text-white p-6 overflow-hidden min-h-screen">
      <div className="max-w-[1920px] mx-auto flex flex-col h-[calc(100vh-3rem)] animate-fade-in relative">
        {/* Version Marker for debugging */}
        <div className="absolute -top-4 -right-4 text-[8px] text-white/10">v2.1-icons-fixed</div>
        
        {/* Header - Compact for better screen fit */}
        <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-[#224949] bg-[#183434]/80 rounded-xl px-12 py-6 mb-4 shadow-2xl animate-slide-up">
          {/* Top Right: DateTime Corner */}
          <div className="absolute top-2 right-12 flex flex-col items-end">
            <span className="text-primary text-4xl font-mono font-bold neon-glow leading-none">{dateTime.time}</span>
            <span className="text-[#90cbcb] text-[10px] font-medium uppercase tracking-widest mt-1">{dateTime.date}</span>
          </div>

          <div className="flex items-center gap-10 mt-2">
            <div className="flex items-center justify-center">
              <img
                src="/tokai.png"
                alt="Tokai Logo"
                className="h-16 w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-3xl font-black leading-tight tracking-tight">PT. TOKAI RUBBER INDONESIA</h2>
              <p className="text-primary text-sm font-bold tracking-[0.4em] uppercase">Safety Performance Board</p>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-2">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <img
                  src="/logo safety.png"
                  alt="Safety Logo"
                  className="h-14 w-auto animate-pulse-soft"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-green-400 font-bold text-[10px] uppercase mb-1">Status</span>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/50">
                  <div className="size-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">All Systems Normal</span>
                </div>
              </div>
            </div>
            <div className="h-14 w-px bg-[#224949]"></div>
            <Link href="/admin" className="p-2 rounded-xl hover:bg-white/10 transition-all hover:scale-110">
              <span className="material-symbols-outlined text-primary text-3xl">settings</span>
            </Link>
          </div>
        </header>

        {/* Main Dashboard Area */}
        <main className="grid grid-cols-3 gap-6 flex-1 px-8 pb-8 overflow-hidden">
          
          {/* Left Side: Metric Grid (2/3) */}
          <div className="col-span-2 grid grid-cols-3 grid-rows-2 gap-4 h-full">
            
            {/* Card 1: Total Workers */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-primary/60 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:100ms] shadow-lg">
              <img src="/3d_workforce.png" alt="Workforce Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(13,242,242,0.3)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Jumlah Tenaga Kerja</p>
              <div className="flex items-baseline gap-3 mt-4">
                <h2 className="text-white text-6xl font-black neon-glow leading-none">{safetyData.workers}</h2>
                <span className="text-xl font-bold text-primary/60 uppercase">Orang</span>
              </div>
              <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Live Attendance</span>
            </div>

            {/* Card 2: Accident Count */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-green-500 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:200ms] shadow-lg">
              <img src="/3d_accident.png" alt="Accident Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Kecelakaan Kerja</p>
              <div className="flex items-baseline gap-3 mt-4">
                <h2 className="text-green-500 text-6xl font-black leading-none">{safetyData.accidents}</h2>
                <span className="text-xl font-bold text-green-500/60 uppercase">Kali</span>
              </div>
              <div className="mt-4 bg-green-500/20 text-green-400 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-green-500/30">Goal Achieved</div>
            </div>

            {/* Card 3: Total Working Hours */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-gray-500 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:300ms] shadow-lg">
              <img src="/3d_hours.png" alt="Hours Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Total Jam Kerja</p>
              <div className="flex items-baseline gap-3 mt-4">
                <h2 className="text-white text-5xl font-black leading-none">{safetyData.workHours.toLocaleString()}</h2>
                <span className="text-xl font-bold text-gray-500/60 uppercase">Jam</span>
              </div>
              <span className="text-[#90cbcb]/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Fiscal Year 2026</span>
            </div>

            {/* Card 4: Safe Hours */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-green-500 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:400ms] shadow-lg">
              <img src="/3d_safe_hours.png" alt="Safe Hours Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Jam Kerja Aman</p>
              <div className="flex items-baseline gap-3 mt-4">
                <h2 className="text-green-400 text-5xl font-black leading-none">{safetyData.safeHours.toLocaleString()}</h2>
                <span className="text-xl font-bold text-green-500/60 uppercase">Jam</span>
              </div>
              <span className="text-green-500/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Safety Milestone</span>
            </div>

            {/* Card 5: Temperature */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-orange-500 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:500ms] shadow-lg">
              <img src="/3d_temp.png" alt="Temp Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Temperatur Ruangan</p>
              <div className="flex items-baseline gap-1 mt-4">
                <h2 className="text-orange-500 text-6xl font-black leading-none">{safetyData.temperature}</h2>
                <span className="text-3xl font-bold text-orange-500/60">°C</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="size-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-orange-400 text-[10px] font-bold uppercase">Zone A Active</span>
              </div>
            </div>

            {/* Card 6: Humidity */}
            <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-primary/60 transition-all duration-300 hover:scale-[1.05] animate-slide-up [animation-delay:600ms] shadow-lg">
              <img src="/3d_humidity.png" alt="Humidity Icon" className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_15px_rgba(13,242,242,0.3)]" />
              <p className="text-[#90cbcb] text-sm font-bold uppercase tracking-widest">Kelembaban</p>
              <div className="flex items-baseline gap-1 mt-4">
                <h2 className="text-primary text-6xl font-black leading-none">{safetyData.humidity}</h2>
                <span className="text-3xl font-bold text-primary/60">%</span>
              </div>
              <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Status: Normal</span>
            </div>
          </div>

          {/* Right Side: Announcements & Birthday (1/3) */}
          <div className="col-span-1 flex flex-col gap-6 h-full">
            
            {/* Announcements */}
            <div className="glass-card rounded-xl flex-1 flex flex-col overflow-hidden animate-slide-up [animation-delay:700ms]">
              <div className="px-6 py-4 border-b border-[#224949] flex items-center justify-between bg-primary/10">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">campaign</span>
                  Papan Pengumuman
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeAnnouncements.map((ann, idx) => (
                  <div key={ann.id} className={`flex gap-4 p-4 rounded-lg border transition-all ${idx === 0 ? 'bg-[#102323]/50 border-[#316868]' : 'bg-[#102323]/30 border-transparent'}`}>
                    <div className={`${idx === 0 ? 'text-primary bg-[#224949]' : 'text-white bg-[#224949]'} flex items-center justify-center rounded-lg shrink-0 size-12`}>
                      <span className="material-symbols-outlined">{idx === 0 ? 'strategy' : idx === 1 ? 'construction' : 'shield'}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-white text-base font-bold leading-tight">{ann.title}</p>
                      <p className="text-[#90cbcb] text-sm mt-1 line-clamp-2">{ann.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Birthday Card */}
            <div className="glass-card rounded-xl p-5 relative overflow-hidden group animate-slide-up [animation-delay:800ms]">
              {/* Background confetti effect decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-60 transition-all duration-500 scale-150 rotate-12">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse-soft">celebration</span>
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="size-24 rounded-full border-4 border-primary p-1 bg-[#102323] shadow-[0_0_20px_rgba(13,242,242,0.2)]">
                    <div 
                      className="w-full h-full rounded-full bg-center bg-cover" 
                      style={{ backgroundImage: `url("${todayBirthday.photo}")` }}
                    >
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-[#102323] rounded-full p-1 border-2 border-[#102323] animate-bounce">
                    <span className="material-symbols-outlined text-sm font-bold">cake</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest">Happy Birthday!</p>
                  <h4 className="text-white text-xl font-black">{todayBirthday.name}</h4>
                  <p className="text-[#90cbcb] text-sm">{todayBirthday.department || 'Production Team'}</p>
                  <div className="mt-2 flex items-center gap-2 text-primary">
                    <span className="text-xs italic font-medium">"Selamat Ulang Tahun!"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Banner */}
        <footer className="bg-primary/90 text-[#102323] rounded-xl px-10 py-4 shadow-[0_0_30px_rgba(13,242,242,0.3)] animate-slide-up [animation-delay:900ms]">
          <div className="flex items-center justify-center gap-6 overflow-hidden whitespace-nowrap">
            <span className="material-symbols-outlined text-3xl font-bold animate-spin [animation-duration:10s]">star</span>
            <p className="text-3xl font-black italic tracking-widest uppercase flex items-center gap-4">
              Zero Accident Bukan Target <span className="text-2xl">⚡</span> Itu Budaya!
            </p>
            <span className="material-symbols-outlined text-3xl font-bold animate-spin [animation-duration:10s]">star</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
