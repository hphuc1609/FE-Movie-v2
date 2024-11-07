import { endPoint } from '@/constants/end-point'
import axiosHeaders from '@/lib/axios-headers'
import { IFavourite, IFavouriteItem } from '@/models/interfaces/favourite'

const favouriteApi = {
  getAll: (): Promise<IFavourite[]> => {
    return axiosHeaders.get(endPoint.favourite)
  },
  add: (data: IFavouriteItem): Promise<IFavourite> => {
    return axiosHeaders.post(endPoint.favourite, data)
  },
  delete: (id: string) => {
    return axiosHeaders.delete(`${endPoint.favourite}/${id}`)
  },
}

export default favouriteApi
