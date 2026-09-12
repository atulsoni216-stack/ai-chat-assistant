import React from "react"
import { Logout2LinearIcon } from "@solar-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfileData } from "../../types"

interface UserProfileProps {
  user: UserProfileData
  onLogout?: () => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="p-3 mt-auto">
      <button
        type="button"
        onClick={onLogout}
        className="group flex items-center justify-between p-2 rounded-[9px] bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:bg-slate-50/60 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-rose-400/30 cursor-pointer active:scale-[0.99]"
        title="Sign out"
        aria-label="Sign out"
      >
        {/* User Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="h-8 w-8 ring-1 ring-slate-200">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-rose-100 text-rose-700 text-xs font-semibold">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-slate-800 truncate leading-tight group-hover:text-slate-950 transition-colors">
              {user.name}
            </span>
            <span className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
              {user.email}
            </span>
          </div>
        </div>

        {/* Logout icon badge */}
        <div
          className="flex items-center justify-center h-7 w-7 rounded-full bg-rose-50 text-rose-500 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors flex-shrink-0"
        >
          <Logout2LinearIcon size={15} className="stroke-[2]" />
        </div>
      </button>
    </div>
  )
}
