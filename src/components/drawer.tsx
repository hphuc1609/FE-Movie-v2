'use client'

import menuLinks from '@/constants/menu'
import { cn } from '@/lib/utils'
import { ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'

interface DrawerProps {
  openMenu: boolean
  onClose: () => void
}

export default function Drawer(props: DrawerProps) {
  const { openMenu, onClose } = props
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const isActiveLink = pathname.split('/').pop()

  const checkUrl = (link: string) => {
    return link === '/' ? link : `/danh-sach${link.startsWith('/') ? link : `/${link}`}?page=1`
  }

  return (
    <div
      className={`${openMenu ? 'block' : 'hidden'} fixed top-0 right-0 w-full h-full bg-black bg-opacity-70`}
    >
      <div
        className={`absolute top-0 right-0 h-full overflow-auto ${openMenu ? 'w-[150px]' : 'w-0'} h-full bg-primary p-3`}
        style={{ transition: 'width 0.3s' }}
      >
        <X
          size={20}
          className='cursor-pointer mb-3'
          onClick={() => {
            onClose()
            setOpenSubMenu(false)
          }}
        />
        {menuLinks.map((menuItem) => (
          <Fragment key={menuItem.name}>
            {!openSubMenu && (
              <Fragment>
                {menuItem.href ? (
                  <Link
                    href={checkUrl(menuItem.href)}
                    className={cn(
                      'uppercase hover:text-primary-color',
                      isActiveLink === menuItem.href.split('/').pop()
                        ? 'text-primary-color'
                        : 'text-gray-50',
                    )}
                    onClick={onClose}
                  >
                    <h2 className='px-4 py-2'>{menuItem.name}</h2>
                  </Link>
                ) : (
                  <h2
                    onClick={() => setOpenSubMenu(true)}
                    className='px-4 py-2 flex items-center uppercase hover:text-primary-color'
                  >
                    {menuItem.name}
                    {!menuItem.href && (
                      <ChevronRight
                        strokeWidth={2}
                        size={20}
                        className='ml-1'
                      />
                    )}
                  </h2>
                )}
              </Fragment>
            )}
            {openSubMenu &&
              menuItem.subMenu?.map((item) => (
                <Link
                  key={item.name}
                  href={checkUrl(item.href)}
                  onClick={onClose}
                >
                  <h2 className='uppercase px-4 py-2'>{item.name}</h2>
                </Link>
              ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
