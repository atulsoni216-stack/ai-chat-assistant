import React from "react"
import { motion } from "framer-motion"

export const WelcomeState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto select-none">
      {/* AI Sparkles / Stars Blinking in Loop */}
      <motion.div
        className="relative mb-6 flex items-center justify-center"
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Main Large Sparkle Star - Blinking / Twinkling Loop */}
          <motion.svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-[#00c4cc] fill-current drop-shadow-[0_2px_12px_rgba(0,196,204,0.45)]"
            animate={{
              opacity: [1, 0.2, 1, 0.35, 1],
              scale: [1, 0.85, 1.08, 0.9, 1],
              rotate: [0, -3, 3, -1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </motion.svg>

          {/* Secondary Smaller Sparkle Star - Offset Blinking Loop */}
          <motion.svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#38ef7d] fill-current absolute top-0.5 -right-2 drop-shadow-[0_1px_6px_rgba(56,239,125,0.6)]"
            animate={{
              opacity: [0.3, 1, 0.2, 1, 0.3],
              scale: [0.8, 1.25, 0.75, 1.15, 0.8],
              rotate: [0, 6, -6, 2, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </motion.svg>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        className="space-y-1 md:space-y-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-slate-800 tracking-tight leading-normal"
          style={{ fontWeight: 600 }}
        >
          Welcome to the Future of
        </h1>
        <h2
          className="text-3xl sm:text-4xl md:text-[44px] font-semibold bg-gradient-to-r from-[#00d2df] via-[#00b4d8] to-[#0096c7] bg-clip-text text-transparent tracking-tight leading-normal pb-2 px-1 inline-block"
          style={{ fontWeight: 600 }}
        >
          Intelligent Automation
        </h2>
      </motion.div>
    </div>
  )
}
