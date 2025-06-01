"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, LinkIcon, MessageCircle } from "lucide-react" // Icons

interface StarData {
  id: number
  x: number // percentage
  y: number // percentage
  size: number // 1 to 3
  name: string
  connections: number[] // ids of other stars it's connected to
}

const INITIAL_STARS: StarData[] = [
  { id: 1, x: 20, y: 30, size: 2, name: "Innovator Alpha", connections: [2, 3] },
  { id: 2, x: 40, y: 50, size: 3, name: "Strategist Beta", connections: [1, 4] },
  { id: 3, x: 60, y: 20, size: 1, name: "Marketer Gamma", connections: [1, 5] },
  { id: 4, x: 75, y: 60, size: 2, name: "Developer Delta", connections: [2] },
  { id: 5, x: 50, y: 80, size: 1, name: "Designer Epsilon", connections: [3] },
]

const GEMINI_QUIPS_CONSTELLATION = [
  "Look closer. The patterns are there.",
  "Every connection has the potential to spark something new.",
  "Sometimes the most distant stars have the strongest influence.",
  "What new constellations can you form?",
]

const IdeaSectionGeminiConstellation: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [stars, setStars] = useState<StarData[]>(INITIAL_STARS)
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null)
  const [showGeminiQuip, setShowGeminiQuip] = useState(false)
  const [currentQuip, setCurrentQuip] = useState("")

  const sectionRef = useRef<HTMLDivElement>(null)
  const constellationAreaRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-constellation"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    addStar: useRef<HTMLAudioElement | null>(null), // star-twinkle-sfx
    selectStar: useRef<HTMLAudioElement | null>(null), // soft-chime-select
    geminiQuip: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/constellation-ambient-shimmer.mp3") // New sound
      audioRefs.transition.current.volume = 0.2
      audioRefs.addStar.current = new Audio("/sounds/star-twinkle-sfx.mp3")
      audioRefs.addStar.current.volume = 0.4
      audioRefs.selectStar.current = new Audio("/sounds/soft-chime-select.mp3")
      audioRefs.selectStar.current.volume = 0.5
      audioRefs.geminiQuip.current = new Audio("/sounds/gemini-quip-reveal.mp3")
      audioRefs.geminiQuip.current.volume = 0.5
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
    if (!isCurrentlyActive) {
      setStars(INITIAL_STARS)
      setSelectedStar(null)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleAddStar = () => {
    if (prefersReducedMotion || !isCurrentlyActive || stars.length >= 15) return // Limit stars

    const newStar: StarData = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // Avoid edges
      y: Math.random() * 80 + 10,
      size: Math.floor(Math.random() * 3) + 1,
      name: `New Star ${stars.length + 1}`,
      connections: [], // New stars start with no connections
    }
    setStars((prev) => [...prev, newStar])

    if (!isMuted && audioRefs.addStar.current) {
      audioRefs.addStar.current.currentTime = 0
      audioRefs.addStar.current.play().catch(console.warn)
    }
  }

  const handleStarClick = (star: StarData) => {
    if (prefersReducedMotion || !isCurrentlyActive) return
    setSelectedStar(star)
    if (!isMuted && audioRefs.selectStar.current) {
      audioRefs.selectStar.current.currentTime = 0
      audioRefs.selectStar.current.play().catch(console.warn)
    }

    // Gemini Quip
    if (Math.random() < 0.4 && !showGeminiQuip) {
      setCurrentQuip(GEMINI_QUIPS_CONSTELLATION[Math.floor(Math.random() * GEMINI_QUIPS_CONSTELLATION.length)])
      setShowGeminiQuip(true)
      if (!isMuted && audioRefs.geminiQuip.current) {
        audioRefs.geminiQuip.current.currentTime = 0
        audioRefs.geminiQuip.current.play().catch(console.warn)
      }
      setTimeout(() => setShowGeminiQuip(false), 4000)
    }
  }

  const storyPanels = [
    {
      title: "Arrival",
      content:
        "Each participant becomes a 'star'. A real-time network visualization projects overhead, mapping connections.",
    },
    {
      title: "Main Event",
      content: "As interactions form, the constellation grows. Gemini highlights emerging patterns and opportunities.",
    },
    {
      title: "Aftermath",
      content:
        "The final constellation map becomes a living document of the community's potential and future collaborations.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Starfield & Nebulae */}
      <div className="absolute inset-0 z-0 overflow-hidden constellation-bg">
        {!prefersReducedMotion && (
          <>
            <div className="stars-layer stars-small"></div>
            <div className="stars-layer stars-medium"></div>
            <div className="stars-layer stars-large"></div>
            <div className="nebula nebula-1"></div>
            <div className="nebula nebula-2"></div>
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around h-full w-full max-w-6xl mx-auto gap-8">
        {/* Left Side: Info & Story */}
        <div className="lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2
            className={cn(
              "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-500 to-blue-600",
              !prefersReducedMotion && isCurrentlyActive && "animate-title-galaxy-swirl",
            )}
          >
            Gemini Constellation
          </h2>
          <p className="text-xl md:text-2xl text-indigo-200 mb-8 md:mb-10">Connect the dots, illuminate the future.</p>

          <div className="space-y-4 mb-6 w-full max-w-md">
            {storyPanels.map((panel, index) => (
              <Card
                key={panel.title}
                className={cn(
                  "bg-neutral-800/70 border-indigo-500/30 backdrop-blur-sm shadow-lg",
                  !prefersReducedMotion && isCurrentlyActive ? "animate-panel-fade-in-up" : "opacity-100",
                )}
                style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.4}s` }}
              >
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-xl text-indigo-300">{panel.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            onClick={handleAddStar}
            disabled={stars.length >= 15}
            className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-400/50 shadow-md mb-6"
          >
            <Star className="h-5 w-5 mr-2" /> Add Your Star
          </Button>
          <Card className="bg-black/60 border-indigo-500/30 p-3 text-xs shadow-lg w-full max-w-md">
            <p className="text-sky-400 font-semibold">@NetworkNavigator on LinkedIn:</p>
            <p className="text-neutral-300 italic">
              "The network effect in real-time at #GSHAConstellation ✨. Found my next collaborator among the stars!
              #FutureOfNetworking"
            </p>
          </Card>
        </div>

        {/* Right Side: Interactive Constellation */}
        <div
          ref={constellationAreaRef}
          className={cn(
            "lg:w-3/5 h-[400px] md:h-[500px] bg-neutral-800/30 border border-indigo-700/50 rounded-lg shadow-2xl relative overflow-hidden cursor-default p-2",
            !prefersReducedMotion && isCurrentlyActive && "animate-constellation-area-reveal",
          )}
        >
          {/* Connection Lines */}
          {!prefersReducedMotion &&
            stars.map((star) =>
              star.connections.map((connId) => {
                const connectedStar = stars.find((s) => s.id === connId)
                if (!connectedStar) return null
                // Basic line drawing, can be improved with SVG for curves
                const x1 = star.x,
                  y1 = star.y,
                  x2 = connectedStar.x,
                  y2 = connectedStar.y
                return (
                  <svg key={`${star.id}-${connId}`} className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="stroke-indigo-400/30 animate-connection-draw"
                      strokeWidth="1"
                    />
                  </svg>
                )
              }),
            )}
          {/* Stars */}
          {stars.map((star, index) => (
            <div
              key={star.id}
              onClick={() => handleStarClick(star)}
              className={cn(
                "absolute rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg",
                star.size === 1 && "w-3 h-3 md:w-4 md:h-4",
                star.size === 2 && "w-4 h-4 md:w-5 md:h-5",
                star.size === 3 && "w-5 h-5 md:w-6 md:h-6",
                selectedStar?.id === star.id
                  ? "bg-sky-300 shadow-sky-300/50 scale-125 z-10"
                  : "bg-indigo-300 hover:bg-sky-400",
                !prefersReducedMotion && "animate-star-appear",
              )}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
                animationDelay: prefersReducedMotion ? "0s" : `${index * 0.05 + 0.5}s`,
                boxShadow:
                  selectedStar?.id === star.id
                    ? `0 0 15px 3px var(--tw-shadow-color)`
                    : `0 0 8px 1px rgba(129, 140, 248, 0.7)`, // indigo-400
              }}
              title={star.name}
            >
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping-slow opacity-50"></div>
            </div>
          ))}
          {/* Selected Star Info */}
          {selectedStar && (
            <Card
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 max-w-xs bg-black/70 border-sky-500/50 p-3 shadow-xl text-xs text-left z-20",
                !prefersReducedMotion && "animate-star-info-pop",
              )}
            >
              <CardTitle className="text-sm text-sky-300 mb-1">{selectedStar.name}</CardTitle>
              <p className="text-indigo-200">
                <Users className="inline h-3 w-3 mr-1" /> Connections: {selectedStar.connections.length}
              </p>
              <p className="text-indigo-200">
                <LinkIcon className="inline h-3 w-3 mr-1" /> Potential: High
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Gemini Quip Easter Egg */}
      {showGeminiQuip && (
        <div
          className={cn(
            "absolute top-[10%] right-[5%] bg-black/80 p-4 rounded-lg shadow-2xl text-indigo-300 font-semibold text-md border border-indigo-500/50",
            !prefersReducedMotion && "animate-gemini-quip-constellation",
            "z-30 flex items-center gap-2 max-w-xs text-left",
          )}
        >
          <MessageCircle className="h-6 w-6 text-sky-400 flex-shrink-0" /> {currentQuip}
        </div>
      )}

      <style jsx>{`
        .constellation-bg {
          background: radial-gradient(ellipse at center, #0c0a24 0%, #100f30 40%, #050415 100%); /* Deep indigo/space blue */
        }
        .stars-layer {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
          opacity: 0.7;
        }
        .stars-small { background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23A5B4FC'/%3E%3Ccircle cx='7' cy='8' r='0.3' fill='%23A5B4FC'/%3E%3C/svg%3E"); animation: moveStars 120s linear infinite; } /* indigo-200 */
        .stars-medium { background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='15' r='0.7' fill='%23C7D2FE'/%3E%3Ccircle cx='12' cy='5' r='0.5' fill='%23C7D2FE'/%3E%3C/svg%3E"); animation: moveStars 90s linear infinite reverse; } /* indigo-100 */
        .stars-large { background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='10' r='1' fill='%23E0E7FF'/%3E%3Ccircle cx='5' cy='20' r='0.8' fill='%23E0E7FF'/%3E%3C/svg%3E"); animation: moveStars 60s linear infinite; } /* indigo-50 */
        
        @keyframes moveStars {
          from { background-position: 0 0; }
          to { background-position: 1000px 500px; }
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(50px);
          animation: driftNebula 150s linear infinite alternate;
        }
        .nebula-1 { width: 400px; height: 300px; background: radial-gradient(circle, #6366F1, transparent 70%); top: 10%; left: 15%; animation-delay: -20s;} /* indigo-500 */
        .nebula-2 { width: 300px; height: 500px; background: radial-gradient(circle, #38BDF8, transparent 70%); bottom: 5%; right: 10%; } /* sky-400 */
        
        @keyframes driftNebula {
          from { transform: translate(-50px, -30px) rotate(-10deg); }
          to { transform: translate(50px, 30px) rotate(10deg); }
        }

        @keyframes titleGalaxySwirl {
          0%, 100% { text-shadow: 0 0 8px #818cf8, 0 0 15px #38bdf8; } /* indigo-400, sky-400 */
          50% { text-shadow: 0 0 15px #818cf8, 0 0 30px #38bdf8, 0 0 40px #2563eb; } /* with blue-600 */
        }
        .animate-title-galaxy-swirl { animation: titleGalaxySwirl 3s ease-in-out infinite; }

        @keyframes panelFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-panel-fade-in-up { animation: panelFadeInUp 0.6s ease-out forwards; }

        @keyframes constellationAreaReveal {
          from { opacity: 0; transform: scale(0.9); filter: blur(5px); }
          to { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        .animate-constellation-area-reveal { animation: constellationAreaReveal 0.8s ease-out 0.3s forwards; }

        @keyframes starAppearAnim {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-star-appear { animation: starAppearAnim 0.5s ease-out forwards; }
        
        @keyframes connectionDrawAnim {
          from { stroke-dasharray: 200; stroke-dashoffset: 200; opacity: 0; }
          to { stroke-dasharray: 200; stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-connection-draw { animation: connectionDrawAnim 1s ease-out forwards; animation-delay: 0.8s; }

        @keyframes starInfoPopAnim {
          0% { opacity: 0; transform: translate(-50%, 10px) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-star-info-pop { animation: starInfoPopAnim 0.4s ease-out forwards; }
        
        @keyframes geminiQuipConstellationAnim {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        .animate-gemini-quip-constellation { animation: geminiQuipConstellationAnim 0.5s ease-out forwards; }

        .animate-ping-slow { animation: pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }

        .reduced-motion .stars-layer,
        .reduced-motion .nebula,
        .reduced-motion .animate-title-galaxy-swirl,
        .reduced-motion .animate-panel-fade-in-up,
        .reduced-motion .animate-constellation-area-reveal,
        .reduced-motion .animate-star-appear,
        .reduced-motion .animate-connection-draw,
        .reduced-motion .animate-star-info-pop,
        .reduced-motion .animate-gemini-quip-constellation,
        .reduced-motion .animate-ping-slow {
            animation: none !important;
        }
        .reduced-motion .constellation-bg {
            background: #0c0a24; /* Static deep indigo */
        }
        .reduced-motion .animate-panel-fade-in-up,
        .reduced-motion .animate-constellation-area-reveal,
        .reduced-motion .animate-star-appear {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiConstellation
