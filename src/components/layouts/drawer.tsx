import { cn } from '@/lib/utils'
import { INavbar } from '@/models/interfaces/navbar'
import { ArrowLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

interface DrawerProps {
  openMenu: boolean
  onClose: () => void
  data: INavbar[]
}

export default function Drawer(props: DrawerProps) {
  const { openMenu, onClose, data } = props
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const activeLink = (link: string) => pathname.endsWith(link)

  const checkUrl = (link: string) => {
    return link === '/' ? link : `/danh-sach${link.startsWith('/') ? link : `/${link}`}?page=1`
  }

  const handleClose = () => {
    onClose()
    setOpenSubMenu(null)
  }

  return (
    <div
      className={`fixed top-0 right-0 w-full min-h-screen bg-black bg-opacity-80 transition-all duration-300 ${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} overflow-x-hidden`}
    >
      <div
        className={`relative ml-auto h-screen pt-3 bg-neutral-900 transition-transform duration-500 ${openMenu ? 'translate-x-0 w-[260px]' : 'translate-x-full w-0'} overflow-y-auto scrollbar-none`}
      >
        {/* Nút quay lại hoặc đóng menu */}
        {openSubMenu ? (
          <Button
            onClick={() => setOpenSubMenu(null)}
            className='flex items-center gap-3 text-base text-gray-300 capitalize bg-transparent w-full justify-start hover:text-primary-color p-0 pl-3'
          >
            <ArrowLeft size={20} />
            Quay lại
          </Button>
        ) : (
          <X
            size={24}
            className='cursor-pointer mb-4 ml-3 text-gray-400 hover:text-primary-color'
            onClick={handleClose}
            xlinkTitle='Đóng'
          />
        )}

        {/* Menu chính và sub-menu */}
        {data.map((menuItem) =>
          openSubMenu === null ? (
            <div
              key={menuItem.name}
              className='flex flex-col text-base font-semibold'
            >
              {menuItem.href ? (
                <Link
                  href={checkUrl(menuItem.href)}
                  className={cn(
                    'hover:text-primary-color pr-4 pl-10 py-3 transition-all duration-300 rounded-md',
                    activeLink(menuItem.href) ? 'text-primary-color' : 'text-gray-100',
                  )}
                  onClick={onClose}
                >
                  {menuItem.name}
                </Link>
              ) : (
                <p
                  onClick={() => setOpenSubMenu(menuItem.name)}
                  className='pr-4 pl-10 py-3 flex items-center justify-between hover:text-primary-color transition-all duration-300 cursor-pointer text-gray-100 rounded-md'
                >
                  {menuItem.name}
                  <ChevronRight
                    size={20}
                    strokeWidth={2}
                  />
                </p>
              )}
            </div>
          ) : openSubMenu === menuItem.name && menuItem.subMenu ? (
            <div
              key={menuItem.name}
              className='flex flex-col text-base'
            >
              {menuItem.subMenu.map((item) => (
                <Link
                  key={item.id}
                  href={checkUrl(item.slug)}
                  className={cn(
                    'hover:text-primary-color hover:bg-neutral-800 pr-4 pl-10 py-3 transition-all duration-300 rounded-md',
                    activeLink(item.slug) ? 'text-primary-color' : 'text-gray-100',
                  )}
                  onClick={handleClose}
                >
                  {menuItem.name.includes('Năm') ? `Phim ${item.name}` : item.name}
                </Link>
              ))}
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
