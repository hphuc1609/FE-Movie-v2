import { Skeleton } from '../ui/skeleton'

const SkeletonCard = ({ itemLength = 8 }: { itemLength?: number }) => {
  return (
    <>
      {Array.from({ length: itemLength }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-3'
        >
          <Skeleton className='w-full h-[270px] max-[400px]:h-[180px] bg-skeleton rounded-sm' />
          <Skeleton className='w-full h-[12px] bg-skeleton rounded-sm' />
          <Skeleton className='w-10/12 h-[12px] bg-skeleton rounded-sm' />
        </div>
      ))}
    </>
  )
}

export default SkeletonCard
