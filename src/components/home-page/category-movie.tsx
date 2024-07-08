import movieApi from '@/api-client/movies'
import MovieRow from './movie-row'
import Loader from '../loader'
import { Suspense } from 'react'

interface CategoryMovieProps {
  paramCategory: string
}

export default async function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory } = props
  const response = await movieApi.getList({ category: paramCategory })
  const dataMovie = response.data

  return (
    <Suspense fallback={<Loader openLoading={true} />}>
      <MovieRow
        data={dataMovie}
        paramCategory={paramCategory}
      />
    </Suspense>
  )
}
