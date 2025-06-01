"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"

interface AnimatedSearchBarProps {
  textToType: string
  isVisible: boolean
  onTypingComplete?: () => void
  className?: string
  // Key to force re-render and reset typing when phrase changes
  typingKey: string | number
}

const searchBarVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "circOut" },
  },
}

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  textToType,
  isVisible,
  onTypingComplete,
  className,
  typingKey, // Use this key
}) => {
  const { isMuted, prefersReducedMotion } = useAppContext()
  const [typedText, setTypedText] = useState("")
  const [typingFinishedInternal, setTypingFinishedInternal] = useState(false)
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
    // Reset typing state when the key (phrase) changes or visibility changes
    setTypedText("")
    setTypingFinishedInternal(false)

    if (!isVisible) {
      return
    }

    if (prefersReducedMotion) {
      setTypedText(textToType)
      setTypingFinishedInternal(true)
      if (onTypingComplete) onTypingComplete()
      return
    }

    let charIndex = 0
    const typingSpeed = 80

    const intervalId = setInterval(() => {
      if (charIndex < textToType.length) {
        setTypedText(textToType.substring(0, charIndex + 1))
        if (audioRef.current && !isMuted) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {
            // Silently handle audio play errors
          })
        }
        charIndex++
      } else {
        clearInterval(intervalId)
        setTypingFinishedInternal(true)
        if (onTypingComplete) onTypingComplete()
      }
    }, typingSpeed)

    return () => clearInterval(intervalId)
    // Add typingKey to dependencies to re-trigger typing when it changes
  }, [textToType, isVisible, isMuted, prefersReducedMotion, onTypingComplete, typingKey])

  const displayCursor = isVisible && !typingFinishedInternal && !prefersReducedMotion

  return (
    <motion.div
      className={cn("w-full max-w-xl md:max-w-2xl lg:max-w-3xl px-4 group perspective", className)}
      variants={searchBarVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div
        className={cn(
          "flex items-center rounded-full shadow-xl p-3.5 md:p-4 lg:p-5",
          "bg-white/10 border border-white/20 backdrop-blur-lg",
          "transform-style-3d transition-transform duration-300 ease-out",
          !prefersReducedMotion && "group-hover:rotate-x-3 group-hover:scale-103",
        )}
      >
        <Search className="h-5 w-5 md:h-6 md:w-6 text-neutral-200/80 ml-2 mr-3 flex-shrink-0" />
        <span
          className={cn(
            "text-base md:text-lg lg:text-xl text-neutral-100 flex-grow min-h-[1.5em] md:min-h-[1.75em] relative",
          )}
        >
          {typedText}
          {displayCursor && (
            <motion.span
              className="text-orange-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              |
            </motion.span>
          )}
        </span>
      </div>
      <style jsx>{`
      .perspective {
        perspective: 1500px;
      }
      .transform-style-3d {
        transform-style: preserve-3d;
      }
    `}</style>
    </motion.div>
  )
}

export default AnimatedSearchBar
