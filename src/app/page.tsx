import movieApi from '@/api-client/movies'
import MovieHomePage from '@/components/home-page'
import Loader from '@/components/loader'
import isSuccessResponse from '@/helpers/check-response'
import { Suspense } from 'react'

export default async function Home() {
  const response = await movieApi.getNewMovies({})
  const data = response.items

  if (!isSuccessResponse(response) || !data) {
    return (
      <div className='min-h-screen flex items-center justify-center text-xl'>
        <p>Xảy ra lỗi vui lòng tải lại trang hoặc quay lại sau.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<Loader openLoading={true} />}>
      <MovieHomePage data={data} />
    </Suspense>
  )
}
