export interface SafetyData {
  workers: number
  accidents: number
  workHours: number
  safeHours: number
  temperature: number
  humidity: number
}

const STORAGE_KEY = "safety_performance_data"

const DEFAULT_DATA: SafetyData = {
  workers: 600,
  accidents: 0,
  workHours: 600,
  safeHours: 600,
  temperature: 28,
  humidity: 75,
}

export function getData(): SafetyData {
  if (typeof window === "undefined") return DEFAULT_DATA

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : DEFAULT_DATA
  } catch {
    return DEFAULT_DATA
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
