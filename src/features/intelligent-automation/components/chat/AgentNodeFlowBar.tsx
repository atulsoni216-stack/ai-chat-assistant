import React from "react"
import {
  RoutingLinearIcon,
  AltArrowUpLinearIcon,
  AltArrowDownLinearIcon,
} from "@solar-icons/react"
import { cn } from "@/lib/utils"

interface AgentNodeFlowBarProps {
  isOpen?: boolean
  onClick?: () => void
  className?: string
}

export const AgentNodeFlowBar: React.FC<AgentNodeFlowBarProps> = ({
  isOpen = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-xs transition-all duration-150 text-left select-none cursor-pointer focus:outline-none",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {/* Soft Square Icon Badge */}
        <div className="flex items-center justify-center w-6 h-6 rounded-[5px] bg-slate-100 text-slate-500 group-hover:text-slate-800 transition-colors flex-shrink-0">
          <RoutingLinearIcon size={14} className="stroke-[1.8]" />
        </div>

        {/* Title */}
        <span className="text-[13px] font-medium text-slate-800 group-hover:text-slate-950 transition-colors tracking-tight">
          Agent Node Flow
        </span>
      </div>

      {/* Collapse / Expand Chevron */}
      <div className="text-slate-500 group-hover:text-slate-800 transition-colors">
        {isOpen ? (
          <AltArrowDownLinearIcon size={15} className="stroke-[2.2]" />
        ) : (
          <AltArrowUpLinearIcon size={15} className="stroke-[2.2]" />
        )}
      </div>
    </button>
  )
}

