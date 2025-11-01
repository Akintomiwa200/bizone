"use client"

import {useState} from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'

interface User {
  id: string
  name: string
  username: string
  avatar?: string
  isVerified: boolean
  bio: string
}

const usersToFollow: User[] = [
  {
    id: '1',
    name: 'Tech News',
    username: 'technews',
    avatar: '/tech-news.jpg',
    isVerified: true,
    bio: 'Latest technology news and updates'
  },
  {
    id: '2',
    name: 'React',
    username: 'reactjs',
    avatar: '/react.jpg',
    isVerified: true,
    bio: 'The library for web and native user interfaces'
  },
  {
    id: '3',
    name: 'Next.js',
    username: 'nextjs',
    avatar: '/nextjs.jpg',
    isVerified: true,
    bio: 'The React Framework for the Web'
  }
]

export default function WhoToFollow() {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  const handleFollow = (userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-muted/50 rounded-2xl p-4"
    >
      <h2 className="text-xl font-bold mb-4">Who to follow</h2>
      
      <div className="space-y-4">
        {usersToFollow.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  {user.isVerified && (
                    <svg className="h-4 w-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
              </div>
            </div>
            
            <Button
              variant={followedUsers.has(user.id) ? "outline" : "default"}
              size="sm"
              className="flex-shrink-0 px-4"
              onClick={() => handleFollow(user.id)}
            >
              {followedUsers.has(user.id) ? 'Following' : 'Follow'}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        className="w-full text-left p-3 rounded-xl text-blue-500 hover:underline text-sm"
      >
        Show more
      </motion.button>
    </motion.div>
  )
}