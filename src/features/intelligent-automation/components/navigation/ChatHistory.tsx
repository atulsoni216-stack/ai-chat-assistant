import React from "react"
import { ChatHistoryItem } from "./ChatHistoryItem"
import { ChatItem } from "../../types"

interface ChatHistoryProps {
  items: ChatItem[]
  activeChatId?: string
  onSelectChat: (id: string) => void
  onRenameChat?: (id: string, newTitle: string) => void
  onDeleteChat?: (id: string) => void
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  items,
  activeChatId,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}) => {
  const recentItems = items.filter((item) => item.section === "RECENT")
  const yesterdayItems = items.filter((item) => item.section === "YESTERDAY")

  return (
    <div className="flex-1 overflow-y-auto px-3 py-1 custom-scrollbar space-y-4">
      {/* RECENT Section */}
      {recentItems.length > 0 && (
        <div className="space-y-1">
          <div className="px-3 py-1">
            <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase select-none">
              Recent
            </h3>
          </div>
          <div className="space-y-0.5">
            {recentItems.map((item) => (
              <ChatHistoryItem
                key={item.id}
                item={{
                  ...item,
                  isActive: item.id === activeChatId,
                }}
                onSelect={onSelectChat}
                onRename={onRenameChat}
                onDelete={onDeleteChat}
              />
            ))}
          </div>
        </div>
      )}

      {/* YESTERDAY Section */}
      {yesterdayItems.length > 0 && (
        <div className="space-y-1">
          <div className="px-3 py-1">
            <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase select-none">
              Yesterday
            </h3>
          </div>
          <div className="space-y-0.5">
            {yesterdayItems.map((item) => (
              <ChatHistoryItem
                key={item.id}
                item={{
                  ...item,
                  isActive: item.id === activeChatId,
                }}
                onSelect={onSelectChat}
                onRename={onRenameChat}
                onDelete={onDeleteChat}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

