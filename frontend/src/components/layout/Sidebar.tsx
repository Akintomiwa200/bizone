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
  MapPin,
  Wallet
} from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  userType?: 'business' | 'rider' | 'customer'
}

const businessNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { 
    name: 'Business', 
    href: '/dashboard/business', 
    icon: Building,
    children: [
      { name: 'Profile', href: '/dashboard/business/profile' },
      { name: 'Settings', href: '/dashboard/business/settings' },
      { name: 'Staff', href: '/dashboard/business/staff' },
    ]
  },
  { 
    name: 'Products', 
    href: '/dashboard/products', 
    icon: Package,
    children: [
      { name: 'All Products', href: '/dashboard/products' },
      { name: 'Create Product', href: '/dashboard/products/create' },
      { name: 'Categories', href: '/dashboard/products/categories' },
    ]
  },
  { 
    name: 'Inventory', 
    href: '/dashboard/inventory', 
    icon: Package,
    children: [
      { name: 'Overview', href: '/dashboard/inventory' },
      { name: 'Stock Alerts', href: '/dashboard/inventory/stock-alerts' },
      { name: 'Movements', href: '/dashboard/inventory/movements' },
    ]
  },
  { 
    name: 'Orders', 
    href: '/dashboard/orders', 
    icon: ShoppingCart,
    children: [
      { name: 'All Orders', href: '/dashboard/orders' },
      { name: 'Create Order', href: '/dashboard/orders/create' },
      { name: 'Drafts', href: '/dashboard/orders/draft' },
    ]
  },
  { 
    name: 'Customers', 
    href: '/dashboard/customers', 
    icon: Users,
    children: [
      { name: 'All Customers', href: '/dashboard/customers' },
      { name: 'Groups', href: '/dashboard/customers/groups' },
    ]
  },
  { 
    name: 'Delivery', 
    href: '/dashboard/delivery', 
    icon: Truck,
    children: [
      { name: 'Overview', href: '/dashboard/delivery' },
      { name: 'Tracking', href: '/dashboard/delivery/tracking' },
      { name: 'Riders', href: '/dashboard/delivery/riders' },
      { name: 'Zones', href: '/dashboard/delivery/zones' },
    ]
  },
  { 
    name: 'Finances', 
    href: '/dashboard/finances', 
    icon: CreditCard,
    children: [
      { name: 'Overview', href: '/dashboard/finances' },
      { name: 'Transactions', href: '/dashboard/finances/transactions' },
      { name: 'Invoices', href: '/dashboard/finances/invoices' },
      { name: 'Loans', href: '/dashboard/finances/loans' },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart3,
    children: [
      { name: 'Overview', href: '/dashboard/analytics' },
      { name: 'Sales', href: '/dashboard/analytics/sales' },
      { name: 'Customers', href: '/dashboard/analytics/customers' },
      { name: 'Inventory', href: '/dashboard/analytics/inventory' },
    ]
  },
  { 
    name: 'WhatsApp AI', 
    href: '/dashboard/whatsapp-ai', 
    icon: MessageCircle,
    children: [
      { name: 'Dashboard', href: '/dashboard/whatsapp-ai' },
      { name: 'Templates', href: '/dashboard/whatsapp-ai/templates' },
      { name: 'Automation', href: '/dashboard/whatsapp-ai/automation' },
      { name: 'Analytics', href: '/dashboard/whatsapp-ai/analytics' },
    ]
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    children: [
      { name: 'General', href: '/dashboard/settings' },
      { name: 'Notifications', href: '/dashboard/settings/notifications' },
      { name: 'Integrations', href: '/dashboard/settings/integrations' },
    ]
  },
]

const riderNavigation = [
  { name: 'Dashboard', href: '/rider', icon: Home },
  { name: 'Active Deliveries', href: '/rider/deliveries', icon: Package },
  { name: 'Delivery History', href: '/rider/history', icon: Truck },
  { name: 'Earnings', href: '/rider/earnings', icon: Wallet },
  { name: 'Schedule', href: '/rider/schedule', icon: BarChart3 },
  { name: 'Zones', href: '/rider/zones', icon: MapPin },
]

const customerNavigation = [
  { name: 'Dashboard', href: '/customer', icon: Home },
  { name: 'My Orders', href: '/customer/orders', icon: ShoppingCart },
  { name: 'Addresses', href: '/customer/addresses', icon: MapPin },
  { name: 'Wishlist', href: '/customer/wishlist', icon: Package },
  { name: 'Payment Methods', href: '/customer/payments', icon: CreditCard },
]

export default function Sidebar({ isOpen = true, userType = 'business' }: SidebarProps) {
  const pathname = usePathname()
  
  const navigation = userType === 'rider' 
    ? riderNavigation 
    : userType === 'customer' 
    ? customerNavigation 
    : businessNavigation

  return (
    <div className={`hidden lg:flex lg:flex-shrink-0 ${isOpen ? 'lg:w-64' : 'lg:w-20'} transition-all duration-300`}>
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            {isOpen && (
              <span className="ml-2 text-xl font-bold text-gray-900">Bizone</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const hasChildren = 'children' in item && item.children
            
            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {isOpen && item.name}
                </Link>
                
                {/* Child items */}
                {hasChildren && isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            isChildActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {child.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}