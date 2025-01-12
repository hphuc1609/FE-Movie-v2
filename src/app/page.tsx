import Banner from '@/components/banner'
import Loader from '@/components/loader'
import MovieCategory from '@/components/movie/category'
import NewUpdateMovie from '@/components/movie/new'
import { endPoint } from '@/constants/end-point'
import { useFetch } from '@/hooks'
import { Suspense } from 'react'

export default async function HomePage() {
  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1
  const LIMIT = 36

  const nextConfig: RequestInit = {
    next: { revalidate: 10 },
  }

  const categories = [
    { slug: 'phim-le', title: 'Phim lẻ' },
    { slug: 'phim-bo', title: 'Phim bộ' },
    { slug: 'hoat-hinh', title: 'Phim hoạt hình' },
    { slug: 'tv-shows', title: 'TV Shows' },
  ]

  const movies = await Promise.all([
    useFetch({ endpoint: `${endPoint.year}/${currentYear}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.year}/${previousYear}`, options: nextConfig }),
    useFetch({ endpoint: endPoint.newMovies, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/phim-le?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/phim-bo?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/hoat-hinh?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/tv-shows?limit=${LIMIT}`, options: nextConfig }),
  ])

  const [dataCurrentYear, dataPreviousYear, dataNewMovie, ...dataMovieByType] = movies
  const dataBanners = dataCurrentYear?.items?.length > 0 ? dataCurrentYear : dataPreviousYear

  return (
    <Suspense fallback={<Loader />}>
      <Banner data={dataBanners} />
      <div className='max-w-screen-xl m-auto px-10 pt-6 pb-10 max-lg:px-[25px] max-sm:pt-0 flex gap-9'>
        <div className='flex-1 flex flex-col gap-14'>
          {categories.map((item, index) => (
            <MovieCategory
              key={item.slug}
              data={dataMovieByType[index]}
              slug={item.slug}
              title={item.title}
            />
          ))}
        </div>
        <NewUpdateMovie data={dataNewMovie} />
      </div>
    </Suspense>
  )
}
