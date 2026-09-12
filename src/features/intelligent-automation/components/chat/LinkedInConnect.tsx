import React from "react"
import { Switch } from "@/components/ui/switch"

interface LinkedInConnectProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export const LinkedInConnect: React.FC<LinkedInConnectProps> = ({
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* LinkedIn Monogram Icon */}
      <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current text-[#0a66c2]/70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65 1.65 1.65 0 0 0-1.65-1.66Z" />
        </svg>

        <label
          htmlFor="linkedin-toggle"
          className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          Connect to LinkedIn
        </label>
      </div>

      {/* Switch Component */}
      <Switch
        id="linkedin-toggle"
        checked={enabled}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-[#0a66c2]"
        aria-label="Connect to LinkedIn toggle"
      />
    </div>
  )
}

