"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, UserCheck } from "lucide-react" // Icons

const LEADERBOARD_ENTRIES = [
  { name: "Team Phoenix", score: 9870, change: "+250" },
  { name: "The Igniters", score: 9540, change: "+180" },
  { name: "Spark Plugs", score: 9210, change: "+310" },
  { name: "Data Dynamos", score: 8990, change: "-50" },
  { name: "Creative Catalysts", score: 8750, change: "+120" },
]

const GEMINI_INSIGHTS = [
  "High engagement correlates with a 30% increase in Spark Score.",
  "Cross-functional teams consistently achieve higher Spark Indices.",
  "Campaigns utilizing real-time data see a 2.5x Spark amplification.",
]

const IdeaSectionGeminiSparkIndex: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [userScore, setUserScore] = useState(7500)
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_ENTRIES)
  const [showGeminiInsight, setShowGeminiInsight] = useState(false)
  const [currentInsight, setCurrentInsight] = useState("")

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-spark-index"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    scoreIncrease: useRef<HTMLAudioElement | null>(null), // leaderboard-ping
    insightReveal: useRef<HTMLAudioElement | null>(null), // digital-blip
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/spark-index-ambient.mp3") // New sound
      audioRefs.transition.current.volume = 0.2
      audioRefs.scoreIncrease.current = new Audio("/sounds/leaderboard-ping.mp3")
      audioRefs.scoreIncrease.current.volume = 0.4
      audioRefs.insightReveal.current = new Audio("/sounds/digital-blip.mp3")
      audioRefs.insightReveal.current.volume = 0.5
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
    // Reset user score on inactive
    if (!isCurrentlyActive) setUserScore(7500)
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleContributeSpark = () => {
    if (prefersReducedMotion || !isCurrentlyActive) return

    const scoreBoost = Math.floor(Math.random() * 150) + 50
    setUserScore((prev) => prev + scoreBoost)

    if (!isMuted && audioRefs.scoreIncrease.current) {
      audioRefs.scoreIncrease.current.currentTime = 0
      audioRefs.scoreIncrease.current.play().catch(console.warn)
    }

    // Occasionally show a Gemini insight
    if (Math.random() < 0.35 && !showGeminiInsight) {
      setCurrentInsight(GEMINI_INSIGHTS[Math.floor(Math.random() * GEMINI_INSIGHTS.length)])
      setShowGeminiInsight(true)
      if (!isMuted && audioRefs.insightReveal.current) {
        audioRefs.insightReveal.current.currentTime = 0
        audioRefs.insightReveal.current.play().catch(console.warn)
      }
      setTimeout(() => setShowGeminiInsight(false), 4500)
    }
  }

  const storyPanels = [
    {
      title: "Arrival",
      content: "Real-time biometric scanning (simulated) and interactive prompts generate your initial Spark Score.",
    },
    {
      title: "Main Event",
      content:
        "A live, dynamic leaderboard visualizes collective and individual Spark Scores. Your actions fuel the index!",
    },
    {
      title: "Aftermath",
      content: "Receive your personalized Spark Index report, highlighting strengths and areas for creative growth.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Data Viz */}
      <div className="absolute inset-0 z-0 overflow-hidden spark-index-bg">
        {!prefersReducedMotion && (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`node-${i}`}
                className="data-node"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
            <div className="grid-overlay"></div>
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto">
        <h2
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
            !prefersReducedMotion && isCurrentlyActive && "animate-title-pulse-glow",
          )}
        >
          Gemini Spark Index
        </h2>
        <p className="text-xl md:text-2xl text-purple-200 mb-8 md:mb-10">Measure what matters, ignite what's next.</p>

        {/* Main Interactive Area: User Score & Leaderboard */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 w-full items-start">
          {/* User Score Card */}
          <Card
            className={cn(
              "bg-neutral-800/70 border-purple-500/30 backdrop-blur-sm shadow-xl p-6 flex flex-col items-center",
              !prefersReducedMotion && isCurrentlyActive && "animate-user-score-card-appear",
            )}
          >
            <CardTitle className="text-2xl text-purple-300 mb-2">Your Spark Score</CardTitle>
            <div className="text-6xl font-bold text-white my-4 tabular-nums animate-score-value-change">
              {userScore.toLocaleString()}
            </div>
            <Button
              onClick={handleContributeSpark}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400/50 shadow-md"
            >
              <Zap className="h-5 w-5 mr-2" /> Contribute a Spark
            </Button>
            <p className="text-xs text-neutral-400 mt-3">Click to boost your score & impact the index!</p>
          </Card>

          {/* Leaderboard Card */}
          <Card
            className={cn(
              "bg-neutral-800/70 border-purple-500/30 backdrop-blur-sm shadow-xl p-6",
              !prefersReducedMotion && isCurrentlyActive && "animate-leaderboard-appear",
            )}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.2s" }}
          >
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-2xl text-purple-300 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-pink-400" /> Live Spark Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.name}
                  className={cn(
                    "flex justify-between items-center p-2 rounded-md",
                    index === 0 ? "bg-purple-600/30 text-white" : "bg-neutral-700/50",
                    !prefersReducedMotion && "animate-leaderboard-entry-slide",
                  )}
                  style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.1 + 0.4}s` }}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-2 text-sm">#{index + 1}</span>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-sm mr-2 tabular-nums">{entry.score.toLocaleString()}</span>
                    <span
                      className={cn(
                        "text-xs tabular-nums",
                        entry.change.startsWith("+") ? "text-green-400" : "text-red-400",
                      )}
                    >
                      {entry.change}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Story Panels */}
        <div className="grid md:grid-cols-3 gap-6 w-full mb-8">
          {storyPanels.map((panel, index) => (
            <Card
              key={panel.title}
              className={cn(
                "bg-neutral-800/60 border-neutral-700/50 backdrop-blur-sm text-left shadow-lg",
                !prefersReducedMotion && isCurrentlyActive ? "animate-story-panel-fade" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.2 + 0.6}s` }}
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

        {/* Social Proof */}
        <Card className="bg-black/60 border-purple-500/30 p-3 text-xs shadow-lg w-full max-w-md">
          <p className="text-pink-400 font-semibold">@DataDrivenDiva on LinkedIn:</p>
          <p className="text-neutral-300 italic">
            "My Spark Index just hit 9.7! 📈 This GSHA event is quantifying creativity like never before. #SparkIndex
            #GSHA2025"
          </p>
        </Card>

        {/* Gemini Insight Easter Egg */}
        {showGeminiInsight && (
          <div
            className={cn(
              "absolute top-[10%] right-[5%] bg-black/80 p-4 rounded-lg shadow-2xl text-purple-300 font-semibold text-md border border-purple-500/50",
              !prefersReducedMotion && "animate-gemini-insight-pop",
              "z-20 flex items-center gap-2 max-w-xs text-left",
            )}
          >
            <UserCheck className="h-6 w-6 text-pink-400 flex-shrink-0" /> {currentInsight}
          </div>
        )}
      </div>

      <style jsx>{`
        .spark-index-bg {
          background: linear-gradient(to bottom right, #1a001a, #2a0030, #0d000d); /* Dark purple hues */
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(128,0,128,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128,0,128,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.5;
        }
        .data-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: rgba(216, 180, 254, 0.3); /* purple-300 with opacity */
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(216, 180, 254, 0.5);
          animation: pulseNode infinite;
        }
        @keyframes pulseNode {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes titlePulseGlow {
          0%, 100% { text-shadow: 0 0 10px #a855f7, 0 0 20px #ec4899; } /* purple-500, pink-500 */
          50% { text-shadow: 0 0 20px #a855f7, 0 0 40px #ec4899, 0 0 50px #ef4444; } /* with red-500 */
        }
        .animate-title-pulse-glow { animation: titlePulseGlow 2.5s ease-in-out infinite; }

        @keyframes scoreCardAppear {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-user-score-card-appear { animation: scoreCardAppear 0.6s ease-out forwards; }
        
        @keyframes scoreValueChangeAnim { /* Simple pulse for score change */
          0% { transform: scale(1); color: white; }
          20% { transform: scale(1.15); color: #fecaca; } /* red-200 for emphasis */
          100% { transform: scale(1); color: white; }
        }
        .animate-score-value-change { animation: scoreValueChangeAnim 0.5s ease-out; }
        
        @keyframes leaderboardAppear {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-leaderboard-appear { animation: leaderboardAppear 0.6s ease-out forwards; }

        @keyframes leaderboardEntrySlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-leaderboard-entry-slide { animation: leaderboardEntrySlide 0.4s ease-out forwards; }
        
        @keyframes storyPanelFadeAnim {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-story-panel-fade { animation: storyPanelFadeAnim 0.7s ease-out forwards; }

        @keyframes geminiInsightPopAnim {
          0% { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          70% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-gemini-insight-pop { animation: geminiInsightPopAnim 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .reduced-motion .data-node,
        .reduced-motion .animate-title-pulse-glow,
        .reduced-motion .animate-user-score-card-appear,
        .reduced-motion .animate-score-value-change,
        .reduced-motion .animate-leaderboard-appear,
        .reduced-motion .animate-leaderboard-entry-slide,
        .reduced-motion .animate-story-panel-fade,
        .reduced-motion .animate-gemini-insight-pop {
            animation: none !important;
        }
        .reduced-motion .spark-index-bg {
            background: #1a001a; /* Static dark purple */
        }
        .reduced-motion .animate-user-score-card-appear,
        .reduced-motion .animate-leaderboard-appear,
        .reduced-motion .animate-leaderboard-entry-slide,
        .reduced-motion .animate-story-panel-fade {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiSparkIndex
