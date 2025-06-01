"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Added import
import { ThumbsUp, MessageCircle, Zap, Flame, Activity, Eye, FileText } from "lucide-react" // Added FileText

const LIVE_DATA_STREAMS = [
  { text: "Your Performance Portrait: Igniting", icon: <Zap className="h-4 w-4 mr-1 text-yellow-400" />, type: "individual" },
  { text: "Regional Heatmap: Vancouver", icon: <ThumbsUp className="h-4 w-4 mr-1 text-green-400" />, type: "collective" },
  { text: "600 Minds. One Inferno.", icon: <MessageCircle className="h-4 w-4 mr-1 text-sky-400" />, type: "collective" },
  { text: "Winner: Campaign Supernova!", icon: <Zap className="h-4 w-4 mr-1 text-yellow-400" />, type: "winner" },
  { text: "Every Spark Matters", icon: <ThumbsUp className="h-4 w-4 mr-1 text-green-400" />, type: "recognition" },
  { text: "Live AI Narration Active", icon: <MessageCircle className="h-4 w-4 mr-1 text-sky-400" />, type: "tech" },
  { text: "Heat Signature: Rising", icon: <Flame className="h-4 w-4 mr-1 text-yellow-400" />, type: "individual" },
  { text: "Unsung Heroes Highlighted", icon: <Eye className="h-4 w-4 mr-1 text-green-400" />, type: "recognition" },
  { text: "Innovation Index: +2", icon: <Activity className="h-4 w-4 mr-1 text-purple-400" />, type: "metrics" },
  { text: "Collective Energy: 🔥", icon: <Flame className="h-4 w-4 mr-1 text-orange-400" />, type: "collective" },
]

const MICROMETRICS = [
  { text: "Creative Spark: +1", icon: <Zap className="h-4 w-4 mr-1 text-yellow-400" />, type: "individual" },
  { text: "Team Heat: Rising", icon: <ThumbsUp className="h-4 w-4 mr-1 text-green-400" />, type: "collective" },
  { text: "Bold Move Detected", icon: <MessageCircle className="h-4 w-4 mr-1 text-sky-400" />, type: "individual" },
  { text: "Innovation Index: +2", icon: <Activity className="h-4 w-4 mr-1 text-yellow-400" />, type: "individual" },
  { text: "Collective Energy: 🔥", icon: <Flame className="h-4 w-4 mr-1 text-green-400" />, type: "collective" },
]

const GEMINI_NARRATIONS = [
  "The room temperature just spiked—someone's about to make moves.",
  "I'm detecting unprecedented creative energy. This is how legends begin.",
  "Your performance portrait is literally glowing. Keep pushing those boundaries.",
  "The collective heat signature is off the charts. Vancouver is on fire.",
  "I've witnessed greatness before—this feels familiar.",
  "Every interaction is being measured, mapped, and immortalized.",
  "Data visualization in real-time: your creativity has a signature.",
  "Unsung heroes emerging in the heatmap. Recognition algorithms engaged.",
]

const IdeaSectionGeminiInferno: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [dataStreams, setDataStreams] = useState<Array<{ id: number; x: number; y: number; stream: (typeof LIVE_DATA_STREAMS)[0] }>>(
    [],
  )
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; metric: (typeof MICROMETRICS)[0] }>>(
    [],
  )
  const [flameIntensity, setFlameIntensity] = useState(0.3)
  const [geminiNarration, setGeminiNarration] = useState("")
  const [showGeminiNarration, setShowGeminiNarration] = useState(false)
  const [showGeminiQuip, setShowGeminiQuip] = useState(false)
  const [heatmapActive, setHeatmapActive] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-data-inferno"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    throwSpark: useRef<HTMLAudioElement | null>(null),
    quipReveal: useRef<HTMLAudioElement | null>(null),
    dataStream: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/inferno-crackle-whoosh.mp3")
      audioRefs.transition.current.volume = 0.3
      audioRefs.throwSpark.current = new Audio("/sounds/inferno-spark-reveal.mp3")
      audioRefs.throwSpark.current.volume = 0.4
      audioRefs.quipReveal.current = new Audio("/sounds/gemini-quip-reveal.mp3")
      audioRefs.quipReveal.current.volume = 0.5
      audioRefs.dataStream.current = new Audio("/sounds/data-stream-pulse.mp3")
      audioRefs.dataStream.current.volume = 0.3
    }
  }, [])

  useEffect(() => {
    if (isCurrentlyActive && !prefersReducedMotion && !isMuted && audioRefs.transition.current) {
      audioRefs.transition.current.currentTime = 0
      audioRefs.transition.current.play().catch(console.warn)
    }
    if (!isCurrentlyActive) {
      setFlameIntensity(0.3)
      setHeatmapActive(false)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Live data streams effect
  useEffect(() => {
    if (!isCurrentlyActive || prefersReducedMotion) return

    const streamInterval = setInterval(() => {
      const randomStream = LIVE_DATA_STREAMS[Math.floor(Math.random() * LIVE_DATA_STREAMS.length)]
      const newDataStream = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        stream: randomStream,
      }
      setDataStreams(prev => [...prev, newDataStream].slice(-5))
      
      setFlameIntensity(prev => Math.min(1, prev + 0.05))
      
      if (!isMuted && audioRefs.dataStream.current) {
        audioRefs.dataStream.current.currentTime = 0
        audioRefs.dataStream.current.play().catch(console.warn)
      }
    }, 3000)

    return () => clearInterval(streamInterval)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Gemini AI narration effect
  useEffect(() => {
    if (!isCurrentlyActive) return

    const narrationInterval = setInterval(() => {
      const randomNarration = GEMINI_NARRATIONS[Math.floor(Math.random() * GEMINI_NARRATIONS.length)]
      setGeminiNarration(randomNarration)
      setShowGeminiNarration(true)
      
      setTimeout(() => setShowGeminiNarration(false), 4000)
    }, 8000)

    return () => clearInterval(narrationInterval)
  }, [isCurrentlyActive])

  // Heatmap activation effect
  useEffect(() => {
    if (!isCurrentlyActive) return

    const heatmapTimer = setTimeout(() => {
      setHeatmapActive(true)
    }, 1000)

    return () => clearTimeout(heatmapTimer)
  }, [isCurrentlyActive])

  const handleFlameInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isCurrentlyActive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newSpark = {
      id: Date.now(),
      x,
      y,
      metric: MICROMETRICS[Math.floor(Math.random() * MICROMETRICS.length)],
    }
    setSparks((prev) => [...prev, newSpark].slice(-7))
    setFlameIntensity((prev) => Math.min(1, prev + 0.1))

    if (!isMuted && audioRefs.throwSpark.current) {
      audioRefs.throwSpark.current.currentTime = 0
      audioRefs.throwSpark.current.play().catch(console.warn)
    }

    // Easter Egg: Click bottom center (hottest part)
    if (y > 85 && x > 40 && x < 60 && !showGeminiQuip) {
      setShowGeminiQuip(true)
      if (!isMuted && audioRefs.quipReveal.current) {
        audioRefs.quipReveal.current.currentTime = 0
        audioRefs.quipReveal.current.play().catch(console.warn)
      }
      setTimeout(() => setShowGeminiQuip(false), 4000)
    }
  }

  const storyPanels = [
    {
      title: "Multi-Sensory Arrival",
      content: "Step into live heatmaps that react to your presence. Temperature, sound, and visual flames respond to every move as Gemini begins mapping your performance portrait.",
    },
    {
      title: "Live Data Orchestration", 
      content:
        "Gemini narrates the collective energy as sophisticated algorithms track individual sparks and team dynamics. Every interaction feeds the data inferno, creating real-time visualizations of creativity.",
    },
    {
      title: "Performance Recognition",
      content: "Leave with a personalized 'ignition reel'—a Google-official visual story of your contributions, unsung moments, and the collective fire you helped create.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Flames - Interactive Area with Heatmap */}
      <div
        className={cn(
          "absolute inset-0 z-0 overflow-hidden cursor-pointer inferno-bg-interactive",
          heatmapActive && "heatmap-visualization"
        )}
        onClick={handleFlameInteraction}
        style={{ "--flame-intensity": flameIntensity } as React.CSSProperties}
      >
        {!prefersReducedMotion && (
          <>
            <div className="flame-visual flame-base"></div>
            <div className="flame-visual flame-middle"></div>
            <div className="flame-visual flame-top"></div>
            {/* Multi-sensory heatmap overlay */}
            {heatmapActive && (
              <div className="heatmap-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={`heatmap-cell cell-${i % 4}`}></div>
                ))}
              </div>
            )}
            {/* Embers rising from the base */}
            <div className="ember-rising ember-1"></div>
            <div className="ember-rising ember-2"></div>
            <div className="ember-rising ember-3"></div>
            <div className="ember-rising ember-4"></div>
            <div className="ember-rising ember-5"></div>
          </>
        )}

        {/* Sparks from interaction */}
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className={cn(
              "absolute flex items-center text-xs md:text-sm font-semibold p-2 bg-black/50 border border-orange-500/30 rounded-lg shadow-lg",
              !prefersReducedMotion && "animate-spark-metric-reveal",
              spark.metric.type === "individual" && "text-yellow-300",
              spark.metric.type === "collective" && "text-green-300",
              spark.metric.type === "tech" && "text-sky-300",
            )}
            style={{ left: `${spark.x}%`, top: `${spark.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {spark.metric.icon}
            {spark.metric.text}
          </div>
        ))}

        {/* Live Data Streams */}
        {dataStreams.map((dataStream) => (
          <div
            key={dataStream.id}
            className={cn(
              "absolute flex items-center text-sm font-bold p-3 bg-gradient-to-r from-red-500/80 to-orange-500/80 border border-yellow-400/50 rounded-lg shadow-xl backdrop-blur-sm",
              !prefersReducedMotion && "animate-data-stream-pulse",
              dataStream.stream.type === "individual" && "text-yellow-200",
              dataStream.stream.type === "collective" && "text-green-200",
              dataStream.stream.type === "winner" && "text-orange-200",
              dataStream.stream.type === "recognition" && "text-blue-200",
              dataStream.stream.type === "tech" && "text-purple-200",
              dataStream.stream.type === "metrics" && "text-pink-200"
            )}
            style={{ left: `${dataStream.x}%`, top: `${dataStream.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {dataStream.stream.icon}
            {dataStream.stream.text}
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto">
        <h2
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500",
            !prefersReducedMotion && isCurrentlyActive && "animate-title-flame-lick",
          )}
        >
          Data Inferno
        </h2>
        <p className="text-xl md:text-2xl text-orange-200 mb-8">
          Every spark counts—turning your impact into a living spectacle.
        </p>

        {/* Notion Link Button */}
        <Button variant="outline" className="mb-8 border-orange-400/50 text-orange-300 hover:bg-orange-400/10 hover:text-orange-200" asChild>
          <a href="https://www.notion.so/Data-Inferno-20494b73a48480849b88f31197c46d8f?source=copy_link" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            View Text-Only Concept
          </a>
        </Button>

        {/* Gemini AI Narration */}
        {showGeminiNarration && (
          <div
            className={cn(
              "absolute top-4 left-1/2 -translate-x-1/2 z-20 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50 rounded-lg shadow-xl backdrop-blur-sm max-w-2xl animate-gemini-narration-fade-in"
            )}
          >
            <p className="text-purple-200 font-semibold text-sm mb-1">Gemini AI Live Narration:</p>
            <p className="text-white text-lg italic">{geminiNarration}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8 w-full">
          {storyPanels.map((panel, index) => (
            <Card
              key={panel.title}
              className={cn(
                "bg-neutral-800/70 border-neutral-700/50 backdrop-blur-sm text-left shadow-xl",
                !prefersReducedMotion && isCurrentlyActive ? "animate-panel-reveal" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.3}s` }}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-xl text-orange-300">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-neutral-200 leading-relaxed">{panel.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full max-w-md mb-8">
          <Card className="bg-black/60 border-orange-500/30 p-4 shadow-lg">
            <p className="text-sky-400 font-semibold text-sm">@GSHA_Insider on X:</p>
            <p className="text-neutral-300 italic text-sm">
              "The data visualization is insane—every move tracked, every spark measured! 🔥📊 #GSHA2025 #DataInferno #GeminiMagic"
            </p>
          </Card>
        </div>

        {showGeminiQuip && (
          <div
            className={cn(
              "absolute bottom-[15%] left-1/2 -translate-x-1/2 bg-black/80 p-4 rounded-lg shadow-2xl text-yellow-300 font-bold text-lg border border-yellow-500/50",
              !prefersReducedMotion && "animate-gemini-quip-pop",
              "z-20",
            )}
          >
            "Don't get too close unless you're ready to go viral." – Gemini
          </div>
        )}
      </div>

      <style jsx>{`
        .inferno-bg-interactive {
          background: radial-gradient(ellipse at bottom, #4d0000 0%, #1a0000 60%, #0d0000 100%);
          transition: filter 0.5s ease-out;
          filter: brightness(calc(0.8 + var(--flame-intensity, 0.3) * 0.7));
        }
        
        .heatmap-visualization {
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,0,0,0.3) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(255,100,0,0.4) 0%, transparent 25%),
            radial-gradient(circle at 60% 20%, rgba(255,200,0,0.2) 0%, transparent 35%),
            radial-gradient(circle at 40% 80%, rgba(255,0,100,0.3) 0%, transparent 40%),
            radial-gradient(ellipse at bottom, #4d0000 0%, #1a0000 60%, #0d0000 100%);
        }
        
        .heatmap-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          opacity: 0.6;
        }
        
        .heatmap-cell {
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.5s ease;
        }
        
        .cell-0 { background: rgba(255,0,0,0.2); animation: heatPulse 3s ease-in-out infinite; }
        .cell-1 { background: rgba(255,100,0,0.3); animation: heatPulse 3s ease-in-out infinite 0.5s; }
        .cell-2 { background: rgba(255,200,0,0.1); animation: heatPulse 3s ease-in-out infinite 1s; }
        .cell-3 { background: rgba(255,0,100,0.25); animation: heatPulse 3s ease-in-out infinite 1.5s; }
        
        @keyframes heatPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .flame-visual {
          position: absolute;
          bottom: -20%;
          left: 50%;
          width: 150%;
          height: 100%;
          transform-origin: bottom center;
          opacity: calc(0.2 + var(--flame-intensity, 0.3) * 0.8);
        }
        
        .flame-base {
          background: linear-gradient(to top, rgba(255,0,0,0.7) 0%, rgba(255,0,0,0.3) 40%, transparent 70%);
          animation: slowSway 10s ease-in-out infinite alternate;
          transform: translateX(-50%) scaleY(calc(0.6 + var(--flame-intensity, 0.3) * 0.4));
        }
        
        .flame-middle {
          background: linear-gradient(to top, rgba(255,100,0,0.6) 0%, rgba(255,100,0,0.2) 50%, transparent 80%);
          animation: slowSway 8s ease-in-out infinite alternate-reverse 0.5s;
          transform: translateX(-50%) scaleY(calc(0.7 + var(--flame-intensity, 0.3) * 0.5));
        }
        
        .flame-top {
          background: linear-gradient(to top, rgba(255,200,0,0.5) 0%, rgba(255,200,0,0.1) 60%, transparent 90%);
          animation: slowSway 6s ease-in-out infinite alternate 1s;
          transform: translateX(-50%) scaleY(calc(0.8 + var(--flame-intensity, 0.3) * 0.6));
        }
        
        @keyframes slowSway {
          0% { transform: translateX(-50%) scaleY(calc(0.8 + var(--flame-intensity, 0.3) * 0.4)) skewX(-3deg); }
          100% { transform: translateX(-50%) scaleY(calc(1 + var(--flame-intensity, 0.3) * 0.6)) skewX(3deg); }
        }

        .ember-rising {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #ffcc00;
          border-radius: 50%;
          opacity: 0;
          animation: riseAndDrift 6s ease-out infinite;
          box-shadow: 0 0 5px #ffcc00, 0 0 10px #ffae00;
        }
        
        .ember-1 { bottom: 5%; left: 20%; animation-delay: 0s; }
        .ember-2 { bottom: 10%; left: 40%; animation-delay: 1.5s; }
        .ember-3 { bottom: 3%; left: 65%; animation-delay: 3s; }
        .ember-4 { bottom: 8%; left: 80%; animation-delay: 4.5s; }
        .ember-5 { bottom: 12%; left: 50%; animation-delay: 0.7s; }
        
        @keyframes riseAndDrift {
          0% { transform: translateY(0) translateX(0) scale(calc(0.5 + var(--flame-intensity, 0.3)*0.5)); opacity: calc(0.5 + var(--flame-intensity, 0.3)*0.5); }
          100% { transform: translateY(-100vh) translateX(calc( (Math.random() - 0.5) * 200px)) scale(0.2); opacity: 0; }
        }
        
        @keyframes sparkMetricReveal {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) translateY(10px); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1) translateY(-5px); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) translateY(-30px); }
        }
        
        .animate-spark-metric-reveal { animation: sparkMetricReveal 2s ease-out forwards; }
        
        @keyframes dataStreamPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); border-color: rgba(251, 191, 36, 0.3); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); border-color: rgba(251, 191, 36, 0.8); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); border-color: rgba(251, 191, 36, 0.2); }
        }
        
        .animate-data-stream-pulse { animation: dataStreamPulse 3s ease-out forwards; }

        @keyframes titleFlameLick {
          0%, 100% { text-shadow: 0 0 8px #f97316, 0 0 16px #ef4444; }
          50% { text-shadow: 0 0 12px #f59e0b, 0 0 24px #f97316, 0 0 32px #ef4444; }
        }
        
        .animate-title-flame-lick { animation: titleFlameLick 2.5s ease-in-out infinite; }

        @keyframes panelRevealAnim {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-panel-reveal { animation: panelRevealAnim 0.7s ease-out forwards; }
        
        @keyframes geminiNarrationFadeIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-gemini-narration-fade-in { animation: geminiNarrationFadeIn 0.6s ease-out forwards; }
        
        @keyframes geminiQuipPopAnim {
          0% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
          70% { opacity: 1; transform: translate(-50%, -5px) scale(1.05); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        
        .animate-gemini-quip-pop { animation: geminiQuipPopAnim 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .reduced-motion .flame-visual, .reduced-motion .ember-rising,
        .reduced-motion .animate-title-flame-lick,
        .reduced-motion .animate-spark-metric-reveal,
        .reduced-motion .animate-data-stream-pulse,
        .reduced-motion .animate-gemini-narration-fade-in,
        .reduced-motion .animate-gemini-quip-pop,
        .reduced-motion .heatmap-cell {
            animation: none !important;
        }
        
        .reduced-motion .inferno-bg-interactive {
            background: #1a0800;
            filter: brightness(1);
        }
        
        .reduced-motion .animate-panel-reveal {
            opacity: 1 !important; 
            transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiInferno
