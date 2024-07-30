'use client'

import cleanString from '@/helpers/cleanString'
import { DetailResponse } from '@/models/detail'
import { Video } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import DialogCustom from '../common/dialog'
import { Button } from '../ui/button'
import { useMediaQuery } from 'react-responsive'

interface MovieInfoProps {
  detail: DetailResponse['movie']
}

export default function MovieInfo(props: MovieInfoProps) {
  const { detail } = props
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
      ...(detail.episode_current?.toLowerCase() !== 'full'
        ? [{ label: 'Trạng thái', value: detail.episode_current }]
        : []),
      { label: 'Phụ đề', value: detail.lang },
      { label: 'Thể loại', value: categories },
      { label: 'Quốc gia', value: countries },
      { label: 'Diễn viên', value: actors },
      { label: 'Thời lượng', value: detail.time },
      { label: 'Năm phát hành', value: detail.year },
    ],
    [detail, categories, countries, actors],
  )

  // ----------------- Render UI -----------------------------
  return (
    <div className='flex max-md:flex-col gap-[30px]'>
      <div className='relative max-w-[300px] h-[440px] bg-gray-50 bg-opacity-10 rounded-md m-auto overflow-hidden'>
        <Image
          src={errorImage ? detail.thumb_url : detail.poster_url}
          width={300}
          height={440}
          alt={detail.name}
          priority
          onError={() => setErrorImage(true)}
          className='w-full h-full object-cover rounded-md'
        />
        <div className='absolute h-[56px] flex items-center justify-around gap-2 bottom-0 left-0 w-full bg-black bg-opacity-85'>
          <Button
            className='text-lg uppercase hover:bg-transparent bg-transparent group hover:text-primary-color'
            onClick={() => setOpenDialogTrailer(true)}
          >
            <Video
              size={24}
              strokeWidth={1}
              className='mr-2 text-primary-foreground group-hover:text-primary-color'
              fill='currentColor'
            />
            Trailer
          </Button>
        </div>
      </div>
      {/* Information */}
      <div className='flex flex-1 flex-col gap-6'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-primary-color'>{detail.name}</h1>
          <h2 className='opacity-70 font-medium text-lg'>{detail.origin_name}</h2>
        </div>
        <p className='md:max-h-[130px] max-sm:max-h-[200px] overflow-auto text-base'>{content}</p>
        <div className='flex flex-col gap-2'>
          {detail.episode_total > '1' && (
            <div className='text-sm capitalize flex gap-6'>
              <span className='opacity-70 min-w-[130px]'>Số tập:</span>
              <span className='flex-1'>{detail.episode_total} tập</span>
            </div>
          )}
          {details.map(
            (item) =>
              item.value && (
                <div
                  key={item.label}
                  className='text-sm capitalize flex gap-6'
                >
                  <span className='opacity-70 min-w-[130px]'>{item.label}:</span>
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
    </div>
  )
}
