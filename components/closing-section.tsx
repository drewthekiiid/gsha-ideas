"use client"

import { motion } from "framer-motion"
import YourLogo from "./your-logo"
import MosaicLogo from "./mosaic-logo"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Phone } from "lucide-react"
import { useAppContext } from "@/context/app-context"

export default function ClosingSection() {
  const { prefersReducedMotion } = useAppContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
      },
    },
  }

  return (
    <motion.section
      id="closing-section"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-100 p-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 bg-ignite-gradient opacity-30" />
      <div className="absolute inset-0 bg-ignite-particles">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <motion.div className="z-10 text-center flex flex-col items-center space-y-12" variants={containerVariants}>
        <motion.div className="flex items-center justify-center gap-6 md:gap-8" variants={itemVariants}>
          <YourLogo className="h-12 md:h-16 w-auto" width={200} height={66} />
          <span className="text-3xl md:text-4xl font-light text-ignite-orange">×</span>
          <MosaicLogo className="h-12 md:h-16 w-auto" width={200} height={66} />
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ignite-yellow via-ignite-orange to-ignite-red"
          variants={itemVariants}
        >
          Let&apos;s Ignite GSHA 2025
        </motion.h2>

        <motion.p className="text-lg md:text-xl max-w-2xl text-neutral-300" variants={itemVariants}>
          These concepts represent the creative foundation for what we can build together. Ready to transform these ideas
          into campaigns that drive real engagement and deliver exceptional results for GSHA&apos;s biggest year yet.
        </motion.p>

        <motion.div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4" variants={itemVariants}>
          <Button
            size="lg"
            variant="outline"
            className="border-ignite-orange text-ignite-orange hover:bg-ignite-orange hover:text-black transition-colors group w-full sm:w-auto"
            onClick={() => window.open("mailto:drew@drewthekiiid.com", "_blank")}
          >
            Get in Touch <Mail className="ml-2 h-5 w-5 group-hover:animate-ping" />
          </Button>
        </motion.div>

        <motion.div className="flex flex-col items-center space-y-6 pt-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 text-neutral-300">
              <Mail size={20} />
              <a href="mailto:drew@drewthekiiid.com" className="hover:text-ignite-orange transition-colors">
                drew@drewthekiiid.com
              </a>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <Phone size={20} />
              <a href="tel:3126365563" className="hover:text-ignite-orange transition-colors">
                (312) 636-5563
              </a>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/drewthekiiid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-ignite-orange transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </motion.div>

        <motion.p className="text-sm text-neutral-500 pt-12" variants={itemVariants}>
          &copy; 2025 Copywriiite. All sparks reserved.
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
