import React, { useState } from "react"
import {
  AddLinearIcon,
  PenLinearIcon,
  TrashBinTrashLinearIcon,
  AltArrowLeftLinearIcon,
  AltArrowRightLinearIcon,
  AltArrowDownLinearIcon,
} from "@solar-icons/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export interface RuleItem {
  id: string
  name: string
  points: string[]
}

const initialRules: RuleItem[] = [
  {
    id: "rule-1",
    name: "Name",
    points: [
      "Ensure full legal name is entered and formatted correctly.",
      "Match with government-issued ID for verification.",
      "Check for duplicates or alias use in the system.",
    ],
  },
  {
    id: "rule-2",
    name: "Location",
    points: [
      "Capture current and permanent addresses.",
      "Standardize location format (e.g., ISO codes).",
      "Tag eligibility for remote/on-site roles.",
    ],
  },
  {
    id: "rule-3",
    name: "Project",
    points: [
      "Assign valid project name and code.",
      "Define role/responsibility clearly.",
      "Confirm alignment with timeline and required documents (e.g., NDAs).",
    ],
  },
  {
    id: "rule-4",
    name: "Experience",
    points: [
      "Enter total relevant experience with correct date ranges.",
      "Validate previous job titles and companies.",
      "Align with project requirements or required skills.",
    ],
  },
  {
    id: "rule-5",
    name: "Others",
    points: [
      "Emergency Contact",
      "ID Details",
      "Missing Data / Compliance",
    ],
  },
]

export const SopRulebookView: React.FC = () => {
  const [rules, setRules] = useState<RuleItem[]>(initialRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<RuleItem | null>(null)
  const [formName, setFormName] = useState("")
  const [formPointsText, setFormPointsText] = useState("")

  const handleOpenAdd = () => {
    setEditingRule(null)
    setFormName("")
    setFormPointsText("")
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (rule: RuleItem) => {
    setEditingRule(rule)
    setFormName(rule.name)
    setFormPointsText(rule.points.join("\n"))
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSaveRule = () => {
    if (!formName.trim()) return

    const points = formPointsText
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    if (editingRule) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id
            ? { ...r, name: formName.trim(), points: points.length > 0 ? points : [formName] }
            : r
        )
      )
    } else {
      const newRule: RuleItem = {
        id: `rule-${Date.now()}`,
        name: formName.trim(),
        points: points.length > 0 ? points : ["Standard compliance requirements verified."],
      }
      setRules((prev) => [...prev, newRule])
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full px-2 sm:px-6 py-4 overflow-y-auto custom-scrollbar select-none justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-semibold text-[#323232] tracking-tight font-sans">
            SOP & Rulebook
          </h2>

          <Button
            onClick={handleOpenAdd}
            className="h-9 px-4 rounded-[8px] bg-[#0088FF] hover:bg-[#0077E6] text-white font-medium text-[13px] flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
          >
            <AddLinearIcon size={16} className="stroke-[2.5]" />
            Add New Rule
          </Button>
        </div>

        {/* SOP Table Card */}
        <div className="bg-white rounded-[12px] border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[13px] font-medium text-slate-700">
                  <th className="py-3.5 px-4 sm:px-5 font-medium border-r border-slate-200/80 w-[20%]">
                    Rule Name
                  </th>
                  <th className="py-3.5 px-4 sm:px-5 font-medium border-r border-slate-200/80 w-[68%]">
                    Description
                  </th>
                  <th className="py-3.5 px-4 sm:px-5 font-medium text-center w-[12%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-[13px] text-slate-700">
                {rules.map((rule) => (
                  <tr
                    key={rule.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Rule Name */}
                    <td className="py-4 px-4 sm:px-5 font-medium text-slate-900 border-r border-slate-200/80 align-top">
                      {rule.name}
                    </td>

                    {/* Description List with green checks */}
                    <td className="py-4 px-4 sm:px-5 border-r border-slate-200/80 align-top">
                      <div className="space-y-1.5">
                        {rule.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-slate-600 leading-relaxed"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-[12.5px] sm:text-[13px]">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-4 px-4 sm:px-5 text-center align-top">
                      <div className="flex items-center justify-center gap-1.5 pt-0.5">
                        <button
                          onClick={() => handleOpenEdit(rule)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                          title="Edit rule"
                        >
                          <PenLinearIcon size={16} className="stroke-[1.8]" />
                        </button>
                        <button
                          onClick={() => handleDelete(rule.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
                          title="Delete rule"
                        >
                          <TrashBinTrashLinearIcon size={16} className="stroke-[1.8]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Pagination Bar */}
      <div className="flex items-center justify-between pt-5 pb-2 text-[12px] text-slate-500">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-slate-100/80 border border-slate-200/70 text-slate-700 font-medium cursor-pointer">
            <span>1</span>
            <AltArrowDownLinearIcon size={12} className="stroke-[2.2]" />
          </div>
          <span>of 1 pages</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            disabled
            className="p-1 rounded text-slate-300 cursor-not-allowed"
          >
            <AltArrowLeftLinearIcon size={15} className="stroke-[2.2]" />
          </button>
          <button
            disabled
            className="p-1 rounded text-slate-300 cursor-not-allowed"
          >
            <AltArrowRightLinearIcon size={15} className="stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Add/Edit Rule Modal Dialog matching Figma screenshot */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[420px] bg-white rounded-[16px] p-5 sm:p-6 shadow-2xl border border-slate-200/90 select-none">
          {/* Custom Header with Blue Circle Pen Icon and Subtitle */}
          <div className="flex items-start justify-between pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0091FF] text-white flex-shrink-0 shadow-xs">
                <PenLinearIcon size={18} className="stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-slate-900 leading-snug">
                  {editingRule ? "Edit Rule" : "Add New Rule"}
                </h3>
                <p className="text-[12px] text-slate-400 font-normal leading-tight mt-0.5">
                  Are you sure you want to {editingRule ? "update" : "add"} new rule?
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-1 pb-2">
            {/* Name of Rule field */}
            <div>
              <label className="text-[13px] font-medium text-slate-800 mb-1.5 block">
                Name of Rule
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormName(e.target.value)
                }
                placeholder="Enter your email address"
                className="w-full h-10 px-3.5 text-[13px] font-normal text-slate-800 rounded-[8px] border border-slate-200/90 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Description field */}
            <div>
              <label className="text-[13px] font-medium text-slate-800 mb-1.5 block">
                Description
              </label>
              <textarea
                value={formPointsText}
                onChange={(e) => setFormPointsText(e.target.value)}
                placeholder="Add description"
                rows={4}
                className="w-full p-3 text-[13px] font-normal text-slate-800 rounded-[8px] border border-slate-200/90 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all resize-none min-h-[105px]"
              />
            </div>
          </div>

          {/* Modal Footer with Cancel & Save & Submit */}
          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="h-9 px-4 rounded-[8px] bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveRule}
              className="h-9 px-4 rounded-[8px] bg-[#0091FF] hover:bg-[#0080E6] text-white text-[13px] font-medium transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
            >
              Save & Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
