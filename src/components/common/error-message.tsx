export default function ErrorMessage() {
  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-xl'>
      <p className='text-5xl max-lg:text-3xl font-bold text-red-600'>ERROR 500</p>
      <p>Xảy ra lỗi vui lòng tải lại trang hoặc quay lại sau.</p>
    </div>
  )
}
