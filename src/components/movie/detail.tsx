'use client'

import { cleanString } from '@/helpers/cleanString'
import { cn } from '@/lib/utils'
import { DetailResponse } from '@/models/interfaces/detail'
import { Play, Video } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const [errorBanner, setErrorBanner] = useState(false)

  const router = useRouter()
  const params = useSearchParams()
  const episodeParam = params.get('episode') as string

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

  const handleWatchMovie = () => {
    const lang = detail.lang.toLowerCase().includes('vietsub')
      ? 'vietsub'
      : detail.lang.toLowerCase()
    const episode = detail.episode_current.toLowerCase()
    const slug = detail.slug

    if (detail.episode_current.toLowerCase() === 'full') {
      router.push(`/phim/${slug}?lang=${lang}&episode=${episode}`)
    } else {
      router.push(`/phim/${slug}?lang=${lang}&episode=tap-01`)
    }
  }

  // ----------------- Render UI -----------------------------
  return (
    <section
      id='info-movie'
      className='flex max-md:flex-col gap-[30px] overflow-hidden'
    >
      <div className='absolute top-0 left-0 w-full min-h-[650px] overflow-hidden -z-10'>
        <Image
          fill
          src={errorBanner ? detail.poster_url : detail.thumb_url}
          alt={detail.name}
          priority
          onError={() => setErrorBanner(true)}
          className='w-full object-cover'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/80' />
        <div className='absolute -bottom-3 max-sm:bottom-0 left-0 w-full h-16 max-sm:h-10 bg-gradient-to-t from-[#1a1a1a] max-sm:from-[#1a1a1a] via-[#0d0d0d] to-transparent' />
      </div>

      <div className='relative w-[300px] h-[440px] bg-skeleton mx-auto rounded-md overflow-hidden'>
        <Image
          src={errorImage ? detail.thumb_url : detail.poster_url}
          width={300}
          height={440}
          alt={detail.name}
          priority
          onError={() => setErrorImage(true)}
          className='w-full h-full object-cover'
        />
        <div className='absolute bottom-5 w-full flex justify-evenly'>
          <Button
            className={cn(
              'h-11 rounded-full capitalize text-sm font-semibold bg-black/90 border-2 border-white hover:border-yellow-500 hover:bg-primary-color hover:text-black hover:fill-inherit',
              {
                'bg-neutral-600 border-neutral-600 pointer-events-none text-neutral-400 hover:border-neutral-600 hover:bg-neutral-600 hover:text-neutral-400':
                  !detail.trailer_url,
                hidden: episodeParam,
              },
            )}
            onClick={() => setOpenDialogTrailer(true)}
          >
            <Video
              size={16}
              strokeWidth={1}
              className='mr-2'
              fill='currentColor'
            />
            Trailer
          </Button>
          <Button
            className={cn(
              'h-11 rounded-full capitalize text-sm font-semibold bg-black/90 border-2 border-white hover:border-yellow-500 hover:bg-primary-color hover:text-black hover:fill-inherit',
              {
                'bg-neutral-600 border-neutral-600 pointer-events-none text-neutral-400 hover:border-neutral-600 hover:bg-neutral-600 hover:text-neutral-400':
                  detail.episode_current?.toLowerCase() === 'trailer',
                hidden: episodeParam,
              },
            )}
            onClick={handleWatchMovie}
          >
            <Play
              size={16}
              strokeWidth={1}
              className='mr-2'
              fill='currentColor'
            />
            Xem phim
          </Button>
        </div>
      </div>

      {/* Information */}
      <div className='flex flex-1 flex-col gap-6'>
        <div className='flex flex-col gap-1 max-sm:gap-2'>
          <h1 className='text-3xl font-semibold text-primary-color'>{detail.name}</h1>
          <h2 className='opacity-70 font-medium text-lg'>{detail.origin_name}</h2>
          <Ratings
            rating={detail.tmdb.vote_average}
            ratingCount={detail.tmdb.vote_count}
            variant='yellow'
            totalStars={10}
          />
        </div>
        <p className='md:max-h-[130px] max-sm:max-h-[200px] overflow-auto text-sm'>{content}</p>
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
                    className={`flex-1 line-clamp-2 ${item.label.includes('Phụ đề') && 'text-red-600 font-semibold'}`}
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
        DialogContentProps={{ className: 'max-w-[70%]' }}
      />
    </section>
  )
}
