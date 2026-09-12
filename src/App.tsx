import { IntelligentAutomationHome } from "@/features/intelligent-automation"
import { VisualElementInspector } from "@/features/intelligent-automation/components/inspector/VisualElementInspector"

export default function App() {
  return (
    <div className="min-h-screen w-full font-sans antialiased text-slate-900 bg-[#FBFBFC] relative">
      <IntelligentAutomationHome />
      <VisualElementInspector />
    </div>
  )
}
