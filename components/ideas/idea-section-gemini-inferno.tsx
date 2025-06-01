"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, MessageCircle, Zap } from "lucide-react" // Example icons for metrics

const MICROMETRICS = [
  { text: "120+ Campaigns Ignited!", icon: <Zap className="h-4 w-4 mr-1 text-yellow-400" /> },
  { text: "Realtime Data Artistry", icon: <ThumbsUp className="h-4 w-4 mr-1 text-green-400" /> },
  { text: "99.2% Positive Sentiment", icon: <MessageCircle className="h-4 w-4 mr-1 text-sky-400" /> },
  { text: "Peak Engagement: 3.2x", icon: <Zap className="h-4 w-4 mr-1 text-yellow-400" /> },
  { text: "7 Viral Ideas Born", icon: <ThumbsUp className="h-4 w-4 mr-1 text-green-400" /> },
  { text: "ROI on Fire: 450%", icon: <MessageCircle className="h-4 w-4 mr-1 text-sky-400" /> },
]

const IdeaSectionGeminiInferno: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; metric: (typeof MICROMETRICS)[0] }>>(
    [],
  )
  const [flameIntensity, setFlameIntensity] = useState(0.3) // Start with some base intensity: 0 to 1
  const [showGeminiQuip, setShowGeminiQuip] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-data-inferno"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    throwSpark: useRef<HTMLAudioElement | null>(null),
    quipReveal: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/inferno-crackle-whoosh.mp3") // Section specific transition
      audioRefs.transition.current.volume = 0.3
      audioRefs.throwSpark.current = new Audio("/sounds/inferno-spark-reveal.mp3") // Spark reveal sound
      audioRefs.throwSpark.current.volume = 0.4
      audioRefs.quipReveal.current = new Audio("/sounds/gemini-quip-reveal.mp3") // Easter egg sound
      audioRefs.quipReveal.current.volume = 0.5
    }
  }, [])

  useEffect(() => {
    if (isCurrentlyActive && !prefersReducedMotion && !isMuted && audioRefs.transition.current) {
      audioRefs.transition.current.currentTime = 0
      audioRefs.transition.current.play().catch(console.warn)
    }
    // Reset flame intensity when section becomes inactive
    if (!isCurrentlyActive) setFlameIntensity(0.3)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleFlameInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isCurrentlyActive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100 // percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100 // percentage

    const newSpark = {
      id: Date.now(),
      x,
      y,
      metric: MICROMETRICS[Math.floor(Math.random() * MICROMETRICS.length)],
    }
    setSparks((prev) => [...prev, newSpark].slice(-7)) // Keep last 7 sparks
    setFlameIntensity((prev) => Math.min(1, prev + 0.1)) // Increase intensity

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
      title: "Arrival",
      content: "Step in—the heat is real. The room erupts in live heatmaps and flames as soon as you check in.",
    },
    {
      title: "Main Event",
      content:
        "Every guest’s presence fuels the inferno. Flames rise for bold moves, team energy, and live Gemini narration weaves it all together.",
    },
    {
      title: "Aftermath",
      content: "You leave with a custom “ignition reel”—personalized, visual, and Google-official.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Flames - Interactive Area */}
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-pointer inferno-bg-interactive"
        onClick={handleFlameInteraction}
        style={{ "--flame-intensity": flameIntensity } as React.CSSProperties}
      >
        {!prefersReducedMotion && (
          <>
            <div className="flame-visual flame-base"></div>
            <div className="flame-visual flame-middle"></div>
            <div className="flame-visual flame-top"></div>
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
              spark.metric.icon.props.className.includes("text-yellow-400")
                ? "text-yellow-300"
                : spark.metric.icon.props.className.includes("text-green-400")
                  ? "text-green-300"
                  : "text-sky-300",
            )}
            style={{ left: `${spark.x}%`, top: `${spark.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {spark.metric.icon}
            {spark.metric.text}
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
          Gemini Data Inferno
        </h2>
        <p className="text-xl md:text-2xl text-orange-200 mb-10 md:mb-12">
          Every spark counts—turning your impact into a living spectacle.
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12 w-full">
          {storyPanels.map((panel, index) => (
            <Card
              key={panel.title}
              className={cn(
                "bg-neutral-800/70 border-neutral-700/50 backdrop-blur-sm text-left shadow-xl",
                !prefersReducedMotion && isCurrentlyActive ? "animate-panel-reveal" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.3}s` }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-orange-300">{panel.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-200 leading-relaxed">{panel.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full max-w-md mb-6">
          <Card className="bg-black/60 border-orange-500/30 p-4 text-sm shadow-lg">
            <p className="text-sky-400 font-semibold">@GSHA_Insider on X:</p>
            <p className="text-neutral-300 italic">
              "If this is the pre-party, what’s the show?! 🔥 #GSHA2025 #IgniteYourPerformance #GeminiInferno"
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
            “Don’t get too close unless you’re ready to go viral.” – Gemini
          </div>
        )}
      </div>

      <style jsx>{`
        .inferno-bg-interactive {
          background: radial-gradient(ellipse at bottom, #4d0000 0%, #1a0000 60%, #0d0000 100%);
          transition: filter 0.5s ease-out;
          filter: brightness(calc(0.8 + var(--flame-intensity, 0.3) * 0.7)); /* Base brightness + intensity boost */
        }
        .flame-visual {
          position: absolute;
          bottom: -20%; /* Start slightly below viewport */
          left: 50%;
          width: 150%; /* Wider base */
          height: 100%; /* Tall flames */
          transform-origin: bottom center;
          opacity: calc(0.2 + var(--flame-intensity, 0.3) * 0.8); /* Intensity affects opacity */
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
          background-color: #ffcc00; /* Bright yellow embers */
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

        @keyframes titleFlameLick {
          0%, 100% { text-shadow: 0 0 8px #f97316, 0 0 16px #ef4444; } /* orange-500, red-500 */
          50% { text-shadow: 0 0 12px #f59e0b, 0 0 24px #f97316, 0 0 32px #ef4444; } /* amber-500, orange-500, red-500 */
        }
        .animate-title-flame-lick { animation: titleFlameLick 2.5s ease-in-out infinite; }

        @keyframes panelRevealAnim {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-panel-reveal { animation: panelRevealAnim 0.7s ease-out forwards; }
        
        @keyframes geminiQuipPopAnim {
          0% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
          70% { opacity: 1; transform: translate(-50%, -5px) scale(1.05); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-gemini-quip-pop { animation: geminiQuipPopAnim 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .reduced-motion .flame-visual, .reduced-motion .ember-rising,
        .reduced-motion .animate-title-flame-lick,
        .reduced-motion .animate-spark-metric-reveal,
        .reduced-motion .animate-gemini-quip-pop {
            animation: none !important;
        }
        .reduced-motion .inferno-bg-interactive {
            background: #1a0800; /* Static dark red */
            filter: brightness(1);
        }
        .reduced-motion .animate-panel-reveal {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiInferno
