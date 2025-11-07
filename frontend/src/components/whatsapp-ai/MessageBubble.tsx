import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  message: string
  sender: 'agent' | 'customer' | 'automation'
  timestamp: string
}

export default function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  const alignment = sender === 'agent' ? 'items-end text-right' : 'items-start text-left'
  const bubbleClasses = cn(
    'max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm',
    sender === 'agent' && 'bg-emerald-500 text-white rounded-br-sm',
    sender === 'customer' && 'bg-gray-100 text-gray-800 rounded-bl-sm',
    sender === 'automation' && 'bg-blue-50 text-blue-900 border border-blue-100'
  )

  return (
    <div className={cn('flex flex-col gap-2', alignment)}>
      <div className={bubbleClasses}>{message}</div>
      <span className="text-[10px] uppercase tracking-wide text-gray-400">{timestamp}</span>
    </div>
  )
}

