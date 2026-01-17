"use client"

import { useEffect, useState } from "react"
import type { BirthdayEmployee } from "@/lib/storage"
import { cn } from "@/lib/utils"
import { Cake, PartyPopper, User } from "lucide-react"

interface BirthdayCardProps {
  birthdays: BirthdayEmployee[]
  className?: string
}

export function BirthdayCard({ birthdays, className }: BirthdayCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (birthdays.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % birthdays.length)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [birthdays.length])

  useEffect(() => {
    if (birthdays.length > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [birthdays.length])

  if (birthdays.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl bg-slate-800/80 backdrop-blur-sm p-5 border border-slate-700",
          className
        )}
      >
        <div className="flex items-center gap-3 text-slate-400">
          <Cake className="w-5 h-5" />
          <span>Tidak ada ulang tahun hari ini</span>
        </div>
      </div>
    )
  }

  const currentBirthday = birthdays[currentIndex]

  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-800/80 to-pink-500/10 backdrop-blur-sm overflow-hidden border border-amber-500/30 relative",
        className
      )}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ["#f59e0b", "#ec4899", "#10b981", "#3b82f6"][
                  Math.floor(Math.random() * 4)
                ],
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/20 flex items-center gap-2">
        <PartyPopper className="w-5 h-5 text-amber-400" />
        <span className="font-semibold text-sm uppercase tracking-wider text-amber-300">
          Ulang Tahun Hari Ini
        </span>
      </div>

      {/* Content */}
      <div className="p-5 relative min-h-[140px]">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center flex-shrink-0 ring-4 ring-amber-400/20">
            {currentBirthday.photo ? (
              <img
                src={currentBirthday.photo}
                alt={currentBirthday.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">
              {currentBirthday.name}
            </h3>
            <p className="text-sm text-slate-400 mb-2">
              {currentBirthday.department}
            </p>
            <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
              <Cake className="w-4 h-4" />
              Selamat Ulang Tahun! 🎉
            </p>
          </div>
        </div>

        {/* Navigation dots */}
        {birthdays.length > 1 && (
          <div className="flex gap-1 mt-4 justify-center">
            {birthdays.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "bg-amber-400 w-4"
                    : "bg-slate-600 hover:bg-slate-500"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
