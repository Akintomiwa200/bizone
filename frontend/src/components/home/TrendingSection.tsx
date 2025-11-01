"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal, TrendingUp, MapPin } from 'lucide-react'

interface TrendingItem {
  id: string
  rank: number
  category: string
  title: string
  tweets: number
  isPromoted?: boolean
  country?: string
}

const trendingData: TrendingItem[] = [
  { 
    id: '1', 
    rank: 1,
    category: 'Sports · Trending', 
    title: '#WorldCup', 
    tweets: 125400,
    country: 'Worldwide'
  },
  { 
    id: '2', 
    rank: 2,
    category: 'Technology · Trending', 
    title: 'AI Revolution', 
    tweets: 89210,
    isPromoted: true
  },
  { 
    id: '3', 
    rank: 3,
    category: 'Entertainment · Trending', 
    title: '#NewMovieRelease', 
    tweets: 74563 
  },
  { 
    id: '4', 
    rank: 4,
    category: 'Politics · Trending', 
    title: 'Global Summit', 
    tweets: 63218 
  },
  { 
    id: '5', 
    rank: 5,
    category: 'Gaming · Trending', 
    title: '#GameAwards', 
    tweets: 51234 
  },
  { 
    id: '6', 
    rank: 6,
    category: 'Music · Trending', 
    title: 'Album Drop', 
    tweets: 42367 
  },
]

export default function TrendingSection() {
  const [showMore, setShowMore] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Worldwide')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const displayedTrends = showMore ? trendingData : trendingData.slice(0, 4)

  const formatTweetCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const locations = [
    'Worldwide',
    'United States',
    'United Kingdom',
    'India',
    'Canada',
    'Australia',
    'Germany',
    'France'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-muted/30 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-muted/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Trends for you
          </h2>
          
          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{selectedLocation}</span>
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-background border border-muted rounded-xl shadow-lg z-10 py-2"
                >
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-muted/50">
                    Change location
                  </div>
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location)
                        setIsSettingsOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors ${
                        selectedLocation === location ? 'text-blue-500 font-medium' : ''
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Trends List */}
      <div className="divide-y divide-muted/50">
        <AnimatePresence>
          {displayedTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer p-4 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  {/* Trend Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      Trending {trend.country && `in ${trend.country}`}
                    </span>
                    {trend.isPromoted && (
                      <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">
                        Promoted
                      </span>
                    )}
                  </div>

                  {/* Trend Title */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors">
                      {trend.title}
                    </span>
                    {trend.rank <= 3 && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        trend.rank === 1 ? 'bg-orange-500 text-white' :
                        trend.rank === 2 ? 'bg-gray-500 text-white' :
                        'bg-amber-600 text-white'
                      }`}>
                        #{trend.rank}
                      </span>
                    )}
                  </div>

                  {/* Category and Tweet Count */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trend.category}</span>
                    <span>·</span>
                    <span>{formatTweetCount(trend.tweets)} Tweets</span>
                  </div>
                </div>

                {/* More Options */}
                <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-blue-500/10 transition-all duration-200 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More/Less Button */}
      <motion.button
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowMore(!showMore)}
        className="w-full text-left p-4 text-blue-500 hover:underline text-sm font-medium border-t border-muted/50 transition-colors"
      >
        {showMore ? 'Show less' : 'Show more'}
      </motion.button>

      {/* Footer */}
      <div className="p-4 border-t border-muted/50">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Accessibility</p>
          <p>Ads info</p>
          <p>More</p>
          <p className="pt-2">© 2024 Twitter Clone</p>
        </div>
      </div>
    </motion.div>
  )
}

// Compact version for smaller spaces
export function CompactTrendingSection() {
  const [trends] = useState(trendingData.slice(0, 3))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-muted/30 rounded-2xl p-4"
    >
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-blue-500" />
        Trending Now
      </h3>
      
      <div className="space-y-3">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{trend.category}</p>
                <p className="text-sm font-semibold group-hover:text-blue-500 transition-colors truncate">
                  {trend.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTweetCount(trend.tweets)} Tweets
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Trending topic component for reuse
export function TrendingTopic({ 
  trend, 
  compact = false 
}: { 
  trend: TrendingItem
  compact?: boolean 
}) {
  const formatTweetCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  if (compact) {
    return (
      <div className="group cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-colors">
        <p className="text-xs text-muted-foreground mb-1">{trend.category}</p>
        <p className="font-semibold group-hover:text-blue-500 transition-colors">
          {trend.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTweetCount(trend.tweets)} Tweets
        </p>
      </div>
    )
  }

  return (
    <div className="group cursor-pointer p-4 hover:bg-muted/30 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{trend.category}</p>
          <p className="font-bold text-sm group-hover:text-blue-500 transition-colors">
            {trend.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatTweetCount(trend.tweets)} Tweets
          </p>
        </div>
        <button className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-blue-500/10 transition-all">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}