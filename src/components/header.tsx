/* eslint-disable react/no-children-prop */
'use client'

import menuLinks, { MenuItem } from '@/constants/menu-link'
import useScrollPosition from '@/custom-hooks/useScrollPosition'
import { cn } from '@/lib/utils'
import { ChevronDown, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import DialogCustom from './common/dialog'
import { Input } from './ui/input'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from './ui/menubar'
import { Separator } from './ui/separator'

export default function Header() {
  const pathname = usePathname()
  const isHomePathname = pathname === '/'
  const scrollPosition = useScrollPosition()

  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-20 max-lg:px-[25px] ${
        isHomePathname ? 'fixed' : 'sticky'
      } top-0 z-50 transition duration-300 ${scrollPosition > 0 && 'bg-black bg-opacity-30'}`}
    >
      <HeaderMenubar />
    </div>
  )
}

const HeaderMenubar = React.memo(() => {
  const [openDialogSearch, setOpenDialogSearch] = useState(false)
  const router = useRouter()

  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !event.currentTarget.value) {
      return
    }
    setOpenDialogSearch(false)
    router.push(`/danh-sach/search?keyword=${event.currentTarget.value}`)
  }

  return (
    <>
      <div className='flex gap-14 h-full items-center'>
        <Link
          href='/'
          className='text-2xl font-bold'
        >
          VPhim <span className='text-primary-color'>247</span>
        </Link>
        <div className='flex items-center gap-5 h-full max-md:hidden text-white'>
          {menuLinks.map((menuItem) => (
            <TextMenubar
              key={menuItem.name}
              data={menuItem}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <DialogCustom
          open={openDialogSearch}
          setOpen={setOpenDialogSearch}
          title={'Bạn tìm phim gì?'}
          children={<Search size={20} />}
          content={
            <Input
              placeholder='Nhập tên phim, chương trình,...'
              autoFocus
              onKeyDown={(e) => handleInputKeyDown(e)}
              className='text-white text-lg bg-transparent p-0 border-transparent rounded-none !border-b-[#ccc] focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          }
        />
        <Separator
          className='h-4'
          orientation='vertical'
        />
        <div className='flex items-center gap-2'>
          <User
            fill='white'
            size={20}
          />
          <p className='text-sm'>Guest</p>
        </div>
      </div>
    </>
  )
})
HeaderMenubar.displayName = 'HeaderMenubar'

const TextMenubar = React.memo(({ data }: { data: MenuItem }) => {
  const pathname = usePathname()
  const isActiveLink = pathname.endsWith(data.href ?? '')
  const checkUrl = data.href
    ? data.href === '/'
      ? '/'
      : `/danh-sach${data.href.startsWith('/') ? data.href : `/${data.href}`}?page=1`
    : undefined

  return (
    <Menubar className='bg-transparent border-none p-0'>
      <MenubarMenu>
        <MenubarTrigger className='p-0 !bg-transparent text-base font-semibold !text-current'>
          {data.href ? (
            <Link
              href={`${checkUrl}`}
              className={cn('opacity-80 hover:opacity-100', isActiveLink && 'opacity-100')}
            >
              {data.name}
            </Link>
          ) : (
            <div className='cursor-pointer flex items-center'>
              <span>{data.name}</span>
              <MenubarShortcut>
                <ChevronDown
                  strokeWidth={2}
                  size={20}
                  color='white'
                  className='ml-1'
                />
              </MenubarShortcut>
            </div>
          )}
        </MenubarTrigger>
        {data.subMenu && (
          <MenubarContent className='min-w-fit'>
            {data.subMenu?.map((item) => (
              <MenubarItem key={item.name}>
                <MenubarItem>
                  <Link href={item.href}>{item.name}</Link>
                </MenubarItem>
              </MenubarItem>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
})
TextMenubar.displayName = 'TextMenubar'
