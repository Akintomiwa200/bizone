import { useState } from 'react'
import { whatsappConversations } from '@/utils/mock-data'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import QuickReplies from './QuickReplies'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const mockMessages = [
  {
    id: 'msg-1',
    message: 'Hi Bizone team! My order ORD-9081 is on the way right?',
    sender: 'customer' as const,
    timestamp: '08:42'
  },
  {
    id: 'msg-2',
    message: 'Yes Ngozi! Rider Maryam is 12 mins away. Want to reschedule?',
    sender: 'agent' as const,
    timestamp: '08:43'
  },
  {
    id: 'msg-3',
    message: 'Perfect. Please ask her to call when she arrives at the gate.',
    sender: 'customer' as const,
    timestamp: '08:44'
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

