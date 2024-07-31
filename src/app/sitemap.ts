import movieApi from '@/api-client/movies'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

  const response = await movieApi.getNewMovies({})

  const allMovies = response.items.map((movie) => ({
    url: `${baseUrl}/phim/${movie.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    ...allMovies,
  ]
}
