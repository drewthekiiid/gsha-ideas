import Image from "next/image"
import { cn } from "@/lib/utils"

interface YourLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function YourLogo({ className, width = 150, height = 50 }: YourLogoProps) {
  // Use the actual Drew Dean logo
  const logoSrc = "/Drew Dean Logo White.png"

  return (
    <div className={cn("relative", className)}>
      <Image
        src={logoSrc}
        alt="Drew Dean Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  )
}
