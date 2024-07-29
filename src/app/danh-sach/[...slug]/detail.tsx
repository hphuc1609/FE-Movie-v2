/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import ErrorMessage from '@/components/common/error-message'
import TablePagination from '@/components/common/table-pagination'
import { useLoading } from '@/components/loading-provider'
import isSuccessResponse from '@/helpers/check-response'
import useFetchData from '@/hooks/use-fetch'
import { MovieCategoryItem } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Detail() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = useLoading()

  // Get params
  const categoryParam = pathname.split('/').pop() || ''
  const keyword = searchParams.get('keyword') || ''
  const currentPage = searchParams.get('page') || ''
  const isNotEmpty = (obj: any) => Object.keys(obj).length > 0

  // ------------------ Fetch Data ----------------------------
  const fetchData = async (apiCall: Function, params: any) => {
    loader.show()
    try {
      const res = await apiCall(params)
      if (!isSuccessResponse(res)) return null
      return res.data
    } catch (error: any) {
      console.error('Error fetching data: ', error.message)
      return null
    } finally {
      loader.hidden()
    }
  }

  // Fetch functions
  const fetchMoviesByCate = (category: string, page?: string | number, limit?: string | number) =>
    fetchData(movieApi.getList, { category, page, limit })

  const fetchNewMovies = (page: string) => fetchData(movieApi.getNewMovies, { page })

  const fetchMoviesSearch = (keyword: string, limit?: string | number) =>
    fetchData(movieApi.getMoviesSearch, { keyword, limit })

  const fetchAllMovies = async (page: string, limit: number) => {
    loader.show()
    try {
      const phimLeData = await movieApi.getList({ category: 'phim-le', page, limit })
      const phimBoData = await movieApi.getList({ category: 'phim-bo', page, limit })
      if (!isSuccessResponse(phimLeData) || !isSuccessResponse(phimBoData)) return null

      const concatData = phimLeData.data.items.concat(phimBoData.data.items)
      return { ...phimLeData.data, items: concatData }
    } catch (error: any) {
      console.error('Lỗi tải danh sách phim: ', error.message)
      return null
    } finally {
      loader.hidden()
    }
  }

  // ------------------ Query Data ----------------------------
  const categoryPaths = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']
  // Get data all movies
  const queryAllMovies = useFetchData({
    queryKey: ['all-movies'],
    queryFn: () => fetchAllMovies(currentPage, 64),
    enabled: !!currentPage && !categoryPaths.includes(categoryParam),
  })
  const allMovies = (queryAllMovies.data || {}) as MovieCategoryItem

  // Get data by category
  const queryMoviesByCate = useFetchData({
    queryKey: ['movies', categoryParam],
    queryFn: () => fetchMoviesByCate(categoryParam, currentPage, 20),
    enabled: !!currentPage && categoryPaths.includes(categoryParam),
  })
  const moviesByCate = (queryMoviesByCate.data || {}) as MovieCategoryItem

  // Get data movie by search
  const queryMoviesSearch = useFetchData({
    queryKey: ['movies-search', keyword],
    queryFn: () => fetchMoviesSearch(keyword),
    enabled: !!keyword,
  })
  const moviesSearch = (queryMoviesSearch.data || {}) as MovieCategoryItem

  // Get data new movies
  const queryNewMovies = useFetchData({
    queryKey: ['new-movies'],
    queryFn: () => fetchNewMovies(currentPage),
    enabled: !!currentPage && categoryParam === 'phim-moi',
  })
  const newMovies = (queryNewMovies.data || {}) as NewMovieResponse

  // Filtered data by category
  const filteredDataByCate = useMemo(() => {
    const filterdData = allMovies.items?.filter((movie) =>
      movie.category.some((cate) => cate.slug === categoryParam),
    )
    return { ...allMovies, items: filterdData }
  }, [allMovies])

  // BreadCrumb custom for phim moi
  const breadCrumbPhimmoi = [
    {
      position: 1,
      name: 'Phim mới',
      slug: '/danh-sach/phim-moi',
      isCurrent: false,
    },
    ...(newMovies.pagination?.currentPage
      ? [
          {
            position: 2,
            name: `Trang ${newMovies.pagination.currentPage}`,
            slug: '',
            isCurrent: true,
          },
        ]
      : []),
  ]

  // ------------------ Effect Data ----------------------------
  // Refetch data by category, new movies, all movies
  useEffect(() => {
    if (!categoryParam) return
    if (categoryParam === 'phim-moi') {
      queryNewMovies.refetch()
      return
    }
    if (categoryPaths.includes(categoryParam)) {
      queryMoviesByCate.refetch()
      return
    }
    queryAllMovies.refetch()
  }, [categoryParam, currentPage])

  // Refetch data search
  useEffect(() => {
    if (!keyword) return
    queryMoviesSearch.refetch()
  }, [keyword])

  // ------------------ Render Data ----------------------------
  const dataTable = () => {
    if (isNotEmpty(newMovies)) return newMovies
    if (isNotEmpty(moviesByCate)) return moviesByCate
    if (isNotEmpty(moviesSearch)) return moviesSearch
    return filteredDataByCate
  }

  const renderTitle = () => {
    if (isNotEmpty(newMovies)) return breadCrumbPhimmoi[0]?.name
    if (isNotEmpty(moviesByCate)) return moviesByCate.breadCrumb[0]?.name
    if (isNotEmpty(moviesSearch))
      return `Phim ${moviesSearch.breadCrumb[0]?.name
        .replace(/ - Trang 1/g, '')
        .split(':')
        .pop()}`

    // Render title from category
    const categoryName = filteredDataByCate.items?.map((item) =>
      item.category.find((item) => item.slug === categoryParam),
    )[0]?.name
    if (categoryName) return `Phim ${categoryName}`
  }

  const renderBreadCrumb = () => {
    if (isNotEmpty(newMovies)) return breadCrumbPhimmoi
    if (isNotEmpty(moviesByCate)) return moviesByCate.breadCrumb
    if (isNotEmpty(moviesSearch)) return moviesSearch.breadCrumb

    const categoryName = filteredDataByCate.items?.map((item) =>
      item.category.find((item) => item.slug === categoryParam),
    )[0]?.name
    if (categoryName) return `Phim ${categoryName}`
    return '...'
  }

  // ------------------ Render UI ----------------------------
  const isError = queryAllMovies.isError || queryMoviesByCate.isError || queryMoviesSearch.isError
  const isData = allMovies || moviesByCate || moviesSearch || newMovies || filteredDataByCate
  if (isError || !isData) return <ErrorMessage />

  return (
    <div className='max-w-screen-xl min-h-screen m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-6'>
      <BreadcrumbCustom breadCrumb={renderBreadCrumb()} />
      <div className='flex flex-col gap-9'>
        {dataTable().items?.length > 0 && (
          <h2 className='text-3xl font-semibold text-primary-color capitalize'>{renderTitle()}</h2>
        )}
        <TablePagination
          keyword={keyword}
          category={categoryParam}
          data={dataTable() as any}
        />
      </div>
    </div>
  )
}
