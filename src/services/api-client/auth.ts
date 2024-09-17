import { authEndPoint } from '@/constants/end-point'
import axiosHeaders from '@/lib/axios-headers'
import { ILoginResponse, ILogoutResponse, IRegisterResponse } from '@/models/interfaces/auth'

const authApi = {
  login: (payload: any): Promise<ILoginResponse> => {
    return axiosHeaders.post(`/auth${authEndPoint.login}`, payload)
  },
  register: (payload: any): Promise<IRegisterResponse> => {
    return axiosHeaders.post(`/auth${authEndPoint.register}`, payload)
  },
  logout: (): Promise<ILogoutResponse> => {
    return axiosHeaders.post(`/auth${authEndPoint.logout}`)
  },
}

export default authApi
