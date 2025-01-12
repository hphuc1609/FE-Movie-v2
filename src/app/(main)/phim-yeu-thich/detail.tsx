'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import CardImage from '@/components/common/card-image'
import { Button } from '@/components/ui/button'
import { IFavourite } from '@/models/interfaces/favourite'
import { IUser } from '@/models/interfaces/user'
import { useFavourites } from '@/services/query-data'
import { getCookie } from 'cookies-next'
import { Loader } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'

const transformFavouritesData = (favourites: IFavourite['data'], username: string) => {
  return favourites
    .filter((item) => item.username === username)
    .flatMap((favItem) =>
      favItem.favourites.map((favourite) => ({
        ...favourite,
        name: favourite.titleVN,
        origin_name: favourite.titleEN,
        poster_url: favourite.posterUrl,
      })),
    )
}

const Detail = () => {
  const [visibleCount, setVisibleCount] = useState(24)
  const [loading, setLoading] = useState(false)

  const userInfo = getCookie('userVerify')
  const user: IUser = userInfo ? JSON.parse(userInfo) : null

  const { data: favourites = [], refetch: refetchFavourites } = useFavourites({})

  // Refetch favourites only when the username changes (or when necessary)
  useEffect(() => {
    if (user) {
      refetchFavourites()
    }
  }, [refetchFavourites, user])

  // Transform the data once we have the user information
  const convertData = transformFavouritesData(favourites, user?.username || '')

  const handleLoadMore = () => {
    setLoading(true)
    setVisibleCount((prev) => prev + 36)
    setLoading(false)
  }

  const breadCrumb = [
    {
      isCurrent: true,
      name: 'Phim yêu thích',
    },
  ]

  return (
    <Suspense fallback={<Loader />}>
      <BreadcrumbCustom breadCrumb={breadCrumb} />
      <section className='grid gap-6'>
        <h2 className='text-3xl max-sm:text-xl font-bold capitalize bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
          Phim yêu thích
        </h2>
        <div className='grid lg:grid-cols-6 max-sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-9 max-sm:gap-x-3'>
          <CardImage
            data={convertData as any}
            itemLength={visibleCount}
          />
        </div>
        {convertData.length > visibleCount && (
          <LoadMoreButton
            loading={loading}
            onClick={handleLoadMore}
          />
        )}
        {convertData.length === 0 && <p className='text-lg'>Chưa có phim yêu thích nào.</p>}
      </section>
    </Suspense>
  )
}

// Load More Button component
const LoadMoreButton = ({ loading, onClick }: { loading: boolean; onClick: () => void }) => (
  <div className='flex justify-center'>
    <Button
      className='mt-6 px-4 py-2 bg-yellow-500 text-white bg-transparent hover:bg-transparent hover:text-yellow-500 capitalize'
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <Loader
            className='animate-spin'
            size={16}
          />
          <p>Đang tải...</p>
        </div>
      ) : (
        'Tải thêm'
      )}
    </Button>
  </div>
)

export default Detail
