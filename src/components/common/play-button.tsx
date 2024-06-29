import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import React from 'react'

interface PlayButtonProps {
  onClick?: () => void
  className?: string
  PlayIconProps?: React.SVGProps<SVGSVGElement>
}

export default function PlayButton({ onClick, className, PlayIconProps }: PlayButtonProps) {
  return (
    <div
      className={cn(
        `w-[60px] h-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-primary-color cursor-pointer ${className}`,
      )}
      onClick={onClick}
    >
      <Play
        size={30}
        fill='currentColor'
        {...PlayIconProps}
      />
    </div>
  )
}
