import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipContentProps, TooltipTriggerProps } from '@radix-ui/react-tooltip'

interface TooltipCustomProps {
  children: React.ReactNode
  content: React.ReactNode
  TooltipTriggerProps?: TooltipTriggerProps
  TooltipContentProps?: TooltipContentProps
}

export default function TooltipCustom({
  children,
  content,
  TooltipTriggerProps,
  TooltipContentProps,
}: TooltipCustomProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger {...TooltipTriggerProps}>{children}</TooltipTrigger>
        <TooltipContent {...TooltipContentProps}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
