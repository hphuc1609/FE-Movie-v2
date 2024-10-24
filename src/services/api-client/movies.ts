import { endPoint } from '@/constants/end-point'
import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import axiosClient from '@/lib/axios-client'
import { ICategory } from '@/models/interfaces/category'
import { DetailResponse } from '@/models/interfaces/detail'
import { MovieCategoryResponse } from '@/models/interfaces/list-movie'
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

    const slugs = {
      danhSach: ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows'],
      theloai: dataTheLoai.map((item) => item.slug),
      namPhatHanh: dataNamPhatHanh.map((item) => item.slug),
    }

    const getSlugUrl = (category: string) => {
      if (slugs.danhSach.includes(category)) return `${endPoint.list}/${category}`
      if (slugs.theloai.includes(category)) return `${endPoint.category}/${category}`
      if (slugs.namPhatHanh.includes(category))
        return `${endPoint.year}/${category.replace('nam-', '')}`
      return `${endPoint.country}/${category}`
    }

    const queryParams = new URLSearchParams({
      ...(page && { page: page.toString() }),
      ...(limit && { limit: limit.toString() }),
    })

    const slugUrl = getSlugUrl(category)
    const url = `${slugUrl}?${queryParams}`

    return axiosClient.get<MovieCategoryResponse>(url)
  },

  getDetail: (name: string): Promise<DetailResponse> => {
    if (!name) throw new Error('Movie name is required!')

    const url = `${endPoint.detail}/${name}`
    return axiosClient.get<DetailResponse>(url)
  },

  getMoviesSearch: ({
    keyword,
    page,
    limit,
  }: GetMovieSearchParams): Promise<MovieCategoryResponse> => {
    if (!keyword) throw new Error('Search keyword is required!')

    const url = `${endPoint.search}?keyword=${keyword}&page=${page}&limit=${limit || 20}`
    return axiosClient.get<MovieCategoryResponse>(url)
  },

  // Thể loại
  getCategories: (): Promise<ICategory[]> => {
    return axiosClient.get<ICategory[]>('/the-loai')
  },

  // Quốc gia
  getCountries: (): Promise<ICategory[]> => {
    return axiosClient.get<ICategory[]>('/quoc-gia')
  },

  // ==================== API Nguonc ===============================
  getMovieInfo: async (slug: string): Promise<DetailResponse> => {
    if (!slug) throw new Error('Movie slug is required!')

    const url = `${nguoncDomain}/api/film/${slug}`
    const { data } = await axios.get<DetailResponse>(url)
    return data
  },
}

export default movieApi
