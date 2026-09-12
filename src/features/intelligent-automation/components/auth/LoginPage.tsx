import React, { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Paperclip, Send } from "lucide-react"

interface LoginPageProps {
  onLogin: (email?: string) => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email || "user@celebaltech.com")
  }

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#F9FBFC] overflow-hidden select-none font-sans">
      {/* Background Decorative Mesh & Rounded Outlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Radial Glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-emerald-50/40 rounded-full blur-[90px]" />

        {/* Corner Geometric Outline Accents (like in reference image) */}
        <div className="absolute top-0 left-0 w-80 h-80 opacity-40">
          <div className="absolute top-6 left-6 w-60 h-60 rounded-[32px] border border-cyan-200/60" />
          <div className="absolute top-12 left-12 w-48 h-48 rounded-[28px] border border-cyan-200/40" />
          <div className="absolute top-20 left-20 w-32 h-32 rounded-[24px] border border-cyan-200/20" />
        </div>

        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-40">
          <div className="absolute bottom-6 left-6 w-72 h-72 rounded-[36px] border border-cyan-200/60" />
          <div className="absolute bottom-14 left-14 w-56 h-56 rounded-[28px] border border-cyan-200/40" />
          <div className="absolute bottom-24 left-24 w-40 h-40 rounded-[24px] border border-cyan-200/20" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 opacity-40">
          <div className="absolute top-6 right-6 w-72 h-72 rounded-[36px] border border-cyan-200/60" />
          <div className="absolute top-14 right-14 w-56 h-56 rounded-[28px] border border-cyan-200/40" />
        </div>
      </div>

      {/* Main Container with 2-Column Split Layout */}
      <div className="relative z-10 w-full max-w-[1380px] min-h-[640px] h-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center px-6 lg:px-12 py-8 gap-8 lg:gap-12">
        {/* Left Column: Login Form */}
        <div className="lg:col-span-5 flex flex-col justify-center max-w-[430px] w-full mx-auto lg:mx-0 lg:pr-6">
          {/* Celebal Technologies Logo */}
          <div className="mb-8">
            <img
              src="/celebal-logo.png"
              alt="Celebal Technologies"
              className="h-[34px] w-auto object-contain"
            />
          </div>

          {/* Heading and Subtitle */}
          <div className="mb-8">
            <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#323232] tracking-tight leading-tight">
              Sign in to Your Account
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Welcome back to{" "}
              <span className="font-semibold text-slate-700">AI Multi-Agent!</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13.5px] font-medium text-slate-800 mb-1.5"
              >
                Email ID
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-11 px-3.5 py-2.5 rounded-[8px] border border-slate-200 text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all bg-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13.5px] font-medium text-slate-800 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 px-3.5 py-2.5 pr-10 rounded-[8px] border border-slate-200 text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forget Password Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-[3px] border border-slate-300 text-[#00B4D8] focus:ring-cyan-400 transition-colors cursor-pointer accent-[#00B4D8]"
                />
                <span className="text-[13px] text-slate-500 font-normal">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset instructions have been sent to your email.")}
                className="text-[13px] font-medium text-[#00A3FF] hover:text-[#0088dd] hover:underline transition-colors focus:outline-none"
              >
                Forget Password?
              </button>
            </div>

            {/* Log in Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 rounded-[8px] text-white font-medium text-[14px] sm:text-[15px] bg-gradient-to-r from-[#44E2CE] via-[#24C6DC] to-[#18B5EA] hover:from-[#3CD5C0] hover:to-[#0EA5E9] shadow-xs active:scale-[0.99] transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Vertical Divider (Visible on large screens) */}
        <div className="hidden lg:block absolute left-[41.5%] top-12 bottom-12 w-[1px] bg-slate-200/60" />

        {/* Right Column: Hero Graphics & Layered Mockup Preview */}
        <div className="lg:col-span-7 flex flex-col justify-center lg:pl-10 relative">
          {/* Header Typography */}
          <div className="mb-4">
            <h2 className="text-3xl sm:text-[38px] lg:text-[42px] font-semibold text-[#323232] tracking-tight leading-snug">
              Our Intelligent
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-0.5">
              <span className="text-3xl sm:text-[38px] lg:text-[42px] font-semibold bg-gradient-to-r from-[#2DD4BF] via-[#22D3EE] to-[#0EA5E9] bg-clip-text text-transparent tracking-tight leading-normal pb-2 px-0.5 inline-block">
                Hiring Assistant!
              </span>

              {/* Twinkling AI Stars Interaction matching inner Chat Home Screen */}
              <div className="relative w-10 h-10 flex items-center justify-center -top-2 flex-shrink-0">
                {/* Main Large Sparkle Star - Blinking / Twinkling Loop */}
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-[#00c4cc] fill-current drop-shadow-[0_2px_12px_rgba(0,196,204,0.45)]"
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
                  className="w-4 h-4 text-[#38ef7d] fill-current absolute top-0 -right-1.5 drop-shadow-[0_1px_6px_rgba(56,239,125,0.6)]"
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
            </div>
            <p className="text-slate-600 text-sm sm:text-[15px] max-w-xl leading-relaxed mt-2">
              Our Agentic AI is designed to help you quickly identify the most suitable
              candidate profiles based on your job description —without any manual
              sorting.
            </p>
          </div>

          {/* Layered App UI Mockups Container */}
          <div className="relative mt-6 w-full max-w-[620px] h-[340px] sm:h-[380px] select-none pointer-events-none">
            {/* Background Soft Glow */}
            <div className="absolute inset-0 bg-cyan-200/25 rounded-3xl blur-2xl transform translate-x-4 translate-y-4" />

            {/* Back Card: Conversation View Mockup */}
            <div className="absolute top-0 right-0 w-[88%] h-[280px] sm:h-[310px] bg-white/95 rounded-2xl border border-cyan-200/80 shadow-[0_10px_30px_rgba(0,180,216,0.12)] p-4 overflow-hidden backdrop-blur-sm transform translate-x-4">
              {/* Mockup Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img
                    src="/celebal-logo.png"
                    alt="Celebal"
                    className="h-3.5 w-auto object-contain opacity-70"
                  />
                  <span className="text-[11px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                    AI Multi-Agent
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100/80 px-2.5 py-1 rounded-md text-[10px] text-slate-600">
                  <span>📄</span>
                  <span className="font-medium">Emma Resume.pdf</span>
                </div>
              </div>

              {/* Mockup Chat Body */}
              <div className="pt-3 space-y-2.5">
                <div className="flex justify-end">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 text-[10px] text-slate-600 max-w-[75%]">
                    Hi, can you read my documents and summarize?
                  </div>
                </div>

                {/* AI Thinking Bar */}
                <div className="flex items-center gap-1.5 text-[10px] text-cyan-600 bg-cyan-50/70 border border-cyan-200/50 rounded-lg px-3 py-2">
                  <span className="text-cyan-500 font-semibold">✦</span>
                  <span className="font-medium">
                    Do you want to see what is AI Multi-Agent Thinking?
                  </span>
                  <span className="ml-auto text-cyan-500">▲</span>
                </div>
              </div>
            </div>

            {/* Front Card: Welcome Screen Mockup */}
            <div className="absolute bottom-0 left-0 w-[92%] bg-white rounded-2xl border border-cyan-200 shadow-[0_16px_40px_rgba(0,180,216,0.18)] p-5 sm:p-6 overflow-hidden">
              {/* Center Sparkle */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative w-8 h-8 flex items-center justify-center mb-1">
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#00c4cc] fill-current drop-shadow-[0_2px_8px_rgba(0,196,204,0.4)]"
                    animate={{
                      opacity: [1, 0.2, 1, 0.35, 1],
                      scale: [1, 0.85, 1.08, 0.9, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                  </motion.svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#323232]">
                  Welcome to the Future of
                </h3>
                <span className="text-sm sm:text-base font-semibold text-[#00B4D8]">
                  Intelligent Automation
                </span>
              </div>

              {/* Mockup Chat Composer */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 flex flex-col justify-between h-[72px]">
                <span className="text-[11px] text-slate-600 font-normal">
                  Analyze the Resume with respect to Job Description{" "}
                  <span className="inline-block w-1.5 h-3 bg-slate-400 animate-pulse align-middle" />
                </span>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-2 py-0.5 text-[10px] text-slate-500">
                    <Paperclip size={10} className="text-slate-400" />
                    <span>Upload files</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                    <Send size={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

