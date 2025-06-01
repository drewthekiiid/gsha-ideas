"use client" // Keep this

import { useState, useEffect, useRef, useCallback } from "react"
import YourLogo from "@/components/your-logo"
import MosaicLogo from "@/components/mosaic-logo"
import SoundToggle from "@/components/sound-toggle"
import MotionToggle from "@/components/motion-toggle"
import IntroAnimationOverlay from "@/components/intro-animation-overlay"
import IdeaSectionGeminiInferno from "@/components/ideas/idea-section-gemini-inferno"
import IdeaSectionGeminiLabyrinth from "@/components/ideas/idea-section-gemini-labyrinth"
import IdeaSectionGeminiSparkIndex from "@/components/ideas/idea-section-gemini-spark-index"
import IdeaSectionGeminiFireStarter from "@/components/ideas/idea-section-gemini-firestarter"
import IdeaSectionGeminiConstellation from "@/components/ideas/idea-section-gemini-constellation"
import ClosingSection from "@/components/closing-section" // Import ClosingSection
import { AppContext, type AppContextType } from "@/context/app-context"
import LogoDisplay from "@/components/logo-display"
import HeroMenu from "@/components/hero-menu"
import { AnimatePresence } from "framer-motion"

const SECTIONS_CONFIG = [
  { id: "gemini-data-inferno", name: "Gemini Data Inferno", component: IdeaSectionGeminiInferno, themeColor: "orange" },
  { id: "gemini-labyrinth", name: "Gemini Labyrinth", component: IdeaSectionGeminiLabyrinth, themeColor: "teal" },
  {
    id: "gemini-spark-index",
    name: "Gemini Spark Index",
    component: IdeaSectionGeminiSparkIndex,
    themeColor: "purple",
  },
  {
    id: "gemini-firestarter",
    name: "Gemini FireStarter",
    component: IdeaSectionGeminiFireStarter,
    themeColor: "yellow",
  },
  {
    id: "gemini-constellation",
    name: "Gemini Constellation",
    component: IdeaSectionGeminiConstellation,
    themeColor: "indigo",
  },
  { id: "closing-section", name: "Closing", component: ClosingSection, themeColor: "slate" }, // Add ClosingSection
]

const FIRST_CONTENT_SECTION_ID = SECTIONS_CONFIG[0]?.id || ""

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [currentThemeColor, setCurrentThemeColor] = useState<string | null>(null)
  const [introAnimationPlaying, setIntroAnimationPlaying] = useState(true)

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const handleToggleSound = () => setIsMuted(!isMuted)
  const handleToggleMotion = () => {
    setPrefersReducedMotion(!prefersReducedMotion)
    document.documentElement.style.scrollBehavior = !prefersReducedMotion ? "smooth" : "auto"
  }

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = sectionRefs.current[sectionId]
      if (element) {
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
    },
    [prefersReducedMotion],
  )

  const handleIntroAnimationComplete = useCallback(() => {
    setIntroAnimationPlaying(false)
    if (FIRST_CONTENT_SECTION_ID) {
      setTimeout(() => {
        scrollToSection(FIRST_CONTENT_SECTION_ID)
      }, 100)
    }
  }, [scrollToSection])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth"
    if (introAnimationPlaying) return

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setActiveSection(sectionId)
          const config = SECTIONS_CONFIG.find((s) => s.id === sectionId)
          setCurrentThemeColor(config ? config.themeColor : null)
        }
      })
    }
    const observer = new IntersectionObserver(callback, observerOptions)
    const currentRefs = sectionRefs.current
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Initial check for active section after intro
    let initialSectionSet = false
    for (const section of SECTIONS_CONFIG) {
      const element = sectionRefs.current[section.id]
      if (
        element &&
        element.getBoundingClientRect().top < window.innerHeight * 0.5 &&
        element.getBoundingClientRect().bottom > window.innerHeight * 0.2
      ) {
        setActiveSection(section.id)
        setCurrentThemeColor(section.themeColor || null)
        initialSectionSet = true
        break
      }
    }
    if (
      !initialSectionSet &&
      sectionRefs.current[FIRST_CONTENT_SECTION_ID]?.getBoundingClientRect().top < window.innerHeight * 0.5
    ) {
      setActiveSection(FIRST_CONTENT_SECTION_ID)
      const firstConfig = SECTIONS_CONFIG.find((s) => s.id === FIRST_CONTENT_SECTION_ID)
      setCurrentThemeColor(firstConfig?.themeColor || null)
    }

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [prefersReducedMotion, introAnimationPlaying])

  const yourLogoElement = <YourLogo className="h-8 md:h-10 w-auto" width={120} height={40} />
  const mosaicLogoElement = <MosaicLogo className="h-8 md:h-10 w-auto" width={120} height={40} />
  const showFixedElements = !introAnimationPlaying && activeSection !== "" && activeSection !== "closing-section"

  const appContextValue: AppContextType = {
    isMuted,
    prefersReducedMotion,
    activeSection,
    showFixedElements,
    currentThemeColor,
    scrollToSection,
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <div
        className={`bg-background text-foreground min-h-screen flex flex-col items-center relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground ${prefersReducedMotion ? "reduced-motion" : ""}`}
      >
        <AnimatePresence>
          {introAnimationPlaying && <IntroAnimationOverlay onAnimationComplete={handleIntroAnimationComplete} />}
        </AnimatePresence>

        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[210] flex space-x-2">
          <SoundToggle isMuted={isMuted} onToggle={handleToggleSound} />
          <MotionToggle isReducedMotion={prefersReducedMotion} onToggle={handleToggleMotion} />
        </div>

        {showFixedElements && (
          <>
            <LogoDisplay
              yourLogo={yourLogoElement}
              mosaicLogo={mosaicLogoElement}
              isPinned={true}
              className="z-[190]"
              onlyShowWhenPinned={true}
            />
            <HeroMenu
              items={SECTIONS_CONFIG.filter((s) => s.id !== "closing-section").map((s) => ({
                // Exclude closing section from menu
                id: s.id,
                name: s.name,
                themeColor: s.themeColor || "gray",
              }))}
              onSelectItem={scrollToSection}
              isFixed={true}
              className="z-[190]"
              onlyShowWhenPinned={true}
            />
          </>
        )}

        {!introAnimationPlaying &&
          SECTIONS_CONFIG.map((sectionConfig) => {
            const SectionComponent = sectionConfig.component
            return (
              <div
                id={sectionConfig.id}
                key={sectionConfig.id}
                ref={(el) => (sectionRefs.current[sectionConfig.id] = el)}
                className="w-full" // Ensure sections take full width for scroll snapping
              >
                <SectionComponent />
              </div>
            )
          })}
      </div>
    </AppContext.Provider>
  )
}
