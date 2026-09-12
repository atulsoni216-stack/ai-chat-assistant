import React from "react"
import { LetterLinearIcon, FileTextLinearIcon } from "@solar-icons/react"
import { cn } from "@/lib/utils"

export interface CandidateProfile {
  id: string
  name: string
  score: number
  email: string
  skillsSummary: string
  resumeFileName: string
  resumeType: string
  avatarUrl?: string
  role?: string
}

interface CandidateCardProps {
  candidate: CandidateProfile
  onViewResume?: (candidate: CandidateProfile) => void
  className?: string
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onViewResume,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-4 rounded-[12px] bg-white border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all duration-200 w-full sm:w-[260px] md:w-[280px] select-none",
        className
      )}
    >
      <div>
        {/* Score Badge */}
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] bg-[#E8F8F0] text-[#137333] border border-[#C5ECD6] text-[11px] font-semibold leading-none">
            Score: {candidate.score}
          </span>
        </div>

        {/* Candidate Name */}
        <h4 className="text-[15px] font-semibold text-slate-900 tracking-tight leading-snug">
          {candidate.name}
        </h4>

        {/* Email Address */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11.5px] mt-1 mb-2.5 truncate">
          <LetterLinearIcon size={13} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{candidate.email}</span>
        </div>

        {/* Skills / Profile description */}
        <p className="text-[12px] text-slate-600 font-normal leading-relaxed line-clamp-3 mb-3">
          {candidate.skillsSummary}
        </p>
      </div>

      {/* Embedded Resume PDF Card (Clickable to view/preview resume) */}
      <button
        onClick={() => onViewResume?.(candidate)}
        className="group flex items-center gap-2.5 p-2 rounded-[8px] bg-slate-50/80 border border-slate-200/70 hover:bg-cyan-50/50 hover:border-cyan-300 transition-all duration-150 text-left w-full mt-auto focus:outline-none cursor-pointer"
      >
        {/* Red PDF Icon badge */}
        <div className="flex items-center justify-center w-7 h-7 rounded-[5px] bg-red-50 text-red-600 flex-shrink-0 group-hover:scale-105 transition-transform">
          <FileTextLinearIcon size={16} className="stroke-[2]" />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[12px] font-medium text-slate-800 truncate group-hover:text-cyan-900 transition-colors leading-tight">
            {candidate.resumeFileName}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5 leading-none">
            {candidate.resumeType}
          </span>
        </div>
      </button>
    </div>
  )
}

