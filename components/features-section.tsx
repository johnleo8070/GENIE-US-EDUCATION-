"use client"

import { 
  Gamepad2, 
  Trophy, 
  Smartphone, 
  Download,
  Star,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Gamepad2,
    title: "Interactive Games",
    description: "Learn through fun puzzles, quizzes, and adventures",
    color: "bg-[oklch(0.7_0.2_25)]"
  },
  {
    icon: Trophy,
    title: "Rewards & Badges",
    description: "Earn stars and trophies as you complete lessons",
    color: "bg-[oklch(0.8_0.15_60)]"
  },
  {
    icon: Star,
    title: "Progress Tracking",
    description: "Parents can monitor learning achievements",
    color: "bg-[oklch(0.65_0.22_250)]"
  },
  {
    icon: Smartphone,
    title: "Kid-Friendly Design",
    description: "Large buttons and colorful interface for tiny fingers",
    color: "bg-[oklch(0.75_0.18_145)]"
  },
  {
    icon: Download,
    title: "Printable Worksheets",
    description: "Download activities for offline learning fun",
    color: "bg-[oklch(0.7_0.18_300)]"
  },
  {
    icon: Heart,
    title: "Safe Learning",
    description: "Child-safe content with no ads or distractions",
    color: "bg-[oklch(0.65_0.2_350)]"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Kids Love GENIE-US
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need for fun, engaging, and effective learning
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-2xl p-6 shadow-playful hover:shadow-playful-lg transition-all hover:-translate-y-1 h-full">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                  feature.color
                )}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
