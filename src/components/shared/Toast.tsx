import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 150)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: 'bg-accent-success/10 border-accent-success text-accent-success',
    error: 'bg-accent-error/10 border-accent-error text-accent-error',
    warning: 'bg-accent-warning/10 border-accent-warning text-accent-warning',
    info: 'bg-accent-info/10 border-accent-info text-accent-info',
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg border transition-smooth',
        typeStyles[type],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

// Toast Manager - simple implementation
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: number }>>([])

  const showToast = (props: ToastProps) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...props, id }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    showToast,
    toasts,
    removeToast,
  }
}
