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
    <div className="flex flex-col gap-2 pt-2 pb-0.5 mt-auto w-full">
      {/* Uploaded File Chips row (if any files selected) */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] bg-cyan-50/70 border border-cyan-200/80 text-cyan-950 text-xs font-medium animate-in fade-in zoom-in-95"
            >
              <span className="max-w-[120px] truncate text-[11px]">{file.name}</span>
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="p-0.5 rounded-[4px] hover:bg-cyan-200/60 text-cyan-700 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Single Row Toolbar: Upload, LinkedIn, and Send button */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Left side actions */}
        <div className="flex items-center gap-2 sm:gap-3.5 flex-shrink-0">
          <FileUpload
            files={[]}
            onAddFiles={onAddFiles}
            onRemoveFile={onRemoveFile}
          />

          <div className="h-4 w-px bg-slate-200 flex-shrink-0" />

          <LinkedInConnect
            enabled={linkedInEnabled}
            onChange={onLinkedInChange}
          />
        </div>

        {/* Right side: Send Button */}
        <div className="flex items-center ml-auto flex-shrink-0">
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full bg-[#00b4d8] text-white shadow-[0_2px_8px_rgba(0,180,216,0.35)] transition-all duration-200 flex-shrink-0",
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
    </div>
  )
}

