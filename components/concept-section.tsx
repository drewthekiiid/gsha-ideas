"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ConceptModal from "@/components/concept-modal"
import ThematicBackground from "@/components/thematic-background"
import ScrollTriggeredPanel from "@/components/scroll-triggered-panel"
import SocialCards from "@/components/social-cards"
import { useAppContext } from "@/context/app-context"

interface ConceptSectionProps {
  sectionName: string
  sectionId: string
  index: number
}

// ... (Keep CONCEPT_DATA as is)
const CONCEPT_DATA = {
  Inferno: {
    tagline: "Burn bright, rise higher",
    description: "An immersive experience where ideas combust into innovation",
    phases: [
      {
        title: "Arrival",
        content: "Guests enter through a tunnel of flickering digital flames, setting the tone for transformation.",
        icon: "🔥",
      },
      {
        title: "Main Event",
        content: "Interactive stations where participants 'ignite' their ideas through collaborative challenges.",
        icon: "💡",
      },
      {
        title: "Aftermath",
        content: "A cooling lounge where connections solidify and next steps crystallize.",
        icon: "✨",
      },
    ],
    quote: '"This wasn\'t just an event, it was a catalyst for everything that came after."',
    socialCards: [
      { platform: "LinkedIn", content: "Mind = blown 🔥 #GSHA2025", author: "@innovator" },
      { platform: "Twitter", content: "Still processing what just happened at #GSHAIgnite", author: "@techleader" },
      { platform: "Instagram", content: "When ideas literally catch fire ✨", author: "@creative_mind" },
    ],
  },
  Labyrinth: {
    tagline: "Navigate complexity, discover clarity",
    description: "A maze of interconnected challenges leading to breakthrough moments",
    phases: [
      {
        title: "Arrival",
        content: "Participants receive a digital compass and enter a physical maze with AR overlays.",
        icon: "🧭",
      },
      {
        title: "Main Event",
        content: "Teams navigate through problem-solving stations, each unlock revealing new pathways.",
        icon: "🗝️",
      },
      {
        title: "Aftermath",
        content: "The center reveals a collaborative space where all paths converge into unified solutions.",
        icon: "🎯",
      },
    ],
    quote: '"Getting lost was exactly what we needed to find our way."',
    socialCards: [
      { platform: "LinkedIn", content: "The journey IS the destination #GSHALabyrinth", author: "@strategist" },
      { platform: "Twitter", content: "Plot twist: the maze was inside us all along 🌀", author: "@philosopher" },
      { platform: "Instagram", content: "When problem-solving becomes an art form", author: "@designer" },
    ],
  },
  "Spark Index": {
    tagline: "Measure what matters, ignite what's next",
    description: "A data-driven experience that quantifies and amplifies creative potential",
    phases: [
      {
        title: "Arrival",
        content: "Real-time biometric scanning creates personalized creativity profiles for each participant.",
        icon: "📊",
      },
      {
        title: "Main Event",
        content: "Interactive data visualizations respond to group energy, creating a living creativity dashboard.",
        icon: "⚡",
      },
      {
        title: "Aftermath",
        content: "Participants receive their 'Spark Score' and personalized roadmap for creative growth.",
        icon: "🚀",
      },
    ],
    quote: '"I never knew my creativity had a number, but now I know how to make it bigger."',
    socialCards: [
      { platform: "LinkedIn", content: "My Spark Index just hit 9.7! 📈 #DataDrivenCreativity", author: "@analyst" },
      { platform: "Twitter", content: "When science meets art meets magic ✨", author: "@researcher" },
      { platform: "Instagram", content: "Creativity: now with metrics 📊", author: "@data_viz" },
    ],
  },
  FireStarter: {
    tagline: "Light the fuse, watch it spread",
    description: "An explosive workshop format that turns sparks into sustainable flames",
    phases: [
      {
        title: "Arrival",
        content: "Participants create their 'tinder' - the raw materials of their biggest challenges.",
        icon: "🪵",
      },
      {
        title: "Main Event",
        content: "Rapid-fire ideation sessions where concepts build and compound exponentially.",
        icon: "💥",
      },
      {
        title: "Aftermath",
        content: "Teams commit to 'keeping the fire alive' with structured follow-up and accountability.",
        icon: "🔥",
      },
    ],
    quote: '"Three hours later, we had a plan that would have taken us months to develop."',
    socialCards: [
      { platform: "LinkedIn", content: "From zero to prototype in one session 🚀", author: "@entrepreneur" },
      { platform: "Twitter", content: "FireStarter lived up to its name 🔥", author: "@startup_founder" },
      { platform: "Instagram", content: "When rapid prototyping meets rapid results", author: "@product_manager" },
    ],
  },
  Constellation: {
    tagline: "Connect the dots, illuminate the future",
    description: "A networking experience that maps relationships and reveals hidden connections",
    phases: [
      {
        title: "Arrival",
        content: "Each participant becomes a 'star' in a real-time network visualization projected overhead.",
        icon: "⭐",
      },
      {
        title: "Main Event",
        content: "As connections form, the constellation grows, revealing patterns and opportunities.",
        icon: "🌌",
      },
      {
        title: "Aftermath",
        content: "The final constellation map becomes a living document of the community's potential.",
        icon: "🗺️",
      },
    ],
    quote: '"I found my co-founder in a constellation of 200 strangers."',
    socialCards: [
      { platform: "LinkedIn", content: "The network effect in real-time ✨ #GSHAConstellation", author: "@networker" },
      { platform: "Twitter", content: "When serendipity meets strategy 🌟", author: "@connector" },
      {
        platform: "Instagram",
        content: "Beautiful chaos: 200 minds, infinite possibilities",
        author: "@community_builder",
      },
    ],
  },
}

const ConceptSection: React.FC<ConceptSectionProps> = ({ sectionName, sectionId, index }) => {
  const { showFixedElements, prefersReducedMotion } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visiblePanels, setVisiblePanels] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const conceptData = CONCEPT_DATA[sectionName as keyof typeof CONCEPT_DATA]

  useEffect(() => {
    if (prefersReducedMotion) {
      // If reduced motion, make all panels visible immediately
      setVisiblePanels(conceptData.phases.map((_, i) => i))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            conceptData.phases.forEach((_, panelIndex) => {
              setTimeout(() => {
                setVisiblePanels((prev) => [...new Set([...prev, panelIndex])]) // Ensure unique entries
              }, panelIndex * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [conceptData.phases, prefersReducedMotion])

  return (
    <>
      <section
        ref={sectionRef}
        id={sectionId}
        className="min-h-screen w-full flex flex-col items-center justify-center border-t border-neutral-800 snap-start relative overflow-hidden"
        style={{ paddingTop: showFixedElements ? "80px" : "0" }}
      >
        <ThematicBackground theme={sectionName.toLowerCase()} />

        <div className="container mx-auto px-4 py-16 md:py-24 z-10 relative">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-orange-400 border-orange-400">
              Concept {index + 1}
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-orange-400 via-red-500 to-yellow-400">
              {sectionName}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-8">{conceptData.tagline}</p>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto">{conceptData.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {conceptData.phases.map((phase, panelIndex) => (
              <ScrollTriggeredPanel
                key={phase.title}
                title={phase.title}
                content={phase.content}
                icon={phase.icon}
                isVisible={visiblePanels.includes(panelIndex)}
                delay={panelIndex * 200}
              />
            ))}
          </div>

          <div className="text-center mb-12">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              Explore Full Concept
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl italic text-center text-neutral-300 mb-8 font-[georgia]">
              {conceptData.quote}
            </blockquote>
            <SocialCards cards={conceptData.socialCards} />
          </div>
        </div>
      </section>

      <ConceptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conceptName={sectionName}
        conceptData={conceptData}
      />
    </>
  )
}

export default ConceptSection
