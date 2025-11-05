"use client"

import { useState } from 'react'
import Sidebar from './Sidebar'
import MainNav from './Navigation/MainNav'
import MobileNav from './Navigation/MobileNav'
import UserNav from './Navigation/UserNav'

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
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userType={userType}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <MainNav />
            </div>

            <div className="flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userType={userType}
      />
    </div>
  )
}