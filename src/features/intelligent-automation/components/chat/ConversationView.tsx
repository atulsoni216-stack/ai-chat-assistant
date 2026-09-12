import React, { useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { UserMessageBubble } from "./UserMessageBubble"
import { ThinkingAccordion } from "./ThinkingAccordion"
import { CandidateCard, CandidateProfile } from "./CandidateCard"
import { ResumeViewerDrawer } from "./ResumeViewerDrawer"
import { AttachmentsDrawer } from "./AttachmentsDrawer"
import { FlowDetailsDrawer } from "./FlowDetailsDrawer"
import { NotificationsPopover } from "./NotificationsPopover"
import { ChatComposer } from "./ChatComposer"
import { UploadedFileItem } from "../../types"
import {
  CopyLinearIcon,
  LikeLinearIcon,
  DislikeLinearIcon,
  CheckCircleBoldIcon,
} from "@solar-icons/react"
import { motion, AnimatePresence } from "framer-motion"

interface ConversationViewProps {
  chatTitle?: string
  promptMessage?: string
  isThinkingInitially?: boolean
  onSendMessage?: (text: string, files: UploadedFileItem[], linkedIn: boolean) => void
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  chatTitle = "AI Multi-Agent",
  promptMessage,
  isThinkingInitially = false,
  onSendMessage,
}) => {
  const [showAttachments, setShowAttachments] = useState(false)
  const [showFlowDetails, setShowFlowDetails] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedResume, setSelectedResume] = useState<CandidateProfile | null>(null)
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null)
  const [isThinking, setIsThinking] = useState(isThinkingInitially)
  const [thinkingComplete, setThinkingComplete] = useState(!isThinkingInitially)

  const candidates: CandidateProfile[] = [
    {
      id: "c-1",
      name: "Emma Stone",
      score: 9,
      email: "Emmastone009@email.com",
      skillsSummary:
        "Strong frontend and backend skills with relevant experience in React, js, Next.ju, and Tailwind CSS",
      resumeFileName: "Emma Resume (1).pdf",
      resumeType: "PDF",
    },
    {
      id: "c-2",
      name: "John Matthews",
      score: 8,
      email: "johnmatthews34@email.com",
      skillsSummary:
        "Strong frontend and backend skills with relevant experience in React, js, Next.ju, and Tailwind CSS",
      resumeFileName: "John Matthews.pdf",
      resumeType: "PDF",
    },
  ]

  const [userPrompt, setUserPrompt] = useState(
    promptMessage || chatTitle || "Analysis the Resume with respect to Job Description"
  )

  React.useEffect(() => {
    if (promptMessage || chatTitle) {
      setUserPrompt(promptMessage || chatTitle)
    }
  }, [promptMessage, chatTitle])

  React.useEffect(() => {
    if (isThinkingInitially) {
      setIsThinking(true)
      setThinkingComplete(false)
    } else {
      setIsThinking(false)
      setThinkingComplete(true)
    }
  }, [isThinkingInitially, chatTitle])

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Here are the top 2 shortlisted resume profiles: Emma Stone (Score 9) and John Matthews (Score 8)."
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleThinkingDone = () => {
    setIsThinking(false)
    setThinkingComplete(true)
  }

  return (
    <div className="relative flex flex-col h-full w-full justify-between">
      {/* Top Chat Header */}
      <ChatHeader
        title={chatTitle}
        onToggleAttachments={() => setShowAttachments(!showAttachments)}
        onToggleInfo={() => setShowFlowDetails(!showFlowDetails)}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
      />

      {/* Notifications Popover Dropdown */}
      <NotificationsPopover
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onViewFile={(fileName) => setSelectedResume(candidates[0])}
      />

      {/* Attachments Drawer Popup */}
      <AttachmentsDrawer
        isOpen={showAttachments}
        onClose={() => setShowAttachments(false)}
      />

      {/* Flow's Detailed Info Right Drawer */}
      <FlowDetailsDrawer
        isOpen={showFlowDetails}
        onClose={() => setShowFlowDetails(false)}
      />

      {/* Interactive Resume Side Drawer */}
      <ResumeViewerDrawer
        isOpen={!!selectedResume}
        onClose={() => setSelectedResume(null)}
        candidate={selectedResume}
      />

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-4 py-4 space-y-6 custom-scrollbar">
        {/* User Query Bubble with in-place edit */}
        <UserMessageBubble
          message={userPrompt}
          attachmentName="Emma Resume (1).pdf"
          onViewAttachment={() => setSelectedResume(candidates[0])}
          onSave={(newText) => setUserPrompt(newText)}
        />

        {/* AI Multi-Agent Response Block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-3.5 w-full"
        >
          {/* Thinking Steps Accordion */}
          <ThinkingAccordion
            isThinking={isThinking}
            onThinkingComplete={handleThinkingDone}
          />

          {/* AI Response Text Intro & Candidate Cards (revealed after thinking) */}
          <AnimatePresence>
            {thinkingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3.5 w-full"
              >
                <div className="flex items-start gap-2.5">
                  <p className="text-[13.5px] text-slate-800 font-normal leading-relaxed tracking-tight">
                    Here are the top 2 shortlisted resume profiles for the Frontend Developer position at Solar Tech Company based on the provided job description:
                  </p>
                </div>

                {/* Shortlisted Candidate Cards */}
                <div className="flex flex-wrap items-stretch justify-start gap-3.5 pt-1">
                  {candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onViewResume={(cand) => setSelectedResume(cand)}
                    />
                  ))}
                </div>

                {/* Bottom Action Feedback Toolbar */}
                <div className="flex items-center gap-1 pt-2 select-none">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                    title={copied ? "Copied!" : "Copy response"}
                  >
                    {copied ? (
                      <CheckCircleBoldIcon size={16} className="text-emerald-600" />
                    ) : (
                      <CopyLinearIcon size={16} className="stroke-[1.8]" />
                    )}
                  </button>

                  <button
                    onClick={() => setFeedback(feedback === "like" ? null : "like")}
                    className={`p-1.5 rounded-md transition-colors focus:outline-none cursor-pointer ${
                      feedback === "like"
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Helpful response"
                  >
                    <LikeLinearIcon size={16} className="stroke-[1.8]" />
                  </button>

                  <button
                    onClick={() => setFeedback(feedback === "dislike" ? null : "dislike")}
                    className={`p-1.5 rounded-md transition-colors focus:outline-none cursor-pointer ${
                      feedback === "dislike"
                        ? "text-rose-600 bg-rose-50"
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Not helpful"
                  >
                    <DislikeLinearIcon size={16} className="stroke-[1.8]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Bottom Composer */}
      <div className="pt-2 w-full">
        <ChatComposer
          initialValue=""
          placeholder="Enter your message here..."
          onSendMessage={onSendMessage}
          fullWidth={true}
          enableBeamAnimation={false}
        />
      </div>
    </div>
  )
}
