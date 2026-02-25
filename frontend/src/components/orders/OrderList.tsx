'use client';
import { useState, useEffect } from 'react';
import { orderSummaries, OrderSummary } from '@/utils/mock-data'
import { useSocket, useSocketEvent } from '@/hooks/useSocket'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { OrderFilters } from './OrderFilters'
import OrderCard from './OrderCard'

interface OrderListProps {
  orders?: OrderSummary[]
}

export default function OrderList({ orders: initialOrders = orderSummaries }: OrderListProps) {
  const [orders, setOrders] = useState(initialOrders);
  
  // Initialize socket connection using a mock token for now
  useSocket('mock-token');

  useSocketEvent('new_order', (newOrder: any) => {
    // Map backend newOrder format to frontend OrderSummary format
    const mappedOrder: OrderSummary = {
      id: newOrder.orderId || newOrder._id || `ORD-${Math.floor(Math.random() * 10000)}`,
      customer: newOrder.customer?.name || 'Unknown Customer',
      status: newOrder.status || 'pending',
      fulfillment: newOrder.fulfillment || 'delivery',
      total: newOrder.total || 0,
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: 'card'
    };
    
    setOrders(prev => [mappedOrder, ...prev]);
  });

  useSocketEvent('order_updated', (updatedOrder: any) => {
    const targetId = updatedOrder.orderId || updatedOrder._id;
    setOrders(prev => prev.map(o => 
      o.id === targetId ? { ...o, status: updatedOrder.status || o.status } : o
    ));
  });

  useSocketEvent('status-changed', (updatedOrder: any) => {
    const targetId = updatedOrder.orderId || updatedOrder._id;
    setOrders(prev => prev.map(o => 
      o.id === targetId ? { ...o, status: updatedOrder.status || o.status } : o
    ));
  });

  return (
    <div className="space-y-6">
      <OrderFilters />
      <Card className="border border-gray-200/70 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Orders overview</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            New order
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fulfilment</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-gray-900">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : order.status === 'cancelled' ? 'error' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{order.fulfillment}</TableCell>
                  <TableCell className="capitalize">{order.paymentMethod.replace('-', ' ')}</TableCell>
                  <TableCell>₦{order.total.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-gray-500">{order.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <OrderCard key={`${order.id}-card`} order={order} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

