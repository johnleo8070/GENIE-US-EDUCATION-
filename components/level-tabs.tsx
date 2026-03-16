"use client"

import { cn } from "@/lib/utils"
import type { Level } from "@/lib/curriculum-data"

interface LevelTabsProps {
  levels: Level[]
  activeLevel: string
  onLevelChange: (levelId: string) => void
  subjectColor: string
}

export function LevelTabs({ levels, activeLevel, onLevelChange, subjectColor }: LevelTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onLevelChange(level.id)}
          className={cn(
            "px-6 py-3 rounded-full font-display font-bold text-sm transition-all duration-200",
            activeLevel === level.id
              ? "text-white shadow-lg scale-105"
              : "bg-white/80 text-foreground hover:bg-white hover:shadow-md"
          )}
          style={activeLevel === level.id ? { backgroundColor: subjectColor } : {}}
        >
          <span className="block">{level.title}</span>
          <span className="block text-xs font-normal opacity-80">{level.ageRange}</span>
        </button>
      ))}
    </div>
  )
}
