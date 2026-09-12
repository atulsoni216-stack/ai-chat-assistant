import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AltArrowDownLinearIcon,
  AltArrowUpLinearIcon,
  CheckCircleBoldIcon,
  RefreshLinearIcon,
} from "@solar-icons/react"

interface StepItem {
  id: string
  text: string
  detail?: string
}

const defaultSteps: StepItem[] = [
  {
    id: "s-1",
    text: "Search the document",
    detail: "Extracted text and metadata from uploaded resume PDF.",
  },
  {
    id: "s-2",
    text: "Validate details from JD",
    detail: "Verified core competencies against Frontend Developer JD.",
  },
  {
    id: "s-3",
    text: "Match keywords from JD",
    detail: "Calculated keyword density for React, Next.js, and Tailwind CSS.",
  },
  {
    id: "s-4",
    text: "Finalize top 2",
    detail: "Ranked candidate profiles with benchmark scores >= 8/10.",
  },
]

interface ThinkingAccordionProps {
  isThinking?: boolean
  onThinkingComplete?: () => void
  currentStep?: number
}

export const ThinkingAccordion: React.FC<ThinkingAccordionProps> = ({
  isThinking = false,
  onThinkingComplete,
  currentStep = 4,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [activeStep, setActiveStep] = useState(isThinking ? 0 : currentStep)
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null)

  useEffect(() => {
    if (!isThinking) {
      setActiveStep(defaultSteps.length)
      return
    }

    setActiveStep(0)
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < defaultSteps.length) {
          return prev + 1
        } else {
          clearInterval(interval)
          onThinkingComplete?.()
          return defaultSteps.length
        }
      });
    }, 700)

    return () => clearInterval(interval)
  }, [isThinking, onThinkingComplete])

  return (
    <div className="w-full max-w-[620px] mb-3 select-none">
      {/* Accordion Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-800 hover:text-slate-950 text-[13.5px] font-medium transition-colors group focus:outline-none cursor-pointer"
      >
        <span className="text-cyan-500 font-semibold text-sm select-none animate-pulse">
          ✦
        </span>
        <span className="font-normal text-slate-800 tracking-tight">
          Do you want to see what is AI Multi-Agent Thinking?
        </span>
        <span className="text-slate-400 group-hover:text-slate-700 transition-transform">
          {isOpen ? (
            <AltArrowUpLinearIcon size={15} className="stroke-[2.2]" />
          ) : (
            <AltArrowDownLinearIcon size={15} className="stroke-[2.2]" />
          )}
        </span>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 ml-3 pl-3.5 border-l-[1.5px] border-dotted border-slate-200/90 space-y-2 py-0.5">
              <p className="text-[12px] font-semibold text-slate-600 tracking-tight">
                AI's Thought Process
              </p>

              <div className="space-y-1.5 pt-0.5">
                {defaultSteps.map((step, idx) => {
                  const isCompleted = activeStep > idx
                  const isInProgress = activeStep === idx

                  return (
                    <div key={step.id} className="space-y-1">
                      <div className="flex items-center justify-between text-[12.5px] pr-2">
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircleBoldIcon
                                size={15}
                                className="text-[#34A853] flex-shrink-0"
                              />
                            </motion.div>
                          ) : isInProgress ? (
                            <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping inline-block" />
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
                          )}

                          <span
                            className={
                              isCompleted
                                ? "text-slate-800 font-normal"
                                : isInProgress
                                ? "text-cyan-800 font-medium animate-pulse"
                                : "text-slate-400 font-normal"
                            }
                          >
                            {step.text}
                          </span>
                        </div>

                        {/* Chevron for step details */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedStepId(
                              expandedStepId === step.id ? null : step.id
                            )
                          }
                          className="text-slate-400 hover:text-slate-700 p-0.5 focus:outline-none cursor-pointer"
                        >
                          <AltArrowDownLinearIcon
                            size={13}
                            className={`transition-transform duration-200 stroke-[2] ${
                              expandedStepId === step.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expanded mini step detail */}
                      {expandedStepId === step.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 text-[11.5px] text-slate-500 italic pb-1"
                        >
                          {step.detail}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
