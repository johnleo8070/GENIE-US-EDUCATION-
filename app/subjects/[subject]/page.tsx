"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import { SubjectHeader } from "@/components/subject-header"
import { LevelTabs } from "@/components/level-tabs"
import { ModuleCard } from "@/components/module-card"
import { getSubjectBySlug } from "@/lib/curriculum-data"

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const resolvedParams = use(params)
  const subject = getSubjectBySlug(resolvedParams.subject)

  if (!subject) {
    notFound()
  }

  const [activeLevel, setActiveLevel] = useState(subject.levels[0]?.id || "")
  const currentLevel = subject.levels.find(l => l.id === activeLevel) || subject.levels[0]

  // In a real app, this would come from user data/database
  const completedLessons: string[] = []

  return (
    <div className="min-h-screen bg-background">
      <SubjectHeader subject={subject} />

      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Level Tabs */}
          <div className="mb-8">
            <LevelTabs
              levels={subject.levels}
              activeLevel={activeLevel}
              onLevelChange={setActiveLevel}
              subjectColor={subject.color}
            />
          </div>

          {/* Level Description */}
          {currentLevel && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {currentLevel.title}: {currentLevel.description}
              </h2>
              <p className="text-muted-foreground">
                Perfect for ages {currentLevel.ageRange}
              </p>
            </div>
          )}

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLevel?.modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                subjectSlug={subject.slug}
                completedLessons={completedLessons}
              />
            ))}
          </div>

          {/* Empty state */}
          {(!currentLevel?.modules || currentLevel.modules.length === 0) && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                More modules coming soon! Check back later.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
