import movieApi from '@/api-client/movie'
import Detail from './detail'
import isSuccessResponse from '@/helpers/check-response'

export default async function SlugDetailPage() {
  const response = await movieApi.getNewMovies({})
  const data = response.items

  if (!isSuccessResponse(response) || !data) {
    return (
      <div className='min-h-screen flex items-center justify-center text-xl'>
        <p>Đã xảy ra lỗi vui bạn tải lại trang hoặc quay lại sau.</p>
      </div>
    )
  }

  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <Detail dataNewMovie={data} />
    </div>
  )
}
