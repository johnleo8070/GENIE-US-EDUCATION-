"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Lock, CheckCircle, Play } from "lucide-react"
import type { Module } from "@/lib/curriculum-data"

interface ModuleCardProps {
  module: Module
  subjectSlug: string
  completedLessons?: string[]
}

export function ModuleCard({ module, subjectSlug, completedLessons = [] }: ModuleCardProps) {
  const totalLessons = module.lessons.length
  const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length
  const progress = totalLessons > 0 ? (completed / totalLessons) * 100 : 0

  return (
    <div 
      className={cn(
        "relative bg-card rounded-3xl p-6 shadow-playful transition-all duration-300",
        module.unlocked ? "hover:shadow-playful-lg hover:-translate-y-1" : "opacity-60"
      )}
    >
      {!module.unlocked && (
        <div className="absolute inset-0 bg-muted/50 rounded-3xl flex items-center justify-center z-10">
          <div className="bg-card rounded-full p-4 shadow-lg">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: module.color }}
        >
          {module.icon.substring(0, 2)}
        </div>
        {progress === 100 && (
          <div className="bg-accent/20 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-display font-bold text-card-foreground mb-2">
        {module.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {module.description}
      </p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{completed} of {totalLessons} lessons</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: module.color }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-2">
        {module.lessons.slice(0, 3).map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              href={module.unlocked ? `/subjects/${subjectSlug}/lesson/${lesson.id}` : "#"}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all",
                module.unlocked ? "hover:bg-muted" : "cursor-not-allowed"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  isCompleted 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
              </div>
              {module.unlocked && !isCompleted && (
                <Play className="w-4 h-4 text-primary" />
              )}
            </Link>
          )
        })}
        {module.lessons.length > 3 && (
          <p className="text-xs text-center text-muted-foreground pt-2">
            +{module.lessons.length - 3} more lessons
          </p>
        )}
      </div>
    </div>
  )
}
