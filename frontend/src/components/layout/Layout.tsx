"use client"

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Layout({ children, sidebarOpen, setSidebarOpen }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
     
      
      <div className="flex">
        
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}