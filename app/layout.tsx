import type { Metadata, Viewport } from 'next'
import { Nunito, Fredoka } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap',
})

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GENIE-US | Learn, Play & Explore with Professor Panda',
  description: 'A fun and interactive e-learning platform for kids aged 2-7. Learn English, Maths, Science, Coding, and Music with Professor Panda!',
  generator: 'v0.app',
  keywords: ['kids learning', 'e-learning', 'educational games', 'preschool', 'kindergarten', 'Professor Panda'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4A90E2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${fredoka.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
