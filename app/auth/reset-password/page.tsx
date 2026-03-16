"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Sparkles, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const supabase = createClient()
    
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/auth/login")
    }, 3000)
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

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-primary/10">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Password Updated!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your password has been successfully reset. Redirecting to login...
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-12 rounded-xl">
                  Go to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
                Reset Your Password
              </h1>
              <p className="text-center text-muted-foreground mb-6">
                Enter your new password below
              </p>

              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pl-10 pr-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                      required
                      minLength={6}
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
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pl-10 h-12 rounded-xl border-2 border-muted focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </>
          )}
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
