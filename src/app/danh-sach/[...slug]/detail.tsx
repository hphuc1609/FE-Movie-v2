/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/common/table-pagination'
import { useLoading } from '@/components/loading-provider'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Detail() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const [dataMovieCate, setDataMovieCate] = useState({} as MovieCategoryItem)
  const [dataNewMovie, setDataNewMovie] = useState({} as NewMovieResponse)
  const [dataSearch, setDataSearch] = useState({} as MovieCategoryItem)

  const category = pathname.split('/').pop() as string
  const keyword = searchParams.get('keyword') as string
  const currentPage = searchParams.get('page') as string

  const breadCrumbCustom = [
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

  const getMoviesByCate = async (
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

  const getNewMovies = async (page?: string | number) => {
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

  const getMoviesSearch = async (keyword: string, limit?: string | number) => {
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
    if (!category) {
      return
    }
    if (category === 'phim-moi') {
      getNewMovies(currentPage)
      return
    }
    getMoviesByCate(category, currentPage)
  }, [category, currentPage])

  useEffect(() => {
    if (!keyword) {
      return
    }
    getMoviesSearch(keyword)
  }, [keyword])

  const isNotEmpty = (obj: any) => Object.keys(obj).length > 0
  const dataTable = () => {
    if (isNotEmpty(dataNewMovie)) return dataNewMovie
    if (isNotEmpty(dataMovieCate)) return dataMovieCate
    if (isNotEmpty(dataSearch)) return dataSearch
    return {}
  }

  const dataBreadCrumb = () => {
    if (isNotEmpty(dataNewMovie)) return breadCrumbCustom
    if (isNotEmpty(dataMovieCate)) return dataMovieCate.breadCrumb
    if (isNotEmpty(dataSearch)) return dataSearch.breadCrumb
    return []
  }

  return (
    <>
      <BreadcrumbCustom breadCrumb={dataBreadCrumb()} />
      <h1 className='text-3xl font-bold text-primary-color'>{dataBreadCrumb()[0]?.name}</h1>
      <TablePagination
        category={category}
        data={dataTable() as MovieCategoryItem}
        keyword={keyword}
      />
    </>
  )
}
