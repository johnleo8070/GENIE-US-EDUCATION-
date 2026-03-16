"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { ProgressBar } from "@/components/progress-bar"
import { StarRating } from "@/components/star-rating"
import { AchievementBadge } from "@/components/achievement-badge"
import { LessonCard } from "@/components/lesson-card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Code, 
  Music,
  Home,
  Trophy,
  Settings,
  LogOut,
  Loader2
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

const encouragementMessages = [
  "Great job! Let's try the next adventure!",
  "You're doing amazing today!",
  "Keep up the fantastic work!",
  "I'm so proud of you!",
  "Ready for more fun learning?"
]

const subjectIcons: Record<string, typeof BookOpen> = {
  english: BookOpen,
  maths: Calculator,
  science: Microscope,
  coding: Code,
  music: Music,
}

const subjectColors: Record<string, string> = {
  english: "bg-pink-500",
  maths: "bg-blue-500",
  science: "bg-green-500",
  coding: "bg-purple-500",
  music: "bg-amber-500",
}

const recentLessons = [
  { title: "The Missing Letter", subject: "english" as const, progress: 100, starsEarned: 3, status: "completed" as const, lessonNumber: 1 },
  { title: "Counting to 10", subject: "maths" as const, progress: 60, starsEarned: 2, status: "in-progress" as const, lessonNumber: 2 },
  { title: "Animal Sounds", subject: "science" as const, progress: 0, starsEarned: 0, status: "available" as const, lessonNumber: 3 },
  { title: "Move the Robot", subject: "coding" as const, progress: 0, starsEarned: 0, status: "locked" as const, lessonNumber: 4 },
]

export default function KidsDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [childData, setChildData] = useState<{
    name: string
    avatar: string
    totalStars: number
    streak: number
    level: number
    subjects: { id: string; name: string; progress: number }[]
  } | null>(null)
  const [currentMessage] = useState(
    encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
  )

  useEffect(() => {
    const supabase = createClient()
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/auth/login")
        return
      }
      
      setUser(user)
      
      // Get child data from user metadata or database
      const childName = user.user_metadata?.child_name || user.user_metadata?.full_name || "Little Learner"
      
      setChildData({
        name: childName,
        avatar: childName.charAt(0).toUpperCase(),
        totalStars: 45,
        streak: 3,
        level: 5,
        subjects: [
          { id: "english", name: "English", progress: 65 },
          { id: "maths", name: "Maths", progress: 45 },
          { id: "science", name: "Science", progress: 30 },
          { id: "coding", name: "Coding", progress: 80 },
          { id: "music", name: "Music", progress: 55 },
        ]
      })
      
      setIsLoading(false)
    }
    
    checkUser()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your adventure...</p>
        </div>
      </div>
    )
  }

  if (!user || !childData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4 px-4 md:px-8 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/genie-us-logo.jpg"
              alt="GENIE-US"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <span className="text-xl font-display font-bold text-foreground hidden sm:inline">GENIE-US</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Stars counter */}
            <div className="flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-amber-700">{childData.totalStars}</span>
            </div>

            {/* User avatar with dropdown */}
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                {childData.avatar}
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-2 border-b">
                  <p className="font-medium">{childData.name}</p>
                  <p className="text-sm text-muted-foreground">Level {childData.level}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome Section with Professor Panda */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-playful mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda"
                width={150}
                height={150}
                className="drop-shadow-lg"
                loading="eager"
                priority
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg max-w-[180px] text-center">
                <p className="text-sm font-medium">{currentMessage}</p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-card-foreground mb-2">
                Hi, {childData.name}!
              </h1>
              <p className="text-muted-foreground mb-4">
                You&apos;re on a {childData.streak}-day learning streak! Keep it up!
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <span className="text-xl font-bold text-primary">{childData.level}</span>
                </div>
                <StarRating earned={childData.streak} total={5} size="md" />
              </div>
            </div>
            <Link href="/classroom">
              <Button size="lg" className="rounded-full font-bold shadow-lg">
                Start Learning
              </Button>
            </Link>
          </div>
        </section>

        {/* Subject Progress */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
            Your Subjects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {childData.subjects.map((subject, index) => {
              const Icon = subjectIcons[subject.id] || BookOpen
              const color = subjectColors[subject.id] || "bg-gray-500"
              return (
                <Link 
                  key={subject.id} 
                  href={`/subjects/${subject.id}`}
                  className="block animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl p-4 shadow-playful hover:shadow-playful-lg transition-all hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-card-foreground mb-2">{subject.name}</h3>
                    <ProgressBar 
                      progress={subject.progress} 
                      color={color} 
                      size="sm" 
                      showLabel={false}
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">{subject.progress}% complete</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Continue Learning
            </h2>
            <Link href="/lessons">
              <Button variant="outline" className="rounded-full">
                See All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentLessons.map((lesson, index) => (
              <div 
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LessonCard 
                  {...lesson}
                  href={`/classroom`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
            Your Achievements
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-playful">
            <div className="flex flex-wrap justify-center gap-6">
              <AchievementBadge type="first-lesson" earned />
              <AchievementBadge type="streak" earned />
              <AchievementBadge type="perfect-score" earned />
              <AchievementBadge type="explorer" earned={false} />
              <AchievementBadge type="coder" earned={false} />
              <AchievementBadge type="reader" earned={false} />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-20 md:mb-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/stories">
              <Button 
                variant="outline" 
                className="w-full h-auto py-6 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary bg-white"
              >
                <span className="text-2xl">📚</span>
                <span className="font-display font-bold">Toy Stories</span>
              </Button>
            </Link>
            <Link href="/games">
              <Button 
                variant="outline" 
                className="w-full h-auto py-6 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary bg-white"
              >
                <span className="text-2xl">🎮</span>
                <span className="font-display font-bold">Games</span>
              </Button>
            </Link>
            <Link href="/worksheets">
              <Button 
                variant="outline" 
                className="w-full h-auto py-6 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary bg-white"
              >
                <span className="text-2xl">📝</span>
                <span className="font-display font-bold">Worksheets</span>
              </Button>
            </Link>
            <Link href="/classroom">
              <Button 
                variant="outline" 
                className="w-full h-auto py-6 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary bg-white"
              >
                <span className="text-2xl">🏫</span>
                <span className="font-display font-bold">Classroom</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-border py-2 px-4 md:hidden z-50">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/dashboard/kids" className="flex flex-col items-center gap-1 text-primary">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Learn</span>
          </Link>
          <Link href="/games" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Games</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
