"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth, UserRole } from "@/lib/auth-context"
import { Eye, EyeOff, ArrowLeft, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [role, setRole] = useState<UserRole>("student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const passwordRequirements = [
    { met: password.length >= 4, label: "At least 4 characters" },
    { met: password === confirmPassword && password.length > 0, label: "Passwords match" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters")
      return
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    const success = await signup(name, email, password, role)
    
    if (success) {
      router.push(role === "student" ? "/dashboard/kids" : "/parent/dashboard")
    } else {
      setError("Failed to create account. Please try again.")
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

      <main className="flex-1 flex items-center justify-center p-4 pb-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <Image
              src="/images/genie-us-logo.jpg"
              alt="GENIE-US"
              width={120}
              height={120}
              className="mx-auto mb-3"
            />
            <h1 className="text-2xl font-display font-bold text-foreground">Create Your Account</h1>
            <p className="text-muted-foreground mt-1 text-sm">Join the magical learning adventure!</p>
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
              <span>Student</span>
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
              <span>Parent</span>
            </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 shadow-playful">
            {error && (
              <div className="bg-destructive/10 text-destructive rounded-xl p-3 mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  {role === "student" ? "Your Name" : "Parent Name"}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={role === "student" ? "Enter your name" : "Enter your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl h-12"
                  disabled={isLoading}
                />
              </div>

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
                    placeholder="Create a password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl h-12"
                  disabled={isLoading}
                />
              </div>

              {/* Password requirements */}
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center",
                      req.met ? "bg-accent text-white" : "bg-muted"
                    )}>
                      {req.met && <Check className="w-3 h-3" />}
                    </div>
                    <span className={req.met ? "text-accent" : "text-muted-foreground"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full rounded-full font-bold h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
