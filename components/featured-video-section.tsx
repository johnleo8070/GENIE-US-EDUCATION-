"use client"

import Image from "next/image"
import { Play, Sparkles } from "lucide-react"

export function FeaturedVideoSection() {
  // Replace this with your actual video path when ready
  // Example: const videoSrc = "/videos/professor-panda-intro.mp4"
  const videoSrc: string | null = null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF8E7] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#F97316]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#22C55E]/10 rounded-full blur-xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Featured Video
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Watch and Learn with Professor Panda
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join Professor Panda on an exciting learning adventure! Fun lessons designed for curious minds aged 2-7.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Decorative frame */}
          <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-[#F97316] via-[#3B82F6] to-[#22C55E] rounded-3xl md:rounded-[2rem] opacity-20 blur-sm" />

          <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
            {videoSrc ? (
              <video
                className="w-full aspect-video object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/professor-panda.jpg"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              /* Placeholder with Professor Panda thumbnail */
              <div className="w-full aspect-video bg-gradient-to-br from-[#FFF8E7] via-[#FFE4CC] to-[#FFF0DB] flex flex-col items-center justify-center relative group cursor-pointer">
                {/* Professor Panda thumbnail */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/professor-panda.jpg"
                    alt="Professor Panda - Your Learning Guide"
                    fill
                    className="object-contain p-8 md:p-12"
                    priority
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-[#F97316]/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center">
                  <p className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
                    Video Coming Soon!
                  </p>
                  <p className="text-white/80 text-xs md:text-sm drop-shadow-md mt-1">
                    Click to play when available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative stars */}
          <div className="absolute -top-6 -left-6 text-[#F97316] animate-bounce" style={{ animationDuration: "2s" }}>
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-4 -right-4 text-[#3B82F6] animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
