"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import YourLogo from "@/components/your-logo"
import MosaicLogo from "@/components/mosaic-logo"
import AnimatedSearchBar from "@/components/animated-search-bar"
import { useAppContext } from "@/context/app-context"

interface IntroAnimationOverlayProps {
  onAnimationComplete: () => void
}

const overlayVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } },
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: custom * 0.1 + 0.2, ease: "circOut" },
  }),
}

const headlineText = "GSHA 2025: Ignite Your Performance"

const SEARCH_PHRASES = [
  "How do you ignite a room full of Canada’s boldest marketers?",
  "What sparks true engagement in a hybrid world?",
  "Unlocking the future of experiential events...",
]

// Reduced pause time between phrases
const PHRASE_DISPLAY_TIME = 200 // Milliseconds to pause after a phrase is typed

const headlineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.02,
    },
  },
}

const headlineCharVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "circOut" },
  },
}

const IntroAnimationOverlay: React.FC<IntroAnimationOverlayProps> = ({ onAnimationComplete }) => {
  const { prefersReducedMotion, isMuted } = useAppContext()
  const [showOverlay, setShowOverlay] = useState(true)
  const [showLogos, setShowLogos] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [firstPhraseTyped, setFirstPhraseTyped] = useState(false)
  const [allPhrasesTyped, setAllPhrasesTyped] = useState(false)
  const [showHeadline, setShowHeadline] = useState(false)
  const [animateHeadlineBurn, setAnimateHeadlineBurn] = useState(false) // New state for burn animation

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    logoReveal: null,
    searchBarAppear: null,
    headlineBuild: null,
    finalIgnite: null,
    phraseClear: null,
    headlineBurn: null, // Sound for headline burn
  })

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.current.logoReveal = new Audio("/sounds/logo-reveal-shimmer.mp3")
      audioRefs.current.searchBarAppear = new Audio("/sounds/digital-reveal.mp3")
      audioRefs.current.headlineBuild = new Audio("/sounds/flame-lick.mp3")
      audioRefs.current.finalIgnite = new Audio("/sounds/ignite-whoosh-subtle.mp3")
      audioRefs.current.phraseClear = new Audio("/sounds/fast-whoosh-short.mp3")
      audioRefs.current.headlineBurn = new Audio("/sounds/fire-crackle-short.mp3") // New sound
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) audio.volume = 0.4
      })
      if (audioRefs.current.headlineBurn) audioRefs.current.headlineBurn.volume = 0.6
    }
  }, [])

  const playSound = useCallback(
    (soundKey: keyof typeof audioRefs.current, volume = 0.4) => {
      if (audioRefs.current[soundKey] && !isMuted && !prefersReducedMotion) {
        audioRefs.current[soundKey]!.volume = volume
        audioRefs.current[soundKey]!.currentTime = 0
        audioRefs.current[soundKey]!.play().catch(console.warn)
      }
    },
    [isMuted, prefersReducedMotion],
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowLogos(true)
      setShowSearchBar(true)
      setFirstPhraseTyped(true)
      setAllPhrasesTyped(true)
      setShowHeadline(true)
      setAnimateHeadlineBurn(true) // Trigger burn immediately for reduced motion if needed, or just skip
      const timer = setTimeout(() => {
        setShowOverlay(false)
        onAnimationComplete()
      }, 500) // Faster exit for reduced motion
      return () => clearTimeout(timer)
    }

    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setShowLogos(true)
      playSound("logoReveal")

      await new Promise((resolve) => setTimeout(resolve, 400))
      setShowSearchBar(true)
      playSound("searchBarAppear")
    }
    sequence()
  }, [prefersReducedMotion, onAnimationComplete, playSound])

  const handleCurrentPhraseComplete = useCallback(() => {
    if (currentPhraseIndex === 0) {
      setFirstPhraseTyped(true)
    }

    if (currentPhraseIndex < SEARCH_PHRASES.length - 1) {
      setTimeout(() => {
        playSound("phraseClear", 0.3)
        setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
      }, PHRASE_DISPLAY_TIME)
    } else {
      setAllPhrasesTyped(true)
    }
  }, [currentPhraseIndex, playSound])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (firstPhraseTyped && !showHeadline) {
      const showHeadlineTimer = setTimeout(() => {
        setShowHeadline(true)
        playSound("headlineBuild")
      }, 100)
      return () => clearTimeout(showHeadlineTimer)
    }
  }, [firstPhraseTyped, showHeadline, prefersReducedMotion, playSound])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (allPhrasesTyped) {
      // Start headline burn slightly before final ignite sound and overlay fade
      const burnTimer = setTimeout(() => {
        setAnimateHeadlineBurn(true)
        playSound("headlineBurn")
      }, 100) // Start burn effect

      const finalIgniteTimer = setTimeout(() => {
        playSound("finalIgnite", 0.7)
      }, 200) // Slightly after burn starts

      const fadeOutTimer = setTimeout(() => {
        setShowOverlay(false)
      }, 600) // Shortened overall exit time, ensure burn animation completes

      return () => {
        clearTimeout(burnTimer)
        clearTimeout(finalIgniteTimer)
        clearTimeout(fadeOutTimer)
      }
    }
  }, [allPhrasesTyped, prefersReducedMotion, playSound])

  const yourLogoElement = <YourLogo className="h-10 md:h-12 w-auto text-neutral-100" />
  const mosaicLogoElement = <MosaicLogo className="h-10 md:h-12 w-auto text-neutral-100" />

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {showOverlay && (
        <motion.div
          key="introOverlay"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neutral-950 p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10">
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <motion.div
                custom={0}
                variants={logoVariants}
                initial="hidden"
                animate={showLogos ? "visible" : "hidden"}
              >
                {yourLogoElement}
              </motion.div>
              <motion.div
                custom={0.5}
                variants={logoVariants}
                initial="hidden"
                animate={showLogos ? "visible" : "hidden"}
              >
                <span className="text-3xl md:text-4xl font-light text-ignite-orange">×</span>
              </motion.div>
              <motion.div
                custom={1}
                variants={logoVariants}
                initial="hidden"
                animate={showLogos ? "visible" : "hidden"}
              >
                {mosaicLogoElement}
              </motion.div>
            </div>
            <AnimatedSearchBar
              typingKey={currentPhraseIndex}
              textToType={SEARCH_PHRASES[currentPhraseIndex]}
              isVisible={showSearchBar}
              onTypingComplete={handleCurrentPhraseComplete}
              className="mb-4 md:mb-6"
            />
            <motion.h1
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-neutral-50",
                "px-2 leading-tight",
                // Apply burn class if animateHeadlineBurn is true, otherwise control via Framer's opacity
                animateHeadlineBurn ? "headline-burn-away" : showHeadline ? "opacity-100" : "opacity-0",
              )}
              style={{ fontFamily: "'Permanent Marker', cursive, sans-serif" }}
              variants={!animateHeadlineBurn ? headlineVariants : undefined} // Only use Framer variants if not burning
              initial={!animateHeadlineBurn ? "hidden" : undefined}
              animate={!animateHeadlineBurn && showHeadline ? "visible" : undefined}
            >
              {headlineText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={!animateHeadlineBurn ? headlineCharVariants : undefined}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="bg-ignite-gradient"></div>
            {!prefersReducedMotion && (
              <div className="bg-ignite-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="particle"></div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimationOverlay
