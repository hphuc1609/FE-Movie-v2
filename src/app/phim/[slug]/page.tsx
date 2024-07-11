import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import Detail from './detail'
import { Suspense } from 'react'
import Loader from '@/components/loader'
import ErrorMessage from '@/components/common/error-message'

interface SlugDetailPageProps {
  params: {
    slug: string
  }
}

export default async function SlugDetailPage({ params: { slug } }: SlugDetailPageProps) {
  const resNewMovie = await movieApi.getNewMovies({})
  const resMovieByCate = await movieApi.getDetail({ name: slug })

  if (!isSuccessResponse(resNewMovie) && !isSuccessResponse(resMovieByCate)) {
    return <ErrorMessage />
  }

  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <Suspense fallback={<Loader />}>
        <Detail
          dataNewMovie={resNewMovie.items}
          dataByCategory={resMovieByCate}
        />
      </Suspense>
    </div>
  )
}
