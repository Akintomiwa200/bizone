import { ProductSummary, productSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Package2, ArrowUpRight, ShoppingCart, Edit, AlertTriangle } from 'lucide-react'

interface ProductCardProps {
  product?: ProductSummary
  showActions?: boolean
}

const statusCopy: Record<ProductSummary['status'], string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock'
}

export default function ProductCard({
  product = productSummaries[0],
  showActions = true
}: ProductCardProps) {
  const demandGrowth = ((product.weeklyDemand.at(-1)! - product.weeklyDemand[0]) / product.weeklyDemand[0]) * 100

  return (
    <Card className="h-full border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
          <Package2 className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg text-gray-900">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {product.category}
          </CardDescription>
        </div>
        <Badge variant={product.status === 'in-stock' ? 'success' : product.status === 'low-stock' ? 'warning' : 'error'}>
          {statusCopy[product.status]}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Unit price</p>
            <p className="text-xl font-semibold text-gray-900">₦{product.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Stock level</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold text-gray-900">{product.stock}</p>
              {product.stock <= product.reorderPoint && (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Demand trend</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              {(demandGrowth >= 0 ? '+' : '') + demandGrowth.toFixed(1)}% vs. last week
            </div>
            <div className="flex -space-x-1">
              {product.weeklyDemand.slice(-3).map((value, index) => (
                <span
                  key={index}
                  className="h-2 w-8 rounded-full bg-emerald-400/70"
                  style={{ opacity: 0.5 + index * 0.25 }}
                  aria-hidden
                ></span>
              ))}
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Promote product
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

