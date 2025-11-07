import ProductCard from './ProductCard'
import { productSummaries, ProductSummary } from '@/utils/mock-data'

interface ProductGridProps {
  products?: ProductSummary[]
}

export default function ProductGrid({ products = productSummaries }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

