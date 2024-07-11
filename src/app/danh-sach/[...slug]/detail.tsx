/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/common/table-pagination'
import Loader from '@/components/loader'
import { useLoading } from '@/components/loading-provider'
import menuLinks from '@/constants/menu'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'

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

  // Data filter by category
  const dataFilteredByCate = useMemo(() => {
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
      const newData = await movieApi.getList({ category, page, limit })
      if (isSuccessResponse(newData)) {
        setDataMovieCate(newData.data)
      } else {
        console.error('Lỗi tải danh sách phim: ', newData.message)
      }
    } catch (error) {
      console.error('Lỗi tải danh sách phim: ', error)
    } finally {
      loader.hidden()
    }
  }

  const fetchAllMovies = async (page?: string | number, limit?: string | number) => {
    loader.show()
    try {
      const phimLeData = await movieApi.getList({ category: 'phim-le', page, limit })
      const phimBoData = await movieApi.getList({ category: 'phim-bo', page, limit })

      if (isSuccessResponse(phimLeData) && isSuccessResponse(phimBoData)) {
        const concatData = phimLeData.data.items.concat(phimBoData.data.items)
        setAllMovies({ ...phimLeData.data, items: concatData })
      }
    } catch (error) {
      console.error('Lỗi tải danh sách phim: ', error)
    } finally {
      loader.hidden()
    }
  }

  const fetchNewMovies = async (page?: string | number) => {
    loader.show()
    try {
      const res = await movieApi.getNewMovies({ page })
      if (isSuccessResponse(res)) {
        setDataNewMovie(res)
      } else {
        console.error('Lỗi tải danh sách phim mới: ', res.msg)
      }
    } catch (error) {
      console.error('Lỗi tải danh sách phim mới: ', error)
    } finally {
      loader.hidden()
    }
  }

  const fetchMoviesSearch = async (keyword: string, limit?: string | number) => {
    loader.show()
    try {
      const newData = await movieApi.getMoviesSearch({ keyword, limit })
      if (isSuccessResponse(newData)) {
        setDataSearch(newData.data)
      } else {
        console.error('Lỗi tải danh sách tìm kiếm: ', newData.message)
      }
    } catch (error) {
      console.error('Lỗi tải danh sách tìm kiếm: ', error)
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
      fetchAllMovies(currentPage, 50)
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

  const dataTable: any = useCallback(() => {
    if (Object.keys(dataNewMovie).length > 0) return dataNewMovie
    if (Object.keys(dataMovieCate).length > 0) return dataMovieCate
    if (Object.keys(dataSearch).length > 0) return dataSearch
    return dataFilteredByCate
  }, [dataNewMovie, dataMovieCate, dataSearch, dataFilteredByCate])

  const renderTitle = () => {
    if (isNotEmpty(dataNewMovie)) return breadCrumbPhimmoi[0]?.name
    if (isNotEmpty(dataMovieCate)) return dataMovieCate.breadCrumb[0]?.name
    if (isNotEmpty(dataSearch)) return dataSearch.breadCrumb[0]?.name.replace(/ - Trang 1/g, '')

    const menuItem = menuLinks
      .find((item) => item.subMenu)
      ?.subMenu?.find((item) => item.href.split('/').pop() === category)

    if (menuItem) return `Phim ${menuItem?.name}`
    return ''
  }

  const renderBreadCrumb = useCallback(() => {
    if (Object.keys(dataNewMovie).length > 0) return breadCrumbPhimmoi
    if (Object.keys(dataMovieCate).length > 0) return dataMovieCate.breadCrumb
    if (Object.keys(dataSearch).length > 0) return dataSearch.breadCrumb

    const menuItem = menuLinks
      .find((item) => item.subMenu)
      ?.subMenu?.find((item) => item.href.split('/').pop() === category)

    if (menuItem) return `Phim ${menuItem?.name}`
    return ''
  }, [dataNewMovie, dataMovieCate, dataSearch, breadCrumbPhimmoi, category])

  return (
    <>
      {loader.isLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <BreadcrumbCustom breadCrumb={renderBreadCrumb()} />
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold text-primary-color capitalize'>{renderTitle()}</h2>
          <TablePagination
            category={category}
            data={dataTable()}
            keyword={keyword}
          />
        </div>
      </Suspense>
    </>
  )
}
