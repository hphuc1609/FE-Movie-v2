import axiosClient from '@/lib/axios-client'
import { DetailResponse } from '@/models/detail'
import { MovieCategoryResponse } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'

interface GetNewMoviesParams {
  page?: string | number
}

interface GetMoviesParams {
  category: string
}

interface GetMovieSearchParams {
  keyword: string
  limit?: string | number
}

const movieApi = {
  getNewMovies: async ({ page }: GetNewMoviesParams): Promise<NewMovieResponse> => {
    const url = `/danh-sach/phim-moi-cap-nhat${page ? `?page=${page}` : ''}`
    const response = await axiosClient.get(url)
    return response.data
  },

  getListCate: async ({ category }: GetMoviesParams): Promise<MovieCategoryResponse> => {
    const url = `/v1/api/danh-sach/${category}`
    const response = await axiosClient.get(url)
    return response.data
  },

  getDetail: async ({ name }: { name: string }): Promise<DetailResponse> => {
    const url = `/phim/${name}`
    const response = await axiosClient.get(url)
    return response.data
  },

  getMoviesSearch: async ({ keyword, limit }: GetMovieSearchParams) => {
    const queryParams = new URLSearchParams()
    if (limit) queryParams.append('limit', limit.toString())

    const url = `/v1/api/tim-kiem?keyword=${keyword}${queryParams ? `&${queryParams}` : ''}`
    const response = await axiosClient.get(url)
    return response.data
  },
}

export default movieApi
