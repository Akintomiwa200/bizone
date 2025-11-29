"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart, 
  Truck,
  CreditCard,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  RefreshCw,
  FileText,
  Calendar,
  Filter
} from 'lucide-react'

// Recharts components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Types
interface Order {
  id: string
  customer: string
  amount: number
  status: 'delivered' | 'processing' | 'pending' | 'cancelled'
  date: string
  items: number
}

interface StockAlert {
  product: string
  currentStock: number
  minStock: number
  status: 'low' | 'critical' | 'adequate'
}

interface Product {
  name: string
  sales: number
  revenue: number
  fill: string
}

// Mock data generator
const generateMockData = () => ({
  overview: {
    totalRevenue: 2456000,
    revenueChange: 12.5,
    totalOrders: 1245,
    ordersChange: 8.2,
    totalCustomers: 456,
    customersChange: 15.3,
    pendingDeliveries: 23,
    deliveriesChange: -3.1,
  },
  recentOrders: [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      amount: 45000,
      status: 'delivered' as const,
      date: '2024-01-15',
      items: 3,
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      amount: 32000,
      status: 'processing' as const,
      date: '2024-01-15',
      items: 2,
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      amount: 78000,
      status: 'pending' as const,
      date: '2024-01-14',
      items: 5,
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      amount: 21000,
      status: 'delivered' as const,
      date: '2024-01-14',
      items: 1,
    },
    {
      id: 'ORD-005',
      customer: 'David Brown',
      amount: 156000,
      status: 'processing' as const,
      date: '2024-01-14',
      items: 7,
    },
  ],
  stockAlerts: [
    { product: 'iPhone 14 Pro', currentStock: 5, minStock: 10, status: 'low' as const },
    { product: 'Samsung Galaxy S23', currentStock: 3, minStock: 8, status: 'critical' as const },
    { product: 'MacBook Air M2', currentStock: 8, minStock: 15, status: 'low' as const },
    { product: 'AirPods Pro', currentStock: 12, minStock: 20, status: 'low' as const },
  ],
  salesData: [
    { month: 'Jan', revenue: 650000, orders: 45, customers: 38 },
    { month: 'Feb', revenue: 720000, orders: 52, customers: 45 },
    { month: 'Mar', revenue: 810000, orders: 48, customers: 42 },
    { month: 'Apr', revenue: 890000, orders: 61, customers: 52 },
    { month: 'May', revenue: 950000, orders: 55, customers: 48 },
    { month: 'Jun', revenue: 1020000, orders: 68, customers: 58 },
    { month: 'Jul', revenue: 1100000, orders: 72, customers: 62 },
    { month: 'Aug', revenue: 1250000, orders: 75, customers: 65 },
    { month: 'Sep', revenue: 1350000, orders: 80, customers: 68 },
    { month: 'Oct', revenue: 1420000, orders: 78, customers: 66 },
    { month: 'Nov', revenue: 1580000, orders: 85, customers: 72 },
    { month: 'Dec', revenue: 1680000, orders: 92, customers: 78 },
  ],
  quickStats: {
    averageOrderValue: 38500,
    conversionRate: 3.2,
    customerSatisfaction: 4.5,
    inventoryTurnover: 8.2,
  },
  topProducts: [
    { name: 'iPhone 14 Pro', sales: 45, revenue: 33750000, fill: '#3B82F6' },
    { name: 'MacBook Air M2', sales: 28, revenue: 22400000, fill: '#10B981' },
    { name: 'Samsung Galaxy S23', sales: 32, revenue: 20800000, fill: '#F59E0B' },
    { name: 'AirPods Pro', sales: 56, revenue: 11200000, fill: '#8B5CF6' },
    { name: 'iPad Air', sales: 18, revenue: 9000000, fill: '#EC4899' },
  ],
  customerMetrics: {
    newCustomers: 45,
    returningCustomers: 32,
    customerRetention: 78.5,
    averageLifetimeValue: 125000,
  }
})

// Simple UI Components (fallbacks if your UI components aren't available)
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
)

const Button = ({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900',
    ghost: 'hover:bg-gray-100 text-gray-900',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  }
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Badge = ({ 
  children, 
  variant = 'default',
  className = ''
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors'
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-900'
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

const Input = ({ 
  value,
  onChange,
  placeholder,
  className = '',
  startIcon: StartIcon
}: { 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  startIcon?: any;
}) => {
  return (
    <div className="relative">
      {StartIcon && (
        <StartIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          StartIcon ? 'pl-9' : ''
        } ${className}`}
      />
    </div>
  )
}

const Select = ({ 
  value, 
  onValueChange, 
  children 
}: { 
  value: string; 
  onValueChange: (value: string) => void; 
  children: React.ReactNode;
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {children}
      </select>
    </div>
  )
}

const SelectTrigger = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

const SelectValue = ({ placeholder }: { placeholder: string }) => (
  <span>{placeholder}</span>
)

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
)

const Tabs = ({ defaultValue, children, className = '' }: { defaultValue: string; children: React.ReactNode; className?: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={className}>
      {children}
    </div>
  )
}

const TabsList = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm ${className}`}
  >
    {children}
  </button>
)

const TabsContent = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <div>{children}</div>
)

const statusColors = {
  delivered: 'bg-green-100 text-green-800 border-green-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const stockStatusColors = {
  low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  adequate: 'bg-green-100 text-green-800 border-green-200',
}

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState(generateMockData())

  // Formatting functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG').format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Mock API calls
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDashboardData(generateMockData())
    setIsRefreshing(false)
  }

  const handleExportData = async () => {
    console.log('Exporting data for time range:', timeRange)
    alert(`Exporting data for ${timeRanges.find(range => range.value === timeRange)?.label}`)
  }

  const handleViewOrder = (orderId: string) => {
    console.log('Viewing order:', orderId)
    alert(`Navigating to order ${orderId} details`)
  }

  const handleReorderProduct = (productName: string) => {
    console.log('Reordering product:', productName)
    alert(`Initiating reorder for ${productName}`)
  }

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action)
    alert(`Performing action: ${action}`)
  }

  // Filter recent orders based on search and status
  const filteredOrders = useMemo(() => {
    return dashboardData.recentOrders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter, dashboardData.recentOrders])

  // Custom tooltip formatter for charts
  const formatTooltipValue = (value: number, name: string) => {
    if (name.toLowerCase().includes('revenue') || name.toLowerCase().includes('value')) {
      return [formatCurrency(value), name]
    }
    return [value, name]
  }

  // StatCard Component
  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    formatValue = (v: any) => v,
    description
  }: {
    title: string
    value: number
    change: number
    icon: any
    formatValue?: (value: any) => string
    description?: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatValue(value)}
              </p>
              <div className={`flex items-center text-sm ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(change)}% from last period
              </div>
              {description && (
                <p className="text-xs text-gray-500 mt-2">{description}</p>
              )}
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              Business Overview
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-1"
            >
              Welcome back! Here's what's happening with your business today.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={handleExportData}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </motion.div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={dashboardData.overview.totalRevenue}
            change={dashboardData.overview.revenueChange}
            icon={TrendingUp}
            formatValue={formatCurrency}
            description="Total revenue across all channels"
          />
          <StatCard
            title="Total Orders"
            value={dashboardData.overview.totalOrders}
            change={dashboardData.overview.ordersChange}
            icon={ShoppingCart}
            formatValue={formatNumber}
            description="Completed orders this period"
          />
          <StatCard
            title="Total Customers"
            value={dashboardData.overview.totalCustomers}
            change={dashboardData.overview.customersChange}
            icon={Users}
            formatValue={formatNumber}
            description="Active customer accounts"
          />
          <StatCard
            title="Pending Deliveries"
            value={dashboardData.overview.pendingDeliveries}
            change={dashboardData.overview.deliveriesChange}
            icon={Truck}
            description="Orders awaiting delivery"
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Products
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance and growth</CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {dashboardData.overview.revenueChange}% growth
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6B7280' }}
                        axisLine={{ stroke: '#E5E7EB' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6B7280' }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: any, name: any) => formatTooltipValue(Number(value), String(name))}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#1D4ED8' }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order Volume</CardTitle>
                  <CardDescription>Monthly order count and customer growth</CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {dashboardData.overview.ordersChange}% order growth
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6B7280' }}
                        axisLine={{ stroke: '#E5E7EB' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6B7280' }}
                        axisLine={{ stroke: '#E5E7EB' }}
                      />
                      <Tooltip 
                        formatter={(value: any, name: any) => formatTooltipValue(Number(value), String(name))}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="orders" 
                        fill="#10B981" 
                        radius={[4, 4, 0, 0]}
                        name="Orders"
                      />
                      <Bar 
                        dataKey="customers" 
                        fill="#8B5CF6" 
                        radius={[4, 4, 0, 0]}
                        name="Customers"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best selling products by units sold</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={dashboardData.topProducts}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="sales"
                          nameKey="name"
                        >
                          {dashboardData.topProducts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any, name: any) => [value, `${name} Sales`]} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Revenue contribution by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: product.fill }}
                          />
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(product.revenue)}</p>
                          <p className="text-sm text-gray-500">{product.sales} units</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    startIcon={Search}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders List */}
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-500' :
                        order.status === 'processing' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {order.id}
                        </p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                        <p className="text-xs text-gray-400">
                          {formatDate(order.date)} • {order.items} item{order.items > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                      <p className="font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No orders found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Side - Stock Alerts & Customer Metrics */}
          <div className="space-y-6">
            {/* Stock Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Stock Alerts</CardTitle>
                  <CardDescription>Products needing restock attention</CardDescription>
                </div>
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {dashboardData.stockAlerts.filter(alert => alert.status === 'critical').length} Critical
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.stockAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{alert.product}</p>
                          <p className="text-sm text-gray-500">
                            Current: {alert.currentStock} | Min: {alert.minStock}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={stockStatusColors[alert.status]}>
                          {alert.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReorderProduct(alert.product)}
                        >
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Key customer metrics and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.customerMetrics.newCustomers}</p>
                    <p className="text-sm text-gray-600">New Customers</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.customerMetrics.returningCustomers}</p>
                    <p className="text-sm text-gray-600">Returning</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.customerMetrics.customerRetention}%</p>
                    <p className="text-sm text-gray-600">Retention Rate</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(dashboardData.customerMetrics.averageLifetimeValue)}
                    </p>
                    <p className="text-sm text-gray-600">Avg. LTV</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Metrics & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key business performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatCurrency(dashboardData.quickStats.averageOrderValue)}
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {dashboardData.quickStats.conversionRate}%
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {dashboardData.quickStats.customerSatisfaction}/5
                  </p>
                </div>

                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {dashboardData.quickStats.inventoryTurnover}x
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20 p-4 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 transition-all duration-200"
                  onClick={() => handleQuickAction('Add Product')}
                >
                  <Package className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-700">Add Product</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20 p-4 bg-green-50 hover:bg-green-100 border-2 border-dashed border-green-200 transition-all duration-200"
                  onClick={() => handleQuickAction('Create Order')}
                >
                  <ShoppingCart className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-700">Create Order</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20 p-4 bg-purple-50 hover:bg-purple-100 border-2 border-dashed border-purple-200 transition-all duration-200"
                  onClick={() => handleQuickAction('Schedule Delivery')}
                >
                  <Truck className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-700">Schedule Delivery</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20 p-4 bg-orange-50 hover:bg-orange-100 border-2 border-dashed border-orange-200 transition-all duration-200"
                  onClick={() => handleQuickAction('View Reports')}
                >
                  <FileText className="w-6 h-6 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-orange-700">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}