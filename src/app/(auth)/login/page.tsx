import { useMetadata } from '@/hooks'
import { Metadata } from 'next'
import LoginForm from './login-form'

export async function generateMetadata(): Promise<Metadata> {
  return useMetadata({
    title: 'Đăng nhập',
    description: 'Trang đăng nhập Mephim247',
  })
}

export default async function LoginPage() {
  return <LoginForm />
}
