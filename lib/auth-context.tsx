"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type UserRole = "student" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  children?: ChildProfile[]
}

export interface ChildProfile {
  id: string
  name: string
  avatar: string
  age: number
  totalStars: number
  streak: number
  level: number
  subjects: SubjectProgress[]
  completedLessons: string[]
  badges: string[]
}

export interface SubjectProgress {
  id: string
  name: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  updateChildProgress: (childId: string, updates: Partial<ChildProfile>) => void
  addStars: (childId: string, stars: number) => void
  completeLesson: (childId: string, lessonId: string) => void
  earnBadge: (childId: string, badgeId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const mockStudentUser: User = {
  id: "student-1",
  name: "Emma",
  email: "emma@example.com",
  role: "student",
  avatar: "E",
}

const mockParentUser: User = {
  id: "parent-1",
  name: "Sarah Johnson",
  email: "parent@example.com",
  role: "parent",
  avatar: "S",
  children: [
    {
      id: "child-1",
      name: "Emma",
      avatar: "E",
      age: 5,
      totalStars: 45,
      streak: 3,
      level: 5,
      subjects: [
        { id: "english", name: "English", progress: 65, lessonsCompleted: 8, totalLessons: 12 },
        { id: "maths", name: "Maths", progress: 45, lessonsCompleted: 5, totalLessons: 11 },
        { id: "science", name: "Science", progress: 30, lessonsCompleted: 3, totalLessons: 10 },
        { id: "coding", name: "Coding", progress: 80, lessonsCompleted: 8, totalLessons: 10 },
        { id: "music", name: "Music", progress: 55, lessonsCompleted: 6, totalLessons: 11 },
      ],
      completedLessons: ["english-1", "english-2", "maths-1", "coding-1", "coding-2"],
      badges: ["first-lesson", "streak-3", "perfect-score"],
    },
    {
      id: "child-2",
      name: "Jack",
      avatar: "J",
      age: 4,
      totalStars: 28,
      streak: 1,
      level: 3,
      subjects: [
        { id: "english", name: "English", progress: 40, lessonsCompleted: 4, totalLessons: 10 },
        { id: "maths", name: "Maths", progress: 25, lessonsCompleted: 3, totalLessons: 12 },
        { id: "science", name: "Science", progress: 20, lessonsCompleted: 2, totalLessons: 10 },
        { id: "coding", name: "Coding", progress: 30, lessonsCompleted: 3, totalLessons: 10 },
        { id: "music", name: "Music", progress: 35, lessonsCompleted: 4, totalLessons: 11 },
      ],
      completedLessons: ["english-1", "maths-1"],
      badges: ["first-lesson"],
    },
  ],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("genieus-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("genieus-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock authentication - in production, this would be a real API call
    if (password.length >= 4) {
      const userData = role === "student" 
        ? { ...mockStudentUser, email, name: email.split("@")[0] }
        : { ...mockParentUser, email }
      
      setUser(userData)
      localStorage.setItem("genieus-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (name && email && password.length >= 4) {
      const userData: User = role === "student" 
        ? { 
            id: `student-${Date.now()}`,
            name,
            email,
            role: "student",
            avatar: name.charAt(0).toUpperCase(),
          }
        : {
            id: `parent-${Date.now()}`,
            name,
            email,
            role: "parent",
            avatar: name.charAt(0).toUpperCase(),
            children: [],
          }
      
      setUser(userData)
      localStorage.setItem("genieus-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("genieus-user")
  }

  const updateChildProgress = (childId: string, updates: Partial<ChildProfile>) => {
    if (!user || user.role !== "parent" || !user.children) return
    
    const updatedChildren = user.children.map(child => 
      child.id === childId ? { ...child, ...updates } : child
    )
    
    const updatedUser = { ...user, children: updatedChildren }
    setUser(updatedUser)
    localStorage.setItem("genieus-user", JSON.stringify(updatedUser))
  }

  const addStars = (childId: string, stars: number) => {
    if (!user || user.role !== "parent" || !user.children) return
    
    const child = user.children.find(c => c.id === childId)
    if (child) {
      updateChildProgress(childId, { totalStars: child.totalStars + stars })
    }
  }

  const completeLesson = (childId: string, lessonId: string) => {
    if (!user || user.role !== "parent" || !user.children) return
    
    const child = user.children.find(c => c.id === childId)
    if (child && !child.completedLessons.includes(lessonId)) {
      updateChildProgress(childId, { 
        completedLessons: [...child.completedLessons, lessonId] 
      })
    }
  }

  const earnBadge = (childId: string, badgeId: string) => {
    if (!user || user.role !== "parent" || !user.children) return
    
    const child = user.children.find(c => c.id === childId)
    if (child && !child.badges.includes(badgeId)) {
      updateChildProgress(childId, { 
        badges: [...child.badges, badgeId] 
      })
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout,
      updateChildProgress,
      addStars,
      completeLesson,
      earnBadge
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
