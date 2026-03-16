"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Sparkles, GraduationCap, Users } from "lucide-react"

function SignUpSuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "parent"
  const isStudent = type === "student"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 p-4">
      {/* Floating decorations */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-6 h-6 text-pink-400" />
      </div>

      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-6">
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

        {/* Success Card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 ${isStudent ? 'border-blue-200' : 'border-green-200'}`}>
          <div className={`w-20 h-20 mx-auto ${isStudent ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mb-6`}>
            {isStudent ? (
              <GraduationCap className="w-10 h-10 text-blue-600" />
            ) : (
              <Users className="w-10 h-10 text-green-600" />
            )}
          </div>

          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            {isStudent ? "Welcome, Future Genius!" : "Check Your Email!"}
          </h1>
          <p className="text-muted-foreground mb-6">
            We&apos;ve sent a confirmation link to your email address.
            {isStudent
              ? " Click the link to activate your student account and start your learning adventure!"
              : " Please click the link to activate your account and set up your child's learning journey!"}
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              Didn&apos;t receive the email? Check your spam folder or try signing up again.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold">
              Go to Login
            </Button>
          </Link>
        </div>

        {/* Professor Panda */}
        <div className="flex justify-center mt-6">
          <Image
            src="/images/professor-panda.jpg"
            alt="Professor Panda"
            width={120}
            height={120}
            className="drop-shadow-lg"
            loading="eager"
            priority
          />
          <div className="ml-4 bg-white rounded-2xl p-3 shadow-lg self-center">
            <p className="text-sm font-medium">See you soon, little explorer!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" /></div>}>
      <SignUpSuccessContent />
    </Suspense>
  )
}
