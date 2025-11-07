import { whatsappConversations } from '@/utils/mock-data'
import ChatSession from './ChatSession'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function ChatInterface() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
      <Card className="border border-gray-200/70 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Conversations</CardTitle>
          <CardDescription>Prioritised by AI assistant with sentiment insights.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {whatsappConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${conversation.avatarColor} text-white font-semibold flex items-center justify-center text-xs`}>
                    {conversation.customer
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{conversation.customer}</p>
                    <p className="text-xs text-gray-500">{conversation.updatedAt}</p>
                  </div>
                </div>
                {conversation.unread > 0 && (
                  <Badge variant="warning">{conversation.unread} new</Badge>
                )}
              </div>
              <p className="text-xs text-gray-600">“{conversation.lastMessage}”</p>
              <div className="flex items-center justify-between text-[10px] uppercase text-gray-400">
                <span>Channel {conversation.channel}</span>
                <span>Sentiment {conversation.sentiment}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <ChatSession />
    </div>
  )
}

