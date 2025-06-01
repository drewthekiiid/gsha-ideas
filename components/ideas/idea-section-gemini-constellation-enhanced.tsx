"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Zap, Eye, QrCode, MessageCircle, Sparkles, Target, Trophy } from "lucide-react"

// Personal Star Creation Prompts
const STAR_PROMPTS = [
  "What's your signature move as a marketer?",
  "Drop one word that defines your impact",
  "Your superpower in the search space?", 
  "What makes your campaigns unforgettable?",
  "Your secret to connecting with audiences?"
]

// AI-Powered Star Alchemy Matches
const STAR_ALCHEMY_MATCHES = [
  { reason: "Campaign optimization synergy detected", trigger: "performance + creativity collision" },
  { reason: "Cross-industry innovation potential", trigger: "tech + traditional blend" },
  { reason: "Audience expansion opportunity", trigger: "B2B meets B2C expertise" },
  { reason: "Data storytelling alignment", trigger: "analytics + narrative fusion" },
  { reason: "Global market scaling match", trigger: "local + international experience" }
]

// Constellation Mission Challenges
const CONSTELLATION_MISSIONS = [
  { 
    challenge: "Form the Big Dipper constellation", 
    reward: "Supernova Badge", 
    participants: 7,
    description: "First group to create the classic pattern gets cosmic recognition"
  },
  { 
    challenge: "Create a Google 'G' in the stars", 
    reward: "Google Legacy Star", 
    participants: 5,
    description: "Show your Google pride with stellar precision"
  },
  { 
    challenge: "Build a search magnifying glass", 
    reward: "Search Master Badge", 
    participants: 6,
    description: "Represent the power of search through star arrangement"
  }
]

// AR Hidden Stories & Campaign Facts
const AR_DISCOVERIES = [
  { 
    trigger: "Shooting Star Hunt", 
    reward: "Limited-Edition Gemini Badge",
    story: "Did you know? The first Google search was for 'Backrub' - the original name for Google's algorithm"
  },
  { 
    trigger: "Nebula Scan", 
    reward: "Cosmic Campaign Badge",
    story: "Easter Egg: The most successful Google Ads campaign generated 50x ROI using AI optimization"
  },
  { 
    trigger: "Twin Star Discovery", 
    reward: "Gemini Twin Badge",
    story: "Fun Fact: Gemini processes over 1 trillion search queries annually"
  }
]

// Live Room Energy & Pulse Data
const ROOM_ENERGY_STREAMS = [
  "Constellation energy: 847 connections active",
  "Star alchemy matches: 23 cosmic collisions detected", 
  "Mission progress: Big Dipper 67% | Google G 82% | Search Glass 45%",
  "Live participants: 234 star creators in the galaxy",
  "AR discoveries: 156 hidden stories unlocked",
  "Twin star pulses: Peak duality moment approaching",
  "Nebula bar sync: Room energy at cosmic levels",
  "Digital artwork: Constellation evolving in real-time"
]

// 3D-Printed Star Token System
const STAR_TOKENS = [
  { id: "GSHA-STAR-2847", type: "Innovator", qrCode: "QR_2847_INNOVATION", color: "cosmic-blue" },
  { id: "GSHA-STAR-9156", type: "Strategist", qrCode: "QR_9156_STRATEGY", color: "stellar-purple" },
  { id: "GSHA-STAR-4729", type: "Creator", qrCode: "QR_4729_CREATIVE", color: "nebula-pink" },
  { id: "GSHA-STAR-8341", type: "Analyst", qrCode: "QR_8341_DATA", color: "galaxy-green" },
  { id: "GSHA-STAR-5068", type: "Connector", qrCode: "QR_5068_NETWORK", color: "supernova-gold" }
]

// Gemini AI Constellation Narrations
const GEMINI_NARRATIONS = [
  "Your star is about to align with someone special - collision imminent",
  "The constellation recognizes your networking prowess - connections multiplying",
  "Outstanding! Your star alchemy is creating beautiful new patterns",
  "The twin stars sense your collaborative energy - prepare for cosmic synergy",
  "Exceptional pattern formation - you're contributing to the digital artwork legacy",
  "The nebula responds to your presence - room energy amplifying",
  "Your constellation story is being written in real-time",
  "Magnificent! The galaxy is brighter with your stellar contributions"
]

interface StarData {
  id: string
  x: number
  y: number
  size: number
  name: string
  prompt: string
  response: string
  connections: string[]
  tokenId: string
  alchemyMatches: number
  lastPulse: number
}

const IdeaSectionGeminiConstellation: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [personalStar, setPersonalStar] = useState<StarData | null>(null)
  const [activeStars, setActiveStars] = useState<StarData[]>([])
  const [connectionZaps, setConnectionZaps] = useState<Array<{id: string, x1: number, y1: number, x2: number, y2: number}>>([])
  const [currentMission, setCurrentMission] = useState(CONSTELLATION_MISSIONS[0])
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])
  const [arDiscoveries, setArDiscoveries] = useState<string[]>([])
  const [roomEnergy, setRoomEnergy] = useState(75)
  const [showNarration, setShowNarration] = useState(false)
  const [currentNarration, setCurrentNarration] = useState("")
  const [showEnergyStream, setShowEnergyStream] = useState(false)
  const [energyStream, setEnergyStream] = useState("")
  const [galaxyFusion, setGalaxyFusion] = useState(false)
  const [twinStarPulse, setTwinStarPulse] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-constellation"

  const audioRefs = {
    ambient: useRef<HTMLAudioElement | null>(null),
    starCreate: useRef<HTMLAudioElement | null>(null),
    connectionZap: useRef<HTMLAudioElement | null>(null),
    missionComplete: useRef<HTMLAudioElement | null>(null),
    arDiscovery: useRef<HTMLAudioElement | null>(null),
    galaxyFusion: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.ambient.current = new Audio("/sounds/constellation-ambient-shimmer.mp3")
      audioRefs.ambient.current.volume = 0.2
      audioRefs.starCreate.current = new Audio("/sounds/star-twinkle-sfx.mp3")
      audioRefs.starCreate.current.volume = 0.4
      audioRefs.connectionZap.current = new Audio("/sounds/neon-trace.mp3")
      audioRefs.connectionZap.current.volume = 0.5
      audioRefs.missionComplete.current = new Audio("/sounds/digital-blip.mp3")
      audioRefs.missionComplete.current.volume = 0.6
      audioRefs.arDiscovery.current = new Audio("/sounds/gemini-quip-reveal.mp3")
      audioRefs.arDiscovery.current.volume = 0.5
      audioRefs.galaxyFusion.current = new Audio("/sounds/data-stream-pulse.mp3")
      audioRefs.galaxyFusion.current.volume = 0.7
    }
  }, [])

  // Generate personal star on load
  useEffect(() => {
    if (isCurrentlyActive && !personalStar) {
      const token = STAR_TOKENS[Math.floor(Math.random() * STAR_TOKENS.length)]
      const prompt = STAR_PROMPTS[Math.floor(Math.random() * STAR_PROMPTS.length)]
      
      const newStar: StarData = {
        id: `star-${Date.now()}`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: 3,
        name: "Your Star",
        prompt: prompt,
        response: "Creating stellar impact",
        connections: [],
        tokenId: token.id,
        alchemyMatches: 0,
        lastPulse: Date.now()
      }
      
      setPersonalStar(newStar)
      setActiveStars([newStar])
      setRoomEnergy(Math.floor(Math.random() * 30) + 70) // 70-99%
    }
  }, [isCurrentlyActive, personalStar])

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
      setPersonalStar(null)
      setActiveStars([])
      setConnectionZaps([])
      setEarnedBadges([])
      setArDiscoveries([])
      setGalaxyFusion(false)
      setShowNarration(false)
      setShowEnergyStream(false)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Gemini AI Narration System
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const narrationInterval = setInterval(() => {
      const narration = GEMINI_NARRATIONS[Math.floor(Math.random() * GEMINI_NARRATIONS.length)]
      setCurrentNarration(narration)
      setShowNarration(true)
      
      if (!isMuted && audioRefs.arDiscovery.current) {
        audioRefs.arDiscovery.current.currentTime = 0
        audioRefs.arDiscovery.current.play().catch(console.warn)
      }
      
      setTimeout(() => setShowNarration(false), 4500)
    }, 9000)

    return () => clearInterval(narrationInterval)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Room Energy Stream Updates
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const energyInterval = setInterval(() => {
      const stream = ROOM_ENERGY_STREAMS[Math.floor(Math.random() * ROOM_ENERGY_STREAMS.length)]
      setEnergyStream(stream)
      setShowEnergyStream(true)
      
      // Update room energy
      setRoomEnergy(prev => Math.min(100, prev + Math.floor(Math.random() * 5)))
      
      setTimeout(() => setShowEnergyStream(false), 3500)
    }, 7000)

    return () => clearInterval(energyInterval)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Twin Star Pulse Effect
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const pulseInterval = setInterval(() => {
      setTwinStarPulse(true)
      setTimeout(() => setTwinStarPulse(false), 2000)
    }, 15000)

    return () => clearInterval(pulseInterval)
  }, [isCurrentlyActive, prefersReducedMotion])

  const handleStarAlchemy = () => {
    if (!personalStar) return
    
    // Create connection zap effect
    const zapId = `zap-${Date.now()}`
    const zap = {
      id: zapId,
      x1: personalStar.x,
      y1: personalStar.y,
      x2: Math.random() * 80 + 10,
      y2: Math.random() * 80 + 10
    }
    
    setConnectionZaps(prev => [...prev, zap])
    
    // Update personal star matches
    setPersonalStar(prev => prev ? {...prev, alchemyMatches: prev.alchemyMatches + 1} : null)
    
    if (!isMuted && audioRefs.connectionZap.current) {
      audioRefs.connectionZap.current.currentTime = 0
      audioRefs.connectionZap.current.play().catch(console.warn)
    }
    
    // Remove zap after animation
    setTimeout(() => {
      setConnectionZaps(prev => prev.filter(z => z.id !== zapId))
    }, 2000)
  }

  const handleConstellationMission = () => {
    const nextMission = CONSTELLATION_MISSIONS[Math.floor(Math.random() * CONSTELLATION_MISSIONS.length)]
    setCurrentMission(nextMission)
    
    // Award badge occasionally
    if (Math.random() < 0.4 && !earnedBadges.includes(nextMission.reward)) {
      setEarnedBadges(prev => [...prev, nextMission.reward])
      if (!isMuted && audioRefs.missionComplete.current) {
        audioRefs.missionComplete.current.currentTime = 0
        audioRefs.missionComplete.current.play().catch(console.warn)
      }
    }
  }

  const handleArDiscovery = () => {
    const undiscovered = AR_DISCOVERIES.filter(disc => !arDiscoveries.includes(disc.trigger))
    if (undiscovered.length > 0 && Math.random() < 0.5) {
      const discovery = undiscovered[Math.floor(Math.random() * undiscovered.length)]
      setArDiscoveries(prev => [...prev, discovery.trigger])
      setEarnedBadges(prev => [...prev, discovery.reward])
      
      if (!isMuted && audioRefs.arDiscovery.current) {
        audioRefs.arDiscovery.current.currentTime = 0
        audioRefs.arDiscovery.current.play().catch(console.warn)
      }
    }
  }

  const handleGalaxyFusion = () => {
    setGalaxyFusion(true)
    
    if (!isMuted && audioRefs.galaxyFusion.current) {
      audioRefs.galaxyFusion.current.currentTime = 0
      audioRefs.galaxyFusion.current.play().catch(console.warn)
    }
    
    setTimeout(() => setGalaxyFusion(false), 5000)
  }

  const storyPanels = [
    {
      title: "Starlit Arrival",
      content: `Enter through swirling space dust tunnel. Your steps trigger new stars. Claim your ${personalStar?.tokenId || 'star token'} and answer: "${personalStar?.prompt || 'What defines your impact?'}"`,
    },
    {
      title: "Star Alchemy", 
      content: "AI matches you for cosmic collisions. When stars connect, constellation zaps appear overhead. Complete missions to form new stellar patterns.",
    },
    {
      title: "Galaxy Fusion",
      content: "Epic finale as all paths merge into a kinetic, swirling galaxy. Your star pulses in a cosmic storm of campaign highlights and AR meteors.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Cosmic Background with Space Dust and Nebula */}
      <div className="absolute inset-0 z-0 constellation-bg">
        {!prefersReducedMotion && (
          <>
            <div className="space-dust-tunnel" />
            <div className="stellar-particles" />
            <div className="cosmic-nebula nebula-1" />
            <div className="cosmic-nebula nebula-2" />
            {galaxyFusion && <div className="galaxy-fusion-effect" />}
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around h-full w-full max-w-6xl mx-auto gap-8">
        {/* Left Side: Info & Story */}
        <div className="lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400",
              !prefersReducedMotion && isCurrentlyActive && "animate-cosmic-title",
            )}
          >
            Gemini Constellation: The Night Search Lit Up the Sky
          </h2>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 md:mb-10">
            Where connections become constellations
          </p>

          <div className="space-y-4 mb-6 w-full max-w-md">
            {storyPanels.map((panel, index) => (
              <Card
                key={panel.title}
                className={cn(
                  "bg-neutral-800/70 border-purple-500/30 backdrop-blur-sm shadow-lg",
                  !prefersReducedMotion && isCurrentlyActive ? "animate-panel-drift-in" : "opacity-100",
                )}
                style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.4}s` }}
              >
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-xl text-purple-300">{panel.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-black/60 border-purple-500/30 p-3 text-xs shadow-lg w-full max-w-md">
            <p className="text-cyan-400 font-semibold">@StellarMarketer on X:</p>
            <p className="text-neutral-300 italic">
              "Just experienced the most epic networking event ever! My campaign data literally became stars in the sky ✨ #GSHA2025 #ConstellationMagic"
            </p>
          </Card>
        </div>

        {/* Right Side: Interactive Constellation Experience */}
        <div className="lg:w-3/5 flex flex-col gap-6">
          {/* Personal Star Token Display */}
          {personalStar && (
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-400/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
                  <QrCode size={18} /> Your Star Token
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-purple-100 font-mono text-sm">{personalStar.tokenId}</p>
                  <div className={cn(
                    "w-4 h-4 rounded-full",
                    twinStarPulse ? "animate-pulse bg-cyan-400" : "bg-purple-400"
                  )} />
                </div>
                <p className="text-purple-200 text-sm italic">"{personalStar.prompt}"</p>
                <p className="text-purple-300 text-sm">Answer: {personalStar.response}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-purple-300">Alchemy Matches: {personalStar.alchemyMatches}</span>
                  <span className="text-purple-300">Connections: {personalStar.connections.length}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Controls */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleStarAlchemy}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all"
            >
              <Zap className="h-4 w-4 mr-2" />
              Star Alchemy
            </Button>
            
            <Button
              onClick={handleArDiscovery}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all"
            >
              <Eye className="h-4 w-4 mr-2" />
              AR Discovery
            </Button>
          </div>

          {/* Current Mission */}
          <Card className="bg-neutral-800/50 border-cyan-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-cyan-300 flex items-center gap-2">
                <Target size={18} /> Active Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-cyan-100 font-semibold">{currentMission.challenge}</p>
              <p className="text-cyan-200 text-sm">{currentMission.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300">Participants needed: {currentMission.participants}</span>
                <Button
                  onClick={handleConstellationMission}
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-500"
                >
                  Join Mission
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Room Energy & Progress */}
          <Card className="bg-neutral-800/50 border-purple-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles size={18} /> Room Energy
                </span>
                <span className="text-sm font-mono">{roomEnergy}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="w-full bg-neutral-700 h-3 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${roomEnergy}%` }}
                />
              </div>
              
              {earnedBadges.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-purple-300 font-semibold">Earned Badges:</p>
                  {earnedBadges.slice(0, 3).map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-cyan-300">
                      <Trophy size={12} className="text-cyan-400" />
                      {badge}
                    </div>
                  ))}
                </div>
              )}
              
              {arDiscoveries.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-purple-300 font-semibold">AR Discoveries:</p>
                  {arDiscoveries.slice(0, 2).map((discovery, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-yellow-300">
                      <Star size={12} className="text-yellow-400" />
                      {discovery}
                    </div>
                  ))}
                </div>
              )}
              
              <Button
                onClick={handleGalaxyFusion}
                className="w-full mt-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white transition-all"
              >
                Trigger Galaxy Fusion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connection Zap Effects */}
      {connectionZaps.map(zap => (
        <div
          key={zap.id}
          className="absolute pointer-events-none z-15"
          style={{
            left: `${zap.x1}%`,
            top: `${zap.y1}%`,
            width: `${Math.abs(zap.x2 - zap.x1)}%`,
            height: `${Math.abs(zap.y2 - zap.y1)}%`,
          }}
        >
          <div className="constellation-zap" />
        </div>
      ))}

      {/* Gemini AI Narration */}
      {showNarration && (
        <div
          className={cn(
            "absolute top-[15%] left-[5%] right-[5%] bg-gradient-to-r from-black/90 to-purple-900/80 p-4 rounded-lg shadow-2xl border border-purple-500/50",
            !prefersReducedMotion && "animate-cosmic-narration",
            "z-20 text-center"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-purple-400" />
            <span className="text-purple-400 font-semibold text-sm">Gemini Constellation Guide</span>
          </div>
          <p className="text-purple-200 text-sm italic">{currentNarration}</p>
        </div>
      )}

      {/* Room Energy Stream */}
      {showEnergyStream && (
        <div
          className={cn(
            "absolute bottom-[10%] right-[5%] bg-black/80 p-3 rounded-lg shadow-2xl border border-cyan-500/50",
            !prefersReducedMotion && "animate-energy-pulse",
            "z-20"
          )}
        >
          <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            {energyStream}
          </div>
        </div>
      )}

      <style jsx>{`
        .constellation-bg {
          background: radial-gradient(ellipse at center, #1a0b3d 0%, #2d1b69 40%, #0a0a23 100%);
        }
        
        .space-dust-tunnel {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(139, 92, 246, 0.1) 25%,
            transparent 50%,
            rgba(59, 130, 246, 0.1) 75%,
            transparent 100%);
          animation: swirlingDust 15s linear infinite;
        }
        
        .stellar-particles {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(139, 92, 246, 0.8), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(59, 130, 246, 0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(34, 211, 238, 0.8), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(168, 85, 247, 0.8), transparent);
          background-size: 200px 150px;
          animation: particleFloat 20s ease-in-out infinite;
        }
        
        .cosmic-nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
          animation: nebulaDrift 25s ease-in-out infinite alternate;
        }
        .nebula-1 { 
          width: 500px; 
          height: 400px; 
          background: radial-gradient(circle, #8b5cf6, transparent 60%); 
          top: 20%; 
          left: 10%; 
          animation-delay: -5s;
        }
        .nebula-2 { 
          width: 400px; 
          height: 600px; 
          background: radial-gradient(circle, #3b82f6, transparent 60%); 
          bottom: 10%; 
          right: 15%; 
          animation-delay: -15s;
        }
        
        .galaxy-fusion-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, 
            rgba(139, 92, 246, 0.3) 0%,
            rgba(59, 130, 246, 0.2) 30%,
            rgba(34, 211, 238, 0.1) 60%,
            transparent 100%);
          animation: galaxyPulse 2s ease-in-out infinite;
        }
        
        .constellation-zap {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%,
            #22d3ee 20%,
            #3b82f6 50%,
            #8b5cf6 80%,
            transparent 100%);
          animation: zapFlash 0.5s ease-out;
          transform-origin: left center;
        }
        
        @keyframes swirlingDust {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          33% { transform: translate(30px, -20px) rotate(120deg); opacity: 1; }
          66% { transform: translate(-20px, 30px) rotate(240deg); opacity: 0.8; }
        }
        
        @keyframes nebulaDrift {
          0% { transform: translate(-30px, -20px) rotate(-5deg); }
          100% { transform: translate(30px, 20px) rotate(5deg); }
        }
        
        @keyframes galaxyPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes zapFlash {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        
        @keyframes cosmicTitle {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3); 
          }
          50% { 
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5), 0 0 80px rgba(34, 211, 238, 0.3); 
          }
        }
        .animate-cosmic-title { animation: cosmicTitle 4s ease-in-out infinite; }

        @keyframes panelDriftIn {
          from { opacity: 0; transform: translateY(30px) rotateX(10deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        .animate-panel-drift-in { animation: panelDriftIn 0.8s ease-out forwards; }

        @keyframes cosmicNarration {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-cosmic-narration { animation: cosmicNarration 0.6s ease-out forwards; }

        @keyframes energyPulse {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-energy-pulse { animation: energyPulse 0.5s ease-out forwards; }

        .reduced-motion .space-dust-tunnel,
        .reduced-motion .stellar-particles,
        .reduced-motion .cosmic-nebula,
        .reduced-motion .galaxy-fusion-effect,
        .reduced-motion .constellation-zap,
        .reduced-motion .animate-cosmic-title,
        .reduced-motion .animate-panel-drift-in,
        .reduced-motion .animate-cosmic-narration,
        .reduced-motion .animate-energy-pulse {
          animation: none !important;
        }
        .reduced-motion .constellation-bg {
          background: #1a0b3d;
        }
        .reduced-motion .animate-panel-drift-in {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiConstellation
