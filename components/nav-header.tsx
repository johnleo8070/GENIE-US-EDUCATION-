"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Menu, X, LogOut, LayoutDashboard, ChevronDown, BookOpen, Calculator, Atom, Code, Music, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface NavHeaderProps {
  className?: string
}

const subjects = [
  {
    name: "English",
    href: "/subjects/english",
    icon: BookOpen,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    description: "ABC, Reading & Writing"
  },
  {
    name: "Maths",
    href: "/subjects/maths",
    icon: Calculator,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    description: "Numbers & Counting"
  },
  {
    name: "Science",
    href: "/subjects/science",
    icon: Atom,
    color: "text-green-500",
    bgColor: "bg-green-100",
    description: "Nature & Discovery"
  },
  {
    name: "Coding",
    href: "/subjects/coding",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    description: "Logic & Programming"
  },
  {
    name: "Music",
    href: "/subjects/music",
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    description: "Sounds & Rhythm"
  },
  {
    name: "Public Speaking",
    href: "/subjects/public-speaking",
    icon: MessageSquare,
    color: "text-red-500",
    bgColor: "bg-red-100",
    description: "Confidence & Expression"
  },
]

export function NavHeader({ className }: NavHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSubjectsMenu, setShowSubjectsMenu] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowUserMenu(false)
    router.push("/")
    router.refresh()
  }

  return (
    <header className={cn("w-full py-4 px-4 md:px-8 absolute top-0 left-0 right-0 z-50", className)}>
      <nav className="max-w-6xl mx-auto">
        {/* Desktop Navigation - Centered pill buttons */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg">
            <Link
              href="/"
              className="px-5 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all"
            >
              Home
            </Link>

            {/* Subjects Dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setShowSubjectsMenu(false)}
            >
              <button
                onClick={() => setShowSubjectsMenu(!showSubjectsMenu)}
                className="px-5 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-1"
              >
                Subjects
                <ChevronDown className={cn("w-4 h-4 transition-transform", showSubjectsMenu && "rotate-180")} />
              </button>

              {showSubjectsMenu && (
                <div className="absolute left-1/2 -translate-x-1/2 top-10 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl p-3 min-w-[280px] animate-slide-up">
                    <div className="flex flex-col gap-1">
                      {subjects.map((subject) => {
                        const IconComponent = subject.icon
                        return (
                          <Link
                            key={subject.name}
                            href={subject.href}
                            onClick={() => setShowSubjectsMenu(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all group"
                          >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", subject.bgColor)}>
                              <IconComponent className={cn("w-5 h-5", subject.color)} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{subject.name}</p>
                              <p className="text-xs text-muted-foreground">{subject.description}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link
                        href="/subjects"
                        onClick={() => setShowSubjectsMenu(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-all"
                      >
                        View All Subjects
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/worksheets"
              className="px-5 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all"
            >
              Worksheets
            </Link>

            <Link
              href="/games/coding"
              className="px-5 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all"
            >
              Coding Game
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {user.user_metadata?.full_name?.split(' ')[0] || 'Account'}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl p-2 min-w-[180px] animate-slide-up">
                    <Link
                      href={user.user_metadata?.role === 'student' ? '/dashboard/kids' : '/parent/dashboard'}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all text-sm font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {user.user_metadata?.role === 'student' ? 'My Learning' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/sign-up"
                  className="px-5 py-2 rounded-full text-sm font-semibold border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10 transition-all"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">

          </Link>

          <button
            className="p-2 rounded-full bg-white/90 shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 z-50 animate-slide-up max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-xl py-3 px-4 font-semibold text-foreground/80 hover:bg-primary/10 transition-all text-center"
            >
              Home
            </Link>

            {/* Mobile Subjects Section */}
            <div className="border-t border-gray-100 pt-2 mt-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">Subjects</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => {
                  const IconComponent = subject.icon
                  return (
                    <Link
                      key={subject.name}
                      href={subject.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn("flex flex-col items-center gap-2 p-3 rounded-xl transition-all", subject.bgColor, "hover:opacity-80")}
                    >
                      <IconComponent className={cn("w-6 h-6", subject.color)} />
                      <span className="font-semibold text-sm text-foreground">{subject.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2 mt-1">
              <Link
                href="/worksheets"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl py-3 px-4 font-semibold text-foreground/80 hover:bg-primary/10 transition-all text-center block"
              >
                Worksheets
              </Link>
              <Link
                href="/games/coding"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl py-3 px-4 font-semibold text-foreground/80 hover:bg-primary/10 transition-all text-center block"
              >
                Coding Game
              </Link>
            </div>

            {user ? (
              <>
                <Link
                  href={user.user_metadata?.role === 'student' ? '/dashboard/kids' : '/parent/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl py-3 px-4 font-semibold bg-primary/10 text-primary text-center mt-2 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {user.user_metadata?.role === 'student' ? 'My Learning' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full rounded-xl py-3 px-4 font-semibold bg-red-500 text-white text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl py-3 px-4 font-semibold border-2 border-[#F97316] text-[#F97316] text-center"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl py-3 px-4 font-semibold bg-[#F97316] text-white text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
