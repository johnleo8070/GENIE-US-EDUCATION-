"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, ArrowLeft } from "lucide-react"

export default function StudentSignUpPage() {
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

        {/* Info Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-blue-200">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
            Student Accounts
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Child/student accounts can only be created by parents from within the Parent Dashboard.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Parent creates an account or signs in</li>
              <li>Parent goes to their Dashboard</li>
              <li>Parent clicks &quot;Add Child&quot; to create a child account</li>
              <li>Child can then log in with their credentials</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Link href="/auth/sign-up" className="block">
              <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Parent Sign Up
              </Button>
            </Link>
            
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full h-12 rounded-xl font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
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
          />
        </div>
      </div>
    </div>
  )
}
