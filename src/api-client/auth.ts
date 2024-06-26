import axiosClient from '@/lib/axios-client'

const authApi = {
  login: (payload: any) => {
    return axiosClient.post('/login', payload)
  },
  register: (payload: any) => {
    return axiosClient.post('/register', payload)
  },
  logout: () => {
    return axiosClient.post('/logout')
  },
}

export default authApi
