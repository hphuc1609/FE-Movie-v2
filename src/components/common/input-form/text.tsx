import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Control, Controller } from 'react-hook-form'

interface InputTextProps {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  InputTextProps?: InputProps
}

const InputText = (props: InputTextProps) => {
  const { name, label, control, placeholder } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className='w-full grid gap-2'>
          <Label
            htmlFor={name}
            className='text-base'
          >
            {label}
          </Label>
          <Input
            {...field}
            {...props.InputTextProps}
            id={name}
            placeholder={placeholder}
            className={cn(
              'w-full h-14 text-inherit bg-white bg-opacity-5 rounded-sm',
              error ? 'border-red-500 focus:border-none' : 'border-neutral-500 focus:border-none',
              props.InputTextProps?.className,
            )}
          />
          {error?.message && <p className='text-red-500 text-xs'>* {error.message}</p>}
        </div>
      )}
    />
  )
}

export default InputText
