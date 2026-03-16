import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 p-4">
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

        {/* Error Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-red-200">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t complete the authentication. Please try again.
          </p>

          <div className="flex gap-3">
            <Link href="/auth/login" className="flex-1">
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                Try Login
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="flex-1">
              <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold">
                Sign Up
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
            loading="eager"
            priority
          />
        </div>
      </div>
    </div>
  )
}
