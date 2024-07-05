import movieApi from '@/api-client/movie'
import MovieHomePage from '@/components/home-page'
import isSuccessResponse from '@/helpers/check-response'

export default async function Home() {
  const response = await movieApi.getNewMovies({})
  const data = response.items

  if (!isSuccessResponse(response) || !data) {
    return (
      <div className='min-h-screen flex items-center justify-center text-xl'>
        <p>Đã xảy ra lỗi vui bạn tải lại trang hoặc quay lại sau.</p>
      </div>
    )
  }

  return <MovieHomePage data={data} />
}
