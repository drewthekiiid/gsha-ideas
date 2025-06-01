"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  yourLogo: React.ReactNode
  mosaicLogo: React.ReactNode
}

const CTASection: React.FC<CTASectionProps> = ({ yourLogo, mosaicLogo }) => {
  const { showFixedElements, prefersReducedMotion } = useAppContext()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 300)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-black border-t border-neutral-800 snap-start relative overflow-hidden"
      style={{ paddingTop: showFixedElements ? "80px" : "0" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black -z-10"></div>

      <div
        className={cn(
          "transition-opacity duration-1000 ease-out",
          isVisible && !prefersReducedMotion
            ? "opacity-100 translate-y-0"
            : prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
        )}
      >
        {/* Logos are now handled by the global LogoDisplay via showFixedElements, so no need to render them separately here if they are already pinned */}
        {!showFixedElements && ( // Only show if not already pinned globally
          <div className="flex items-center space-x-4 md:space-x-6 mb-8 md:mb-12">
            <div className="transition-all duration-500">
              {React.cloneElement(yourLogo as React.ReactElement, { className: "h-10 md:h-12 w-auto" })}
            </div>
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-orange-500 rounded-full shadow-[0_0_15px_5px_rgba(249,115,22,0.7),0_0_25px_10px_rgba(249,115,22,0.5)] animate-pulse"></div>
              {!prefersReducedMotion && (
                <div className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 bg-orange-400 rounded-full animate-ping opacity-75"></div>
              )}
            </div>
            <div className="transition-all duration-500">
              {React.cloneElement(mosaicLogo as React.ReactElement, { className: "h-10 md:h-12 w-auto" })}
            </div>
          </div>
        )}

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 text-center px-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">
          Ready to Ignite Something?
        </h2>

        <Button
          size="lg"
          className={cn(
            "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-lg text-lg md:text-xl transform transition-all focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl mb-8 relative overflow-hidden",
            !prefersReducedMotion && "spark-button-cta", // Apply spark class only if not reduced motion
          )}
          onClick={() => console.log("Start the Conversation clicked")}
        >
          Start the Conversation
          {!prefersReducedMotion && <span className="sparkle-effect"></span>}
        </Button>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <button className="text-neutral-400 hover:text-orange-400 transition-colors text-sm md:text-base hover:underline">
            Download Concepts
          </button>
          <button className="text-neutral-400 hover:text-orange-400 transition-colors text-sm md:text-base hover:underline">
            Replay Experience
          </button>
          <button className="text-neutral-400 hover:text-orange-400 transition-colors text-sm md:text-base hover:underline">
            Contact Form
          </button>
        </div>
      </div>

      <style jsx>{`
        .spark-button-cta:hover .sparkle-effect {
          display: block;
        }
        .sparkle-effect {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, white 10%, rgba(255,255,255,0.5) 30%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: sparkle-animation 0.6s ease-out forwards;
        }
        @keyframes sparkle-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(2.5); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default CTASection
