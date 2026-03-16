"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Sparkles, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  useEffect(() => {
    // Check for URL parameters
    const errorParam = searchParams.get("error")
    const confirmedParam = searchParams.get("confirmed")
    
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }
    if (confirmedParam === "true") {
      setSuccess("Email confirmed successfully! You can now log in.")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      // Provide more helpful error messages
      if (authError.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please check your credentials and try again. If you recently signed up, please confirm your email first.")
      } else if (authError.message.includes("Email not confirmed")) {
        setError("Please confirm your email address before logging in. Check your inbox for the confirmation link.")
      } else {
        setError(authError.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      // Check user role from metadata
      const role = data.user.user_metadata?.role || 'parent'
      if (role === 'parent') {
        router.push("/parent/dashboard")
      } else {
        router.push("/dashboard/kids")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 p-4">
      {/* Floating decorations */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-6 h-6 text-pink-400" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "0.5s" }}>
        <Sparkles className="w-10 h-10 text-blue-400" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/">
            <Image
              src="/images/genie-us-logo.jpg"
              alt="GENIE-US"
              width={150}
              height={150}
              className="mx-auto drop-shadow-lg"
              priority
              loading="eager"
            />
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-primary/10">
          <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Sign in to continue your learning adventure
          </p>

          {success && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              {success}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="pl-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
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
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/auth/sign-up" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Help text */}
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              Parents can create accounts and add children from the Dashboard. After signing up, check your email for confirmation.
            </p>
          </div>
          
          {/* Child login link */}
          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-sm">
              Are you a student?{" "}
              <Link href="/auth/login/child" className="text-blue-600 font-semibold hover:underline">
                Student Login
              </Link>
            </p>
          </div>
          
          {/* Forgot password link */}
          <div className="mt-3 text-center">
            <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Professor Panda */}
        <div className="flex justify-center mt-6">
          <Image
            src="/images/professor-panda.jpg"
            alt="Professor Panda"
            width={100}
            height={100}
            className="drop-shadow-lg"
            loading="eager"
            priority
          />
        </div>
      </div>
    </div>
  )
}
