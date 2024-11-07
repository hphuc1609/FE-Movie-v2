'use client'

import formatDate from '@/helpers/format-date'
import { showToast } from '@/helpers/toast'
import { cn } from '@/lib/utils'
import commentApi from '@/services/api-client/comments'
import { useComments, useDetail } from '@/services/query-data'
import { useMutation } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import DialogCustom from './common/dialog'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { IUser } from '@/models/interfaces/user'
import { User } from 'lucide-react'

const CommentBox = () => {
  const pathname = usePathname()
  const slug = pathname.split('/').pop() as string

  const [count, setCount] = useState(10)
  const [commentId, setCommentId] = useState('')
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('newest')

  const userInfo = getCookie('userVerify')
  const user: IUser = userInfo ? JSON.parse(userInfo) : null

  const expiredDateComment = (date: string) =>
    new Date().getTime() - new Date(date).getTime() < 24 * 60 * 60 * 1000 // 24 hours

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: { content: '' },
  })

  // Get data
  const { data: comments = [], refetch: refetchComments } = useComments({})
  const { data: movieInfo } = useDetail({ slug })

  // Filter comment by movie id
  const filteredComments = useMemo(() => {
    const sortedComments = comments.filter((comment) => comment.movieId === movieInfo?.movie._id)

    // Sort comments based on sortOrder
    if (sortOrder === 'newest') {
      return sortedComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      return sortedComments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
  }, [comments, movieInfo, sortOrder])

  // Handlers for sorting
  const handleSort = (order: 'oldest' | 'newest') => {
    setSortOrder(order)
  }

  const handleErrorToast = (msg?: string) => {
    return showToast({
      variant: 'error',
      title: 'Error',
      description: `${msg}`,
    })
  }

  // Mutations
  const submitMutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const movieId = movieInfo?.movie._id
      if (!userInfo) {
        throw new Error('please login')
      }
      return await commentApi.create({ ...data, username: user.username, movieId })
    },
    onSuccess: () => {
      reset()
      refetchComments()
    },
    onError: (error) => {
      if (error.message === 'please login') {
        showToast({ variant: 'info', description: 'Vui lòng đăng nhập!' })
      } else {
        handleErrorToast(error.message)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await commentApi.delete(id)
    },
    onSuccess: () => {
      refetchComments()
      setOpenDialogDelete(false)
    },
    onError: (error) => {
      handleErrorToast(error.message)
    },
  })

  // Handlers
  const handleSend = (data: FieldValues) => {
    try {
      submitMutation.mutate(data)
    } catch (error: any) {
      handleErrorToast(error.message)
    }
  }

  const handleDelete = (id: string) => {
    try {
      deleteMutation.mutate(id)
    } catch (error: any) {
      handleErrorToast(error.message)
    }
  }

  return (
    <section className='h-fit flex flex-col gap-4 p-6 max-sm:p-4 bg-black/50'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg max-sm:text-[15px] font-bold'>
          {filteredComments.length} Bình luận
        </h4>
        {/* Dropdown Sort */}
        <Select
          onValueChange={(value) => handleSort(value as 'newest' | 'oldest')}
          defaultValue='newest'
        >
          <SelectTrigger className='max-w-[100px] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0'>
            <SelectValue placeholder='Sắp xếp' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='newest'>Mới nhất</SelectItem>
            <SelectItem value='oldest'>Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Controller
        control={control}
        name='content'
        render={({ field }) => (
          <>
            <Textarea
              {...field}
              placeholder='Nhập bình luận...'
              rows={4}
              className='rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 text-primary'
            />
            <Button
              className='w-fit h-9 rounded flex gap-2 bg-blue-600/80 hover:bg-blue-700/80'
              onClick={handleSubmit(handleSend)}
              disabled={!isDirty}
            >
              Gửi bình luận
            </Button>
          </>
        )}
      />

      {/* List comment */}
      <div className={cn('mt-5 grid gap-6', { hidden: !filteredComments.length })}>
        {filteredComments.slice(0, count).map((comment) => (
          <div
            key={comment._id}
            className='flex items-center gap-4 max-sm:gap-2'
          >
            <Avatar className='w-11 h-11 max-sm:w-8 max-sm:h-8 bg-[#d9d9d9]'>
              <User
                size={30}
                className='m-auto'
                fill='currentColor'
              />
            </Avatar>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <span className='text-base font-bold max-sm:text-sm'>{comment.username}</span>
                <span className='text-xs text-gray-300 max-sm:text-xs'>
                  {formatDate(comment.date)}
                </span>
              </div>
              <p className='text-sm text-gray-300 max-sm:text-xs'>{comment.content}</p>
              {user?.username === comment.username && expiredDateComment(comment.date) && (
                <div
                  className='flex items-start gap-1 mt-2 text-xs text-red-500 cursor-pointer hover:underline'
                  onClick={() => {
                    setOpenDialogDelete(true)
                    setCommentId(comment._id)
                  }}
                >
                  Xóa bình luận
                </div>
              )}
            </div>
          </div>
        ))}
        {count < comments.length && (
          <Button
            className='h-12 rounded-sm bg-blue-600/80 hover:bg-blue-700/80'
            onClick={() => setCount(count + 10)}
          >
            Tải thêm bình luận
          </Button>
        )}
      </div>

      <DialogCustom
        open={openDialogDelete}
        setOpen={setOpenDialogDelete}
        title='Xóa bình luận?'
        content='Hành động này sẽ xóa bình luận. Bạn có chắc xóa bình luận này?'
        textCancel='Hủy'
        textConfirm='Xóa'
        onConfirm={() => handleDelete(commentId)}
        DialogContentProps={{ style: { maxWidth: '500px' } }}
        ButtonRightProps={{
          className: 'bg-red-600 hover:bg-red-700',
          disabled: deleteMutation.isPending,
        }}
      />
    </section>
  )
}

export default CommentBox
