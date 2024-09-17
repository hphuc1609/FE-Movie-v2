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
      className={`fixed top-0 right-0 flex justify-end w-full min-h-screen bg-black bg-opacity-70 transition-all duration-300 ${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} overflow-x-hidden`}
    >
      <div
        className={`relative h-screen pt-3 bg-neutral-900 transition-all duration-500 ${openMenu ? 'translate-x-0 w-[250px] ' : 'translate-x-full w-0'} overflow-y-auto scrollbar-none`}
      >
        {openSubMenu ? (
          <Button
            onClick={() => setOpenSubMenu(null)}
            className='flex items-center gap-3 text-base capitalize bg-inherit w-full justify-start hover:text-red-700 hover:bg-inherit p-0 pl-3'
          >
            <ArrowLeft size={20} />
            Quay lại
          </Button>
        ) : (
          <X
            size={20}
            className='cursor-pointer mb-3 ml-3'
            onClick={handleClose}
          />
        )}

        {data.map((menuItem) =>
          openSubMenu === null ? (
            <div
              key={menuItem.name}
              className='flex flex-col text-base capitalize font-semibold'
            >
              {menuItem.href ? (
                <Link
                  href={checkUrl(menuItem.href)}
                  className={cn(
                    'hover:text-primary-color pr-3 pl-10 py-2',
                    activeLink(menuItem.href) ? 'text-primary-color' : 'text-gray-50',
                  )}
                  onClick={onClose}
                >
                  {menuItem.name}
                </Link>
              ) : (
                <p
                  onClick={() => setOpenSubMenu(menuItem.name)}
                  className='pr-3 pl-10 py-2 flex items-center hover:text-primary-color cursor-pointer'
                >
                  {menuItem.name}
                  <ChevronRight
                    size={20}
                    strokeWidth={2}
                    className='ml-1'
                  />
                </p>
              )}
            </div>
          ) : openSubMenu === menuItem.name && menuItem.subMenu ? (
            <div
              key={menuItem.name}
              className='flex flex-col text-base capitalize'
            >
              {menuItem.subMenu.map((item) => (
                <Link
                  key={item.id}
                  href={checkUrl(item.slug)}
                  className={cn(
                    'hover:text-primary-color hover:bg-neutral-800 hover:bg-opacity-30 pr-3 pl-10 py-2',
                    activeLink(item.slug) ? 'text-primary-color' : 'text-gray-50',
                  )}
                  onClick={handleClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
