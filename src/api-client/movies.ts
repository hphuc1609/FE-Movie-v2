import axiosClient from '@/lib/axios-client'
import { DetailResponse } from '@/models/detail'
import { MovieCategoryResponse } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import axios from 'axios'

interface GetNewMoviesParams {
  page?: string | number
}

interface GetMoviesParams {
  category: string
  page?: string | number
  limit?: string | number
}

interface GetMovieSearchParams {
  keyword: string
  limit?: string | number
}

const domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_2

const movieApi = {
  getNewMovies: async ({ page }: GetNewMoviesParams): Promise<NewMovieResponse> => {
    const url = `/danh-sach/phim-moi-cap-nhat${page ? `?page=${page}` : ''}`
    const response = await axiosClient.get(url)
    return response.data
  },

  getList: async ({ category, page, limit }: GetMoviesParams): Promise<MovieCategoryResponse> => {
    const queryParams = new URLSearchParams()
    if (page) queryParams.append('page', page.toString())
    if (limit) queryParams.append('limit', limit.toString())

    const url = `/v1/api/danh-sach/${category}?${queryParams.toString()}`
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

    const url = `/v1/api/tim-kiem?keyword=${keyword}&${queryParams.toString()}`
    const response = await axiosClient.get(url)
    return response.data
  },

  getMovieInfo: async ({ slug }: { slug: string }): Promise<DetailResponse> => {
    const url = `${domain}/api/film/${slug}`
    const response = await axios.get(url)
    return response.data
  },
}

export default movieApi
