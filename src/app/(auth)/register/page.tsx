import { useMetadata } from '@/hooks'
import { Metadata } from 'next'
import RegisterForm from './register.form'

export async function generateMetadata(): Promise<Metadata> {
  return useMetadata({
    title: 'Đăng ký',
    description: 'Trang đăng ký Mephim247',
  })
}

export default function RegisterPage() {
  return <RegisterForm />
}
