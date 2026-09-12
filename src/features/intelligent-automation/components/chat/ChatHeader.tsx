import {
  BellLinearIcon,
  InfoCircleLinearIcon,
  NotesLinearIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  title?: string
  onToggleAttachments?: () => void
  onToggleInfo?: () => void
  onToggleNotifications?: () => void
  attachmentsCount?: number
  unreadNotificationsCount?: number
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "AI Multi-Agent",
  onToggleAttachments,
  onToggleInfo,
  onToggleNotifications,
  attachmentsCount = 4,
  unreadNotificationsCount = 2,
}) => {
  return (
    <div className="relative flex items-center justify-between pb-4 pt-1 px-1 border-b border-slate-100/80 select-none">
      {/* Brand Title / Conversation Title */}
      <div className="flex items-center gap-2">
        <h2 className="text-[#323232] text-[17px] sm:text-[18px] font-semibold tracking-tight font-sans">
          {title}
        </h2>
      </div>

      {/* Action Icons on the right */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Notification Bell button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleNotifications}
          className="relative h-8 w-8 text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-[7px] transition-colors cursor-pointer"
          title="Notifications"
        >
          <BellLinearIcon size={19} className="stroke-[1.8]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </Button>

        {/* Info button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInfo}
          className="h-8 w-8 text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-[7px] transition-colors"
          title="Flow Detailed Info"
        >
          <InfoCircleLinearIcon size={19} className="stroke-[1.8]" />
        </Button>

        {/* Uploaded attachments toggle button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleAttachments}
          className="relative h-8 w-8 text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-[7px] transition-colors"
          title="Uploaded Attachments"
        >
          <NotesLinearIcon size={19} className="stroke-[1.8]" />
          {attachmentsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 ring-2 ring-white" />
          )}
        </Button>
      </div>
    </div>
  )
}

