import React, { useRef } from "react"
import { Paperclip2LinearIcon } from "@solar-icons/react"
import { Button } from "@/components/ui/button"
import { UploadedFileItem } from "../../types"
import { X, FileText } from "lucide-react"

interface FileUploadProps {
  files: UploadedFileItem[]
  onAddFiles: (files: UploadedFileItem[]) => void
  onRemoveFile: (fileId: string) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
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
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Files Button - Crisp rectangular field with subtle rounded-[6px] corners */}
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="h-[30px] px-2.5 rounded-[6px] border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300 text-xs font-medium gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all active:scale-95"
      >
        <Paperclip2LinearIcon size={15} className="text-slate-500 stroke-[1.8]" />
        <span className="text-[12px] font-normal text-slate-700">Upload files</span>
      </Button>

      {/* Uploaded File Chips */}
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-cyan-50/70 border border-cyan-200/80 text-cyan-950 text-xs font-medium animate-in fade-in zoom-in-95"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-600" />
          <span className="max-w-[120px] truncate text-[11px]">{file.name}</span>
          <button
            type="button"
            onClick={() => onRemoveFile(file.id)}
            className="p-0.5 rounded-[4px] hover:bg-cyan-200/60 text-cyan-700 transition-colors"
            aria-label={`Remove ${file.name}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
