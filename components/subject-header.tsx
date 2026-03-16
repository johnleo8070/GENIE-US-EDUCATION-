"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import type { Subject } from "@/lib/curriculum-data"

interface SubjectHeaderProps {
  subject: Subject
}

export function SubjectHeader({ subject }: SubjectHeaderProps) {
  return (
    <header 
      className="relative py-8 px-4 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${subject.gradientFrom}, ${subject.gradientTo})`
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-10 w-16 h-16 bg-white rounded-full blur-xl" />
        <div className="absolute bottom-8 right-20 w-24 h-24 bg-white rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full blur-lg" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Subject Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-110" />
            <Image
              src="/images/professor-panda.jpg"
              alt="Professor Panda"
              width={180}
              height={180}
              className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] object-contain drop-shadow-xl"
              loading="eager"
              priority
            />
          </div>
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 drop-shadow-lg">
              {subject.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90 drop-shadow">
              {subject.description}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
