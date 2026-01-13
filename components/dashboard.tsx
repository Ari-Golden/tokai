"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { getData } from "@/lib/storage";
import type { SafetyData } from "@/lib/storage";

export function Dashboard() {
  const [data, setData] = useState<SafetyData | null>(null);
  const [dateTime, setDateTime] = useState({ date: "", time: "", year: "" });

  useEffect(() => {
    const loadData = () => {
      setData(getData());
    };

    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      setDateTime({
        date: `${day} ${month}`,
        time: `${hours}:${minutes}`,
        year: String(year),
      });
    };

    loadData();
    updateDateTime();

    const timeInterval = setInterval(updateDateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  if (!data) return null;

  const accidentColor = data.accidents > 0 ? "#ff0000" : "#000000";

  return (
    <div style={styles.container}>
      {/* Header */}
      <div
        className="shadow-sm text-blue-500 bg-cyan-600"
        style={styles.header}
      >
        <img src="/tokai1.png" alt="Company Logo" style={styles.logo} />
        <div style={styles.titleSection}>
          <h1 style={styles.mainTitle}>SAFETY PERFORMANCE BOARD</h1>
          <h2 style={styles.subtitle}>PT. Tokai Rubber Indonesia</h2>
        </div>
        <img src="/logo safety.png" alt="Company Logo" style={styles.logo} />
      </div>

      {/* Date/Time Info */}
      <div style={styles.infoSection}>
        <div style={styles.infoBox}>
          <div style={styles.infoLabel}>Tanggal</div>
          <div style={styles.infoValue}>{dateTime.date}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoLabel}>Jam</div>
          <div style={styles.infoValue}>{dateTime.time}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoLabel}>Tahun</div>
          <div style={styles.infoValue}>{dateTime.year}</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={styles.metricsGrid}>
        {/* Row 1 */}
        <div style={styles.metricRow}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabelArea}>
              <div style={styles.metricLabel}>Jumlah Tenaga Kerja</div>
              <div style={styles.metricUnit}>Orang</div>
            </div>
            <div style={styles.metricValue}>
              {String(data.workers).padStart(3, "0")}
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricLabelArea}>
              <div style={styles.metricLabel}>Jumlah Jam Kerja</div>
              <div style={styles.metricUnit}>Jam</div>
            </div>
            <div style={styles.metricValue}>
              {String(data.workHours).padStart(3, "0")}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={styles.metricRow}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabelArea}>
              <div style={styles.metricLabel}>Jumlah Kecelakaan Kerja</div>
              <div style={styles.metricUnit}>Kali</div>
            </div>
            <div style={{ ...styles.metricValue, color: accidentColor }}>
              {String(data.accidents).padStart(3, "0")}
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricLabelArea}>
              <div style={styles.metricLabel}>Jam Kerja Aman</div>
              <div style={styles.metricUnit}>Jam</div>
            </div>
            <div style={styles.metricValue}>
              {String(data.safeHours).padStart(3, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div style={styles.messageSection}>
        <p style={styles.messageText}>
          Keselamatan Bukan Pilihan — Itu Kewajiban!!
        </p>
      </div>

      {/* Environmental Section */}
      <div style={styles.environmentalSection}>
        <div style={styles.envCard}>
          <div style={styles.envLabelArea}>
            <div style={styles.envLabel}>Temperatur</div>
          </div>
          <div style={styles.envValue}>
            {String(data.temperature).padStart(3, "0")}
          </div>
          <div style={styles.envUnit}>°C</div>
        </div>
        <div style={styles.envCard}>
          <div style={styles.envLabelArea}>
            <div style={styles.envLabel}>Humidity</div>
          </div>
          <div style={styles.envValue}>
            {String(data.humidity).padStart(3, "0")}
          </div>
          <div style={styles.envUnit}>%</div>
        </div>
      </div>

      {/* Admin Link */}
      <div style={styles.adminLink}>
        <a href="/admin" style={styles.adminButton}>
          ⚙️ Admin Panel
        </a>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    padding: "40px",
    background: "#04054e",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    boxSizing: "border-box",
    animation: "slideInUp 0.6s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 18px",
    border: "3px solid #e0e7ff",
    // background: "linear-gradient(135deg, #3f3b3b 0%, #f8fafc 100%)",
    backgroundColor: "#e8ecf5",
    gap: "32px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 32px rgba(0, 61, 165, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
  },
  logo: {
    fontSize: "16px",
    fontWeight: 900,
    background: "linear-gradient(135deg, #003da5 0%, #002970 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    minWidth: "30px",
  },
  titleSection: {
    flex: 1,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: "30px",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "30px",
    fontWeight: 900,
    color: "#4a4b68",
    margin: 0,
  },
  gearIcon: {
    fontSize: "38px",
    animation: "spin 3s linear infinite",
    opacity: 0.8,
  },
  infoSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
  },
  infoBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "18px 24px",
    border: "2px solid #e0e7ff",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  infoLabel: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#4a5568",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "24px",
    fontWeight: 900,
    background: "linear-gradient(135deg, #003da5 0%, #002970 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
  },
  metricsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    flex: 1,
  },
  metricRow: {
    display: "flex",
    gap: "28px",
    alignItems: "stretch",
  },
  metricCard: {
    display: "flex",
    alignItems: "center",
    padding: "16px 28px",
    border: "2px solid #e0e7ff",
    background:
      "linear-gradient(135deg, #ffffff 0%, rgba(248, 250, 252, 0.5) 100%)",
    gap: "28px",
    flex: 1,
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  metricLabelArea: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  metricLabel: {
    fontSize: "40px",
    fontWeight: 600,
    color: "#0f0f0f",
    letterSpacing: "-0.3px",
  },
  metricUnit: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#4a5568",
  },
  metricValue: {
    fontSize: "40px",
    fontWeight: 900,
    color: "#1a1a2e",
    lineHeight: 1,
    whiteSpace: "nowrap",
    letterSpacing: "-2px",
  },
  messageSection: {
    padding: "16px",
    border: "2px solid #e0e7ff",
    background: "#ffff",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  },
  messageText: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#1a1a2e",
    lineHeight: 1.6,
    margin: 0,
    animation: "fadeIn 1.5s ease-in-out",
    letterSpacing: "-0.5px",
  },
  environmentalSection: {
    display: "flex",
    gap: "18px",
  },
  envCard: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "16px 28px",
    border: "2px solid #e0e7ff",
    background:
      "linear-gradient(135deg, #ffffff 0%, rgba(248, 250, 252, 0.5) 100%)",
    gap: "28px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  envLabelArea: {
    flex: 1,
  },
  envLabel: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#4a5568",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  envValue: {
    fontSize: "30px",
    fontWeight: 900,
    color: "#1a1a2e",
    lineHeight: 1,
    whiteSpace: "nowrap",
    letterSpacing: "-2px",
  },
  envUnit: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#4a5568",
    marginLeft: "8px",
  },
  adminLink: {
    textAlign: "center",
    marginTop: "20px",
  },
  adminButton: {
    padding: "14px 28px",
    border: "2px solid #003da5",
    background: "linear-gradient(135deg, #003da5 0%, #002970 100%)",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "8px",
    display: "inline-block",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 12px rgba(0, 61, 165, 0.2)",
  },
};
