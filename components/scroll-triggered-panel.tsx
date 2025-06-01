"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAppContext } from "@/context/app-context" // Import context

interface ScrollTriggeredPanelProps {
  title: string
  content: string
  icon: string
  isVisible: boolean
  delay: number
}

const ScrollTriggeredPanel: React.FC<ScrollTriggeredPanelProps> = ({ title, content, icon, isVisible, delay }) => {
  const { prefersReducedMotion } = useAppContext() // Use context

  return (
    <Card
      className={cn(
        "bg-neutral-800/50 border-neutral-700 backdrop-blur-sm",
        prefersReducedMotion
          ? "opacity-100" // No animation if reduced motion
          : "transition-all duration-700 ease-out transform",
        isVisible && !prefersReducedMotion
          ? "opacity-100 translate-y-0 scale-100"
          : !prefersReducedMotion
            ? "opacity-0 translate-y-8 scale-95"
            : "",
      )}
      style={{ transitionDelay: isVisible && !prefersReducedMotion ? `${delay}ms` : "0ms" }}
    >
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle className="text-xl md:text-2xl text-orange-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-300 text-center leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  )
}

export default ScrollTriggeredPanel
