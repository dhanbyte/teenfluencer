// app/brand/layout.tsx
import React from "react";

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-pink-50">
        <header className="bg-pink-500 text-white p-4">
          ye brand ka layout hia 
          
        </header>
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
