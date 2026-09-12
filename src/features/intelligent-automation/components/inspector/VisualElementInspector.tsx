import React, { useState, useEffect } from "react"
import { Sparkles, Code, Check, Crosshair, X, Palette, Type, Move } from "lucide-react"

interface ElementLocationInfo {
  componentName: string
  filePath: string
  elementTag: string
  textContent?: string
  classes?: string
}

export const VisualElementInspector: React.FC = () => {
  const [isInspectMode, setIsInspectMode] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)
  const [selectedInfo, setSelectedInfo] = useState<ElementLocationInfo | null>(null)
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  useEffect(() => {
    if (!isInspectMode) {
      setHoveredElement(null)
      return
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("#antigravity-inspector-ui")) return
      setHoveredElement(target)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("#antigravity-inspector-ui")) return

      e.preventDefault()
      e.stopPropagation()

      const info = inspectElement(target)
      setSelectedInfo(info)
      setIsInspectMode(false)
    }

    document.addEventListener("mouseover", handleMouseOver, true)
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver, true)
      document.removeEventListener("click", handleClick, true)
    }
  }, [isInspectMode])

  const inspectElement = (el: HTMLElement): ElementLocationInfo => {
    const tag = el.tagName.toLowerCase()
    const text = el.innerText ? el.innerText.slice(0, 50).trim() : ""
    const classes = el.className ? String(el.className) : ""

    if (el.closest(".composer-gradient-border")) {
      if (el.closest("button") && text.includes("Upload")) {
        return {
          componentName: "FileUpload (<FileUpload />)",
          filePath: "src/features/intelligent-automation/components/chat/FileUpload.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      if (el.closest("#linkedin-toggle") || text.includes("LinkedIn")) {
        return {
          componentName: "LinkedInConnect (<LinkedInConnect />)",
          filePath: "src/features/intelligent-automation/components/chat/LinkedInConnect.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      return {
        componentName: "ChatComposer (<ChatComposer />)",
        filePath: "src/features/intelligent-automation/components/chat/ChatComposer.tsx",
        elementTag: tag,
        textContent: text,
        classes,
      }
    }

    if (el.closest("aside")) {
      if (el.closest(".border-t") || text.includes("Simran") || text.includes("simrangupta")) {
        return {
          componentName: "UserProfile (<UserProfile />)",
          filePath: "src/features/intelligent-automation/components/navigation/UserProfile.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      if (el.closest(".custom-scrollbar") || el.closest(".space-y-0.5")) {
        return {
          componentName: "ChatHistoryItem (<ChatHistoryItem />)",
          filePath: "src/features/intelligent-automation/components/navigation/ChatHistoryItem.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      if (el.closest("nav") || text.includes("Workflows") || text.includes("SOP") || text.includes("New Chat")) {
        return {
          componentName: "SidebarNav (<SidebarNav />)",
          filePath: "src/features/intelligent-automation/components/navigation/SidebarNav.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      if (text.includes("CELEBAL")) {
        return {
          componentName: "CelebalLogo (<CelebalLogo />)",
          filePath: "src/features/intelligent-automation/components/layout/CelebalLogo.tsx",
          elementTag: tag,
          textContent: text,
          classes,
        }
      }
      return {
        componentName: "Sidebar (<Sidebar />)",
        filePath: "src/features/intelligent-automation/components/layout/Sidebar.tsx",
        elementTag: tag,
        textContent: text,
        classes,
      }
    }

    if (el.closest("h1") || el.closest("h2") || el.closest(".max-w-3xl") || text.includes("Welcome to the Future") || text.includes("Intelligent Automation")) {
      return {
        componentName: "WelcomeState (<WelcomeState />)",
        filePath: "src/features/intelligent-automation/components/chat/WelcomeState.tsx",
        elementTag: tag,
        textContent: text,
        classes,
      }
    }

    if (el.closest("footer") || text.includes("Beyond Assistance") || text.includes("Terms")) {
      return {
        componentName: "Footer (in <IntelligentAutomationHome />)",
        filePath: "src/features/intelligent-automation/pages/IntelligentAutomationHome.tsx",
        elementTag: tag,
        textContent: text,
        classes,
      }
    }

    return {
      componentName: "AppShell / Canvas (<AppShell />)",
      filePath: "src/features/intelligent-automation/components/layout/AppShell.tsx",
      elementTag: tag,
      textContent: text,
      classes,
    }
  }

  const copyPrompt = (actionType: "general" | "color" | "typography" | "spacing") => {
    if (!selectedInfo) return

    let prompt = ""
    if (actionType === "general") {
      prompt = `In \`${selectedInfo.filePath}\`, please modify the ${selectedInfo.componentName} (selected text: ${selectedInfo.textContent || "element"}).`
    } else if (actionType === "color") {
      prompt = `In \`${selectedInfo.filePath}\`, change the colors/styling for the ${selectedInfo.componentName}.`
    } else if (actionType === "typography") {
      prompt = `In \`${selectedInfo.filePath}\`, adjust the text font/size/weight for "${selectedInfo.textContent || selectedInfo.componentName}".`
    } else if (actionType === "spacing") {
      prompt = `In \`${selectedInfo.filePath}\`, adjust the padding and margins of ${selectedInfo.componentName}.`
    }

    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(actionType)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const hoverRect = hoveredElement?.getBoundingClientRect()

  return (
    <div id="antigravity-inspector-ui" className="font-sans">
      {/* Visual Hover Bounding Box */}
      {isInspectMode && hoverRect && (
        <div
          className="fixed pointer-events-none z-50 border-2 border-cyan-500 bg-cyan-500/15 rounded-lg transition-all duration-75 shadow-[0_0_15px_rgba(0,180,216,0.35)]"
          style={{
            top: `${hoverRect.top}px`,
            left: `${hoverRect.left}px`,
            width: `${hoverRect.width}px`,
            height: `${hoverRect.height}px`,
          }}
        >
          <div className="absolute -top-7 left-0 bg-cyan-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Click to select for Antigravity</span>
          </div>
        </div>
      )}

      {/* Floating Toolbar / Inspector Window */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 select-none">
        {selectedInfo && (
          <div className="bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 max-w-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Element Selected</span>
              </div>
              <button
                onClick={() => setSelectedInfo(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
                aria-label="Close inspector"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="py-2.5 space-y-1.5 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider">Component:</span>
                <div className="font-mono text-cyan-300 font-semibold text-[13px]">
                  {selectedInfo.componentName}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider">File:</span>
                <div className="font-mono text-slate-300 text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded truncate">
                  {selectedInfo.filePath}
                </div>
              </div>

              {selectedInfo.textContent && (
                <div className="text-slate-300 italic text-[11px] bg-slate-800/40 p-1.5 rounded truncate">
                  "{selectedInfo.textContent}"
                </div>
              )}
            </div>

            {/* Direct Copy Action Buttons for Antigravity */}
            <div className="pt-2 flex flex-col gap-1.5">
              <button
                onClick={() => copyPrompt("general")}
                className="w-full flex items-center justify-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white font-semibold text-xs py-2 px-3 rounded-xl transition-all shadow-sm"
              >
                {copiedPrompt === "general" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Prompt to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Code className="w-3.5 h-3.5" />
                    <span>Copy Antigravity Edit Prompt</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
                <button
                  onClick={() => copyPrompt("color")}
                  className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg transition-colors"
                  title="Copy color change prompt"
                >
                  <Palette className="w-3 h-3 text-cyan-400" />
                  <span>Color</span>
                </button>
                <button
                  onClick={() => copyPrompt("typography")}
                  className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg transition-colors"
                  title="Copy typography change prompt"
                >
                  <Type className="w-3 h-3 text-cyan-400" />
                  <span>Font</span>
                </button>
                <button
                  onClick={() => copyPrompt("spacing")}
                  className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg transition-colors"
                  title="Copy spacing change prompt"
                >
                  <Move className="w-3 h-3 text-cyan-400" />
                  <span>Spacing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => {
            setIsInspectMode(!isInspectMode)
            setSelectedInfo(null)
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-medium text-xs shadow-lg transition-all duration-200 active:scale-95 border ${
            isInspectMode
              ? "bg-cyan-500 text-white border-cyan-400 ring-4 ring-cyan-400/20"
              : "bg-white/95 backdrop-blur-md text-slate-800 hover:text-slate-950 border-slate-200 hover:border-cyan-400 hover:shadow-xl"
          }`}
          title="Click to select any element on the preview to request changes in Antigravity"
        >
          <Crosshair className={`w-4 h-4 ${isInspectMode ? "text-white animate-spin" : "text-cyan-600"}`} />
          <span>{isInspectMode ? "Click any element..." : "Select & Inspect UI"}</span>
        </button>
      </div>
    </div>
  )
}

