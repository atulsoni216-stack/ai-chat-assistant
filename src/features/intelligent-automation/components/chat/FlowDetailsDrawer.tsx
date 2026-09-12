import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  InfoCircleLinearIcon,
  CloseLinearIcon,
  AltArrowDownLinearIcon,
  AltArrowUpLinearIcon,
  CheckCircleBoldIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"

interface FlowStage {
  id: string
  title: string
  steps: string[]
  isCompleted?: boolean
  defaultOpen?: boolean
}

const flowStages: FlowStage[] = [
  {
    id: "stage-1",
    title: "Initial Engagement with the User",
    steps: [
      "Detecting user greeting...",
      "Assessing if follow-up user intent is present...",
      "Preparing initial response options...",
    ],
    isCompleted: true,
    defaultOpen: true,
  },
  {
    id: "stage-2",
    title: "Evaluating if data is needed",
    steps: [
      "Detecting user greeting...",
      "Assessing if follow-up user intent is present...",
      "Preparing initial response options...",
    ],
    isCompleted: true,
    defaultOpen: false,
  },
  {
    id: "stage-3",
    title: "Interpreting user's intent",
    steps: [
      "Detecting user greeting...",
      "Assessing if follow-up user intent is present...",
      "Preparing initial response options...",
    ],
    isCompleted: true,
    defaultOpen: false,
  },
  {
    id: "stage-4",
    title: "Data Gathering & Analyzing",
    steps: [
      "Detecting user greeting...",
      "Assessing if follow-up user intent is present...",
      "Preparing initial response options...",
    ],
    isCompleted: true,
    defaultOpen: false,
  },
  {
    id: "stage-5",
    title: "Waiting for User's Input for Further Action",
    steps: [
      "Provided results based on gathered data",
      "Waiting for user's input...",
    ],
    isCompleted: true,
    defaultOpen: true,
  },
]

interface FlowDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const FlowDetailsDrawer: React.FC<FlowDetailsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [openStages, setOpenStages] = useState<Record<string, boolean>>({
    "stage-1": true,
    "stage-5": true,
  })

  const toggleStage = (stageId: string) => {
    setOpenStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/15 backdrop-blur-[1px] transition-opacity"
          />

          {/* Side Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-[420px] sm:max-w-[460px] h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 select-none overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex-shrink-0">
                  <InfoCircleLinearIcon size={18} className="stroke-[1.8]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-[14.5px] font-semibold text-slate-900 leading-snug">
                    Flow's Detailed Info
                  </h3>
                  <p className="text-[11.5px] text-slate-400 font-normal leading-tight">
                    Detailed View of Agent Flow in Stages.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md"
                title="Close drawer"
              >
                <CloseLinearIcon size={18} className="stroke-[2.2]" />
              </Button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 custom-scrollbar">
              <div className="mb-4">
                <h4 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                  AI's Thought Process:
                </h4>
              </div>

              {/* Stages Timeline */}
              <div className="relative pl-1 space-y-4">
                {flowStages.map((stage, idx) => {
                  const isOpen = !!openStages[stage.id]
                  const isLast = idx === flowStages.length - 1

                  return (
                    <div key={stage.id} className="relative">
                      {/* Vertical Dotted Line Connector */}
                      {!isLast && (
                        <div className="absolute left-[9px] top-6 bottom-[-16px] w-0 border-l-[1.5px] border-dotted border-slate-300 z-0 pointer-events-none" />
                      )}

                      {/* Stage Item Header */}
                      <div className="relative z-10 flex items-start gap-2.5">
                        {/* Green Checkmark Circle */}
                        <div className="flex-shrink-0 mt-0.5 bg-white ring-2 ring-white rounded-full">
                          <CheckCircleBoldIcon
                            size={18}
                            className="text-[#34A853]"
                          />
                        </div>

                        {/* Title & Chevron Button */}
                        <button
                          type="button"
                          onClick={() => toggleStage(stage.id)}
                          className="flex-1 flex items-center justify-between text-left group hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
                        >
                          <span className="text-[13px] font-medium text-slate-800 group-hover:text-slate-950 transition-colors leading-snug">
                            {stage.title}
                          </span>
                          <span className="text-slate-400 group-hover:text-slate-600 transition-colors ml-2 flex-shrink-0">
                            {isOpen ? (
                              <AltArrowUpLinearIcon
                                size={14}
                                className="stroke-[2]"
                              />
                            ) : (
                              <AltArrowDownLinearIcon
                                size={14}
                                className="stroke-[2]"
                              />
                            )}
                          </span>
                        </button>
                      </div>

                      {/* Sub-steps Collapsible List */}
                      {isOpen && (
                        <div className="relative ml-[9px] pl-5 pt-2 pb-1 space-y-2 border-l-[1.5px] border-dotted border-slate-300">
                          {stage.steps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="text-[11.5px] text-slate-500 font-normal leading-relaxed hover:text-slate-700 transition-colors"
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

