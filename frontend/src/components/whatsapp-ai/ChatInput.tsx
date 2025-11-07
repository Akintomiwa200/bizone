"use client"

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Paperclip, Send, Sparkles } from 'lucide-react'

interface ChatInputProps {
  onSend?: (message: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) return
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSend?.(message.trim())
    setMessage('')
    setIsGenerating(false)
  }

  return (
    <form onSubmit={handleSend} className="flex flex-col sm:flex-row gap-3 p-4 border-t border-gray-100 bg-white">
      <div className="flex-1">
        <Input
          placeholder="Write a reply. Use /ai to generate smart responses."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" className="border-gray-200 text-gray-600">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" className="border-emerald-200 text-emerald-600">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Suggest
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isGenerating}>
          {isGenerating ? 'Sending...' : (<><Send className="h-4 w-4 mr-2" />Send</>)}
        </Button>
      </div>
    </form>
  )
}

