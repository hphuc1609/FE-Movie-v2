import Banner from '@/components/banner'
import CategoryMovie from '@/components/movie/categories'
import NewUpdateMovie from '@/components/movie/new'

export default async function Home() {
  const categories = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']
  const titles = ['Phim lẻ', 'Phim bộ', 'Phim hoạt hình', 'TV Shows']

  return (
    <>
      <Banner />
      <div className='max-w-screen-xl m-auto px-10 py-20 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-20'>
          {categories.map((item) => (
            <CategoryMovie
              key={item}
              category={item}
              title={titles[categories.indexOf(item)]}
            />
          ))}
        </div>
        <NewUpdateMovie />
      </div>
    </>
  )
}
