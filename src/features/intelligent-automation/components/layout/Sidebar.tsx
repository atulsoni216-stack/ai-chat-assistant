import React from "react"
import { CelebalLogo } from "./CelebalLogo"
import { SidebarNav } from "../navigation/SidebarNav"
import { ChatHistory } from "../navigation/ChatHistory"
import { UserProfile } from "../navigation/UserProfile"
import { ChatItem, UserProfileData } from "../../types"
import {
  SidebarCodeLinearIcon,
  AddLinearIcon,
  BranchingPathsDownLinearIcon,
  ChecklistMinimalisticLinearIcon,
} from "@solar-icons/react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  chatItems: ChatItem[]
  activeChatId?: string
  user: UserProfileData
  collapsed?: boolean
  onToggleCollapse?: () => void
  onNewChat?: () => void
  onSelectChat: (id: string) => void
  onRenameChat?: (id: string, newTitle: string) => void
  onDeleteChat?: (id: string) => void
  onTogglePin?: (id: string) => void
  onLogout?: () => void
  activeNav?: string
  onSelectNav?: (id: string) => void
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({
  chatItems,
  activeChatId,
  user,
  collapsed = false,
  onToggleCollapse,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onTogglePin,
  onLogout,
  activeNav,
  onSelectNav,
  className = "",
}) => {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-transparent border-none transition-all duration-300 ease-in-out select-none relative z-20",
        collapsed ? "w-16" : "w-[280px] lg:w-[295px]",
        className
      )}
    >
      {/* Top Header with Brand and Toggle */}
      <div className={cn(
        "flex items-center h-14 border-b border-transparent",
        collapsed ? "justify-center px-2" : "justify-between px-3.5"
      )}>
        {!collapsed && <CelebalLogo />}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md text-slate-600 hover:text-slate-950 hover:bg-slate-200/70 transition-colors focus:outline-none"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <SidebarCodeLinearIcon size={19} className="stroke-[2.1]" />
        </button>
      </div>

      {!collapsed ? (
        <>
          {/* Main Navigation & New Chat */}
          <SidebarNav
            onNewChat={onNewChat}
            activeNav={activeNav}
            onSelectNav={onSelectNav}
          />

          {/* Chat History Lists (RECENT & YESTERDAY) */}
          <ChatHistory
            items={chatItems}
            activeChatId={activeChatId}
            onSelectChat={onSelectChat}
            onRenameChat={onRenameChat}
            onDeleteChat={onDeleteChat}
            onTogglePin={onTogglePin}
          />

          {/* User Profile Card */}
          <UserProfile user={user} onLogout={onLogout} />
        </>
      ) : (
        /* Collapsed Icon Bar with Crisp Square Buttons */
        <div className="flex flex-col items-center flex-1 py-3 justify-between">
          <div className="flex flex-col items-center space-y-3">
            {/* Collapsed Nav Icons */}
            <button
              onClick={() => onSelectNav?.("workflows")}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-[7px] text-slate-700 hover:bg-slate-200/60 transition-colors",
                activeNav === "workflows" && "bg-white text-slate-900 shadow-xs border border-slate-200"
              )}
              title="Workflows"
            >
              <BranchingPathsDownLinearIcon size={18} className="stroke-[1.8]" />
            </button>

            <button
              onClick={() => onSelectNav?.("sop-rulebook")}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-[7px] text-slate-700 hover:bg-slate-200/60 transition-colors",
                activeNav === "sop-rulebook" && "bg-white text-slate-900 shadow-xs border border-slate-200"
              )}
              title="SOP & Rulebook"
            >
              <ChecklistMinimalisticLinearIcon size={18} className="stroke-[1.8]" />
            </button>

            {/* Collapsed Square Add Chat Button */}
            <button
              onClick={onNewChat}
              className="w-9 h-9 flex items-center justify-center rounded-[7px] border border-cyan-400 bg-white text-slate-800 shadow-[0_1px_2px_rgba(0,180,216,0.1)] hover:bg-cyan-50/40 hover:border-cyan-500 hover:text-cyan-950 transition-all duration-150 active:scale-95"
              title="New Chat"
            >
              <AddLinearIcon size={18} className="stroke-[2.2]" />
            </button>
          </div>

          {/* Collapsed User Avatar */}
          <div className="p-1">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full ring-1 ring-slate-200 object-cover cursor-pointer hover:ring-cyan-400 transition-all"
              title={user.name}
              onClick={onLogout}
            />
          </div>
        </div>
      )}
    </aside>
  )
}
