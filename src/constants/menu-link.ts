export interface SubMenuItem {
  name: string
  href: string
}

export interface MenuItem {
  name: string
  href: string | null
  subMenu?: SubMenuItem[]
}

const menuLinks: MenuItem[] = [
  // {
  //   name: 'Trang chủ',
  //   href: '/',
  // },
  {
    name: 'Phim mới',
    href: '/phim-moi',
  },
  {
    name: 'Phim lẻ',
    href: '/phim-le',
  },
  {
    name: 'Phim bộ',
    href: '/phim-bo',
  },
  {
    name: 'Hoạt hình',
    href: '/hoat-hinh',
  },
  // {
  //   name: 'Thể loại',
  //   href: null,
  //   subMenu: [],
  // },
  {
    name: 'TV Shows',
    href: '/tv-shows',
  },
]

export default menuLinks
