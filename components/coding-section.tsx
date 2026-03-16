"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Play } from "lucide-react"
import Image from "next/image"

export function CodingSection() {
  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-white via-[#E0F2FE] to-white">
      {/* Cloud decorations */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Build Your Coding Skills!
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Learn coding through playful games built just for kids!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Professor Panda - LARGE teaching illustration */}
          <div className="relative flex-shrink-0 lg:w-2/5">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-blue-400/20 to-cyan-400/30 rounded-full blur-[60px] scale-110" />
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda teaching coding"
                width={500}
                height={500}
                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] object-contain drop-shadow-2xl animate-float"
                style={{ animationDuration: "5s" }}
                loading="eager"
              />
            </div>
          </div>

          {/* Coding Interface */}
          <div className="flex-1 w-full">
            <div className="relative bg-[#166534] rounded-3xl p-6 shadow-2xl overflow-hidden">
              {/* Chalkboard texture effect */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
              
              <div className="relative space-y-4">
                {/* Code blocks */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#22C55E] rounded-lg px-4 py-2 text-white font-bold text-sm shadow-md flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    move forward
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-[#3B82F6] rounded-lg px-4 py-2 text-white font-bold text-sm shadow-md">
                    start here
                    <ChevronRight className="w-4 h-4 inline ml-1" />
                  </div>
                  <div className="bg-[#F97316] rounded-lg px-4 py-2 text-white font-bold text-sm shadow-md">
                    next
                  </div>
                  <div className="bg-[#EAB308] rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold shadow-md">
                    ?
                  </div>
                </div>

                {/* Dashed path lines */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-0.5 w-16 border-t-2 border-dashed border-white/50" />
                  <div className="w-4 h-4 rounded-full bg-white/30" />
                  <div className="h-0.5 w-24 border-t-2 border-dashed border-white/50" />
                  <div className="w-4 h-4 rounded-full bg-white/30" />
                  <div className="h-0.5 w-12 border-t-2 border-dashed border-white/50" />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-6">
              <Link href="/games/coding">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg font-bold bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Start Coding
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Robot decoration */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce-gentle">
              <div className="text-white">
                <div className="flex gap-1 mb-1">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="w-6 h-1 bg-white rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
