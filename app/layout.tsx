import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GSHA 2025 Ignite", // Updated title
  description: "Experience the GSHA 2025 Ignite concepts.", // Updated description
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Import the 'Permanent Marker' font here for the intro headline.
          You can download it and self-host, or use a service like Google Fonts:
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
        {/* Add any other head elements like favicons here */}
      </head>
      <body>{children}</body>
    </html>
  )
}
