export interface ICommentResponse {
  message?: string
  status: string
  data: ICommentItem[]
}

export interface ICommentItem {
  _id: string
  username: string
  content: string
  date: string
  movieId: string
}
