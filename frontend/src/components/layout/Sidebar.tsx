"use client"

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
  Home,
  ShoppingCart,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  userType?: 'business' | 'rider' | 'customer'
}

const businessNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Business', href: '/dashboard/business', icon: Building },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Delivery', href: '/dashboard/delivery', icon: Truck },
  { name: 'Finances', href: '/dashboard/finances', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'WhatsApp AI', href: '/dashboard/whatsapp-ai', icon: MessageCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const riderNavigation = [
  { name: 'Dashboard', href: '/rider', icon: Home },
  { name: 'Deliveries', href: '/rider/deliveries', icon: Package },
  { name: 'Earnings', href: '/rider/earnings', icon: CreditCard },
  { name: 'Schedule', href: '/rider/schedule', icon: BarChart3 },
]

const customerNavigation = [
  { name: 'Dashboard', href: '/customer', icon: Home },
  { name: 'Orders', href: '/customer/orders', icon: ShoppingCart },
  { name: 'Addresses', href: '/customer/addresses', icon: Users },
  { name: 'Wishlist', href: '/customer/wishlist', icon: Package },
]

export default function Sidebar({ userType = 'business' }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const navigation = userType === 'rider' 
    ? riderNavigation 
    : userType === 'customer' 
    ? customerNavigation 
    : businessNavigation

  return (
    <div className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Bizone</span>
          </div>
        )}
        
        {isCollapsed && (
          <Building className="h-8 w-8 text-blue-600 mx-auto" />
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="ml-3">{item.name}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}