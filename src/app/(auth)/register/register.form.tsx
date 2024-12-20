'use client'

import InputCustom from '@/components/common/input-form/text'
import { Button } from '@/components/ui/button'
import isSuccessResponse from '@/helpers/check-response'
import { showToast } from '@/helpers/toast'
import { cn } from '@/lib/utils'
import { RegisterData, RegisterSchema } from '@/models/types/auth'
import authApi from '@/services/api-client/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const RegisterForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { username: '', fullname: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: RegisterData) => {
    setLoading(true)
    try {
      const res = await authApi.register(data)
      if (isSuccessResponse(res)) {
        router.push('/login')
        showToast({ variant: 'success', description: 'Đăng ký thành công!' })
        return
      }
      showToast({ variant: 'error', description: res.message })
    } catch (error: any) {
      showToast({ variant: 'error', title: 'Something went wrong.', description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Đăng ký</h1>
      <InputCustom
        name='fullname'
        control={control}
        placeholder='Họ tên'
      />
      <InputCustom
        name='username'
        control={control}
        placeholder='Tên đăng nhập'
      />
      <InputCustom
        name='email'
        control={control}
        placeholder='Email'
      />
      <InputCustom
        name='password'
        control={control}
        placeholder='Mật khẩu'
        type='password'
      />
      <InputCustom
        name='confirmPassword'
        control={control}
        placeholder='Xác nhận mật khẩu'
        type='password'
      />
      <Button
        className={cn(
          'h-11 flex gap-2 text-base bg-primary-color hover:bg-yellow-600 font-semibold rounded-sm',
          loading && 'bg-neutral-500',
        )}
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        autoFocus
      >
        {loading && (
          <Loader
            className='animate-spin'
            size={20}
          />
        )}
        Đăng ký
      </Button>

      <p className='text-[15px] text-gray-300 flex gap-2'>
        Bạn đã có tài khoản?
        <Link
          href='/login'
          className='text-white font-bold hover:underline'
        >
          Đăng nhập.
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
