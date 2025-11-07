export type TrendDirection = 'up' | 'down' | 'steady'

export interface MetricSummary {
  label: string
  value: string
  change: number
  trend: TrendDirection
}

export interface BusinessSummary {
  id: string
  name: string
  owner: string
  category: string
  stage: 'idea' | 'launch' | 'growth' | 'scale'
  revenue: number
  location: string
  lastActive: string
  status: 'active' | 'pending' | 'suspended'
}

export interface ProductSummary {
  id: string
  name: string
  category: string
  price: number
  stock: number
  reorderPoint: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  weeklyDemand: number[]
}

export interface CategorySummary {
  id: string
  name: string
  products: number
  revenueShare: number
  lastUpdated: string
}

export interface CustomerSummary {
  id: string
  name: string
  avatarColor: string
  tier: 'new' | 'active' | 'vip' | 'inactive'
  location: string
  totalSpend: number
  lastPurchase: string
  loyaltyPoints: number
  tags: string[]
}

export interface OrderSummary {
  id: string
  customer: string
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled'
  fulfillment: 'pickup' | 'delivery' | 'digital'
  total: number
  createdAt: string
  eta?: string
  paymentMethod: 'card' | 'transfer' | 'wallet' | 'cash'
}

export interface DeliverySummary {
  id: string
  rider: string
  pickup: string
  dropoff: string
  status: 'assigned' | 'in-transit' | 'delivered' | 'delayed'
  eta: string
  distanceKm: number
  fee: number
}

export interface RiderPerformance {
  id: string
  name: string
  photoColor: string
  completedDeliveries: number
  rating: number
  earnings: number
  weekTarget: number
  location: string
}

export interface TransactionSummary {
  id: string
  type: 'payment' | 'refund' | 'payout' | 'expense'
  reference: string
  amount: number
  status: 'success' | 'pending' | 'failed'
  narration: string
  date: string
  channel: 'card' | 'bank-transfer' | 'ussd' | 'wallet'
}

export interface InvoiceSummary {
  id: string
  business: string
  dueDate: string
  amount: number
  status: 'paid' | 'overdue' | 'draft'
  currency: string
}

export interface ExpenseSummary {
  id: string
  category: string
  amount: number
  date: string
  description: string
  paymentMethod: string
}

export interface AnalyticsHighlight {
  title: string
  value: string
  change: number
  trend: TrendDirection
  description: string
}

export interface WhatsAppConversation {
  id: string
  customer: string
  avatarColor: string
  lastMessage: string
  unread: number
  channel: 'sales' | 'support' | 'logistics'
  updatedAt: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface WhatsAppTemplate {
  id: string
  name: string
  category: 'marketing' | 'transactional' | 'support'
  language: string
  status: 'approved' | 'pending' | 'rejected'
  usageCount: number
  lastUsed: string
}

export const dashboardMetrics: MetricSummary[] = [
  { label: 'Monthly Revenue', value: '₦12.4M', change: 18.4, trend: 'up' },
  { label: 'Active Orders', value: '324', change: 9.2, trend: 'up' },
  { label: 'Customer Retention', value: '82%', change: -2.1, trend: 'down' },
  { label: 'Average Delivery Time', value: '42 mins', change: 6.5, trend: 'down' }
]

export const businessSummaries: BusinessSummary[] = [
  {
    id: 'biz-1001',
    name: 'Lagos Fresh Foods',
    owner: 'Adeola Ahmed',
    category: 'Grocery',
    stage: 'growth',
    revenue: 4500000,
    location: 'Lagos, Nigeria',
    lastActive: '2 mins ago',
    status: 'active'
  },
  {
    id: 'biz-1002',
    name: 'Kaduna Styles Boutique',
    owner: 'Zainab Hassan',
    category: 'Fashion',
    stage: 'scale',
    revenue: 2850000,
    location: 'Kaduna, Nigeria',
    lastActive: '12 mins ago',
    status: 'active'
  },
  {
    id: 'biz-1003',
    name: 'Jos Digital Hub',
    owner: 'Samuel Okoro',
    category: 'Electronics',
    stage: 'launch',
    revenue: 1875000,
    location: 'Jos, Nigeria',
    lastActive: '45 mins ago',
    status: 'pending'
  }
]

export const productSummaries: ProductSummary[] = [
  {
    id: 'prd-1001',
    name: 'Organic Yams (10kg)',
    category: 'Grocery',
    price: 11500,
    stock: 120,
    reorderPoint: 80,
    status: 'in-stock',
    weeklyDemand: [60, 72, 68, 75, 80, 92, 88]
  },
  {
    id: 'prd-1002',
    name: 'Business Data Plan',
    category: 'Digital',
    price: 6500,
    stock: 35,
    reorderPoint: 30,
    status: 'low-stock',
    weeklyDemand: [32, 28, 35, 38, 42, 40, 44]
  },
  {
    id: 'prd-1003',
    name: 'Point-of-Sale Device',
    category: 'Hardware',
    price: 72000,
    stock: 8,
    reorderPoint: 15,
    status: 'out-of-stock',
    weeklyDemand: [12, 15, 18, 16, 22, 14, 20]
  }
]

export const categorySummaries: CategorySummary[] = [
  { id: 'cat-1', name: 'Grocery Staples', products: 48, revenueShare: 32, lastUpdated: 'Today, 09:15' },
  { id: 'cat-2', name: 'Beauty & Wellness', products: 36, revenueShare: 18, lastUpdated: 'Yesterday' },
  { id: 'cat-3', name: 'Electronics', products: 24, revenueShare: 28, lastUpdated: 'Today, 07:22' },
  { id: 'cat-4', name: 'Fashion & Apparel', products: 61, revenueShare: 22, lastUpdated: '3 days ago' }
]

export const customerSummaries: CustomerSummary[] = [
  {
    id: 'cus-1001',
    name: 'Ngozi Okafor',
    avatarColor: 'bg-blue-500',
    tier: 'vip',
    location: 'Lekki, Lagos',
    totalSpend: 985000,
    lastPurchase: 'Yesterday',
    loyaltyPoints: 1860,
    tags: ['High value', 'Subscription']
  },
  {
    id: 'cus-1002',
    name: 'Ibrahim Musa',
    avatarColor: 'bg-emerald-500',
    tier: 'active',
    location: 'Abuja, FCT',
    totalSpend: 425000,
    lastPurchase: '3 days ago',
    loyaltyPoints: 720,
    tags: ['Logistics', 'B2B']
  },
  {
    id: 'cus-1003',
    name: 'Amaka Nwosu',
    avatarColor: 'bg-purple-500',
    tier: 'new',
    location: 'Enugu, Nigeria',
    totalSpend: 92000,
    lastPurchase: '6 hours ago',
    loyaltyPoints: 120,
    tags: ['Email marketing']
  },
  {
    id: 'cus-1004',
    name: 'Chidi Onuoha',
    avatarColor: 'bg-orange-500',
    tier: 'inactive',
    location: 'Port Harcourt, Rivers',
    totalSpend: 318000,
    lastPurchase: '42 days ago',
    loyaltyPoints: 480,
    tags: ['Reactivation Target']
  }
]

export const orderSummaries: OrderSummary[] = [
  {
    id: 'ORD-9081',
    customer: 'Ngozi Okafor',
    status: 'processing',
    fulfillment: 'delivery',
    total: 48500,
    createdAt: 'Today, 08:43',
    eta: 'Arriving in 32 mins',
    paymentMethod: 'card'
  },
  {
    id: 'ORD-9077',
    customer: 'Chidi Onuoha',
    status: 'pending',
    fulfillment: 'pickup',
    total: 26500,
    createdAt: 'Today, 07:18',
    paymentMethod: 'wallet'
  },
  {
    id: 'ORD-9069',
    customer: 'Zainab Hassan',
    status: 'completed',
    fulfillment: 'delivery',
    total: 112800,
    createdAt: 'Yesterday, 18:52',
    paymentMethod: 'transfer'
  },
  {
    id: 'ORD-9065',
    customer: 'Samuel Okoro',
    status: 'shipped',
    fulfillment: 'delivery',
    total: 75800,
    createdAt: 'Yesterday, 14:11',
    eta: 'Delivered 2h ago',
    paymentMethod: 'card'
  }
]

export const deliverySummaries: DeliverySummary[] = [
  {
    id: 'DLV-4411',
    rider: 'Tunde Balogun',
    pickup: 'Lagos Fresh Foods',
    dropoff: 'Ikeja GRA',
    status: 'in-transit',
    eta: '18 mins',
    distanceKm: 7.4,
    fee: 1200
  },
  {
    id: 'DLV-4404',
    rider: 'Chioma Ezenwa',
    pickup: 'Kaduna Styles',
    dropoff: 'Barnawa, Kaduna',
    status: 'assigned',
    eta: 'Pickup scheduled',
    distanceKm: 4.1,
    fee: 950
  },
  {
    id: 'DLV-4399',
    rider: 'Abubakar Bello',
    pickup: 'Jos Digital Hub',
    dropoff: 'Rukuba Road, Jos',
    status: 'delayed',
    eta: 'Customer contacted',
    distanceKm: 5.8,
    fee: 1300
  },
  {
    id: 'DLV-4391',
    rider: 'Maryam Sule',
    pickup: 'Bizone Warehouse',
    dropoff: 'Victoria Island',
    status: 'delivered',
    eta: 'Delivered 12 mins ago',
    distanceKm: 9.3,
    fee: 1850
  }
]

export const riderPerformances: RiderPerformance[] = [
  {
    id: 'rid-1001',
    name: 'Tunde Balogun',
    photoColor: 'bg-blue-500',
    completedDeliveries: 124,
    rating: 4.8,
    earnings: 185000,
    weekTarget: 32,
    location: 'Lagos Mainland'
  },
  {
    id: 'rid-1002',
    name: 'Chioma Ezenwa',
    photoColor: 'bg-purple-500',
    completedDeliveries: 98,
    rating: 4.6,
    earnings: 164500,
    weekTarget: 28,
    location: 'Kaduna North'
  },
  {
    id: 'rid-1003',
    name: 'Abubakar Bello',
    photoColor: 'bg-emerald-500',
    completedDeliveries: 112,
    rating: 4.9,
    earnings: 192600,
    weekTarget: 30,
    location: 'Jos South'
  }
]

export const transactionSummaries: TransactionSummary[] = [
  {
    id: 'txn-9001',
    type: 'payment',
    reference: 'BZN-2024-4431',
    amount: 48500,
    status: 'success',
    narration: 'Order ORD-9081',
    date: 'Today, 08:44',
    channel: 'card'
  },
  {
    id: 'txn-9002',
    type: 'payout',
    reference: 'PAYOUT-221',
    amount: 250000,
    status: 'pending',
    narration: 'Daily merchant settlement',
    date: 'Today, 07:00',
    channel: 'bank-transfer'
  },
  {
    id: 'txn-9003',
    type: 'refund',
    reference: 'REF-771',
    amount: 6500,
    status: 'success',
    narration: 'Refund - Order ORD-9051',
    date: 'Yesterday, 18:12',
    channel: 'wallet'
  },
  {
    id: 'txn-9004',
    type: 'expense',
    reference: 'EXP-144',
    amount: 82000,
    status: 'success',
    narration: 'Fleet maintenance',
    date: 'Yesterday, 14:33',
    channel: 'bank-transfer'
  }
]

export const invoiceSummaries: InvoiceSummary[] = [
  { id: 'INV-2024-101', business: 'Lagos Fresh Foods', dueDate: '30 Nov 2025', amount: 285000, status: 'paid', currency: 'NGN' },
  { id: 'INV-2024-108', business: 'Kaduna Styles Boutique', dueDate: '5 Dec 2025', amount: 145000, status: 'overdue', currency: 'NGN' },
  { id: 'INV-2025-022', business: 'Jos Digital Hub', dueDate: '12 Dec 2025', amount: 96000, status: 'draft', currency: 'NGN' }
]

export const expenseSummaries: ExpenseSummary[] = [
  { id: 'EXP-5001', category: 'Logistics', amount: 82000, date: '6 Nov 2025', description: 'Vehicle maintenance and fuel', paymentMethod: 'Bank Transfer' },
  { id: 'EXP-5002', category: 'Marketing', amount: 55000, date: '5 Nov 2025', description: 'Digital campaign spend', paymentMethod: 'Card' },
  { id: 'EXP-5003', category: 'Salaries', amount: 450000, date: '1 Nov 2025', description: 'Operations team payroll', paymentMethod: 'Bulk Transfer' }
]

export const analyticsHighlights: AnalyticsHighlight[] = [
  {
    title: 'Sales Volume',
    value: '₦68.2M',
    change: 21.5,
    trend: 'up',
    description: 'Driven by festive season demand across Lagos & Abuja.'
  },
  {
    title: 'Repeat Customers',
    value: '71%',
    change: 4.2,
    trend: 'up',
    description: 'Retention programs and loyalty rewards increased return purchases.'
  },
  {
    title: 'Delivery SLA',
    value: '94%',
    change: -1.2,
    trend: 'down',
    description: 'Slight delays recorded in rainy season for Kaduna & Jos routes.'
  }
]

export const whatsappConversations: WhatsAppConversation[] = [
  {
    id: 'WA-112',
    customer: 'Ngozi Okafor',
    avatarColor: 'bg-emerald-500',
    lastMessage: 'Great! Please confirm delivery window for today.',
    unread: 2,
    channel: 'sales',
    updatedAt: '3 mins ago',
    sentiment: 'positive'
  },
  {
    id: 'WA-108',
    customer: 'Ibrahim Musa',
    avatarColor: 'bg-blue-500',
    lastMessage: 'Payment confirmed. Awaiting pickup instructions.',
    unread: 0,
    channel: 'logistics',
    updatedAt: '12 mins ago',
    sentiment: 'neutral'
  },
  {
    id: 'WA-099',
    customer: 'Gideon Adeyemi',
    avatarColor: 'bg-orange-500',
    lastMessage: 'Can we reschedule delivery to tomorrow morning?',
    unread: 1,
    channel: 'support',
    updatedAt: '25 mins ago',
    sentiment: 'neutral'
  }
]

export const whatsappTemplates: WhatsAppTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Order Confirmation',
    category: 'transactional',
    language: 'English',
    status: 'approved',
    usageCount: 1820,
    lastUsed: 'Today, 09:05'
  },
  {
    id: 'TPL-014',
    name: 'Abandoned Cart',
    category: 'marketing',
    language: 'English',
    status: 'approved',
    usageCount: 540,
    lastUsed: 'Yesterday, 19:22'
  },
  {
    id: 'TPL-021',
    name: 'Delivery Update',
    category: 'support',
    language: 'English',
    status: 'pending',
    usageCount: 310,
    lastUsed: 'Awaiting approval'
  }
]

export const liveActivityFeed = [
  { id: 'feed-1', timestamp: 'Just now', message: 'Order ORD-9084 moved to dispatched. Rider Maryam Sule en route to Lekki.' },
  { id: 'feed-2', timestamp: '2 mins ago', message: 'New customer signup: Aisha Bello from Abuja purchased Starter plan.' },
  { id: 'feed-3', timestamp: '8 mins ago', message: 'Inventory alert: POS Terminal stock fell below reorder point (8 units remaining).' },
  { id: 'feed-4', timestamp: '14 mins ago', message: '₦250,000 settlement initiated to Lagos Fresh Foods (daily payout).' }
]

export const storefrontVisitors = {
  labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
  data: [120, 245, 310, 420, 380, 290, 180]
}

export const regionalSalesDistribution = [
  { region: 'Lagos', value: 38 },
  { region: 'Abuja', value: 21 },
  { region: 'Rivers', value: 16 },
  { region: 'Kaduna', value: 11 },
  { region: 'Others', value: 14 }
]

export const whatsappAutomationStats = {
  campaignsSent: 124,
  automationActive: 8,
  avgResponseTime: '3m 45s',
  conversionRate: 18.6
}

export const loyaltyPrograms = [
  { id: 'LOY-001', name: 'Gold Customers', members: 184, rewardsRedeemed: 920, uplift: 24.5 },
  { id: 'LOY-002', name: 'SME Partners', members: 92, rewardsRedeemed: 340, uplift: 18.1 },
  { id: 'LOY-003', name: 'Referral Champions', members: 63, rewardsRedeemed: 145, uplift: 32.4 }
]

export const supportTickets = [
  { id: 'TKT-771', subject: 'Delayed delivery (ORD-9077)', priority: 'high', owner: 'Chioma Ezenwa', status: 'open', updatedAt: '5 mins ago' },
  { id: 'TKT-766', subject: 'Invoice request for October', priority: 'medium', owner: 'Finance Desk', status: 'in-progress', updatedAt: '26 mins ago' },
  { id: 'TKT-752', subject: 'POS terminal setup assistance', priority: 'low', owner: 'Technical Support', status: 'resolved', updatedAt: '1 hour ago' }
]

export const inventoryMovements = [
  { id: 'MOV-2201', item: 'Organic Yams (10kg)', type: 'inbound', quantity: 140, source: 'Local farmers cooperative', date: 'Today, 07:40' },
  { id: 'MOV-2196', item: 'POS Terminal', type: 'outbound', quantity: 12, source: 'Kaduna Store', date: 'Yesterday, 16:22' },
  { id: 'MOV-2191', item: 'Business Data Plan', type: 'adjustment', quantity: 35, source: 'Inventory audit', date: 'Yesterday, 09:12' }
]

export const stockAlerts = [
  { id: 'STK-01', product: 'POS Terminal', current: 8, threshold: 15, trend: 'down', action: 'Reorder now' },
  { id: 'STK-02', product: 'Organic Yams (10kg)', current: 120, threshold: 80, trend: 'steady', action: 'Monitor demand' },
  { id: 'STK-03', product: 'Business Data Plan', current: 35, threshold: 30, trend: 'down', action: 'Schedule top-up' }
]

export const deliveryZones = [
  { id: 'Z-1', name: 'Lagos Island', coverage: 'Victoria Island, Ikoyi, Lekki Phase 1', riders: 18, sla: '35 mins', risk: 'medium' },
  { id: 'Z-2', name: 'Lagos Mainland', coverage: 'Ikeja, Yaba, Surulere', riders: 26, sla: '42 mins', risk: 'low' },
  { id: 'Z-3', name: 'Abuja Metro', coverage: 'Wuse, Garki, Maitama', riders: 12, sla: '38 mins', risk: 'medium' }
]

export const aiInsights = [
  { id: 'AI-101', title: 'Delivery Optimization', insight: 'Switch 14 deliveries to night routes to avoid third mainland bridge traffic.', impact: 'Saves 2.2 hrs daily' },
  { id: 'AI-088', title: 'Customer Churn Watch', insight: 'Reach out to 63 customers inactive for 30 days with reactivation offers.', impact: 'Projected uplift ₦1.8M' },
  { id: 'AI-079', title: 'Inventory Forecast', insight: 'POS terminal demand will spike 32% ahead of Black Friday weekend.', impact: 'Reorder 45 units' }
]

export const analyticsTimeSeries = {
  revenue: [7.8, 8.6, 9.1, 10.4, 11.0, 11.8, 12.4],
  orders: [184, 205, 248, 266, 294, 312, 324],
  newCustomers: [32, 40, 44, 51, 55, 63, 68]
}

