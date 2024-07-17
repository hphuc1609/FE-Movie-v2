import { Suspense } from 'react'
import Detail from './detail'
import Loader from '@/components/loader'

export default async function SlugListPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Detail />
    </Suspense>
  )
}
