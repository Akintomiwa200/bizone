// app/auth/forgot-password/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password - Bizone',
  description: 'Reset your Bizone account password. Enter your email to receive password reset instructions.',
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

