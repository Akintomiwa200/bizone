"use client"

import { useState } from 'react'
import { productSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Loader2, Upload, Sparkles } from 'lucide-react'

interface ProductFormState {
  name: string
  category: string
  price: number
  stock: number
  reorderPoint: number
  costPrice: number
  description: string
}

const categoryOptions = [
  { value: 'Grocery', label: 'Grocery & Essentials' },
  { value: 'Digital', label: 'Digital Services' },
  { value: 'Hardware', label: 'Hardware & Electronics' }
]

export default function ProductForm() {
  const defaultProduct = productSummaries[0]
  const [saving, setSaving] = useState(false)
  const [formState, setFormState] = useState<ProductFormState>({
    name: defaultProduct.name,
    category: defaultProduct.category,
    price: defaultProduct.price,
    stock: defaultProduct.stock,
    reorderPoint: defaultProduct.reorderPoint,
    costPrice: 8200,
    description: 'Prepared-to-ship organic produce sourced from trusted cooperatives.'
  })

  const handleChange = <Field extends keyof ProductFormState>(field: Field, value: ProductFormState[Field]) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Create product</CardTitle>
        <CardDescription>
          Publish new inventory across storefront, WhatsApp commerce, and POS terminals instantly.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product name"
              value={formState.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="Enter product title"
              required
            />
            <Select
              label="Category"
              value={formState.category}
              onChange={(event) => handleChange('category', event.target.value)}
              options={categoryOptions}
            />
            <Input
              label="Price"
              type="number"
              min={0}
              value={formState.price}
              onChange={(event) => handleChange('price', Number(event.target.value))}
              placeholder="₦0.00"
              required
            />
            <Input
              label="Cost price"
              type="number"
              min={0}
              value={formState.costPrice}
              onChange={(event) => handleChange('costPrice', Number(event.target.value))}
              placeholder="₦0.00"
              required
            />
            <Input
              label="Stock quantity"
              type="number"
              min={0}
              value={formState.stock}
              onChange={(event) => handleChange('stock', Number(event.target.value))}
              required
            />
            <Input
              label="Reorder point"
              type="number"
              min={0}
              value={formState.reorderPoint}
              onChange={(event) => handleChange('reorderPoint', Number(event.target.value))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.description}
              onChange={(event) => handleChange('description', event.target.value)}
              placeholder="Describe product benefits, specifications, and fulfillment details."
            />
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              AI copy assistant available after saving.
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center bg-gray-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700">Upload product media</p>
            <p className="text-xs text-gray-500">
              Drag & drop images or videos. Max size 5MB each.
            </p>
            <Button variant="outline" className="mt-4 border-gray-300 text-gray-700">
              Browse files
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/60">
          <Button type="button" variant="outline" className="border-gray-300 text-gray-600">
            Save as draft
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Publishing
              </>
            ) : (
              'Publish product'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product, CreateProductData } from '@/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({ 
  product, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: ProductFormProps) {
  const isEditing = !!product;
  const { register, handleSubmit, formState: { errors } } = useForm<CreateProductData>({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      comparePrice: product.comparePrice,
      costPerItem: product.costPerItem,
      inventory: {
        trackQuantity: product.inventory.trackQuantity,
        quantity: product.inventory.quantity,
        lowStockAlert: product.inventory.lowStockAlert
      }
    } : {}
  });

  const [images, setImages] = useState<File[]>([]);

  const handleFormSubmit = async (data: CreateProductData) => {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(data).forEach(key => {
      if (key === 'inventory') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key as keyof CreateProductData] as string);
      }
    });

    // Append images
    images.forEach(image => {
      formData.append('images', image);
    });

    await onSubmit(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Product Name */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Product name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="food">Food & Beverages</option>
            <option value="fashion">Fashion & Apparel</option>
            <option value="electronics">Electronics</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="home">Home & Living</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₦) *
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Compare Price */}
        <div>
          <label htmlFor="comparePrice" className="block text-sm font-medium text-gray-700">
            Compare Price (₦)
          </label>
          <input
            type="number"
            id="comparePrice"
            step="0.01"
            min="0"
            {...register('comparePrice')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Cost per Item */}
        <div>
          <label htmlFor="costPerItem" className="block text-sm font-medium text-gray-700">
            Cost per Item (₦)
          </label>
          <input
            type="number"
            id="costPerItem"
            step="0.01"
            min="0"
            {...register('costPerItem')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Inventory Tracking */}
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="trackQuantity"
              {...register('inventory.trackQuantity')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="trackQuantity" className="ml-2 block text-sm text-gray-700">
              Track quantity
            </label>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity in Stock
          </label>
          <input
            type="number"
            id="quantity"
            min="0"
            {...register('inventory.quantity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Low Stock Alert */}
        <div>
          <label htmlFor="lowStockAlert" className="block text-sm font-medium text-gray-700">
            Low Stock Alert
          </label>
          <input
            type="number"
            id="lowStockAlert"
            min="0"
            {...register('inventory.lowStockAlert')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Images */}
        <div className="sm:col-span-2">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
