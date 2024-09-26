export interface INavbar {
  name: string
  href?: string
  subMenu?: { name: string; slug: string }[]
  icon?: React.ReactNode
}
