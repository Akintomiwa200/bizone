"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  HelpCircle,
  Building,
  Truck,
  ShoppingBag
} from 'lucide-react'
import Button from '@/components/ui/Button'

interface UserNavProps {
  userType?: 'business' | 'rider' | 'customer'
}

export default function UserNav({ userType = 'business' }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Handle logout logic
    router.push('/auth/login')
  }

  const getUserIcon = () => {
    switch (userType) {
      case 'rider':
        return <Truck className="w-5 h-5" />
      case 'customer':
        return <ShoppingBag className="w-5 h-5" />
      default:
        return <Building className="w-5 h-5" />
    }
  }

  const getUserLabel = () => {
    switch (userType) {
      case 'rider':
        return 'Rider Portal'
      case 'customer':
        return 'Customer Account'
      default:
        return 'Business Account'
    }
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </Button>

      {/* Help */}
      <Button variant="ghost" size="sm">
        <HelpCircle className="w-5 h-5" />
      </Button>

      {/* User Menu */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          {getUserIcon()}
          <span className="hidden sm:block">{getUserLabel()}</span>
          <User className="w-4 h-4" />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            <Link
              href="/dashboard/business/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}