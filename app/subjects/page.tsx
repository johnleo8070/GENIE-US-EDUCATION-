"use client"

import Link from "next/link"
import Image from "next/image"
import { NavHeader } from "@/components/nav-header"
import { cn } from "@/lib/utils"
import { BookOpen, Calculator, Atom, Code, Music, ArrowRight, Sparkles } from "lucide-react"

const subjects = [
  { 
    name: "English", 
    href: "/subjects/english", 
    icon: BookOpen,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    gradientFrom: "from-pink-400",
    gradientTo: "to-pink-600",
    description: "ABC, Reading & Writing",
    modules: 12,
    lessons: 48
  },
  { 
    name: "Maths", 
    href: "/subjects/maths", 
    icon: Calculator,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    description: "Numbers & Counting",
    modules: 10,
    lessons: 40
  },
  { 
    name: "Science", 
    href: "/subjects/science", 
    icon: Atom,
    color: "text-green-500",
    bgColor: "bg-green-100",
    gradientFrom: "from-green-400",
    gradientTo: "to-emerald-500",
    description: "Nature & Discovery",
    modules: 8,
    lessons: 32
  },
  { 
    name: "Coding", 
    href: "/subjects/coding", 
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
    description: "Logic & Programming",
    modules: 6,
    lessons: 24
  },
  { 
    name: "Music", 
    href: "/subjects/music", 
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    gradientFrom: "from-orange-400",
    gradientTo: "to-yellow-500",
    description: "Sounds & Rhythm",
    modules: 5,
    lessons: 20
  },
]

export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <NavHeader />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-foreground/80">Choose Your Learning Adventure</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="text-foreground">Explore All </span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Subjects</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover fun lessons in English, Maths, Science, Coding, and Music with Professor Panda!
          </p>
          
          {/* Professor Panda */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/professor-panda.jpg"
              alt="Professor Panda"
              width={180}
              height={180}
              className="drop-shadow-xl"
              loading="eager"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Subjects Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon
              return (
                <Link
                  key={subject.name}
                  href={subject.href}
                  className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity",
                    subject.gradientFrom,
                    subject.gradientTo
                  )} />
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
                    subject.bgColor
                  )}>
                    <IconComponent className={cn("w-8 h-8", subject.color)} />
                  </div>
                  
                  {/* Content */}
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">{subject.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-sm">
                      <span className="font-bold text-foreground">{subject.modules}</span>
                      <span className="text-muted-foreground"> Modules</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-foreground">{subject.lessons}</span>
                      <span className="text-muted-foreground"> Lessons</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className={cn(
                    "inline-flex items-center gap-2 font-semibold text-sm",
                    subject.color
                  )}>
                    Start Learning
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
