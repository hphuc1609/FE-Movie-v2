import React from 'react'
import RegisterForm from './register.form'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Đăng ký',
  }
}

export default function RegisterPage() {
  return <RegisterForm />
}
