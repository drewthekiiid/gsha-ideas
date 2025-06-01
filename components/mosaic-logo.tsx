import Image from "next/image"
import { cn } from "@/lib/utils"

interface MosaicLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function MosaicLogo({ className, width = 150, height = 50 }: MosaicLogoProps) {
  // Replace with your actual logo path once uploaded
  // For example: import mosaicLogoSrc from '/mosaic-actual-logo.svg';
  const logoSrc = "/mosaic-logo-placeholder.png" // Placeholder

  return (
    <div className={cn("relative", className)}>
      <Image src={logoSrc || "/placeholder.svg"} alt="Mosaic Logo" width={width} height={height} priority />
    </div>
  )
}
