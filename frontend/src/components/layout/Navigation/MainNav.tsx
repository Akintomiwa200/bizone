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
  Settings
} from 'lucide-react'

interface MainNavProps {
  userType?: 'business' | 'rider' | 'customer'
}

const businessNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Building },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: CreditCard },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Delivery', href: '/dashboard/delivery', icon: Truck },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'WhatsApp AI', href: '/dashboard/whatsapp-ai', icon: MessageCircle },
  { name: 'Finances', href: '/dashboard/finances', icon: CreditCard },
]

const riderNavItems = [
  { name: 'Dashboard', href: '/rider', icon: Truck },
  { name: 'Deliveries', href: '/rider/deliveries', icon: Package },
  { name: 'Earnings', href: '/rider/earnings', icon: CreditCard },
  { name: 'Schedule', href: '/rider/schedule', icon: BarChart3 },
]

const customerNavItems = [
  { name: 'Dashboard', href: '/customer', icon: Building },
  { name: 'Orders', href: '/customer/orders', icon: Package },
  { name: 'Addresses', href: '/customer/addresses', icon: Users },
  { name: 'Wishlist', href: '/customer/wishlist', icon: CreditCard },
]

export default function MainNav({ userType = 'business' }: MainNavProps) {
  const pathname = usePathname()
  
  const navItems = userType === 'rider' 
    ? riderNavItems 
    : userType === 'customer' 
    ? customerNavItems 
    : businessNavItems

  return (
    <nav className="hidden lg:flex lg:space-x-1 lg:ml-6">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}