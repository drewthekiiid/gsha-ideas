import Image from "next/image"
import { cn } from "@/lib/utils"

interface MosaicLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function MosaicLogo({ className, width = 150, height = 50 }: MosaicLogoProps) {
  // Use the actual Mosaic logo file
  const logoSrc = "/mosaic-logo.png"

  return (
    <div className={cn("relative", className)}>
      <Image src={logoSrc} alt="Mosaic Logo" width={width} height={height} priority />
    </div>
  )
}
