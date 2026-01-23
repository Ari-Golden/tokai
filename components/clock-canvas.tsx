"use client"

import { useEffect, useRef } from "react"

export function ClockCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const drawClock = () => {
      const now = new Date()
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set Font & Style
      // Scaling font based on canvas width (approx 300px for desktop)
      // 36px matches roughly text-4xl
      ctx.font = "bold 29px 'Inter', sans-serif"
      ctx.fillStyle = "#0df2f2" // Cyan color
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      // Shadow/Glow effect (optional, removed if causes issues, but canvas handles it better)
      // ctx.shadowColor = "rgba(13, 242, 242, 0.5)"
      // ctx.shadowBlur = 10

      // Draw Text
      // Position x at width (right aligned), y at center
      ctx.fillText(timeString, canvas.width, canvas.height / 2)
    }

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1
    // Set display size (css pixels). matching visually with previous text size
    const width = 200
    const height = 50
    
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    // Scale all drawing operations by the dpr
    ctx.scale(dpr, dpr)

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
      style={{ width: "200px", height: "50px" }} // Fallback size
    />
  )
}
