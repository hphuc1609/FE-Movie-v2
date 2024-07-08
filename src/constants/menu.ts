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
  {
    name: 'Phim mới',
    href: '/phim-moi',
  },
  {
    name: 'Phim lẻ',
    href: '/phim-le',
  },
  {
    name: 'Phim bộ',
    href: '/phim-bo',
  },
  {
    name: 'Thể loại',
    href: null,
    subMenu: [
      {
        name: 'Hành động',
        href: '/hanh-dong',
      },
      {
        name: 'Hài hước',
        href: '/hai-huoc',
      },
      {
        name: 'Kinh dị',
        href: '/kinh-di',
      },
      {
        name: 'Phiêu lưu',
        href: '/phieu-luu',
      },
      {
        name: 'Viễn tưởng',
        href: '/vien-tuong',
      },
      {
        name: 'Tâm lý',
        href: '/tam-ly',
      },
      {
        name: 'Tình cảm',
        href: '/tinh-cam',
      },
      {
        name: 'Hình sự',
        href: '/hinh-su',
      },
      {
        name: 'Hoạt hình',
        href: '/hoat-hinh',
      },
      {
        name: 'TV Shows',
        href: '/tv-shows',
      },
      {
        name: 'Gia đình',
        href: '/gia-dinh',
      },
      {
        name: 'Tài liệu',
        href: '/tai-lieu',
      },
      {
        name: 'Chính kịch',
        href: '/chinh-kich',
      },
      {
        name: 'Khoa học',
        href: '/khoa-hoc',
      },
      {
        name: 'Cổ trang',
        href: '/co-trang',
      },
      {
        name: 'Bí ẩn',
        href: '/bi-an',
      },
    ],
  },
]

export default menuLinks
