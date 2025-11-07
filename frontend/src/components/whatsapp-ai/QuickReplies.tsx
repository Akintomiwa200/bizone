import Button from '@/components/ui/Button'
import { Sparkles } from 'lucide-react'

const replies = [
  'Delivery is on the way and should arrive in 30 mins.',
  'Thanks for shopping with us! Would you like to join our loyalty program?',
  'We can reschedule delivery for tomorrow morning. Let me confirm a time that works for you.'
]

interface QuickRepliesProps {
  onSelect?: (reply: string) => void
}

export default function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="p-4 border-t border-gray-100 bg-emerald-50/40 space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wide">
        <Sparkles className="h-4 w-4" />
        AI Quick Replies
      </div>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <Button
            key={reply}
            type="button"
            size="sm"
            variant="outline"
            className="border-emerald-200 text-emerald-600 bg-white"
            onClick={() => onSelect?.(reply)}
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  )
}

