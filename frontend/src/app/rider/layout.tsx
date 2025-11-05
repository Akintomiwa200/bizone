'use client'

import React from 'react'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 shadow font-semibold text-lg bg-gray-100">
        Customer Navigation
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
