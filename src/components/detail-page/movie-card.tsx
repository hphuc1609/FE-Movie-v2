'use client'

import { DetailResponse } from '@/models/detail'
import { Video } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import DialogCustom from '../common/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

interface MovieDetailCardProps {
  detail: DetailResponse['movie']
}

export default function MovieDetailCard(props: MovieDetailCardProps) {
  const { detail } = props
  const [openDialogTrailer, setOpenDialogTrailer] = useState(false)

  const categories = useMemo(
    () => detail.category?.map((item) => item.name).join(', '),
    [detail.category],
  )
  const country = useMemo(
    () => detail.country?.map((item) => item.name).join(', '),
    [detail.country],
  )
  const directors = useMemo(
    () =>
      detail.director?.filter((director) => director.toLowerCase() !== 'đang cập nhật').join(', '),
    [detail.director],
  )
  const actors = useMemo(() => {
    return detail.actor
      ?.filter((item) => item.toLowerCase() !== 'đang cập nhật')
      .map((actor) => actor.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, '').replace(/\s{2,}/g, ' ')) // Bỏ các dấu trong chuỗi và số
      .join(', ')
  }, [detail.actor])

  const details = [
    { label: 'Phụ đề', value: detail.lang },
    { label: 'Thể loại', value: categories },
    { label: 'Quốc gia', value: country },
    { label: 'Diễn viên', value: actors },
    { label: 'Đạo diễn', value: directors },
    { label: 'Thời lượng', value: detail.time },
    { label: 'Năm phát hành', value: detail.year },
  ]

  return (
    <div className='flex gap-[30px]'>
      <div className='relative w-[300px] h-[440px] rounded-md overflow-hidden'>
        <Image
          src={detail.poster_url || '/no-image.png'}
          width={300}
          height={440}
          alt={detail.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute h-[56px] flex items-center justify-around gap-2 bottom-0 left-0 w-full bg-black bg-opacity-80'>
          <Button
            className='capitalize text-lg font-light hover:bg-transparent bg-transparent group hover:text-primary-color'
            onClick={() => setOpenDialogTrailer(true)}
          >
            <Video
              size={15}
              strokeWidth={1}
              className='mr-2 text-primary-foreground group-hover:text-primary-color'
              fill='currentColor'
            />
            Trailer
          </Button>
          <Separator
            orientation='vertical'
            className='w-[1px] h-5 opacity-50'
          />
          <Button className='capitalize text-lg font-light hover:bg-transparent bg-transparent hover:text-primary-color'>
            Xem Phim
          </Button>
        </div>
      </div>
      {/* Information */}
      <div className='flex flex-1 flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-3xl font-semibold text-primary-color'>{detail.name}</h3>
          <span className='opacity-70 font-medium text-lg'>
            {detail.origin_name} {detail.year && `(${detail.year})`}
          </span>
        </div>
        <p className='line-clamp-4'>{detail.content}</p>
        <div className='flex flex-col gap-2'>
          {detail.episode_total > '1' && (
            <div className='capitalize flex gap-6'>
              <span className='opacity-70 min-w-[130px]'>Số tập:</span>
              <span className='flex-1'>{detail.episode_total} tập</span>
            </div>
          )}
          {details.map(
            (item) =>
              item.value && (
                <div
                  key={item.label}
                  className='capitalize flex gap-6'
                >
                  <span className='opacity-70 min-w-[130px]'>{item.label}:</span>
                  <span className='flex-1 line-clamp-2'>{item.value}</span>
                </div>
              ),
          )}
        </div>
      </div>

      {/* Modal Trailer */}
      <DialogCustom
        open={openDialogTrailer}
        setOpen={setOpenDialogTrailer}
        title={`Trailer: ${detail.name}`}
        content={
          <iframe
            className='w-full'
            height='315'
            src={`https://www.youtube.com/embed/${detail.trailer_url?.split('v=')[1]}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Trailer'
          ></iframe>
        }
      />
    </div>
  )
}
