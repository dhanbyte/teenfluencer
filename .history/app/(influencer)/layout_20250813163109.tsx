/* eslint-disable @next/next/no-css-tags */
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import InfluencerNavbar from "@/Components/(Infuencer)/influencerNavbar";
import "@/Components/(Public)/globals.css"; // Ensure this path is correct
export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
            <link rel="stylesheet" href="../(public)/globals.css" />

        </head>
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