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
