"use client"

import { motion } from 'framer-motion'
import { Menu, Building } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white border-b shadow-sm"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-gray-900">Bizone</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#solutions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Solutions
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hidden sm:block">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}