// File: teenfluencers/app/layout.tsx
import PublicNavbar from "@/Components/Public/Public-navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Navbar at the top */}
        <PublicNavbar />
        
        {/* Main content that will grow to fill space */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* If you have a footer, it would go here */}
      </body>
    </html>
  );
}