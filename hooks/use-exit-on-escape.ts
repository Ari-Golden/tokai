"use client"

import { useEffect } from "react"

export function useExitOnEscape() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Periksa apakah tombol yang ditekan adalah "Escape"
      if (event.key === "Escape") {
        // Periksa apakah aplikasi berjalan dalam mode standalone (PWA)
        if (window.matchMedia("(display-mode: standalone)").matches) {
          // Coba tutup jendela PWA.
          // Catatan: Ini mungkin tidak berfungsi di semua browser karena alasan keamanan,
          // tetapi ini adalah pendekatan standar.
          window.close()
        }
      }
    }

    // Tambahkan event listener
    document.addEventListener("keydown", handleKeyDown)

    // Hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, []) // Array dependensi kosong memastikan efek ini hanya berjalan sekali
}
