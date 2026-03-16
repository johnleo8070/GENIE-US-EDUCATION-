"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Sparkles, Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
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
                Check Your Email
              </h1>
              <p className="text-muted-foreground mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-12 rounded-xl">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
              
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Forgot Password?
              </h1>
              <p className="text-muted-foreground mb-6">
                No worries! Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
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
