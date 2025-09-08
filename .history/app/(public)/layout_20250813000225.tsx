// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import PublicNavbar from '@/Components/Public/Public-navbar'
import Footer from '@/Components/Public/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <PublicNavbar />
        <body>{children}</body>
        <Footer />
      </html>
    </ClerkProvider>
  )
}