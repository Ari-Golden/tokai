"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { useExitOnEscape } from "@/hooks/use-exit-on-escape"

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
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
          content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
