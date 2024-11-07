import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Control, Controller } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface InputCustomProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  type?: 'text' | 'password'
  InputCustomProps?: InputProps
}

const InputCustom = (props: InputCustomProps) => {
  const { name, label, control, placeholder, type = 'text' } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <div className='w-full grid gap-2'>
          <Label
            htmlFor={name}
            className='text-base'
            hidden={!label}
          >
            {label}
          </Label>
          <div className='relative'>
            <Input
              {...field}
              {...props.InputCustomProps}
              id={name}
              value={value}
              type={type === 'password' && !showPassword ? 'password' : 'text'}
              placeholder={placeholder}
              className={cn(
                'w-full h-14 text-inherit bg-white bg-opacity-5 rounded-sm',
                error ? 'border-red-500 focus:border-none' : 'border-neutral-500 focus:border-none',
                props.InputCustomProps?.className,
              )}
            />
            {type === 'password' && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-neutral-500 focus:ring-offset-transparent focus:!ring-offset-0 focus:!ring-0'
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <EyeIcon
                    className='h-4 w-4'
                    aria-hidden='true'
                  />
                ) : (
                  <EyeOffIcon
                    className='h-4 w-4'
                    aria-hidden='true'
                  />
                )}
              </Button>
            )}
          </div>
          {error?.message && <p className='text-red-500 text-xs'>* {error.message}</p>}
        </div>
      )}
    />
  )
}

export default InputCustom
