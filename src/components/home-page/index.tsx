/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { NewMovieItem } from '@/models/new-movie'
import { useEffect, useState } from 'react'
import Banner from '../banner'
import { useLoading } from '../loading-provider'
import CategoryMovie from './category-movie'
import NewUpdateMovie from './new-movie'

export default function MovieHomePage() {
  const [data, setData] = useState<NewMovieItem[]>([])
  const loader = useLoading()

  const getNewMovies = async (page?: string | number) => {
    loader.show()
    try {
      const res = await movieApi.getNewMovies({ page })
      if (isSuccessResponse(res)) {
        setData(res.items)
      } else {
        console.error('Lỗi tải danh sách phim mới: ', res.msg)
      }
    } catch (error) {
      console.error('Lỗi tải danh sách phim mới: ', error)
    } finally {
      loader.hidden()
    }
  }

  useEffect(() => {
    getNewMovies()
  }, [])

  return (
    <>
      <Banner dataBanner={data} />
      <div className='max-w-screen-xl m-auto px-10 py-20 max-lg:px-[25px] flex gap-9'>
        <div className='w-[839px] flex flex-col gap-20'>
          <CategoryMovie paramCategory='phim-le' />
          <CategoryMovie paramCategory='phim-bo' />
          <CategoryMovie paramCategory='hoat-hinh' />
          <CategoryMovie paramCategory='tv-shows' />
        </div>
        <NewUpdateMovie data={data} />
      </div>
    </>
  )
}
