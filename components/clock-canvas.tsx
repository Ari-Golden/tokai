"use client"

import { useEffect, useRef } from "react"

export function ClockCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1
    // Increased size to prevent cutting off
    const width = 300
    const height = 60
    
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Scale all drawing operations by the dpr
    ctx.scale(dpr, dpr)

    const drawClock = () => {
      const now = new Date()
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`

      // Clear canvas (using logical coords due to scale)
      ctx.clearRect(0, 0, width, height)

      // Set Font & Style
      ctx.font = "bold 29px 'Inter', sans-serif"
      ctx.fillStyle = "#0df2f2" // Cyan color
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      // Draw Text - Position at logical width with padding
      ctx.fillText(timeString, width - 2, height / 2)
    }

    // Initial draw
    drawClock()

    // Animation loop
    const interval = setInterval(drawClock, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="block"
      style={{ width: "300px", height: "60px" }} // Fallback size matching logical size
    />
  )
}
