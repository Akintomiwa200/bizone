"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSocket } from '@/hooks/useSocket'
import TweetCard from '@/components/tweets/TweetCard'
import CreateTweet from '@/components/tweets/CreateTweet'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

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

export default function TweetFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const socket = useSocket()

  useEffect(() => {
    // Fetch initial tweets
    fetchTweets()

    // Socket event listeners
    if (socket) {
      socket.on('new_tweet', (tweet: Tweet) => {
        setTweets(prev => [tweet, ...prev])
      })

      socket.on('tweet_liked', (data) => {
        setTweets(prev => prev.map(tweet =>
          tweet.id === data.tweetId
            ? { 
                ...tweet, 
                likes: data.type === 'like' ? tweet.likes + 1 : tweet.likes - 1,
                isLiked: data.type === 'like'
              }
            : tweet
        ))
      })

      return () => {
        socket.off('new_tweet')
        socket.off('tweet_liked')
      }
    }
  }, [socket])

  const fetchTweets = async () => {
    try {
      const response = await fetch('/api/tweets/timeline')
      const data = await response.json()
      if (data.success) {
        setTweets(data.data.tweets)
      }
    } catch (error) {
      console.error('Error fetching tweets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (tweetId: string) => {
    try {
      const response = await fetch(`/api/tweets/${tweetId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok && socket) {
        socket.emit('tweet_like', { tweetId })
      }
    } catch (error) {
      console.error('Error liking tweet:', error)
    }
  }

  const handleRetweet = async (tweetId: string) => {
    // Implement retweet logic
  }

  const handleReply = (tweetId: string) => {
    // Implement reply logic
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Tweet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CreateTweet onTweetCreated={(tweet) => setTweets(prev => [tweet, ...prev])} />
      </motion.div>

      {/* Tweet List */}
      <AnimatePresence>
        {tweets.map((tweet, index) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TweetCard
              tweet={tweet}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onReply={handleReply}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {tweets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <p className="text-lg">No tweets yet. Be the first to tweet!</p>
        </motion.div>
      )}
    </div>
  )
}