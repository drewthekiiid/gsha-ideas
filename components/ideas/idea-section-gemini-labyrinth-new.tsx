"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, MapPin, Trophy, Zap, MessageSquare, Navigation, Badge, Flame } from "lucide-react"

// Personal Data-Driven Journey System
const PERSONAL_ROUTES = [
  { id: "GSHA-2025-ROUTE-0847", keywords: "performance marketing, AI optimization", heatIntensity: 85 },
  { id: "GSHA-2025-ROUTE-1293", keywords: "brand strategy, search innovation", heatIntensity: 92 },
  { id: "GSHA-2025-ROUTE-2641", keywords: "campaign analytics, data visualization", heatIntensity: 78 },
  { id: "GSHA-2025-ROUTE-3057", keywords: "audience insights, behavioral targeting", heatIntensity: 88 },
  { id: "GSHA-2025-ROUTE-4182", keywords: "creative optimization, AI personalization", heatIntensity: 95 }
]

// Interactive Chambers with Themes
const LABYRINTH_CHAMBERS = [
  { 
    theme: "Innovation", 
    challenge: "Design an AI-powered search experience",
    reward: "Innovation Pathfinder Badge",
    heatmapData: "Creative ideation metrics"
  },
  { 
    theme: "Performance", 
    challenge: "Optimize campaign ROI using real-time data",
    reward: "Performance Oracle Badge", 
    heatmapData: "Conversion optimization patterns"
  },
  { 
    theme: "Impact", 
    challenge: "Scale your strategy across global markets",
    reward: "Impact Amplifier Badge",
    heatmapData: "Market expansion analytics"
  }
]

// AI-Generated Personal Hype Narrations
const GEMINI_HYPE_NARRATIONS = [
  "Your search journey burns bright - 94% above average engagement patterns detected",
  "Impressive! Your campaign data suggests you're navigating like a true search strategist", 
  "The labyrinth recognizes your digital marketing prowess - path illuminating",
  "Your audience insights are creating the hottest trail in the maze",
  "Outstanding search behavior patterns - you're leaving digital fire in your wake",
  "The data doesn't lie - you're a natural labyrinth navigator",
  "Your marketing metrics are lighting up the convergence core",
  "Exceptional! Your journey data is contributing to the collective heatmap masterpiece"
]

// Hidden Easter Eggs from Real Campaigns & Google Milestones  
const EASTER_EGGS = [
  { trigger: "25 years of Google", reward: "Google Legacy Flame", rarity: "legendary" },
  { trigger: "Search has evolved", reward: "Evolution Spark", rarity: "rare" },
  { trigger: "AI-powered future", reward: "Future Vision Badge", rarity: "epic" },
  { trigger: "From garage to global", reward: "Garage Origins Fire", rarity: "legendary" },
  { trigger: "Don't be evil", reward: "Original Mission Flame", rarity: "mythic" }
]

// Live Convergence Data
const CONVERGENCE_STREAMS = [
  "Paths illuminated: 847 unique routes active",
  "Collective heatmap: Building collaborative masterpiece", 
  "Chamber completions: Innovation 67% | Performance 82% | Impact 59%",
  "Live participants: 234 navigators currently in labyrinth",
  "Easter eggs found: 23 legendary discoveries today",
  "Digital souvenirs earned: 1,156 badges distributed",
  "Journey replays: 89% completion rate for AR experiences",
  "Convergence energy: Peak collaboration detected"
]

const IdeaSectionGeminiLabyrinth: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [personalRoute, setPersonalRoute] = useState(PERSONAL_ROUTES[0])
  const [activeChambers, setActiveChambers] = useState<string[]>([])
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])
  const [discoveredEggs, setDiscoveredEggs] = useState<string[]>([])
  const [currentNarration, setCurrentNarration] = useState("")
  const [showNarration, setShowNarration] = useState(false)
  const [convergenceStream, setConvergenceStream] = useState("")
  const [showConvergence, setShowConvergence] = useState(false)
  const [journeyProgress, setJourneyProgress] = useState(0)
  const [heatmapActive, setHeatmapActive] = useState(false)
  const [pathNodes, setPathNodes] = useState<Array<{x: number, y: number, intensity: number}>>([])

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-labyrinth"

  const audioRefs = {
    ambient: useRef<HTMLAudioElement | null>(null),
    pathTrace: useRef<HTMLAudioElement | null>(null),
    chamber: useRef<HTMLAudioElement | null>(null),
    badge: useRef<HTMLAudioElement | null>(null),
    convergence: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.ambient.current = new Audio("/sounds/labyrinth-ambient-drone.mp3")
      audioRefs.ambient.current.volume = 0.25
      audioRefs.pathTrace.current = new Audio("/sounds/neon-trace.mp3")
      audioRefs.pathTrace.current.volume = 0.4
      audioRefs.chamber.current = new Audio("/sounds/digital-blip.mp3")
      audioRefs.chamber.current.volume = 0.5
      audioRefs.badge.current = new Audio("/sounds/gemini-quip-reveal.mp3")
      audioRefs.badge.current.volume = 0.5
      audioRefs.convergence.current = new Audio("/sounds/data-stream-pulse.mp3")
      audioRefs.convergence.current.volume = 0.3
    }
  }, [])

  // Generate initial personal route on load
  useEffect(() => {
    if (isCurrentlyActive) {
      const route = PERSONAL_ROUTES[Math.floor(Math.random() * PERSONAL_ROUTES.length)]
      setPersonalRoute(route)
      setJourneyProgress(Math.floor(Math.random() * 85) + 15) // 15-99%
      
      // Generate random path nodes for heatmap visualization
      const nodes = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        intensity: Math.random() * 100
      }))
      setPathNodes(nodes)
      
      // Activate heatmap after brief delay
      setTimeout(() => setHeatmapActive(true), 1000)
    }
  }, [isCurrentlyActive])

  // Ambient sound management
  useEffect(() => {
    if (isCurrentlyActive && !prefersReducedMotion && !isMuted && audioRefs.ambient.current) {
      audioRefs.ambient.current.currentTime = 0
      audioRefs.ambient.current.play().catch(console.warn)
      audioRefs.ambient.current.loop = true
    } else if (audioRefs.ambient.current) {
      audioRefs.ambient.current.pause()
    }
    
    // Reset state when not active
    if (!isCurrentlyActive) {
      setActiveChambers([])
      setEarnedBadges([])
      setDiscoveredEggs([])
      setHeatmapActive(false)
      setShowNarration(false)
      setShowConvergence(false)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Gemini AI Narration Rotation
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const narrationInterval = setInterval(() => {
      const narration = GEMINI_HYPE_NARRATIONS[Math.floor(Math.random() * GEMINI_HYPE_NARRATIONS.length)]
      setCurrentNarration(narration)
      setShowNarration(true)
      
      if (!isMuted && audioRefs.badge.current) {
        audioRefs.badge.current.currentTime = 0
        audioRefs.badge.current.play().catch(console.warn)
      }
      
      setTimeout(() => setShowNarration(false), 4000)
    }, 8000)

    return () => clearInterval(narrationInterval)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Convergence Stream Updates
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const convergenceInterval = setInterval(() => {
      const stream = CONVERGENCE_STREAMS[Math.floor(Math.random() * CONVERGENCE_STREAMS.length)]
      setConvergenceStream(stream)
      setShowConvergence(true)
      
      if (!isMuted && audioRefs.convergence.current) {
        audioRefs.convergence.current.currentTime = 0
        audioRefs.convergence.current.play().catch(console.warn)
      }
      
      setTimeout(() => setShowConvergence(false), 3000)
    }, 6000)

    return () => clearInterval(convergenceInterval)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleChamberEnter = (chamber: typeof LABYRINTH_CHAMBERS[0]) => {
    if (!activeChambers.includes(chamber.theme)) {
      setActiveChambers(prev => [...prev, chamber.theme])
      
      // Award badge after brief delay
      setTimeout(() => {
        if (!earnedBadges.includes(chamber.reward)) {
          setEarnedBadges(prev => [...prev, chamber.reward])
          if (!isMuted && audioRefs.badge.current) {
            audioRefs.badge.current.currentTime = 0
            audioRefs.badge.current.play().catch(console.warn)
          }
        }
      }, 1500)
      
      if (!isMuted && audioRefs.chamber.current) {
        audioRefs.chamber.current.currentTime = 0
        audioRefs.chamber.current.play().catch(console.warn)
      }
    }
  }

  const handleEasterEggSearch = () => {
    const undiscovered = EASTER_EGGS.filter(egg => !discoveredEggs.includes(egg.trigger))
    if (undiscovered.length > 0 && Math.random() < 0.4) {
      const egg = undiscovered[Math.floor(Math.random() * undiscovered.length)]
      setDiscoveredEggs(prev => [...prev, egg.trigger])
      
      if (!isMuted && audioRefs.pathTrace.current) {
        audioRefs.pathTrace.current.currentTime = 0
        audioRefs.pathTrace.current.play().catch(console.warn)
      }
    }
  }

  const storyPanels = [
    {
      title: "Personalized Entry",
      content: `Scan your Gemini Pass for route ${personalRoute.id}. Your path illuminates with campaign data: ${personalRoute.keywords}.`,
    },
    {
      title: "Interactive Chambers", 
      content: "Navigate AI-powered rooms themed around Innovation, Performance, and Impact. Each chamber responds to your data.",
    },
    {
      title: "Convergence",
      content: "All paths merge in the core where your journey becomes part of a collaborative heatmap masterpiece.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Labyrinth Background with Path Traces */}
      <div className="absolute inset-0 z-0 labyrinth-bg">
        {!prefersReducedMotion && heatmapActive && (
          <div className="labyrinth-visualization">
            {pathNodes.map((node, i) => (
              <div
                key={i}
                className="path-node"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  opacity: node.intensity / 100,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            <div className="convergence-core" />
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around h-full w-full max-w-6xl mx-auto gap-8">
        {/* Left Side: Info & Story */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2
            className={cn(
              "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-600",
              !prefersReducedMotion && isCurrentlyActive && "animate-title-glow",
            )}
          >
            Gemini Labyrinth
          </h2>
          <p className="text-xl md:text-2xl text-cyan-200 mb-8 md:mb-10">
            Your data-driven quest for greatness
          </p>

          <div className="space-y-4 mb-8 w-full max-w-md">
            {storyPanels.map((panel, index) => (
              <Card
                key={panel.title}
                className={cn(
                  "bg-neutral-800/70 border-cyan-500/30 backdrop-blur-sm shadow-lg",
                  !prefersReducedMotion && isCurrentlyActive ? "animate-panel-slide-in" : "opacity-100",
                )}
                style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.4}s` }}
              >
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-xl text-cyan-300">{panel.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-black/60 border-cyan-500/30 p-3 text-xs shadow-lg w-full max-w-md">
            <p className="text-cyan-400 font-semibold">@GSHANavigator on X:</p>
            <p className="text-neutral-300 italic">
              "Made it through the labyrinth! My journey is literally mapped with my campaign data. This is next-level personalization 🗺️ #GSHA2025 #GeminiLabyrinth"
            </p>
          </Card>
        </div>

        {/* Right Side: Interactive Labyrinth Experience */}
        <div className="lg:w-1/2 flex flex-col items-center gap-6">
          {/* Personal Route Display */}
          <Card className="w-full max-w-md bg-gradient-to-r from-cyan-900/50 to-teal-900/50 border-cyan-400/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                <Navigation size={18} /> Your Personal Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-cyan-100 font-mono text-sm">{personalRoute.id}</p>
              <p className="text-cyan-200 text-sm">{personalRoute.keywords}</p>
              <div className="w-full bg-neutral-700 h-2 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 animate-pulse"
                  style={{ width: `${personalRoute.heatIntensity}%` }}
                />
              </div>
              <p className="text-xs text-cyan-300">Heat Intensity: {personalRoute.heatIntensity}%</p>
            </CardContent>
          </Card>

          {/* Interactive Chambers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
            {LABYRINTH_CHAMBERS.map((chamber, index) => (
              <Card
                key={chamber.theme}
                onClick={() => handleChamberEnter(chamber)}
                className={cn(
                  "cursor-pointer transition-all duration-300 border-2",
                  activeChambers.includes(chamber.theme)
                    ? "bg-gradient-to-br from-emerald-900/70 to-teal-900/70 border-emerald-400/70 shadow-lg shadow-emerald-500/20"
                    : "bg-neutral-800/50 border-neutral-600/50 hover:border-cyan-500/70",
                  !prefersReducedMotion && "hover:scale-105"
                )}
              >
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-sm text-center flex flex-col items-center gap-1">
                    {chamber.theme === "Innovation" && <Zap size={16} className="text-yellow-400" />}
                    {chamber.theme === "Performance" && <Trophy size={16} className="text-orange-400" />}
                    {chamber.theme === "Impact" && <MapPin size={16} className="text-purple-400" />}
                    <span className={activeChambers.includes(chamber.theme) ? "text-emerald-300" : "text-cyan-300"}>
                      {chamber.theme}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-xs text-neutral-300 text-center">{chamber.challenge}</p>
                  {activeChambers.includes(chamber.theme) && (
                    <div className="mt-2 text-center">
                      <Badge className="bg-emerald-600/80 text-emerald-100 text-xs">Active</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Journey Progress & Badges */}
          <Card className="w-full max-w-md bg-neutral-800/50 border-neutral-600/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-cyan-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Compass size={18} /> Journey Progress
                </span>
                <span className="text-sm font-mono">{journeyProgress}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="w-full bg-neutral-700 h-3 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${journeyProgress}%` }}
                />
              </div>
              
              {earnedBadges.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-cyan-300 font-semibold">Earned Badges:</p>
                  {earnedBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-emerald-300">
                      <Badge size={12} className="text-emerald-400" />
                      {badge}
                    </div>
                  ))}
                </div>
              )}
              
              {discoveredEggs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-cyan-300 font-semibold">Easter Eggs Found:</p>
                  {discoveredEggs.map((egg, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-yellow-300">
                      <Flame size={12} className="text-yellow-400" />
                      {egg}
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={handleEasterEggSearch}
                className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-sm rounded transition-all duration-200"
              >
                Search for Hidden Secrets
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gemini AI Narration */}
      {showNarration && (
        <div
          className={cn(
            "absolute top-[15%] left-[5%] right-[5%] bg-gradient-to-r from-black/90 to-neutral-900/90 p-4 rounded-lg shadow-2xl border border-cyan-500/50",
            !prefersReducedMotion && "animate-narration-slide",
            "z-20 text-center"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm">Gemini AI Guide</span>
          </div>
          <p className="text-cyan-200 text-sm italic">{currentNarration}</p>
        </div>
      )}

      {/* Convergence Stream Display */}
      {showConvergence && (
        <div
          className={cn(
            "absolute bottom-[10%] right-[5%] bg-black/80 p-3 rounded-lg shadow-2xl border border-teal-500/50",
            !prefersReducedMotion && "animate-convergence-pulse",
            "z-20"
          )}
        >
          <div className="flex items-center gap-2 text-teal-300 text-sm font-mono">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            {convergenceStream}
          </div>
        </div>
      )}

      <style jsx>{`
        .labyrinth-bg {
          background: radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
                      linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }
        
        .labyrinth-visualization {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .path-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.2) 70%, transparent 100%);
          border-radius: 50%;
          animation: pathPulse 2s ease-in-out infinite;
        }
        
        .convergence-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%);
          border-radius: 50%;
          animation: coreGlow 3s ease-in-out infinite;
        }
        
        @keyframes pathPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        
        @keyframes coreGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        
        @keyframes titleGlow {
          0% { opacity: 0; text-shadow: 0 0 0px transparent; }
          70% { opacity: 1; text-shadow: 0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(20,184,166,0.3); }
          100% { opacity: 1; text-shadow: 0 0 10px rgba(6,182,212,0.3); }
        }
        .animate-title-glow { animation: titleGlow 1.5s ease-out forwards; }

        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-panel-slide-in { animation: panelSlideIn 0.6s ease-out forwards; }

        @keyframes narrationSlide {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-narration-slide { animation: narrationSlide 0.5s ease-out forwards; }

        @keyframes convergencePulse {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-convergence-pulse { animation: convergencePulse 0.4s ease-out forwards; }

        .reduced-motion .path-node,
        .reduced-motion .convergence-core,
        .reduced-motion .animate-title-glow,
        .reduced-motion .animate-panel-slide-in,
        .reduced-motion .animate-narration-slide,
        .reduced-motion .animate-convergence-pulse {
          animation: none !important;
        }
        .reduced-motion .labyrinth-bg {
          background: #0f172a;
        }
        .reduced-motion .animate-panel-slide-in {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiLabyrinth
