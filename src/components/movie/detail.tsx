'use client'

import { cleanString, convertToPathname } from '@/helpers/cleanString'
import { showToast } from '@/helpers/toast'
import { cn } from '@/lib/utils'
import { DetailResponse } from '@/models/interfaces/detail'
import { IFavouriteItem } from '@/models/interfaces/favourite'
import favouriteApi from '@/services/api-client/favourite'
import { useFavourites } from '@/services/query-data'
import { useMutation } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { Heart, Play, Video } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import DialogCustom from '../common/dialog'
import Ratings from '../common/rating'
import { Button } from '../ui/button'
import { useContextGlobal } from '../context-provider'

interface MovieInfoProps {
  detail: DetailResponse['movie']
}

const MovieInfo = ({ detail }: MovieInfoProps) => {
  const [openDialogTrailer, setOpenDialogTrailer] = useState(false)
  const [errorImage, setErrorImage] = useState(false)
  const [errorBanner, setErrorBanner] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [username, setUsername] = useState('')

  const { isLogin } = useContextGlobal()
  const router = useRouter()
  const params = useSearchParams()
  const episodeParam = params.get('episode') as string

  const mobile = useMediaQuery({ maxWidth: 640 })

  const { data: favourites = [] } = useFavourites({ options: { staleTime: 0 } })

  // Check movie in favourite list
  const movieFavour = favourites
    .find((item) => item.username === username)
    ?.favourites.find((favourite) => favourite.movieId === detail._id)

  // Set isFavourite
  useEffect(() => {
    const userInfo = getCookie('userVerify')
    const username = userInfo ? JSON.parse(userInfo).username : null

    setUsername(username)

    if (!username) {
      setIsFavourite(false)
      return
    }

    setIsFavourite(movieFavour !== undefined)
  }, [movieFavour, isLogin])

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
      { label: 'Trạng thái', value: `${detail.quality} ${detail.lang}` },
      { label: 'Thể loại', value: categories },
      { label: 'Quốc gia', value: countries },
      { label: 'Diễn viên', value: actors },
      { label: 'Thời lượng', value: detail.time },
      { label: 'Năm phát hành', value: detail.year },
    ],
    [detail, categories, countries, actors],
  )

  // ----------------- Handle Actions -----------------------------
  const handleWatchMovie = () => {
    const lang = detail.lang.toLowerCase().includes('vietsub')
      ? 'vietsub'
      : convertToPathname(detail.lang.toLowerCase())
    const episode = detail.episode_current.toLowerCase()
    const slug = detail.slug

    router.push(`/phim/${slug}?lang=${lang}&episode=${episode !== 'full' ? 'tap-01' : episode}`)
  }

  const handleErrorToast = (msg?: string) => {
    return showToast({
      variant: 'error',
      title: 'Error',
      description: `${msg}`,
    })
  }

  const submitMutation = useMutation({
    mutationFn: async (data: IFavouriteItem) => {
      if (!username) {
        throw new Error('please login')
      }
      return await favouriteApi.add(data)
    },
    onSuccess: () => {
      setIsFavourite(true)
    },
    onError: (error) => {
      if (error.message === 'please login') {
        showToast({ variant: 'info', description: 'Vui lòng đăng nhập!' })
      } else {
        handleErrorToast(error.message)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await favouriteApi.delete(id)
    },
    onSuccess: () => {
      setIsFavourite(false)
    },
    onError: (error) => {
      handleErrorToast(error.message)
    },
  })

  const handleFavourite = () => {
    const payload = {
      username,
      titleVN: detail.name,
      titleEN: detail.origin_name,
      slug: detail.slug,
      year: detail.year,
      movieId: detail._id,
      posterUrl: detail.poster_url,
    }

    try {
      if (isFavourite) {
        if (movieFavour) {
          deleteMutation.mutate(movieFavour?._id as string)
          return
        }
      }
      submitMutation.mutate(payload)
    } catch (error: any) {
      handleErrorToast(error.message)
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
      <div className='relative flex flex-1 flex-col gap-6'>
        <div className='flex sm:justify-between sm:gap-5 max-sm:flex-col'>
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

          {/* Favourite button */}
          <Button
            variant='ghost'
            className='hover:bg-transparent hover:text-current'
            onClick={handleFavourite}
          >
            {isFavourite ? (
              <Heart
                size={18}
                strokeWidth={1}
                className='mr-2'
                color='red'
                fill='red'
              />
            ) : (
              <Heart
                size={18}
                strokeWidth={1.5}
                className='mr-2'
              />
            )}
            Yêu Thích
          </Button>
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
                  <span className='min-w-[130px] font-semibold'>{item.label}:</span>
                  <span
                    className={cn('flex-1 line-clamp-2 text-white/85', {
                      'text-[#FF0000]': item.label.includes('Trạng thái'),
                    })}
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

export default MovieInfo
