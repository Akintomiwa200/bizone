"use client"

import { useState } from 'react'
import Sidebar from './Sidebar'
import TopNav from './Navigation/TopNav'

interface DashboardLayoutProps {
  children: React.ReactNode
  userType?: 'business' | 'rider' | 'customer'
}

export default function DashboardLayout({ 
  children, 
  userType = 'business' 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:flex">
        <Sidebar userType={userType} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav 
          onMenuClick={() => setSidebarOpen(true)}
          userType={userType}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
            <Sidebar userType={userType} />
          </div>
        </div>
      )}
    </div>
  )
}