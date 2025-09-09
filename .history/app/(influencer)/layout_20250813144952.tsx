import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "../(public)/globals.css";     
import InfluencerNavbar from "@/Components/(Infuencer)/influencerNavbar";

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-purple-50">
          <InfluencerNavbar />
          <main className="flex-1 pt-16 p-6"> {/* Added pt-16 to account for fixed navbar height */}
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}