"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  unit: string
  icon: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "info"
  className?: string
}

const variantStyles = {
  default: {
    border: "border-slate-600/50",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-300",
    accent: "from-slate-500/20 to-transparent",
  },
  success: {
    border: "border-emerald-500/50",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    accent: "from-emerald-500/20 to-transparent",
  },
  warning: {
    border: "border-amber-500/50",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    accent: "from-amber-500/20 to-transparent",
  },
  danger: {
    border: "border-red-500/50",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    accent: "from-red-500/20 to-transparent",
  },
  info: {
    border: "border-blue-500/50",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    accent: "from-blue-500/20 to-transparent",
  },
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  variant = "default",
  className,
}: MetricCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-l-4 bg-slate-800/80 backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50",
        styles.border,
        className
      )}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-50 pointer-events-none",
          styles.accent
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
              {typeof value === "number" ? value.toLocaleString("id-ID") : value}
            </span>
            <span className="text-sm text-slate-400 font-medium">{unit}</span>
          </div>
        </div>

        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
            styles.iconBg,
            styles.iconColor
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
