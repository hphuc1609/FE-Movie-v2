import { ICategory } from './category'

export interface INavbar {
  name: string
  href?: string
  subMenu?: ICategory[]
  icon?: React.ReactNode
}
