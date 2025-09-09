// app/influencer/layout.tsx
import React from "react";

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-purple-50">
        <header className="bg-purple-600 text-white p-4 text-center font-bold">
          Ye Influencer ka Layout hai
        </header>
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
