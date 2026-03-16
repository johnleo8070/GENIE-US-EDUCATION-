"use client"

import { cn } from "@/lib/utils"

interface StarRatingProps {
  total?: number
  earned: number
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function StarRating({ 
  total = 5, 
  earned, 
  size = "md", 
  className,
  animated = false 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            sizeClasses[size],
            i < earned ? "text-[oklch(0.8_0.15_60)]" : "text-muted",
            animated && i < earned && "animate-pop",
            animated && `animation-delay-${(i + 1) * 100}`
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
          style={animated ? { animationDelay: `${i * 100}ms` } : {}}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
