export interface ILoginResponse {
  status: boolean | number
  message: string
  data: {
    fullname: string
    username: string
    email: string
    token: string
  }
}

export interface IRegisterResponse {
  status: boolean | number
  message: string
}

export interface ILogoutResponse {
  status: boolean | number
  message: string
}
