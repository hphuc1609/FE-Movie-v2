import React from 'react'
import LoginForm from './login-form'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Đăng nhập',
  }
}

export default async function LoginPage() {
  return <LoginForm />
}
