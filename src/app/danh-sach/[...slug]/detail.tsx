/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/common/table-pagination'
import Loader from '@/components/loader'
import { useLoading } from '@/components/loading-provider'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function Detail() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const [dataMovieCate, setDataMovieCate] = useState({} as MovieCategoryItem)
  const [dataNewMovie, setDataNewMovie] = useState({} as NewMovieResponse)
  const [dataSearch, setDataSearch] = useState({} as MovieCategoryItem)
  const [allMovies, setAllMovies] = useState({} as MovieCategoryItem)

  const category = useMemo(() => pathname.split('/').pop() as string, [pathname])
  const keyword = useMemo(() => searchParams.get('keyword') as string, [searchParams])
  const currentPage = useMemo(() => searchParams.get('page') as string, [searchParams])
  const isNotEmpty = (obj: any) => Object.keys(obj).length > 0

  const breadCrumbPhimmoi = [
    {
      position: 1,
      name: 'Phim mới',
      slug: '/danh-sach/phim-moi',
      isCurrent: false,
    },
    ...(dataNewMovie.pagination?.currentPage
      ? [
          {
            position: 2,
            name: `Trang ${dataNewMovie.pagination.currentPage}`,
            slug: '',
            isCurrent: true,
          },
        ]
      : []),
  ]

  // Filterd data category
  const filteredDataByCate = useMemo(() => {
    const filterdData = allMovies.items?.filter((movie) =>
      movie.category.some((cate) => cate.slug === category),
    )
    return { ...allMovies, items: filterdData }
  }, [allMovies])

  const fetchMoviesByCate = async (
    category: string,
    page?: string | number,
    limit?: string | number,
  ) => {
    loader.show()
    try {
      const res = await movieApi.getList({ category, page, limit })
      if (isSuccessResponse(res)) {
        setDataMovieCate(res.data)
      } else {
        console.error('Failed to fetch data from server: ', res.msg)
      }
    } catch (error: any) {
      console.error('Lỗi tải danh sách phim: ', error.message)
    } finally {
      loader.hidden()
    }
  }

  const fetchAllMovies = async (page: string, limit: number) => {
    loader.show()
    try {
      const phimLeData = await movieApi.getList({ category: 'phim-le', page, limit })
      const phimBoData = await movieApi.getList({ category: 'phim-bo', page, limit })

      if (isSuccessResponse(phimLeData) && isSuccessResponse(phimBoData)) {
        const concatData = phimLeData.data.items.concat(phimBoData.data.items)
        setAllMovies({ ...phimLeData.data, items: concatData })
      } else {
        console.error('Failed to fetch data from server: ', phimLeData.msg, phimBoData.msg)
      }
    } catch (error: any) {
      console.error('Lỗi tải danh sách phim: ', error.message)
    } finally {
      loader.hidden()
    }
  }

  const fetchNewMovies = async (page: string) => {
    loader.show()
    try {
      const res = await movieApi.getNewMovies({ page })
      if (isSuccessResponse(res)) {
        setDataNewMovie(res)
      } else {
        console.error('Failed to fetch data from server: ', res.msg)
      }
    } catch (error: any) {
      console.error('Lỗi tải danh sách phim mới: ', error.message)
    } finally {
      loader.hidden()
    }
  }

  const fetchMoviesSearch = async (keyword: string, limit?: string | number) => {
    loader.show()
    try {
      const res = await movieApi.getMoviesSearch({ keyword, limit })
      if (isSuccessResponse(res)) {
        setDataSearch(res.data)
      } else {
        console.error('Failed to fetch data from server: ', res.msg)
      }
    } catch (error: any) {
      console.error('Lỗi tải danh sách tìm kiếm: ', error.message)
    } finally {
      loader.hidden()
    }
  }

  // Get data by category
  useEffect(() => {
    if (!category) return
    if (category === 'phim-moi') {
      fetchNewMovies(currentPage)
      return
    }
    if (!['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows'].includes(category)) {
      fetchAllMovies(currentPage, 64)
      return
    }
    fetchMoviesByCate(category, currentPage, 20)
  }, [category, currentPage])

  // Get data movie by search
  useEffect(() => {
    if (!keyword) {
      return
    }
    fetchMoviesSearch(keyword)
  }, [keyword])

  const dataTable: any = () => {
    if (isNotEmpty(dataNewMovie)) return dataNewMovie
    if (isNotEmpty(dataMovieCate)) return dataMovieCate
    if (isNotEmpty(dataSearch)) return dataSearch
    return filteredDataByCate
  }

  const renderTitle = () => {
    if (isNotEmpty(dataNewMovie)) return breadCrumbPhimmoi[0]?.name
    if (isNotEmpty(dataMovieCate)) return dataMovieCate.breadCrumb[0]?.name
    if (isNotEmpty(dataSearch))
      return `Phim ${dataSearch.breadCrumb[0]?.name
        .replace(/ - Trang 1/g, '')
        .split(':')
        .pop()}`

    // Render title from category
    const categoryName = filteredDataByCate.items?.map((item) =>
      item.category.find((item) => item.slug === category),
    )[0]?.name
    if (categoryName) return `Phim ${categoryName}`
  }

  const renderBreadCrumb = () => {
    if (isNotEmpty(dataNewMovie)) return breadCrumbPhimmoi
    if (isNotEmpty(dataMovieCate)) return dataMovieCate.breadCrumb
    if (isNotEmpty(dataSearch)) return dataSearch.breadCrumb

    const categoryName = filteredDataByCate.items?.map((item) =>
      item.category.find((item) => item.slug === category),
    )[0]?.name
    if (categoryName) return `Phim ${categoryName}`
    return '...'
  }

  return (
    <>
      {loader.isLoading && <Loader />}
      <div className='max-w-screen-xl min-h-screen m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-6'>
        <BreadcrumbCustom breadCrumb={renderBreadCrumb()} />
        <div className='flex flex-col gap-9'>
          {dataTable().items?.length > 0 && (
            <h2 className='text-3xl font-semibold text-primary-color capitalize'>
              <span className='text-primary-foreground'>Danh sách</span> {renderTitle()}
            </h2>
          )}
          <TablePagination
            category={category}
            data={dataTable()}
            keyword={keyword}
          />
        </div>
      </div>
    </>
  )
}
