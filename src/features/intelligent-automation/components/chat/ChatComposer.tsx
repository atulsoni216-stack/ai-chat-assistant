import React, { useState, useRef, useEffect } from "react"
import { ComposerActions } from "./ComposerActions"
import { UploadedFileItem } from "../../types"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ChatComposerProps {
  onSendMessage?: (text: string, files: UploadedFileItem[], linkedIn: boolean) => void
  initialValue?: string
  placeholder?: string
  fullWidth?: boolean
  enableBeamAnimation?: boolean
  className?: string
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  initialValue = "",
  placeholder = "Enter your message here...",
  fullWidth = false,
  enableBeamAnimation = true,
  className = "",
}) => {
  const [text, setText] = useState(initialValue)
  const [files, setFiles] = useState<UploadedFileItem[]>([])
  const [linkedInEnabled, setLinkedInEnabled] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.max(48, Math.min(textareaRef.current.scrollHeight, 160))}px`
    }
  }, [text])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleAddFiles = (newFiles: UploadedFileItem[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleRemoveFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (!text.trim() && files.length === 0) return
    onSendMessage?.(text, files, linkedInEnabled)
  }

  const canSend = text.trim().length > 0 || files.length > 0
  // Animation strictly runs only when enabled (Home/New Chat screen) and there is text in the bar
  const isBeamActive = enableBeamAnimation && text.trim().length > 0

  return (
    <motion.div
      className={cn(
        "w-full px-1 sm:px-0 transition-all",
        fullWidth ? "max-w-none" : "max-w-[720px] mx-auto",
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      {/* Outer container */}
      <div
        className={`relative rounded-[1.2rem] p-[1.5px] transition-all duration-300 ${
          isBeamActive
            ? "shadow-[0_6px_28px_-2px_rgba(0,180,216,0.22)]"
            : isFocused
            ? "shadow-[0_2px_12px_rgba(0,180,216,0.08)]"
            : "shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        }`}
      >
        {/* Subtle static base border (always visible) */}
        <div
          className={`absolute inset-0 rounded-[1.2rem] border transition-colors duration-300 pointer-events-none ${
            isBeamActive
              ? "border-cyan-400/60"
              : isFocused
              ? "border-cyan-400"
              : "border-slate-200/90"
          }`}
        />

        {/* Running gradient stroke - ONLY active and visible when enabled on Home screen and typing */}
        {enableBeamAnimation && (
          <svg
            className={`absolute inset-0 w-full h-full pointer-events-none rounded-[1.2rem] transition-opacity duration-300 ${
              isBeamActive ? "opacity-100" : "opacity-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="beam-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06d6a0" stopOpacity="0" />
                <stop offset="25%" stopColor="#06d6a0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#00b4d8" stopOpacity="1" />
                <stop offset="75%" stopColor="#00d2df" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0077b6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect
              x="0.75"
              y="0.75"
              width="calc(100% - 1.5px)"
              height="calc(100% - 1.5px)"
              rx="18"
              fill="none"
              stroke="url(#beam-gradient)"
              strokeWidth="2.4"
              pathLength="100"
              strokeDasharray="30 70"
              className={isBeamActive ? "animate-beam-run" : ""}
            />
          </svg>
        )}

        {/* Inner white surface */}
        <div className="relative z-10 flex flex-col min-h-[125px] sm:min-h-[135px] bg-white rounded-[1.1rem] p-3 sm:p-4 transition-all">
          {/* Text input area */}
          <div className="flex-1 w-full">
            <textarea
              ref={textareaRef}
              rows={2}
              value={text}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent border-0 resize-none text-[13.5px] sm:text-[14px] font-normal text-slate-800 placeholder:text-slate-400 focus:outline-none leading-relaxed tracking-tight selection:bg-cyan-100"
            />
          </div>

          {/* Bottom Action Bar */}
          <ComposerActions
            files={files}
            onAddFiles={handleAddFiles}
            onRemoveFile={handleRemoveFile}
            linkedInEnabled={linkedInEnabled}
            onLinkedInChange={setLinkedInEnabled}
            onSend={handleSend}
            canSend={canSend}
          />
        </div>
      </div>
    </motion.div>
  )
}
