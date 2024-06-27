/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import { useLoading } from '@/components/loading-provider'
import TablePagination from '@/components/common/table-pagination'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Detail() {
  const pathname = usePathname()
  const categoryPathname = pathname.split('/').pop() as string
  const loader = useLoading()
  const [dataMovie, setDataMovie] = useState({} as MovieCategoryItem)

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

  useEffect(() => {
    if (!categoryPathname) {
      return
    }
    getMoviesByCate(categoryPathname)
  }, [categoryPathname])

  return (
    <div className='px-20 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb={dataMovie.breadCrumb} />
      <TablePagination
        category={categoryPathname}
        data={dataMovie}
      />
    </div>
  )
}
