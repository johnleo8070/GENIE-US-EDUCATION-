"use client"

import { SubjectCard } from "@/components/subject-card"

export function SubjectsSection() {
  const subjects = ["english", "maths", "science", "coding", "music"] as const

  return (
    <section className="py-16 px-4 md:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Choose Your Adventure!
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a subject and start your learning journey with Professor Panda
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={subject} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SubjectCard subject={subject} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
