"use client"

import type React from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SoundToggleProps {
  isMuted: boolean
  onToggle: () => void
  className?: string
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle, className }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        "text-neutral-300 hover:text-orange-400 hover:bg-neutral-700/50 rounded-full focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-neutral-950",
        className,
      )}
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? <VolumeX className="h-5 w-5 md:h-6 md:w-6" /> : <Volume2 className="h-5 w-5 md:h-6 md:w-6" />}
    </Button>
  )
}

export default SoundToggle
