'use client'

import formatDate from '@/helpers/format-date'
import { showToast } from '@/helpers/toast'
import { useToast } from '@/hooks/use-toast'
import commentApi from '@/services/api-client/comments'
import { useComments, useMovieInfo } from '@/services/query-data'
import { useMutation } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import DialogCustom from './common/dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'

const CommentBox = () => {
  const { toast } = useToast()
  const router = useRouter()

  const pathname = usePathname()
  const slug = pathname.split('/').pop() as string

  const [count, setCount] = useState(10)
  const [commentId, setCommentId] = useState('')
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [loadedAvatar, setLoadedAvatar] = useState(false)

  const userInfo = getCookie('userVerify')
  const username: string = userInfo ? JSON.parse(userInfo).username : null
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
  const { data: comments = [], refetch: refetchComments } = useComments()
  const { data: movieInfo } = useMovieInfo(slug)

  // Filter comment by movie id
  const filteredComments = useMemo(() => {
    return comments.filter((comment) => comment.movieId === movieInfo?.movie._id)
  }, [comments, movieInfo])

  // Mutations
  const submitMutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const movieId = movieInfo?.movie._id
      if (!userInfo) {
        throw new Error('please login')
      }
      return await commentApi.create({ ...data, movieId })
    },
    onSuccess: () => {
      reset()
      refetchComments()
    },
    onError: (error) => {
      if (error.message === 'please login') {
        showToast({
          variant: 'warning',
          title: 'Yêu cầu đăng nhập.',
          description: 'Vui lòng đăng nhập để có thể bình luận.',
        })
      } else {
        showToast({
          variant: 'error',
          title: 'Failed to add comment.',
          description: `There was a problem with your request. ${error.message}`,
        })
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
      showToast({
        variant: 'error',
        title: 'Failed to delete comment.',
        description: `There was a problem with your request. ${error.message}`,
      })
    },
  })

  // Handlers
  const handleSend = (data: FieldValues) => {
    try {
      submitMutation.mutate(data)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: `There was a problem with your request. ${error.message}`,
      })
    }
  }

  const handleDelete = (id: string) => {
    try {
      deleteMutation.mutate(id)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: `There was a problem with your request. ${error.message}`,
      })
    }
  }

  return (
    <div className='h-fit flex flex-col gap-6 p-6 max-sm:p-4 bg-black/50'>
      <h5 className='text-lg font-bold uppercase'>Bình luận phim</h5>
      <Controller
        control={control}
        name='content'
        render={({ field }) => (
          <>
            <Textarea
              {...field}
              placeholder='Nhập bình luận của bạn...'
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
      <div className={cn('mt-5 grid gap-6', !filteredComments.length && 'hidden')}>
        {filteredComments.slice(0, count).map((comment) => (
          <div
            key={comment._id}
            className='flex items-center gap-4 max-sm:gap-2'
          >
            <Avatar className='w-12 h-12 max-sm:w-8 max-sm:h-8'>
              <AvatarImage
                src={'https://github.com/shadcn.png'}
                alt={comment.username}
                onLoadingStatusChange={(status) => {
                  status === 'loaded' ? setLoadedAvatar(true) : null
                }}
              />
              {!loadedAvatar && <Skeleton className='w-full h-full rounded-full' />}
            </Avatar>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <span className='text-lg font-semibold max-sm:text-sm'>{comment.username}</span>
                <span className='text-sm text-gray-300 max-sm:text-xs'>
                  {formatDate(comment.date)}
                </span>
              </div>
              <p className='text-sm text-gray-300 max-sm:text-xs'>{comment.content}</p>
              {username === comment.username && expiredDateComment(comment.date) && (
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
    </div>
  )
}

export default CommentBox
