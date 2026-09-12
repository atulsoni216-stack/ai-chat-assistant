import React, { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export interface WorkflowItem {
  id: string
  name: string
  description: string
  fullDescription?: string
  hasReadMore?: boolean
  chatName: string
  enabled: boolean
}

const initialWorkflows: WorkflowItem[] = [
  {
    id: "wf-1",
    name: "Workflow 1",
    description: "Agent requesting resume results per job descriptions Age...",
    fullDescription:
      "Agent requesting resume results per job descriptions Agent requesting candidate profiles, scoring metrics, and experience validation against requirements.",
    hasReadMore: true,
    chatName: "Analysis the Resume wit...",
    enabled: true,
  },
  {
    id: "wf-2",
    name: "Workflow 2",
    description:
      "Agent requesting resume results per job descriptions Agent requestin...",
    fullDescription:
      "Agent requesting resume results per job descriptions Agent requesting automated interview scheduling and initial candidate screening questionnaire.",
    hasReadMore: false,
    chatName: "Analysis the Resume wit...",
    enabled: false,
  },
  {
    id: "wf-3",
    name: "Workflow 3",
    description:
      "Agent requesting resume results per job descriptions Agent requestin...",
    fullDescription:
      "Agent requesting resume results per job descriptions Agent requesting skills matrix parsing and background credential verifications.",
    hasReadMore: false,
    chatName: "Analysis the Resume wit...",
    enabled: false,
  },
  {
    id: "wf-4",
    name: "Workflow 4",
    description: "Agent requesting resume results per job descriptions Age...",
    fullDescription:
      "Agent requesting resume results per job descriptions Agent requesting multi-model benchmark evaluation and comparative candidate ranking scores.",
    hasReadMore: true,
    chatName: "Analysis the Resume wit...",
    enabled: false,
  },
  {
    id: "wf-5",
    name: "Workflow 5",
    description:
      "Agent requesting resume results per job descriptions Agent requestin...",
    fullDescription:
      "Agent requesting resume results per job descriptions Agent requesting offer letter generation and compliance guideline checks.",
    hasReadMore: false,
    chatName: "Analysis the Resume wit...",
    enabled: false,
  },
]

export const WorkflowsView: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>(initialWorkflows)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({})

  const handleToggle = (id: string, checked: boolean) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, enabled: checked } : wf))
    )
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full px-2 sm:px-6 py-4 overflow-y-auto custom-scrollbar select-none">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="text-[20px] font-semibold text-[#323232] tracking-tight font-sans">
          Workflows
        </h2>
        <p className="text-[13px] text-slate-600 font-normal mt-2.5">
          Below are the workflows captured from different chat sessions and bot processing stages.
        </p>
      </div>

      {/* Workflows Table Card */}
      <div className="bg-white rounded-[12px] border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[13px] font-medium text-slate-700">
                <th className="py-3.5 px-4 sm:px-5 font-medium border-r border-slate-200/80 w-[18%]">
                  Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-medium border-r border-slate-200/80 w-[44%]">
                  Description
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-medium border-r border-slate-200/80 w-[23%]">
                  Chat Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-medium text-center w-[15%]">
                  Use this workflow
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-[13px] text-slate-700">
              {workflows.map((wf) => {
                const isExpanded = !!expandedIds[wf.id]
                return (
                  <tr
                    key={wf.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-4 px-4 sm:px-5 font-medium text-slate-900 border-r border-slate-200/80 align-middle">
                      {wf.name}
                    </td>

                    {/* Description with Read More */}
                    <td className="py-4 px-4 sm:px-5 border-r border-slate-200/80 align-middle">
                      <div className="text-slate-600 leading-relaxed">
                        {isExpanded
                          ? wf.fullDescription || wf.description
                          : wf.description}
                        {wf.hasReadMore && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(wf.id)}
                            className="ml-1.5 text-cyan-600 hover:text-cyan-700 font-medium hover:underline inline-block focus:outline-none cursor-pointer"
                          >
                            {isExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Chat Name */}
                    <td className="py-4 px-4 sm:px-5 text-slate-600 border-r border-slate-200/80 truncate max-w-[180px] align-middle">
                      {wf.chatName}
                    </td>

                    {/* Toggle Switch */}
                    <td className="py-4 px-4 sm:px-5 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={wf.enabled}
                          onCheckedChange={(checked) =>
                            handleToggle(wf.id, checked)
                          }
                          className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-slate-200 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

