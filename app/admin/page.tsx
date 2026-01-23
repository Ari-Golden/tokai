"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getData,
  saveData,
  resetData,
  getAnnouncements,
  saveAnnouncements,
  getBirthdays,
  saveBirthdays,
  getCondolences,
  saveCondolences,
  type SafetyData,
  type Announcement,
  type BirthdayEmployee,
  type CondolenceNews
} from "@/lib/storage"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("safety")
  const [message, setMessage] = useState("")
  
  // Data States
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [birthdays, setBirthdays] = useState<BirthdayEmployee[]>([])
  const [condolences, setCondolences] = useState<CondolenceNews[]>([])

  // Load Initial Data
  useEffect(() => {
    setSafetyData(getData())
    setAnnouncements(getAnnouncements())
    setBirthdays(getBirthdays())
    setCondolences(getCondolences())
  }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(""), 3000)
  }

  // --- SAFETY DATA HANDLERS ---
  const handleSafetyChange = (field: keyof SafetyData, value: number) => {
    if (safetyData) {
      setSafetyData({ ...safetyData, [field]: value })
    }
  }

  const handleSafetySave = () => {
    if (safetyData) {
      saveData(safetyData)
      showMessage("Data Keselamatan berhasil disimpan!")
    }
  }

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin reset semua data ke default?")) {
      resetData()
      setSafetyData(getData())
      setAnnouncements(getAnnouncements())
      setBirthdays(getBirthdays())
      setCondolences(getCondolences())
      showMessage("Data berhasil di-reset ke default!")
    }
  }

  // --- ANNOUNCEMENT HANDLERS ---
  const addAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: "Judul Pengumuman Baru",
      content: "Isi pengumuman...",
      priority: "normal",
      active: true,
    }
    const updated = [newAnnouncement, ...announcements]
    setAnnouncements(updated)
    saveAnnouncements(updated)
  }

  const updateAnnouncement = (id: string, field: keyof Announcement, value: any) => {
    const updated = announcements.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    )
    setAnnouncements(updated)
    saveAnnouncements(updated)
  }

  const deleteAnnouncement = (id: string) => {
    if (window.confirm("Hapus pengumuman ini?")) {
      const updated = announcements.filter(a => a.id !== id)
      setAnnouncements(updated)
      saveAnnouncements(updated)
    }
  }

  // --- BIRTHDAY HANDLERS ---
  const addBirthday = () => {
    const newPerson: BirthdayEmployee = {
      id: Date.now().toString(),
      name: "Nama Karyawan",
      department: "Departemen",
      birthDate: "01-01",
      photo: "https://via.placeholder.com/150",
    }
    const updated = [newPerson, ...birthdays]
    setBirthdays(updated)
    saveBirthdays(updated)
  }

  const updateBirthday = (id: string, field: keyof BirthdayEmployee, value: string) => {
    const updated = birthdays.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    )
    setBirthdays(updated)
    saveBirthdays(updated)
  }

  const deleteBirthday = (id: string) => {
    if (window.confirm("Hapus data karyawan ini?")) {
      const updated = birthdays.filter(b => b.id !== id)
      setBirthdays(updated)
      saveBirthdays(updated)
    }
  }

  // --- CONDOLENCE HANDLERS ---
  const addCondolence = () => {
    const newNews: CondolenceNews = {
      id: Date.now().toString(),
      name: "Nama Almarhum",
      department: "Departemen",
      message: "Telah berpulang ke Rahmatullah...",
      date: new Date().toISOString().split('T')[0],
      active: true
    }
    const updated = [newNews, ...condolences]
    setCondolences(updated)
    saveCondolences(updated)
  }

  const updateCondolence = (id: string, field: keyof CondolenceNews, value: any) => {
    const updated = condolences.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    )
    setCondolences(updated)
    saveCondolences(updated)
  }

  const deleteCondolence = (id: string) => {
    if (window.confirm("Hapus berita duka ini?")) {
      const updated = condolences.filter(c => c.id !== id)
      setCondolences(updated)
      saveCondolences(updated)
    }
  }

  if (!safetyData) return <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center text-slate-600">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-3 xl:p-4 font-sans text-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 md:mb-3 bg-white p-2 md:p-3 xl:p-4 rounded-lg shadow-md">
        <div>
          <h1 className="text-base md:text-lg xl:text-2xl font-extrabold text-slate-900 m-0">Admin Panel</h1>
          <p className="text-slate-500 text-[10px] md:text-xs xl:text-sm m-0 mt-0.5">Safety Performance Board Management</p>
        </div>
        <Link href="/" className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-900 text-white no-underline rounded-md font-semibold text-xs md:text-sm hover:bg-slate-800 transition-colors">
          ← Kembali
        </Link>
      </div>

      {message && <div className="bg-green-100 text-green-800 p-2 md:p-3 rounded-md mb-2 md:mb-3 font-semibold border border-green-300 text-xs md:text-sm">{message}</div>}

      {/* Tabs */}
      <div className="flex gap-1 md:gap-2 mb-2 md:mb-3 border-b-2 border-slate-200 pb-px overflow-x-auto">
        <button 
          className={`px-2 md:px-3 py-1.5 md:py-2 bg-transparent border-none border-b-2 border-transparent font-semibold cursor-pointer text-[10px] md:text-xs xl:text-sm -mb-0.5 transition-all whitespace-nowrap ${activeTab === 'safety' ? 'text-sky-600 border-sky-600' : 'text-slate-500'}`}
          onClick={() => setActiveTab('safety')}
        >
          Data Keselamatan
        </button>
        <button 
          className={`px-2 md:px-3 py-1.5 md:py-2 bg-transparent border-none border-b-2 border-transparent font-semibold cursor-pointer text-[10px] md:text-xs xl:text-sm -mb-0.5 transition-all whitespace-nowrap ${activeTab === 'announcements' ? 'text-sky-600 border-sky-600' : 'text-slate-500'}`}
          onClick={() => setActiveTab('announcements')}
        >
          Pengumuman
        </button>
        <button 
          className={`px-2 md:px-3 py-1.5 md:py-2 bg-transparent border-none border-b-2 border-transparent font-semibold cursor-pointer text-[10px] md:text-xs xl:text-sm -mb-0.5 transition-all whitespace-nowrap ${activeTab === 'birthdays' ? 'text-sky-600 border-sky-600' : 'text-slate-500'}`}
          onClick={() => setActiveTab('birthdays')}
        >
          Ulang Tahun
        </button>
        <button 
          className={`px-2 md:px-3 py-1.5 md:py-2 bg-transparent border-none border-b-2 border-transparent font-semibold cursor-pointer text-[10px] md:text-xs xl:text-sm -mb-0.5 transition-all whitespace-nowrap ${activeTab === 'condolences' ? 'text-sky-600 border-sky-600' : 'text-slate-500'}`}
          onClick={() => setActiveTab('condolences')}
        >
          Berita Duka
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg p-2 md:p-3 xl:p-4 shadow-md max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-180px)] overflow-y-auto">
        
        {/* SAFETY DATA FORM */}
        {activeTab === 'safety' && (
          <div>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-sm md:text-base xl:text-lg font-bold m-0">Edit Data Keselamatan</h2>
              <div className="flex gap-2">
                <button onClick={handleReset} className="px-2 md:px-3 py-1 md:py-1.5 bg-red-500 text-white border-none rounded-md font-semibold cursor-pointer text-[10px] md:text-xs hover:bg-red-600">Reset Default</button>
                <button onClick={handleSafetySave} className="px-2 md:px-3 py-1 md:py-1.5 bg-sky-600 text-white border-none rounded-md font-semibold cursor-pointer text-[10px] md:text-xs hover:bg-sky-700">Simpan</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
              <div className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                <label className="block text-[9px] md:text-[10px] xl:text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Jumlah Tenaga Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.workers}
                  onChange={(e) => handleSafetyChange("workers", parseInt(e.target.value) || 0)}
                  className="w-full p-1.5 md:p-2 rounded-md border border-slate-300 text-sm md:text-base font-bold text-slate-900 bg-white"
                />
              </div>
              <div className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                <label className="block text-[9px] md:text-[10px] xl:text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Kecelakaan Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.accidents}
                  onChange={(e) => handleSafetyChange("accidents", parseInt(e.target.value) || 0)}
                  className="w-full p-1.5 md:p-2 rounded-md border border-slate-300 text-sm md:text-base font-bold text-slate-900 bg-white"
                />
              </div>
              <div className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                <label className="block text-[9px] md:text-[10px] xl:text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Total Jam Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.workHours}
                  onChange={(e) => handleSafetyChange("workHours", parseInt(e.target.value) || 0)}
                  className="w-full p-1.5 md:p-2 rounded-md border border-slate-300 text-sm md:text-base font-bold text-slate-900 bg-white"
                />
              </div>
              <div className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                <label className="block text-[9px] md:text-[10px] xl:text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Jam Kerja Aman</label>
                <input 
                  type="number" 
                  value={safetyData.safeHours}
                  onChange={(e) => handleSafetyChange("safeHours", parseInt(e.target.value) || 0)}
                  className="w-full p-1.5 md:p-2 rounded-md border border-slate-300 text-sm md:text-base font-bold text-slate-900 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-sm md:text-base xl:text-lg font-bold m-0">Kelola Pengumuman</h2>
              <button onClick={addAnnouncement} className="px-2 md:px-3 py-1 md:py-1.5 bg-green-500 text-white border-none rounded-md font-semibold cursor-pointer text-[10px] md:text-xs hover:bg-green-600">+ Tambah</button>
            </div>
            
            <div className="flex flex-col gap-2 md:gap-3">
              {announcements.map((item) => (
                <div key={item.id} className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <input 
                      value={item.title}
                      onChange={(e) => updateAnnouncement(item.id, "title", e.target.value)}
                      className="flex-1 p-1.5 md:p-2 rounded-md border border-slate-300 text-xs md:text-sm font-bold"
                      placeholder="Judul Pengumuman"
                    />
                    <div className="flex gap-1 md:gap-2 items-center">
                      <select 
                        value={item.priority}
                        onChange={(e) => updateAnnouncement(item.id, "priority", e.target.value)}
                        className="p-1 md:p-1.5 rounded-md border border-slate-300 bg-white font-medium text-[10px] md:text-xs"
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="info">Info</option>
                      </select>
                      <button 
                        onClick={() => updateAnnouncement(item.id, "active", !item.active)}
                        className={`px-2 py-1 rounded-full font-semibold text-[9px] md:text-[10px] cursor-pointer ${item.active ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-slate-100 text-slate-500 border border-slate-300'}`}
                      >
                        {item.active ? "Aktif" : "Non-Aktif"}
                      </button>
                      <button onClick={() => deleteAnnouncement(item.id)} className="px-2 py-1 bg-red-50 text-red-500 border border-red-200 rounded-md font-semibold cursor-pointer text-[9px] md:text-[10px] hover:bg-red-100">Hapus</button>
                    </div>
                  </div>
                  <textarea 
                    value={item.content}
                    onChange={(e) => updateAnnouncement(item.id, "content", e.target.value)}
                    className="w-full p-2 rounded-md border border-slate-300 min-h-[60px] md:min-h-[80px] text-xs md:text-sm font-sans resize-y"
                    placeholder="Isi pengumuman..."
                  />
                </div>
              ))}
              {announcements.length === 0 && <p className="text-center text-slate-500 italic py-4 text-xs md:text-sm">Belum ada pengumuman.</p>}
            </div>
          </div>
        )}

        {/* BIRTHDAYS */}
        {activeTab === 'birthdays' && (
          <div>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-sm md:text-base xl:text-lg font-bold m-0">Data Ulang Tahun Karyawan</h2>
              <button onClick={addBirthday} className="px-2 md:px-3 py-1 md:py-1.5 bg-green-500 text-white border-none rounded-md font-semibold cursor-pointer text-[10px] md:text-xs hover:bg-green-600">+ Tambah</button>
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              {birthdays.map((item) => (
                <div key={item.id} className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                  <div className="flex gap-2 items-start flex-wrap">
                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Nama Lengkap</label>
                      <input 
                        value={item.name}
                        onChange={(e) => updateBirthday(item.id, "name", e.target.value)}
                        className="w-full p-1.5 rounded-md border border-slate-300 text-xs md:text-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-[100px]">
                      <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Departemen</label>
                      <input 
                        value={item.department}
                        onChange={(e) => updateBirthday(item.id, "department", e.target.value)}
                        className="w-full p-1.5 rounded-md border border-slate-300 text-xs md:text-sm"
                      />
                    </div>
                    <div className="w-[70px] md:w-[80px]">
                      <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Tanggal</label>
                      <input 
                        value={item.birthDate}
                        onChange={(e) => updateBirthday(item.id, "birthDate", e.target.value)}
                        className="w-full p-1.5 rounded-md border border-slate-300 text-xs md:text-sm"
                        placeholder="MM-DD"
                      />
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Foto URL</label>
                      <input 
                        value={item.photo || ''}
                        onChange={(e) => updateBirthday(item.id, "photo", e.target.value)}
                        className="w-full p-1.5 rounded-md border border-slate-300 text-xs md:text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex items-end">
                      <button onClick={() => deleteBirthday(item.id)} className="px-2 py-1.5 bg-red-500 text-white border-none rounded-md font-semibold cursor-pointer text-[9px] md:text-[10px] hover:bg-red-600">Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
              {birthdays.length === 0 && <p className="text-center text-slate-500 italic py-4 text-xs md:text-sm">Belum ada data ulang tahun.</p>}
            </div>
          </div>
        )}

        {/* CONDOLENCES */}
        {activeTab === 'condolences' && (
          <div>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-sm md:text-base xl:text-lg font-bold m-0">Berita Duka Cita</h2>
              <button onClick={addCondolence} className="px-2 md:px-3 py-1 md:py-1.5 bg-green-500 text-white border-none rounded-md font-semibold cursor-pointer text-[10px] md:text-xs hover:bg-green-600">+ Tambah</button>
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              {condolences.map((item) => (
                <div key={item.id} className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <input 
                      value={item.name}
                      onChange={(e) => updateCondolence(item.id, "name", e.target.value)}
                      className="flex-1 p-1.5 md:p-2 rounded-md border border-slate-300 text-xs md:text-sm font-bold"
                      placeholder="Nama Almarhum/ah"
                    />
                    <div className="flex gap-1 md:gap-2 items-center">
                      <input 
                        type="date"
                        value={item.date}
                        onChange={(e) => updateCondolence(item.id, "date", e.target.value)}
                        className="p-1 md:p-1.5 rounded-md border border-slate-300 text-[10px] md:text-xs"
                      />
                      <button 
                        onClick={() => updateCondolence(item.id, "active", !item.active)}
                        className={`px-2 py-1 rounded-full font-semibold text-[9px] md:text-[10px] cursor-pointer ${item.active ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-slate-100 text-slate-500 border border-slate-300'}`}
                      >
                        {item.active ? "Aktif" : "Non-Aktif"}
                      </button>
                      <button onClick={() => deleteCondolence(item.id)} className="px-2 py-1 bg-red-50 text-red-500 border border-red-200 rounded-md font-semibold cursor-pointer text-[9px] md:text-[10px] hover:bg-red-100">Hapus</button>
                    </div>
                  </div>
                  <div className="mb-2">
                     <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Departemen</label>
                     <input 
                        value={item.department}
                        onChange={(e) => updateCondolence(item.id, "department", e.target.value)}
                        className="w-full p-1.5 rounded-md border border-slate-300 text-xs md:text-sm"
                        placeholder="Departemen"
                      />
                  </div>
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-slate-500 mb-0.5 uppercase">Pesan Duka</label>
                    <textarea 
                      value={item.message}
                      onChange={(e) => updateCondolence(item.id, "message", e.target.value)}
                      className="w-full p-2 rounded-md border border-slate-300 min-h-[50px] md:min-h-[70px] text-xs md:text-sm font-sans resize-y"
                      placeholder="Isi pesan duka..."
                    />
                  </div>
                </div>
              ))}
              {condolences.length === 0 && <p className="text-center text-slate-500 italic py-4 text-xs md:text-sm">Belum ada berita duka.</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
