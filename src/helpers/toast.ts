import { toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

export const showToast = ({
  description,
  title,
  variant = 'success',
}: {
  description: string
  title?: string
  variant?: 'success' | 'error' | 'info' | 'warning' | 'default'
}) => {
  const toastStyles = {
    default: 'bg-neutral-700/80 border-none text-white',
    success: 'bg-green-500/80 border-none text-white',
    error: 'bg-red-500/80 border-none text-white',
    info: 'bg-blue-500/80 border-none text-white',
    warning: 'bg-yellow-500/80 border-none text-white',
  }

  toast({
    description,
    title,
    className: cn(toastStyles[variant], 'fixed max-w-[350px] top-4 right-4 left-auto'),
  })
}
