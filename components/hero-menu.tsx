"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useAppContext } from "@/context/app-context"
import { Flame, Zap, Star, Puzzle, Award } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  themeColor: string
}
interface HeroMenuProps {
  items: MenuItem[]
  onSelectItem: (sectionId: string) => void
  isFixed: boolean // True if this instance should be the fixed/pinned version
  className?: string
  initiallyVisible?: boolean // For the in-flow HeroSection instance's first appearance
  onlyShowWhenPinned?: boolean // True if this instance should ONLY be visible when pinned
}

const OrbIcon = ({ itemName, isActive, themeColor }: { itemName: string; isActive: boolean; themeColor: string }) => {
  const iconClass = cn(
    "h-3 w-3 md:h-4 md:w-4 transition-all duration-200", // Changed size
    isActive ? "text-white" : `text-${themeColor}-200 group-hover:text-white`,
  )
  if (itemName.includes("Inferno")) return <Flame className={iconClass} />
  if (itemName.includes("Labyrinth")) return <Puzzle className={iconClass} />
  if (itemName.includes("Spark Index")) return <Award className={iconClass} />
  if (itemName.includes("FireStarter")) return <Zap className={iconClass} />
  if (itemName.includes("Constellation")) return <Star className={iconClass} />
  return null
}

const HeroMenu = ({
  items,
  onSelectItem,
  isFixed,
  className,
  initiallyVisible = false, // Default for in-flow, HeroSection will control via className
  onlyShowWhenPinned = false,
}: HeroMenuProps) => {
  const { prefersReducedMotion, isMuted, activeSection } = useAppContext()
  const menuOrbAudioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    if (typeof Audio !== "undefined") {
      menuOrbAudioRef.current = new Audio("/sounds/menu-orb-ripple.mp3")
      menuOrbAudioRef.current.volume = 0.2
      menuOrbAudioRef.current.addEventListener('error', () => {
        // Silently handle missing audio file
        menuOrbAudioRef.current = null
      })
    }
  }, [])

  const playHoverSound = () => {
    if (menuOrbAudioRef.current && !isMuted && !prefersReducedMotion) {
      menuOrbAudioRef.current.currentTime = 0
      menuOrbAudioRef.current.play().catch(() => {
        // Silently handle audio play errors
      })
    }
  }

  const menuBaseClasses = "w-full transition-all duration-500 ease-in-out py-4 md:py-6 z-40" // Reduced vertical padding

  // Logic for pinned instance
  if (onlyShowWhenPinned) {
    if (!isFixed) return null // Don't render if not pinned
    return (
      <nav
        className={cn(
          menuBaseClasses,
          "fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-md shadow-lg",
          prefersReducedMotion ? "opacity-100" : "animate-pinnedMenuFadeIn",
          className,
        )}
      >
        {/* Menu items UL - same as below */}
        <ul className="flex justify-center items-center space-x-2 sm:space-x-3 md:space-x-4 px-10 overflow-x-auto py-5 scrollbar-hide">
          {items.map((item) => {
            const itemThemeColor = item.themeColor || "gray"
            const isActive = activeSection === item.id
            return (
              <li key={item.id} className="group">
                <button
                  onClick={() => onSelectItem(item.id)}
                  onMouseEnter={playHoverSound}
                  className={cn(
                    "flex flex-col items-center justify-center px-3 py-3 md:px-4 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 whitespace-nowrap relative overflow-hidden",
                    "transform hover:-translate-y-0.5",
                    isActive
                      ? `bg-${itemThemeColor}-500 text-white shadow-md shadow-${itemThemeColor}-500/30 scale-105 ring-${itemThemeColor}-400 orb-active-glow`
                      : `text-neutral-300 hover:bg-${itemThemeColor}-600/40 hover:text-white ring-transparent hover:ring-${itemThemeColor}-500/30 orb-hover-effect`,
                    !prefersReducedMotion && "orb-animation-parent",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  style={
                    {
                      "--orb-glow-color": `var(--tw-color-${itemThemeColor}-400, #ccc)`,
                      "--orb-bg-color": `var(--tw-color-${itemThemeColor}-500, #888)`,
                    } as React.CSSProperties
                  }
                >
                  {!prefersReducedMotion && (
                    <span
                      className="orb-visual-effect"
                      style={
                        {
                          "--ripple-color": `rgba(var(--tw-color-${itemThemeColor}-300-rgb, 200, 200, 200), 0.3)`,
                        } as React.CSSProperties
                      }
                    ></span>
                  )}
                  <OrbIcon itemName={item.name} isActive={isActive} themeColor={itemThemeColor} />
                  <span className="mt-1.5 leading-tight text-center">{item.name.replace("Gemini ", "")}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <style jsx>{`
          @keyframes pinnedMenuFadeInAnim {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-pinnedMenuFadeIn { animation: pinnedMenuFadeInAnim 0.5s ease-out forwards; }
          /* Refined orb styles with subtle glow effects */
          .orb-visual-effect { 
            position: absolute; 
            top: 50%; 
            left: 50%; 
            width: 100%; 
            height: 100%; 
            border-radius: 50%; 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 0; 
            pointer-events: none; 
          }
          .group:hover .orb-visual-effect { 
            background-color: var(--ripple-color); 
            animation: rippleEffect 0.6s ease-out; 
          }
          @keyframes rippleEffect { 
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; } 
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } 
          }
          .orb-hover-effect:hover { 
            box-shadow: 0 0 4px 0px var(--orb-glow-color); 
          }
          .orb-active-glow { 
            box-shadow: 0 0 8px 1px var(--orb-glow-color), 0 0 12px 2px var(--orb-bg-color); 
            animation: pulseGlowActive 3s infinite ease-in-out; 
          }
          @keyframes pulseGlowActive { 
            0%, 100% { 
              box-shadow: 0 0 8px 1px var(--orb-glow-color), 0 0 12px 2px var(--orb-bg-color); 
              transform: scale(1.05); 
            } 
            50% { 
              box-shadow: 0 0 10px 2px var(--orb-glow-color), 0 0 15px 3px var(--orb-bg-color); 
              transform: scale(1.06); 
            } 
          }
        `}</style>
      </nav>
    )
  }

  // This is for the in-flow instance within HeroSection
  // Its visibility is controlled by HeroSection via the `className` (opacity)
  return (
    <nav className={cn(menuBaseClasses, "absolute bottom-0 left-0 right-0", className)}>
      {/* Menu items UL - same as above */}
      <ul className="flex justify-center items-center space-x-2 sm:space-x-3 md:space-x-4 px-10 overflow-x-auto py-5 scrollbar-hide">
        {items.map((item) => {
          const itemThemeColor = item.themeColor || "gray"
          const isActive = activeSection === item.id
          return (
            <li key={item.id} className="group">
              <button
                onClick={() => onSelectItem(item.id)}
                onMouseEnter={playHoverSound}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-3 md:px-4 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 whitespace-nowrap relative overflow-hidden",
                  "transform hover:-translate-y-0.5",
                  isActive
                    ? `bg-${itemThemeColor}-500 text-white shadow-md shadow-${itemThemeColor}-500/30 scale-105 ring-${itemThemeColor}-400 orb-active-glow`
                    : `text-neutral-300 hover:bg-${itemThemeColor}-600/40 hover:text-white ring-transparent hover:ring-${itemThemeColor}-500/30 orb-hover-effect`,
                  !prefersReducedMotion && "orb-animation-parent",
                )}
                aria-current={isActive ? "page" : undefined}
                style={
                  {
                    "--orb-glow-color": `var(--tw-color-${itemThemeColor}-400, #ccc)`,
                    "--orb-bg-color": `var(--tw-color-${itemThemeColor}-500, #888)`,
                  } as React.CSSProperties
                }
              >
                {!prefersReducedMotion && (
                  <span
                    className="orb-visual-effect"
                    style={
                      {
                        "--ripple-color": `rgba(var(--tw-color-${itemThemeColor}-300-rgb, 200, 200, 200), 0.3)`,
                      } as React.CSSProperties
                    }
                  ></span>
                )}
                <OrbIcon itemName={item.name} isActive={isActive} themeColor={itemThemeColor} />
                <span className="mt-1.5 leading-tight text-center">{item.name.replace("Gemini ", "")}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {/* Refined orb styles with subtle glow effects */}
      <style jsx>{`
          .orb-visual-effect { 
            position: absolute; 
            top: 50%; 
            left: 50%; 
            width: 100%; 
            height: 100%; 
            border-radius: 50%; 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 0; 
            pointer-events: none; 
          }
          .group:hover .orb-visual-effect { 
            background-color: var(--ripple-color); 
            animation: rippleEffect 0.6s ease-out; 
          }
          @keyframes rippleEffect { 
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; } 
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } 
          }
          .orb-hover-effect:hover { 
            box-shadow: 0 0 4px 0px var(--orb-glow-color); 
          }
          .orb-active-glow { 
            box-shadow: 0 0 8px 1px var(--orb-glow-color), 0 0 12px 2px var(--orb-bg-color); 
            animation: pulseGlowActive 3s infinite ease-in-out; 
          }
          @keyframes pulseGlowActive { 
            0%, 100% { 
              box-shadow: 0 0 8px 1px var(--orb-glow-color), 0 0 12px 2px var(--orb-bg-color); 
              transform: scale(1.05); 
            } 
            50% { 
              box-shadow: 0 0 10px 2px var(--orb-glow-color), 0 0 15px 3px var(--orb-bg-color); 
              transform: scale(1.06); 
            } 
          }
      `}</style>
    </nav>
  )
}

export default HeroMenu
