'use client'

import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 font-semibold text-lg">
        Dashboard Header
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
