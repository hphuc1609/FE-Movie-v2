'use client'

import menuLinks from '@/constants/menu'
import { cn } from '@/lib/utils'
import { ArrowLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import { Button } from './ui/button'

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

  const handleClose = () => {
    onClose()
    setOpenSubMenu(false)
  }

  return (
    <nav
      className={`fixed top-0 right-0 w-full h-full transition-all duration-300 ${openMenu ? 'visible' : 'invisible'}`}
    >
      <div
        className={`absolute top-0 right-0 w-full h-full bg-black bg-opacity-70 transition-all duration-300 ${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={handleClose}
      />
      <div
        className={`absolute top-0 right-0 min-w-[200px] h-full bg-primary p-3 transition-transform duration-500 transform ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {!openSubMenu ? (
          <X
            size={18}
            className='cursor-pointer mb-3'
            onClick={handleClose}
          />
        ) : (
          <Button
            onClick={() => setOpenSubMenu(false)}
            className='flex items-center gap-3 absolute top-2 left-0'
          >
            <ArrowLeft size={16} />
            Trở lại
          </Button>
        )}
        {/* ----------------- */}
        {menuLinks.map((menuItem) => (
          <Fragment key={menuItem.name}>
            {!openSubMenu && (
              <Fragment>
                {menuItem.href ? (
                  <Link
                    href={checkUrl(menuItem.href)}
                    className={cn(
                      'hover:text-primary-color',
                      isActiveLink === menuItem.href.split('/').pop()
                        ? 'text-primary-color'
                        : 'text-gray-50',
                    )}
                    onClick={onClose}
                  >
                    <h2 className='text-sm pr-3 pl-6 py-2'>{menuItem.name}</h2>
                  </Link>
                ) : (
                  <h2
                    onClick={() => setOpenSubMenu(true)}
                    className='text-sm pr-3 pl-6 py-2 flex items-center hover:text-primary-color cursor-pointer'
                  >
                    {menuItem.name}
                    {!menuItem.href && (
                      <ChevronRight
                        strokeWidth={2}
                        size={16}
                        className='ml-1'
                      />
                    )}
                  </h2>
                )}
              </Fragment>
            )}
            {openSubMenu && (
              <div className='mt-8'>
                {menuItem.subMenu?.map((item) => (
                  <Link
                    key={item.name}
                    href={checkUrl(item.href)}
                    onClick={onClose}
                  >
                    <h3
                      className={`text-sm pr-3 pl-6 py-2 ${isActiveLink === item.href.split('/').pop() ? 'text-primary-color' : 'text-gray-50'}`}
                    >
                      {item.name}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </nav>
  )
}
