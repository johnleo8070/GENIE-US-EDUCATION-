"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Code, 
  Music 
} from "lucide-react"

interface SubjectCardProps {
  subject: "english" | "maths" | "science" | "coding" | "music"
  className?: string
}

const subjectConfig = {
  english: {
    name: "English",
    icon: BookOpen,
    color: "bg-[oklch(0.7_0.2_25)]",
    hoverColor: "hover:bg-[oklch(0.65_0.22_25)]",
    description: "Letters, Words & Stories",
    href: "/learn/english"
  },
  maths: {
    name: "Maths",
    icon: Calculator,
    color: "bg-[oklch(0.65_0.22_250)]",
    hoverColor: "hover:bg-[oklch(0.6_0.24_250)]",
    description: "Numbers & Counting",
    href: "/learn/maths"
  },
  science: {
    name: "Science",
    icon: Microscope,
    color: "bg-[oklch(0.75_0.18_145)]",
    hoverColor: "hover:bg-[oklch(0.7_0.2_145)]",
    description: "Discover & Explore",
    href: "/learn/science"
  },
  coding: {
    name: "Coding",
    icon: Code,
    color: "bg-[oklch(0.7_0.18_300)]",
    hoverColor: "hover:bg-[oklch(0.65_0.2_300)]",
    description: "Logic & Commands",
    href: "/learn/coding"
  },
  music: {
    name: "Music",
    icon: Music,
    color: "bg-[oklch(0.8_0.15_60)]",
    hoverColor: "hover:bg-[oklch(0.75_0.17_60)]",
    description: "Rhythm & Notes",
    href: "/learn/music"
  }
}

export function SubjectCard({ subject, className }: SubjectCardProps) {
  const config = subjectConfig[subject]
  const Icon = config.icon

  return (
    <Link href={config.href} className={cn("block group", className)}>
      <div className={cn(
        "relative rounded-3xl p-6 transition-all duration-300 transform",
        "hover:scale-105 hover:shadow-playful-lg active:scale-95",
        config.color,
        config.hoverColor
      )}>
        {/* Decorative circles */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20" />
        <div className="absolute top-6 right-8 w-4 h-4 rounded-full bg-white/15" />
        
        {/* Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/25 flex items-center justify-center mb-4 group-hover:animate-wiggle">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
        </div>
        
        {/* Text */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
          {config.name}
        </h3>
        <p className="text-sm md:text-base text-white/80 font-medium">
          {config.description}
        </p>
        
        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
