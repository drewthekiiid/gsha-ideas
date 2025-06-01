"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Lightbulb } from "lucide-react" // Icons

const GEMINI_PROMPTS = [
  "What if we gamified the onboarding process?",
  "How can Gemini analyze sentiment from user reviews instantly?",
  "Can we use AI to predict the next viral trend in our market?",
  "Generate three taglines for a sustainable tech product.",
]

const IdeaSectionGeminiFireStarter: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [sparksLaunched, setSparksLaunched] = useState(0)
  const [activeEffects, setActiveEffects] = useState<Array<{ id: number; x: string; y: string }>>([])
  const [showGeminiPrompt, setShowGeminiPrompt] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")

  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isCurrentlyActive = activeSection === "gemini-firestarter"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    launchSpark: useRef<HTMLAudioElement | null>(null), // spark-launch-sfx
    promptReveal: useRef<HTMLAudioElement | null>(null), // digital-chime
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/firestarter-crackle-ambient.mp3") // New sound
      audioRefs.transition.current.volume = 0.25
      audioRefs.launchSpark.current = new Audio("/sounds/spark-launch-sfx.mp3")
      audioRefs.launchSpark.current.volume = 0.5
      audioRefs.promptReveal.current = new Audio("/sounds/digital-chime.mp3")
      audioRefs.promptReveal.current.volume = 0.4
    }
  }, [])

  useEffect(() => {
    if (isCurrentlyActive && !prefersReducedMotion && !isMuted && audioRefs.transition.current) {
      audioRefs.transition.current.currentTime = 0
      audioRefs.transition.current.play().catch(console.warn)
      audioRefs.transition.current.loop = true
    } else if (audioRefs.transition.current) {
      audioRefs.transition.current.pause()
    }
    if (!isCurrentlyActive) setSparksLaunched(0)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleLaunchSpark = () => {
    if (prefersReducedMotion || !isCurrentlyActive || !buttonRef.current) return

    setSparksLaunched((prev) => prev + 1)

    // Create a visual effect originating from the button
    const rect = buttonRef.current.getBoundingClientRect()
    const sectionRect = sectionRef.current?.getBoundingClientRect()
    if (sectionRect) {
      const effect = {
        id: Date.now(),
        x: `${rect.left - sectionRect.left + rect.width / 2}px`,
        y: `${rect.top - sectionRect.top + rect.height / 2}px`,
      }
      setActiveEffects((prev) => [...prev, effect])
      setTimeout(() => {
        setActiveEffects((prevEffects) => prevEffects.filter((e) => e.id !== effect.id))
      }, 1000) // Duration of the spark effect animation
    }

    if (!isMuted && audioRefs.launchSpark.current) {
      audioRefs.launchSpark.current.currentTime = 0
      audioRefs.launchSpark.current.play().catch(console.warn)
    }

    // Easter Egg: Show a Gemini prompt
    if (sparksLaunched > 0 && sparksLaunched % 3 === 0 && !showGeminiPrompt) {
      setCurrentPrompt(GEMINI_PROMPTS[Math.floor(Math.random() * GEMINI_PROMPTS.length)])
      setShowGeminiPrompt(true)
      if (!isMuted && audioRefs.promptReveal.current) {
        audioRefs.promptReveal.current.currentTime = 0
        audioRefs.promptReveal.current.play().catch(console.warn)
      }
      setTimeout(() => setShowGeminiPrompt(false), 4000)
    }
  }

  const storyPanels = [
    {
      title: "Arrival",
      content: "Participants submit their 'tinder'—raw challenges or questions. The room crackles with potential.",
    },
    {
      title: "Main Event",
      content: "Rapid-fire ideation rounds fueled by Gemini. Ideas build, combine, and compound exponentially.",
    },
    {
      title: "Aftermath",
      content: "Teams commit to 'keeping the fire alive' with actionable prototypes and structured follow-ups.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Sparks & Energy */}
      <div className="absolute inset-0 z-0 overflow-hidden firestarter-bg">
        {!prefersReducedMotion && (
          <>
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={`bg-spark-${i}`}
                className="background-spark"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                }}
              />
            ))}
            <div className="energy-line line-h-1"></div>
            <div className="energy-line line-h-2"></div>
            <div className="energy-line line-v-1"></div>
            <div className="energy-line line-v-2"></div>
          </>
        )}
        {/* Active spark effects from button */}
        {activeEffects.map((effect) => (
          <div key={effect.id} className="launched-spark-effect" style={{ left: effect.x, top: effect.y }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto">
        <h2
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500",
            !prefersReducedMotion && isCurrentlyActive && "animate-title-crackle",
          )}
        >
          Gemini FireStarter
        </h2>
        <p className="text-xl md:text-2xl text-yellow-200 mb-8 md:mb-10">Light the fuse, watch it spread.</p>

        {/* Interactive Area */}
        <div
          className={cn(
            "flex flex-col items-center mb-8 p-6 rounded-lg bg-neutral-800/50 border border-amber-500/30 shadow-xl backdrop-blur-sm",
            !prefersReducedMotion && isCurrentlyActive && "animate-interactive-zone-appear",
          )}
        >
          <div className="text-4xl font-bold text-white mb-3">
            <span className="text-yellow-400">{sparksLaunched}</span> Ideas Sparked!
          </div>
          <Button
            ref={buttonRef}
            onClick={handleLaunchSpark}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-900 font-bold py-4 px-8 rounded-lg text-xl transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400/50 shadow-lg"
            size="lg"
          >
            <Zap className="h-6 w-6 mr-2" /> Launch a Spark
          </Button>
        </div>

        {/* Story Panels */}
        <div className="grid md:grid-cols-3 gap-6 w-full mb-8">
          {storyPanels.map((panel, index) => (
            <Card
              key={panel.title}
              className={cn(
                "bg-neutral-800/60 border-neutral-700/50 backdrop-blur-sm text-left shadow-lg",
                !prefersReducedMotion && isCurrentlyActive ? "animate-panel-burst-in" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.15 + 0.5}s` }}
            >
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-xl text-yellow-300">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <Card className="bg-black/60 border-yellow-500/30 p-3 text-xs shadow-lg w-full max-w-md">
          <p className="text-amber-400 font-semibold">@StartupSparky on X:</p>
          <p className="text-neutral-300 italic">
            "FireStarter lived up to its name! 🔥 From zero to prototype in one session. Gemini is a game-changer.
            #GSHA2025 #RapidPrototyping"
          </p>
        </Card>

        {/* Gemini Prompt Easter Egg */}
        {showGeminiPrompt && (
          <div
            className={cn(
              "absolute bottom-[15%] left-1/2 -translate-x-1/2 w-full max-w-md bg-black/80 p-4 rounded-lg shadow-2xl text-yellow-300 font-semibold text-md border border-yellow-500/50",
              !prefersReducedMotion && "animate-gemini-prompt-fade-in",
              "z-20 flex items-center gap-2 text-left",
            )}
          >
            <Lightbulb className="h-6 w-6 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-amber-500">Gemini Suggests:</p>
              {currentPrompt}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .firestarter-bg {
          background: radial-gradient(ellipse at center, #3d2000 0%, #1a0e00 70%, #0c0600 100%); /* Deep, warm browns and oranges */
        }
        .background-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: rgba(251, 191, 36, 0.7); /* amber-400 */
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(251, 191, 36, 0.9);
          animation: flickerAndDrift infinite;
        }
        @keyframes flickerAndDrift {
          0%, 100% { opacity: 0; transform: translate(0,0) scale(0.5); }
          50% { opacity: 1; transform: translate(calc(Math.random() * 40px - 20px), calc(Math.random() * 40px - 20px)) scale(1); }
          90% { opacity: 0; }
        }
        .energy-line {
          position: absolute;
          background-color: rgba(245, 158, 11, 0.1); /* amber-500 */
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.2);
          animation: pulseLine 4s ease-in-out infinite alternate;
        }
        .line-h-1 { height: 1px; width: 100%; top: 30%; animation-delay: 0.5s; }
        .line-h-2 { height: 1px; width: 100%; bottom: 30%; animation-delay: 1.5s; }
        .line-v-1 { width: 1px; height: 100%; left: 25%; animation-delay: 1s; }
        .line-v-2 { width: 1px; height: 100%; right: 25%; animation-delay: 2s; }
        @keyframes pulseLine {
          from { opacity: 0.2; transform: scale(0.98); }
          to { opacity: 0.6; transform: scale(1.02); }
        }
        
        .launched-spark-effect {
          position: absolute;
          width: 80px; /* Larger effect */
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(251,191,36,0.3) 40%, rgba(245,158,11,0) 70%);
          transform: translate(-50%, -50%) scale(0);
          animation: sparkBurstAnim 0.7s ease-out forwards;
          pointer-events: none;
        }
        @keyframes sparkBurstAnim {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          70% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }

        @keyframes titleCrackle {
          0%, 100% { text-shadow: 0 0 5px #fde047, 0 0 10px #f59e0b; } /* yellow-300, amber-500 */
          50% { text-shadow: 0 0 10px #fde047, 0 0 20px #f59e0b, 0 0 30px #ea580c; } /* with orange-600 */
        }
        .animate-title-crackle { animation: titleCrackle 2s ease-in-out infinite; }

        @keyframes interactiveZoneAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-interactive-zone-appear { animation: interactiveZoneAppear 0.6s ease-out 0.2s forwards; }

        @keyframes panelBurstInAnim {
          0% { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-panel-burst-in { animation: panelBurstInAnim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        @keyframes geminiPromptFadeInAnim {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-gemini-prompt-fade-in { animation: geminiPromptFadeInAnim 0.5s ease-out forwards; }

        .reduced-motion .background-spark,
        .reduced-motion .energy-line,
        .reduced-motion .launched-spark-effect,
        .reduced-motion .animate-title-crackle,
        .reduced-motion .animate-interactive-zone-appear,
        .reduced-motion .animate-panel-burst-in,
        .reduced-motion .animate-gemini-prompt-fade-in {
            animation: none !important;
        }
        .reduced-motion .firestarter-bg {
            background: #1a0e00; /* Static dark brown */
        }
        .reduced-motion .animate-interactive-zone-appear,
        .reduced-motion .animate-panel-burst-in {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiFireStarter
