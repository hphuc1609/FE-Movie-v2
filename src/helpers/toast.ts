import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export const showToast = ({
  description,
  title,
  variant = 'success',
}: {
  description: string
  title?: string
  variant?: 'success' | 'error' | 'info' | 'warning'
}) => {
  const toastStyles = {
    success: 'bg-green-500 border-none text-white',
    error: 'bg-red-500 border-none text-white',
    info: 'bg-blue-500 border-none text-white',
    warning: 'bg-yellow-500 border-none text-white',
  }

  toast({
    description,
    title,
    className: cn(toastStyles[variant], 'fixed max-w-[350px] top-4 right-4 left-auto'),
  })
}
