"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function ChildLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/children/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.")
        setLoading(false)
        return
      }

      // Redirect to kids dashboard
      router.push("/dashboard/kids")
      router.refresh()
    } catch {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-[#FFE4CC] to-[#FFF0DB] flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md">
        {/* Back to parent login link */}
        <Link 
          href="/auth/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Parent Login
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-blue-200">
          {/* Logo */}
          <div className="text-center mb-6">
            <Image
              src="/images/genie-us-logo.jpg"
              alt="GENIE-US"
              width={120}
              height={120}
              className="mx-auto drop-shadow-lg"
              priority
              loading="eager"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              Student Login
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome Back, Learner!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Enter your username and password to continue learning
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 rounded-xl h-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-xl h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Logging In...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning!
                </>
              )}
            </Button>
          </form>

          {/* Help text */}
          <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              Ask your parent for your username and password. They created it for you in their Parent Dashboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
