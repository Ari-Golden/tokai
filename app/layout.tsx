"use client"

import type React from "react"
import { Roboto } from "next/font/google"
import "./globals.css"
import { useExitOnEscape } from "@/hooks/use-exit-on-escape"

const fontSans = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Panggil hook untuk fungsionalitas keluar dengan tombol Esc
  useExitOnEscape()

  return (
    <html lang="id" className={fontSans.variable}>
      <head>
        <title>Safety Performance Board</title>
        <meta
          name="description"
          content="Papan Kinerja Keselamatan PT. Tokai Rubber Indonesia"
        />
        <meta
          name="viewport"
          content="width=1920, height=1080, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  )
}
