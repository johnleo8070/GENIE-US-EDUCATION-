"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Play, X, Sparkles, BookOpen, Calculator, Microscope, Code, Music, Star, Shield, Heart, MessageSquare } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVideoFinished, setIsVideoFinished] = useState(true)

  // Replace this with your actual video path when ready
  const videoSrc = "https://www.youtube.com/embed/KtkHxIrhJgY?autoplay=1&rel=0"

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0E7FF] via-[#C7D2FE] to-[#E0E7FF]">
      {/* GENIE-US Logo - Top Left (reduced size to avoid blocking video) */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
        <Image
          src="/images/genie-us-logo.jpg"
          alt="GENIE-US - Learning is Magic!"
          width={120}
          height={120}
          className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] object-contain drop-shadow-lg rounded-xl"
          priority
          loading="eager"
        />
      </div>

      {/* Cloud decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />

      {/* Cloud decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${20 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        ))}
      </div>


      <div className="w-full pt-20 pb-12">
        <div className="flex flex-col items-center gap-8">

          {/* Full-Screen Video Player Component */}
          <div className="relative w-full order-2 px-4 md:px-8 lg:px-12">
            {/* Decorative frame */}
            <div className="absolute inset-0 mx-4 md:mx-8 lg:mx-12 -top-3 -bottom-3 md:-top-4 md:-bottom-4 bg-gradient-to-br from-[#F97316] via-[#3B82F6] to-[#22C55E] rounded-3xl md:rounded-[2rem] opacity-20 blur-sm" />

            {/* Video Container - Full width with slight padding */}
            <div
              className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-4 border-white group"
            >
              {!isVideoFinished && videoSrc ? (
                <iframe
                  src={videoSrc}
                  className="w-full aspect-[16/9] md:aspect-[21/10] lg:aspect-[21/9] object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="w-full aspect-[16/9] md:aspect-[21/10] lg:aspect-[21/9] bg-gradient-to-br from-[#FFF8E7] via-[#FFE4CC] to-[#FFF0DB] flex flex-col items-center justify-center relative cursor-pointer"
                  onClick={() => setIsVideoFinished(false)}
                >
                  {/* Professor Panda thumbnail */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/genie-us-logo.jpg"
                      alt="GENIE-US - Click to watch video"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      loading="eager"
                    />
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/30 transition-colors" />

                  {/* Play button - larger for full screen */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-[#F97316] rounded-full flex items-center justify-center shadow-xl shadow-[#F97316]/40 group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white ml-2" fill="white" />
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-[-16px] md:bottom-10 left-0 right-0 text-center">
                    <p className="text-[#F97316] font-display font-bold text-lg md:text-3xl lg:text-5xl drop-shadow-lg">
                      Watch Introduction
                    </p>
                    <p className="text-white/80 text-sm md:text-base drop-shadow-md mt-2">
                      Click to play
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content - now above video */}
          <div className="text-center order-1 max-w-4xl mx-auto px-4">
            {/* Sparkle badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/10 to-[#F59E0B]/10 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#F97316]/20">
              <Sparkles className="w-4 h-4" />
              Where Learning Feels Like Magic!
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-balance">
              <span className="text-foreground">Watch, Play & Learn</span>
              <br />
              <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#EAB308] bg-clip-text text-transparent">
                With Professor Panda!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-6 text-pretty">
              Fun-filled educational adventures for curious kids aged 2-7. Learn through play, stories, games, and discovery!
            </p>

            {/* Subject Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-semibold">
                <BookOpen className="w-3.5 h-3.5" /> English
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold">
                <Calculator className="w-3.5 h-3.5" /> Maths
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-semibold">
                <Microscope className="w-3.5 h-3.5" /> Science
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-semibold">
                <Code className="w-3.5 h-3.5" /> Coding
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-xs md:text-sm font-semibold">
                <Music className="w-3.5 h-3.5" /> Music
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs md:text-sm font-semibold">
                <MessageSquare className="w-3.5 h-3.5" /> Public Speaking
              </span>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-foreground/60 mb-8">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" /> Fun Videos
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" /> Interactive Games
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" /> Worksheets
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg font-bold bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>

              {/* Language Toggle */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <button className="px-4 py-2 rounded-full bg-[#F97316] text-white font-semibold text-sm transition-all">
                  English
                </button>
                <button className="px-4 py-2 rounded-full text-foreground/70 font-semibold text-sm hover:bg-gray-100 transition-all">
                  العربية
                </button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-foreground/50">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" /> Safe & Ad-Free
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400" /> Trusted by Parents
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500" /> Age-Appropriate Content
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
