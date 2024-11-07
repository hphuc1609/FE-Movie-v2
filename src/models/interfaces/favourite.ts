export interface IFavourite {
  status: string
  message?: string
  data: Item[]
}

export interface Item {
  favourites: IFavouriteItem[]
  username: string
}

export interface IFavouriteItem {
  titleVN: string
  titleEN: string
  posterUrl: string
  slug: string
  year: number
  username: string
  movieId: string
  lang?: string
  episodeCurrent?: string
  _id?: string
}
