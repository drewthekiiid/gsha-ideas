"use client"

import type React from "react"
import { useAppContext } from "@/context/app-context" // Import context

interface ThematicBackgroundProps {
  theme: string
}

const ThematicBackground: React.FC<ThematicBackgroundProps> = ({ theme }) => {
  const { prefersReducedMotion } = useAppContext() // Use context

  const renderBackground = () => {
    if (prefersReducedMotion) {
      // Simplified or static backgrounds for reduced motion
      switch (theme) {
        case "inferno":
          return (
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 via-orange-800/5 to-transparent"></div>
          )
        case "labyrinth":
          return (
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <path
                  d="M100,100 L700,100 L700,500 L100,500 Z M200,200 L600,200 L600,400 L200,400 Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-blue-400/50"
                />
              </svg>
            </div>
          )
        case "spark index":
          return (
            <div className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-blue-800/2 to-transparent"></div>
          )
        case "firestarter":
          return (
            <div className="absolute inset-0 bg-gradient-radial from-yellow-800/5 via-orange-700/2 to-transparent"></div>
          )
        case "constellation":
          return (
            <div className="absolute inset-0 bg-gradient-radial from-indigo-900/5 via-purple-800/2 to-transparent"></div>
          )
        default:
          return null
      }
    }

    // Full animation backgrounds
    switch (theme) {
      case "inferno":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-900/20 via-orange-800/10 to-transparent">
              <div className="flame-particle flame-1"></div>
              <div className="flame-particle flame-2"></div>
              <div className="flame-particle flame-3"></div>
              <div className="flame-particle flame-4"></div>
              <div className="flame-particle flame-5"></div>
            </div>
            <div className="ember ember-1"></div>
            <div className="ember ember-2"></div>
            <div className="ember ember-3"></div>
          </div>
        )
      case "labyrinth":
        return (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              <path
                d="M100,100 L700,100 L700,500 L100,500 Z M200,200 L600,200 L600,400 L200,400 Z M300,300 L500,300 L500,350 L300,350 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-400 maze-path"
              />
            </svg>
          </div>
        )

      case "spark index":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="data-viz-bg">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="data-point"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )

      case "firestarter":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="explosion-bg">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="spark-burst"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + i * 5}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )

      case "constellation":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="star-field">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                  }}
                ></div>
              ))}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={i}
                    x1={`${Math.random() * 100}%`}
                    y1={`${Math.random() * 100}%`}
                    x2={`${Math.random() * 100}%`}
                    y2={`${Math.random() * 100}%`}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-blue-400 constellation-line"
                  />
                ))}
              </svg>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      {renderBackground()}
      <style jsx>{`
        .flame-particle {
          position: absolute;
          bottom: 0;
          width: 4px;
          height: 20px;
          background: linear-gradient(to top, #ff4500, #ffae00, transparent);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flicker 2s ease-in-out infinite alternate;
        }
        
        .flame-1 { left: 10%; animation-delay: 0s; }
        .flame-2 { left: 25%; animation-delay: 0.5s; }
        .flame-3 { left: 50%; animation-delay: 1s; }
        .flame-4 { left: 75%; animation-delay: 1.5s; }
        .flame-5 { left: 90%; animation-delay: 2s; }
        
        @keyframes flicker {
          0% { transform: scaleY(1) scaleX(1); opacity: 1; }
          50% { transform: scaleY(1.2) scaleX(0.8); opacity: 0.8; }
          100% { transform: scaleY(0.8) scaleX(1.2); opacity: 0.6; }
        }
        
        .ember {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ff6b35;
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }
        
        .ember-1 { left: 20%; bottom: 10%; animation-delay: 0s; }
        .ember-2 { left: 60%; bottom: 15%; animation-delay: 1s; }
        .ember-3 { left: 80%; bottom: 8%; animation-delay: 2s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
        }
        
        .maze-path {
          stroke-dasharray: 10 5;
          animation: dash 3s linear infinite;
        }
        
        @keyframes dash {
          to { stroke-dashoffset: -15; }
        }
        
        .data-point {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse-data 2s ease-in-out infinite;
        }
        
        @keyframes pulse-data {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        
        .spark-burst {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #fbbf24, #f59e0b);
          border-radius: 50%;
          animation: burst 3s ease-out infinite;
        }
        
        @keyframes burst {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(2); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #e5e7eb;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        .constellation-line {
          animation: connect 4s ease-in-out infinite;
        }
        
        @keyframes connect {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export default ThematicBackground
