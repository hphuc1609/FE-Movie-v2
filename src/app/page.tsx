import movieApi from '@/api-client/movies'
import Banner from '@/components/banner'
import ErrorMessage from '@/components/common/error-message'
import Loader from '@/components/loader'
import CategoryMovie from '@/components/movie/categories'
import NewUpdateMovie from '@/components/movie/new'
import isSuccessResponse from '@/helpers/check-response'
import { Suspense } from 'react'

export default async function Home() {
  const categories = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']
  const dataPhimLe = await movieApi.getList({ category: 'phim-le' })
  const dataPhimBo = await movieApi.getList({ category: 'phim-bo' })

  const categoryList = await Promise.all(
    categories.map(async (category) => {
      const res = await movieApi.getList({ category })
      return res.data
    }),
  )

  if (!isSuccessResponse(dataPhimLe) || !isSuccessResponse(dataPhimBo) || !categoryList) {
    return <ErrorMessage />
  }

  const dataBanner = {
    ...dataPhimLe.data,
    ...dataPhimBo.data,
    items: [...dataPhimLe.data.items, ...dataPhimBo.data.items],
  }

  return (
    <Suspense fallback={<Loader />}>
      <Banner data={dataBanner} />
      <div className='max-w-screen-xl m-auto px-10 py-20 max-lg:px-[25px] flex gap-9'>
        <div className='flex-1 flex flex-col gap-20'>
          {categoryList.map((item) => (
            <CategoryMovie
              key={item.titlePage}
              paramCategory={categories[categoryList.indexOf(item)]}
              dataMovie={item}
            />
          ))}
        </div>
        <NewUpdateMovie />
      </div>
    </Suspense>
  )
}
