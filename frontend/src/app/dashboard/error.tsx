'use client'

import React, { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log error to monitoring service or console
  useEffect(() => {
    console.error('App Error:', error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <div className="text-center space-y-4 p-6 bg-white shadow-md rounded-lg max-w-md">
          <h1 className="text-2xl font-semibold text-red-600">Something went wrong</h1>
          <p className="text-gray-600">
            We encountered an unexpected error. Please try again.
          </p>
          {error?.digest && (
            <p className="text-xs text-gray-400">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
          )}
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
