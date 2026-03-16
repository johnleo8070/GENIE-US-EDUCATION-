"use client"

import { cn } from "@/lib/utils"
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Flame,
  BookOpen,
  Code
} from "lucide-react"

interface AchievementBadgeProps {
  type: "first-lesson" | "streak" | "perfect-score" | "explorer" | "coder" | "reader" | "star" | "champion"
  earned?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const badgeConfig = {
  "first-lesson": {
    icon: Star,
    label: "First Lesson",
    color: "bg-[oklch(0.8_0.15_60)]",
    textColor: "text-[oklch(0.35_0.1_60)]"
  },
  "streak": {
    icon: Flame,
    label: "3 Day Streak",
    color: "bg-[oklch(0.7_0.2_25)]",
    textColor: "text-[oklch(0.3_0.15_25)]"
  },
  "perfect-score": {
    icon: Target,
    label: "Perfect Score",
    color: "bg-[oklch(0.75_0.18_145)]",
    textColor: "text-[oklch(0.3_0.12_145)]"
  },
  "explorer": {
    icon: Zap,
    label: "Explorer",
    color: "bg-[oklch(0.65_0.22_250)]",
    textColor: "text-white"
  },
  "coder": {
    icon: Code,
    label: "Young Coder",
    color: "bg-[oklch(0.7_0.18_300)]",
    textColor: "text-white"
  },
  "reader": {
    icon: BookOpen,
    label: "Bookworm",
    color: "bg-[oklch(0.7_0.2_25)]",
    textColor: "text-white"
  },
  "star": {
    icon: Award,
    label: "Rising Star",
    color: "bg-[oklch(0.8_0.15_60)]",
    textColor: "text-[oklch(0.35_0.1_60)]"
  },
  "champion": {
    icon: Trophy,
    label: "Champion",
    color: "bg-gradient-to-br from-[oklch(0.8_0.15_60)] to-[oklch(0.7_0.2_40)]",
    textColor: "text-white"
  }
}

export function AchievementBadge({ 
  type, 
  earned = true, 
  size = "md",
  className 
}: AchievementBadgeProps) {
  const config = badgeConfig[type]
  const Icon = config.icon

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  }

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9"
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center shadow-md",
        sizeClasses[size],
        earned ? config.color : "bg-muted",
        !earned && "opacity-40"
      )}>
        <Icon className={cn(
          iconSizes[size],
          earned ? config.textColor : "text-muted-foreground"
        )} />
      </div>
      <span className={cn(
        "text-xs font-medium text-center",
        earned ? "text-foreground" : "text-muted-foreground"
      )}>
        {config.label}
      </span>
    </div>
  )
}
