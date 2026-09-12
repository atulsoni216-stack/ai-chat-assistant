import React, { useState } from "react"
import { MenuDotsBoldIcon } from "@solar-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChatItem } from "../../types"
import { cn } from "@/lib/utils"
import { Pencil, Trash2, Pin, Copy } from "lucide-react"

interface ChatHistoryItemProps {
  item: ChatItem
  onSelect: (id: string) => void
  onRename?: (id: string, newTitle: string) => void
  onDelete?: (id: string) => void
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  item,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      onRename?.(item.id, editTitle)
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditTitle(item.title)
    }
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isEditing && onSelect(item.id)}
      className={cn(
        "group relative flex items-center justify-between w-full h-[38px] px-3 rounded-[7px] text-[13px] font-normal cursor-pointer transition-all duration-150 select-none",
        item.isActive
          ? "bg-white border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-slate-800"
          : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
      )}
    >
      {/* Title / Inline edit - font weight remains identical between active and non-active states */}
      <div className="flex-1 min-w-0 pr-1.5">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsEditing(false)
              onRename?.(item.id, editTitle)
            }}
            autoFocus
            className="w-full bg-white px-1.5 py-0.5 rounded-[5px] border border-cyan-400 text-[13px] text-slate-800 font-normal focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="block truncate text-[13px] font-normal leading-snug tracking-tight text-slate-800">
            {item.title}
          </span>
        )}
      </div>

      {/* Right controls: badge & menu */}
      <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        {item.unreadCount !== undefined && item.unreadCount > 0 && (
          <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#00b4d8] text-white text-[10px] font-medium leading-none">
            {item.unreadCount}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "p-0.5 rounded-[4px] text-slate-400 hover:text-slate-700 transition-opacity duration-150 focus:opacity-100 focus:outline-none",
                isHovered || item.isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
              aria-label={`Options for ${item.title}`}
            >
              <MenuDotsBoldIcon size={14} className="text-slate-400 hover:text-slate-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-[8px]">
            <DropdownMenuItem onClick={() => setIsEditing(true)} className="gap-2 rounded-[6px]">
              <Pencil className="h-3.5 w-3.5 text-slate-500" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.title)} className="gap-2 rounded-[6px]">
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>Copy title</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 rounded-[6px]">
              <Pin className="h-3.5 w-3.5 text-slate-500" />
              <span>Pin chat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(item.id)}
              className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 rounded-[6px]"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
