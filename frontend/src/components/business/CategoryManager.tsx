"use client"

import { useState } from 'react'
import { categorySummaries, CategorySummary } from '@/utils/mock-data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Plus, Filter, Pencil, Trash2 } from 'lucide-react'

interface CategoryManagerProps {
  categories?: CategorySummary[]
}

export default function CategoryManager({ categories = categorySummaries }: CategoryManagerProps) {
  const [search, setSearch] = useState('')

  const filtered = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle className="text-xl text-gray-900">Product categories</CardTitle>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-gray-200 text-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New category
            </Button>
          </div>
        </div>
        <Input
          placeholder="Search categories"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Revenue share</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-gray-900">
                  {category.name}
                </TableCell>
                <TableCell>{category.products} items</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-blue-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${category.revenueShare}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{category.revenueShare}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{category.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-600">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-sm text-gray-500">
                  No categories match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60">
        <p className="text-xs text-gray-500">Connected to inventory & analytics in real time.</p>
        <div className="text-xs text-gray-400">{filtered.length} categories</div>
      </CardFooter>
    </Card>
  )
}

