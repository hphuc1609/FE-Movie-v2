import { endPoint } from '@/constants/end-point'
import axiosHeaders from '@/lib/axios-headers'
import { ICommentResponse } from '@/models/interfaces/comment'

const commentApi = {
  getAll: (): Promise<ICommentResponse[]> => {
    return axiosHeaders.get(endPoint.comment)
  },
  create: (data: any): Promise<ICommentResponse> => {
    return axiosHeaders.post(endPoint.comment, data)
  },
  update: (id: string, data: any): Promise<ICommentResponse> => {
    return axiosHeaders.put(`${endPoint.comment}/${id}`, data)
  },
  delete: (id: string) => {
    return axiosHeaders.delete(`${endPoint.comment}/${id}`)
  },
}

export default commentApi
