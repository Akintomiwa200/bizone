"use client"

import { useState } from 'react'
import { businessSummaries, BusinessSummary } from '@/utils/mock-data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { Loader2, Save, Sparkles } from 'lucide-react'

type BusinessFormState = Pick<BusinessSummary, 'name' | 'owner' | 'category' | 'location'> & {
  supportEmail: string
  storefrontUrl: string
}

const categoryOptions = [
  { value: 'Grocery', label: 'Grocery & Essentials' },
  { value: 'Fashion', label: 'Fashion & Apparel' },
  { value: 'Electronics', label: 'Electronics & Gadgets' },
  { value: 'Digital', label: 'Digital Services' }
]

interface BusinessFormProps {
  defaultBusiness?: BusinessSummary
  onSubmit?: (payload: BusinessFormState) => Promise<void> | void
}

export default function BusinessForm({
  defaultBusiness = businessSummaries[0],
  onSubmit
}: BusinessFormProps) {
  const [formState, setFormState] = useState<BusinessFormState>({
    name: defaultBusiness.name,
    owner: defaultBusiness.owner,
    category: defaultBusiness.category,
    location: defaultBusiness.location,
    supportEmail: 'support@bizone.africa',
    storefrontUrl: 'https://bizone.africa/' + defaultBusiness.id
  })
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string>('Synced a few seconds ago')

  const handleChange = (field: keyof BusinessFormState) => (
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (onSubmit) {
        await onSubmit(formState)
      }
      setLastSaved(`Saved • ${new Date().toLocaleTimeString()}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="shadow-sm border border-gray-200/70">
      <CardHeader className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          Real-time configuration
        </Badge>
        <CardTitle className="text-2xl text-gray-900">Business Profile</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Update storefront details, logistics coverage, and support settings. Changes sync instantly across your Bizone channel stack.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Business name"
              placeholder="Enter registered business name"
              value={formState.name}
              onChange={(event) => handleChange('name')(event.target.value)}
              required
            />
            <Input
              label="Business owner"
              placeholder="Full name"
              value={formState.owner}
              onChange={(event) => handleChange('owner')(event.target.value)}
              required
            />
            <Select
              label="Business category"
              value={formState.category}
              onChange={(event) => handleChange('category')(event.target.value)}
              options={categoryOptions}
              helperText="Used for storefront theming & analytics benchmarking"
            />
            <Input
              label="Primary location"
              placeholder="City, State"
              value={formState.location}
              onChange={(event) => handleChange('location')(event.target.value)}
              required
            />
            <Input
              label="Support email"
              type="email"
              placeholder="support@yourbusiness.com"
              value={formState.supportEmail}
              onChange={(event) => handleChange('supportEmail')(event.target.value)}
            />
            <Input
              label="Storefront URL"
              placeholder="https://bizone.africa/your-store"
              value={formState.storefrontUrl}
              onChange={(event) => handleChange('storefrontUrl')(event.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Business description</label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your business, target market, and key value proposition."
              defaultValue="We deliver fresh produce to 2,300+ customers across Lagos with AI-optimized routing and embedded payments."
            ></textarea>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Tip: Keep under 280 characters for the best storefront conversion.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-gray-100 bg-gray-50/60">
          <div className="text-sm text-gray-500">
            {saving ? 'Syncing with Bizone Cloud...' : lastSaved}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-white"
              onClick={() => setFormState({
                name: defaultBusiness.name,
                owner: defaultBusiness.owner,
                category: defaultBusiness.category,
                location: defaultBusiness.location,
                supportEmail: 'support@bizone.africa',
                storefrontUrl: 'https://bizone.africa/' + defaultBusiness.id
              })}
              disabled={saving}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

