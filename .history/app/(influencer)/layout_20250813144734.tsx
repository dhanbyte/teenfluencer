// File: app/layout.js

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "TeenFluencer Platform",
  description: "Connecting brands with teen influencers.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}