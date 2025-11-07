import { productSummaries, ProductSummary } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

interface InventoryTableProps {
  products?: ProductSummary[]
}

const statusBadgeVariant: Record<ProductSummary['status'], 'success' | 'warning' | 'error'> = {
  'in-stock': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'error'
}

export default function InventoryTable({ products = productSummaries }: InventoryTableProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-xl text-gray-900">Inventory status</CardTitle>
        <p className="text-sm text-gray-500">
          Live synchronization across storefront, POS devices, and WhatsApp commerce channels.
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Reorder point</TableHead>
              <TableHead>Demand trend</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const weeklyTrend = product.weeklyDemand.at(-1)! - product.weeklyDemand[0]
              const isGrowing = weeklyTrend >= 0
              const trendIcon = isGrowing ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />

              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₦{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900">{product.stock}</div>
                      {product.stock <= product.reorderPoint && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.reorderPoint}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {trendIcon}
                      {(Math.abs(weeklyTrend) / product.weeklyDemand[0] * 100).toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[product.status]}>
                      {product.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

