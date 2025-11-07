import CategoryManager from '@/components/business/CategoryManager'
import InventoryTable from '@/components/business/InventoryTable'

export default function ProductCategoriesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Product Categories</h1>
        <p className="text-sm text-gray-500">Group products, manage merchandising, and sync tax rules across channels.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <CategoryManager />
        <InventoryTable />
      </div>
    </div>
  )
}

