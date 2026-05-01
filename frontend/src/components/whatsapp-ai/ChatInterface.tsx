'use client'

import { useState, useEffect } from 'react'
import ChatSession from './ChatSession'
import { whatsappAPI, WhatsAppContact } from '@/lib/api/whatsapp'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function ChatInterface() {
  const [contacts, setContacts] = useState<WhatsAppContact[]>([])
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const data = await whatsappAPI.getContacts()
      setContacts(data)
      if (data.length > 0 && !selectedPhone) {
        setSelectedPhone(data[0].phone)
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedContact = contacts.find(c => c.phone === selectedPhone)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
      <Card className="border border-gray-200/70 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Conversations</CardTitle>
          <CardDescription>WhatsApp conversations with customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-sm text-gray-500">No conversations yet.</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.phone}
                onClick={() => setSelectedPhone(contact.phone)}
                className={`rounded-lg border p-3 space-y-2 cursor-pointer transition-colors ${
                  selectedPhone === contact.phone
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center text-xs">
                      {contact.name
                        ? contact.name.split(' ').map((w: string) => w[0]).join('')
                        : contact.phone.slice(-4)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {contact.name || contact.phone}
                      </p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                  {contact.isBusiness && (
                    <Badge variant="info">Business</Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      {selectedPhone && <ChatSession phone={selectedPhone} contact={selectedContact} />}
    </div>
  )
}

