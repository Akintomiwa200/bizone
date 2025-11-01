"use client"

import { motion } from 'framer-motion'
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { formatDate, formatCount } from '@/lib/utils'

interface Tweet {
  id: string
  content: string
  author: {
    id: string
    username: string
    displayName: string
    avatar?: string
    isVerified: boolean
  }
  media?: Array<{
    type: 'image' | 'video'
    url: string
  }>
  likes: number
  retweets: number
  replies: number
  isLiked: boolean
  isRetweeted: boolean
  createdAt: string
}

interface TweetCardProps {
  tweet: Tweet
  onLike: (tweetId: string) => void
  onRetweet: (tweetId: string) => void
  onReply: (tweetId: string) => void
}

export default function TweetCard({ tweet, onLike, onRetweet, onReply }: TweetCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      className="p-4 border-b cursor-pointer transition-colors"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={tweet.author.avatar} />
          <AvatarFallback>
            {tweet.author.displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm hover:underline">
                {tweet.author.displayName}
              </span>
              {tweet.author.isVerified && (
                <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                </svg>
              )}
            </div>
            <span className="text-muted-foreground text-sm">
              @{tweet.author.username}
            </span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">
              {formatDate(tweet.createdAt)}
            </span>
          </div>

          {/* Tweet Content */}
          <p className="text-sm mb-3 whitespace-pre-wrap">{tweet.content}</p>

          {/* Media */}
          {tweet.media && tweet.media.length > 0 && (
            <div className="mb-3 rounded-2xl overflow-hidden">
              {/* Media grid layout based on number of items */}
              <div className={`grid gap-2 ${
                tweet.media.length === 1 ? 'grid-cols-1' :
                tweet.media.length === 2 ? 'grid-cols-2' :
                'grid-cols-2'
              }`}>
                {tweet.media.map((media, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      tweet.media!.length === 3 && index === 0 ? 'row-span-2' : ''
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="w-full h-full object-cover rounded-2xl"
                        controls
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply(tweet.id)}
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{formatCount(tweet.replies)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRetweet(tweet.id)}
              className={`text-muted-foreground hover:text-green-500 hover:bg-green-500/10 ${
                tweet.isRetweeted ? 'text-green-500' : ''
              }`}
            >
              <Repeat2 className="h-4 w-4 mr-1" />
              <span className="text-xs">{formatCount(tweet.retweets)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(tweet.id)}
              className={`text-muted-foreground hover:text-red-500 hover:bg-red-500/10 ${
                tweet.isLiked ? 'text-red-500' : ''
              }`}
            >
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs">{formatCount(tweet.likes)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* More options */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </motion.article>
  )
}