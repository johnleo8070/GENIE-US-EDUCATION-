"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  color?: string
  className?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({ 
  progress, 
  color = "bg-primary", 
  className,
  showLabel = true,
  size = "md"
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <span className="text-sm font-bold text-foreground">{clampedProgress}%</span>
        </div>
      )}
      <div className={cn(
        "w-full rounded-full bg-muted overflow-hidden",
        sizeClasses[size]
      )}>
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            color
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}
