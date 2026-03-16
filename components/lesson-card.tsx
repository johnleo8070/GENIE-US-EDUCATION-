"use client"

import { cn } from "@/lib/utils"
import { ProgressBar } from "@/components/progress-bar"
import { StarRating } from "@/components/star-rating"
import { Play, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface LessonCardProps {
  title: string
  subject: "english" | "maths" | "science" | "coding" | "music"
  progress: number
  starsEarned: number
  totalStars?: number
  status: "locked" | "available" | "in-progress" | "completed"
  href: string
  lessonNumber: number
  className?: string
}

const subjectColors = {
  english: "bg-[oklch(0.7_0.2_25)]",
  maths: "bg-[oklch(0.65_0.22_250)]",
  science: "bg-[oklch(0.75_0.18_145)]",
  coding: "bg-[oklch(0.7_0.18_300)]",
  music: "bg-[oklch(0.8_0.15_60)]"
}

export function LessonCard({ 
  title, 
  subject, 
  progress, 
  starsEarned,
  totalStars = 3,
  status,
  href,
  lessonNumber,
  className 
}: LessonCardProps) {
  const isLocked = status === "locked"
  const isCompleted = status === "completed"

  return (
    <Link 
      href={isLocked ? "#" : href} 
      className={cn(
        "block group",
        isLocked && "cursor-not-allowed",
        className
      )}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div className={cn(
        "bg-card rounded-2xl p-4 shadow-playful transition-all duration-300 border-2 border-transparent",
        !isLocked && "hover:shadow-playful-lg hover:-translate-y-1",
        isCompleted && "border-accent",
        isLocked && "opacity-60"
      )}>
        <div className="flex items-start gap-4">
          {/* Lesson Number Badge */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            subjectColors[subject]
          )}>
            {isLocked ? (
              <Lock className="w-5 h-5 text-white" />
            ) : isCompleted ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <span className="text-lg font-bold text-white">{lessonNumber}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-display font-bold text-card-foreground truncate mb-1">
              {title}
            </h3>
            
            {/* Stars */}
            <StarRating earned={starsEarned} total={totalStars} size="sm" className="mb-2" />

            {/* Progress */}
            {!isLocked && (
              <ProgressBar 
                progress={progress} 
                color={subjectColors[subject]} 
                size="sm" 
                showLabel={false}
              />
            )}
          </div>

          {/* Play Button */}
          {!isLocked && !isCompleted && (
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
              subjectColors[subject],
              "group-hover:scale-110"
            )}>
              <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
