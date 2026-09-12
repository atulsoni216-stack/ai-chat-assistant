import React, { useState } from "react"
import { AppShell } from "../components/layout/AppShell"
import { WelcomeState } from "../components/chat/WelcomeState"
import { ChatComposer } from "../components/chat/ChatComposer"
import { ConversationView } from "../components/chat/ConversationView"
import { WorkflowsView } from "../components/workflows/WorkflowsView"
import { SopRulebookView } from "../components/sop/SopRulebookView"
import { LoginPage } from "../components/auth/LoginPage"
import { initialChatHistory, currentUser } from "../data/chatHistory"
import { ChatItem, UploadedFileItem } from "../types"

export const IntelligentAutomationHome: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [chatItems, setChatItems] = useState<ChatItem[]>(initialChatHistory)
  const [activeChatId, setActiveChatId] = useState<string>("")
  const [activeNav, setActiveNav] = useState<string>("")
  const [activePrompt, setActivePrompt] = useState<string>("")
  const [isThinkingInitially, setIsThinkingInitially] = useState<boolean>(false)
  const [isWelcomeMode, setIsWelcomeMode] = useState<boolean>(true)

  const handleLogin = (email?: string) => {
    setIsAuthenticated(true)
    setIsWelcomeMode(true)
    setActiveChatId("")
    setActiveNav("")
    setIsThinkingInitially(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleNewChat = () => {
    setActiveNav("")
    setActiveChatId("")
    setIsWelcomeMode(true)
    setIsThinkingInitially(false)
  }

  const handleSelectChat = (id: string) => {
    setActiveNav("")
    setActiveChatId(id)
    setIsWelcomeMode(false)
    setIsThinkingInitially(false)
    const chat = chatItems.find((c) => c.id === id)
    if (chat) {
      setActivePrompt(chat.title)
    }
  }

  const handleSelectNav = (id: string) => {
    setActiveNav(id)
    setActiveChatId("")
    setIsWelcomeMode(false)
    setIsThinkingInitially(false)
  }

  const handleRenameChat = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return
    setChatItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    )
  }

  const handleDeleteChat = (id: string) => {
    setChatItems((prev) => prev.filter((item) => item.id !== id))
    if (activeChatId === id) {
      const remaining = chatItems.filter((item) => item.id !== id)
      if (remaining.length > 0) {
        setActiveChatId(remaining[0].id)
        setActivePrompt(remaining[0].title)
      } else {
        setActiveChatId("")
        setIsWelcomeMode(true)
      }
    }
  }

  const handleSendMessage = (
    text: string,
    files: UploadedFileItem[],
    linkedIn: boolean
  ) => {
    if (!text.trim() && files.length === 0) return

    const chatTitle = text.trim() || files[0]?.name || "New Chat"

    const newId = `chat-${Date.now()}`
    const newChat: ChatItem = {
      id: newId,
      title: chatTitle,
      section: "RECENT",
      isActive: true,
    }
    setChatItems((prev) => [
      newChat,
      ...prev.map((c) => ({ ...c, isActive: false })),
    ])
    setActiveChatId(newId)
    setActivePrompt(chatTitle)
    setIsWelcomeMode(false)
    setActiveNav("")
    setIsThinkingInitially(true)
  }

  const activeChat = chatItems.find((c) => c.id === activeChatId)

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <AppShell
      chatItems={chatItems}
      activeChatId={activeChatId}
      user={currentUser}
      onNewChat={handleNewChat}
      onSelectChat={handleSelectChat}
      onRenameChat={handleRenameChat}
      onDeleteChat={handleDeleteChat}
      activeNav={activeNav}
      onSelectNav={handleSelectNav}
      onLogout={handleLogout}
    >
      {/* Dynamic Content Area: Workflows, SOP & Rulebook, Welcome State, or Active Conversation View */}
      {activeNav === "workflows" ? (
        <WorkflowsView />
      ) : activeNav === "sop-rulebook" ? (
        <SopRulebookView />
      ) : isWelcomeMode ? (
        <div className="flex-1 flex flex-col justify-center items-center my-auto py-8 space-y-8 md:space-y-10 w-full">
          {/* Sparkle Hero Section */}
          <WelcomeState />

          {/* Floating Input Composer */}
          <ChatComposer
            initialValue=""
            placeholder="Ask anything or provide instructions..."
            enableBeamAnimation={true}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          <ConversationView
            key={activeChatId}
            chatTitle={activeChat?.title || "AI Multi-Agent"}
            promptMessage={activePrompt}
            isThinkingInitially={isThinkingInitially}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}

      {/* Footer Note - Vertically centered with user profile card */}
      <footer className="w-full text-center h-[50px] flex items-center justify-center select-none relative z-10 pb-0 flex-shrink-0">
        <p className="text-xs text-slate-500 font-normal">
          Beyond Assistance: AI That Acts. Check our{" "}
          <a
            href="#terms"
            className="font-semibold text-slate-700 hover:text-cyan-600 underline underline-offset-2 transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              alert("Celebal Intelligent Automation - Terms & Conditions")
            }}
          >
            Terms & Conditions.
          </a>
        </p>
      </footer>
    </AppShell>
  )
}

