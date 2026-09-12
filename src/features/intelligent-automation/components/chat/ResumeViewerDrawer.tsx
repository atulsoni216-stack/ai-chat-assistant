import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileTextLinearIcon,
  CloseLinearIcon,
  DownloadLinearIcon,
  SquareShareLineLinearIcon,
} from "@solar-icons/react"
import { CandidateProfile } from "./CandidateCard"

interface ResumeViewerDrawerProps {
  isOpen: boolean
  onClose: () => void
  candidate?: CandidateProfile | null
}

export const ResumeViewerDrawer: React.FC<ResumeViewerDrawerProps> = ({
  isOpen,
  onClose,
  candidate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs transition-opacity"
          />

          {/* Side Drawer Card */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-[480px] lg:max-w-[540px] h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 select-none overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/90 flex-shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-[7px] bg-red-50 text-red-600 flex-shrink-0">
                  <FileTextLinearIcon size={18} className="stroke-[2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-semibold text-slate-900 truncate leading-snug">
                    {candidate?.resumeFileName || "Emma Resume (1).pdf"}
                  </span>
                  <span className="text-[11.5px] text-slate-400 truncate leading-tight">
                    Resume of the recruitment profile
                  </span>
                </div>
              </div>

              {/* Action buttons matching Figma */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => window.open("/emma-resume-preview.png", "_blank")}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                  title="Open in new tab"
                  aria-label="Open in new tab"
                >
                  <SquareShareLineLinearIcon size={18} className="stroke-[1.9]" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = "/emma-resume-preview.png"
                    a.download = candidate?.resumeFileName || "Emma Resume (1).pdf"
                    a.click()
                  }}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                  title="Download Resume"
                  aria-label="Download Resume"
                >
                  <DownloadLinearIcon size={18} className="stroke-[1.9]" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                  title="Close viewer"
                  aria-label="Close viewer"
                >
                  <CloseLinearIcon size={18} className="stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 custom-scrollbar">
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
                <img
                  src="/emma-resume-preview.png"
                  alt={candidate?.name || "Emma Stone Resume"}
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

