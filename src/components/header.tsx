/* eslint-disable react/no-children-prop */
'use client'

import movieApi from '@/api-client/movie'
import menuLinks, { MenuItem } from '@/constants/menu-link'
import useScrollPosition from '@/custom-hooks/useScrollPosition'
import { cn } from '@/lib/utils'
import { ChevronDown, Search, User, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
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
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()
  const [openDialogSearch, setOpenDialogSearch] = useState(false)
  const isHomePathname = pathname === '/'

  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !event.currentTarget.value) {
      return
    }
    try {
      setOpenDialogSearch(false)
      const dataMovieFromSearch = await movieApi.getMoviesSearch({
        keyword: event.currentTarget.value,
      })
      console.log('🚀 ~ handleInputKeyDown ~ dataMovieFromSearch:', dataMovieFromSearch)
    } catch (error) {
      console.error('Lỗi tìm kiếm phim: ', error)
    }
  }

  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-20 max-lg:px-[25px] ${
        isHomePathname ? 'fixed' : 'sticky'
      } top-0 z-50 transition duration-300 ${useScrollPosition() > 0 && 'bg-black bg-opacity-30'}`}
    >
      <div className='flex gap-14 h-full items-center'>
        <Link
          href='/'
          className='text-3xl max-lg:text-2xl font-bold text-primary-color'
        >
          Phimsub
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
              className='bg-transparent p-0 border-transparent rounded-none !border-b-[#ccc] focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          }
        />
        <Separator
          className='h-4'
          orientation='vertical'
        />
        <User
          fill='white'
          size={20}
        />
      </div>
    </div>
  )
}

function TextMenubar({ data }: { data: MenuItem }) {
  const pathname = usePathname()
  const isActive = pathname === data.href
  const checkUrl =
    data.href &&
    (data.href === '/'
      ? '/'
      : data.href.startsWith('/')
        ? `/danh-sach${data.href}`
        : `/danh-sach/${data.href}`)

  return (
    <Menubar className='bg-transparent border-none p-0'>
      <MenubarMenu>
        <MenubarTrigger className='p-0 !bg-transparent text-base font-semibold !text-current'>
          {data.href ? (
            <Link
              href={`${checkUrl}`}
              className={cn('opacity-80 hover:opacity-100', isActive && 'opacity-100')}
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
}
