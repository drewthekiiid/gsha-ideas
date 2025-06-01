"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, UserCheck, Trophy, Target, Users } from "lucide-react"

const SPARK_CATEGORIES = [
  "Bravest AI Leap", "Best Elevator Pitch", "Top Meme Marketer", 
  "Secret Google Search Genius", "Collaboration King/Queen", "Most Creative Campaign Builder"
]

const MICRO_CONTRIBUTIONS = [
  "Networking Connection Made", "Idea Booth Insight Shared", "Mini-Challenge Aced", 
  "Social Post Amplified", "Bold Move Detected", "Creative Spark Ignited"
]

const GEMINI_WITTY_CALLOUTS = [
  "🎉 New leader in 'Bravest AI Leap!' - Someone just pitched an AI bot that writes thank-you notes to coffee beans!",
  "🔥 Record broken for 'Fastest Campaign Insight Shared' - 23 seconds from brain to brilliance!",
  "⚡ Secret MVP of Networking spotted: Three genuine connections in five minutes. That's superhuman!",
  "🏆 'Most Likely to Ignite the Next Big Thing' category is HEATING UP!",
  "🎪 Plot twist: Someone just earned 'Most Creative Google Search' for asking 'How to make AI laugh?'",
  "🌟 New 'Collaboration Royalty' crowned for turning strangers into a marketing dream team!",
  "💡 Breaking: The 'Top Meme Marketer' throne has been claimed! The internet will never be the same.",
  "🎭 Real-time update: Someone just achieved 'Best Unscripted Moment' by accidentally inventing a campaign format!"
]

const GOOGLE_BADGES = [
  { name: "Google Spark Igniter", icon: "🔥" },
  { name: "AI Innovation Pioneer", icon: "🤖" },
  { name: "Marketing Maverick", icon: "🚀" },
  { name: "Creative Catalyst", icon: "⚡" },
  { name: "Collaboration Champion", icon: "🤝" },
  { name: "GSHA Game Changer", icon: "🏆" }
]

const IdeaSectionGeminiSparkIndex: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [userScore, setUserScore] = useState(7500)
  const [showGeminiInsight, setShowGeminiInsight] = useState(false)
  const [currentInsight, setCurrentInsight] = useState("")
  const [sparkCard, setSparkCard] = useState("GSHA-2025-SPARK-7742")
  const [currentContribution, setCurrentContribution] = useState("")
  const [earnedBadges, setEarnedBadges] = useState<string[]>(["Google Spark Igniter"])
  const [leaderboard, setLeaderboard] = useState([
    { name: "Sarah M.", category: "Bravest AI Leap", score: 9870, change: "+250", badge: "🚀" },
    { name: "Mike T.", category: "Best Elevator Pitch", score: 9540, change: "+180", badge: "🎯" },
    { name: "Lisa K.", category: "Top Meme Marketer", score: 9210, change: "+310", badge: "😂" },
    { name: "James R.", category: "Secret Google Search Genius", score: 8990, change: "-50", badge: "🔍" },
    { name: "Anna C.", category: "Collaboration King/Queen", score: 8750, change: "+120", badge: "👑" },
  ])
  const [sparkActivations, setSparkActivations] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-spark-index"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    sparkPulse: useRef<HTMLAudioElement | null>(null),
    leaderboardUpdate: useRef<HTMLAudioElement | null>(null),
    badgeEarned: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/data-ambient.mp3")
      audioRefs.transition.current.volume = 0.3
      audioRefs.sparkPulse.current = new Audio("/sounds/spark-activation.mp3")
      audioRefs.sparkPulse.current.volume = 0.5
      audioRefs.leaderboardUpdate.current = new Audio("/sounds/leaderboard-update.mp3")
      audioRefs.leaderboardUpdate.current.volume = 0.4
      audioRefs.badgeEarned.current = new Audio("/sounds/badge-earned.mp3")
      audioRefs.badgeEarned.current.volume = 0.6
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
      setSparkActivations(0)
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  // Simulate real-time Gemini insights
  useEffect(() => {
    if (!isCurrentlyActive) return
    
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomInsight = GEMINI_WITTY_CALLOUTS[Math.floor(Math.random() * GEMINI_WITTY_CALLOUTS.length)]
        setCurrentInsight(randomInsight)
        setShowGeminiInsight(true)
        
        if (!isMuted && audioRefs.leaderboardUpdate.current) {
          audioRefs.leaderboardUpdate.current.currentTime = 0
          audioRefs.leaderboardUpdate.current.play().catch(console.warn)
        }
        
        setTimeout(() => setShowGeminiInsight(false), 4000)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isCurrentlyActive, isMuted])

  // Simulate micro-contributions
  useEffect(() => {
    if (!isCurrentlyActive) return
    
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const randomContribution = MICRO_CONTRIBUTIONS[Math.floor(Math.random() * MICRO_CONTRIBUTIONS.length)]
        setCurrentContribution(randomContribution)
        setUserScore(prev => prev + Math.floor(Math.random() * 100) + 25)
        setSparkActivations(prev => prev + 1)
        
        if (!isMuted && audioRefs.sparkPulse.current) {
          audioRefs.sparkPulse.current.currentTime = 0
          audioRefs.sparkPulse.current.play().catch(console.warn)
        }
        
        // Chance to earn a new badge
        if (Math.random() < 0.15 && earnedBadges.length < GOOGLE_BADGES.length) {
          const availableBadges = GOOGLE_BADGES.filter(badge => !earnedBadges.includes(badge.name))
          if (availableBadges.length > 0) {
            const newBadge = availableBadges[Math.floor(Math.random() * availableBadges.length)]
            setEarnedBadges(prev => [...prev, newBadge.name])
            
            if (!isMuted && audioRefs.badgeEarned.current) {
              audioRefs.badgeEarned.current.currentTime = 0
              audioRefs.badgeEarned.current.play().catch(console.warn)
            }
          }
        }
        
        setTimeout(() => setCurrentContribution(""), 3000)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isCurrentlyActive, isMuted, earnedBadges])

  const handleSparkAction = (category: string) => {
    if (prefersReducedMotion || !isCurrentlyActive) return

    setUserScore(prev => prev + Math.floor(Math.random() * 150) + 50)
    setSparkActivations(prev => prev + 1)
    
    const contribution = MICRO_CONTRIBUTIONS[Math.floor(Math.random() * MICRO_CONTRIBUTIONS.length)]
    setCurrentContribution(contribution)

    if (!isMuted && audioRefs.sparkPulse.current) {
      audioRefs.sparkPulse.current.currentTime = 0
      audioRefs.sparkPulse.current.play().catch(console.warn)
    }

    // Update leaderboard with some randomness
    setLeaderboard(prev => 
      prev.map(entry => ({
        ...entry,
        score: entry.score + Math.floor(Math.random() * 100) - 25,
        change: Math.random() > 0.5 ? `+${Math.floor(Math.random() * 200) + 50}` : `-${Math.floor(Math.random() * 100) + 10}`
      })).sort((a, b) => b.score - a.score)
    )

    setTimeout(() => setCurrentContribution(""), 3000)
  }

  const storyPanels = [
    {
      title: "Spark Card Connection",
      content: "Receive your AI-powered Spark Card at entry, instantly connecting you to the live ecosystem. Every action, insight, and bold move starts building your real-time Spark Score across witty categories.",
    },
    {
      title: "Live AI Recognition",
      content:
        "Gemini tracks your micro-contributions - networking wins, idea booth insights, mini-challenges, and social amplification. Compete in tongue-in-cheek categories from 'Best Elevator Pitch' to 'Secret Google Search Genius'.",
    },
    {
      title: "Google-Official Badges",
      content: "Earn your personalized Gemini Spark Report with stats, highlight reels, and social-ready Google-official badges. These digital accolades become your post-event social currency and marketing credibility.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Spark Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-purple-900/30 via-neutral-900 to-pink-900/30">
        {!prefersReducedMotion && (
          <>
            {/* Spark particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`spark-${i}`}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
            
            {/* Data streams */}
            {sparkActivations > 0 && Array.from({ length: Math.min(sparkActivations, 8) }).map((_, i) => (
              <div
                key={`stream-${i}`}
                className="absolute w-px h-16 bg-gradient-to-b from-purple-400 to-transparent animate-pulse"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto">
        <h2
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
            !prefersReducedMotion && isCurrentlyActive && sparkActivations > 5 && "animate-pulse",
          )}
        >
          Spark Index
        </h2>
        <p className="text-xl md:text-2xl text-purple-200 mb-8 md:mb-10 text-center">
          Real-time, AI-driven leaderboard celebrating your creative brilliance.
        </p>

        {/* Spark Card Display */}
        <div className="mb-8 w-full max-w-md">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-300">Your Spark Card</span>
              <span className="text-sm font-bold text-pink-400">{sparkCard}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-300">Current Score</span>
              <span className="text-lg font-bold text-yellow-400">{userScore.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-300">Spark Activations</span>
              <span className="text-sm font-bold text-pink-400">{sparkActivations}</span>
            </div>
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-6 w-full max-w-md">
            <h3 className="text-sm text-purple-300 mb-2">Earned Badges</h3>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((badgeName) => {
                const badge = GOOGLE_BADGES.find(b => b.name === badgeName)
                return badge ? (
                  <div key={badgeName} className="flex items-center gap-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 rounded-full px-3 py-1">
                    <span className="text-xs">{badge.icon}</span>
                    <span className="text-xs text-purple-200">{badge.name}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}

        {/* Spark Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
          {SPARK_CATEGORIES.map((category, index) => (
            <Button
              key={category}
              onClick={() => handleSparkAction(category)}
              className={cn(
                "h-20 flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 transition-all",
                "bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-500/30 hover:border-purple-400 hover:scale-105",
                !prefersReducedMotion && isCurrentlyActive && "hover:animate-pulse"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-purple-400 mb-1">
                {index === 0 && "🚀"}
                {index === 1 && "🎯"}
                {index === 2 && "😂"}
                {index === 3 && "🔍"}
                {index === 4 && "👑"}
                {index === 5 && "⚡"}
              </div>
              <div className="text-xs font-bold text-white">{category}</div>
            </Button>
          ))}
        </div>

        {/* Current Live Leaderboard */}
        <Card className="mb-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 backdrop-blur-sm w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-purple-300">
              <Trophy className="h-5 w-5" />
              Live Leaderboard
              <Trophy className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between bg-purple-800/20 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{entry.badge}</span>
                    <div>
                      <p className="text-white font-bold">{entry.name}</p>
                      <p className="text-purple-300 text-xs">{entry.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">{entry.score.toLocaleString()}</p>
                    <p className={cn(
                      "text-xs font-semibold",
                      entry.change.startsWith("+") ? "text-green-400" : "text-red-400"
                    )}>
                      {entry.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Contribution Alert */}
        {currentContribution && (
          <Card className="mb-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-green-300 font-bold">MICRO-CONTRIBUTION DETECTED</span>
                <Zap className="h-6 w-6 text-green-400 ml-2" />
              </div>
              <p className="text-white text-lg font-semibold">{currentContribution}</p>
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
                !prefersReducedMotion && isCurrentlyActive ? "animate-panel-appear" : "opacity-100",
              )}
              style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.15 + 0.5}s` }}
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
          <p className="text-purple-400 font-semibold">@SparkIndexLeader on X:</p>
          <p className="text-neutral-300 italic">
            "Gemini just called out my networking prowess in real-time! Earned my 'Collaboration Champion' badge and now everyone knows I'm the secret connection catalyst! 🏆⚡ #GSHA2025 #SparkIndex"
          </p>
        </Card>

        {/* Gemini Insight Easter Egg */}
        {showGeminiInsight && (
          <div
            className={cn(
              "absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-purple-900/90 to-pink-900/90 p-4 rounded-lg shadow-2xl text-purple-200 font-bold text-lg border border-purple-500/50",
              !prefersReducedMotion && "animate-insight-pop",
              "z-20 flex items-center gap-2 text-center",
            )}
          >
            <UserCheck className="h-6 w-6 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-purple-400">Gemini Insight:</p>
              {currentInsight}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes panelAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-panel-appear { animation: panelAppear 0.5s ease-out forwards; }

        @keyframes insightPop {
          0% { opacity: 0; transform: translate(-50%, 20px) scale(0.9); }
          70% { opacity: 1; transform: translate(-50%, -5px) scale(1.05); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-insight-pop { animation: insightPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        .reduced-motion .animate-panel-appear,
        .reduced-motion .animate-insight-pop {
            animation: none !important;
            opacity: 1 !important; 
            transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiSparkIndex
