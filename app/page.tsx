import { NavHeader } from "@/components/nav-header"
import { HeroSection } from "@/components/hero-section"
import { CodingSection } from "@/components/coding-section"
import { VideoLessonsSection } from "@/components/video-lessons-section"
import { FeaturedVideoSection } from "@/components/featured-video-section"
import { StoriesBanner } from "@/components/stories-banner"
import { PricingSection } from "@/components/pricing-section"
import { PracticeSection } from "@/components/practice-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <NavHeader />
      <HeroSection />
      <CodingSection />
      <FeaturedVideoSection />
      <VideoLessonsSection />
      <StoriesBanner />
      <PricingSection />
      <PracticeSection />
      <Footer />
    </main>
  )
}
