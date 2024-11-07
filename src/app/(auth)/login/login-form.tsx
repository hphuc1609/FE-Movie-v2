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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const router = useRouter()
  const context = useContextGlobal()

  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  })

  useEffect(() => {
    // Load saved username from local storage if available
    const savedUsername = localStorage.getItem('savedUsername')
    if (savedUsername) setValue('username', savedUsername)

    // Load "Remember Me" state from local storage if available
    const savedRememberMe = localStorage.getItem('rememberMe')
    if (savedRememberMe === 'true') setRememberMe(true)
  }, [setValue])

  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    try {
      const res = await authApi.login(data)

      if (isSuccessResponse(res)) {
        setCookie('userVerify', res.data, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        })
        context.setLogin(true)
        showToast({ variant: 'success', description: 'Đăng nhập thành công!' })

        // Save username if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('savedUsername', data.username)
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('savedUsername')
          localStorage.removeItem('rememberMe')
        }

        const lastPath = localStorage.getItem('lastPath')
        router.push(lastPath || '/')
        return
      }
      showToast({ variant: 'error', description: res.message })
    } catch (error: any) {
      showToast({ variant: 'error', title: 'Something went wrong.', description: `${error}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Đăng nhập</h1>
      <InputText
        name='username'
        control={control}
        placeholder='Email hoặc tên đăng nhập'
      />
      <InputText
        name='password'
        control={control}
        placeholder='Mật khẩu'
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
        Đăng nhập
      </Button>

      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Checkbox
            className='w-5 h-5 bg-secondary data-[state=checked]:bg-white data-[state=checked]:text-primary'
            checked={rememberMe}
            onClick={() => setRememberMe((prev) => !prev)}
          />
          <p className='text-[15px] font-medium'>Nhớ đăng nhập</p>
        </div>
        <Link
          href='forgot-password:;'
          className='text-[15px] text-gray-300 hover:underline'
        >
          Quên mật khẩu?
        </Link>
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
