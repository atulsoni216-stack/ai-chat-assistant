import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  StarsLinearIcon,
  SquareShareLineLinearIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"

export interface NotificationItem {
  id: string
  type: "achievement" | "file" | "flow_update" | "bot_query"
  title?: string
  message?: string
  userAvatar?: string
  userName?: string
  fileName?: string
  targetPhase?: string
  quoteText?: string
  timeAgo: string
  unread: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "achievement",
    message:
      "We just hit 250 successful outcomes created for our organization! We're incredibly proud of the team's hard work and dedication! 🎉",
    timeAgo: "8 min ago",
    unread: true,
  },
  {
    id: "notif-2",
    type: "file",
    userName: "Simran Gupta (User)",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    fileName: "maria_hill_resume.pdf",
    targetPhase: "Phase 1",
    timeAgo: "17 min ago",
    unread: true,
  },
  {
    id: "notif-3",
    type: "flow_update",
    userName: "General Bot",
    targetPhase: "Phase 2",
    timeAgo: "45 min ago",
    unread: false,
  },
  {
    id: "notif-4",
    type: "bot_query",
    userName: "General Bot",
    targetPhase: "Phase 1",
    quoteText:
      "The ideal candidate will be responsible for designing user-friendly and visually appealing interfaces for web and mobile applications. The role involves creating wireframes, prototypes, and final designs while collaborating closely with developers and product managers.",
    timeAgo: "1 day ago",
    unread: false,
  },
]

interface NotificationsPopoverProps {
  isOpen: boolean
  onClose: () => void
  onViewFile?: (fileName: string) => void
  onGotoChat?: (chatName: string) => void
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  onViewFile,
  onGotoChat,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute right-1 top-12 z-50 w-[360px] sm:w-[410px] max-h-[580px] bg-white rounded-[16px] border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden select-none"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 flex-shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-semibold text-[#323232] tracking-tight font-sans">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#FF6B6B] text-white text-[11px] font-semibold flex items-center justify-center leading-none shadow-xs">
                  {unreadCount}
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-7 px-2.5 text-[11.5px] font-medium border-[#0091FF] text-[#0091FF] hover:bg-blue-50/70 rounded-[6px]"
            >
              Mark all as read
            </Button>
          </div>

          {/* Notifications Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar max-h-[500px]">
            {notifications.map((item) => {
              if (item.type === "achievement") {
                return (
                  <div
                    key={item.id}
                    className={`p-4 flex items-start gap-3 transition-colors ${
                      item.unread ? "bg-[#F9FBFF]" : "hover:bg-slate-50/60"
                    }`}
                  >
                    {/* Achievement Icon "A" */}
                    <div className="w-8 h-8 rounded-[8px] bg-[#34A853] text-white font-semibold flex items-center justify-center text-[13px] flex-shrink-0 shadow-xs">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] text-slate-800 font-normal leading-relaxed">
                        {item.message}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                )
              }

              if (item.type === "file") {
                return (
                  <div
                    key={item.id}
                    className={`p-4 flex items-start gap-3 transition-colors ${
                      item.unread ? "bg-[#F9FBFF]" : "hover:bg-slate-50/60"
                    }`}
                  >
                    {/* User Profile Avatar */}
                    <img
                      src={item.userAvatar}
                      alt={item.userName}
                      className="w-8 h-8 rounded-[8px] object-cover ring-1 ring-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-slate-900 leading-snug">
                        {item.userName}
                      </h4>
                      <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                        Uploaded the file{" "}
                        <span className="font-medium text-slate-800">
                          “{item.fileName}”
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-slate-800">
                          {item.targetPhase}
                        </span>
                      </p>
                      <div className="mt-2.5">
                        <Button
                          size="sm"
                          onClick={() =>
                            onViewFile?.(item.fileName || "maria_hill_resume.pdf")
                          }
                          className="h-6 px-2.5 text-[11px] font-medium bg-[#0091FF] hover:bg-[#0080E6] text-white rounded-[6px] shadow-xs"
                        >
                          View File
                        </Button>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                )
              }

              if (item.type === "flow_update") {
                return (
                  <div
                    key={item.id}
                    className="p-4 flex items-start gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Bot Sparkle Avatar */}
                    <div className="w-8 h-8 rounded-[8px] bg-cyan-50 text-cyan-500 flex items-center justify-center flex-shrink-0 ring-1 ring-cyan-100">
                      <StarsLinearIcon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-slate-900 leading-snug">
                        {item.userName}
                      </h4>
                      <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">
                        A{" "}
                        <span className="font-semibold text-slate-800">
                          “New User Flow”
                        </span>{" "}
                        has been updated in the{" "}
                        <span className="font-semibold text-slate-800">
                          {item.targetPhase}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onGotoChat?.("Flow Details")}
                          className="h-6 px-2 text-[11px] font-medium border-slate-200 hover:bg-slate-50 text-slate-700 rounded-[6px] gap-1"
                        >
                          <span>View Flow</span>
                          <SquareShareLineLinearIcon size={11} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onGotoChat?.("Phase 2")}
                          className="h-6 px-2 text-[11px] font-medium border-slate-200 hover:bg-slate-50 text-slate-700 rounded-[6px] gap-1"
                        >
                          <span>Goto Chat</span>
                          <SquareShareLineLinearIcon size={11} />
                        </Button>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                )
              }

              if (item.type === "bot_query") {
                return (
                  <div
                    key={item.id}
                    className="p-4 flex items-start gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Bot Sparkle Avatar */}
                    <div className="w-8 h-8 rounded-[8px] bg-cyan-50 text-cyan-500 flex items-center justify-center flex-shrink-0 ring-1 ring-cyan-100">
                      <StarsLinearIcon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-slate-900 leading-snug">
                        {item.userName}
                      </h4>
                      <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">
                        Added a query to{" "}
                        <span className="font-semibold text-slate-800">
                          {item.targetPhase}
                        </span>
                      </p>

                      {/* Quoted Query Box */}
                      <div className="border-l-2 border-[#0091FF] pl-3 py-1.5 my-2.5 bg-slate-50/70 rounded-r-md">
                        <p className="text-[11.5px] text-slate-600 leading-relaxed">
                          {item.quoteText}
                        </p>
                      </div>

                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onGotoChat?.("Phase 1")}
                          className="h-6 px-2 text-[11px] font-medium border-slate-200 hover:bg-slate-50 text-slate-700 rounded-[6px] gap-1"
                        >
                          <span>Goto Chat</span>
                          <SquareShareLineLinearIcon size={11} />
                        </Button>
                      </div>

                      <span className="text-[11px] text-slate-400 mt-2 block">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

