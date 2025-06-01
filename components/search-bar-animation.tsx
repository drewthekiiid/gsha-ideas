"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useAppContext } from "@/context/app-context"

interface SearchBarAnimationProps {
  textToType: string
  startAnimation: boolean
}

const SearchBarAnimation: React.FC<SearchBarAnimationProps> = ({ textToType, startAnimation }) => {
  const { isMuted, prefersReducedMotion } = useAppContext()
  const [typedText, setTypedText] = useState("")
  const [showFullText, setShowFullText] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio("/sounds/keypress-subtle.mp3")
      audioRef.current.volume = 0.3
      audioRef.current.addEventListener('error', () => {
        // Silently handle missing audio file
        audioRef.current = null
      })
    }
  }, [])

  useEffect(() => {
    if (!startAnimation) {
      return
    }

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
          audioRef.current.play().catch(() => {
            // Silently handle audio play errors
          })
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
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl px-4">
      <div className="flex items-center bg-neutral-800 bg-opacity-50 border border-neutral-700 rounded-full shadow-lg backdrop-blur-sm p-3 md:p-4">
        <Search className="h-5 w-5 md:h-6 md:w-6 text-neutral-400 ml-2 mr-3" />
        <span className="text-base md:text-lg text-neutral-200 flex-grow min-h-[1.5em] md:min-h-[1.75em]">
          {typedText}
          {displayCursor && <span className="blinking-cursor text-orange-400">|</span>}
        </span>
      </div>
    </div>
  )
}

export default SearchBarAnimation
