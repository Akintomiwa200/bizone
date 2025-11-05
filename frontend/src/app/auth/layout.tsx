// app/auth/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bizone - Business Platform',
  description: 'Empowering Nigerian MSMEs with digital storefronts, financial services, logistics, and business analytics.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {children}
    </div>
  )
}