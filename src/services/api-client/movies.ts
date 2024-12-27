import { endPoint } from '@/constants/end-point'
import getUrl from '@/helpers/getUrl'
import axiosClient from '@/lib/axios-client'
import { MovieDetailResponse } from '@/models/interfaces/detail'
import { CategoryItem, CountryItem, MovieCategoryResponse } from '@/models/interfaces/list'
import { NewMovieResponse } from '@/models/interfaces/new-movie'
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
  page?: string | number
  limit?: string | number
}

const nguoncDomain = process.env.NEXT_PUBLIC_DOMAIN_2

const movieApi = {
  getNewMovies: ({ page }: GetNewMoviesParams): Promise<NewMovieResponse> => {
    const queryParams = new URLSearchParams({
      ...(page && { page: page.toString() }),
    })

    const url = `${endPoint.newMovies}?${queryParams}`
    return axiosClient.get<NewMovieResponse>(url)
  },

  getListByCate: ({ category, page, limit }: GetMoviesParams): Promise<MovieCategoryResponse> => {
    if (!category) throw new Error('Category is required!')

    const queryParams = new URLSearchParams({
      ...(page && { page: page.toString() }),
      ...(limit && { limit: limit.toString() }),
    })

    const slugUrl = getUrl(category)
    const url = `${slugUrl}?${queryParams}`

    return axiosClient.get<MovieCategoryResponse>(url)
  },

  getDetail: (name: string): Promise<MovieDetailResponse> => {
    if (!name) throw new Error('Movie name is required!')

    const url = `${endPoint.detail}/${name}`
    return axiosClient.get<MovieDetailResponse>(url)
  },

  getMoviesSearch: ({
    keyword,
    page,
    limit,
  }: GetMovieSearchParams): Promise<MovieCategoryResponse> => {
    if (!keyword) throw new Error('Search keyword is required!')

    const queryParams = new URLSearchParams({
      ...(keyword && { keyword }),
      ...(page && { page: page.toString() }),
      ...(limit && { limit: limit.toString() }),
    })

    const url = `${endPoint.search}?${queryParams}`
    return axiosClient.get<MovieCategoryResponse>(url)
  },

  // Thể loại
  getCategories: (): Promise<CategoryItem[]> => {
    return axiosClient.get<CategoryItem[]>('/the-loai')
  },

  // Quốc gia
  getCountries: (): Promise<CountryItem[]> => {
    return axiosClient.get<CountryItem[]>('/quoc-gia')
  },

  // ==================== API Nguonc ===============================
  getMovieInfo: async (slug: string): Promise<MovieDetailResponse> => {
    if (!slug) throw new Error('Movie slug is required!')

    const url = `${nguoncDomain}/api/film/${slug}`
    const { data } = await axios.get<MovieDetailResponse>(url)
    return data
  },
}

export default movieApi
