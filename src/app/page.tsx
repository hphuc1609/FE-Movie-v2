import Banner from '@/components/banner'
import MovieByTypes from '@/components/movie/categories'
import NewUpdateMovie from '@/components/movie/new'
import { endPoint } from '@/constants/end-point'
import { fetchServer } from '@/helpers/fetch-server'

export default async function Home() {
  const categories = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']
  const titles = ['Phim lẻ', 'Phim bộ', 'Phim hoạt hình', 'TV Shows']
  const currentYear = new Date().getFullYear()

  const [dataBanner, dataNewMovie, ...dataMovieByType] = await Promise.all([
    fetchServer({ endpoint: `${endPoint.year}/${currentYear}` }),
    fetchServer({ endpoint: endPoint.newMovies }),
    ...categories.map((category) => fetchServer({ endpoint: `${endPoint.list}/${category}` })),
  ])

  return (
    <>
      <Banner data={dataBanner.data} />
      <div className='max-w-screen-xl m-auto px-10 py-10 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-14'>
          {categories.map((item, index) => (
            <MovieByTypes
              key={item}
              data={dataMovieByType[index].data}
              category={item}
              title={titles[index]}
            />
          ))}
        </div>
        <NewUpdateMovie data={dataNewMovie} />
      </div>
    </>
  )
}
