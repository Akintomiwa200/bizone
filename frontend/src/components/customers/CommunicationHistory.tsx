import { whatsappConversations, supportTickets } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MessageCircle, Headset, Clock } from 'lucide-react'

export default function CommunicationHistory() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          Omnichannel conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">WhatsApp threads</h3>
            <Badge variant="secondary">Live sync</Badge>
          </div>
          <div className="space-y-3">
            {whatsappConversations.map((conversation) => (
              <div key={conversation.id} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full ${conversation.avatarColor} text-white font-semibold flex items-center justify-center`}>
                      {conversation.customer
                        .split(' ')
                        .map((word) => word[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{conversation.customer}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {conversation.updatedAt}
                      </p>
                    </div>
                  </div>
                  <Badge variant={conversation.sentiment === 'positive' ? 'success' : conversation.sentiment === 'negative' ? 'error' : 'secondary'}>
                    {conversation.sentiment.charAt(0).toUpperCase() + conversation.sentiment.slice(1)} mood
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-gray-600">“{conversation.lastMessage}”</p>
                <div className="mt-2 text-xs text-gray-400">Channel • {conversation.channel.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
            <Headset className="h-4 w-4 text-purple-500" />
            Support tickets
          </div>
          <div className="space-y-3">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="rounded-lg border border-purple-100 bg-purple-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">Owner: {ticket.owner}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'secondary'}>
                      {ticket.priority.toUpperCase()}
                    </Badge>
                    <Badge variant={ticket.status === 'resolved' ? 'success' : ticket.status === 'open' ? 'warning' : 'secondary'}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Updated {ticket.updatedAt}</p>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

