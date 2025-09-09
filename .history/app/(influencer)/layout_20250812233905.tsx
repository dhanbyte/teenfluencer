// app/influencer/layout.tsx
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-purple-50">
     
        <main className="flex-1 p-6"> <ClerkProvider>{children}</ClerkProvider></main>
      </body>
    </html>
  );
}
