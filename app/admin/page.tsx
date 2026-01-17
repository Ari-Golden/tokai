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

  if (!safetyData) return <div style={styles.container}>Loading...</div>

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Panel</h1>
          <p style={styles.subtitle}>Safety Performance Board Management</p>
        </div>
        <Link href="/" style={styles.backButton}>
          ← Kembali ke Dashboard
        </Link>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          style={{...styles.tab, ...(activeTab === 'safety' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('safety')}
        >
          Data Keselamatan
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'announcements' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('announcements')}
        >
          Pengumuman
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'birthdays' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('birthdays')}
        >
          Ulang Tahun
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'condolences' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('condolences')}
        >
          Berita Duka
        </button>
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        
        {/* SAFETY DATA FORM */}
        {activeTab === 'safety' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Edit Data Keselamatan</h2>
              <div style={styles.actions}>
                <button onClick={handleReset} style={styles.btnDanger}>Reset Default</button>
                <button onClick={handleSafetySave} style={styles.btnPrimary}>Simpan Perubahan</button>
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.card}>
                <label style={styles.label}>Jumlah Tenaga Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.workers}
                  onChange={(e) => handleSafetyChange("workers", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
              <div style={styles.card}>
                <label style={styles.label}>Kecelakaan Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.accidents}
                  onChange={(e) => handleSafetyChange("accidents", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
              <div style={styles.card}>
                <label style={styles.label}>Total Jam Kerja</label>
                <input 
                  type="number" 
                  value={safetyData.workHours}
                  onChange={(e) => handleSafetyChange("workHours", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
              <div style={styles.card}>
                <label style={styles.label}>Jam Kerja Aman</label>
                <input 
                  type="number" 
                  value={safetyData.safeHours}
                  onChange={(e) => handleSafetyChange("safeHours", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
              <div style={styles.card}>
                <label style={styles.label}>Temperatur (°C)</label>
                <input 
                  type="number" 
                  value={safetyData.temperature}
                  onChange={(e) => handleSafetyChange("temperature", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
              <div style={styles.card}>
                <label style={styles.label}>Kelembaban (%)</label>
                <input 
                  type="number" 
                  value={safetyData.humidity}
                  onChange={(e) => handleSafetyChange("humidity", parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Kelola Pengumuman</h2>
              <button onClick={addAnnouncement} style={styles.btnSuccess}>+ Tambah Pengumuman</button>
            </div>
            
            <div style={styles.list}>
              {announcements.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.listHeader}>
                    <input 
                      value={item.title}
                      onChange={(e) => updateAnnouncement(item.id, "title", e.target.value)}
                      style={styles.inputTitle}
                      placeholder="Judul Pengumuman"
                    />
                    <div style={styles.controls}>
                      <select 
                        value={item.priority}
                        onChange={(e) => updateAnnouncement(item.id, "priority", e.target.value)}
                        style={styles.select}
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="info">Info</option>
                      </select>
                      <button 
                        onClick={() => updateAnnouncement(item.id, "active", !item.active)}
                        style={item.active ? styles.badgeActive : styles.badgeInactive}
                      >
                        {item.active ? "Aktif" : "Non-Aktif"}
                      </button>
                      <button onClick={() => deleteAnnouncement(item.id)} style={styles.btnDangerSmall}>Hapus</button>
                    </div>
                  </div>
                  <textarea 
                    value={item.content}
                    onChange={(e) => updateAnnouncement(item.id, "content", e.target.value)}
                    style={styles.textarea}
                    placeholder="Isi pengumuman..."
                  />
                </div>
              ))}
              {announcements.length === 0 && <p style={styles.empty}>Belum ada pengumuman.</p>}
            </div>
          </div>
        )}

        {/* BIRTHDAYS */}
        {activeTab === 'birthdays' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Data Ulang Tahun Karyawan</h2>
              <button onClick={addBirthday} style={styles.btnSuccess}>+ Tambah Karyawan</button>
            </div>

            <div style={styles.list}>
              {birthdays.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.gridRow}>
                    <div style={{flex: 1}}>
                      <label style={styles.smallLabel}>Nama Lengkap</label>
                      <input 
                        value={item.name}
                        onChange={(e) => updateBirthday(item.id, "name", e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={styles.smallLabel}>Departemen</label>
                      <input 
                        value={item.department}
                        onChange={(e) => updateBirthday(item.id, "department", e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={{width: '100px'}}>
                      <label style={styles.smallLabel}>Tanggal (MM-DD)</label>
                      <input 
                        value={item.birthDate}
                        onChange={(e) => updateBirthday(item.id, "birthDate", e.target.value)}
                        style={styles.input}
                        placeholder="MM-DD"
                      />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={styles.smallLabel}>Foto URL</label>
                      <input 
                        value={item.photo || ''}
                        onChange={(e) => updateBirthday(item.id, "photo", e.target.value)}
                        style={styles.input}
                        placeholder="https://..."
                      />
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                      <button onClick={() => deleteBirthday(item.id)} style={styles.btnDanger}>Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
              {birthdays.length === 0 && <p style={styles.empty}>Belum ada data ulang tahun.</p>}
            </div>
          </div>
        )}

        {/* CONDOLENCES */}
        {activeTab === 'condolences' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Berita Duka Cita</h2>
              <button onClick={addCondolence} style={styles.btnSuccess}>+ Tambah Berita</button>
            </div>

            <div style={styles.list}>
              {condolences.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.listHeader}>
                    <input 
                      value={item.name}
                      onChange={(e) => updateCondolence(item.id, "name", e.target.value)}
                      style={styles.inputTitle}
                      placeholder="Nama Almarhum/ah"
                    />
                    <div style={styles.controls}>
                      <input 
                        type="date"
                        value={item.date}
                        onChange={(e) => updateCondolence(item.id, "date", e.target.value)}
                        style={styles.inputDate}
                      />
                      <button 
                        onClick={() => updateCondolence(item.id, "active", !item.active)}
                        style={item.active ? styles.badgeActive : styles.badgeInactive}
                      >
                        {item.active ? "Aktif" : "Non-Aktif"}
                      </button>
                      <button onClick={() => deleteCondolence(item.id)} style={styles.btnDangerSmall}>Hapus</button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                     <label style={styles.smallLabel}>Departemen</label>
                     <input 
                        value={item.department}
                        onChange={(e) => updateCondolence(item.id, "department", e.target.value)}
                        style={styles.input}
                        placeholder="Departemen"
                      />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.smallLabel}>Pesan Duka</label>
                    <textarea 
                      value={item.message}
                      onChange={(e) => updateCondolence(item.id, "message", e.target.value)}
                      style={styles.textarea}
                      placeholder="Isi pesan duka..."
                    />
                  </div>
                </div>
              ))}
              {condolences.length === 0 && <p style={styles.empty}>Belum ada berita duka.</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// STYLES
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    padding: "2rem",
    fontFamily: "'Inter', sans-serif",
    color: "#0f172a",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    backgroundColor: "white",
    padding: "1.5rem 2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  subtitle: {
    color: "#64748b",
    marginTop: "0.25rem",
    margin: 0,
  },
  backButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0f172a",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  message: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "2rem",
    fontWeight: "600",
    border: "1px solid #86efac",
  },
  tabs: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "1px",
  },
  tab: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#64748b",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "-2px",
    transition: "all 0.2s",
  },
  activeTab: {
    color: "#0284c7",
    borderBottom: "2px solid #0284c7",
  },
  content: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  section: {
    animation: "fadeIn 0.3s ease-in-out",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#f8fafc",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: "1px solid #e2e8f0",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "#0f172a",
    backgroundColor: "white",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  btnPrimary: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0284c7",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnSuccess: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnDanger: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnDangerSmall: {
    padding: "0.5rem 1rem",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    border: "1px solid #fecaca",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  listItem: {
    backgroundColor: "#f8fafc",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: "1px solid #e2e8f0",
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "1rem",
  },
  inputTitle: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    fontSize: "1.25rem",
    fontWeight: "700",
  },
  controls: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  select: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    backgroundColor: "white",
    fontWeight: "500",
  },
  textarea: {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    minHeight: "100px",
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    marginTop: "0.5rem",
  },
  badgeActive: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dcfce7",
    color: "#166534",
    border: "1px solid #86efac",
    borderRadius: "9999px",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
  },
  badgeInactive: {
    padding: "0.5rem 1rem",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    border: "1px solid #cbd5e1",
    borderRadius: "9999px",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    fontStyle: "italic",
    padding: "2rem",
  },
  gridRow: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  smallLabel: {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "0.25rem",
    textTransform: "uppercase",
  },
  inputDate: {
    padding: "0.65rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
  },
  formGroup: {
    marginBottom: "1rem",
  }
}
