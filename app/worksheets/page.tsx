"use client"

import Link from "next/link"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Download, 
  BookOpen, 
  Calculator, 
  Microscope, 
  Code, 
  Music,
  FileText,
  Printer
} from "lucide-react"

const worksheetCategories = [
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color: "bg-[oklch(0.7_0.2_25)]",
    worksheets: [
      { id: 1, name: "Alphabet Tracing A-Z", level: "Beginner", pages: 26 },
      { id: 2, name: "Letter Sounds Practice", level: "Beginner", pages: 10 },
      { id: 3, name: "Simple Words Matching", level: "Beginner", pages: 8 },
      { id: 4, name: "Sight Words Coloring", level: "Intermediate", pages: 15 },
      { id: 5, name: "Word Building Fun", level: "Intermediate", pages: 12 },
    ]
  },
  {
    id: "maths",
    name: "Maths",
    icon: Calculator,
    color: "bg-[oklch(0.65_0.22_250)]",
    worksheets: [
      { id: 1, name: "Numbers 1-10 Tracing", level: "Beginner", pages: 10 },
      { id: 2, name: "Counting Objects", level: "Beginner", pages: 15 },
      { id: 3, name: "Shape Recognition", level: "Beginner", pages: 8 },
      { id: 4, name: "Simple Addition", level: "Intermediate", pages: 12 },
      { id: 5, name: "Number Patterns", level: "Intermediate", pages: 10 },
    ]
  },
  {
    id: "science",
    name: "Science",
    icon: Microscope,
    color: "bg-[oklch(0.75_0.18_145)]",
    worksheets: [
      { id: 1, name: "Animal Matching", level: "Beginner", pages: 10 },
      { id: 2, name: "Body Parts Labeling", level: "Beginner", pages: 6 },
      { id: 3, name: "Weather & Seasons", level: "Beginner", pages: 8 },
      { id: 4, name: "Plants & Growth", level: "Intermediate", pages: 10 },
      { id: 5, name: "Animal Habitats", level: "Intermediate", pages: 12 },
    ]
  },
  {
    id: "coding",
    name: "Coding Basics",
    icon: Code,
    color: "bg-[oklch(0.7_0.18_300)]",
    worksheets: [
      { id: 1, name: "Sequencing Practice", level: "Beginner", pages: 8 },
      { id: 2, name: "Pattern Recognition", level: "Beginner", pages: 10 },
      { id: 3, name: "Logic Puzzles", level: "Intermediate", pages: 12 },
      { id: 4, name: "Algorithm Basics", level: "Intermediate", pages: 10 },
    ]
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    color: "bg-[oklch(0.8_0.15_60)]",
    worksheets: [
      { id: 1, name: "Rhythm Patterns", level: "Beginner", pages: 6 },
      { id: 2, name: "Musical Notes Intro", level: "Beginner", pages: 8 },
      { id: 3, name: "Instrument Matching", level: "Beginner", pages: 5 },
      { id: 4, name: "Note Reading Practice", level: "Intermediate", pages: 10 },
    ]
  },
]

export default function WorksheetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Printable Worksheets
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Download and print fun learning activities for offline practice. Perfect for home or classroom use!
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {worksheetCategories.map((category, categoryIndex) => (
            <section 
              key={category.id}
              className="animate-slide-up"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  category.color
                )}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {category.name}
                </h2>
              </div>

              {/* Worksheets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.worksheets.map((worksheet) => (
                  <div 
                    key={`${category.id}-${worksheet.id}`}
                    className="bg-card rounded-2xl p-5 shadow-playful hover:shadow-playful-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        category.color,
                        "opacity-80"
                      )}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-card-foreground mb-1 truncate">
                          {worksheet.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            worksheet.level === "Beginner" 
                              ? "bg-accent/20 text-accent-foreground" 
                              : "bg-primary/20 text-primary"
                          )}>
                            {worksheet.level}
                          </span>
                          <span>{worksheet.pages} pages</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="rounded-full flex-1"
                            onClick={() => alert(`Downloading ${worksheet.name}...`)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-full"
                            onClick={() => alert(`Printing ${worksheet.name}...`)}
                          >
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-secondary rounded-3xl p-8 text-center">
          <h3 className="text-xl font-display font-bold text-secondary-foreground mb-2">
            Need Custom Worksheets?
          </h3>
          <p className="text-muted-foreground mb-4">
            Parents can request custom worksheets based on their child&apos;s learning progress.
          </p>
          <Link href="/parent/dashboard">
            <Button variant="outline" className="rounded-full">
              Go to Parent Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
