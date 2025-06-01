"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/context/app-context" // Import context

interface SocialCard {
  platform: string
  content: string
  author: string
}

interface SocialCardsProps {
  cards: SocialCard[]
}

const SocialCards: React.FC<SocialCardsProps> = ({ cards }) => {
  const { prefersReducedMotion } = useAppContext() // Use context
  const [currentCard, setCurrentCard] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion || cards.length <= 1) return // No rotation if reduced motion or single card

    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [cards.length, prefersReducedMotion])

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "bg-blue-600"
      case "twitter":
        return "bg-sky-500"
      case "instagram":
        return "bg-pink-500"
      default:
        return "bg-neutral-600"
    }
  }

  return (
    <div className="relative h-32 overflow-hidden">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn(
            "absolute inset-0 bg-neutral-800/30 border-neutral-700",
            prefersReducedMotion && index !== currentCard ? "opacity-0 hidden" : "", // Hide non-active in reduced motion
            !prefersReducedMotion && "transition-all duration-500 ease-in-out transform",
            index === currentCard
              ? "opacity-100 translate-x-0"
              : index < currentCard && !prefersReducedMotion
                ? "opacity-0 -translate-x-full"
                : !prefersReducedMotion
                  ? "opacity-0 translate-x-full"
                  : "opacity-0", // Default to hidden if not current and not animating
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <Badge className={cn("text-white", getPlatformColor(card.platform))}>{card.platform}</Badge>
              <span className="text-sm text-neutral-400">{card.author}</span>
            </div>
            <p className="text-neutral-200 italic">"{card.content}"</p>
          </CardContent>
        </Card>
      ))}

      {cards.length > 1 && ( // Only show dots if multiple cards
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentCard ? "bg-orange-400" : "bg-neutral-600",
              )}
              aria-label={`Show card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SocialCards
