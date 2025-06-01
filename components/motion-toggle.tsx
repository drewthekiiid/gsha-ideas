"use client"

import type React from "react"
import { Zap, ZapOff } from "lucide-react" // Using Zap icons for motion
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppContext } from "@/context/app-context"

interface MotionToggleProps {
  isReducedMotion: boolean
  onToggle: () => void
  className?: string
}

const MotionToggle: React.FC<MotionToggleProps> = ({ isReducedMotion, onToggle, className }) => {
  const { prefersReducedMotion } = useAppContext() // Access context if needed for styling, though props drive logic

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        "text-neutral-300 hover:text-sky-400 hover:bg-neutral-700/50 rounded-full focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-neutral-950",
        className,
      )}
      aria-label={isReducedMotion ? "Enable full motion" : "Reduce motion"}
      aria-pressed={isReducedMotion}
    >
      {isReducedMotion ? <ZapOff className="h-5 w-5 md:h-6 md:w-6" /> : <Zap className="h-5 w-5 md:h-6 md:w-6" />}
    </Button>
  )
}

export default MotionToggle
