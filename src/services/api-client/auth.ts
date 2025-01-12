import { authEndPoint } from '@/constants/end-point'
import axiosHeaders from '@/lib/axios-auth'
import { ILoginResponse, ILogoutResponse, IRegisterResponse } from '@/models/interfaces/auth'

const authApi = {
  login: (payload: any): Promise<ILoginResponse> => {
    return axiosHeaders.post(`${authEndPoint.login}`, payload)
  },
  register: (payload: any): Promise<IRegisterResponse> => {
    return axiosHeaders.post(`${authEndPoint.register}`, payload)
  },
  logout: (): Promise<ILogoutResponse> => {
    return axiosHeaders.post(`${authEndPoint.logout}`)
  },
}

export default authApi
