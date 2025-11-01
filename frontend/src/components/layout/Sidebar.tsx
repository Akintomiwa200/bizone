"use client"

import { motion } from 'framer-motion'
import { 
  Home, 
  Hash, 
  Bell, 
  Bookmark, 
  List, 
  User, 
  MoreHorizontal,
  Feather 
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'

const navigation = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: Hash, href: '/explore' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
  { name: 'Lists', icon: List, href: '/lists' },
  { name: 'Profile', icon: User, href: '/profile' },
]

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Twitter
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 h-12 text-lg"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </motion.div>
          ))}
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 h-12 text-lg"
          >
            <MoreHorizontal className="h-5 w-5" />
            More
          </Button>
        </nav>

        {/* Tweet Button */}
        <div className="p-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold">
              <Feather className="h-5 w-5 mr-2 md:hidden" />
              <span className="hidden md:inline">Tweet</span>
            </Button>
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-2 rounded-full hover:bg-muted cursor-pointer">
            <Avatar>
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 hidden md:block">
              <p className="text-sm font-semibold truncate">Username</p>
              <p className="text-sm text-muted-foreground truncate">@username</p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground hidden md:block" />
          </div>
        </div>
      </div>
    </motion.aside>
  )
}