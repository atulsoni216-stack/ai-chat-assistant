import React from "react"
import {
  BranchingPathsDownLinearIcon,
  ChecklistMinimalisticLinearIcon,
  AddLinearIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarNavProps {
  onNewChat?: () => void
  activeNav?: string
  onSelectNav?: (id: string) => void
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  onNewChat,
  activeNav = "",
  onSelectNav,
}) => {
  const navItems = [
    {
      id: "workflows",
      label: "Workflows",
      icon: BranchingPathsDownLinearIcon,
    },
    {
      id: "sop-rulebook",
      label: "SOP & Rulebook",
      icon: ChecklistMinimalisticLinearIcon,
    },
  ]

  return (
    <div className="flex flex-col space-y-2 px-3 py-2">
      {/* Primary Navigation Links */}
      <nav className="flex flex-col space-y-0.5" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSelectNav?.(item.id)}
              className={cn(
                "group flex items-center gap-3 w-full px-2.5 py-2 rounded-[7px] text-[13px] font-normal transition-all duration-150 text-slate-800 hover:text-slate-950 hover:bg-slate-200/50 active:scale-[0.99]",
                isActive && "bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/60"
              )}
            >
              <span className="text-slate-700 group-hover:text-slate-900 transition-colors flex-shrink-0">
                <Icon size={18} className="stroke-[1.8]" />
              </span>
              <span className="truncate text-[13px] font-normal leading-snug tracking-tight text-slate-800">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* New Chat Action Button */}
      <div className="pt-0.5">
        <Button
          onClick={onNewChat}
          variant="outline"
          className="w-full justify-start gap-2.5 h-[38px] px-3 rounded-[7px] border-cyan-400 bg-white text-slate-800 font-normal shadow-[0_1px_2px_rgba(0,180,216,0.08)] hover:bg-cyan-50/30 hover:border-cyan-500 hover:text-cyan-950 transition-all duration-150 active:scale-[0.99]"
        >
          <span className="text-slate-700">
            <AddLinearIcon size={17} className="stroke-[2.2]" />
          </span>
          <span className="text-[13px] font-normal leading-snug tracking-tight text-slate-800">
            New Chat
          </span>
        </Button>
      </div>
    </div>
  )
}
