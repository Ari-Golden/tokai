"use client";

import { useEffect, useState } from "react";

export function SafetyDashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.getDate().toString().padStart(2, "0");
      const month = now
        .toLocaleDateString("id-ID", { month: "short" })
        .toUpperCase();
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setCurrentDate(`${date} ${month}`);
      setCurrentTime(`${hours}:${minutes}`);
      setCurrentYear(year.toString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6 text-white font-sans">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              SAFETY PERFORMANCE DASHBOARD
            </h1>
            <p className="text-sm md:text-base text-cyan-300 mt-1 font-medium">
              PT. Tokai Rubber Indonesia — Manufacturing Division
            </p>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* DateTime Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Tanggal", value: currentDate },
          { label: "Waktu", value: currentTime },
          { label: "Tahun", value: currentYear },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center hover:border-cyan-500 transition-colors duration-300"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              {item.label}
            </p>
            <p className="text-3xl md:text-4xl font-mono font-bold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Workers */}
          <MetricCard
            title="Jumlah Tenaga Kerja"
            value="600"
            unit="Orang"
            color="blue"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            }
          />

          {/* Accidents */}
          <MetricCard
            title="Kecelakaan Kerja"
            value="0"
            unit="Kali"
            color="orange"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-1.143-2.36-1.143-3.13 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            }
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Work Hours */}
          <MetricCard
            title="Total Jam Kerja"
            value="128,400"
            unit="Jam"
            color="cyan"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          {/* Safe Hours */}
          <MetricCard
            title="Jam Kerja Aman"
            value="128,400"
            unit="Jam"
            color="emerald"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Quote */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#22c55e_25%,transparent_25%),linear-gradient(-45deg,#22c55e_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#22c55e_75%),linear-gradient(-45deg,transparent_75%,#22c55e_75%)] bg-[length:20px_20px] opacity-10"></div>
          <p className="text-center text-xl md:text-2xl font-bold z-10 leading-relaxed px-4">
            <span className="text-emerald-400">Zero Accident</span> Bukan Target
            — Itu Budaya!
          </p>
        </div>

        {/* Environmental Sensors */}
        <div className="space-y-6">
          <MetricCard
            title="Temperatur Ruang Produksi"
            value="28.5"
            unit="°C"
            color="red"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
          />
          <MetricCard
            title="Kelembaban Udara"
            value="62"
            unit="%"
            color="blue"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16.5V6a2 2 0 012-2h6a2 2 0 012 2v10.5M5 6h14"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Metric Card Component
function MetricCard({
  title,
  value,
  unit,
  color,
  icon,
}: {
  title: string;
  value: string;
  unit: string;
  color: string;
  icon: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    blue: "border-blue-500/50 text-blue-400",
    orange: "border-orange-500/50 text-orange-400",
    cyan: "border-cyan-500/50 text-cyan-400",
    emerald: "border-emerald-500/50 text-emerald-400",
    red: "border-red-500/50 text-red-400",
  };

  return (
    <div
      className={`bg-slate-800 border-l-4 ${colorMap[color]} rounded-xl p-5 hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl md:text-4xl font-mono font-bold text-white">
              {value}
            </span>
            <span className="text-lg text-slate-400">{unit}</span>
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-md bg-${color}-500/10 flex items-center justify-center text-${color}-400`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
