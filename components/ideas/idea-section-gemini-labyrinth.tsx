"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Key, Compass, MessageSquare } from "lucide-react" // Icons for insights/Gemini

const MAZE_GRID = [
  // 0: path, 1: wall, 2: start, 3: end, 4: solved_path, 5: insight_node, 6: solved_insight_node
  [2, 0, 1, 0, 0, 5, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 5, 0],
  [0, 1, 1, 1, 1, 0, 1],
  [5, 0, 0, 0, 0, 0, 3],
]

const INSIGHTS = [
  "Unlock new audience segments by analyzing cross-channel behavior.",
  "Optimize ad spend by identifying underperforming keywords with Gemini.",
  "Personalize campaign messaging based on real-time search trends.",
]

const GEMINI_QUIPS = [
  "A dead end? Or a chance to re-evaluate your path?",
  "Interesting choice... let's see where this leads.",
  "The direct route isn't always the most insightful.",
  "Complexity often hides the greatest rewards.",
]

const IdeaSectionGeminiLabyrinth: React.FC = () => {
  const { isMuted, prefersReducedMotion, activeSection } = useAppContext()
  const [maze, setMaze] = useState(MAZE_GRID.map((row) => [...row]))
  const [solvedPaths, setSolvedPaths] = useState<string[]>([]) // "row-col"
  const [revealedInsights, setRevealedInsights] = useState<string[]>([])
  const [currentGeminiQuip, setCurrentGeminiQuip] = useState("")
  const [showQuip, setShowQuip] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isCurrentlyActive = activeSection === "gemini-labyrinth"

  const audioRefs = {
    transition: useRef<HTMLAudioElement | null>(null),
    solvePath: useRef<HTMLAudioElement | null>(null), // neon-trace
    revealInsight: useRef<HTMLAudioElement | null>(null), // digital-blip
    geminiQuip: useRef<HTMLAudioElement | null>(null),
  }

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRefs.transition.current = new Audio("/sounds/labyrinth-ambient-drone.mp3")
      audioRefs.transition.current.volume = 0.25
      audioRefs.solvePath.current = new Audio("/sounds/neon-trace.mp3")
      audioRefs.solvePath.current.volume = 0.4
      audioRefs.revealInsight.current = new Audio("/sounds/digital-blip.mp3")
      audioRefs.revealInsight.current.volume = 0.5
      audioRefs.geminiQuip.current = new Audio("/sounds/gemini-quip-reveal.mp3") // Re-use for quips
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
    // Reset maze on inactive
    if (!isCurrentlyActive) {
      setMaze(MAZE_GRID.map((row) => [...row]))
      setSolvedPaths([])
      setRevealedInsights([])
    }
  }, [isCurrentlyActive, prefersReducedMotion, isMuted])

  const handleCellClick = (r: number, c: number) => {
    if (prefersReducedMotion || !isCurrentlyActive || maze[r][c] === 1) return // Wall or inactive

    const cellKey = `${r}-${c}`
    if (solvedPaths.includes(cellKey)) return // Already solved

    const newSolvedPaths = [...solvedPaths, cellKey]
    setSolvedPaths(newSolvedPaths)

    if (!isMuted && audioRefs.solvePath.current) {
      audioRefs.solvePath.current.currentTime = 0
      audioRefs.solvePath.current.play().catch(console.warn)
    }

    if (maze[r][c] === 5) {
      // Insight node
      const insightIndex = revealedInsights.length % INSIGHTS.length
      setRevealedInsights((prev) => [...new Set([...prev, INSIGHTS[insightIndex]])])
      if (!isMuted && audioRefs.revealInsight.current) {
        audioRefs.revealInsight.current.currentTime = 0
        audioRefs.revealInsight.current.play().catch(console.warn)
      }
      // Update maze to show solved insight node
      const newMaze = maze.map((row) => [...row])
      newMaze[r][c] = 6 // Mark as solved insight node
      setMaze(newMaze)
    }

    // Trigger Gemini Quip occasionally
    if (Math.random() < 0.3 && !showQuip) {
      setCurrentGeminiQuip(GEMINI_QUIPS[Math.floor(Math.random() * GEMINI_QUIPS.length)])
      setShowQuip(true)
      if (!isMuted && audioRefs.geminiQuip.current) {
        audioRefs.geminiQuip.current.currentTime = 0
        audioRefs.geminiQuip.current.play().catch(console.warn)
      }
      setTimeout(() => setShowQuip(false), 3500)
    }
  }

  const storyPanels = [
    {
      title: "Arrival",
      content: "Receive your digital compass. AR overlays transform the space into a dynamic maze of possibilities.",
    },
    {
      title: "Main Event",
      content: "Navigate problem-solving stations. Each solution unlocks new pathways and insights, guided by Gemini.",
    },
    {
      title: "Aftermath",
      content: "Converge in a central hub where all paths lead to unified strategies and collaborative breakthroughs.",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative text-center p-4 overflow-hidden bg-neutral-900"
    >
      {/* Background Digital Maze Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden labyrinth-bg">
        {!prefersReducedMotion && (
          <>
            <div className="maze-line line-1"></div>
            <div className="maze-line line-2"></div>
            <div className="maze-line line-3"></div>
            <div className="maze-line line-4"></div>
            <div className="maze-line line-5"></div>
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around h-full w-full max-w-6xl mx-auto gap-8">
        {/* Left Side: Info & Story */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2
            className={cn(
              "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600",
              !prefersReducedMotion && isCurrentlyActive && "animate-title-trace-in",
            )}
          >
            Gemini Labyrinth
          </h2>
          <p className="text-xl md:text-2xl text-teal-200 mb-8 md:mb-10">Navigate complexity, discover clarity.</p>

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
                  <CardTitle className="text-xl text-teal-300">{panel.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-neutral-200 text-sm leading-relaxed">{panel.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-black/60 border-teal-500/30 p-3 text-xs shadow-lg w-full max-w-md">
            <p className="text-sky-400 font-semibold">@GSHA_Strategist on X:</p>
            <p className="text-neutral-300 italic">
              "The journey IS the destination. Mind officially navigated. 🧭 #GSHALabyrinth #IgniteYourPath"
            </p>
          </Card>
        </div>

        {/* Right Side: Interactive Maze & Insights */}
        <div className="lg:w-1/2 flex flex-col items-center gap-4">
          <div
            className="grid border border-cyan-700/50 bg-neutral-800/30 p-2 rounded-lg shadow-2xl"
            style={{ gridTemplateColumns: `repeat(${maze[0].length}, minmax(0, 1fr))` }}
          >
            {maze.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const cellKey = `${rIdx}-${cIdx}`
                const isSolved = solvedPaths.includes(cellKey) || cell === 4 || cell === 6
                return (
                  <div
                    key={cellKey}
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border border-cyan-800/50 flex items-center justify-center transition-all duration-300",
                      cell === 1 && "bg-cyan-900/70 maze-wall", // Wall
                      (cell === 0 || cell === 5) && "bg-neutral-700/50 hover:bg-cyan-600/40 cursor-pointer", // Path
                      cell === 2 && "bg-green-500/70 animate-pulse-start", // Start
                      cell === 3 && "bg-purple-500/70", // End
                      cell === 5 && "text-yellow-400", // Insight Node
                      isSolved && cell !== 1 && "bg-cyan-500/70 animate-path-solve",
                      isSolved && cell === 6 && "bg-yellow-500/70 text-black", // Solved Insight Node
                      !prefersReducedMotion && isCurrentlyActive && "animate-cell-appear",
                    )}
                    style={{
                      animationDelay: prefersReducedMotion ? "0s" : `${(rIdx * maze[0].length + cIdx) * 0.03 + 0.5}s`,
                    }}
                  >
                    {cell === 2 && <Compass size={20} />}
                    {cell === 3 && <Key size={20} />}
                    {cell === 5 && !isSolved && <Lightbulb size={20} />}
                    {cell === 6 && <Lightbulb size={20} />}
                  </div>
                )
              }),
            )}
          </div>
          <div className="h-24 mt-2 w-full max-w-sm text-left space-y-1 overflow-y-auto p-2 bg-neutral-800/50 border border-cyan-700/30 rounded-md">
            <h4 className="text-sm font-semibold text-teal-300">Revealed Insights:</h4>
            {revealedInsights.length === 0 && (
              <p className="text-xs text-neutral-400 italic">Solve the maze to uncover insights...</p>
            )}
            {revealedInsights.map((insight, i) => (
              <p key={i} className="text-xs text-cyan-200 animate-insight-reveal">
                <Lightbulb className="inline h-3 w-3 mr-1 text-yellow-400" /> {insight}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Gemini Quip Easter Egg */}
      {showQuip && (
        <div
          className={cn(
            "absolute bottom-[10%] right-[5%] bg-black/80 p-4 rounded-lg shadow-2xl text-teal-300 font-semibold text-md border border-teal-500/50",
            !prefersReducedMotion && "animate-gemini-quip-slide",
            "z-20 flex items-center gap-2",
          )}
        >
          <MessageSquare className="h-5 w-5 text-teal-400" /> {currentGeminiQuip}
        </div>
      )}

      <style jsx>{`
        .labyrinth-bg {
          background: linear-gradient(135deg, #032028 0%, #083845 50%, #021a20 100%);
        }
        .maze-line {
          position: absolute;
          background-color: rgba(0, 255, 255, 0.05); /* Faint cyan */
          box-shadow: 0 0 5px rgba(0, 200, 200, 0.2);
          animation: drawLine 10s linear infinite;
        }
        .line-1 { height: 2px; width: 100%; top: 20%; animation-delay: 0s; }
        .line-2 { width: 2px; height: 100%; left: 30%; animation-delay: -2s; }
        .line-3 { height: 2px; width: 100%; top: 70%; animation-delay: -4s; }
        .line-4 { width: 2px; height: 100%; left: 80%; animation-delay: -6s; }
        .line-5 { height: 2px; width: 100%; top: 50%; transform: rotate(45deg); animation-delay: -8s; }

        @keyframes drawLine {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.01% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        /* For vertical lines, adjust transform-origin and scaleY */
        .line-2, .line-4 { animation-name: drawLineVertical; }
        @keyframes drawLineVertical {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.01% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        
        @keyframes titleTraceIn {
          0% { opacity: 0; text-shadow: 0 0 0px transparent; letter-spacing: 0.2em; }
          70% { opacity: 1; text-shadow: 0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,200,200,0.3); letter-spacing: 0.05em; }
          100% { opacity: 1; text-shadow: 0 0 5px rgba(0,255,255,0.3); letter-spacing: normal; }
        }
        .animate-title-trace-in { animation: titleTraceIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-panel-slide-in { animation: panelSlideIn 0.6s ease-out forwards; }

        @keyframes cellAppearAnim {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-cell-appear { animation: cellAppearAnim 0.4s ease-out forwards; }
        
        @keyframes pathSolveAnim {
          0% { background-color: var(--tw-bg-opacity, 1) bg-neutral-700; } /* Initial path color */
          50% { background-color: rgba(0,255,255,0.9); box-shadow: 0 0 10px cyan; } /* Bright cyan */
          100% { background-color: rgba(0,200,200,0.7); box-shadow: 0 0 5px cyan; } /* Settled cyan */
        }
        .animate-path-solve { animation: pathSolveAnim 0.5s ease-out forwards; }

        @keyframes insightRevealAnim {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-insight-reveal { animation: insightRevealAnim 0.5s ease-out; }

        @keyframes geminiQuipSlideAnim {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-gemini-quip-slide { animation: geminiQuipSlideAnim 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        
        .animate-pulse-start { animation: pulseStart 2s infinite ease-in-out; }
        @keyframes pulseStart {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
        }

        .reduced-motion .maze-line,
        .reduced-motion .animate-title-trace-in,
        .reduced-motion .animate-panel-slide-in,
        .reduced-motion .animate-cell-appear,
        .reduced-motion .animate-path-solve,
        .reduced-motion .animate-insight-reveal,
        .reduced-motion .animate-gemini-quip-slide,
        .reduced-motion .animate-pulse-start {
            animation: none !important;
        }
        .reduced-motion .labyrinth-bg {
            background: #032028; /* Static dark teal */
        }
         .reduced-motion .animate-panel-slide-in,
         .reduced-motion .animate-cell-appear {
            opacity: 1 !important; transform: none !important;
        }
      `}</style>
    </div>
  )
}

export default IdeaSectionGeminiLabyrinth
