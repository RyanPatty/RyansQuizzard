"use client"

import { useState, useEffect } from "react"

/**
 * Persist React state to localStorage without causing render loops.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1️⃣  Read from localStorage once (lazy initialiser).
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // 2️⃣  Persist whenever the value changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error saving to localStorage:", error)
    }
  }, [key, storedValue])

  // 3️⃣  Setter with identical API to useState.
  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prev) => (value instanceof Function ? value(prev) : value))
  }

  return [storedValue, setValue] as const
}
