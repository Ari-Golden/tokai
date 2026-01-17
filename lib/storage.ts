export interface SafetyData {
  workers: number
  accidents: number
  workHours: number
  safeHours: number
  temperature: number
  humidity: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  priority: 'urgent' | 'normal' | 'info'
  active: boolean
}

export interface BirthdayEmployee {
  id: string
  name: string
  department: string
  birthDate: string // format: MM-DD
  photo?: string
}

export interface CondolenceNews {
  id: string
  name: string
  department: string
  message: string
  date: string
  active: boolean
}

export interface BoardData {
  safety: SafetyData
  announcements: Announcement[]
  birthdays: BirthdayEmployee[]
  condolences: CondolenceNews[]
}

const STORAGE_KEY = "safety_performance_data"
const ANNOUNCEMENTS_KEY = "board_announcements"
const BIRTHDAYS_KEY = "board_birthdays"
const CONDOLENCES_KEY = "board_condolences"

const DEFAULT_SAFETY: SafetyData = {
  workers: 600,
  accidents: 0,
  workHours: 128400,
  safeHours: 128400,
  temperature: 28,
  humidity: 62,
}

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Pengingat APD",
    content: "Pastikan menggunakan APD lengkap di Area Produksi.",
    priority: "urgent",
    active: true,
  },
  {
    id: "2",
    title: "Lomba Inovasi K3",
    content: "Segera daftarkan tim Anda sebelum 30 Januari 2026.",
    priority: "normal",
    active: true,
  },
  {
    id: "3",
    title: "Program 5R",
    content: "Jaga kebersihan dan kerapian area kerja. 5R adalah budaya kita.",
    priority: "info",
    active: true,
  },
]

const DEFAULT_BIRTHDAYS: BirthdayEmployee[] = [
  {
    id: "1",
    name: "Budi Santoso",
    department: "Produksi",
    birthDate: "01-17",
  },
  {
    id: "2",
    name: "Siti Rahayu",
    department: "Quality Control",
    birthDate: "01-18",
  },
  {
    id: "3",
    name: "Ahmad Wijaya",
    department: "Maintenance",
    birthDate: "01-20",
  },
]

const DEFAULT_CONDOLENCES: CondolenceNews[] = []

// Safety Data Functions
export function getData(): SafetyData {
  if (typeof window === "undefined") return DEFAULT_SAFETY

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : DEFAULT_SAFETY
  } catch {
    return DEFAULT_SAFETY
  }
}

export function saveData(data: SafetyData): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving data:", error)
  }
}

export function resetData(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error resetting data:", error)
  }
}

// Announcement Functions
export function getAnnouncements(): Announcement[] {
  if (typeof window === "undefined") return DEFAULT_ANNOUNCEMENTS

  try {
    const data = localStorage.getItem(ANNOUNCEMENTS_KEY)
    return data ? JSON.parse(data) : DEFAULT_ANNOUNCEMENTS
  } catch {
    return DEFAULT_ANNOUNCEMENTS
  }
}

export function saveAnnouncements(data: Announcement[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving announcements:", error)
  }
}

// Birthday Functions
export function getBirthdays(): BirthdayEmployee[] {
  if (typeof window === "undefined") return DEFAULT_BIRTHDAYS

  try {
    const data = localStorage.getItem(BIRTHDAYS_KEY)
    return data ? JSON.parse(data) : DEFAULT_BIRTHDAYS
  } catch {
    return DEFAULT_BIRTHDAYS
  }
}

export function saveBirthdays(data: BirthdayEmployee[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(BIRTHDAYS_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving birthdays:", error)
  }
}

export function getTodayBirthdays(): BirthdayEmployee[] {
  const birthdays = getBirthdays()
  const today = new Date()
  const todayStr = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  
  return birthdays.filter(b => b.birthDate === todayStr)
}

// Condolence Functions
export function getCondolences(): CondolenceNews[] {
  if (typeof window === "undefined") return DEFAULT_CONDOLENCES

  try {
    const data = localStorage.getItem(CONDOLENCES_KEY)
    return data ? JSON.parse(data) : DEFAULT_CONDOLENCES
  } catch {
    return DEFAULT_CONDOLENCES
  }
}

export function saveCondolences(data: CondolenceNews[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CONDOLENCES_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving condolences:", error)
  }
}
