'use client'  // Fixed: no hyphen!

import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

// Metadata cannot be exported from a client component
// Move metadata to a separate file or remove it

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}