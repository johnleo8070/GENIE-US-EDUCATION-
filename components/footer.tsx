"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FDE68A]/30 to-[#FEF3C7] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center">
                <span className="text-xl font-display font-bold text-white">G</span>
              </div>
              <span className="text-xl font-display font-bold text-foreground">GENIE-US</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Making learning fun and engaging for children aged 2-7.
            </p>
            <Image
              src="/images/professor-panda.jpg"
              alt="Professor Panda"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Learning */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Learning</h4>
            <ul className="space-y-2">
              <li><Link href="/classroom?subject=english" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">English</Link></li>
              <li><Link href="/classroom?subject=maths" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Maths</Link></li>
              <li><Link href="/classroom?subject=science" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Science</Link></li>
              <li><Link href="/games/coding" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Coding</Link></li>
              <li><Link href="/classroom?subject=music" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Music</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/stories" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Toy Stories</Link></li>
              <li><Link href="/games" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Games</Link></li>
              <li><Link href="/worksheets" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Worksheets</Link></li>
              <li><Link href="/classroom" prefetch={true} className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Classroom</Link></li>
            </ul>
          </div>

          {/* For Parents */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">For Parents</h4>
            <ul className="space-y-2">
              <li><Link href="/parent/dashboard" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Parent Dashboard</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#F97316]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GENIE-US. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with love for young learners everywhere
          </p>
          <a 
            href="https://gstatmobile.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            DEVELOPED BY GSTAT MOBILE SOLUTIONS
          </a>
        </div>
      </div>
    </footer>
  )
}
