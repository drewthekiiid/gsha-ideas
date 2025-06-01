"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useAppContext } from "@/context/app-context"

interface LogoDisplayProps {
  yourLogo: React.ReactNode
  mosaicLogo: React.ReactNode
  isPinned: boolean // True if this instance should be the pinned version
  className?: string
  initialFadeIn?: boolean // For the very first appearance of logos (in-flow HeroSection instance)
  onlyShowWhenPinned?: boolean // True if this instance should ONLY be visible when pinned
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({
  yourLogo,
  mosaicLogo,
  isPinned,
  className,
  initialFadeIn = false, // Default to false, HeroSection will control its in-flow instance's appearance
  onlyShowWhenPinned = false,
}) => {
  const { prefersReducedMotion } = useAppContext()

  // Base classes for individual logo containers
  const logoContainerBase = "transition-all duration-700 ease-in-out"
  const logoSizeClass = "h-8 md:h-10 w-auto" // Default size for in-flow

  // Pinned styles
  const pinnedYourLogoClasses = "fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 transform scale-75 md:scale-90"
  const pinnedMosaicLogoClasses = "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 transform scale-75 md:scale-90"

  // Visibility logic
  // If this instance is meant to be `onlyShowWhenPinned`
  if (onlyShowWhenPinned) {
    if (!isPinned) return null // Don't render if not pinned
    // Render pinned logos
    return (
      <>
        <div
          className={cn(
            logoContainerBase,
            pinnedYourLogoClasses,
            prefersReducedMotion ? "opacity-100" : "animate-pinnedLogoFadeIn",
          )}
        >
          {React.cloneElement(yourLogo as React.ReactElement, { className: logoSizeClass })}
        </div>
        <div
          className={cn(
            logoContainerBase,
            pinnedMosaicLogoClasses,
            prefersReducedMotion ? "opacity-100" : "animate-pinnedLogoFadeIn",
          )}
        >
          {React.cloneElement(mosaicLogo as React.ReactElement, { className: logoSizeClass })}
        </div>
        <style jsx>{`
          @keyframes pinnedLogoFadeInAnim {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); } /* Adjust scale if needed */
          }
          .animate-pinnedLogoFadeIn { animation: pinnedLogoFadeInAnim 0.5s ease-out forwards; }
        `}</style>
      </>
    )
  }

  // This is for the in-flow instance within HeroSection
  // Its visibility is controlled by HeroSection via the `className` (opacity)
  // `initialFadeIn` prop is not used here as HeroSection manages its reveal.
  return (
    <div className={cn("flex items-center justify-center space-x-6 md:space-x-8", className)}>
      <div className={cn(logoContainerBase)}>
        {React.cloneElement(yourLogo as React.ReactElement, { className: logoSizeClass })}
      </div>
      <div className={cn(logoContainerBase)}>
        {React.cloneElement(mosaicLogo as React.ReactElement, { className: logoSizeClass })}
      </div>
    </div>
  )
}

export default LogoDisplay
