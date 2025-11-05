'use client'

import { useStore } from '@/lib/store'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick?: () => void
  }
}

class NotificationService {
  // Add a new notification to the store
  add(
    type: Notification['type'],
    title: string,
    message: string,
    duration = 4000,
    action?: Notification['action']
  ) {
    const { addNotification } = useStore.getState()

    addNotification({
      id: Date.now().toString(),
      type,
      title,
      message,
      duration,
      action,
    })
  }

  success(title: string, message: string, duration?: number) {
    this.add('success', title, message, duration)
  }

  error(title: string, message: string, duration?: number) {
    this.add('error', title, message, duration)
  }

  info(title: string, message: string, duration?: number) {
    this.add('info', title, message, duration)
  }

  warning(title: string, message: string, duration?: number) {
    this.add('warning', title, message, duration)
  }

  async requestPushPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return
    try {
      const permission = await Notification.requestPermission()
      console.log('Notification permission:', permission)
    } catch (err) {
      console.error('Permission request failed:', err)
    }
  }
}

// ✅ Named export
export const notificationService = new NotificationService()
