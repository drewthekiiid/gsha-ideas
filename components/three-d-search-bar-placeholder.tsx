"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  textToType: string
  startAnimation: boolean
}

const ThreeDSearchBarPlaceholder: React.FC<SearchBarProps> = ({ textToType, startAnimation }) => {
  const { isMuted, prefersReducedMotion } = useAppContext()
  const [typedText, setTypedText] = useState("")
  const [showFullText, setShowFullText] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio("/sounds/keypress-subtle.mp3")
      audioRef.current.volume = 0.3
    }
  }, [])

  useEffect(() => {
    if (!startAnimation) return

    setTypedText("")
    setShowFullText(false)

    if (prefersReducedMotion) {
      setTypedText(textToType)
      setShowFullText(true)
      return
    }

    let charIndex = 0
    const typingSpeed = 100

    const intervalId = setInterval(() => {
      if (charIndex < textToType.length) {
        setTypedText((prev) => prev + textToType[charIndex])
        if (audioRef.current && !isMuted) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((e) => console.warn("Typing audio play failed:", e))
        }
        charIndex++
      } else {
        clearInterval(intervalId)
        setShowFullText(true)
      }
    }, typingSpeed)

    const fallbackTimeout = setTimeout(
      () => {
        if (charIndex < textToType.length) {
          clearInterval(intervalId)
          setTypedText(textToType)
          setShowFullText(true)
        }
      },
      textToType.length * typingSpeed + 2000,
    )

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimeout)
    }
  }, [textToType, startAnimation, isMuted, prefersReducedMotion])

  const displayCursor =
    startAnimation && (typedText.length < textToType.length || showFullText) && !prefersReducedMotion

  return (
    <div
      className={cn(
        "w-full max-w-lg md:max-w-xl lg:max-w-2xl px-4 group perspective", // Added group and perspective
      )}
    >
      <div
        className={cn(
          "flex items-center bg-neutral-800/60 border border-neutral-700/80 rounded-full shadow-xl p-3 md:p-4",
          "transform-style-3d transition-transform duration-500 ease-out", // 3D transform style
          !prefersReducedMotion && "group-hover:rotate-x-10 group-hover:rotate-y-[-5deg] group-hover:scale-105", // Subtle 3D hover effect
          !prefersReducedMotion && "hover:shadow-2xl hover:shadow-orange-500/30",
        )}
      >
        <Search className="h-5 w-5 md:h-6 md:w-6 text-neutral-300 ml-2 mr-3" />
        <span className="text-base md:text-lg text-neutral-100 flex-grow min-h-[1.5em] md:min-h-[1.75em]">
          {typedText}
          {displayCursor && <span className="blinking-cursor text-orange-400">|</span>}
        </span>
        {/* Placeholder for where a true 3D library (e.g., Three.js canvas) might render */}
        {/* <div className="absolute inset-0 pointer-events-none">
            <p className="text-xs text-center text-neutral-600 p-1">Future 3D Canvas Area</p>
        </div> */}
      </div>
      <p className="text-xs text-center text-neutral-600 mt-2">(Interactive 3D Search Bar - Hover for effect)</p>
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}

export default ThreeDSearchBarPlaceholder
