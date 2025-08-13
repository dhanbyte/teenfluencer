/* eslint-disable @next/next/no-css-tags */
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import PublicNavbar from '@/Components/(Public)/Public-navbar'
import Footer from '@/Components/(Public)/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
  <link rel="stylesheet" href="@/app/Style/globals.css" />
</head>
        <body>
        <PublicNavbar />
          {children}
        <Footer />
          </body>
      </html>
    </ClerkProvider>
  )
}