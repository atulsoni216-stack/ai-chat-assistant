import React, { useState } from "react"
import { Sidebar } from "./Sidebar"
import { MobileSidebar } from "./MobileSidebar"
import { CelebalLogo } from "./CelebalLogo"
import { ChatItem, UserProfileData } from "../../types"
import { HamburgerMenuLinearIcon } from "@solar-icons/react"

interface AppShellProps {
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
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({
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
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F9FB]">
      {/* Desktop Sidebar (hidden on mobile/tablet below lg) */}
      <Sidebar
        className="hidden md:flex flex-shrink-0"
        chatItems={chatItems}
        activeChatId={activeChatId}
        user={user}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewChat={onNewChat}
        onSelectChat={onSelectChat}
        onRenameChat={onRenameChat}
        onDeleteChat={onDeleteChat}
        onLogout={onLogout}
        activeNav={activeNav}
        onSelectNav={onSelectNav}
      />

      {/* Mobile Drawer (Sheet) */}
      <MobileSidebar
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        chatItems={chatItems}
        activeChatId={activeChatId}
        user={user}
        onNewChat={onNewChat}
        onSelectChat={onSelectChat}
        onRenameChat={onRenameChat}
        onDeleteChat={onDeleteChat}
        onLogout={onLogout}
        activeNav={activeNav}
        onSelectNav={onSelectNav}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-2 sm:p-3 md:p-3 bg-transparent">
        {/* Mobile Header Bar */}
        <div className="flex md:hidden items-center justify-between pb-2 px-2">
          <CelebalLogo />
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <HamburgerMenuLinearIcon size={22} />
          </button>
        </div>

        {/* Floating White Main Card with Large Rounded Corners */}
        <main className="relative flex-1 flex flex-col justify-between overflow-y-auto bg-white rounded-[20px] md:rounded-[24px] border border-slate-200/70 shadow-[0_2px_16px_rgba(0,0,0,0.02)] px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-8 pb-0 ambient-bottom-glow">
          {children}
        </main>
      </div>
    </div>
  )
}

