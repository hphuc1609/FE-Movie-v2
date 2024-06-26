export interface NewMovieResponse {
  status: boolean
  items: NewMovieItem[]
  msg?: string
  pagination: Pagination
}

interface Modified {
  time: string
}

export interface NewMovieItem {
  modified: Modified
  _id: string
  name: string
  slug: string
  origin_name: string
  poster_url: string
  thumb_url: string
  year: number
}

interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  totalPages: number
}
