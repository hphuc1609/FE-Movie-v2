import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Control, Controller } from 'react-hook-form'

interface SelectInputProps {
  data: { slug: string; name: string }[]
  name: string
  control: Control<any>
  placeholder?: string
}

const SelectInput = (props: SelectInputProps) => {
  const { data, name, control, placeholder } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className='flex flex-col gap-2 w-full'>
          <Select
            value={value}
            onValueChange={onChange}
          >
            <SelectTrigger
              className='text-black'
              style={{ border: 'none' }}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={item.slug}
                  value={item.slug}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.message && <p className='text-red-500 text-xs'>* {error?.message}</p>}
        </div>
      )}
    />
  )
}

export default SelectInput
