"use client"

import { useState, useEffect } from "react"
import { ProfessorPanda } from "@/components/professor-panda"
import { Button } from "@/components/ui/button"
import { Code, Calculator, BookOpen, Music, Sparkles, Play, RotateCcw } from "lucide-react"
import Link from "next/link"

const scenes = [
  {
    id: 1,
    title: "Magic Swirl",
    pandaMood: "waving" as const,
    message: "Helloooo, little explorer!",
    showIcons: false,
    showButtons: false,
  },
  {
    id: 2,
    title: "Learning World",
    pandaMood: "happy" as const,
    message: "Welcome to our magical learning world!",
    showIcons: true,
    showButtons: false,
  },
  {
    id: 3,
    title: "Panda Points",
    pandaMood: "teaching" as const,
    message: "Here we learn coding, numbers, words... and even music!",
    showIcons: true,
    showButtons: false,
  },
  {
    id: 4,
    title: "Adventure Call",
    pandaMood: "excited" as const,
    message: "Are you ready for an adventure?",
    showIcons: true,
    showButtons: false,
  },
  {
    id: 5,
    title: "Choose Adventure",
    pandaMood: "celebrating" as const,
    message: "Pick your learning adventure and let's begin!",
    showIcons: false,
    showButtons: true,
  },
]

const subjectIcons = [
  { icon: Code, label: "Coding", color: "bg-[oklch(0.7_0.15_280)]", href: "/games/coding" },
  { icon: Calculator, label: "Maths", color: "bg-[oklch(0.7_0.15_150)]", href: "/classroom?subject=maths" },
  { icon: BookOpen, label: "English", color: "bg-[oklch(0.7_0.15_30)]", href: "/classroom?subject=english" },
  { icon: Music, label: "Music", color: "bg-[oklch(0.7_0.15_330)]", href: "/classroom?subject=music" },
]

const adventureButtons = [
  { icon: Code, label: "Coding Adventure", color: "bg-[oklch(0.7_0.15_280)]", href: "/games/coding" },
  { icon: Calculator, label: "Math Magic", color: "bg-[oklch(0.7_0.15_150)]", href: "/classroom?subject=maths" },
  { icon: BookOpen, label: "English World", color: "bg-[oklch(0.7_0.15_30)]", href: "/classroom?subject=english" },
  { icon: Music, label: "Music Fun", color: "bg-[oklch(0.7_0.15_330)]", href: "/classroom?subject=music" },
]

export function IntroSection() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1)
        setShowSparkles(true)
        setTimeout(() => setShowSparkles(false), 500)
      } else {
        setIsPlaying(false)
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [currentScene, isPlaying])

  const handleStart = () => {
    setHasStarted(true)
    setIsPlaying(true)
    setCurrentScene(0)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 500)
  }

  const handleRestart = () => {
    setCurrentScene(0)
    setIsPlaying(true)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 500)
  }

  const scene = scenes[currentScene]

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-background to-[oklch(0.95_0.03_200)]">
      {/* Sparkle effects */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: "1s",
              }}
            >
              <Sparkles className="w-4 h-4 text-[oklch(0.8_0.15_60)]" />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 text-balance">
          Welcome with <span className="text-primary">Professor Panda</span>
        </h2>

        {!hasStarted ? (
          /* Pre-play state */
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse" />
              <ProfessorPanda size="lg" mood="waving" />
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Click the play button to begin your magical journey with Professor Panda!
            </p>
            <Button
              onClick={handleStart}
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 mr-2" />
              Start the Magic
            </Button>
          </div>
        ) : (
          /* Animated intro */
          <div className="relative min-h-[400px] flex flex-col items-center justify-center">
            {/* Magic swirl background effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 animate-spin" style={{ animationDuration: "20s" }} />
            </div>

            {/* Professor Panda with speech bubble */}
            <div className="relative z-10 mb-8 animate-bounce" style={{ animationDuration: "2s" }}>
              <ProfessorPanda 
                size="lg" 
                mood={scene.pandaMood}
                showSpeechBubble
                message={scene.message}
              />
            </div>

            {/* Subject Icons */}
            {scene.showIcons && (
              <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up">
                {subjectIcons.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${item.color} text-white shadow-lg transition-all hover:scale-110`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <item.icon className="w-8 h-8" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Adventure Buttons */}
            {scene.showButtons && (
              <div className="flex flex-col gap-4 w-full max-w-md animate-slide-up">
                <div className="grid grid-cols-2 gap-4">
                  {adventureButtons.map((btn, index) => (
                    <Link key={btn.label} href={btn.href}>
                      <Button
                        className={`w-full h-auto py-4 px-6 rounded-2xl ${btn.color} text-white font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-2`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <btn.icon className="w-6 h-6" />
                        <span>{btn.label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>

                {/* Jingle text */}
                <div className="mt-6 p-4 bg-secondary/50 rounded-2xl">
                  <p className="text-lg font-display text-foreground italic">
                    "Learn and play, explore today,<br />
                    With Professor Panda — hooray!"
                  </p>
                </div>

                {/* Replay button */}
                <Button
                  onClick={handleRestart}
                  variant="ghost"
                  className="mt-2 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Watch Again
                </Button>
              </div>
            )}

            {/* Scene progress indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {scenes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentScene
                      ? "w-6 bg-primary"
                      : index < currentScene
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Final message */}
        {hasStarted && currentScene === scenes.length - 1 && !isPlaying && (
          <p className="mt-8 text-xl font-display text-primary animate-pulse">
            Let's make learning magical!
          </p>
        )}
      </div>
    </section>
  )
}
