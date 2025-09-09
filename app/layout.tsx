'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import './globals.css'
import InfluencerNavbar from '@/Components/(Infuencer)/influencerNavbar'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const {} = useUser()
  const isInfluencerRoute = pathname?.startsWith('/influencer')
  const isAdminRoute = pathname?.startsWith('/admin')
  const isAuthRoute = pathname?.startsWith('/sign-')
  
  if (isInfluencerRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-purple-50">
        <InfluencerNavbar />
        <main className="flex-1 pt-16 p-6">
          {children}
        </main>
      </div>
    )
  }
  
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    )
  }
  
  if (isAuthRoute) {
    return <div>{children}</div>
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </ClerkProvider>
  )
}