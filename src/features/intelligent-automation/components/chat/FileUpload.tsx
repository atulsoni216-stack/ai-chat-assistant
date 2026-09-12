import React, { useRef } from "react"
import { Paperclip2LinearIcon } from "@solar-icons/react"
import { Button } from "@/components/ui/button"
import { UploadedFileItem } from "../../types"

interface FileUploadProps {
  files?: UploadedFileItem[]
  onAddFiles: (files: UploadedFileItem[]) => void
  onRemoveFile?: (fileId: string) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onAddFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: UploadedFileItem[] = Array.from(e.target.files).map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        size: f.size,
        type: f.type,
      }))
      onAddFiles(newFiles)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex items-center flex-shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Files Button - Compact icon-only on mobile, icon+text on sm+ */}
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="h-[30px] px-2 sm:px-2.5 rounded-[6px] border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300 text-xs font-medium gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all active:scale-95 flex items-center justify-center flex-shrink-0 cursor-pointer"
        title="Upload files"
        aria-label="Upload files"
      >
        <Paperclip2LinearIcon size={16} className="text-slate-500 stroke-[1.8]" />
        <span className="hidden sm:inline text-[12px] font-normal text-slate-700">Upload files</span>
      </Button>
    </div>
  )
}
