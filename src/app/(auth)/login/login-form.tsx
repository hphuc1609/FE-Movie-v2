'use client'

import InputText from '@/components/common/input-form/text'
import { useContextGlobal } from '@/components/context-provider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import isSuccessResponse from '@/helpers/check-response'
import { showToast } from '@/helpers/toast'
import { cn } from '@/lib/utils'
import { LoginData, LoginSchema } from '@/models/types/auth'
import authApi from '@/services/api-client/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const router = useRouter()
  const context = useContextGlobal()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    try {
      const res = await authApi.login(data)
      if (isSuccessResponse(res)) {
        const payload = { username: res.username, token: res.token }

        setCookie('userVerify', payload, { maxAge: 60 * 60 * 24 })
        context.setLogin(true)
        router.back()
        return
      }
      showToast({ variant: 'error', title: 'Something went wrong.', description: res.message })
    } catch (error: any) {
      showToast({ variant: 'error', title: 'Something went wrong.', description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Đăng nhập</h1>
      <InputText
        name='username'
        label='Tên đăng nhập'
        control={control}
        placeholder='Nhập tên đăng nhập'
        InputTextProps={{ autoComplete: 'username' }}
      />
      <InputText
        name='password'
        label='Mật khẩu'
        control={control}
        placeholder='Nhập mật khẩu'
        InputTextProps={{ autoComplete: 'current-password' }}
      />
      <Button
        className={cn(
          'h-11 flex gap-2 text-base bg-primary-color hover:bg-yellow-600 font-semibold rounded-sm',
          loading && 'bg-neutral-500',
        )}
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading && (
          <Loader
            className='animate-spin'
            size={20}
          />
        )}
        Đăng nhập
      </Button>

      <div className='flex gap-2'>
        <Checkbox className='w-5 h-5 bg-secondary data-[state=checked]:bg-white data-[state=checked]:text-primary' />
        <p className='text-[15px] font-medium'>Nhớ đăng nhập</p>
      </div>
      <p className='text-[15px] text-gray-300 flex gap-2'>
        Bạn chưa có tài khoản?
        <Link
          href='/register'
          className='text-white font-bold hover:underline'
        >
          Đăng ký ngay.
        </Link>
      </p>
    </>
  )
}

export default LoginForm
