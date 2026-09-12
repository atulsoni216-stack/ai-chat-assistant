import React from "react"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { CelebalLogo } from "./CelebalLogo"
import { SidebarNav } from "../navigation/SidebarNav"
import { ChatHistory } from "../navigation/ChatHistory"
import { UserProfile } from "../navigation/UserProfile"
import { ChatItem, UserProfileData } from "../../types"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  chatItems: ChatItem[]
  activeChatId?: string
  user: UserProfileData
  onNewChat?: () => void
  onSelectChat: (id: string) => void
  onRenameChat?: (id: string, newTitle: string) => void
  onDeleteChat?: (id: string) => void
  onLogout?: () => void
  activeNav?: string
  onSelectNav?: (id: string) => void
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  chatItems,
  activeChatId,
  user,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onLogout,
  activeNav,
  onSelectNav,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[290px] p-0 flex flex-col bg-[#F5F9FB] border-0">
        <SheetHeader className="p-3.5 flex flex-row items-center justify-between">
          <CelebalLogo />
        </SheetHeader>

        <SidebarNav
          onNewChat={() => {
            onNewChat?.()
            onClose()
          }}
          activeNav={activeNav}
          onSelectNav={(id) => {
            onSelectNav?.(id)
            onClose()
          }}
        />

        <ChatHistory
          items={chatItems}
          activeChatId={activeChatId}
          onSelectChat={(id) => {
            onSelectChat(id)
            onClose()
          }}
          onRenameChat={onRenameChat}
          onDeleteChat={onDeleteChat}
        />

        <UserProfile user={user} onLogout={onLogout} />
      </SheetContent>
    </Sheet>
  )
}
