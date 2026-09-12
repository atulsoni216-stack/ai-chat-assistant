import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileTextLinearIcon,
  CloseCircleLinearIcon,
  DownloadLinearIcon,
  SquareShareLineLinearIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"
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
            <div className="flex items-center justify-between p-4 border-b border-slate-100 flex-shrink-0 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-600 flex-shrink-0">
                  <FileTextLinearIcon size={18} className="stroke-[2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-semibold text-slate-900 truncate">
                    {candidate?.resumeFileName || "Emma Resume (1).pdf"}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    Resume of the recruitment profile
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-slate-800 rounded-md"
                  title="Open in new tab"
                  onClick={() => window.open("/emma-resume-preview.png", "_blank")}
                >
                  <SquareShareLineLinearIcon size={17} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-slate-800 rounded-md"
                  title="Download Resume"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = "/emma-resume-preview.png"
                    a.download = candidate?.resumeFileName || "Emma Resume (1).pdf"
                    a.click()
                  }}
                >
                  <DownloadLinearIcon size={17} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 rounded-md"
                  title="Close viewer"
                >
                  <CloseCircleLinearIcon size={20} />
                </Button>
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

