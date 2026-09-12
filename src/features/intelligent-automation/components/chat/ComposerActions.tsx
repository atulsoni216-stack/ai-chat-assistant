import React from "react"
import { FileUpload } from "./FileUpload"
import { LinkedInConnect } from "./LinkedInConnect"
import { UploadedFileItem } from "../../types"
import { cn } from "@/lib/utils"

interface ComposerActionsProps {
  files: UploadedFileItem[]
  onAddFiles: (files: UploadedFileItem[]) => void
  onRemoveFile: (fileId: string) => void
  linkedInEnabled: boolean
  onLinkedInChange: (enabled: boolean) => void
  onSend: () => void
  canSend: boolean
}

export const ComposerActions: React.FC<ComposerActionsProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
  linkedInEnabled,
  onLinkedInChange,
  onSend,
  canSend,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 px-1 mt-auto">
      {/* Left side actions */}
      <div className="flex flex-wrap items-center gap-4">
        <FileUpload
          files={files}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
        />

        <div className="hidden sm:block h-4 w-px bg-slate-200" />

        <LinkedInConnect
          enabled={linkedInEnabled}
          onChange={onLinkedInChange}
        />
      </div>

      {/* Right side: Send Button */}
      <div className="flex items-center ml-auto">
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full bg-[#00b4d8] text-white shadow-[0_2px_8px_rgba(0,180,216,0.35)] transition-all duration-200",
            canSend
              ? "hover:bg-[#0096c7] hover:scale-105 active:scale-95 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          )}
          title="Send message"
          aria-label="Send message"
        >
          {/* Cyan plane/send icon matching reference */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current ml-0.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

