import isSuccessResponse from '@/helpers/check-response'
import { showToast } from '@/helpers/toast'
import useQueryData from '@/hooks/useQueryData'
import { ICommentItem } from '@/models/interfaces/comment'
import { MovieDetailResponse } from '@/models/interfaces/detail'
import { IFavourite } from '@/models/interfaces/favourite'
import {
  MovieCategory,
  MovieCategoryItem,
  MovieCategoryResponse,
  MovieCountry,
} from '@/models/interfaces/list'
import { NewMovieResponse } from '@/models/interfaces/new-movie'
import { QueryKey, QueryObserverResult, UseQueryOptions } from '@tanstack/react-query'
import commentApi from './api-client/comments'
import favouriteApi from './api-client/favourite'
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
  useQueryData({
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
  useQueryData({
    queryKey: ['newMovies'],
    queryFn: () => fetchData(movieApi.getNewMovies({ page })),
    ...options,
  })

export const useMovieType = ({
  category,
  page,
  options,
}: {
  category: string
  page?: string | number
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategoryItem> => {
  return useQueryData({
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

export const useSearch = ({
  keyword,
  page,
  options,
}: {
  keyword: string
  page?: string | number
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategoryResponse['data']> =>
  useQueryData({
    queryKey: ['search', { keyword }],
    queryFn: () => fetchData(movieApi.getMoviesSearch({ keyword, page, limit: itemsToShow })),
    enabled: !!keyword,
    ...options,
  })

export const useDetail = ({
  slug,
  options,
}: {
  slug: string
  options?: QueryOptions<any>
}): QueryObserverResult<MovieDetailResponse> =>
  useQueryData({
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
// }): QueryObserverResult<MovieDetailResponse['episodes']> =>
//   useQueryData({
//     queryKey: ['video'],
//     queryFn: () => fetchData(movieApi.getMovieInfo(slug)),
//     enabled: !!slug,
//     ...options,
//   })

export const useComments = ({
  options,
}: {
  options?: QueryOptions<any>
}): QueryObserverResult<ICommentItem[]> =>
  useQueryData({
    queryKey: ['comments'],
    queryFn: () => fetchData(commentApi.getAll()),
    ...options,
  })

export const useCategories = ({
  options,
}: {
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCountry[]> =>
  useQueryData({
    queryKey: ['categories'],
    queryFn: () => fetchData(movieApi.getCategories()),
    ...options,
  })

export const useCountries = ({
  options,
}: {
  options?: QueryOptions<any>
}): QueryObserverResult<MovieCategory[]> =>
  useQueryData({
    queryKey: ['countries'],
    queryFn: () => fetchData(movieApi.getCountries()),
    ...options,
  })

export const useFavourites = ({
  options,
}: {
  options?: QueryOptions<any>
}): QueryObserverResult<IFavourite['data']> =>
  useQueryData({
    queryKey: ['favourites'],
    queryFn: () => fetchData(favouriteApi.getAll()),
    ...options,
  })
