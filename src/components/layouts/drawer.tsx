'use client'

import { cn } from '@/lib/utils'
import { INavbar } from '@/models/interfaces/navbar'
import { ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  dataMenu: INavbar[]
}

export default function Drawer({ open, onClose, dataMenu }: DrawerProps) {
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const activeLink = (link: string) => pathname.endsWith(link)

  const getUrl = (link: string) => {
    const url = link.startsWith('/') ? link : `/${link}`
    const menuName = dataMenu.find((item) =>
      item.subMenu?.some((subItem) => subItem.slug === link),
    )?.name

    switch (menuName?.toLowerCase()) {
      case 'thể loại':
        return `/the-loai${url}`
      case 'quốc gia':
        return `/quoc-gia${url}`
      case 'năm':
        return `/nam${url}`
      default:
        return url
    }
  }

  const handleClose = () => {
    onClose()
    setOpenSubMenu(null)
  }

  return (
    <div
      className={cn(
        'fixed top-0 right-0 w-full min-h-screen bg-black/80 transition-all duration-300 overflow-hidden',
        { visible: open, invisible: !open },
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          'relative ml-auto h-screen pt-3 bg-neutral-900 transition-all duration-500 translate-x-full w-0 scrollbar-none',
          { 'translate-x-0 w-[260px] overflow-y-auto': open },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <X
          size={20}
          className='cursor-pointer ml-auto mr-5 mb-3 text-gray-400'
          onClick={handleClose}
        />
        <div className='flex flex-col'>
          {dataMenu.map((menuItem) => (
            <div
              key={menuItem.name}
              className='border-b border-neutral-800'
            >
              {menuItem.href ? (
                <Link
                  role={menuItem.name}
                  href={getUrl(menuItem.href)}
                  className={cn(
                    'text-base hover:text-primary-color py-2 px-5 flex items-center gap-2 transition-all',
                    activeLink(menuItem.href) ? 'text-primary-color' : 'text-gray-100',
                  )}
                  onClick={handleClose}
                >
                  {menuItem.icon}
                  {menuItem.name}
                </Link>
              ) : (
                <>
                  <div
                    onClick={() =>
                      setOpenSubMenu(openSubMenu === menuItem.name ? null : menuItem.name)
                    }
                    className='py-2 px-5 flex items-center justify-between cursor-pointer hover:text-primary-color transition-all duration-300 rounded-md text-gray-100'
                  >
                    <span className='text-base flex items-center gap-2'>
                      {menuItem.icon}
                      {menuItem.name}
                    </span>
                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      className={cn(
                        'transition-all duration-300',
                        openSubMenu === menuItem.name ? 'rotate-90' : 'rotate-0',
                      )}
                    />
                  </div>
                  {menuItem.subMenu && openSubMenu === menuItem.name && (
                    <div className='pl-10 grid grid-cols-2 gap-x-3 text-sm font-normal'>
                      {menuItem.subMenu.map((item) => (
                        <Link
                          role={item.name}
                          key={item.slug}
                          href={getUrl(item.slug)}
                          className={cn(
                            'hover:text-primary-color py-2',
                            activeLink(item.slug) ? 'text-primary-color' : 'text-gray-100',
                          )}
                          onClick={handleClose}
                        >
                          {menuItem.name.includes('Năm') ? `Năm ${item.name}` : item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
