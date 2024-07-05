import movieApi from '@/api-client/movie'
import MovieRow from './movie-row'

interface CategoryMovieProps {
  paramCategory: string
}

export default async function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory } = props
  const response = await movieApi.getList({ category: paramCategory })
  const dataMovie = response.data

  return (
    <MovieRow
      data={dataMovie}
      paramCategory={paramCategory}
    />
  )
}
