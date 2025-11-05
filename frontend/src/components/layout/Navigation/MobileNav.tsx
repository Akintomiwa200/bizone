"use client"

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Building, 
  Package, 
  Users, 
  Truck, 
  BarChart3, 
  MessageCircle,
  CreditCard,
  Settings,
  X,
  User,
  LogOut
} from 'lucide-react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  userType?: 'business' | 'rider' | 'customer'
}

const businessNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Building },
  { name: 'Business', href: '/dashboard/business', icon: Building },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: CreditCard },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Delivery', href: '/dashboard/delivery', icon: Truck },
  { name: 'Finances', href: '/dashboard/finances', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'WhatsApp AI', href: '/dashboard/whatsapp-ai', icon: MessageCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const riderNavItems = [
  { name: 'Dashboard', href: '/rider', icon: Truck },
  { name: 'Deliveries', href: '/rider/deliveries', icon: Package },
  { name: 'Earnings', href: '/rider/earnings', icon: CreditCard },
  { name: 'Schedule', href: '/rider/schedule', icon: BarChart3 },
  { name: 'Settings', href: '/rider/settings', icon: Settings },
]

const customerNavItems = [
  { name: 'Dashboard', href: '/customer', icon: Building },
  { name: 'Orders', href: '/customer/orders', icon: Package },
  { name: 'Addresses', href: '/customer/addresses', icon: Users },
  { name: 'Wishlist', href: '/customer/wishlist', icon: CreditCard },
  { name: 'Settings', href: '/customer/settings', icon: Settings },
]

export default function MobileNav({ isOpen, onClose, userType = 'business' }: MobileNavProps) {
  const pathname = usePathname()
  
  const navItems = userType === 'rider' 
    ? riderNavItems 
    : userType === 'customer' 
    ? customerNavItems 
    : businessNavItems

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Bizone</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Business Account</p>
              <p className="text-sm text-gray-500 truncate">admin@business.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}