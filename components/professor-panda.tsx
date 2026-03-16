"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProfessorPandaProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  mood?: "happy" | "excited" | "thinking" | "waving"
  message?: string
  showSpeechBubble?: boolean
}

export function ProfessorPanda({ 
  className, 
  size = "md", 
  mood = "happy",
  message,
  showSpeechBubble = false 
}: ProfessorPandaProps) {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
    hero: "w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px]"
  }

  const imageSizes = {
    sm: 80,
    md: 128,
    lg: 192,
    xl: 256,
    hero: 700
  }

  const moodClasses = {
    happy: "",
    excited: "animate-bounce-gentle",
    thinking: "",
    waving: "animate-wiggle"
  }

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {showSpeechBubble && message && (
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 bg-card rounded-3xl shadow-playful border-2 border-primary/20 animate-slide-up z-10",
          size === "hero" ? "-top-24 px-6 py-4 max-w-md" : "-top-16 px-4 py-2 max-w-xs"
        )}>
          <p className={cn(
            "font-medium text-card-foreground text-center",
            size === "hero" ? "text-lg md:text-xl" : "text-sm"
          )}>{message}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-primary/20 rotate-45" />
        </div>
      )}
      <div className={cn(sizeClasses[size], moodClasses[mood], "relative")}>
        <Image
          src="/images/professor-panda.jpg"
          alt="Professor Panda - Your friendly learning guide"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="w-full h-full object-contain drop-shadow-lg"
          priority
          loading="eager"
        />
      </div>
    </div>
  )
}
