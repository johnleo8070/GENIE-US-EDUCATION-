"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Baby } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      setError(null)
      setStep(2)
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          role: 'parent',
          child_name: childName,
          child_age: parseInt(childAge) || 4,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      router.push("/auth/sign-up-success")
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

        {/* Sign Up Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-primary/10">
          <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
            {step === 1 ? "Create Account" : "Add Your Child"}
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            {step === 1 
              ? "Start your child's magical learning journey" 
              : "Tell us about your little learner"}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="pl-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Child&apos;s Name</label>
                  <div className="relative">
                    <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Your child's name"
                      className="pl-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Child&apos;s Age</label>
                  <div className="grid grid-cols-6 gap-2">
                    {[2, 3, 4, 5, 6, 7].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setChildAge(age.toString())}
                        className={`h-12 rounded-xl font-bold text-lg transition-all ${
                          childAge === age.toString()
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar selection preview */}
                <div className="text-center py-4">
                  <Image
                    src="/images/professor-panda.jpg"
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="mx-auto rounded-full border-4 border-primary shadow-lg"
                    loading="eager"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Professor Panda will guide {childName || "your child"}!
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 rounded-xl font-bold"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={loading || (step === 2 && !childAge)}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? "Creating..." : step === 1 ? "Continue" : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
          
          {/* Info about child accounts */}
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              After signing up, you can add child accounts from your Parent Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
