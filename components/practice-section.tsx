"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, FileText, Pencil, BookOpen } from "lucide-react"
import Image from "next/image"

export function PracticeSection() {
  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-white via-[#FEF3C7] to-[#FDE68A]/50">
      {/* Cloud decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Let's Practice!
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-6">
              Printable worksheets for daily practice at home
            </p>

            {/* Worksheet preview cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-lg w-32 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
                <FileText className="w-10 h-10 text-pink-500" />
                <span className="text-sm font-semibold">ABC Tracing</span>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg w-32 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
                <Pencil className="w-10 h-10 text-blue-500" />
                <span className="text-sm font-semibold">Numbers</span>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg w-32 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
                <BookOpen className="w-10 h-10 text-green-500" />
                <span className="text-sm font-semibold">Reading</span>
              </div>
            </div>

            <Link href="/auth/sign-up">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg font-bold bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Professor Panda - LARGE illustration */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-yellow-400/20 to-orange-400/30 rounded-full blur-[60px] scale-110" />
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda with worksheets"
                width={550}
                height={550}
                className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Floating worksheet decorations */}
            <div className="absolute -left-12 top-1/4 bg-white rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="w-14 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded flex items-center justify-center">
                <span className="text-pink-600 font-bold text-xl">A</span>
              </div>
            </div>
            <div className="absolute -right-8 bottom-1/3 bg-white rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <div className="w-14 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
