import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileTextLinearIcon,
  CloseCircleLinearIcon,
} from "@solar-icons/react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface AttachmentItem {
  id: string
  name: string
  size: string
  enabled: boolean
}

interface AttachmentsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const AttachmentsDrawer: React.FC<AttachmentsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [attachments, setAttachments] = useState<AttachmentItem[]>([
    {
      id: "att-1",
      name: "Melisa Salomon Resume.pdf",
      size: "200 KB",
      enabled: true,
    },
    {
      id: "att-2",
      name: "Emma Stone Resume.pdf",
      size: "200 KB",
      enabled: true,
    },
    {
      id: "att-3",
      name: "Melisa Salomon Resume.pdf",
      size: "200 KB",
      enabled: true,
    },
    {
      id: "att-4",
      name: "Emma Stone Resume.pdf",
      size: "200 KB",
      enabled: false,
    },
    {
      id: "att-5",
      name: "Melisa Salomon Resume.pdf",
      size: "200 KB",
      enabled: false,
    },
    {
      id: "att-6",
      name: "Emma Stone Resume.pdf",
      size: "200 KB",
      enabled: false,
    },
    {
      id: "att-7",
      name: "Melisa Salomon Resume.pdf",
      size: "200 KB",
      enabled: false,
    },
    {
      id: "att-8",
      name: "Emma Stone Resume.pdf",
      size: "200 KB",
      enabled: false,
    },
  ])

  const toggleAttachment = (id: string) => {
    setAttachments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute top-12 right-2 sm:right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-[300px] sm:w-[320px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[13.5px] font-semibold text-slate-900 tracking-tight">
                Uploaded Attachments
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 rounded-full text-slate-400 hover:text-slate-700"
              >
                <CloseCircleLinearIcon size={16} />
              </Button>
            </div>

            {/* Attachments List */}
            <div className="mt-3 space-y-2.5 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {attachments.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-red-50 text-red-600 flex-shrink-0">
                      <FileTextLinearIcon size={15} className="stroke-[2]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-medium text-slate-800 truncate leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <Switch
                    checked={item.enabled}
                    onCheckedChange={() => toggleAttachment(item.id)}
                    className="data-[state=checked]:bg-cyan-500 scale-75"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

