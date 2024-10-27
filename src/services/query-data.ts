'use client'

import { dataNamPhatHanh } from '@/data/category'
import isSuccessResponse from '@/helpers/check-response'
import { showToast } from '@/helpers/toast'
import useFetchData from '@/hooks/useFetch'
import { ICategory } from '@/models/interfaces/category'
import { ICommentItem } from '@/models/interfaces/comment'
import { DetailResponse } from '@/models/interfaces/detail'
import { MovieCategoryItem, MovieCategoryResponse } from '@/models/interfaces/list-movie'
import { NewMovieResponse } from '@/models/interfaces/new-movie'
import { QueryKey, QueryObserverResult, UseQueryOptions } from '@tanstack/react-query'
import commentApi from './api-client/comments'
import movieApi from './api-client/movies'

type QueryOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  'queryKey' | 'queryFn'
>

const fetchData = async (apiMethod: Promise<any>) => {
  try {
    const res = await apiMethod
    if (!isSuccessResponse(res)) {
      showToast({
        variant: 'error',
        title: 'Something went wrong.',
        description: `Internal Server Error. ${res.message}`,
      })
      return
    }
    return res.data || res
  } catch (error: any) {
    showToast({
      variant: 'error',
      title: 'Something went wrong.',
      description: `There was a problem with your request. ${error.message}`,
    })
  }
}

const itemsToShow = 36 // Items per page

export const useBanners = ({
  category,
  options,
}: {
  category: string
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategoryItem> =>
  useFetchData({
    queryKey: ['banners', { category }],
    queryFn: () => fetchData(movieApi.getListByCate({ category, limit: itemsToShow })),
    ...options,
  })

export const useNewMovies = ({
  page,
  options,
}: {
  page?: string | number
  options?: QueryOptions<any>
}): QueryObserverResult<NewMovieResponse> =>
  useFetchData({
    queryKey: ['newMovies'],
    queryFn: () => fetchData(movieApi.getNewMovies({ page })),
    ...options,
  })

export const useMoviesByCate = ({
  category,
  page,
  options,
}: {
  category: string
  page?: string | number
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategoryItem> => {
  return useFetchData({
    queryKey: ['movies', { category }],
    queryFn: () =>
      fetchData(
        movieApi.getListByCate({
          category,
          page,
          limit: itemsToShow,
        }),
      ),
    enabled: !!category,
    ...options,
  })
}

export const useMoviesSearch = ({
  keyword,
  page,
  options,
}: {
  keyword: string
  page?: string | number
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategoryResponse['data']> =>
  useFetchData({
    queryKey: ['search', { keyword }],
    queryFn: () => fetchData(movieApi.getMoviesSearch({ keyword, page, limit: itemsToShow })),
    enabled: !!keyword,
    ...options,
  })

export const useMovieInfo = (
  slug: string,
  options?: QueryOptions<any>,
): QueryObserverResult<DetailResponse> =>
  useFetchData({
    queryKey: ['detail', { slug }],
    queryFn: () => fetchData(movieApi.getDetail(slug)),
    enabled: !!slug,
    ...options,
  })

// export const useVideoPlayer = ({
//   slug,
//   options,
// }: {
//   slug: string
//   options?: QueryOptions<any>
// }): QueryObserverResult<DetailResponse['episodes']> =>
//   useFetchData({
//     queryKey: ['video'],
//     queryFn: () => fetchData(movieApi.getMovieInfo(slug)),
//     enabled: !!slug,
//     ...options,
//   })

export const useComments = (options?: QueryOptions<any>): QueryObserverResult<ICommentItem[]> =>
  useFetchData({
    queryKey: ['comments'],
    queryFn: () => fetchData(commentApi.getAll()),
    ...options,
  })

export const useCategories = (options?: QueryOptions<any>): QueryObserverResult<ICategory[]> =>
  useFetchData({
    queryKey: ['categories'],
    queryFn: () => fetchData(movieApi.getCategories()),
    ...options,
  })

export const useCountries = (options?: QueryOptions<any>): QueryObserverResult<ICategory[]> =>
  useFetchData({
    queryKey: ['countries'],
    queryFn: () => fetchData(movieApi.getCountries()),
    ...options,
  })
