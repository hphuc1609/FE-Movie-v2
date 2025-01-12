import { endPoint } from '@/constants/end-point'
import axiosHeaders from '@/lib/axios-auth'
import { IComment } from '@/models/interfaces/comment'

const commentApi = {
  getAll: (): Promise<IComment[]> => {
    return axiosHeaders.get(endPoint.comment)
  },
  create: (data: any): Promise<IComment> => {
    return axiosHeaders.post(endPoint.comment, data)
  },
  update: (id: string, data: any): Promise<IComment> => {
    return axiosHeaders.put(`${endPoint.comment}/${id}`, data)
  },
  delete: (id: string) => {
    return axiosHeaders.delete(`${endPoint.comment}/${id}`)
  },
}

export default commentApi
