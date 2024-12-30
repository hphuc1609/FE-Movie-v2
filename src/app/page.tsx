import Banner from '@/components/banner'
import MovieCategory from '@/components/movie/categories'
import NewUpdateMovie from '@/components/movie/new'
import { endPoint } from '@/constants/end-point'
import { useFetch } from '@/hooks'

export default async function Home() {
  const currentYear = new Date().getFullYear()
  const LIMIT = 36

  const nextConfig: RequestInit = {
    next: { revalidate: 3 },
  }

  const categories = [
    { slug: 'phim-le', title: 'Phim lẻ' },
    { slug: 'phim-bo', title: 'Phim bộ' },
    { slug: 'hoat-hinh', title: 'Phim hoạt hình' },
    { slug: 'tv-shows', title: 'TV Shows' },
  ]

  const movies = await Promise.all([
    useFetch({ endpoint: `${endPoint.year}/${currentYear}`, options: nextConfig }),
    useFetch({ endpoint: endPoint.newMovies, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/phim-le?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/phim-bo?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/hoat-hinh?limit=${LIMIT}`, options: nextConfig }),
    useFetch({ endpoint: `${endPoint.list}/tv-shows?limit=${LIMIT}`, options: nextConfig }),
  ])

  const [dataBanner, dataNewMovie, ...dataMovieByType] = movies

  return (
    <>
      <Banner data={dataBanner} />
      <div className='max-w-screen-xl m-auto px-10 pt-6 pb-10 max-lg:px-[25px] flex gap-9'>
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
    </>
  )
}
