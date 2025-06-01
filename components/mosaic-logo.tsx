import type React from "react"

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const MosaicLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="Mosaic Company Logo">
    <rect width="120" height="40" rx="5" ry="5" fill="currentColor" className="text-sky-500" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="#FFF"
      fontSize="16"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      MOSAIC
    </text>
  </svg>
)
export default MosaicLogo
