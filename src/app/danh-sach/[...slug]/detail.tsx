/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/common/table-pagination'
import { useLoading } from '@/components/loading-provider'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { NewMovieResponse } from '@/models/new-movie'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Detail() {
  const pathname = usePathname()
  const categoryPathname = pathname.split('/').pop() as string
  const loader = useLoading()
  const [dataMovie, setDataMovie] = useState({} as MovieCategoryItem)
  const [dataNewMovie, setDataNewMovie] = useState({} as NewMovieResponse)

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

  const getMoviesByCate = async (category: string) => {
    loader.show()
    try {
      const newData = await movieApi.getListCate({ category })
      if (isSuccessResponse(newData)) {
        setDataMovie(newData.data)
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

  // Get data by category
  useEffect(() => {
    if (!categoryPathname) {
      return
    }
    if (categoryPathname === 'phim-moi') {
      getNewMovies()
      return
    }
    getMoviesByCate(categoryPathname)
  }, [categoryPathname])

  const dataTable = dataMovie.items ? dataMovie : dataNewMovie

  return (
    <div className='px-20 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb={dataMovie.breadCrumb || breadCrumbCustom} />
      <TablePagination
        category={categoryPathname}
        data={dataTable}
      />
    </div>
  )
}
