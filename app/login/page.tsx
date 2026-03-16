"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth, UserRole } from "@/lib/auth-context"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [role, setRole] = useState<UserRole>("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(email, password, role)
    
    if (success) {
      router.push(role === "student" ? "/dashboard/kids" : "/parent/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/images/genie-us-logo.jpg"
              alt="GENIE-US"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back!</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue your learning adventure</p>
          </div>

          {/* Role Selector */}
          <div className="bg-muted rounded-full p-1 flex mb-6">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={cn(
                "flex-1 py-3 px-4 rounded-full font-medium transition-all flex items-center justify-center gap-2",
                role === "student" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-xl">🎓</span>
              <span>I&apos;m a Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("parent")}
              className={cn(
                "flex-1 py-3 px-4 rounded-full font-medium transition-all flex items-center justify-center gap-2",
                role === "parent" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-xl">👨‍👩‍👧</span>
              <span>I&apos;m a Parent</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 shadow-playful">
            {error && (
              <div className="bg-destructive/10 text-destructive rounded-xl p-3 mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-12"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-12 pr-12"
                    disabled={isLoading}
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

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full rounded-full font-bold h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

          {/* Demo accounts hint */}
          <div className="mt-6 bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Demo:</strong> Use any email and password (4+ characters) to sign in
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
