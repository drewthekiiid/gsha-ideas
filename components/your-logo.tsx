import Image from "next/image"
import { cn } from "@/lib/utils"

interface YourLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function YourLogo({ className, width = 150, height = 50 }: YourLogoProps) {
  // Replace with your actual logo path once uploaded
  // For example: import yourLogoSrc from '/your-actual-logo.svg';
  const logoSrc = "/your-logo-placeholder.png" // Placeholder

  return (
    <div className={cn("relative", className)}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Your Company Logo"
        width={width}
        height={height}
        priority // Good for LCP if this logo is visible early
      />
    </div>
  )
}
