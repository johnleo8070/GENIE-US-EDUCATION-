"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, BookOpen, Star, Heart } from "lucide-react"
import Image from "next/image"

export function StoriesBanner() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#E0E7FF] via-[#C7D2FE] to-[#E0E7FF]">
      {/* Cloud decorations */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${5 + (i * 12)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 2)}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ) : i % 3 === 1 ? (
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            ) : (
              <BookOpen className="w-5 h-5 text-purple-400" />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Professor Panda with book - LEFT */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/40 via-indigo-400/30 to-pink-400/40 rounded-full blur-[70px] scale-125" />
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda reading stories"
                width={500}
                height={500}
                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] object-contain drop-shadow-2xl animate-float"
                style={{ animationDuration: "5s" }}
                loading="eager"
                priority
              />
            </div>
            {/* Book decoration */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl animate-bounce-gentle">
              <BookOpen className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Professor Panda's
              </span>
              <br />
              Magical Story Time!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6">
              Join Professor Panda on 10 amazing adventures! Each story teaches coding, maths, science, and more through fun interactive tales.
            </p>

            {/* Story badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-semibold">The Rocket Adventure</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold">Dino's Numbers</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-sm font-semibold">Letter Mystery</span>
              </div>
            </div>

            <Link href="/stories">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Explore All Stories
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Second Professor Panda - RIGHT (visible on larger screens) */}
          <div className="hidden xl:block relative flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-purple-400/20 to-indigo-400/30 rounded-full blur-[50px] scale-110" />
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda"
                width={350}
                height={350}
                className="relative w-[280px] h-[280px] object-contain drop-shadow-xl -scale-x-100 animate-float"
                style={{ animationDuration: "6s", animationDelay: "1s" }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
