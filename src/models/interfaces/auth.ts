export interface ILoginResponse {
  token: string
  username: string
  message: string
  status: boolean | number
}

export interface IRegisterResponse {
  message: string
  status: boolean | number
}

export interface ILogoutResponse {
  message: string
  status: boolean | number
}
