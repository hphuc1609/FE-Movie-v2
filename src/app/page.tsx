import movieApi from '@/api-client/movies'
import MovieHomePage from '@/components/home-page'
import isSuccessResponse from '@/helpers/check-response'

export default async function Home() {
  const response = await movieApi.getNewMovies({})
  const dataNew = response.items

  const response2 = await movieApi.getList({ category: 'phim-le', limit: 64 })
  const dataBanner = response2.data

  if (!isSuccessResponse(response) || !isSuccessResponse(response2)) {
    return (
      <div className='min-h-screen flex items-center justify-center text-xl'>
        <p>Xảy ra lỗi vui lòng tải lại trang hoặc quay lại sau.</p>
      </div>
    )
  }

  return (
    <MovieHomePage
      dataNew={dataNew}
      dataBanner={dataBanner}
    />
  )
}
