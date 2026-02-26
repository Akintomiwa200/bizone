// utils/test-utils.ts

import { ReactElement } from 'react'

// Mock data generators for testing
export const generateMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  category: 'electronics',
  price: 99.99,
  comparePrice: 129.99,
  costPerItem: 50.00,
  inventory: {
    trackQuantity: true,
    quantity: 100,
    lowStockAlert: 10
  },
  images: ['/test-image.jpg'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
})

export const generateMockOrder = (overrides = {}) => ({
  id: '1',
  orderId: 'ORD-001',
  customer: {
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com'
  },
  status: 'pending',
  fulfillment: 'delivery',
  items: [
    {
      name: 'Test Item',
      quantity: 2,
      price: 49.99
    }
  ],
  total: 99.98,
  createdAt: new Date().toISOString(),
  ...overrides
})

export const generateMockDelivery = (overrides = {}) => ({
  id: 'DEL-001',
  pickup: 'Warehouse A',
  dropoff: 'Customer Address',
  rider: 'John Rider',
  eta: '15 min',
  distanceKm: 5.2,
  status: 'in-progress',
  ...overrides
})

export const generateMockUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  role: 'customer',
  avatar: '/avatars/default.jpg',
  createdAt: new Date().toISOString(),
  ...overrides
})

export const generateMockStore = (overrides = {}) => ({
  id: '1',
  name: 'Test Store',
  description: 'Test Store Description',
  logo: '/logos/store.jpg',
  ownerId: '1',
  products: [],
  createdAt: new Date().toISOString(),
  ...overrides
})

// Generate multiple mock items
export const generateMockProducts = (count: number = 5, baseOverrides = {}) => {
  return Array.from({ length: count }, (_, i) => 
    generateMockProduct({ 
      id: `${i + 1}`,
      name: `Test Product ${i + 1}`,
      ...baseOverrides 
    })
  )
}

export const generateMockOrders = (count: number = 5, baseOverrides = {}) => {
  return Array.from({ length: count }, (_, i) => 
    generateMockOrder({ 
      id: `${i + 1}`,
      orderId: `ORD-${String(i + 1).padStart(3, '0')}`,
      ...baseOverrides 
    })
  )
}

// Utility to wait for a specific time
export const wait = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

// Helper to create a mock file
export const createMockFile = (name: string = 'test.jpg', size: number = 1024, type: string = 'image/jpeg'): File => {
  const blob = new Blob(['a'.repeat(size)], { type })
  return new File([blob], name, { type })
}

// Helper to create multiple mock files
export const createMockFiles = (count: number = 3): File[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockFile(`test-${i + 1}.jpg`, 1024, 'image/jpeg')
  )
}

// Simple localStorage mock for testing
export const createLocalStorageMock = () => {
  let store: Record<string, string> = {}
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    getAll: () => store
  }
}

// Mock fetch response helper
export const createMockResponse = <T,>(data: T, ok: boolean = true, status: number = 200) => {
  return {
    ok,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
    statusText: ok ? 'OK' : 'Error',
  } as Response
}

// Mock API response helper
export const createMockApiResponse = <T,>(data: T, success: boolean = true) => {
  return {
    data: success ? data : null,
    error: success ? null : 'An error occurred',
    success
  }
}

// Form data helper
export const createFormDataFromObject = (obj: Record<string, any>): FormData => {
  const formData = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    }
  })
  return formData
}

// Date helpers
export const getRelativeTimeString = (date: Date | string): string => {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  
  return past.toLocaleDateString()
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

// Currency formatter
export const formatCurrency = (amount: number, currency: string = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)
}