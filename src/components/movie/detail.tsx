'use client'

import cleanString from '@/helpers/cleanString'
import { showToast } from '@/helpers/toast'
import { DetailResponse } from '@/models/interfaces/detail'
import { Video } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import DialogCustom from '../common/dialog'
import Ratings from '../common/rating'
import { Button } from '../ui/button'

interface MovieInfoProps {
  detail: DetailResponse['movie']
}

export default function MovieInfo({ detail }: MovieInfoProps) {
  console.log('🚀 ~ MovieInfo ~ detail:', detail)
  const [openDialogTrailer, setOpenDialogTrailer] = useState(false)
  const [errorImage, setErrorImage] = useState(false)

  const mobile = useMediaQuery({ query: '(max-width: 640px)' })

  // ----------------- Get Details -----------------------------
  const categories = useMemo(
    () => detail.category?.map((item) => item.name).join(', '),
    [detail.category],
  )

  const countries = useMemo(
    () => detail.country?.map((item) => item.name).join(', '),
    [detail.country],
  )

  const actors = useMemo(() => {
    return detail.actor
      ?.map((actor) => cleanString(actor))
      .filter((actor) => actor.trim() !== '')
      .join(', ')
  }, [detail.actor])

  const content = cleanString(detail.content)

  const details = useMemo(
    () => [
      ...(Number(detail.episode_total) > 1
        ? [{ label: 'Số tập', value: detail.episode_total + ' tập' }]
        : []),
      { label: 'Trạng thái', value: detail.episode_current },
      { label: 'Phụ đề', value: detail.lang },
      { label: 'Thể loại', value: categories },
      { label: 'Quốc gia', value: countries },
      { label: 'Diễn viên', value: actors },
      { label: 'Thời lượng', value: detail.time },
      { label: 'Năm phát hành', value: detail.year },
    ],
    [detail, categories, countries, actors],
  )

  const handleOpenTrailer = () => {
    if (!detail.trailer_url) {
      showToast({
        variant: 'info',
        title: 'Thông báo',
        description: 'Trailer của phim hiện chưa có sẵn.',
      })
      return
    }

    setOpenDialogTrailer(true)
  }

  // ----------------- Render UI -----------------------------
  return (
    <section
      id='info-movie'
      className='flex max-md:flex-col gap-[30px] overflow-hidden'
    >
      <div className='relative max-w-[300px] h-[440px] bg-gray-50 bg-opacity-10 rounded-md mx-auto overflow-hidden'>
        <Image
          src={errorImage ? detail.thumb_url : detail.poster_url}
          width={300}
          height={440}
          alt={detail.name}
          priority
          onError={() => setErrorImage(true)}
          className='w-full h-full object-cover rounded-md'
        />
        <Button
          className='absolute bottom-0 h-[56px] w-full text-lg uppercase bg-black bg-opacity-90 hover:bg-label-color rounded-none'
          onClick={() => handleOpenTrailer()}
        >
          <Video
            size={24}
            strokeWidth={1}
            className='mr-2 text-primary-foreground'
            fill='currentColor'
          />
          Trailer
        </Button>
      </div>
      {/* Information */}
      <div className='flex flex-1 flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold text-primary-color'>{detail.name}</h1>
          <h2 className='opacity-70 font-medium text-lg'>{detail.origin_name}</h2>
          <Ratings
            rating={detail.tmdb.vote_average}
            ratingCount={detail.tmdb.vote_count}
            variant='yellow'
            totalStars={10}
          />
        </div>
        <p className='md:max-h-[130px] max-sm:max-h-[200px] overflow-auto text-base'>{content}</p>
        <div className='flex flex-col gap-2'>
          {details.map(
            (item) =>
              item.value && (
                <div
                  key={item.label}
                  className='text-sm capitalize flex gap-6'
                >
                  <span className='opacity-70 min-w-[130px] font-semibold'>{item.label}:</span>
                  <span
                    className={`flex-1 line-clamp-2 ${item.label.toLowerCase() === 'phụ đề' && 'text-red-600'}`}
                  >
                    {item.value}
                  </span>
                </div>
              ),
          )}
        </div>
      </div>

      {/* Modal Trailer */}
      <DialogCustom
        open={openDialogTrailer}
        setOpen={setOpenDialogTrailer}
        title={detail.name}
        content={
          <iframe
            className='w-full'
            height={mobile ? '315' : '450'}
            src={`https://www.youtube.com/embed/${detail.trailer_url?.split('v=')[1]}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Trailer'
          ></iframe>
        }
      />
    </section>
  )
}
