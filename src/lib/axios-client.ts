import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return new Error(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response
      const { message } = data as AxiosError

      return new HttpError(status, message)
    }
    return new Error(error.message)
  },
)

const axiosClient = {
  get: <T>(endPoint: string, config?: AxiosRequestConfig): Promise<any> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.get(url, config)
  },
  post: <T>(endPoint: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.post(url, data, config)
  },
  put: <T>(endPoint: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.put(url, data, config)
  },
  delete: <T>(endPoint: string, config?: AxiosRequestConfig): Promise<any> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.delete(url, config)
  },
}

export default axiosClient
