import movieApi from '@/api-client/movies'
import Banner from '@/components/banner'
import ErrorMessage from '@/components/common/error-message'
import CategoryMovie from '@/components/home-page/category-movie'
import NewUpdateMovie from '@/components/home-page/new-movie'
import Loader from '@/components/loader'
import isSuccessResponse from '@/helpers/check-response'
import { Suspense } from 'react'

export default async function Home() {
  const response = await movieApi.getNewMovies({})
  const dataNew = response.items
  const response2 = await movieApi.getList({ category: 'phim-le' })
  const dataBanner = response2.data
  const categories = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']

  const hasFailedResponse = !isSuccessResponse(response) || !isSuccessResponse(response2)
  const hasNoData = !dataNew || !dataBanner

  if (hasFailedResponse || hasNoData) {
    return <ErrorMessage />
  }
  return (
    <Suspense fallback={<Loader />}>
      <Banner data={dataBanner} />
      <div className='max-w-screen-xl m-auto px-10 py-20 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-20'>
          {categories.map((item) => (
            <CategoryMovie
              key={item}
              paramCategory={item}
            />
          ))}
        </div>
        <NewUpdateMovie data={dataNew} />
      </div>
    </Suspense>
  )
}
