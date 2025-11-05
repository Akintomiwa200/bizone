"use client"

import { useState } from 'react'
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
  MoreHorizontal,
  Calendar,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

// Mock data for dashboard
const dashboardData = {
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
      status: 'delivered',
      date: '2024-01-15',
      items: 3,
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      amount: 32000,
      status: 'processing',
      date: '2024-01-15',
      items: 2,
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      amount: 78000,
      status: 'pending',
      date: '2024-01-14',
      items: 5,
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      amount: 21000,
      status: 'delivered',
      date: '2024-01-14',
      items: 1,
    },
  ],
  stockAlerts: [
    { product: 'iPhone 14 Pro', currentStock: 5, minStock: 10, status: 'low' },
    { product: 'Samsung Galaxy S23', currentStock: 3, minStock: 8, status: 'critical' },
    { product: 'MacBook Air M2', currentStock: 8, minStock: 15, status: 'low' },
  ],
  salesChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [650000, 720000, 810000, 890000, 950000, 1020000],
  },
  quickStats: {
    averageOrderValue: 38500,
    conversionRate: 3.2,
    customerSatisfaction: 4.5,
  }
}

const statusColors = {
  delivered: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}

const stockStatusColors = {
  low: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800',
  adequate: 'bg-green-100 text-green-800',
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('month')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount)
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    formatValue = (v: any) => v 
  }: {
    title: string
    value: number
    change: number
    icon: any
    formatValue?: (value: any) => string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatValue(value)}
              </p>
              <div className={`flex items-center mt-2 text-sm ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(change)}% from last period
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 days
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={dashboardData.overview.totalRevenue}
          change={dashboardData.overview.revenueChange}
          icon={TrendingUp}
          formatValue={formatCurrency}
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.overview.totalOrders}
          change={dashboardData.overview.ordersChange}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value={dashboardData.overview.totalCustomers}
          change={dashboardData.overview.customersChange}
          icon={Users}
        />
        <StatCard
          title="Pending Deliveries"
          value={dashboardData.overview.pendingDeliveries}
          change={dashboardData.overview.deliveriesChange}
          icon={Truck}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status}
                      </Badge>
                      <p className="font-semibold">{formatCurrency(order.amount)}</p>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Stock Alerts</CardTitle>
                <CardDescription>Products needing restock attention</CardDescription>
              </div>
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {dashboardData.stockAlerts.length} Alerts
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
                        alert.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{alert.product}</p>
                        <p className="text-sm text-gray-500">
                          Current: {alert.currentStock} | Min: {alert.minStock}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={stockStatusColors[alert.status as keyof typeof stockStatusColors]}>
                        {alert.status}
                      </Badge>
                      <Button size="sm">Reorder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(dashboardData.quickStats.averageOrderValue)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboardData.quickStats.conversionRate}%
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboardData.quickStats.customerSatisfaction}/5
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="flex flex-col items-center justify-center h-20 p-4 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200">
                <Package className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-700">Add Product</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-20 p-4 bg-green-50 hover:bg-green-100 border-2 border-dashed border-green-200">
                <ShoppingCart className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Create Order</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-20 p-4 bg-purple-50 hover:bg-purple-100 border-2 border-dashed border-purple-200">
                <Truck className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-700">Schedule Delivery</span>
              </Button>
              <Button className="flex flex-col items-center justify-center h-20 p-4 bg-orange-50 hover:bg-orange-100 border-2 border-dashed border-orange-200">
                <CreditCard className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-700">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}