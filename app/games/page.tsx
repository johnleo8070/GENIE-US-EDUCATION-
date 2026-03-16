"use client"

import Link from "next/link"
import { NavHeader } from "@/components/nav-header"
import { ProfessorPanda } from "@/components/professor-panda"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Code, 
  Puzzle, 
  Music2,
  Calculator,
  BookOpen,
  Play,
  Star
} from "lucide-react"

const games = [
  {
    id: "coding",
    title: "Robot Commander",
    description: "Program a robot using drag-and-drop commands!",
    subject: "Coding",
    icon: Code,
    color: "bg-[oklch(0.7_0.18_300)]",
    difficulty: "Easy",
    href: "/games/coding"
  },
  {
    id: "puzzle",
    title: "Shape Sorter",
    description: "Match shapes and colors in fun puzzles!",
    subject: "Logic",
    icon: Puzzle,
    color: "bg-[oklch(0.75_0.18_145)]",
    difficulty: "Easy",
    href: "/games/puzzle"
  },
  {
    id: "music",
    title: "Rhythm Maker",
    description: "Create music by tapping the right beats!",
    subject: "Music",
    icon: Music2,
    color: "bg-[oklch(0.8_0.15_60)]",
    difficulty: "Easy",
    href: "/games/music"
  },
  {
    id: "counting",
    title: "Number Cruncher",
    description: "Count objects and solve number puzzles!",
    subject: "Maths",
    icon: Calculator,
    color: "bg-[oklch(0.65_0.22_250)]",
    difficulty: "Easy",
    href: "/games/counting"
  },
  {
    id: "words",
    title: "Word Builder",
    description: "Build words by finding the right letters!",
    subject: "English",
    icon: BookOpen,
    color: "bg-[oklch(0.7_0.2_25)]",
    difficulty: "Medium",
    href: "/games/words"
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ProfessorPanda 
              size="lg" 
              mood="excited"
              showSpeechBubble
              message="Let's play and learn together! Pick a game!"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Fun Learning Games
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Play interactive games that teach coding, maths, music, and more!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Link 
              key={game.id}
              href={game.href}
              className="block animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-playful hover:shadow-playful-lg transition-all hover:-translate-y-1 h-full">
                {/* Game Header */}
                <div className={cn(
                  "p-8 relative overflow-hidden",
                  game.color
                )}>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/10" />
                  
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/25 flex items-center justify-center">
                      <game.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Game Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      game.color,
                      "text-white"
                    )}>
                      {game.subject}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {game.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-card-foreground mb-2">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {game.description}
                  </p>
                  
                  <Button className="w-full rounded-full font-bold">
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-muted rounded-3xl p-8 text-center">
          <h3 className="text-xl font-display font-bold text-foreground mb-2">
            More Games Coming Soon!
          </h3>
          <p className="text-muted-foreground">
            We&apos;re creating more fun games. Check back soon for new adventures!
          </p>
        </div>
      </main>
    </div>
  )
}
