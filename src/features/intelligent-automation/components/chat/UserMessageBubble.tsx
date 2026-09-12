import React, { useState, useRef, useEffect } from "react"
import { FileTextLinearIcon, PenLinearIcon, CheckCircleBoldIcon } from "@solar-icons/react"
import { Button } from "@/components/ui/button"

interface UserMessageBubbleProps {
  message?: string
  attachmentName?: string
  attachmentType?: string
  onSave?: (newMessage: string) => void
  onViewAttachment?: () => void
}

export const UserMessageBubble: React.FC<UserMessageBubbleProps> = ({
  message = "Hi, can you read my documents and summarize?",
  attachmentName = "Emma Resume (1).pdf",
  attachmentType = "PDF",
  onSave,
  onViewAttachment,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    setEditText(message)
  }, [message])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [isEditing])

  const handleSave = () => {
    if (editText.trim()) {
      onSave?.(editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(message)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className="flex flex-col items-end space-y-2 mb-6 w-full select-none">
      {/* Attached Document Card */}
      {attachmentName && (
        <button
          onClick={onViewAttachment}
          className="group flex items-center gap-2.5 px-3 py-2 rounded-[9px] bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-cyan-300 hover:bg-cyan-50/20 transition-all text-left focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-center w-6 h-6 rounded bg-red-50 text-red-600 flex-shrink-0">
            <FileTextLinearIcon size={14} className="stroke-[2]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-800 truncate group-hover:text-cyan-900 transition-colors">
              {attachmentName}
            </span>
            <span className="text-[9.5px] text-slate-400 uppercase tracking-wider">
              {attachmentType}
            </span>
          </div>
        </button>
      )}

      {/* Message Text Bubble / In-place Edit Form */}
      <div className="flex flex-col items-end w-full max-w-[85%] sm:max-w-[70%]">
        {!isEditing ? (
          <>
            <div className="px-4 py-2.5 rounded-[14px] bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-slate-800 text-[13px] sm:text-[13.5px] leading-relaxed tracking-tight break-words">
              {message}
            </div>

            {/* Bottom Action Toolbar under user's query */}
            <div className="flex items-center gap-1 pt-1 pr-0.5 select-none">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                title="Edit message"
              >
                <PenLinearIcon size={15} className="stroke-[1.8]" />
              </button>
            </div>
          </>
        ) : (
          /* Inline Edit Field */
          <div className="flex flex-col gap-2 w-full bg-white p-3 rounded-[14px] border-2 border-cyan-400 shadow-md">
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value)
                e.target.style.height = "auto"
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              onKeyDown={handleKeyDown}
              rows={2}
              className="w-full bg-transparent border-0 resize-none text-[13px] sm:text-[13.5px] font-normal text-slate-800 focus:outline-none leading-relaxed tracking-tight selection:bg-cyan-100 p-0"
              placeholder="Edit your message..."
            />

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className="text-[13px] font-normal text-slate-600 hover:text-slate-900 px-2 py-1 transition-colors focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-[#008DA5] hover:bg-[#00798F] text-white text-[12.5px] font-medium shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <CheckCircleBoldIcon size={14} className="text-white flex-shrink-0" />
                <span>Save & Update</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
