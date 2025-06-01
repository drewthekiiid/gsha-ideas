"use client"

import { createContext, useContext } from "react"

export interface AppContextType {
  isMuted: boolean
  prefersReducedMotion: boolean
  activeSection: string
  showFixedElements: boolean
  currentThemeColor?: string | null // For menu orb glow
  scrollToSection?: (sectionId: string) => void // For menu orb navigation
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContext.Provider")
  }
  return context
}
