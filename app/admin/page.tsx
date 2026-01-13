"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getData, saveData, resetData } from "@/lib/storage"
import type { SafetyData } from "@/lib/storage"
import Link from "next/link"

export default function AdminPage() {
  const [formData, setFormData] = useState<SafetyData | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setFormData(getData())
  }, [])

  const handleChange = (field: keyof SafetyData, value: number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleSave = () => {
    if (formData) {
      saveData(formData)
      setMessage("Data berhasil disimpan!")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin reset data ke default?")) {
      resetData()
      setFormData(getData())
      setMessage("Data berhasil di-reset!")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  if (!formData) return null

  return (
    <div style={styles.container}>
      {/* Admin Header */}
      <div style={styles.adminHeader}>
        <h1 style={styles.adminTitle}>Admin Panel - Safety Performance Board</h1>
        <div style={styles.adminNav}>
          <Link href="/" style={styles.navLink}>
            Kembali ke Dashboard
          </Link>
        </div>
      </div>

      {/* Message */}
      {message && <div style={styles.successMessage}>{message}</div>}

      {/* Form Section */}
      <div style={styles.formSection}>
        <h2 style={styles.formTitle}>Edit Data Keselamatan</h2>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Jumlah Tenaga Kerja (Orang)</label>
            <input
              type="number"
              value={formData.workers}
              onChange={(e) => handleChange("workers", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Jumlah Kecelakaan (Kali)</label>
            <input
              type="number"
              value={formData.accidents}
              onChange={(e) => handleChange("accidents", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Jumlah Jam Kerja (Jam)</label>
            <input
              type="number"
              value={formData.workHours}
              onChange={(e) => handleChange("workHours", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Jam Kerja Aman (Jam)</label>
            <input
              type="number"
              value={formData.safeHours}
              onChange={(e) => handleChange("safeHours", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Temperatur (°C)</label>
            <input
              type="number"
              value={formData.temperature}
              onChange={(e) => handleChange("temperature", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Kelembaban (%)</label>
            <input
              type="number"
              value={formData.humidity}
              onChange={(e) => handleChange("humidity", Number.parseInt(e.target.value) || 0)}
              style={styles.formInput}
            />
          </div>
        </div>

        <div style={styles.formActions}>
          <button onClick={handleSave} style={styles.btnPrimary}>
            Simpan Perubahan
          </button>
          <button onClick={handleReset} style={styles.btnDanger}>
            Reset ke Default
          </button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    boxSizing: "border-box",
  },
  adminHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    border: "4px solid #000000",
    backgroundColor: "#f5f5f5",
  },
  adminTitle: {
    fontSize: "36px",
    fontWeight: 900,
    color: "#000000",
    margin: 0,
  },
  adminNav: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    padding: "12px 24px",
    border: "3px solid #000000",
    backgroundColor: "#ffffff",
    color: "#000000",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  successMessage: {
    padding: "20px",
    border: "3px solid #4caf50",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    fontSize: "18px",
    fontWeight: 700,
    borderRadius: "4px",
    textAlign: "center",
  },
  formSection: {
    padding: "30px",
    border: "4px solid #000000",
    backgroundColor: "#f9f9f9",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: 900,
    color: "#000000",
    marginBottom: "25px",
    margin: "0 0 25px 0",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "25px",
    marginBottom: "25px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#333333",
    marginBottom: "10px",
  },
  formInput: {
    padding: "15px",
    border: "3px solid #000000",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    fontFamily: "Roboto, sans-serif",
    boxSizing: "border-box",
  },
  formActions: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },
  btnPrimary: {
    padding: "15px 30px",
    border: "3px solid #000000",
    backgroundColor: "#003da5",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "4px",
    fontFamily: "Roboto, sans-serif",
  },
  btnDanger: {
    padding: "15px 30px",
    border: "3px solid #000000",
    backgroundColor: "#ff4444",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "4px",
    fontFamily: "Roboto, sans-serif",
  },
}
