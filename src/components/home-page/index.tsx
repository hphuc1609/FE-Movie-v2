import { NewMovieItem } from '@/models/new-movie'
import Banner from '../banner'
import CategoryMovie from './category-movie'
import NewUpdateMovie from './new-movie'

export default function MovieHomePage({ data }: { data: NewMovieItem[] }) {
  return (
    <>
      <Banner dataBanner={data} />
      <div className='max-w-screen-xl m-auto px-10 py-20 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-20'>
          <CategoryMovie paramCategory='phim-le' />
          <CategoryMovie paramCategory='phim-bo' />
          <CategoryMovie paramCategory='hoat-hinh' />
          <CategoryMovie paramCategory='tv-shows' />
        </div>
        <NewUpdateMovie data={data} />
      </div>
    </>
  )
}
