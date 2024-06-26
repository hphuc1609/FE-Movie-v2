import axios, { AxiosRequestConfig } from 'axios'

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
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const {
        status,
        data: { message },
      } = error.response
      throw new HttpError(status, message)
    }
    throw error
  },
)

const axiosClient = {
  get: (endPoint: string, config?: AxiosRequestConfig) => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.get(url, config)
  },
  post: (endPoint: string, data?: any, config?: AxiosRequestConfig) => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.post(url, data, config)
  },
  put: (endPoint: string, data?: any, config?: AxiosRequestConfig) => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.put(url, data, config)
  },
  delete: (endPoint: string, config?: AxiosRequestConfig) => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.delete(url, config)
  },
}

export default axiosClient
