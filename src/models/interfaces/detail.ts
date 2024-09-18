export interface Timestamps {
  time: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface Movie {
  created: Timestamps
  modified: Timestamps
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: string
  status: string
  poster_url: string
  thumb_url: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: Category[]
  country: Country[]
  episodes: Episode[]
  tmdb: MovieTMDB
}

export interface MovieTMDB {
  id: number
  session: number | string
  type: string
  vote_average: number
  vote_count: number
}

export interface ServerData {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export interface ItemData {
  name: string
  slug: string
  embed: string
  m3u8: string
}

export interface Episode {
  server_name: string
  server_data: ServerData[]
  items: ItemData[]
}

export interface DetailResponse {
  status: boolean
  msg: string
  movie: Movie
  episodes: Episode[]
}
