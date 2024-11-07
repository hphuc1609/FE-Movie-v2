import { z } from 'zod'

export type LoginData = {
  username: string
  password: string
}

export const LoginSchema: z.ZodType<LoginData> = z.object({
  username: z
    .string()
    .trim()
    .min(1, {
      message: 'Vui lòng nhập tên đăng nhập hoặc email.',
    })
    .refine(
      (value) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const usernamePattern = /^[a-zA-Z0-9_-]{2,}$/

        return emailPattern.test(value) || usernamePattern.test(value)
      },
      {
        message: 'Vui lòng nhập tên đăng nhập hoặc email hợp lệ.',
      },
    ),
  password: z.string().min(4, {
    message: 'Mật khẩu phải có ít nhất 4 ký tự.',
  }),
})

export type RegisterData = {
  fullname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterSchema: z.ZodType<RegisterData> = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, {
        message: 'Vui lòng nhập họ tên.',
      })
      .min(2, {
        message: 'Họ tên phải có nhất 2 ký tự.',
      }),
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9_-]*$/, 'Tên đăng nhập không được chứa khoảng trắng.')
      .min(1, {
        message: 'Vui lòng nhập tên đăng nhập.',
      })
      .min(2, {
        message: 'Tên đăng nhập phải có ít nhất 2 ký tự.',
      }),
    email: z.string().trim().email({ message: 'Email không hợp lệ.' }),
    password: z.string().min(4, {
      message: 'Mật khẩu phải có ít nhất 4 ký tự.',
    }),
    confirmPassword: z.string().min(4, {
      message: 'Mật khẩu xác nhận phải có ít nhất 4 ký tự.',
    }),
  })
  .refine((data: RegisterData) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp.',
    path: ['confirmPassword'],
  })
