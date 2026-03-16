"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const subjects = [
  { 
    name: "English", 
    href: "/subjects/english",
    image: "/images/subject-english.jpg",
  },
  { 
    name: "Maths", 
    href: "/subjects/maths",
    image: "/images/subject-maths.jpg",
  },
  { 
    name: "Science", 
    href: "/subjects/science",
    image: "/images/subject-science.jpg",
  },
  { 
    name: "Coding", 
    href: "/subjects/coding",
    image: "/images/subject-coding.jpg",
  },
  { 
    name: "Music", 
    href: "/subjects/music",
    image: "/images/subject-music.jpg",
  },
]

export function VideoLessonsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Learn with Fun Video Lessons
          </h2>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-8">
          {subjects.map((subject, index) => (
            <Link key={subject.name} href={subject.href}>
              <div 
                className="group relative flex flex-col items-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Container with hover effects */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 cursor-pointer">
                  <Image
                    src={subject.image}
                    alt={`${subject.name} - Learn ${subject.name} with fun lessons`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/20 via-transparent to-white/10 pointer-events-none" />
                  
                  {/* Sparkle decoration on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-yellow-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                  </div>
                </div>

                {/* Subject Label */}
                <p className="text-center mt-3 font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {subject.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/subjects">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg font-bold bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              View More Lessons
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
