"use client"

import { useEffect, useState } from "react"
import type { Announcement } from "@/lib/storage"
import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Megaphone } from "lucide-react"

interface AnnouncementTickerProps {
  announcements: Announcement[]
  className?: string
}

const priorityStyles = {
  urgent: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    titleColor: "text-red-300",
  },
  normal: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: Megaphone,
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
  },
  info: {
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    icon: Info,
    iconColor: "text-slate-400",
    titleColor: "text-slate-300",
  },
}

export function AnnouncementTicker({
  announcements,
  className,
}: AnnouncementTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeAnnouncements = announcements.filter((a) => a.active)

  useEffect(() => {
    if (activeAnnouncements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [activeAnnouncements.length])

  if (activeAnnouncements.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl bg-slate-800/80 backdrop-blur-sm p-5 border border-slate-700",
          className
        )}
      >
        <div className="flex items-center gap-3 text-slate-400">
          <Megaphone className="w-5 h-5" />
          <span>Tidak ada pengumuman saat ini</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-slate-800/80 backdrop-blur-sm overflow-hidden border border-slate-700",
        className
      )}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Megaphone className="w-5 h-5" />
          <span className="font-semibold text-sm uppercase tracking-wider">
            Pengumuman
          </span>
        </div>
        <div className="flex gap-1">
          {activeAnnouncements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === currentIndex
                  ? "bg-cyan-400 w-4"
                  : "bg-slate-600 hover:bg-slate-500"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 min-h-[120px] relative">
        {activeAnnouncements.map((announcement, idx) => {
          const style = priorityStyles[announcement.priority]
          const Icon = style.icon

          return (
            <div
              key={announcement.id}
              className={cn(
                "absolute inset-x-5 top-5 transition-all duration-500",
                idx === currentIndex
                  ? "opacity-100 translate-x-0"
                  : idx < currentIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              )}
            >
              <div
                className={cn(
                  "rounded-lg p-4 border",
                  style.bg,
                  style.border
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", style.iconColor)} />
                  <div>
                    <p className={cn("font-semibold text-sm mb-1", style.titleColor)}>
                      {announcement.title}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
