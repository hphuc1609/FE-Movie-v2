import Banner from '@/components/banner'
import MovieByTypes from '@/components/movie/categories'
import NewUpdateMovie from '@/components/movie/new'
import { endPoint } from '@/constants/end-point'
import { fetchServer } from '@/helpers/fetch-server'

export const dynamic = 'force-dynamic'
export default async function Home() {
  const config = [
    { category: 'phim-le', title: 'Phim lẻ' },
    { category: 'phim-bo', title: 'Phim bộ' },
    { category: 'hoat-hinh', title: 'Phim hoạt hình' },
    { category: 'tv-shows', title: 'TV Shows' },
  ]
  const currentYear = new Date().getFullYear()

  const defaultOptions: RequestInit = {
    headers: {
      'Cache-Control': 'no-store',
      Pragma: 'no-cache',
    },
    cache: 'no-store',
  }

  const requests = [
    fetchServer({ endpoint: `${endPoint.year}/${currentYear}`, nextOptions: defaultOptions }),
    fetchServer({ endpoint: endPoint.newMovies, nextOptions: defaultOptions }),
    ...config.map((item) =>
      fetchServer({
        endpoint: `${endPoint.list}/${item.category}`,
        nextOptions: defaultOptions,
        params: { limit: 36 },
      }),
    ),
  ]
  const results = await Promise.allSettled(requests)

  // Lọc và xử lý kết quả
  const [bannerResult, newMovieResult, ...movieResults] = results
  const dataBanner = bannerResult.status === 'fulfilled' ? bannerResult.value?.data : []
  const dataNewMovie = newMovieResult.status === 'fulfilled' ? newMovieResult.value : []
  const dataMovieByType = movieResults.map((result) =>
    result.status === 'fulfilled' ? result.value?.data : [],
  )

  return (
    <>
      <Banner data={dataBanner} />
      <div className='max-w-screen-xl m-auto px-10 pt-6 pb-10 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-14'>
          {config.map((item, index) => (
            <MovieByTypes
              key={item.category}
              data={dataMovieByType[index]}
              category={item.category}
              title={item.title}
            />
          ))}
        </div>
        <NewUpdateMovie data={dataNewMovie} />
      </div>
    </>
  )
}
