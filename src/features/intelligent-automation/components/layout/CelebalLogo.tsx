import React from "react"

export const CelebalLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/celebal-logo.png"
        alt="Celebal Technologies"
        className="h-[30px] w-auto max-w-[175px] object-contain select-none"
      />
    </div>
  )
}

