'use client'

import { useState, useEffect, useRef } from 'react'
import { whatsappAPI, WhatsAppMessage } from '@/lib/api/whatsapp'
import { socketService } from '@/lib/socket/socket'
import { SOCKET_EVENTS } from '@/lib/socket/events'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { WhatsAppContact } from '@/lib/api/whatsapp'

interface ChatSessionProps {
  phone: string
  contact: WhatsAppContact | undefined
}

export default function ChatSession({ phone, contact }: ChatSessionProps) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
    setupSocketListeners()

    return () => {
      // Cleanup socket listeners
      socketService.off(SOCKET_EVENTS.WHATSAPP_NEW_MESSAGE)
      socketService.off(SOCKET_EVENTS.WHATSAPP_MESSAGE)
    }
  }, [phone])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await whatsappAPI.getMessages(phone)
      if (data && data.messages) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const setupSocketListeners = () => {
    // Listen for new WhatsApp messages via socket
    socketService.on(SOCKET_EVENTS.WHATSAPP_NEW_MESSAGE, (data: any) => {
      if (data.message && data.message.from === phone || data.message?.to === phone) {
        setMessages(prev => [...prev, data.message])
        scrollToBottom()
      }
    })

    socketService.on(SOCKET_EVENTS.WHATSAPP_MESSAGE, (data: any) => {
      if (data.phone === phone || data.message?.contact?.phone === phone) {
        loadMessages() // Reload messages on status update
      }
    })
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSend = async (content: string) => {
    try {
      const result = await whatsappAPI.sendMessage({
        to: phone,
        type: 'text',
        content
      })

      // Optimistically add message to UI
      const newMsg: WhatsAppMessage = {
        id: result.messageId || `temp-${Date.now()}`,
        from: 'bot', // or business phone
        to: phone,
        type: 'text',
        content,
        timestamp: new Date().toISOString(),
        status: 'sent',
        direction: 'outbound'
      }
      setMessages(prev => [...prev, newMsg])
      scrollToBottom()
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className="border border-gray-200/70 shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center">
            {contact?.name
              ? contact.name.split(' ').map((w: string) => w[0]).join('')
              : phone.slice(-4)}
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900">
              {contact?.name || phone}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              WhatsApp • {contact?.phone || phone}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto bg-gray-50 space-y-4 p-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.content}
              sender={msg.direction === 'outbound' ? 'agent' : 'customer'}
              timestamp={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <ChatInput onSend={handleSend} />
    </Card>
  )
}
]

export default function ChatSession() {
  const [messages, setMessages] = useState(mockMessages)
  const activeConversation = whatsappConversations[0]

  const handleSend = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${prev.length + 1}`,
        message,
        sender: 'agent' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full ${activeConversation.avatarColor} text-white font-semibold flex items-center justify-center`}>
            {activeConversation.customer
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900">{activeConversation.customer}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Responding via {activeConversation.channel.toUpperCase()} • {activeConversation.updatedAt}
            </CardDescription>
          </div>
        </div>
        <Badge variant="secondary">Sentiment {activeConversation.sentiment}</Badge>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto bg-gray-50 space-y-4 p-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message.message} sender={message.sender} timestamp={message.timestamp} />
        ))}
      </CardContent>
      <QuickReplies onSelect={handleSend} />
      <ChatInput onSend={handleSend} />
    </Card>
  )
}

