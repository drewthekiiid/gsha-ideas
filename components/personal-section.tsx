"use client"

import React, { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { cn } from "@/lib/utils"

interface PersonalSectionProps {
  yourLogo: React.ReactNode
  mosaicLogo: React.ReactNode
}

const PersonalSection: React.FC<PersonalSectionProps> = ({ yourLogo, mosaicLogo }) => {
  const { showFixedElements, prefersReducedMotion, activeSection } = useAppContext()
  const [isVisuallyActive, setIsVisuallyActive] = useState(false)
  const [startLogoTransition, setStartLogoTransition] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const isCurrentSection = activeSection === "personal-section"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisuallyActive(true)
            // If this section is fully in view, logos should not be animating to corner
            setStartLogoTransition(false)
          } else {
            // If section is scrolling out of view (upwards), and fixed elements are shown (meaning we are past hero)
            // then trigger animation to corners.
            // This condition means the bottom of the personal section is above the midpoint of the viewport.
            if (entry.boundingClientRect.bottom < window.innerHeight / 2 && showFixedElements) {
              if (!prefersReducedMotion) {
                setStartLogoTransition(true)
              }
            }
          }
        })
      },
      { threshold: [0.05, 0.5, 0.95] }, // More granular thresholds
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [showFixedElements, prefersReducedMotion])

  // The large logos in this section should only be visible if:
  // 1. The section is visually active AND
  // 2. The global pinned logos (LogoDisplay) are NOT supposed to be shown OR
  // 3. The transition to corners hasn't started (or motion is reduced)
  const showLargeLogos = isVisuallyActive && (!startLogoTransition || prefersReducedMotion)

  return (
    <section
      ref={sectionRef}
      id="personal-section"
      className="h-screen w-full flex flex-col items-center justify-center border-t border-neutral-800 snap-start relative overflow-hidden"
      style={{ paddingTop: showFixedElements ? "80px" : "0" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 -z-10"></div>

      {/* Render large, centered logos with glow */}
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center transition-opacity duration-700 ease-out",
          showLargeLogos && !prefersReducedMotion ? "opacity-100 scale-100" : "",
          !showLargeLogos && !prefersReducedMotion ? "opacity-0 scale-90" : "",
          prefersReducedMotion ? "opacity-100 scale-100" : "",
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-8 md:space-x-12 mb-12",
            // If startLogoTransition is true, these specific large logos will animate and then hide
            // to allow the global LogoDisplay to take over.
            startLogoTransition && !prefersReducedMotion ? "animate-personal-logos-to-corner" : "",
          )}
        >
          <div
            className={cn(
              "transform transition-all duration-700 ease-in-out",
              isVisuallyActive && !prefersReducedMotion ? "flame-glow-personal" : "",
            )}
            style={{
              // Ensure these specific instances are scaled correctly
              width: "auto",
              height: "6rem", // md:h-24
            }}
          >
            {React.cloneElement(yourLogo as React.ReactElement, {
              className: "h-full w-auto", // Ensure SVG scales within container
            })}
          </div>
          <div
            className={cn(
              "transform transition-all duration-700 ease-in-out",
              isVisuallyActive && !prefersReducedMotion ? "flame-glow-personal" : "",
            )}
            style={{
              width: "auto",
              height: "6rem", // md:h-24
            }}
          >
            {React.cloneElement(mosaicLogo as React.ReactElement, {
              className: "h-full w-auto",
            })}
          </div>
        </div>

        <blockquote className="text-3xl md:text-4xl lg:text-5xl italic font-[georgia] text-center max-w-4xl px-4 text-neutral-100 leading-relaxed">
          "Creativity is intelligence having fun."
        </blockquote>
        <p className="text-lg md:text-xl text-neutral-300 text-center mt-8 max-w-2xl mx-auto px-4">
          Where bold ideas meet brilliant execution. Where your vision ignites our innovation.
        </p>
      </div>

      {/* This is a fallback or an alternative way to ensure logos are pinned if the above animation isn't perfect */}
      {/* The main LogoDisplay in HeroSection handles the global pinning. This section's job is to animate its large logos *out* */}
      {/* and then rely on the global one. The `animate-personal-logos-to-corner` should ideally make these specific instances disappear */}
      {/* as they reach the corner, effectively handing off to the already pinned global ones. */}

      <style jsx>{`
        .flame-glow-personal {
          filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.5)) drop-shadow(0 0 20px rgba(249, 115, 22, 0.3));
          animation: gentle-glow-personal 3s ease-in-out infinite alternate;
        }
        @keyframes gentle-glow-personal {
          0% { filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.5)) drop-shadow(0 0 20px rgba(249, 115, 22, 0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(249, 115, 22, 0.7)) drop-shadow(0 0 30px rgba(249, 115, 22, 0.4)); }
        }

        /* Animation for large logos in PersonalSection to move towards corners and fade */
        /* This is a conceptual animation. Perfect sync with global LogoDisplay is hard. */
        .animate-personal-logos-to-corner > div:first-child {
          animation: move-left-logo 0.7s ease-in-out forwards;
        }
        .animate-personal-logos-to-corner > div:last-child {
          animation: move-right-logo 0.7s ease-in-out forwards;
        }

        @keyframes move-left-logo {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            /* Approximate target position and scale */
            transform: translate(calc(-50vw + 50px), calc(50vh - 50px)) scale(0.8); 
            opacity: 0;
          }
        }
        @keyframes move-right-logo {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(50vw - 50px), calc(50vh - 50px)) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

export default PersonalSection
