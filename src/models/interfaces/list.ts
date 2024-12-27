export interface MovieCategoryResponse {
  status: string
  msg: string
  data: MovieCategory
}

export interface MovieCategory {
  seoOnPage: SeoOnPage
  breadCrumb: BreadCrumb[]
  titlePage: string
  items: MovieItem[]
  params: MovieCategoryParams
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
  pagination?: MoviePagination
}

export interface SeoOnPage {
  og_type: string
  titleHead: string
  descriptionHead: string
  og_image: string[]
  og_url: string
}

export interface BreadCrumb {
  isCurrent: boolean
  name: string
  slug?: string
  position?: number
}

export interface MovieItem {
  modified: Modified
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: string
  poster_url: string
  thumb_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: CategoryItem[]
  country: CountryItem[]
}

export interface Modified {
  time: string
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
}

export interface CountryItem {
  id: string
  name: string
  slug: string
}

export interface MovieCategoryParams {
  type_slug: string
  filterCategory: string[]
  filterCountry: string[]
  filterYear: string
  filterType: string
  sortField: string
  sortType: string
  pagination: MoviePagination
}

export interface MoviePagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  totalPages: number
}
