import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

export default function Reviewbox() {
  return (
    <div className='flex-auto h-fit flex flex-col gap-6 p-5 bg-black bg-opacity-30 rounded-sm'>
      <h5 className='text-lg font-semibold uppercase'>Đánh giá phim</h5>
      <Textarea
        placeholder='Nhập bình luận'
        className='h-[80px] rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 text-primary'
      />
      <Button
        className='w-fit rounded-sm flex gap-2 bg-black hover:bg-black hover:bg-opacity-50'
        onClick={() =>
          alert('Chức năng này đang được phát triển! Hãy theo dõi chúng tôi để biết thêm thông tin')
        }
      >
        <Send size={13} />
        Gửi bình luận
      </Button>
    </div>
  )
}
