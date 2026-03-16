"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress-bar"
import { 
  Home,
  Users,
  BarChart3,
  Download,
  Settings,
  LogOut,
  ChevronRight,
  BookOpen,
  Calculator,
  Microscope,
  Code,
  Music,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  FileText,
  Plus,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AddChildModal } from "@/components/add-child-modal"
import type { User } from "@supabase/supabase-js"

const subjectIcons: Record<string, typeof BookOpen> = {
  English: BookOpen,
  Maths: Calculator,
  Science: Microscope,
  Coding: Code,
  Music: Music,
}

const subjectColors: Record<string, string> = {
  English: "bg-pink-500",
  Maths: "bg-blue-500",
  Science: "bg-green-500",
  Coding: "bg-purple-500",
  Music: "bg-amber-500",
}

const worksheets = [
  { name: "Alphabet Tracing", subject: "English", downloads: 124 },
  { name: "Number Practice 1-10", subject: "Maths", downloads: 89 },
  { name: "Shape Coloring", subject: "Maths", downloads: 156 },
  { name: "Animal Matching", subject: "Science", downloads: 67 },
]

interface Child {
  id: string
  name: string
  avatar: string
  age: number
  total_stars: number
  current_streak: number
}

interface ChildWithProgress extends Child {
  subjects: {
    id: string
    name: string
    progress: number
    lessonsCompleted: number
    totalLessons: number
  }[]
}

export default function ParentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChildIndex, setSelectedChildIndex] = useState(0)
  const [children, setChildren] = useState<ChildWithProgress[]>([])
  const [showAddChildModal, setShowAddChildModal] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/auth/login")
        return
      }
      
      setUser(user)
      
      // Fetch children for this parent
      const { data: childrenData } = await supabase
        .from("children")
        .select("*")
        .eq("parent_id", user.id)
      
      if (childrenData && childrenData.length > 0) {
        // Add mock progress data for now (would come from progress table in production)
        const childrenWithProgress: ChildWithProgress[] = childrenData.map((child: Child) => ({
          ...child,
          avatar: child.name.charAt(0).toUpperCase(),
          subjects: [
            { id: "english", name: "English", progress: 65, lessonsCompleted: 8, totalLessons: 12 },
            { id: "maths", name: "Maths", progress: 45, lessonsCompleted: 5, totalLessons: 11 },
            { id: "science", name: "Science", progress: 30, lessonsCompleted: 3, totalLessons: 10 },
            { id: "coding", name: "Coding", progress: 80, lessonsCompleted: 8, totalLessons: 10 },
            { id: "music", name: "Music", progress: 55, lessonsCompleted: 6, totalLessons: 11 },
          ]
        }))
        setChildren(childrenWithProgress)
      } else {
        // Create default child from user metadata if no children exist
        const childName = user.user_metadata?.child_name || "Little Learner"
        const childAge = user.user_metadata?.child_age || 4
        setChildren([{
          id: "default",
          name: childName,
          avatar: childName.charAt(0).toUpperCase(),
          age: childAge,
          total_stars: 45,
          current_streak: 3,
          subjects: [
            { id: "english", name: "English", progress: 65, lessonsCompleted: 8, totalLessons: 12 },
            { id: "maths", name: "Maths", progress: 45, lessonsCompleted: 5, totalLessons: 11 },
            { id: "science", name: "Science", progress: 30, lessonsCompleted: 3, totalLessons: 10 },
            { id: "coding", name: "Coding", progress: 80, lessonsCompleted: 8, totalLessons: 10 },
            { id: "music", name: "Music", progress: 55, lessonsCompleted: 6, totalLessons: 11 },
          ]
        }])
      }
      
      setIsLoading(false)
    }
    
    checkUser()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleChildAdded = (newChild: { id: string; name: string; age: number; username: string; learningLevel: string }) => {
    const childWithProgress: ChildWithProgress = {
      id: newChild.id,
      name: newChild.name,
      avatar: newChild.name.charAt(0).toUpperCase(),
      age: newChild.age,
      total_stars: 0,
      current_streak: 0,
      subjects: [
        { id: "english", name: "English", progress: 0, lessonsCompleted: 0, totalLessons: 12 },
        { id: "maths", name: "Maths", progress: 0, lessonsCompleted: 0, totalLessons: 11 },
        { id: "science", name: "Science", progress: 0, lessonsCompleted: 0, totalLessons: 10 },
        { id: "coding", name: "Coding", progress: 0, lessonsCompleted: 0, totalLessons: 10 },
        { id: "music", name: "Music", progress: 0, lessonsCompleted: 0, totalLessons: 11 },
      ]
    }
    setChildren(prev => [...prev, childWithProgress])
    setSelectedChildIndex(children.length) // Select the new child
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const selectedChild = children[selectedChildIndex] || children[0]
  
  if (!selectedChild) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No children found. Please add a child profile.</p>
          <Link href="/parent/children">
            <Button className="mt-4">Add Child</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const totalLessonsCompleted = selectedChild.subjects.reduce((acc, s) => acc + s.lessonsCompleted, 0)
  const totalLessons = selectedChild.subjects.reduce((acc, s) => acc + s.totalLessons, 0)
  const timeSpent = `${Math.floor(totalLessonsCompleted * 0.5)}h ${(totalLessonsCompleted * 30) % 60}m`

  const recentActivity = [
    { child: selectedChild.name, activity: "Completed 'Counting to 10'", subject: "Maths", time: "2 hours ago" },
    { child: selectedChild.name, activity: "Earned 3 stars in 'Letter Sounds'", subject: "English", time: "3 hours ago" },
    { child: selectedChild.name, activity: "Started 'Animal Sounds'", subject: "Science", time: "Yesterday" },
    { child: selectedChild.name, activity: "Completed 'Move the Robot'", subject: "Coding", time: "Yesterday" },
  ]

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Parent"
  const userAvatar = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/genie-us-logo.jpg"
                alt="GENIE-US"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <span className="text-xl font-display font-bold text-foreground">GENIE-US</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/parent/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              href="/parent/children" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
            >
              <Users className="w-5 h-5" />
              Children
            </Link>
            <Link 
              href="/parent/analytics" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>
            <Link 
              href="/worksheets" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
            >
              <Download className="w-5 h-5" />
              Worksheets
            </Link>
            <Link 
              href="/parent/settings" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {userAvatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{userName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-border py-4 px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Parent Dashboard</h1>
            
            {/* Child selector */}
            <div className="flex items-center gap-2">
              {children.map((child, index) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildIndex(index)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                    selectedChildIndex === index 
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {child.avatar}
                </button>
              ))}
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full"
                onClick={() => setShowAddChildModal(true)}
                title="Add Child Account"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          {/* Child Overview */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {selectedChild.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold text-card-foreground">{selectedChild.name}&apos;s Progress</h2>
                  <p className="text-muted-foreground">Age {selectedChild.age} • Learning Explorer</p>
                </div>
                <div className="flex gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                      <Trophy className="w-5 h-5" />
                      {selectedChild.current_streak}
                    </div>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
                      <Target className="w-5 h-5" />
                      {totalLessonsCompleted}
                    </div>
                    <p className="text-sm text-muted-foreground">Lessons Done</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-amber-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedChild.total_stars}
                    </div>
                    <p className="text-sm text-muted-foreground">Stars Earned</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                      <Clock className="w-5 h-5" />
                      {timeSpent}
                    </div>
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Subject Progress */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-card-foreground">Subject Progress</h3>
                <Link href="/parent/analytics" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {selectedChild.subjects.map((subject) => {
                  const Icon = subjectIcons[subject.name] || BookOpen
                  const color = subjectColors[subject.name] || "bg-gray-500"
                  return (
                    <div key={subject.id} className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-card-foreground">{subject.name}</span>
                          <span className="text-sm text-muted-foreground">{subject.lessonsCompleted}/{subject.totalLessons} lessons</span>
                        </div>
                        <ProgressBar 
                          progress={subject.progress} 
                          color={color} 
                          size="sm" 
                          showLabel={false}
                        />
                      </div>
                      <span className="text-sm font-bold text-card-foreground w-12 text-right">{subject.progress}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-lg font-display font-bold text-card-foreground mb-6">Weekly Goal</h3>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray={`${(totalLessonsCompleted / totalLessons) * 352} 352`}
                      strokeLinecap="round"
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-card-foreground">{totalLessonsCompleted}</span>
                    <span className="text-sm text-muted-foreground">of {totalLessons}</span>
                  </div>
                </div>
                <p className="text-center text-muted-foreground">
                  {totalLessons - totalLessonsCompleted} more lessons to complete all subjects!
                </p>
              </div>
            </div>
          </div>

          {/* Activity & Worksheets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-card-foreground">Recent Activity</h3>
                <Link href="/parent/activity" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground">
                        <span className="font-medium">{activity.child}</span> {activity.activity}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.subject} - {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Worksheets */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-card-foreground">Downloadable Worksheets</h3>
                <Link href="/worksheets" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {worksheets.map((worksheet, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{worksheet.name}</p>
                        <p className="text-xs text-muted-foreground">{worksheet.subject}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Child Modal */}
      <AddChildModal
        isOpen={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        onChildAdded={handleChildAdded}
      />
    </div>
  )
}
