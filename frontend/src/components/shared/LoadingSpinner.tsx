import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  variant?: "default" | "primary" | "secondary" | "white"
  text?: string
  showText?: boolean
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  variant = "default",
  text = "Loading...",
  showText = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4"
  }

  const variantClasses = {
    default: "border-gray-300 border-t-blue-600",
    primary: "border-blue-100 border-t-blue-600",
    secondary: "border-gray-100 border-t-gray-600",
    white: "border-white/30 border-t-white"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {showText && (
        <p className={cn(
          "text-sm font-medium",
          variant === "white" ? "text-white" : "text-muted-foreground"
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

// Skeleton loading component for content placeholders
interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string
  height?: string
  animation?: "pulse" | "wave"
}

export function Skeleton({ 
  className, 
  variant = "text",
  width,
  height,
  animation = "pulse"
}: SkeletonProps) {
  const baseClasses = "bg-muted rounded"
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-md"
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted"
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width || undefined,
        height: height || undefined
      }}
      aria-label="Loading content..."
    />
  )
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  children?: React.ReactNode
  backdrop?: boolean
}

export function LoadingOverlay({ 
  isLoading, 
  text = "Loading...",
  children,
  backdrop = true
}: LoadingOverlayProps) {
  if (!isLoading) return children

  return (
    <div className="relative">
      {children && (
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      )}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center z-50",
        backdrop && "bg-background/80 backdrop-blur-sm"
      )}>
        <LoadingSpinner size="lg" text={text} showText />
      </div>
    </div>
  )
}

// Loading wrapper for components
interface WithLoadingProps {
  isLoading: boolean
  loadingComponent?: React.ReactNode
  error?: string | null
  errorComponent?: React.ReactNode
  children: React.ReactNode
}

export function WithLoading({ 
  isLoading, 
  loadingComponent,
  error,
  errorComponent,
  children 
}: WithLoadingProps) {
  if (error) {
    return errorComponent || (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-destructive mb-2">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return loadingComponent || (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}

export default LoadingSpinner