/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BreadcrumbCustom from '../common/breadcrumb-custom'
import Reviewbox from '../common/review-box'
import { useLoading } from '../loading-provider'
import MovieDetailCard from './movie-card'

export default function Detail() {
  const { path } = useParams()
  const loader = useLoading()
  const [detail, setDetail] = useState({} as DetailResponse['movie'])
  const [dataEpisode, setDataEpisode] = useState<DetailResponse['episodes']>([])

  const getDetail = async (movieName: string) => {
    loader.show()
    try {
      const res = await movieApi.getDetail({ name: movieName })
      if (isSuccessResponse(res)) {
        setDetail(res.movie)
        setDataEpisode(res.episodes)
      } else {
        console.error('Lỗi tải thông tin phim: ', res.msg)
      }
    } catch (error) {
      console.error('Lỗi tải thông tin phim: ', error)
    } finally {
      loader.hidden()
    }
  }

  useEffect(() => {
    if (!path.length) {
      return
    }
    getDetail(path[0])
  }, [path])

  return (
    <div className='px-20 py-[35px] flex flex-col gap-[60px]'>
      <BreadcrumbCustom movieName={detail.name} />
      <MovieDetailCard detail={detail} />
      <Reviewbox />
    </div>
  )
}
