"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, Megaphone, Sparkles, Target, Music, PartyPopper, Flame } from "lucide-react"

const WILD_QUERIES = [
  "Pitch me the riskiest campaign you've ever dreamt up!",
  "Sell me a Super Bowl ad for a product that doesn't exist!",
  "What's your weirdest Google search for campaign inspiration?",
  "Design a meme that would make your CMO cry!",
  "Create a jingle for the world's most boring product!",
]

const CARNIVAL_GAMES = [
  { name: "Meme Roulette", icon: <Sparkles className="h-4 w-4" />, action: "Spin for chaos!", participants: 0 },
  { name: "Human Claw Machine", icon: <Target className="h-4 w-4" />, action: "Grab a marketer!", participants: 0 },
  { name: "Query Confession", icon: <Megaphone className="h-4 w-4" />, action: "Confess your search!", participants: 0 },
  { name: "Flash Mob Stage", icon: <Users className="h-4 w-4" />, action: "Join the chaos!", participants: 0 },
]

const GEMINI_ROASTS = [
  "Gemini just turned your pitch into a meme! 😂",
  "That campaign idea got the full comedy treatment!",
  "Your confession booth moment is now a jingle!",
  "Flash mob energy: ACTIVATED! 🔥",
]

const IdeaSectionGeminiFireStarter: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [chaosLevel, setChaosLevel] = useState(0)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = useState("")
  const [showGeminiRoast, setShowGeminiRoast] = useState(false)
  const [currentRoast, setCurrentRoast] = useState("")
  const [carnivalGames, setCarnivalGames] = useState(CARNIVAL_GAMES)
  const [flashMobActive, setFlashMobActive] = useState(false)
  const [tornadoActive, setTornadoActive] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-firestarter"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    carnivalChaos: useRef<HTMLAudioElement | null>(null),
    flashMob: useRef<HTMLAudioElement | null>(null),
    geminiRoast: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/carnival-ambient.mp3")
      audioRefs.transition.current.volume = 0.3
      audioRefs.carnivalChaos.current = new Audio("/sounds/carnival-game-win.mp3")
      audioRefs.carnivalChaos.current.volume = 0.6
      audioRefs.flashMob.current = new Audio("/sounds/flash-mob-energy.mp3")
      audioRefs.flashMob.current.volume = 0.5
      audioRefs.geminiRoast.current = new Audio("/sounds/gemini-roast.mp3")
      audioRefs.geminiRoast.current.volume = 0.4
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
      setChaosLevel(0)
      setActiveGame(null)
      setFlashMobActive(false)
      setTornadoActive(false)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleJoinCarnival = (game: typeof CARNIVAL_GAMES[0]) => {
    if (prefersReducedMotion || !isCurrentlyActive) return

    setChaosLevel((prev) => Math.min(100, prev + 15))
    setActiveGame(game.name)
    
    // Update game participants
    setCarnivalGames(prev => 
      prev.map(g => 
        g.name === game.name 
          ? { ...g, participants: g.participants + 1 }
          : g
      )
    )

    // Random query challenge
    setCurrentQuery(WILD_QUERIES[Math.floor(Math.random() * WILD_QUERIES.length)])

    if (!isMuted && audioRefs.carnivalChaos.current) {
      audioRefs.carnivalChaos.current.currentTime = 0
      audioRefs.carnivalChaos.current.play().catch(console.warn)
    }

    // Trigger Gemini roast
    if (Math.random() < 0.4 && !showGeminiRoast) {
      setCurrentRoast(GEMINI_ROASTS[Math.floor(Math.random() * GEMINI_ROASTS.length)])
      setShowGeminiRoast(true)
      if (!isMuted && audioRefs.geminiRoast.current) {
        audioRefs.geminiRoast.current.currentTime = 0
        audioRefs.geminiRoast.current.play().catch(console.warn)
      }
      setTimeout(() => setShowGeminiRoast(false), 4000)
    }

    // Flash mob at high chaos
    if (chaosLevel > 60 && !flashMobActive) {
      setFlashMobActive(true)
      if (!isMuted && audioRefs.flashMob.current) {
        audioRefs.flashMob.current.currentTime = 0
        audioRefs.flashMob.current.play().catch(console.warn)
      }
      setTimeout(() => setFlashMobActive(false), 6000)
    }

    // Query tornado at max chaos
    if (chaosLevel > 80 && !tornadoActive) {
      setTornadoActive(true)
      setTimeout(() => setTornadoActive(false), 8000)
    }

    setTimeout(() => setActiveGame(null), 3000)
  }

  const storyPanels = [
    {
      title: "Lightning Lane",
      content: "Flash mobs and improv actors swarm the entrance with wild marketing challenges. Gemini instantly roasts safe plays with playful memes projected overhead.",
    },
    {
      title: "Query Carnival",
      content: "Pop-up stages dramatize absurd search queries while guests compete in marketing carnival games like human claw machines and meme roulette.",
    },
    {
      title: "Ignition Extravaganza", 
      content: "AI-driven Query Tornado fills the room while winners get roasted with musical skits and everyone joins the marketer mosh pit finale.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Carnival Background */}
      <div className="absolute inset-0 z-0 overflow-hidden carnival-bg" style={{ "--chaos-level": chaosLevel / 100 } as React.CSSProperties}>
        {!prefersReducedMotion && (
          <>
            {/* Carnival lights */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`carnival-light-${i}`}
                className="carnival-light"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 1 + 0.5}s`,
                }}
              />
            ))}
            
            {/* Flash mob effects */}
            {flashMobActive && (
              <div className="flash-mob-effect">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={`flash-${i}`}
                    className="flash-mob-person"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Query tornado */}
            {tornadoActive && (
              <div className="query-tornado">
                <div className="tornado-text">QUERY TORNADO ACTIVATED!</div>
                {WILD_QUERIES.map((query, i) => (
                  <div
                    key={`tornado-query-${i}`}
                    className="spinning-query"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      transform: `rotate(${i * 72}deg)`,
                    }}
                  >
                    {query}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto">
        <h2
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500",
            !prefersReducedMotion && isCurrentlyActive && flashMobActive && "animate-title-chaos",
            !prefersReducedMotion && isCurrentlyActive && !flashMobActive && "animate-title-carnival",
          )}
        >
          Gemini FireStarter
        </h2>
        <p className="text-xl md:text-2xl text-orange-200 mb-8 md:mb-10">
          Welcome to the marketing chaos carnival!
        </p>

        {/* Chaos Level Meter */}
        <div className="mb-8 w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-orange-300">Chaos Level</span>
            <span className="text-sm font-bold text-yellow-400">{chaosLevel}%</span>
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-3">
            <div 
              className={cn(
                "h-3 rounded-full transition-all duration-500",
                chaosLevel < 30 ? "bg-gradient-to-r from-green-400 to-yellow-400" :
                chaosLevel < 70 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                "bg-gradient-to-r from-orange-500 to-red-500 animate-pulse"
              )}
              style={{ width: `${chaosLevel}%` }}
            />
          </div>
        </div>

        {/* Carnival Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
          {carnivalGames.map((game, index) => (
            <Button
              key={game.name}
              onClick={() => handleJoinCarnival(game)}
              className={cn(
                "h-24 flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 transition-all",
                activeGame === game.name
                  ? "bg-gradient-to-r from-red-500 to-orange-500 border-yellow-400 scale-105 animate-pulse"
                  : "bg-gradient-to-r from-neutral-800 to-neutral-700 border-orange-500/30 hover:border-orange-400 hover:scale-105",
                !prefersReducedMotion && isCurrentlyActive && "animate-game-appear"
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.1}s` }}
            >
              <div className="text-orange-400 mb-1">{game.icon}</div>
              <div className="text-xs font-bold text-white">{game.name}</div>
              <div className="text-xs text-orange-200">{game.participants} playing</div>
            </Button>
          ))}
        </div>

        {/* Current Query Challenge */}
        {currentQuery && (
          <Card className="mb-8 bg-gradient-to-r from-red-900/50 to-orange-900/50 border-yellow-500/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Flame className="h-6 w-6 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-bold">LIVE CHALLENGE</span>
                <Flame className="h-6 w-6 text-yellow-400 ml-2" />
              </div>
              <p className="text-white text-lg font-semibold">{currentQuery}</p>
            </CardContent>
          </Card>
        )}

        {/* Story Panels */}
        <div className="grid md:grid-cols-3 gap-6 w-full mb-8">
          {storyPanels.map((panel, index) => (
            <Card
              key={panel.title}
              className={cn(
                "bg-neutral-800/60 border-neutral-700/50 backdrop-blur-sm text-left shadow-lg",
                !prefersReducedMotion && isCurrentlyActive ? "animate-panel-carnival-burst" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.15 + 0.5}s` }}
            >
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-xl text-orange-300">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <Card className="bg-black/60 border-red-500/30 p-3 text-xs shadow-lg w-full max-w-md">
          <p className="text-red-400 font-semibold">@CarnivalChaos on X:</p>
          <p className="text-neutral-300 italic">
            "I survived FireStarter! My pitch became a meme, my search history a jingle, and I crowd-surfed marketers! 🎪🔥 #GSHA2025 #FireStarterChaos"
          </p>
        </Card>

        {/* Gemini Roast Easter Egg */}
        {showGeminiRoast && (
          <div
            className={cn(
              "absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-red-900/90 to-orange-900/90 p-4 rounded-lg shadow-2xl text-yellow-300 font-bold text-lg border border-yellow-500/50",
              !prefersReducedMotion && "animate-gemini-roast-pop",
              "z-20 flex items-center gap-2 text-center",
            )}
          >
            <PartyPopper className="h-6 w-6 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-yellow-500">Gemini Roast:</p>
              {currentRoast}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .carnival-bg {
          background: radial-gradient(ellipse at center, 
            rgba(139, 0, 0, calc(0.3 + var(--chaos-level, 0) * 0.4)) 0%, 
            rgba(75, 0, 0, calc(0.6 + var(--chaos-level, 0) * 0.2)) 50%, 
            rgba(25, 0, 0, 0.9) 100%
          );
        }
        
        .carnival-light {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: rgba(255, 215, 0, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          animation: carnivalFlicker infinite;
        }
        
        @keyframes carnivalFlicker {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .flash-mob-effect {
          position: absolute;
          inset: 0;
          z-index: 5;
        }
        
        .flash-mob-person {
          position: absolute;
          width: 20px;
          height: 40px;
          background: linear-gradient(to bottom, #ff6b35 0%, #f7931e 50%, #ffd700 100%);
          border-radius: 10px 10px 5px 5px;
          animation: flashMobDance 2s ease-in-out infinite;
          bottom: 0;
        }
        
        @keyframes flashMobDance {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .query-tornado {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        
        .tornado-text {
          position: absolute;
          font-size: 2rem;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          animation: tornadoSpin 3s linear infinite;
        }
        
        .spinning-query {
          position: absolute;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #ff6b35;
          font-weight: bold;
          text-align: center;
          animation: queryOrbit 5s linear infinite;
          transform-origin: center;
        }
        
        @keyframes tornadoSpin {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes queryOrbit {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }

        @keyframes titleCarnival {
          0%, 100% { text-shadow: 0 0 10px #ff6b35, 0 0 20px #f7931e; }
          50% { text-shadow: 0 0 20px #ff6b35, 0 0 40px #f7931e, 0 0 60px #ffd700; }
        }
        .animate-title-carnival { animation: titleCarnival 2s ease-in-out infinite; }

        @keyframes titleChaos {
          0% { text-shadow: 0 0 5px #ff0000; transform: scale(1) rotate(0deg); }
          25% { text-shadow: 0 0 15px #ff6b35; transform: scale(1.05) rotate(1deg); }
          50% { text-shadow: 0 0 25px #ffd700; transform: scale(1.1) rotate(-1deg); }
          75% { text-shadow: 0 0 15px #ff6b35; transform: scale(1.05) rotate(0.5deg); }
          100% { text-shadow: 0 0 5px #ff0000; transform: scale(1) rotate(0deg); }
        }
        .animate-title-chaos { animation: titleChaos 0.8s ease-in-out infinite; }

        @keyframes gameAppear {
          from { opacity: 0; transform: translateY(20px) rotate(-5deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        .animate-game-appear { animation: gameAppear 0.5s ease-out forwards; }

        @keyframes panelCarnivalBurst {
          0% { opacity: 0; transform: scale(0.8) rotate(-10deg); }
          70% { opacity: 1; transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-panel-carnival-burst { animation: panelCarnivalBurst 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        @keyframes geminiRoastPop {
          0% { opacity: 0; transform: translate(-50%, 20px) scale(0.8) rotate(-5deg); }
          70% { opacity: 1; transform: translate(-50%, -5px) scale(1.1) rotate(2deg); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1) rotate(0deg); }
        }
        .animate-gemini-roast-pop { animation: geminiRoastPop 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .reduced-motion .carnival-light,
        .reduced-motion .flash-mob-person,
        .reduced-motion .tornado-text,
        .reduced-motion .spinning-query,
        .reduced-motion .animate-title-carnival,
        .reduced-motion .animate-title-chaos,
        .reduced-motion .animate-game-appear,
        .reduced-motion .animate-panel-carnival-burst,
        .reduced-motion .animate-gemini-roast-pop {
            animation: none !important;
        }
        .reduced-motion .carnival-bg {
            background: rgba(75, 0, 0, 0.8);
        }
        .reduced-motion .animate-game-appear,
        .reduced-motion .animate-panel-carnival-burst {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiFireStarter
